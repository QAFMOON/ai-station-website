import { NextResponse } from 'next/server';

// Receives demo, pilot and quote requests from the contact form and sends them on:
// - Airtable, when AIRTABLE_TOKEN, AIRTABLE_BASE_ID and AIRTABLE_TABLE_ID are set (one new row per request).
// - A webhook, when CONTACT_WEBHOOK_URL is set (the request as JSON).
// - With neither set, the request is written to the server log only.
// If a destination is set and it fails, the visitor sees the error message, so no request is lost silently.

type Lead = {
  name: string;
  email: string;
  company: string;
  inquiry: string;
  message: string;
  locale: string;
};

// Column names in the Airtable table. Change them here if your table uses other names.
const COLUMNS = {
  name: 'Name',
  email: 'Email',
  company: 'Company',
  inquiry: 'Inquiry type',
  message: 'Message',
  locale: 'Language',
} as const;

// The form sends an id; requests are stored in English whatever the page language.
const INQUIRIES: Record<string, string> = {
  demo: 'Demo',
  pilot: 'Two-week pilot',
  onprem: 'Quote: on your premises',
  cloud: 'Quote: private cloud',
  other: 'Other',
};

async function sendToAirtable(lead: Lead): Promise<boolean> {
  const token = process.env.AIRTABLE_TOKEN;
  const base = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_ID;
  if (!token || !base || !table) return true; // not configured: nothing to do

  const fields: Record<string, string> = {};
  for (const key of Object.keys(COLUMNS) as (keyof typeof COLUMNS)[]) {
    if (lead[key]) fields[COLUMNS[key]] = lead[key];
  }
  const res = await fetch(`https://api.airtable.com/v0/${encodeURIComponent(base)}/${encodeURIComponent(table)}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    // typecast lets Airtable create a missing select option instead of rejecting the row.
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
  }).catch(() => null);
  if (!res || !res.ok) {
    console.error('[airtable]', res?.status, res ? await res.text().catch(() => '') : 'network error');
    return false;
  }
  return true;
}

async function sendToWebhook(lead: Lead): Promise<boolean> {
  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) return true;
  const res = await fetch(hook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...lead,
      text: `${lead.inquiry} request: ${lead.name}, ${lead.company} <${lead.email}> | ${lead.message}`,
    }),
  }).catch(() => null);
  return !!res && res.ok;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const text = (k: string, max: number) =>
    String(body[k] ?? '')
      .trim()
      .slice(0, max);
  const lead: Lead = {
    name: text('name', 120),
    email: text('email', 200),
    company: text('company', 160),
    inquiry: INQUIRIES[text('inquiry', 20)] ?? INQUIRIES.demo!,
    message: text('message', 2000),
    locale: text('locale', 5),
  } as Lead;

  // Honeypot filled in: pretend success, store nothing.
  if (text('website', 200)) return NextResponse.json({ ok: true });

  if (!lead.name || !lead.company || !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return NextResponse.json({ ok: false }, { status: 422 });
  }

  const configured =
    !!(process.env.AIRTABLE_TOKEN && process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_TABLE_ID) ||
    !!process.env.CONTACT_WEBHOOK_URL;
  if (!configured) {
    console.log('[contact-request]', JSON.stringify(lead));
    return NextResponse.json({ ok: true });
  }

  const [airtable, webhook] = await Promise.all([sendToAirtable(lead), sendToWebhook(lead)]);
  if (!airtable || !webhook) return NextResponse.json({ ok: false }, { status: 502 });
  return NextResponse.json({ ok: true });
}

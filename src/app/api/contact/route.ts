import { NextResponse } from "next/server";

// Receives demo requests from the contact form.
// With CONTACT_WEBHOOK_URL set, each request is forwarded there as JSON.
// Without it, requests are written to the server log only.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const text = (k: string, max: number) => String(body[k] ?? "").trim().slice(0, max);
  const lead = {
    name: text("name", 120),
    email: text("email", 200),
    company: text("company", 160),
    mode: text("mode", 80),
    message: text("message", 2000),
    locale: text("locale", 5),
    receivedAt: new Date().toISOString(),
  };

  // Honeypot filled in: pretend success, store nothing.
  if (text("website", 200)) return NextResponse.json({ ok: true });

  if (!lead.name || !lead.company || !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return NextResponse.json({ ok: false }, { status: 422 });
  }

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (hook) {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        text: `Demo request: ${lead.name}, ${lead.company} <${lead.email}> | ${lead.mode || "not sure"} | ${lead.message}`,
      }),
    }).catch(() => null);
    if (!res || !res.ok) return NextResponse.json({ ok: false }, { status: 502 });
  } else {
    console.log("[demo-request]", JSON.stringify(lead));
  }
  return NextResponse.json({ ok: true });
}

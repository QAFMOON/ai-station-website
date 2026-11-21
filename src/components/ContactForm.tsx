"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n";
import { site, type Locale } from "@/site.config";
import { Arrow } from "./Arrow";

type Status = "idle" | "sending" | "sent" | "error" | "invalid";
type FieldName = "name" | "email" | "company";

export function ContactForm({ t, locale }: { t: Dictionary["contact"]; locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const [bad, setBad] = useState<FieldName[]>([]);
  const [inquiry, setInquiry] = useState(t.inquiries[0]!.id);
  const current = t.inquiries.find((x) => x.id === inquiry) ?? t.inquiries[0]!;

  // Buttons elsewhere on the page carry data-inquiry, so the form opens on the right request type.
  // "quote" follows whichever plan the delivery timeline is showing.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-inquiry]");
      if (!el) return;
      let id = el.dataset.inquiry ?? "";
      if (id === "quote") id = document.querySelector<HTMLElement>("[data-plan]")?.dataset.plan ?? "cloud";
      if (t.inquiries.some((x) => x.id === id)) {
        setInquiry(id);
        setStatus((v) => (v === "sent" ? "idle" : v));
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [t.inquiries]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const missing: FieldName[] = [];
    if (!data.name?.trim()) missing.push("name");
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) missing.push("email");
    if (!data.company?.trim()) missing.push("company");
    setBad(missing);
    if (missing.length) {
      setStatus("invalid");
      form.querySelector<HTMLElement>(`#cf-${missing[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form form-done" role="status" aria-live="polite">
        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" />
          <path d="m7.5 12.3 3 3 6-6.6" />
        </svg>
        <p>{t.success}</p>
      </div>
    );
  }

  const invalid = (f: FieldName) => bad.includes(f);
  const clear = (f: FieldName) => () => invalid(f) && setBad((b) => b.filter((x) => x !== f));

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="cf-name">
          {t.name} <span className="req" aria-hidden="true">*</span>
        </label>
        <input id="cf-name" name="name" autoComplete="name" required aria-required="true" aria-invalid={invalid("name")} onChange={clear("name")} />
      </div>
      <div className="field">
        <label htmlFor="cf-email">
          {t.email} <span className="req" aria-hidden="true">*</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          dir="ltr"
          placeholder="name@company.com"
          required
          aria-required="true"
          aria-invalid={invalid("email")}
          onChange={clear("email")}
        />
      </div>
      <div className="field">
        <label htmlFor="cf-company">
          {t.company} <span className="req" aria-hidden="true">*</span>
        </label>
        <input id="cf-company" name="company" autoComplete="organization" required aria-required="true" aria-invalid={invalid("company")} onChange={clear("company")} />
      </div>
      <div className="field">
        <label htmlFor="cf-inquiry">{t.inquiry}</label>
        <select id="cf-inquiry" name="inquiry" value={inquiry} onChange={(e) => setInquiry(e.target.value)}>
          {t.inquiries.map((x) => (
            <option key={x.id} value={x.id}>
              {x.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field field-wide">
        <label htmlFor="cf-message">{t.message}</label>
        <textarea id="cf-message" name="message" rows={4} />
      </div>
      {/* Honeypot: people never see or fill this; bots do. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field-wide form-foot">
        <button className="btn btn-send" type="submit" disabled={status === "sending"}>
          {status === "sending" ? t.sending : current.submit} {status !== "sending" && <Arrow />}
        </button>
        <p className={`form-status${status === "error" || status === "invalid" ? " is-bad" : ""}`} role="status" aria-live="polite">
          {status === "invalid" && t.required}
          {status === "error" && (
            <>
              {t.error} <a href={`mailto:${site.email}`}>{site.email}</a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}

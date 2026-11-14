"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n";
import { site, type Locale } from "@/site.config";

type Status = "idle" | "sending" | "sent" | "error" | "invalid";

export function ContactForm({ t, modes, locale }: { t: Dictionary["contact"]; modes: string[]; locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (!data.name?.trim() || !data.company?.trim() || !/^\S+@\S+\.\S+$/.test(data.email ?? "")) {
      setStatus("invalid");
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

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="cf-name">{t.name}</label>
        <input id="cf-name" name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="cf-email">{t.email}</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" dir="ltr" required />
      </div>
      <div className="field">
        <label htmlFor="cf-company">{t.company}</label>
        <input id="cf-company" name="company" autoComplete="organization" required />
      </div>
      <div className="field">
        <label htmlFor="cf-mode">{t.mode}</label>
        <select id="cf-mode" name="mode" defaultValue="">
          <option value="">{t.unsure}</option>
          {modes.map((m) => (
            <option key={m} value={m}>
              {m}
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
        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.submit}
        </button>
        <p
          className={`form-status${status === "sent" ? " is-ok" : ""}${status === "error" || status === "invalid" ? " is-bad" : ""}`}
          role="status"
          aria-live="polite"
        >
          {status === "sent" && t.success}
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

"use client";

import Clarity from "@microsoft/clarity";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { Locale } from "@/site.config";

const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export function MicrosoftClarity({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
    if (!projectId) return;
    if (!initialized.current) {
      Clarity.init(projectId);
      initialized.current = true;
    }
    Clarity.setTag("locale", locale);
    Clarity.setTag("path", pathname);
  }, [locale, pathname]);

  return null;
}
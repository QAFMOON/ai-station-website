import { notFound } from "next/navigation";

// Any unknown address under /en or /ar shows the language's "not found" page with a real 404 status.
export default function Unknown() {
  notFound();
}

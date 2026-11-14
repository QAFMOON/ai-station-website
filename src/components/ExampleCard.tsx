import type { Dictionary } from "@/i18n";

export type CardData = Dictionary["suite"]["tabs"][number]["card"];

// A product panel, not a decoration: the question, the answer, and where it came from.
export function ExampleCard({ label, card, className = "" }: { label: string; card: CardData; className?: string }) {
  const [first] = card.lines;
  return (
    <figure className={`float-card ${className}`.trim()}>
      <figcaption className="float-label">{label}</figcaption>
      <p className="float-ask">{card.you}</p>
      {card.mono ? (
        <pre className="float-code" dir="ltr">
          <code>{card.lines.join("\n")}</code>
        </pre>
      ) : card.lines.length === 1 ? (
        <p className="float-reply">{first}</p>
      ) : (
        <ul className="float-list">
          {card.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
      {card.source && (
        <p className="float-cite">
          <span className="float-cite-mark" aria-hidden="true" />
          <span>
            <strong>{card.source.label}</strong>
            {card.source.passage}
          </span>
        </p>
      )}
      <p className="float-foot">{card.foot}</p>
    </figure>
  );
}

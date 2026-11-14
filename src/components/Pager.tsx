// "01 / 03" with previous and next arrows. The arrows mirror in right-to-left pages.
export function Pager({
  index,
  count,
  prev,
  next,
  onGo,
}: {
  index: number;
  count: number;
  prev: string;
  next: string;
  onGo: (step: number) => void;
}) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="pager">
      <span className="pager-count" dir="ltr" aria-live="polite">
        {pad(index + 1)} / {pad(count)}
      </span>
      <button type="button" className="pager-btn" aria-label={prev} onClick={() => onGo(index - 1)}>
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" className="arrow-prev">
          <path d="M12 4 6 10l6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button type="button" className="pager-btn" aria-label={next} onClick={() => onGo(index + 1)}>
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" className="arrow-next">
          <path d="m8 4 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

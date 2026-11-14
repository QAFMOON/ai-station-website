// The mark: a wall with one gate, and what you protect inside it.
export function Logo({ name }: { name: string }) {
  return (
    <span className="logo">
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <path
          d="M20 3H8a5 5 0 0 0-5 5v16a5 5 0 0 0 5 5h16a5 5 0 0 0 5-5V12"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="4.5" fill="currentColor" />
      </svg>
      <span className="logo-name">{name}</span>
    </span>
  );
}

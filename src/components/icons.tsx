export function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" {...props}>
      <path d="M12 21s-6.7-4.35-9.33-8.2C1 10.1 1.5 6.6 4.6 5.1c2.2-1.05 4.4-.2 5.9 1.6l1.5 1.8 1.5-1.8c1.5-1.8 3.7-2.65 5.9-1.6 3.1 1.5 3.6 5 1.93 7.7C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}

export function CommentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" {...props}>
      <path d="M12 5c-6 0-10 5.5-10 7s4 7 10 7 10-5.5 10-7-4-7-10-7zm0 11.5A4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 0 1 0 9z" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" {...props}>
      <path d="M21 3 3 10.5l7.5 2.5L15 21l6-18z" />
    </svg>
  );
}

export function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-3.5 w-3.5"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function TranscriptIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-3.5 w-3.5"
      {...props}
    >
      <path
        d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

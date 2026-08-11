import { ReactNode } from "react";

export default function Hero({ children }: { children: ReactNode }) {
  return (
    <section className="bg-grid relative overflow-hidden px-4 pb-16 pt-20 sm:pt-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="mb-6 rounded-full border border-white/10 bg-surface px-4 py-1.5 text-xs font-medium text-muted">
          Public reels, unpacked in seconds
        </span>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          Any Instagram handle,
          <br />
          <span className="font-accent text-gradient font-normal not-italic sm:italic">
            fully unpacked.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-balance text-base text-muted sm:text-lg">
          Drop a public handle. We pull their last 5 reels with likes, views,
          comments and shares, let you play them one at a time, and surface
          the full spoken transcript for every video.
        </p>

        <div className="mt-9 w-full">{children}</div>

        <p className="mt-4 text-xs text-muted">
          Public accounts only · No login required
        </p>
      </div>
    </section>
  );
}

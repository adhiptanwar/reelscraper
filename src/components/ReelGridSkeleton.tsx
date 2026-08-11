export default function ReelGridSkeleton() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-24">
      <div className="mb-6 h-5 w-48 rounded skeleton" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl bg-surface glow-border">
            <div className="aspect-[9/16] w-full skeleton" />
            <div className="flex flex-col gap-3 p-4">
              <div className="h-3 w-full rounded skeleton" />
              <div className="h-3 w-2/3 rounded skeleton" />
              <div className="flex gap-1.5">
                <div className="h-6 w-14 rounded-lg skeleton" />
                <div className="h-6 w-14 rounded-lg skeleton" />
                <div className="h-6 w-14 rounded-lg skeleton" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

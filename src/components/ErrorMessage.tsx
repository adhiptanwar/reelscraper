export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="mx-auto w-full max-w-xl px-4 pb-24">
      <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] px-5 py-4 text-center text-sm text-red-300">
        {message}
      </div>
    </div>
  );
}

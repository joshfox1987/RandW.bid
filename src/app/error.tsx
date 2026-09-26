'use client';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 text-center">
      <div className="space-y-4 max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">R &amp; W Property Solutions</p>
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Something went wrong!</h1>
        <p className="text-muted-foreground">
          An unexpected error occurred. Please try again or return home.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex h-11 items-center justify-center rounded-md bg-secondary px-6 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/80"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

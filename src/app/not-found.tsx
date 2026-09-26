import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 text-center">
      <div className="space-y-4 max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">R &amp; W Property Solutions</p>
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Page Not Found</h1>
        <p className="text-muted-foreground">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

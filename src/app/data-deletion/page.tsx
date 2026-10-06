import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Data Deletion | J Fox Ink',
  description: 'Data deletion policy and request procedure for J Fox Ink client inquiries and design specifications.',
};

export default function DataDeletionPage() {
  return (
    <main className="min-h-screen bg-[#070A0F] text-slate-200 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <Link
          href="/"
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5"
        >
          ← Return to J Fox Ink
        </Link>
        <div className="mt-8 space-y-8">
          <header className="space-y-3 pb-6 border-b border-white/10">
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              J Fox Ink Atelier
            </p>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Data & Artwork Deletion Request
            </h1>
            <p className="text-sm text-slate-400">
              If you have submitted a custom quote ticket or emailed design files to J Fox Ink and wish to have all stored records or CAD/vector assets purged, follow the instructions below.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-bold text-white">How to Request Deletion</h2>
            <ol className="list-decimal space-y-2 pl-6 text-xs text-slate-300 leading-relaxed">
              <li>
                Send an email to{' '}
                <a
                  href="mailto:orders@jfox.ink?subject=Data%20Deletion%20Request"
                  className="text-cyan-400 hover:underline font-mono"
                >
                  orders@jfox.ink
                </a>{' '}
                with the subject line: <span className="font-mono text-white">Data Deletion Request</span>.
              </li>
              <li>Include your name, email address, and ticket ID (if you generated an Ink Lab spec ticket).</li>
              <li>Specify whether you want your email inquiry deleted, client records removed, or proprietary vector artwork wiped from our fabrication cache.</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-bold text-white">Fulfillment Window</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Deletion requests are acknowledged within 48 business hours and completed within 7 business days. We will send a confirmation once your records and artwork archives are purged.
            </p>
          </section>

          <p className="text-xs font-mono text-slate-500 pt-6 border-t border-white/10">
            Last updated: October 2026 · J Fox Ink (jfox.ink)
          </p>
        </div>
      </div>
    </main>
  );
}

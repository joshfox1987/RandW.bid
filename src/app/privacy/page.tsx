import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | J Fox Ink',
  description: 'Privacy policy for J Fox Ink client inquiries, artwork files, and custom fabrication orders.',
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-400">
              This policy explains how J Fox Ink handles your design files, artwork specs, and contact details for custom vinyl decals, apparel printing, and 3D digital fabrication.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-bold text-white">1. Information We Collect</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              When you submit a project spec through the Ink Lab or email us, we collect your name, email address, contact handle, project specifications, and vector design artwork assets. We do not sell or monetize personal information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-bold text-white">2. Artwork Intellectual Property</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              All proprietary artwork, vector brand assets, logos, and custom graphics provided by clients remain 100% the intellectual property of the respective client. J Fox Ink only uses your vector files for production, proofing, and fabrication purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-bold text-white">3. LocalStorage & Client-Side Privacy</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our website uses client-side LocalStorage exclusively to preserve your active Ink Lab project drafts within your browser. No third-party data tracking brokers receive your spec drafts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-bold text-white">4. Inquiries & Data Rights</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              To request a copy or deletion of your project records or email inquiries, contact Josh Fox directly at{' '}
              <a
                href="mailto:orders@jfox.ink"
                className="text-cyan-400 hover:underline font-mono"
              >
                orders@jfox.ink
              </a>
              .
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

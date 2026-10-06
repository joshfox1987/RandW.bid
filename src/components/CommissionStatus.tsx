'use client';

import React, { useState } from 'react';
import { Mail, Check, Copy, Clock, Zap, Shield, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export default function CommissionStatus() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const turnaroundTiers = [
    {
      title: 'Rush / Sprint Queue',
      leadTime: '24–48 Hours',
      desc: 'Immediate machine priority for race events, emergency trade show decals, and tight deadlines.',
      badge: 'Priority Lane',
      accent: 'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/5',
    },
    {
      title: 'Standard Atelier Turn',
      leadTime: '3–5 Business Days',
      desc: 'Standard turnaround for custom apparel drops, multi-layer decals, and SLA 3D prototypes.',
      badge: 'Most Popular',
      accent: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5',
    },
    {
      title: 'Fleet & Bulk Production',
      leadTime: '7–10 Business Days',
      desc: 'Large vehicle fleet lettering, multi-hundred apparel merch orders, and mass physical fabrication.',
      badge: 'Commercial Scale',
      accent: 'text-lime-400 border-lime-500/30 bg-lime-500/5',
    },
  ];

  const faqs = [
    {
      q: 'What vector file formats do you accept for vinyl cutting and screen printing?',
      a: 'We prefer vector source files in .AI (Adobe Illustrator), .SVG, .EPS, or .DXF with all text converted to outlines and strokes expanded. If you only have a low-res JPG, PNG, or rough drawing, our Ink Lab can redraw and vectorize it to mathematically flawless Bézier paths.',
    },
    {
      q: 'How durable is your custom vinyl on exterior automotive and commercial vehicles?',
      a: 'We use genuine 3M 1080/2080 and Oracal 751 cast vinyl rated for 7 to 10 years of outdoor UV, highway wind, and weather resistance. Decals are laminated against abrasions, fuel splashes, and chemical car washes.',
    },
    {
      q: 'What kind of blanks do you print apparel on?',
      a: 'We strictly refuse flimsy synthetic blanks. We stock heavyweight 280–320 GSM combed cotton t-shirts and 400–450 GSM French terry hoodies from premium streetwear mills with zero boxy collar stretch or shrinking.',
    },
    {
      q: 'Can you prototype custom functional 3D parts with real mechanical durability?',
      a: 'Yes. For rigid enclosures and vehicle brackets we utilize carbon-fiber reinforced PETG and polycarbonate. For ultra-detailed cosmetic pieces and display art, we run 50µm SLA resin curing with post-thermal baking.',
    },
  ];

  return (
    <section id="turnaround" className="py-20 bg-[#070A0F] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101726] border border-lime-400/30 text-xs font-mono text-lime-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span>Studio Commission Status: Active & Accepting Commissions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Turnaround Standards & Direct Dispatch
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Transparent scheduling with zero guesswork. Review our production turnaround brackets or reach the workbench directly.
          </p>
        </div>

        {/* Turnaround Expectations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {turnaroundTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border ${tier.accent} bg-[#101726] flex flex-col justify-between space-y-4`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400 uppercase tracking-wider">{tier.badge}</span>
                  <Clock className="w-4 h-4 opacity-75" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-1">
                  {tier.title}
                </h3>
                <div className="text-2xl font-display font-extrabold text-white tracking-tight my-2">
                  {tier.leadTime}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {tier.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-slate-400">
                ✓ Full proofing & digital mockup included
              </div>
            </div>
          ))}
        </div>

        {/* Direct Contact Cards */}
        <div id="contact" className="bg-[#101726] rounded-2xl border border-white/10 p-6 sm:p-10 mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left direct contact text (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Direct Atelier Dispatch
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Have a Custom Artwork or Livery Inquiry?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect directly with Josh Fox. Whether you need single one-off track decals, an entire 50-car commercial fleet, or custom brand merch drops, you talk directly with the craftsman operating the machinery.
              </p>

              {/* Unboxed Metadata with clean separators */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 pt-2">
                <span>Studio: High-Precision Atelier</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Response: &lt; 24h</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Worldwide Dispatch</span>
              </div>
            </div>

            {/* Right quick copy buttons (6 cols) */}
            <div className="lg:col-span-6 space-y-3">
              {[
                {
                  label: 'General Inquiries & Orders',
                  value: 'orders@jfox.ink',
                  key: 'orders',
                  cta: 'Email Orders Desk',
                },
                {
                  label: 'Direct Artisan / Creative Lead',
                  value: 'josh@jfox.ink',
                  key: 'josh',
                  cta: 'Email Josh Fox',
                },
                {
                  label: 'Instagram / Portfolio Showcase',
                  value: '@jfox.ink',
                  key: 'social',
                  cta: 'Follow Instagram',
                },
              ].map((contact) => (
                <div
                  key={contact.key}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs"
                >
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">
                      {contact.label}
                    </span>
                    <span className="font-mono text-white font-medium text-sm">
                      {contact.value}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(contact.value, contact.key)}
                      className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 font-mono text-xs"
                    >
                      {copiedKey === contact.key ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-lime-400" />
                          <span className="text-lime-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    {contact.value.includes('@') && (
                      <a
                        href={`mailto:${contact.value}`}
                        className="px-3 py-1.5 rounded-md bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 transition-colors font-medium text-xs whitespace-nowrap"
                      >
                        Email
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Production FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-400">
              Technical Knowledge Base
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
              Frequently Asked Workshop Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-[#101726] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-display font-bold text-white hover:text-cyan-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-4" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed pt-1 border-t border-white/5 font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

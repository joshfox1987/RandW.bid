'use client';

import React from 'react';
import { ArrowUp, Github, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070B] border-t border-white/10 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10 items-start">
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-cyan-400 rounded-sm inline-block shadow-[0_0_10px_#06B6D4]" />
              <span className="text-xl font-display font-extrabold text-white tracking-tight">
                J FOX INK
              </span>
            </div>
            <p className="text-slate-300 max-w-sm text-xs leading-relaxed">
              Precision Vinyl. Raw Custom Graphics. Digital Fabrication. Hand-crafted in-house with commercial-grade tooling and zero corporate compromise.
            </p>
            <div className="pt-2 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
              <span>Domain: jfox.ink</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Josh Fox Studio</span>
            </div>
          </div>

          {/* Jump Links (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <span className="font-mono text-white uppercase text-[11px] block mb-2.5 tracking-wider">
                Capabilities
              </span>
              <ul className="space-y-2">
                <li>
                  <a href="#capabilities" className="hover:text-cyan-400 transition-colors">
                    Precision Vinyl Decals
                  </a>
                </li>
                <li>
                  <a href="#capabilities" className="hover:text-cyan-400 transition-colors">
                    Custom Apparel Merch
                  </a>
                </li>
                <li>
                  <a href="#capabilities" className="hover:text-cyan-400 transition-colors">
                    3D Digital Fabrication
                  </a>
                </li>
                <li>
                  <a href="#capabilities" className="hover:text-cyan-400 transition-colors">
                    Vector Brand Identity
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-white uppercase text-[11px] block mb-2.5 tracking-wider">
                Client Portal
              </span>
              <ul className="space-y-2">
                <li>
                  <a href="#ink-lab" className="hover:text-cyan-400 transition-colors">
                    The Ink Lab Builder
                  </a>
                </li>
                <li>
                  <a href="#vault" className="hover:text-cyan-400 transition-colors">
                    The Vault Portfolio
                  </a>
                </li>
                <li>
                  <a href="#turnaround" className="hover:text-cyan-400 transition-colors">
                    Turnaround Expectations
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-cyan-400 transition-colors">
                    Direct Contact Desk
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* GitHub / Zero-Bloat Badge & Back to Top (3 cols) */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between space-y-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors font-mono text-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            {/* Zero-Bloat Static Engine hosted on GitHub badge */}
            <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-left md:text-right space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs text-lime-400 font-mono font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero-Bloat Static Engine</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-snug">
                100% Free-Tier Architecture hosted on GitHub Pages · Zero server-side runtime costs.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Font Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} J Fox Ink. All rights reserved. Precision Craft & Unconventional Graphics.
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Type: Syne + Plus Jakarta Sans + JetBrains Mono</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

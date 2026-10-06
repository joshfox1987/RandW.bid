'use client';

import React from 'react';
import { ArrowRight, Sparkles, Layers, Scissors, Box, ShieldCheck, Compass } from 'lucide-react';
import { SafeImage } from '@/components/ui/SafeImage';

export default function Hero() {
  const badgeRack = [
    {
      label: 'Vector Art & Apparel',
      icon: <Layers className="w-3.5 h-3.5 text-cyan-400" />,
      target: '#capabilities',
      accent: 'hover:border-cyan-400/50 hover:text-cyan-300',
    },
    {
      label: 'Precision Decals & Commercial Signs',
      icon: <Scissors className="w-3.5 h-3.5 text-fuchsia-400" />,
      target: '#capabilities',
      accent: 'hover:border-fuchsia-400/50 hover:text-fuchsia-300',
    },
    {
      label: 'Digital 3D Fabrication',
      icon: <Box className="w-3.5 h-3.5 text-lime-400" />,
      target: '#capabilities',
      accent: 'hover:border-lime-400/50 hover:text-lime-300',
    },
  ];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-[#070A0F] bg-cyber-grid">
      {/* Ambient gradient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-fuchsia-500/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Studio Live Availability Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500" />
              </span>
              <span className="text-slate-400">Commission Atelier:</span>
              <span className="text-white font-medium">Accepting Projects for 2026</span>
            </div>

            {/* Kinetic Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              Precision Vinyl.{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-lime-400 bg-clip-text text-transparent">
                Raw Custom Graphics.
              </span>{' '}
              Digital Fabrication.
            </h1>

            {/* High-Impact Subtitle */}
            <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Engineered by craftsman Josh Fox. We transform raw concepts into high-density streetwear merchandise, race-spec automotive liveries, spot-color vector emblems, and rapid SLA/FDM 3D prototypes with zero corporate fluff.
            </p>

            {/* Interactive Badge Rack */}
            <div className="pt-2">
              <span className="block text-xs uppercase font-mono tracking-wider text-slate-400 mb-2.5">
                Core Workshop Disciplines
              </span>
              <div className="flex flex-wrap gap-2.5">
                {badgeRack.map((badge) => (
                  <a
                    key={badge.label}
                    href={badge.target}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#101726]/90 border border-white/10 text-xs font-medium text-slate-200 transition-all duration-150 ${badge.accent}`}
                  >
                    {badge.icon}
                    <span>{badge.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="#ink-lab"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-all rounded-md shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]"
              >
                <span>Launch Custom Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#vault"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide text-slate-200 hover:text-white bg-[#101726] hover:bg-[#151E30] border border-white/10 hover:border-cyan-400/40 transition-all rounded-md"
              >
                <span>Explore The Vault</span>
              </a>
            </div>

            {/* Unboxed Metadata Metrics with clean separators */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="text-white font-bold tabular-nums">1,200+</span>
                <span>Custom Decals Plotted</span>
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div className="flex items-center gap-1.5">
                <span className="text-cyan-400 font-bold tabular-nums">0.05mm</span>
                <span>Plotter Tolerance</span>
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div className="flex items-center gap-1.5">
                <span className="text-lime-400 font-bold tabular-nums">48h</span>
                <span>Fast-Track Turnaround</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Atelier Showcase Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#101726] shadow-2xl group">
              {/* Corner tech accent marks */}
              <div className="absolute top-2 left-2 z-20 text-[10px] font-mono text-cyan-400 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-cyan-500/30">
                CAMM-1 CUT LAB // 100% VECTOR TRUE
              </div>

              {/* Showcase Image */}
              <div className="aspect-[4/3] w-full relative">
                <SafeImage
                  src="/images/hero_workshop_art_1790801737897.jpg"
                  alt="J Fox Ink Workshop Plotter & Vector Art"
                  priority={true}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent opacity-90" />
              </div>

              {/* Card Footer Info */}
              <div className="p-5 relative z-10 -mt-12 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/95 to-transparent">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                  <span className="text-cyan-400 font-semibold">STUDIO SPEC: LIVE RUN</span>
                  <span>JFOX.INK</span>
                </div>
                <h3 className="text-base font-display font-bold text-white">
                  Precision Plotter & Spot-Color Cured Station
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Multi-layer automotive cast vinyl, 50-micron SLA polymer prototyping, and high-tensile screen printed streetwear.
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Hardware Profile:</span>
                  <span className="font-mono text-slate-200">Roland 60° Optic · Anycubic Photon M5s</span>
                </div>
              </div>
            </div>

            {/* Decorative background grid flare */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-cyan-500/20 rounded-lg pointer-events-none -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { Scissors, Shirt, Box, PenTool, CheckCircle2, ArrowRight } from 'lucide-react';

interface CapabilityPillar {
  id: string;
  title: string;
  shortDesc: string;
  tagline: string;
  icon: React.ReactNode;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  badgeText: string;
  specs: {
    label: string;
    value: string;
  }[];
  features: string[];
  recommendedUse: string;
  mediumKey: string;
}

export default function CapabilitiesMatrix({
  onSelectMedium,
}: {
  onSelectMedium?: (medium: string) => void;
}) {
  const pillars: CapabilityPillar[] = [
    {
      id: 'vinyl',
      title: 'Precision Vinyl & Commercial Decals',
      shortDesc: 'Automotive liveries, fleet markings, and heavy-duty contour-cut decals.',
      tagline: 'Micron-accurate blade cuts with zero ragged edges or bubbling.',
      icon: <Scissors className="w-5 h-5 text-cyan-400" />,
      accentColor: 'text-cyan-400',
      accentBg: 'bg-cyan-500/10',
      accentBorder: 'border-cyan-500/30 hover:border-cyan-400/60',
      badgeText: '3M 1080/2080 · Oracal 751',
      specs: [
        { label: 'Blade Tolerance', value: '±0.05 mm' },
        { label: 'Max Width', value: '54" Seamless' },
        { label: 'Outdoor Durability', value: '7-10 Years UV' },
        { label: 'Substrates', value: 'Cast, Reflective, Chrome, Holographic' },
      ],
      features: [
        'Multi-layer weeded vector assemblies',
        'Vehicle fleet graphics & DOT commercial lettering',
        'Architectural etched glass & storefront graphics',
        'Heavy-duty transfer tape with bubble-free release channels',
      ],
      recommendedUse: 'Race cars, work trucks, storefronts, laptop decals, custom product labeling.',
      mediumKey: 'vinyl',
    },
    {
      id: 'apparel',
      title: 'Custom Apparel & Streetwear Merch',
      shortDesc: 'Heavyweight textile prints with tactile, durable artisan inks.',
      tagline: 'Zero cheap polyester sheen. True streetwear heavyweight blanks.',
      icon: <Shirt className="w-5 h-5 text-fuchsia-400" />,
      accentColor: 'text-fuchsia-400',
      accentBg: 'bg-fuchsia-500/10',
      accentBorder: 'border-fuchsia-500/30 hover:border-fuchsia-400/60',
      badgeText: '350–450 GSM Heavyweights',
      specs: [
        { label: 'Garment Blanks', value: 'Custom 100% Combed Cotton' },
        { label: 'Wash Longevity', value: '50+ Wash Tested' },
        { label: 'Print Methods', value: 'Elastomeric Heat-Transfer & Screenprint' },
        { label: 'Finishes', value: 'Matte, High-Density, Metallic, Glow' },
      ],
      features: [
        'Oversized vintage streetwear box-fit silhouettes',
        'Spot-color precision with razor line detail',
        'Custom woven neck tags & sleeve hem emblems',
        'No cracking, peeling, or fading under heavy wash wear',
      ],
      recommendedUse: 'Brand merch drops, band tours, gym apparel, crew uniforms, limited collector runs.',
      mediumKey: 'apparel',
    },
    {
      id: '3d-print',
      title: 'Digital 3D Fabrication & Prototyping',
      shortDesc: 'High-precision SLA resin & reinforced FDM engineering components.',
      tagline: 'From digital CAD geometry to high-detail physical reality in hours.',
      icon: <Box className="w-5 h-5 text-lime-400" />,
      accentColor: 'text-lime-400',
      accentBg: 'bg-lime-500/10',
      accentBorder: 'border-lime-500/30 hover:border-lime-400/60',
      badgeText: '50-Micron SLA / Tough PETG',
      specs: [
        { label: 'Resolution', value: '50µm layer height (SLA)' },
        { label: 'Build Envelope', value: 'Up to 300 x 300 x 400 mm' },
        { label: 'Materials', value: 'Tough UV Resin, Carbon PETG, PLA+, TPU' },
        { label: 'Post-Processing', value: 'UV Cured, Hand-Sanded, Matte Sealed' },
      ],
      features: [
        'Functional mechanical brackets and custom vehicle bezels',
        'Bespoke sculptural brand emblems & display trophies',
        'Ergonomic product prototypes and tactile mockups',
        'Embedded brass heat-set inserts for threaded fasteners',
      ],
      recommendedUse: 'Custom automotive dash pods, architectural badges, collector art sculptures, drone parts.',
      mediumKey: '3d-print',
    },
    {
      id: 'vector',
      title: 'Vector Art & Brand Identity',
      shortDesc: 'Production-ready vector assets engineered for high-speed machining.',
      tagline: 'Mathematical Bézier perfection with zero rogue anchor points.',
      icon: <PenTool className="w-5 h-5 text-cyan-300" />,
      accentColor: 'text-cyan-300',
      accentBg: 'bg-cyan-500/10',
      accentBorder: 'border-cyan-500/30 hover:border-cyan-400/60',
      badgeText: 'Pantone Spot · Clean SVG/AI',
      specs: [
        { label: 'File Formats', value: 'AI, SVG, EPS, DXF, PDF (Ready to Cut)' },
        { label: 'Color Space', value: 'Pantone Solid Coated & CMYK' },
        { label: 'Optimization', value: 'Minimal node counts for CNC/laser/plotter' },
        { label: 'Vectorization', value: 'Manual pen-tool redraw from low-res sketches' },
      ],
      features: [
        'High-voltage brand marks & aggressive emblems',
        'Screen-ready spot color separations with choke/bleed traps',
        'Cutline generation with contour bleed offsets',
        'Scale-independent infinite resolution fidelity',
      ],
      recommendedUse: 'Full brand identity kits, cutting plotter files, laser engraving paths, embroidered patches.',
      mediumKey: 'vector',
    },
  ];

  const [activePillarId, setActivePillarId] = useState<string>('vinyl');
  const activePillar = pillars.find((p) => p.id === activePillarId) || pillars[0];

  const handleLaunchSpec = (mediumKey: string) => {
    if (onSelectMedium) {
      onSelectMedium(mediumKey);
    }
    const element = document.getElementById('ink-lab');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="capabilities" className="py-20 bg-[#0B0F17] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 mb-2">
            Engineered Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            The Capabilities Matrix
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Every medium is executed in-house with commercial-grade tooling. No drop-shipping, no generic automated middlemen—just precision craftsmanship.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {pillars.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillarId(pillar.id)}
                className={`p-4 rounded-xl text-left transition-all duration-150 flex flex-col justify-between border ${
                  isActive
                    ? `${pillar.accentBg} ${pillar.accentBorder} shadow-[0_0_20px_rgba(0,0,0,0.4)]`
                    : 'bg-[#101726]/60 border-white/10 hover:border-white/20 hover:bg-[#101726]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className={`p-2 rounded-lg ${pillar.accentBg}`}>
                    {pillar.icon}
                  </div>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-white">
                    {pillar.title.split('&')[0]}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {pillar.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Feature Card */}
        <div className="bg-[#101726] rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          {/* Subtle accent highlight line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-lime-400" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left spec & features (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-black/40 text-cyan-400 border border-cyan-500/20">
                    {activePillar.badgeText}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    DISCIPLINE SPEC // 0{pillars.findIndex((p) => p.id === activePillar.id) + 1}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {activePillar.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {activePillar.tagline}
                </p>
              </div>

              {/* Bullet Features */}
              <div className="space-y-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Production Highlights
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activePillar.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best For */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Ideal Application Context
                </span>
                <p className="text-xs text-slate-200">
                  {activePillar.recommendedUse}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleLaunchSpec(activePillar.mediumKey)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded-md transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <span>Build {activePillar.title.split('&')[0]} Spec in Ink Lab</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Specs Table (5 cols) */}
            <div className="lg:col-span-5 bg-black/40 rounded-xl border border-white/5 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                <span className="text-slate-400 uppercase tracking-wider">
                  Technical Specifications
                </span>
                <span className="text-cyan-400">JFOX-LAB-VERIFIED</span>
              </div>

              <div className="divide-y divide-white/5 space-y-3">
                {activePillar.specs.map((spec, i) => (
                  <div key={i} className="pt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{spec.label}</span>
                    <span className="font-mono text-slate-100 font-medium text-right max-w-[60%]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-slate-400 leading-relaxed font-mono">
                ⚡ All outputs inspectable via micrometer & color spectrophotometer prior to dispatch.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

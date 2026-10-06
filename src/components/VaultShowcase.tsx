'use client';

import React, { useState } from 'react';
import { SafeImage } from '@/components/ui/SafeImage';
import { X, ExternalLink, SlidersHorizontal, ArrowRight, Eye, Check } from 'lucide-react';

export interface VaultItem {
  id: string;
  title: string;
  category: 'vinyl' | 'apparel' | '3d' | 'vector';
  categoryLabel: string;
  image: string;
  aspectRatio: string;
  shortDesc: string;
  fullDesc: string;
  specs: {
    substrate: string;
    tooling: string;
    turnaround: string;
    finish: string;
    colorCount: string;
  };
  mediumKey: string;
}

export default function VaultShowcase({
  onSelectSpec,
}: {
  onSelectSpec?: (item: VaultItem) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [inspectItem, setInspectItem] = useState<VaultItem | null>(null);

  const vaultItems: VaultItem[] = [
    {
      id: 'v1',
      title: 'Precision Holographic & Matte Black Cut Livery',
      category: 'vinyl',
      categoryLabel: 'Vinyl & Signage',
      image: '/images/vault_precision_vinyl_1790801746585.jpg',
      aspectRatio: 'aspect-[4/3]',
      shortDesc: 'Multi-layer weeded cast vinyl with oil-slick holographic accents on matte charcoal.',
      fullDesc:
        'Engineered for extreme track-duty and show car presentation. We layered premium 3M 2080 cast vinyl over micro-contoured holographic refractive vinyl. Every sharp angle was cut using a 60° carbide blade to prevent edge curling under 140mph wind speeds.',
      specs: {
        substrate: '3M 2080 Series Cast + Avery Neo-Chrome',
        tooling: 'Roland CAMM-1 60° Carbide Blade',
        turnaround: '48 Hours',
        finish: 'Dual-tone Matte & Holographic Iridescent',
        colorCount: '3 Layers Weeded by Hand',
      },
      mediumKey: 'vinyl',
    },
    {
      id: 'v2',
      title: 'Atelier Heavyweight 450GSM Graphic Hoodie',
      category: 'apparel',
      categoryLabel: 'Custom Merch',
      image: '/images/vault_custom_apparel_1790801755627.jpg',
      aspectRatio: 'aspect-[4/3]',
      shortDesc: 'Ultra-dense electric magenta & cyan screenprint on 100% combed cotton fleece.',
      fullDesc:
        'Crafted for an exclusive limited drop. Features custom high-density ink formulation for a raised, tactile texture that resists heavy wash cycles without spiderweb cracking. Hand-pressed with silicone curing mats for a rich matte sheen.',
      specs: {
        substrate: '450 GSM Heavyweight Organic French Terry',
        tooling: 'High-Tension Newman Roller Screens',
        turnaround: '4-5 Days',
        finish: 'Matte Tactile High-Density Finish',
        colorCount: '4 Spot Pantone Colors',
      },
      mediumKey: 'apparel',
    },
    {
      id: 'v3',
      title: 'Cybernetic Bespoke Artisan Display Sculpture',
      category: '3d',
      categoryLabel: '3D Fabrication',
      image: '/images/vault_digital_fabrication_1790801764630.jpg',
      aspectRatio: 'aspect-[4/3]',
      shortDesc: '50-micron SLA polymer prototyping with translucent internal light channels.',
      fullDesc:
        'Industrial art display piece featuring complex internal lattice structures impossible to machine via traditional CNC. Printed in tough engineering resin, post-cured under 405nm ultraviolet radiation, and hand-finished with an ultra-matte graphite topcoat.',
      specs: {
        substrate: 'Anycubic Tough SLA Resin + Translucent Cyan',
        tooling: 'Anycubic Photon M5s 12K Micro-Layer',
        turnaround: '3 Days',
        finish: 'Hand-Sanded 2000-grit & UV Sealed',
        colorCount: 'Dual-material assembly',
      },
      mediumKey: '3d-print',
    },
    {
      id: 'v4',
      title: 'Aggressive Geometric Fox Vector Identity',
      category: 'vector',
      categoryLabel: 'Vector Art',
      image: '/images/vault_vector_identity_1790801775154.jpg',
      aspectRatio: 'aspect-[4/3]',
      shortDesc: 'Mathematical Bézier geometry optimized for instant plotter contour cutting.',
      fullDesc:
        'Complete brand identity insignia engineered from scratch with clean 45° and 90° tangent constraints. Anchor point density was reduced by 65% compared to automated traces, ensuring seamless plotter travel speeds and zero corner tearing.',
      specs: {
        substrate: 'Vector Source (.AI, .SVG, .EPS, .DXF)',
        tooling: 'Custom Mathematical Bézier Construction',
        turnaround: '48 Hours',
        finish: 'Pantone Solid Coated + Trapping Blends',
        colorCount: 'Pantone 806C Neon + Reflex Blue',
      },
      mediumKey: 'vector',
    },
    {
      id: 'v5',
      title: 'Commercial Fleet Van High-Visibility Lettering',
      category: 'vinyl',
      categoryLabel: 'Vinyl & Signage',
      image: '/images/hero_workshop_art_1790801737897.jpg',
      aspectRatio: 'aspect-[4/3]',
      shortDesc: 'Full fleet branding with DOT-compliant reflective accents and UV over-lamination.',
      fullDesc:
        'Full side-panel and rear gate lettering designed for maximum highway legibility. Incorporates micro-prismatic reflective vinyl for nighttime illumination, laminated with cast UV guard against sun fading and chemical wash solutions.',
      specs: {
        substrate: 'Oralite 5600 Reflective + Oracal 751 High-Gloss',
        tooling: 'Tangential Plotter Blade with Optical Alignment',
        turnaround: '3 Days per Vehicle',
        finish: 'Ultra-Gloss UV Clear Shield',
        colorCount: '2 Spot Colors + Prismatic White',
      },
      mediumKey: 'vinyl',
    },
    {
      id: 'v6',
      title: 'Limited Screenprinted Vector Tour Tees',
      category: 'apparel',
      categoryLabel: 'Custom Merch',
      image: '/images/vault_custom_apparel_1790801755627.jpg',
      aspectRatio: 'aspect-[4/3]',
      shortDesc: 'Discharge ink print on vintage garment-dyed 280 GSM cotton tees.',
      fullDesc:
        'Ultra soft-hand discharge printing where the ink replaces the fabric dye rather than sitting on top, creating a breathable, zero-weight finish that becomes softer with every wash.',
      specs: {
        substrate: '280 GSM Vintage Washed Combed Cotton',
        tooling: 'Discharge Water-Base Chemistry',
        turnaround: '5 Days',
        finish: 'Zero-Feel Breathable Hand',
        colorCount: '3 Spot Discharged Inks',
      },
      mediumKey: 'apparel',
    },
  ];

  const filteredItems =
    activeFilter === 'all'
      ? vaultItems
      : vaultItems.filter((item) => item.category === activeFilter);

  const handleSelectAndSeed = (item: VaultItem) => {
    if (onSelectSpec) {
      onSelectSpec(item);
    }
    setInspectItem(null);
    const element = document.getElementById('ink-lab');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="vault" className="py-20 bg-[#070A0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 mb-2">
              Physical Artifacts & Proofs
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              The Vault
            </h2>
            <p className="mt-2 text-slate-300 text-sm max-w-xl">
              A curated catalog of custom-cut vinyl, bespoke apparel runs, resin engineering prints, and mathematical vector identity work.
            </p>
          </div>

          {/* Filter Controls (Segmented functional buttons per Section 1.A) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#101726] border border-white/10 rounded-lg">
            {[
              { id: 'all', label: 'All Works' },
              { id: 'vinyl', label: 'Vinyl & Signage' },
              { id: 'apparel', label: 'Custom Merch' },
              { id: '3d', label: '3D Fabrication' },
              { id: 'vector', label: 'Vector Art' },
            ].map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap ${
                    active
                      ? 'bg-cyan-400 text-black font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Masonry / Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#101726] rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:border-cyan-400/40 transition-all duration-200"
            >
              {/* Image Preview Container */}
              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() => setInspectItem(item)}
              >
                <div className={`${item.aspectRatio} w-full relative`}>
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101726] via-transparent to-transparent opacity-80" />
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider shadow-lg">
                    <Eye className="w-3.5 h-3.5" />
                    Inspect Specifications
                  </span>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Clean unboxed metadata with typographic separators (NO PILLS) */}
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                    <span>{item.categoryLabel}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-400">{item.specs.turnaround} Lead</span>
                  </div>

                  <h3
                    onClick={() => setInspectItem(item)}
                    className="text-base font-display font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setInspectItem(item)}
                    className="text-xs font-mono text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Specs</span>
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectAndSeed(item)}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Request Spec</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Inspector View */}
        {inspectItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setInspectItem(null)}
          >
            <div
              className="bg-[#101726] border border-white/20 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setInspectItem(null)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close Inspection Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Visual Preview (5 cols) */}
                <div className="md:col-span-5 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                  <div className="aspect-[4/3] w-full relative">
                    <SafeImage
                      src={inspectItem.image}
                      alt={inspectItem.title}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-3 bg-black/60 text-[11px] font-mono text-slate-400 flex justify-between items-center">
                    <span>SPEC PROOF VERIFIED</span>
                    <span className="text-cyan-400">J FOX INK</span>
                  </div>
                </div>

                {/* Details & Technical Breakdown (7 cols) */}
                <div className="md:col-span-7 space-y-4">
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <span>{inspectItem.categoryLabel}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-400">ID: {inspectItem.id.toUpperCase()}-INSPECT</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                    {inspectItem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {inspectItem.fullDesc}
                  </p>

                  {/* Spec Sheet Table */}
                  <div className="bg-black/40 rounded-xl p-4 border border-white/5 space-y-2.5 text-xs">
                    <div className="flex justify-between pb-2 border-b border-white/5">
                      <span className="text-slate-400">Substrate / Medium:</span>
                      <span className="font-mono text-slate-200 text-right">
                        {inspectItem.specs.substrate}
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/5">
                      <span className="text-slate-400">Tooling & Cut Profile:</span>
                      <span className="font-mono text-slate-200 text-right">
                        {inspectItem.specs.tooling}
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/5">
                      <span className="text-slate-400">Finish & Sheen:</span>
                      <span className="font-mono text-slate-200 text-right">
                        {inspectItem.specs.finish}
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/5">
                      <span className="text-slate-400">Color Pass / Layers:</span>
                      <span className="font-mono text-slate-200 text-right">
                        {inspectItem.specs.colorCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Standard Turnaround:</span>
                      <span className="font-mono text-lime-400 text-right font-medium">
                        {inspectItem.specs.turnaround}
                      </span>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => handleSelectAndSeed(inspectItem)}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    >
                      <span>Configure Similar Spec in Ink Lab</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

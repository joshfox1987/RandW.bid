'use client';

import React, { useState, useEffect } from 'react';
import {
  Scissors,
  Shirt,
  Box,
  PenTool,
  Send,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Clock,
  DollarSign,
  FileCheck,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { VaultItem } from './VaultShowcase';

interface InkLabState {
  medium: 'vinyl' | 'apparel' | '3d-print' | 'vector';
  itemType: string;
  quantity: number;
  dimensions: string;
  colors: number;
  finish: string;
  vectorStatus: 'ready' | 'sketch' | 'needs-trace';
  deadline: 'standard' | 'rush' | 'flexible';
  clientName: string;
  clientEmail: string;
  clientContact: string;
  projectNotes: string;
}

const defaultState: InkLabState = {
  medium: 'vinyl',
  itemType: 'die-cut-decal',
  quantity: 25,
  dimensions: '6" x 4"',
  colors: 1,
  finish: 'gloss',
  vectorStatus: 'ready',
  deadline: 'standard',
  clientName: '',
  clientEmail: '',
  clientContact: '',
  projectNotes: '',
};

export default function InkLabBuilder({
  initialMedium,
  initialSpec,
}: {
  initialMedium?: string;
  initialSpec?: VaultItem | null;
}) {
  const [form, setForm] = useState<InkLabState>(defaultState);
  const [ticketId, setTicketId] = useState<string>('JFX-9142');
  const [copied, setCopied] = useState<boolean>(false);
  const [draftSaved, setDraftSaved] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Load from local storage or initial values
  useEffect(() => {
    try {
      const saved = localStorage.getItem('jfox_ink_lab_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm(parsed);
        setDraftSaved(true);
      } else {
        // Generate pseudo random ticket
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        setTicketId(`JFX-${randomNum}`);
      }
    } catch {
      // LocalStorage not available or parse error
    }
  }, []);

  // Update medium if passed from parent
  useEffect(() => {
    if (initialMedium && ['vinyl', 'apparel', '3d-print', 'vector'].includes(initialMedium)) {
      setForm((prev) => ({
        ...prev,
        medium: initialMedium as InkLabState['medium'],
      }));
    }
  }, [initialMedium]);

  // Update spec if seeded from Vault inspection
  useEffect(() => {
    if (initialSpec) {
      setForm((prev) => ({
        ...prev,
        medium: (['vinyl', 'apparel', '3d-print', 'vector'].includes(initialSpec.mediumKey)
          ? initialSpec.mediumKey
          : 'vinyl') as InkLabState['medium'],
        projectNotes: `Inspired by Vault Spec: "${initialSpec.title}". Preferred tooling: ${initialSpec.specs.tooling}.`,
      }));
    }
  }, [initialSpec]);

  // Auto-save draft to local storage on change
  const updateField = <K extends keyof InkLabState>(key: K, value: InkLabState[K]) => {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem('jfox_ink_lab_draft', JSON.stringify(updated));
        setDraftSaved(true);
      } catch {
        // Safe fail
      }
      return updated;
    });
  };

  const handleResetDraft = () => {
    try {
      localStorage.removeItem('jfox_ink_lab_draft');
    } catch {}
    setForm(defaultState);
    setDraftSaved(false);
  };

  // Pricing & Timeline Calculations
  const calculateEstimate = () => {
    let base = 35;
    let unitRate = 2.5;
    let turnaroundText = '3–5 Business Days';

    switch (form.medium) {
      case 'vinyl':
        unitRate = form.dimensions.includes('24') || form.dimensions.includes('36') ? 18 : 2.8;
        if (form.finish === 'holographic' || form.finish === 'reflective') unitRate *= 1.4;
        if (form.colors > 1) unitRate *= 1 + (form.colors - 1) * 0.35;
        base = 25;
        break;
      case 'apparel':
        unitRate = form.finish === 'heavyweight-hoodie' ? 36 : 18;
        base = 40 + form.colors * 15; // Screen setup
        break;
      case '3d-print':
        base = 40;
        unitRate = form.finish === 'tough-resin' ? 32 : 22;
        break;
      case 'vector':
        base = form.vectorStatus === 'needs-trace' ? 140 : 85;
        unitRate = 0;
        break;
    }

    // Volume multiplier
    let qty = form.quantity;
    let volumeDiscount = 1;
    if (qty >= 100) volumeDiscount = 0.65;
    else if (qty >= 50) volumeDiscount = 0.75;
    else if (qty >= 25) volumeDiscount = 0.85;

    const calculatedSubtotal = Math.round(base + qty * unitRate * volumeDiscount);
    const low = Math.round(calculatedSubtotal * 0.9);
    const high = Math.round(calculatedSubtotal * 1.15);

    if (form.deadline === 'rush') {
      turnaroundText = '24–48 Hours (Rush Queue)';
    } else if (form.deadline === 'flexible') {
      turnaroundText = '7–10 Business Days (Economy)';
    }

    return {
      priceRange: `$${low} – $${high}`,
      turnaround: turnaroundText,
      unitPriceAvg: `$${(calculatedSubtotal / Math.max(qty, 1)).toFixed(2)}`,
    };
  };

  const estimate = calculateEstimate();

  // Generate plain-text ticket summary
  const generateTicketText = () => {
    return `==========================================
J FOX INK // CUSTOM FABRICATION TICKET
TICKET ID: ${ticketId}
TIMESTAMP: ${new Date().toISOString()}
==========================================
MEDIUM: ${form.medium.toUpperCase()}
ITEM SPEC: ${form.itemType}
QUANTITY: ${form.quantity} units
DIMENSIONS: ${form.dimensions}
FINISH/SUBSTRATE: ${form.finish}
COLOR PASSES: ${form.colors}
VECTOR ASSET STATUS: ${form.vectorStatus}
TARGET DEADLINE: ${form.deadline.toUpperCase()} (${estimate.turnaround})

ESTIMATED BUDGET BRACKET: ${estimate.priceRange} (Avg ${estimate.unitPriceAvg}/unit)

CLIENT DETAILS:
Name: ${form.clientName || 'Not Provided'}
Email: ${form.clientEmail || 'Not Provided'}
Contact/Handle: ${form.clientContact || 'Not Provided'}

PROJECT NOTES / ARTWORK SPECS:
${form.projectNotes || 'No additional notes entered.'}
==========================================
Dispatching to: orders@jfox.ink
Online Spec Portal: https://jfox.ink`;
  };

  const handleCopyTicket = () => {
    const text = generateTicketText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMailto = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.clientEmail && !form.clientName) {
      setValidationError('Please input at least your name and email so Josh can reply with the proof.');
      return;
    }
    setValidationError(null);

    const subject = encodeURIComponent(
      `[Custom Spec Ticket ${ticketId}] ${form.medium.toUpperCase()} - ${form.clientName || 'Inquiry'}`
    );
    const body = encodeURIComponent(generateTicketText());
    window.location.href = `mailto:orders@jfox.ink?subject=${subject}&body=${body}`;
  };

  return (
    <section id="ink-lab" className="py-20 bg-[#0B0F17] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 mb-2">
            Interactive Commission Lab
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            The Ink Lab // Custom Quote & Spec Builder
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Configure your exact dimensions, substrates, and quantities. We calculate real-time production brackets and generate an instant shop cut ticket ready for dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Builder Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-[#101726] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-8">
            {/* Step 1: Medium Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Step 01 // Select Production Medium
                </span>
                {draftSaved && (
                  <button
                    type="button"
                    onClick={handleResetDraft}
                    className="text-[11px] font-mono text-slate-400 hover:text-rose-400 inline-flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset Draft
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    id: 'vinyl',
                    label: 'Vinyl & Decals',
                    icon: <Scissors className="w-4 h-4" />,
                  },
                  {
                    id: 'apparel',
                    label: 'Apparel Merch',
                    icon: <Shirt className="w-4 h-4" />,
                  },
                  {
                    id: '3d-print',
                    label: '3D Fabrication',
                    icon: <Box className="w-4 h-4" />,
                  },
                  {
                    id: 'vector',
                    label: 'Vector Brand Art',
                    icon: <PenTool className="w-4 h-4" />,
                  },
                ].map((item) => {
                  const isSelected = form.medium === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => updateField('medium', item.id as InkLabState['medium'])}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                          : 'bg-black/30 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div className={isSelected ? 'text-cyan-400' : 'text-slate-400'}>
                        {item.icon}
                      </div>
                      <span className="text-xs font-semibold mt-3 whitespace-nowrap">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Dimensions, Quantities, & Finishes */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-fuchsia-400 uppercase tracking-wider block">
                Step 02 // Quantities, Finishes & Color Count
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Quantity */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Quantity Required
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={5000}
                      value={form.quantity}
                      onChange={(e) => updateField('quantity', Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                    <span className="text-xs font-mono text-slate-400 whitespace-nowrap">units</span>
                  </div>
                </div>

                {/* Dimensions */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Target Dimensions
                  </label>
                  <select
                    value={form.dimensions}
                    onChange={(e) => updateField('dimensions', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value='4" x 4" (Standard Sticker)'>4" x 4" (Standard Decal)</option>
                    <option value='6" x 4" (Mid-Size Emblem)'>6" x 4" (Mid-Size Emblem)</option>
                    <option value='12" x 8" (Window / Panel)'>12" x 8" (Window / Panel)</option>
                    <option value='24" x 18" (Vehicle Door / Sign)'>24" x 18" (Vehicle Door)</option>
                    <option value='36" x 24" (Large Commercial Livery)'>36" x 24" (Large Commercial)</option>
                    <option value='Custom Architectural Dimensions'>Custom Architectural Dimensions</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Finish / Substrate */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Substrate & Finish
                  </label>
                  <select
                    value={form.finish}
                    onChange={(e) => updateField('finish', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                  >
                    {form.medium === 'vinyl' && (
                      <>
                        <option value="gloss">High-Gloss UV Cast (3M 1080)</option>
                        <option value="matte-black">Satin Matte Charcoal / Black</option>
                        <option value="holographic">Oil-Slick Holographic Iridescent</option>
                        <option value="reflective">Commercial DOT Reflective Safety</option>
                        <option value="chrome">Mirror Polished Metallic Chrome</option>
                      </>
                    )}
                    {form.medium === 'apparel' && (
                      <>
                        <option value="heavyweight-hoodie">450 GSM Heavyweight Streetwear Hoodie</option>
                        <option value="vintage-tee">280 GSM Vintage Wash Box-Fit Tee</option>
                        <option value="crewneck">400 GSM Combed French Terry Crewneck</option>
                        <option value="snapback">Structured Embroidered Snapback Cap</option>
                      </>
                    )}
                    {form.medium === '3d-print' && (
                      <>
                        <option value="tough-resin">50µm Ultra-High Res SLA Tough Resin</option>
                        <option value="carbon-petg">Carbon Fiber Reinforced PETG (Functional)</option>
                        <option value="translucent">Optically Clear / Tinted UV Polymer</option>
                      </>
                    )}
                    {form.medium === 'vector' && (
                      <>
                        <option value="clean-vector-svg">Screen & Plotter Cut-Ready SVG/AI</option>
                        <option value="brand-identity-kit">Complete Brand Mark & Emblem Kit</option>
                        <option value="pantone-seps">Pantone Spot Color Separation Sheets</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Color Count */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Color Count / Spot Layers
                  </label>
                  <select
                    value={form.colors}
                    onChange={(e) => updateField('colors', parseInt(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value={1}>1 Color / Single Cut Layer</option>
                    <option value={2}>2 Colors / Dual-Layer Assembly</option>
                    <option value={3}>3 Colors / Multi-Pass</option>
                    <option value={4}>4+ Spot Colors / Full Trapped Separation</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Vector Status, Deadline & Contact */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-lime-400 uppercase tracking-wider block">
                Step 03 // Vector Art Readiness & Contact
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Vector Artwork Status */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Vector File Status
                  </label>
                  <select
                    value={form.vectorStatus}
                    onChange={(e) =>
                      updateField('vectorStatus', e.target.value as InkLabState['vectorStatus'])
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value="ready">Ready Vector (.AI, .SVG, .EPS, .DXF)</option>
                    <option value="sketch">Rough Hand Sketch / Mockup (Need Vectorizing)</option>
                    <option value="needs-trace">Low-Res PNG/JPG (Needs High-Fidelity Redraw)</option>
                  </select>
                </div>

                {/* Target Deadline */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Target Turnaround Time
                  </label>
                  <select
                    value={form.deadline}
                    onChange={(e) =>
                      updateField('deadline', e.target.value as InkLabState['deadline'])
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value="standard">Standard Atelier (3–5 Business Days)</option>
                    <option value="rush">Rush Express (24–48 Hours)</option>
                    <option value="flexible">Flexible Timeline (7–10 Days)</option>
                  </select>
                </div>
              </div>

              {/* Client Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Josh or Studio Name"
                    value={form.clientName}
                    onChange={(e) => updateField('clientName', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="you@domain.com"
                    value={form.clientEmail}
                    onChange={(e) => updateField('clientEmail', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone / Instagram
                  </label>
                  <input
                    type="text"
                    placeholder="@handle or phone"
                    value={form.clientContact}
                    onChange={(e) => updateField('clientContact', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Project Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Project Brief & Specific Artwork Instructions
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify Pantone codes, vehicle make/model for vinyl, link to Dropbox/Drive vector assets, or specific placement instructions..."
                  value={form.projectNotes}
                  onChange={(e) => updateField('projectNotes', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono leading-relaxed"
                />
              </div>

              {validationError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Ticket & Live Readout (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Pricing Estimator Card */}
            <div className="bg-gradient-to-br from-[#101726] to-[#0B0F17] rounded-2xl border border-cyan-500/30 p-6 relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-3">
                <span className="uppercase tracking-wider">Dynamic Production Estimator</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  LIVE CALC
                </span>
              </div>

              <div className="space-y-1 mb-4">
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight tabular-nums">
                  {estimate.priceRange}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Estimated Bracket (Includes setup & tooling · ~{estimate.unitPriceAvg}/unit)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block mb-0.5">Est. Turnaround</span>
                  <span className="text-lime-400 font-semibold">{estimate.turnaround}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Substrate Verification</span>
                  <span className="text-slate-200">100% Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Shop Cut Ticket (Rendered like an industrial workshop work order) */}
            <div className="bg-black/70 rounded-2xl border border-white/15 p-6 relative overflow-hidden font-mono text-xs text-slate-300 space-y-4 shadow-2xl">
              {/* Ticket Header */}
              <div className="flex items-center justify-between border-b border-dashed border-white/20 pb-3">
                <div>
                  <div className="text-white font-bold text-sm tracking-wide">
                    J FOX INK // WORKSHOP ORDER
                  </div>
                  <div className="text-[10px] text-cyan-400">PRECISION FABRICATION ATELIER</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-xs">{ticketId}</div>
                  <div className="text-[10px] text-slate-500">AUTO-GEN TICKET</div>
                </div>
              </div>

              {/* Ticket Specs Table */}
              <div className="space-y-2 text-[11px] leading-relaxed">
                <div className="flex justify-between">
                  <span className="text-slate-500">Medium:</span>
                  <span className="text-white uppercase font-bold">{form.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Quantity / Dims:</span>
                  <span className="text-white">{form.quantity} units · {form.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Substrate / Finish:</span>
                  <span className="text-white truncate max-w-[200px]">{form.finish}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Passes / Colors:</span>
                  <span className="text-white">{form.colors} Spot Layer(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Vector Asset:</span>
                  <span className="text-cyan-400">{form.vectorStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Client Contact:</span>
                  <span className="text-slate-200 truncate max-w-[200px]">
                    {form.clientEmail || 'Pending Email'}
                  </span>
                </div>
              </div>

              {/* Ticket Footer Action Buttons */}
              <div className="pt-3 border-t border-dashed border-white/20 space-y-2.5">
                <button
                  type="button"
                  onClick={handleSendMailto}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Spec to orders@jfox.ink</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyTicket}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-lime-400" />
                      <span className="text-lime-400 font-semibold">Spec Ticket Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Formatted Ticket to Clipboard</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[10px] text-slate-500 text-center pt-1">
                Zero third-party trackers · Direct client-to-workshop communication
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

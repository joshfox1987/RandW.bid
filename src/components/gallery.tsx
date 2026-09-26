'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, MapPin, Sliders } from 'lucide-react';
import { cn } from '@/lib/utils';

const transformationProjects = [
  {
    id: 'trans-1',
    category: 'flooring',
    title: 'Custom 49ers Game Room',
    location: 'Las Vegas, NV',
    scopeTag: 'Custom Game Room Installation – Las Vegas, NV',
    description: "Not just carpet—this is a bespoke, handcrafted work of art. R&W's master floor installation artists, with over 35 years of custom experience, hand-cut and meticulously assembled this one-of-a-kind field-themed turf. More than an installation, it's a dream come true for a die-hard 49ers fan. Experience the skill and precision of a true custom fit.",
    beforeImage: '/49ers-before.jpg',
    afterImage: '/49ers-after.jpg',
    beforeLabel: 'Before: Plain Carpet',
    afterLabel: 'After: Custom 49ers Field Turf',
    footerText: "A 49ers Fan's Dream, Brought to Life.",
  },
  {
    id: 'trans-2',
    category: 'outdoor',
    title: 'Custom Cedar Deck & Outdoor Living Build',
    location: 'Twin Falls, ID',
    scopeTag: 'Custom Deck Build – Twin Falls, ID',
    description: 'Demoed an unstable weathered porch and constructed an expansive multi-tier cedar deck with built-in railing and weather-sealed finish.',
    beforeImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f',
    afterImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f1f1d',
    beforeLabel: 'Before: Weathered Structure',
    afterLabel: 'After: New Cedar Deck',
    footerText: 'Completed to Professional Building Code & Standards.',
  },
  {
    id: 'trans-3',
    category: 'remodeling',
    title: 'Full Kitchen & Drywall Reconstruction',
    location: 'Rupert, ID',
    scopeTag: 'Interior Remodeling – Rupert, ID',
    description: 'Complete interior overhaul following water damage repair: new drywall, texture, custom cabinetry, trim, and professional paint.',
    beforeImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
    afterImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f',
    beforeLabel: 'Before: Studs & Damage',
    afterLabel: 'After: Remodeled Interior',
    footerText: 'Completed to Professional Building Code & Standards.',
  },
  {
    id: 'trans-4',
    category: 'restoration',
    title: 'Emergency Storm Damage & Debris Cleanout',
    location: 'Jerome, ID',
    scopeTag: 'Property Restoration – Jerome, ID',
    description: 'Rapid response storm stabilization, fallen tree removal from roofline, structural stabilization, and exterior siding replacement.',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
    afterImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    beforeLabel: 'Before: Storm Impact',
    afterLabel: 'After: Restored & Weatherproofed',
    footerText: 'Completed to Professional Building Code & Standards.',
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sliderPositions, setSliderPositions] = useState<{ [key: string]: number }>({
    'trans-1': 50,
    'trans-2': 50,
    'trans-3': 50,
    'trans-4': 50,
  });

  const handleSliderMove = (id: string, e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPositions(prev => ({ ...prev, [id]: percentage }));
  };

  const filteredProjects = activeCategory === 'all' 
    ? transformationProjects 
    : transformationProjects.filter(p => p.category === activeCategory);

  return (
    <section id="gallery" className="w-full bg-background py-16 md:py-24 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-widest border border-amber-500/20">
            <Sparkles className="w-4 h-4" /> Proven Transformations
          </div>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Before &amp; After Project Showcase
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
            Drag the comparison slider on each project to see the dramatic difference R&amp;W Property Solutions delivers.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Transformations' },
              { id: 'flooring', label: 'Flooring' },
              { id: 'outdoor', label: 'Decks & Outdoor' },
              { id: 'remodeling', label: 'Remodeling' },
              { id: 'restoration', label: 'Restoration' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all",
                  activeCategory === cat.id
                    ? "bg-amber-600 text-white shadow-md scale-105"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transformation Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project) => {
            const splitPos = sliderPositions[project.id] ?? 50;
            return (
              <div 
                key={project.id}
                className="bg-card rounded-2xl border shadow-lg overflow-hidden flex flex-col group transition-all hover:border-amber-500/50"
              >
                {/* Before / After Interactive Comparison Container */}
                <div 
                  className="relative w-full aspect-[16/10] select-none cursor-ew-resize overflow-hidden bg-slate-950"
                  onMouseMove={(e) => handleSliderMove(project.id, e)}
                  onTouchMove={(e) => handleSliderMove(project.id, e)}
                  onTouchStart={(e) => handleSliderMove(project.id, e)}
                >
                  {/* After Image (Full background) */}
                  <div className="absolute inset-0">
                    <Image
                      src={project.afterImage}
                      alt={project.afterLabel}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute top-4 right-4 z-10 bg-emerald-600/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {project.afterLabel}
                    </div>
                  </div>

                  {/* Before Image (Clipped by slider position) */}
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${splitPos}%` }}
                  >
                    <div className="absolute inset-0 w-[200%] sm:w-[1200px] h-full" style={{ width: '100vw', maxWidth: '600px' }}>
                      <Image
                        src={project.beforeImage}
                        alt={project.beforeLabel}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="absolute top-4 left-4 z-10 bg-amber-600/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {project.beforeLabel}
                    </div>
                  </div>

                  {/* Divider Handle Bar */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.8)] z-20 pointer-events-none"
                    style={{ left: `${splitPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                      <Sliders className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Project Details & Scope Tag */}
                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-500/20">
                        {project.scopeTag}
                      </Badge>
                      <span className="flex items-center text-xs font-semibold text-muted-foreground gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" /> {project.location}
                      </span>
                    </div>
                    <h3 className="font-headline text-xl font-bold text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t flex items-center justify-between text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1.5 text-amber-600 font-semibold">
                      {project.footerText}
                    </span>
                    <a href="#contact" className="text-amber-600 dark:text-amber-400 font-bold hover:underline flex items-center gap-1">
                      Request Similar Bid <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

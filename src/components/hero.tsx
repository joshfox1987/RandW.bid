'use client';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { HeroImage } from '@/lib/placeholder-images';

interface HeroProps {
  onOpenQuote: () => void;
}

export default function Hero({ onOpenQuote }: HeroProps) {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center text-center text-white overflow-hidden py-16 md:py-24">
      {/* High-res project background photo with 70-75% dark gradient overlay */}
      <Image
        src={HeroImage.imageUrl}
        alt={HeroImage.description}
        fill
        className="object-cover -z-20 scale-105 transition-transform duration-1000"
        style={{ filter: 'contrast(1.1) saturate(1.1) brightness(0.65)' }}
        data-ai-hint={HeroImage.imageHint}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/80 to-slate-950/70 -z-10" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
          
          {/* Trust badges */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm font-bold tracking-wider uppercase text-amber-300">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-amber-400" /> Fully Insured</span>
            <span className="opacity-60">•</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-amber-400" /> Free On-Site Audits</span>
            <span className="opacity-60">•</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-400" /> Custom Flooring Specialists</span>
          </div>

          <div className="space-y-4">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Quality Contracting &amp; Specialty Property Solutions You Can Trust.
            </h1>
          </div>

          {/* Clean, centered inline video player for 49ers-video.mp4 */}
          <div className="w-full max-w-3xl mx-auto my-4 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900">
            <video 
              controls 
              playsInline 
              muted 
              preload="metadata" 
              className="w-full max-w-4xl mx-auto rounded-xl shadow-2xl border border-slate-700 aspect-video object-cover"
            >
              <source src="/49ers-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="space-y-3">
            <p className="mx-auto max-w-[760px] text-slate-200 text-base sm:text-lg md:text-xl font-normal leading-relaxed">
              Residential and commercial transformation, custom hardwood &amp; LVP flooring, expert restoration, remodeling, and heavy property cleanup across Idaho.
            </p>
          </div>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full justify-center">
            <Button 
              size="lg" 
              onClick={onOpenQuote}
              className="w-full sm:w-auto h-14 text-base md:text-lg px-10 bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-xl transition-all hover:scale-105"
            >
              Get a Free Estimate
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto h-14 text-base md:text-lg px-8 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md"
            >
              <a href="#services" className="flex items-center justify-center gap-2">
                <span>View Our Specialties</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300 font-medium">
            <a href="tel:208-831-6824" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Direct Line: (208) 831-6824</span>
            </a>
            <span className="hidden sm:inline opacity-50">|</span>
            <span>Operated by Licensed General Contractor Rob</span>
          </div>

        </div>
      </div>
    </section>
  );
}

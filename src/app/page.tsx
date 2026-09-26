'use client';
import { useState } from 'react';
import Chatbot from '@/components/chatbot';
import Contact from '@/components/contact';
import Gallery from '@/components/gallery';
import Hero from '@/components/hero';
import Services from '@/components/services';
import Testimonials from '@/components/testimonials';
import Header from '@/components/layout/header';
import StickyBar from '@/components/sticky-bar';
import QuoteModal from '@/components/quote-modal';
import { Award, Star, ShieldCheck } from 'lucide-react';

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background pb-20 md:pb-0">
      <Header />
      <main className="flex-1">
        <Hero onOpenQuote={() => setQuoteModalOpen(true)} />
        
        {/* Trust Stats Bar */}
        <section className="bg-slate-950 border-y border-amber-500/20 py-8 px-4 text-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-center text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
              
              <div className="flex flex-col items-center justify-center space-y-2 p-4">
                <div className="p-3 rounded-full bg-amber-500/10 text-amber-500 mb-1">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="font-headline text-2xl font-extrabold text-white">35+ Years</h3>
                <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider">of Custom Expertise</p>
              </div>

              <div className="flex flex-col items-center justify-center space-y-2 p-4 pt-6 md:pt-4">
                <div className="p-3 rounded-full bg-amber-500/10 text-amber-500 mb-1 flex items-center justify-center gap-1">
                  <Star className="w-7 h-7 fill-amber-400 text-amber-400" />
                </div>
                <h3 className="font-headline text-2xl font-extrabold text-white">5-Star Rated</h3>
                <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Local Client Satisfaction</p>
              </div>

              <div className="flex flex-col items-center justify-center space-y-2 p-4 pt-6 md:pt-4">
                <div className="p-3 rounded-full bg-amber-500/10 text-amber-500 mb-1">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="font-headline text-2xl font-extrabold text-white">100% Licensed</h3>
                <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider">&amp; Fully Insured</p>
              </div>

            </div>
          </div>
        </section>

        <Services />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Chatbot />
      <StickyBar onOpenQuote={() => setQuoteModalOpen(true)} />
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}

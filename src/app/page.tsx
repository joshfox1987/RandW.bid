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

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background pb-20 md:pb-0">
      <Header />
      <main className="flex-1">
        <Hero onOpenQuote={() => setQuoteModalOpen(true)} />
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

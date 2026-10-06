'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/Hero';
import CapabilitiesMatrix from '@/components/CapabilitiesMatrix';
import VaultShowcase, { VaultItem } from '@/components/VaultShowcase';
import InkLabBuilder from '@/components/InkLabBuilder';
import CommissionStatus from '@/components/CommissionStatus';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const [selectedMedium, setSelectedMedium] = useState<string>('vinyl');
  const [selectedVaultSpec, setSelectedVaultSpec] = useState<VaultItem | null>(null);

  const handleSelectMedium = (medium: string) => {
    setSelectedMedium(medium);
  };

  const handleSelectVaultSpec = (item: VaultItem) => {
    setSelectedVaultSpec(item);
    setSelectedMedium(item.mediumKey);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070A0F] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Bar Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Interactive Hero Canvas */}
        <Hero />

        {/* Capabilities Matrix */}
        <CapabilitiesMatrix onSelectMedium={handleSelectMedium} />

        {/* The Vault Portfolio Showcase */}
        <VaultShowcase onSelectSpec={handleSelectVaultSpec} />

        {/* Custom Quote & Spec Builder ("The Ink Lab") */}
        <InkLabBuilder
          initialMedium={selectedMedium}
          initialSpec={selectedVaultSpec}
        />

        {/* Turnaround Expectations & Direct Contact */}
        <CommissionStatus />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

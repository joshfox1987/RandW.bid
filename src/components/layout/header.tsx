'use client';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Phone, Menu, X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 shadow-sm">
      <div className="container mx-auto px-4 flex h-auto min-h-[5.5rem] items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="h-12 w-12 shrink-0 transition-transform group-hover:scale-105" />
            <div className="flex flex-col leading-tight">
              <span className="font-headline text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground">
                R &amp; W Property Solutions
              </span>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400">
                  Licensed General Contractor
                </span>
                <span className="text-muted-foreground text-[10px] hidden sm:inline">•</span>
                <span className="text-[10px] font-semibold text-muted-foreground hidden sm:inline flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Idaho License # RCE-XXXXX
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          <a
            href="#services"
            className="font-medium text-sm text-foreground/80 transition-colors hover:text-primary"
          >
            Services
          </a>
          <a
            href="#gallery"
            className="font-medium text-sm text-foreground/80 transition-colors hover:text-primary"
          >
            Gallery
          </a>
          <a
            href="#reviews"
            className="font-medium text-sm text-foreground/80 transition-colors hover:text-primary"
          >
            Reviews
          </a>
          <a
            href="#contact"
            className="font-medium text-sm text-foreground/80 transition-colors hover:text-primary"
          >
            Contact
          </a>
          <Button asChild variant="outline" className="border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 font-semibold">
             <a href="tel:208-831-6824" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                (208) 831-6824
            </a>
          </Button>
          <a
            href="https://www.facebook.com/RandWps"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Page"
            className="p-2 rounded-full hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-bold text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#1877F2"
              className="h-5 w-5"
            >
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.142v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
            <span className="hidden xl:inline">Facebook</span>
          </a>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="sm" variant="default" className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs h-9 px-3">
            <a href="tel:208-831-6824" className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              <span>Call</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="h-10 w-10"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background px-6 py-6 space-y-4 shadow-xl">
          <div className="px-3 py-2 rounded-lg bg-muted text-xs font-medium text-foreground flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Idaho License # RCE-XXXXX | Licensed &amp; Insured</span>
          </div>
          <nav className="flex flex-col space-y-3">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 px-3 rounded-lg hover:bg-muted transition-colors"
            >
              Services &amp; Specialties
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 px-3 rounded-lg hover:bg-muted transition-colors"
            >
              Project Gallery
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 px-3 rounded-lg hover:bg-muted transition-colors"
            >
              Customer Reviews
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 px-3 rounded-lg hover:bg-muted transition-colors"
            >
              Contact &amp; Estimates
            </a>
            <a
              href="https://www.facebook.com/RandWps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold py-2 px-3 rounded-lg hover:bg-muted transition-colors flex items-center gap-2 text-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2" className="h-5 w-5">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.142v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
              <span>Visit Facebook Page</span>
            </a>
          </nav>
          <div className="pt-2 border-t flex flex-col gap-3">
            <Button asChild className="w-full justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold h-12">
              <a href="tel:208-831-6824">
                <Phone className="h-5 w-5" />
                Call (208) 831-6824
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

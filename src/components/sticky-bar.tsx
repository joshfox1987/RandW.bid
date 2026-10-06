'use client';
import { Phone, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StickyBar({ onOpenQuote }: { onOpenQuote?: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 py-3 px-4 shadow-2xl md:hidden">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <Button asChild className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 text-sm shadow-md">
          <a href="tel:208-831-6824" className="flex items-center justify-center gap-2">
            <Phone className="h-4 w-4" />
            <span>Call (208) 831-6824</span>
          </a>
        </Button>
        <Button 
          onClick={onOpenQuote}
          variant="outline" 
          className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold h-12 text-sm"
        >
          <FileText className="h-4 w-4 mr-1.5 text-amber-400" />
          <span>Get Free Bid</span>
        </Button>
      </div>
    </div>
  );
}

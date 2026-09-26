'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Calculator, CheckCircle2, Phone, Mail, DollarSign } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceOptions = [
  { id: 'flooring', label: 'Custom Flooring (Hardwood, LVP, Tile, Turf)', baseCost: 1500 },
  { id: 'remodel', label: 'Interior Remodeling / Kitchen / Bath', baseCost: 3500 },
  { id: 'deck', label: 'Deck Build or Outdoor Repair', baseCost: 2000 },
  { id: 'restoration', label: 'Water / Fire Restoration & Repairs', baseCost: 4000 },
  { id: 'cleanout', label: 'Debris Removal, Demolition & Cleanout', baseCost: 800 },
  { id: 'other', label: 'General Contractor Repairs / Other', baseCost: 1000 },
];

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Calculate estimated price range
  const estimatedMin = selectedServices.reduce((acc, id) => {
    const found = serviceOptions.find(s => s.id === id);
    return acc + (found ? found.baseCost : 0);
  }, 500);

  const estimatedMax = estimatedMin * 1.8;

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast({
        variant: 'destructive',
        title: 'Missing Required Fields',
        description: 'Please enter at least your name and phone number.',
      });
      return;
    }

    const quoteRecord = {
      id: `quote-${Date.now()}`,
      date: new Date().toISOString(),
      services: selectedServices,
      estimatedRange: `$${estimatedMin.toLocaleString()} - $${estimatedMax.toLocaleString()}`,
      ...formData,
    };

    // Save to localStorage as backup
    try {
      const existing = JSON.parse(localStorage.getItem('rnw_quotes') || '[]');
      localStorage.setItem('rnw_quotes', JSON.stringify([quoteRecord, ...existing]));
    } catch (err) {
      console.error('Error saving quote to localStorage:', err);
    }

    setSubmitted(true);
    toast({
      title: 'Estimate Request Submitted!',
      description: 'Rob or the R&W team will review your project details and call you shortly.',
    });

    // Also trigger mailto fallback
    const subject = encodeURIComponent(`New Estimate Request from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAddress: ${formData.address}\nServices: ${selectedServices.join(', ')}\nEstimated Range: $${estimatedMin.toLocaleString()} - $${estimatedMax.toLocaleString()}\nDetails: ${formData.notes}`
    );
    
    setTimeout(() => {
      window.location.href = `mailto:RnWpropertyrepair@gmail.com?subject=${subject}&body=${body}`;
    }, 1500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedServices([]);
    setFormData({ name: '', phone: '', email: '', address: '', notes: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl font-bold flex items-center gap-2">
            <Calculator className="w-6 h-6 text-amber-500" />
            Get a Free Estimate &amp; Project Bid
          </DialogTitle>
          <DialogDescription>
            Select your project categories below to get an instant preliminary estimate range, and submit your details for an on-site audit.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-headline">Estimate Request Received!</h3>
            <p className="text-muted-foreground max-w-md">
              Thank you, {formData.name}. We have logged your request and opened your email client. You can also call Rob directly at <a href="tel:208-831-6824" className="font-bold text-amber-600 underline">(208) 831-6824</a>.
            </p>
            <Button onClick={handleReset} className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-bold">
              Done / Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            <div className="space-y-3">
              <Label className="text-base font-bold">1. Select Project Services Needed:</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {serviceOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => toggleService(opt.id)}
                    className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedServices.includes(opt.id)
                        ? 'border-amber-500 bg-amber-500/10 text-foreground font-medium shadow-sm'
                        : 'border-border bg-card hover:bg-muted/50 text-muted-foreground'
                    }`}
                  >
                    <Checkbox
                      checked={selectedServices.includes(opt.id)}
                      onCheckedChange={() => toggleService(opt.id)}
                    />
                    <span className="text-xs sm:text-sm leading-tight text-foreground">{opt.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedServices.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Preliminary Estimate Range</p>
                    <p className="text-xl font-headline font-bold text-foreground">
                      ${estimatedMin.toLocaleString()} – ${estimatedMax.toLocaleString()}*
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-muted-foreground text-right hidden sm:block">
                  *Subject to on-site inspection
                </span>
              </div>
            )}

            <div className="space-y-4 pt-2">
              <Label className="text-base font-bold">2. Your Contact &amp; Property Details:</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(208) 000-0000"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address">Property Address / City</Label>
                  <Input
                    id="address"
                    placeholder="Boise, Idaho"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="notes">Project Scope &amp; Specifics</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  placeholder="Describe your damage, flooring dimensions, timeline, or repair needs..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 text-base">
                Submit Bid Request &amp; Email Rob
              </Button>
              <Button asChild variant="outline" className="h-12 font-bold">
                <a href="tel:208-831-6824" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Call (208) 831-6824
                </a>
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

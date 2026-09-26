'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2, Upload, Loader2, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    category: 'Flooring',
    description: '',
    photoName: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photoName: file.name }));
      toast({ title: 'Photo Attached', description: `${file.name} ready for submission.` });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast({
        variant: 'destructive',
        title: 'Missing Required Fields',
        description: 'Please provide your name and phone number.',
      });
      return;
    }

    setIsSubmitting(true);

    const record = {
      id: `lead-${Date.now()}`,
      date: new Date().toISOString(),
      ...formData,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('rnw_leads') || '[]');
      localStorage.setItem('rnw_leads', JSON.stringify([record, ...existing]));
    } catch (err) {
      console.error('Error saving lead:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: 'Quick Bid Request Submitted!',
        description: 'Rob or the R&W team will review your project details and call you shortly.',
      });

      // Trigger mailto fallback
      const subject = encodeURIComponent(`Quick Bid Request: ${formData.category} from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nPhone: ${formData.phone}\nAddress / City: ${formData.address}\nService Category: ${formData.category}\nProject Description: ${formData.description}\nAttached Photo: ${formData.photoName || 'None'}`
      );
      window.location.href = `mailto:RnWpropertyrepair@gmail.com?subject=${subject}&body=${body}`;
    }, 800);
  };

  return (
    <section id="contact" className="w-full py-16 md:py-24 bg-background border-t">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-widest border border-amber-500/20">
              <MapPin className="w-4 h-4" /> Magic Valley Service Area
            </div>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter">Request a Quick Bid</h2>
            <p className="text-muted-foreground text-base md:text-xl">
              Proudly serving Rupert, Burley, Heyburn, Paul, and surrounding Magic Valley communities.
            </p>
        </div>

        {/* Direct Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <a href="tel:208-831-6824" className="group">
                <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1 bg-card">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="bg-amber-500/10 p-3 rounded-full text-amber-600">
                            <Phone className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg">Phone</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">Call Rob directly for estimates.</p>
                        <p className="mt-2 text-base font-bold text-amber-600">(208) 831-6824</p>
                    </CardContent>
                </Card>
            </a>

            <a href="mailto:RnWpropertyrepair@gmail.com" className="group">
                <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1 bg-card">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                         <div className="bg-amber-500/10 p-3 rounded-full text-amber-600">
                            <Mail className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg">Email</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">Send project details &amp; specs.</p>
                        <p className="mt-2 text-sm font-semibold truncate">RnWpropertyrepair@gmail.com</p>
                    </CardContent>
                </Card>
            </a>

            <a href="https://www.facebook.com/RandWps" target="_blank" rel="noopener noreferrer" className="group">
                <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1 bg-card">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                         <div className="bg-blue-500/10 p-3 rounded-full text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.142v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                            </svg>
                        </div>
                        <CardTitle className="text-lg">Facebook</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">Official Facebook Page.</p>
                        <p className="mt-2 text-sm font-bold text-blue-600">facebook.com/RandWps</p>
                    </CardContent>
                </Card>
            </a>
        </div>

        {/* Structured 4-Field Quick Bid Intake Form */}
        <div className="bg-card rounded-2xl border shadow-xl p-6 sm:p-10 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline text-2xl font-bold">Quick Bid Estimate Form</h3>
              <p className="text-muted-foreground text-sm">Fill out the details below and we will contact you with a transparent bid.</p>
            </div>
          </div>

          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold font-headline">Bid Request Received!</h4>
              <p className="text-muted-foreground max-w-md">
                Thank you, {formData.name}. Rob will review your project specs for {formData.address || 'your property'} and call you at {formData.phone}.
              </p>
              <Button onClick={() => setSubmitted(false)} className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-bold">
                Submit Another Request
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Field 1: Full Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-bold">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-bold">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(208) 000-0000"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-11"
                  />
                </div>
              </div>

              {/* Field 2: Project Address / City */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-bold">Project Address / City *</Label>
                <Input
                  id="address"
                  placeholder="Rupert, ID or Burley, ID"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="h-11"
                />
              </div>

              {/* Field 3: Service Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-bold">Service Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Flooring">Flooring (Hardwood, LVP, Tile, Turf)</option>
                  <option value="Decks/Fencing">Decks &amp; Fencing (Builds &amp; Repairs)</option>
                  <option value="Remodel">Remodel (Kitchen, Bath, Drywall &amp; Paint)</option>
                  <option value="Cleanout/Debris">Cleanout &amp; Debris Removal / Demolition</option>
                  <option value="Restoration">Restoration &amp; Property Repairs</option>
                </select>
              </div>

              {/* Field 4: Brief Project Description / Photo Upload option */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-bold">Brief Project Description &amp; Photo Upload</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Tell us about the scope, dimensions, or specific materials needed..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                
                <div className="pt-2 flex items-center justify-between">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-muted/50 hover:bg-muted text-xs font-semibold text-foreground transition-all">
                    <Upload className="w-4 h-4 text-amber-600" />
                    <span>{formData.photoName ? `Attached: ${formData.photoName}` : 'Attach Project Photo / Damage Scan'}</span>
                    <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                  </label>
                  {formData.photoName && (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, photoName: '' }))}
                      className="text-xs text-destructive hover:underline"
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 text-base shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting Request...
                  </>
                ) : (
                  'Request Free Quick Bid'
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Footer info & License disclosures */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border/60 bg-muted/30 p-6 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" /> Idaho License # RCE-XXXXX | Fully Licensed &amp; Insured
            </div>
            <p className="text-base font-semibold text-foreground">
                Proudly serving Rupert, Burley, Heyburn, Paul, and surrounding Magic Valley communities.
            </p>
            <p className="text-xs text-muted-foreground">
                R&amp;W Property Solutions is operated by licensed contractor Rob.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold">
                <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                    Privacy Policy
                </Link>
                <Link href="/data-deletion" className="text-primary underline-offset-4 hover:underline">
                    Data Deletion
                </Link>
                <a href="https://www.facebook.com/RandWps" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline-offset-4 hover:underline flex items-center gap-1">
                    Official Facebook Page
                </a>
            </div>
        </div>
      </div>
    </section>
  );
}

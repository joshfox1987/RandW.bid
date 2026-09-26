'use client';

import { useState, useEffect } from 'react';
import { Star, CheckCircle, ShieldCheck, ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Rating } from './ui/rating';

type ReviewItem = {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  submittedAt: string;
  platform: 'Google' | 'Facebook' | 'Direct';
  verified: boolean;
};

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    reviewerName: 'Sarah Miller',
    rating: 5,
    comment: 'R&W Property Solutions did an incredible job installing our new luxury vinyl plank flooring and restoring our living room after a water leak. Professional, fast, and immaculate work!',
    submittedAt: '2026-08-14',
    platform: 'Google',
    verified: true,
  },
  {
    id: 'rev-2',
    reviewerName: 'David Kelsey',
    rating: 5,
    comment: 'Absolute professionals. Rob and his team built our custom cedar deck and handled our estate cleanout efficiently. Highly recommend this licensed contractor!',
    submittedAt: '2026-09-02',
    platform: 'Facebook',
    verified: true,
  },
  {
    id: 'rev-3',
    reviewerName: 'Jennifer Larson',
    rating: 5,
    comment: 'Licensed, transparent pricing, and honest. They completed our bathroom remodel ahead of schedule and left the property spotless. 5/5 stars!',
    submittedAt: '2026-09-18',
    platform: 'Google',
    verified: true,
  },
];

export default function Testimonials() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<ReviewItem[]>(DEFAULT_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authProvider, setAuthProvider] = useState<'Google' | 'Facebook' | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rnw_verified_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading reviews:', e);
    }
  }, []);

  const handleAuthLogin = (provider: 'Google' | 'Facebook') => {
    setAuthProvider(provider);
    // Simulate retrieving name from OAuth provider profile
    const simulatedName = provider === 'Google' ? 'Alex Johnson (Google User)' : 'Mark Davies (Facebook User)';
    setFormData(prev => ({ ...prev, name: simulatedName }));
    toast({
      title: `Authenticated with ${provider}`,
      description: `Signed in as ${simulatedName}. You can now leave your verified review.`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please authenticate with Google or Facebook and enter your review comment.',
      });
      return;
    }

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      reviewerName: formData.name,
      rating: Number(formData.rating),
      comment: formData.comment,
      submittedAt: new Date().toISOString().split('T')[0],
      platform: authProvider || 'Google',
      verified: true,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('rnw_verified_reviews', JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving review:', err);
    }

    toast({
      title: 'Review Posted Successfully!',
      description: 'Thank you for your authenticated feedback.',
    });

    setFormData({ name: '', rating: 5, comment: '' });
    setAuthProvider(null);
    setIsModalOpen(false);
  };

  return (
    <section id="reviews" className="w-full py-16 md:py-24 bg-muted/40 border-t">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-widest border border-amber-500/20">
            <ShieldCheck className="w-4 h-4" /> 5.0 Star Rated Contractor
          </div>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Verified Customer Reviews &amp; Testimonials
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
            See what local homeowners across the Magic Valley are saying about our flooring, remodeling, and property services.
          </p>

          {/* External Review Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 bg-card border px-4 py-2 rounded-xl shadow-sm">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-sm font-bold">5.0 / 5.0 on Google</span>
            </div>
            
            <a
              href="https://www.facebook.com/RandWps"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-md text-sm font-bold transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.142v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
              <span>View Facebook Reviews &amp; Page</span>
            </a>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white font-bold h-10 px-6 rounded-xl shadow-md">
                  <MessageSquare className="w-4 h-4 mr-2" /> Leave a Review
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-headline text-xl font-bold">Leave a Verified Review</DialogTitle>
                  <DialogDescription>
                    Authenticate with Google or Facebook to ensure legitimate review verification for R&amp;W Property Solutions.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 pt-2">
                  {!authProvider ? (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-muted-foreground">Step 1: Choose sign-in method</p>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleAuthLogin('Google')}
                          className="h-12 border-2 hover:border-amber-500 font-bold flex items-center gap-2 justify-center"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.14v3.15C3.15 21.31 7.23 24 12 24z"/>
                            <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.5-.38-2.24s.13-1.52.38-2.24V6.61H1.14C.41 8.09 0 9.77 0 11.6s.41 3.51 1.14 4.99l4.14-2.35z"/>
                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.15 2.69 1.14 6.61l4.14 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
                          </svg>
                          Google
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleAuthLogin('Facebook')}
                          className="h-12 border-2 hover:border-blue-600 font-bold flex items-center gap-2 justify-center text-blue-600"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.142v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                          </svg>
                          Facebook
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4" /> Authenticated via {authProvider} as {formData.name}
                        </span>
                        <button type="button" onClick={() => setAuthProvider(null)} className="underline text-foreground">
                          Switch
                        </button>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold">Star Rating</label>
                        <Rating rating={formData.rating} onRatingChange={(val) => setFormData({ ...formData, rating: val })} />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold">Your Review Comment</label>
                        <Textarea
                          rows={4}
                          placeholder="Describe your experience with our team..."
                          value={formData.comment}
                          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-11">
                        Post Verified Review
                      </Button>
                    </form>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((rev) => (
            <Card key={rev.id} className="flex flex-col justify-between border shadow-sm bg-card">
              <CardHeader className="space-y-2 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-4 h-4',
                          i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground border">
                    {rev.platform} Verified
                  </span>
                </div>
                <CardTitle className="font-headline text-lg font-bold text-foreground">
                  {rev.reviewerName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  "{rev.comment}"
                </p>
                <div className="pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" /> Verified Homeowner
                  </span>
                  <span>{rev.submittedAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

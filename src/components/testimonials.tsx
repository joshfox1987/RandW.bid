'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Rating } from './ui/rating';
import { Skeleton } from './ui/skeleton';

const reviewSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  rating: z.coerce.number().min(1, "Rating is required.").max(5),
  comment: z.string().min(10, 'Comment must be at least 10 characters.'),
});

type ReviewItem = {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  submittedAt: string;
};

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    reviewerName: 'Sarah M.',
    rating: 5,
    comment: 'R & W Property Solutions did an incredible job restoring our home after water damage. Professional, fast, and high quality work!',
    submittedAt: new Date().toISOString(),
  },
  {
    id: 'rev-2',
    reviewerName: 'David K.',
    rating: 5,
    comment: 'Absolute professionals. Their debris removal and repair crew worked efficiently and left the property spotless.',
    submittedAt: new Date().toISOString(),
  },
  {
    id: 'rev-3',
    reviewerName: 'Jennifer L.',
    rating: 5,
    comment: 'Licensed, reliable, and honest. They gave us a fair quote and finished ahead of schedule.',
    submittedAt: new Date().toISOString(),
  },
];

const ReviewCard = ({ review }: { review: ReviewItem }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg">{review.reviewerName}</CardTitle>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-5 w-5',
                i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
              )}
            />
          ))}
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{review.comment}</p>
    </CardContent>
  </Card>
);

export default function Testimonials() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<ReviewItem[]>(DEFAULT_REVIEWS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rnw_customer_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading reviews from localStorage:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { name: '', rating: 5, comment: '' },
  });

  const onSubmit = async (data: z.infer<typeof reviewSchema>) => {
    try {
      const newReview: ReviewItem = {
        id: `rev-${Date.now()}`,
        reviewerName: data.name,
        rating: data.rating,
        comment: data.comment,
        submittedAt: new Date().toISOString(),
      };

      const updated = [newReview, ...reviews];
      setReviews(updated);
      localStorage.setItem('rnw_customer_reviews', JSON.stringify(updated));

      toast({ title: 'Success', description: 'Your review has been submitted successfully!' });
      form.reset({ name: '', rating: 5, comment: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not submit review. Please try again.' });
    }
  };

  const renderSkeletons = (count: number) => (
    [...Array(count)].map((_, i) => (
      <Card key={`skeleton-${i}`}>
        <CardHeader>
           <Skeleton className="h-6 w-1/3" />
           <div className="flex items-center gap-1 mt-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
           </div>
        </CardHeader>
        <CardContent className="space-y-2">
           <Skeleton className="h-4 w-full" />
           <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    ))
  );

  return (
    <section id="reviews" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto grid gap-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
            Don't take our word for it...
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            ...take our customers' word for it. See what people are saying about our services.
          </p>
        </div>

        {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{renderSkeletons(3)}</div>
        ) : reviews.length === 0 ? (
            <div className="text-center text-muted-foreground">Be the first to leave a review!</div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.slice(0, 3).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            {reviews.length > 3 && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>View All Reviews</AccordionTrigger>
                  <AccordionContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {reviews.slice(3).map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </>
        )}
        <div className="mx-auto w-full max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Leave a Review</CardTitle>
              <CardDescription>Share your experience with us.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                       <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <Rating rating={field.value} onRatingChange={field.onChange} />
                        </FormControl>
                         <FormMessage />
                       </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comment</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your experience..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

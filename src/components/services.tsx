import { Hammer, Home, Trees, Trash2, CheckCircle2, Wrench, Layers, Paintbrush, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const serviceBuckets = [
  {
    title: 'Flooring & Interior Installations',
    description: 'Master craftsmanship for your home interiors, custom flooring, and remodeling needs.',
    icon: Layers,
    badge: 'Popular',
    items: [
      'Custom Flooring (Hardwood, LVP, Tile, Game Room Turf)',
      'Cabinet Installation & Custom Built-ins',
      'Bathroom & Shower Remodels',
      'Drywall Repair & Texturing',
      'Interior Trim, Baseboards & Molding'
    ]
  },
  {
    title: 'Exterior & Outdoor Living',
    description: 'Enhance curb appeal and build durable outdoor living spaces built to withstand the elements.',
    icon: Hammer,
    badge: 'Durable',
    items: [
      'Custom Deck Builds & Patio Covers',
      'Fence Line Installation & Repair',
      'Pressure Washing & Surface Restoration',
      'Exterior Painting & Staining',
      'Gutter Cleaning & Maintenance'
    ]
  },
  {
    title: 'Restoration & Property Care',
    description: 'Prompt, reliable restoration and structural repairs when unexpected damage occurs.',
    icon: Home,
    badge: '24/7 Response',
    items: [
      'Water & Fire Damage Restoration & Repairs',
      'Structural Framing & Repairs',
      'Tree Trimming & Hazard Mitigation',
      'Stump Removal & Yard Care',
      'Emergency Property Stabilization'
    ]
  },
  {
    title: 'Site Clearance & Cleanouts',
    description: 'Complete heavy debris haul-away, demolition, and pre-sale property cleanups.',
    icon: Trash2,
    badge: 'Full Service',
    items: [
      'Estate Cleanouts & Property Prep',
      'Storm Damage & Fallen Tree Cleanup',
      'Selective Demolition & Shed Removal',
      'Heavy Debris Haul-Away & Disposal',
      'Garage & Outbuilding Cleanouts'
    ]
  }
];

export default function Services() {
  return (
    <section id="services" className="w-full py-16 md:py-24 bg-muted/40 border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-widest border border-amber-500/20">
            <ShieldCheck className="w-4 h-4" /> Professional Contracting &amp; Restoration
          </div>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Our Core Specialties &amp; Services
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
            Delivering top-tier residential and commercial solutions with licensed expertise, transparent bids, and meticulous attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceBuckets.map((bucket, index) => {
            const Icon = bucket.icon;
            return (
              <Card key={index} className="flex flex-col justify-between border-border/80 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl bg-card">
                <CardHeader className="space-y-3 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground border">
                      {bucket.badge}
                    </span>
                  </div>
                  <CardTitle className="font-headline text-xl font-bold tracking-tight text-foreground">
                    {bucket.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                    {bucket.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2.5 border-t pt-4 text-sm text-foreground/90">
                    {bucket.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

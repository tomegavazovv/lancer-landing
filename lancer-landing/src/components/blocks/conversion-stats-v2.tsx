import { Badge } from '../ui/badge';
import Image from 'next/image';

export default function ConversionStatsV2() {
  return (
    <section className="w-full py-16 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-8">
          <Badge
            variant="secondary"
            className="mb-4 px-4 py-2 text-sm font-medium border-0 rounded-full"
            style={{ backgroundColor: '#d9f99d', color: '#000000' }}
          >
            $20.2 per meeting booked.
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Convert Upwork Into Your Best Performing Outreach Channel
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Conversion Numbers that Destroy LinkedIn & Email Outreach
          </p>
        </div>
        <div className="flex justify-center">
          <div className="rounded-xl border border-border bg-white/80 dark:bg-muted/60 shadow-sm overflow-hidden">
            <Image
              src="/digital-will-campaign-performance.png"
              alt="Digital Will Campaign Performance - Conversion Statistics"
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

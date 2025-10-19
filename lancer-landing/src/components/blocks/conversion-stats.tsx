import { Badge } from '../ui/badge';
import { Trophy, MailCheck, Eye, Handshake, Search } from 'lucide-react';

export default function ConversionStats() {
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
        <div className="overflow-x-auto rounded-xl border border-border bg-white/80 dark:bg-muted/60 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Analyzed */}
            <div className="flex flex-col items-center py-8 px-4">
              <Search className="w-10 h-10 mb-2 text-red-400" />
              <div className="text-4xl font-bold mb-1">1267</div>
              <div className="text-base font-medium mb-1">jobs analyzed</div>
              <div className="text-sm text-muted-foreground">(in 4 weeks)</div>
            </div>
            {/* Contacted */}
            <div className="flex flex-col items-center py-8 px-4">
              <Handshake className="w-10 h-10 mb-2 text-lime-600" />
              <div className="text-4xl font-bold mb-1">266</div>
              <div className="text-base font-medium mb-1">proposals sent</div>
              <div className="text-sm text-muted-foreground">(21% of jobs are suitable)</div>
            </div>
            {/* Viewed */}
            <div className="flex flex-col items-center py-8 px-4">
              <Eye className="w-10 h-10 mb-2 text-sky-500" />
              <div className="text-4xl font-bold mb-1">146</div>
              <div className="text-base font-medium mb-1">proposals viewed</div>
              <div className="text-sm text-muted-foreground">(55% open rate)</div>
            </div>
            {/* Replied */}
            <div className="flex flex-col items-center py-8 px-4">
              <MailCheck className="w-10 h-10 mb-2 text-yellow-600" />
              <div className="text-4xl font-bold mb-1">49</div>
              <div className="text-base font-medium mb-1">replies received</div>
              <div className="text-sm text-muted-foreground">(33.7% reply rate)</div>
            </div>
            {/* Won */}
            <div className="flex flex-col items-center py-8 px-4">
              <Trophy className="w-10 h-10 mb-2 text-purple-600" />
              <div className="text-4xl font-bold mb-1">6</div>
              <div className="text-base font-medium mb-1">deals</div>
              <div className="text-sm text-muted-foreground">(12.5% win rate)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
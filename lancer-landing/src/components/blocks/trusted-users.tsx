import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function TrustedUsers() {
  // Row 1: Left to right initial position, scrolls right-to-left
  const row1Cards = [
      '/user-cards/row-1-column-1.png',
      '/user-cards/row-1-column-2.png',
      '/user-cards/row-1-column-3.png',
      '/user-cards/row-1-column-4.png',
      '/user-cards/row-1-column-5.png',
      '/user-cards/row-1-column-1.png',
      '/user-cards/row-1-column-2.png',
      '/user-cards/row-1-column-3.png',
      '/user-cards/row-1-column-4.png',
      '/user-cards/row-1-column-5.png',
      '/user-cards/row-1-column-1.png',
      '/user-cards/row-1-column-2.png',
      '/user-cards/row-1-column-3.png',
      '/user-cards/row-1-column-4.png',
      '/user-cards/row-1-column-5.png',
  ];

  // Row 2: Right to left initial position, scrolls left-to-right
  const row2Cards = [
    '/user-cards/row-2-column-1.png',
    '/user-cards/row-2-column-2.png',
    '/user-cards/row-2-column-3.png',
    '/user-cards/row-2-column-4.png',
    '/user-cards/row-2-column-5.png',
    '/user-cards/row-2-column-1.png',
    '/user-cards/row-2-column-2.png',
    '/user-cards/row-2-column-3.png',
    '/user-cards/row-2-column-4.png',
    '/user-cards/row-2-column-5.png',
    '/user-cards/row-2-column-1.png',
    '/user-cards/row-2-column-2.png',
    '/user-cards/row-2-column-3.png',
    '/user-cards/row-2-column-4.png',
    '/user-cards/row-2-column-5.png',
  ];

  // Row 3: Left to right initial position, scrolls right-to-left
  const row3Cards = [
    '/user-cards/row-3-column-1.png',
    '/user-cards/row-3-column-2.png',
    '/user-cards/row-3-column-3.png',
    '/user-cards/row-3-column-4.png',
    '/user-cards/row-3-column-5.png',
    '/user-cards/row-3-column-1.png',
    '/user-cards/row-3-column-2.png',
    '/user-cards/row-3-column-3.png',
    '/user-cards/row-3-column-4.png',
    '/user-cards/row-3-column-5.png',
    '/user-cards/row-3-column-1.png',
    '/user-cards/row-3-column-2.png',
    '/user-cards/row-3-column-3.png',
    '/user-cards/row-3-column-4.png',
    '/user-cards/row-3-column-5.png',
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-0 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-2 text-sm font-medium rounded-full"
          >
            ⭐ Trusted Users
          </Badge>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4'>
            Trusted by the top 1% of Upwork
          </h2>
          <p className='max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed'>
            You are in good company. Lancer is used by top-performing Upwork users to win deals, across different niches, worldwide.
          </p>
        </div>

        <div className="space-y-6">
          {/* Row 1: Scrolls right-to-left */}
          <div className="relative">
            <div className="flex gap-4 animate-scroll-rtl">
              {/* Duplicate cards for seamless infinite scroll */}
              {row1Cards.map((card, index) => (
                <div key={`row1-${index}`} className="flex-shrink-0">
                  <Image
                    src={card}
                    alt={`User card ${index + 1}`}
                    width={320}
                    height={126}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Scrolls left-to-right */}
          <div className="relative">
            <div className="flex gap-4 animate-scroll-ltr">
              {/* Duplicate cards for seamless infinite scroll */}
              {row2Cards.map((card, index) => (
                <div key={`row2-${index}`} className="flex-shrink-0">
                  <Image
                    src={card}
                    alt={`User card ${index + 1}`}
                    width={320}
                    height={126}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Scrolls right-to-left */}
          <div className="relative">
            <div className="flex gap-4 animate-scroll-rtl">
              {/* Duplicate cards for seamless infinite scroll */}
              {row3Cards.map((card, index) => (
                <div key={`row3-${index}`} className="flex-shrink-0">
                  <Image
                    src={card}
                    alt={`User card ${index + 1}`}
                    width={320}
                    height={126}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


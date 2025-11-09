import { useMediaQuery } from '@/hooks/use-media-query';
import Image from 'next/image';

export default function TrustedUsers() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Responsive card dimensions
  const cardWidth = isMobile ? 336 : 480; // 30% smaller on mobile
  const cardHeight = isMobile ? 132 : 189; // 30% smaller on mobile
  // Row 1: First 5 cards, duplicated for smooth infinite scroll
  const row1Cards = [
    '/new-cards/Property 1=Default.png',
    '/new-cards/Property 1=Variant10.png',
    '/new-cards/Property 1=Variant11-1.png',
    '/new-cards/Property 1=Variant11.png',
    '/new-cards/Property 1=Variant13.png',
    // Duplicate for smooth infinite scroll
    '/new-cards/Property 1=Default.png',
    '/new-cards/Property 1=Variant10.png',
    '/new-cards/Property 1=Variant11-1.png',
    '/new-cards/Property 1=Variant11.png',
    '/new-cards/Property 1=Variant13.png',
  ];

  // Row 2: Next 5 cards, duplicated for smooth infinite scroll
  const row2Cards = [
    '/new-cards/Property 1=Variant14.png',
    '/new-cards/Property 1=Variant15.png',
    '/new-cards/Property 1=Variant16-1.png',
    '/new-cards/Property 1=Variant16-2.png',
    '/new-cards/Property 1=Variant16.png',
    // Duplicate for smooth infinite scroll
    '/new-cards/Property 1=Variant14.png',
    '/new-cards/Property 1=Variant15.png',
    '/new-cards/Property 1=Variant16-1.png',
    '/new-cards/Property 1=Variant16-2.png',
    '/new-cards/Property 1=Variant16.png',
  ];

  // Row 3: Last 5 cards, duplicated for smooth infinite scroll
  const row3Cards = [
    '/new-cards/Property 1=Variant3.png',
    '/new-cards/Property 1=Variant5.png',
    '/new-cards/Property 1=Variant6.png',
    '/new-cards/Property 1=Variant7.png',
    '/new-cards/Property 1=Variant9.png',
    // Duplicate for smooth infinite scroll
    '/new-cards/Property 1=Variant3.png',
    '/new-cards/Property 1=Variant5.png',
    '/new-cards/Property 1=Variant6.png',
    '/new-cards/Property 1=Variant7.png',
    '/new-cards/Property 1=Variant9.png',
  ];

  return (
    <section
      className='py-16 px-4 md:px-0 overflow-hidden'
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white'>
            Trusted by the top 1% of Upwork
          </h2>
          <p className='max-w-[700px] mx-auto md:text-xl/relaxed text-white/80'>
            You are in good company. Lancer is used by top-performing Upwork
            users to win deals, across different niches, worldwide.
          </p>
        </div>

        <div className='space-y-6'>
          {/* Row 1: Scrolls left-to-right */}
          <div className='relative'>
            <div className='flex gap-4 animate-scroll-ltr'>
              {/* Duplicate cards for seamless infinite scroll */}
              {row1Cards.map((card, index) => (
                <div key={`row1-${index}`} className='flex-shrink-0'>
                  <Image
                    src={card}
                    alt={`New card variant ${index + 1}`}
                    width={cardWidth}
                    height={cardHeight}
                    className='rounded-lg'
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Scrolls right-to-left (opposite direction) */}
          <div className='relative'>
            <div className='flex gap-4 animate-scroll-rtl'>
              {/* Duplicate cards for seamless infinite scroll */}
              {row2Cards.map((card, index) => (
                <div key={`row2-${index}`} className='flex-shrink-0'>
                  <Image
                    src={card}
                    alt={`New card variant ${index + 1}`}
                    width={cardWidth}
                    height={cardHeight}
                    className='rounded-lg'
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Scrolls left-to-right */}
          <div className='relative'>
            <div className='flex gap-4 animate-scroll-ltr'>
              {/* Duplicate cards for seamless infinite scroll */}
              {row3Cards.map((card, index) => (
                <div key={`row3-${index}`} className='flex-shrink-0'>
                  <Image
                    src={card}
                    alt={`New card variant ${index + 1}`}
                    width={cardWidth}
                    height={cardHeight}
                    className='rounded-lg'
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

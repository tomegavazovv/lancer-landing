'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Badge } from '@/components/ui/badge';
import { Highlight } from '@/components/ui/hero-highlight';
import { FeatureCard } from '@/components/ui/feature-card';
import { Sparkles } from 'lucide-react';

const featuresData = [
  {
    title: (
      <>
        <Highlight variant='green'>AI-Based</Highlight> Job Filtering
      </>
    ),
    description:
      "Static filters aren't enough. Even if you filter for keywords, most jobs still won't be right for you. Lancer's AI suitability layer analyzes each job posting to determine true compatibility with your skills and preferences.",
    buttonText: 'Play Video',
    buttonHref: '#pricing',
    imageSrc: '/gifs/ai-filtering.mp4',
    imageAlt: 'AI suitability filtering',
    isVideo: true,
    videoUrl: 'https://youtu.be/hA93aGhQvt0', // AI Analysis
  },
  {
    title: (
      <>
        <Highlight variant='red'>Unlimited</Highlight> Targeted Campaigns
      </>
    ),
    description:
      "Static filters aren't enough. Even if you filter for keywords, most jobs still won't be right for you. Lancer's AI suitability layer analyzes each job posting to determine true compatibility with your skills and preferences.",
    buttonText: 'Play Video',
    buttonHref: '#pricing',
    imageSrc: '/gifs/unlimited-campaigns.mp4',
    imageAlt: 'AI suitability filtering',
    isVideo: true,
    videoUrl: 'https://youtu.be/EcDPRDXV5OM', // Unlimited Campaigns
  },
  {
    title: (
      <>
        <Highlight variant='blue'>Cover Letter</Highlight> Templates
      </>
    ),
    description:
      'Stop wasting time writing the same cover letters over and over. Lancer generates personalized proposals and answers client questions using your knowledge base—making every application sound genuinely tailored to the job.',
    buttonText: 'Play Video',
    buttonHref: '#pricing',
    imageSrc: '/gifs/personalized-proposals.mp4',
    imageAlt: 'Automated proposal generation',
    isVideo: true,
    videoUrl: 'https://youtu.be/kUEqz4Bsr5Q', // Cover Letter Templates
  },
  {
    title: (
      <>
        <Highlight variant='orange'>Real-Time</Highlight> Notifications
      </>
    ),
    description:
      'Lancer connects to your agency manager account and handles the entire bidding process. From job analysis to proposal submission—your Upwork outreach runs completely hands-free while you focus on delivering work.',
    buttonText: 'Play Video',
    buttonHref: '#pricing',
    imageSrc: '/gifs/notifications.mp4',
    imageAlt: 'Automated bidding system',
    isVideo: true,
    videoUrl: 'https://youtu.be/m800yJv9DEU', // Notifications
  },
  {
    title: (
      <>
        Complete <Highlight variant='purple'>Bidding Control</Highlight>
      </>
    ),
    description:
      'Track performance across multiple campaigns and accounts. Get detailed analytics on proposal success rates, instant notifications for new opportunities, and manage everything from one dashboard.',
    buttonText: 'Play Video',
    buttonHref: '#pricing',
    imageSrc: '/gifs/bidding-control.mp4',
    imageAlt: 'Analytics dashboard',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=OE_IrVv8JWk', // Bidding Control
  },
  {
    title: (
      <>
        Advanced <Highlight variant='yellow'>Analytics</Highlight>
      </>
    ),
    description:
      'Track performance across multiple campaigns and accounts. Get detailed analytics on proposal success rates, instant notifications for new opportunities, and manage everything from one dashboard.',
    buttonText: 'Play Video',
    buttonHref: '#pricing',
    imageSrc: '/gifs/analytics.mp4',
    imageAlt: 'Analytics dashboard',
    isVideo: true,
    videoUrl: 'https://youtu.be/DkQqLZkwAbc', // Advanced Analytics
  },
  {
    title: (
      <>
        <Highlight variant='green'>Upwork Outreach</Highlight> Academy
      </>
    ),
    description:
      'Track performance across multiple campaigns and accounts. Get detailed analytics on proposal success rates, instant notifications for new opportunities, and manage everything from one dashboard.',
    buttonText: 'Play Video',
    buttonHref: '#pricing',
    imageSrc: '/gifs/academy.mp4',
    imageAlt: 'Analytics dashboard',
    isVideo: true,
    videoUrl: 'https://youtu.be/YW01EmpQYGs', // Academy
  },
];

export function Features() {
  return (
    <section className='py-16 bg-background' id='features'>
      <AnimatedGroup
        className='mx-auto max-w-7xl px-6 py-16 flex flex-col items-center justify-center gap-5'
        preset='blur-slide'
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          },
          item: {
            hidden: { opacity: 0, filter: 'blur(4px)', y: 20 },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              transition: {
                duration: 0.4,
                ease: 'easeOut',
              },
            },
          },
        }}
        rootMargin='-100px'
      >
        <div>
          <Badge
            variant='outline'
            className='text-md py-2 px-4 flex items-center gap-2 rounded-full'
          >
            <Sparkles className='w-[32px] h-[32px]' />
            <span className='text-foreground'>Enhanced Features</span>
          </Badge>
        </div>
        <div className='flex flex-col items-center justify-center gap-15'>
          <h3 className='text-4xl leading-tight font-bold text-center max-w-4xl mx-auto'>
            Upwork AI Agent that finds the perfect jobs for you and applies to
            them automatically
          </h3>
        </div>
      </AnimatedGroup>

      <div className='mt-10 space-y-16 max-w-7xl mx-auto px-6'>
        {featuresData.map((feature, index) => (
          <AnimatedGroup key={index} preset='blur-slide' threshold={0.1}>
            <div className='relative border-2 border-border rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary'>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                buttonText={feature.buttonText}
                buttonHref={feature.buttonHref}
                imageSrc={feature.imageSrc}
                imageAlt={feature.imageAlt}
                isVideo={feature.isVideo}
                videoUrl={feature.videoUrl}
              />
            </div>
          </AnimatedGroup>
        ))}
      </div>
    </section>
  );
}


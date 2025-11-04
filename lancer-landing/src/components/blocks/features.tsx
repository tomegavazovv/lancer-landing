'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Badge } from '@/components/ui/badge';
import { FeatureCard } from '@/components/ui/feature-card';
import { Highlight } from '@/components/ui/hero-highlight';
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
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/gifs%2Fai-filtering.mp4?alt=media&token=f913ab2c-ab19-442f-b194-330ed2eb41f4',
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
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/gifs%2Funlimited-campaigns.mp4?alt=media&token=bcb7c12b-1023-436a-852c-817ab68d2f3c',
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
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/gifs%2Fpersonalized-proposals.mp4?alt=media&token=52ab4de7-3bb8-4da3-b13e-6ca64ebaf1df',
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
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/gifs%2Fnotifications.mp4?alt=media&token=9b60ff08-e7e5-4c76-9edd-db2851f271eb',
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
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/gifs%2Fbidding-control.mp4?alt=media&token=f83765b4-37ba-4247-9926-eb3454c35cc6',
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
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/gifs%2Fanalytics.mp4?alt=media&token=4d817fb7-2199-481e-8e84-407aedcb0461',
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
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/gifs%2Facademy.mp4?alt=media&token=cd5778d5-b47b-4355-a441-7754cd1f8e2b',
    imageAlt: 'Analytics dashboard',
    isVideo: true,
    videoUrl: 'https://youtu.be/YW01EmpQYGs', // Academy
  },
];

export function Features() {
  return (
    <section
      className='py-16'
      style={{ backgroundColor: '#0A0A0A' }}
      id='features'
    >
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
            className='text-md py-2 px-4 flex items-center gap-2 rounded-full border-[#D94C58] text-[#D94C58]'
          >
            <Sparkles className='w-[32px] h-[32px]' />
            <span>Enhanced Features</span>
          </Badge>
        </div>
        <div className='flex flex-col items-center justify-center gap-15'>
          <h3 className='text-4xl leading-tight font-bold text-center max-w-4xl mx-auto text-white'>
            Upwork AI Agent that finds the perfect jobs for you and applies to
            them automatically
          </h3>
        </div>
      </AnimatedGroup>

      <div className='mt-10 space-y-16 max-w-7xl mx-auto px-6'>
        {featuresData.map((feature, index) => (
          <AnimatedGroup key={index} preset='blur-slide' threshold={0.1}>
            <FeatureCard
              title={feature.title}
              description={feature.description}
              buttonText={feature.buttonText}
              buttonHref={feature.buttonHref}
              imageSrc={feature.imageSrc}
              imageAlt={feature.imageAlt}
              isVideo={feature.isVideo}
              videoUrl={feature.videoUrl}
              className='transition-all duration-300 hover:scale-[1.02]'
            />
          </AnimatedGroup>
        ))}
      </div>
    </section>
  );
}

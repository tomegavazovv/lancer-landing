import { AnimatedGroup } from '@/components/ui/animated-group';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { Button } from '@/components/ui/button';
import { Highlight } from '@/components/ui/hero-highlight';
import { LinkPreview } from '@/components/ui/link-preview';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { cn } from '@/lib/utils';
import { Medal, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { BorderBeam } from '../magicui/border-beam';
import { AvatarCircles } from '../ui/avatar-circles';
import { Badge } from '../ui/badge';
import { FeatureCard } from '../ui/feature-card';
import { Glow } from '../ui/glow';
import { LogoIcon } from '../ui/logo-icon';
import { Mockup, MockupFrame } from '../ui/mockup';
import { Particles } from '../ui/particles';
import { SparklesText } from '../ui/sparkles-text';
import { FaqSection } from './faq';
import { Footer } from './footer';
import { Pricing } from './pricing';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

const avatars = [
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/16860528',
    profileUrl: 'https://github.com/dillionverma',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/20110627',
    profileUrl: 'https://github.com/tomonarifeehan',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/106103625',
    profileUrl: 'https://github.com/BankkRoll',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/59228569',
    profileUrl: 'https://github.com/safethecode',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/59442788',
    profileUrl: 'https://github.com/sanjay-mali',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/89768406',
    profileUrl: 'https://github.com/itsarghyadas',
  },
];

const demoPlans = [
  {
    name: 'STARTER',
    price: '79',
    yearlyPrice: '79',
    period: 'per month',
    features: [
      {
        title: 'Marketplace trends',
        description:
          'Get real-time insights on trending keywords, categories, and client behavior on Upwork.',
      },
      {
        title: 'Build your knowledge base',
        description:
          'Create a custom AI knowledge base to personalize proposals based on your experience and preferences.',
      },
      {
        title: 'Advanced search & filters',
        description:
          'Use powerful filters to pinpoint jobs that match your niche, rate, and preferences.',
      },
      {
        title: 'Suitability AI layer',
        description:
          'Automatically evaluates each job for fit, scoring suitability from 0% to 100% with reasoning.',
      },
      {
        title: 'Proposal writer AI layer',
        description:
          'Instantly writes tailored proposals using your tone, cover letter, and project context.',
      },
      {
        title: 'Real-time job tracking',
        description:
          "See new job listings in real-time without refreshing or relying on Upwork's limited filters.",
      },
    ],
    description: 'Perfect for freelancers ready to level up their Upwork game.',
    buttonText: 'Get Started',
    href: '/get-started',
    isPopular: false,
  },
  {
    name: 'PRO',
    period: 'per month',
    includesFrom: 'Everything in Starter plus:',
    features: [
      {
        title: 'Connect Upwork account',
        description:
          'Link your Upwork account to enable real-time bidding and personalized job targeting.',
      },
      {
        title: 'Auto-bidding agent',
        description:
          'Automatically sends proposals to high-fit jobs, saving hours of manual work.',
      },
      {
        title: 'Multiple outreach campaigns',
        description:
          'Run and manage several campaigns targeting different niches, team members, or strategies.',
      },
      {
        title: 'Campaign analytics',
        description:
          'Track performance metrics like win rate, average job value, and proposal effectiveness.',
      },
      {
        title: 'Monthly consultation',
        description:
          'Get expert guidance every month to optimize your campaigns and improve win rates.',
      },
    ],
    description:
      'Built for the top 10% freelancers looking to automate their Upwork outreach and win more deals on auto-pilot.',
    buttonText: 'Get Started',
    href: '/get-started',
    isPopular: true,
  },
  {
    name: 'AGENCY',
    period: 'per month',
    includesFrom: 'Everything in Pro plus:',
    features: [
      {
        title: 'No usage limits',
        description:
          'Analyze and apply to as many jobs as you want — no credit or cap restrictions.',
      },
      {
        title: 'Express Bidding',
        description:
          'Prioritize and send proposals instantly to time-sensitive or high-value jobs.',
      },
      {
        title: 'Connect multiple accounts',
        description:
          'Link several Upwork accounts to manage client work or team outreach from one dashboard.',
      },
      {
        title: 'Priority support & onboarding',
        description:
          'Skip the queue and get white-glove onboarding and support from our team.',
      },
      {
        title: 'Weekly Consultation',
        description:
          'Receive personalized strategy sessions every week to scale and refine outreach.',
      },
    ],
    description:
      'Created for the top 1% freelancer and agencies earning over $100,000/yr. looking to run campaigns with no limits.',
    buttonText: 'Get Started',
    href: '/get-started',
    isPopular: false,
  },
  {
    name: 'LEAD GEN',
    period: 'per month',
    includesFrom: 'Everything in Agency plus:',
    features: [
      {
        title: 'White-label included',
        description:
          'Run campaigns under your agency brand — no mention of Lancer anywhere.',
      },
      {
        title: 'Multiple organizations',
        description:
          'Manage Upwork outreach for multiple clients or brands under one subscription.',
      },
      {
        title: 'Multiple knowledge bases',
        description:
          'Create distinct AI knowledge bases for each client to ensure proposal accuracy.',
      },
    ],
    description:
      'Designed for Upwork outreach experts managing high-volume campaigns for multiple clients.',
    buttonText: 'Get Started',
    href: '/get-started',
    isPopular: false,
  },
];

function PricingBasic() {
  return (
    <div className='rounded-lg'>
      <Pricing
        plans={demoPlans}
        title='Choose your growth plan'
        description="Lancer's pricing is built around how you work, whether you are starting, growing, or managing clients."
      />
    </div>
  );
}

function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Lancer was so effective for us. We were able to close down on three high quality deals in just under two weeks. I had to pause the campaign because we couldn't take on any more work - honestly, that's the best problem I had in years.",
      name: 'Nikola Arsovski',
      designation: 'Top Rated Upworker',
      videoSrc: 'https://fast.wistia.net/embed/iframe/m2ek96zapa',
      thumbnailUrl:
        'https://embed-ssl.wistia.com/deliveries/958d797d3efe0bfd1fa051d39510d56a958adaae.jpg?image_crop_resized=1920x1080',
      socialLink: 'https://www.linkedin.com/in/nikolaarsovskiii/',
    },

    {
      quote:
        'We started using Lancer maybe a month ago, and it has been incredible so far. We were able to get one new client in the first two weeks, which is amazing. The approach feels really genuine.',
      name: 'Martin Peshevski',
      designation: 'Agency Looking to Scale',
      videoSrc: 'https://fast.wistia.net/embed/iframe/n9l2zza1d6',
      thumbnailUrl:
        'https://embed-ssl.wistia.com/deliveries/e3b24a38621b4a6edf0f47ad7e066529d6e93c5f.jpg?image_crop_resized=1920x1080',
      socialLink: 'https://www.linkedin.com/in/martinpesevski/',
    },

    {
      quote:
        "With Lancer, we've been able to send very high quality proposals that simply work. In just two weeks, we landed our first project. It was very easy to set up, and I intend to continue using it.",
      name: 'Ivo Damjanovski',
      designation: 'Just started on Upwork',
      videoSrc: 'https://fast.wistia.net/embed/iframe/rtyzue1dr4',
      thumbnailUrl:
        'https://embed-ssl.wistia.com/deliveries/76704df37df81e28e5c12dd9f762491168d6a0bd.jpg?image_crop_resized=1920x1080',
      socialLink: 'https://www.linkedin.com/in/ivo-damjanovski/',
    },
  ];
  return <AnimatedTestimonials autoplay={true} testimonials={testimonials} />;
}

export { AnimatedTestimonialsDemo };

export function HeroSection() {
  const [isOverDarkSection, setIsOverDarkSection] = React.useState(false);
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px -100% 0px',
  });

  React.useEffect(() => {
    if (testimonialsInView) {
      setIsOverDarkSection(true);
    } else {
      setIsOverDarkSection(false);
    }
  }, [testimonialsInView]);

  const faqData = [
    {
      question: "What's the best way to win more jobs on Upwork in 2025?",
      answer:
        'Winning on Upwork today means applying fast, targeting the right jobs, and sending proposals that sound personal — not generic. Lancer helps you do all three by automating the grind while keeping your outreach sharp and relevant.',
    },
    {
      question: 'What is an Upwork AI Agent?',
      answer:
        'An Upwork AI Agent is a smart assistant that helps freelancers and agencies find, filter, and apply to jobs on Upwork automatically. Lancer is an AI agent designed to handle the most time-consuming parts of the process — from job discovery to proposal writing — using personalized, human-like responses.',
    },
    {
      question: 'Is Upwork automation allowed?',
      answer:
        "Upwork prohibits spammy bots that mass-apply to jobs. Lancer is built to stay within Upwork's terms by sending tailored, high-quality proposals based on your profile, skills, and preferences — just like a human assistant would.",
    },
    {
      question: 'How can I automate my Upwork proposals?',
      answer:
        "You can automate your proposals with tools like Lancer, which analyzes job descriptions, selects only relevant matches based on your filters, and writes personalized proposals that reflect your expertise and tone. You can review proposals before they're sent or let Lancer auto-apply.",
    },
    {
      question:
        'Will using an AI agent improve my chances of getting jobs on Upwork?',
      answer:
        'Yes — response speed and relevance are key factors on Upwork. Lancer applies faster than a human, with personalized proposals that align with job requirements. That gives you a competitive edge without sacrificing quality.',
    },
    {
      question: 'How does Lancer choose which jobs to apply to?',
      answer:
        'Lancer uses a combination of keyword matching, client quality filters and your own preferences to shortlist and apply only to jobs that are a strong fit — avoiding mismatches and time-wasters.',
    },
    {
      question: "Can I still review proposals before they're sent?",
      answer:
        "Yes. You're always in control. You can play around with Lancer's outputs until you are satisfied. However, once you are confident in it's performance we recommend letting Lancer do it's thing on auto-pilot.",
    },
    {
      question:
        'What types of freelancers benefit most from Upwork automation?',
      answer:
        'Lancer is best suited for: Solo freelancers who want to save time and focus on client work, Agencies who need to scale outreach across multiple accounts, Anyone tired of writing repetitive proposals but still wants to win top jobs.',
    },
  ];

  return (
    <>
      <HeroHeader isOverDarkSection={isOverDarkSection} />
      <main className='overflow-hidden'>
        <div
          aria-hidden
          className='z-0 absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block'
        >
          <div className='w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]' />
          <div className='h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]' />
          <div className='h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]' />
        </div>
        <section>
          <div className='relative pt-8 md:pt-36'>
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 1,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: 'spring',
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className='absolute inset-0 -z-20'
            >
              <img
                src='https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120'
                alt='background'
                className='absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block'
                width='3276'
                height='4095'
              />
            </AnimatedGroup>
            <div
              aria-hidden
              className='absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]'
            />
            <div className='mx-auto max-w-7xl px-6'>
              <div className='text-center sm:mx-auto lg:mr-auto lg:mt-0'>
                <AnimatedGroup variants={transitionVariants}>
                  <h1 className='mt-8 max-w-4xl mx-auto text-balance text-6xl font-semibold md:text-7xl lg:mt-24 xl:text-[5.25rem]'>
                    Your{' '}
                    <SparklesText
                      text='Upwork Outreach.'
                      colors={{ first: '#9E7AFF', second: '#FE8BBB' }}
                      sparklesCount={8}
                    />{' '}
                    <br className='hidden md:inline' />
                    <span className='md:block'>Running Itself.</span>
                  </h1>
                  <p className='mx-auto mt-8 max-w-3xl text-balance text-xl'>
                    From finding perfect jobs to sending winning
                    proposals—Lancer handles the entire outreach process so you
                    can stop chasing work and focus on delivering results.
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'
                >
                  <AvatarCircles numPeople={99} avatarUrls={avatars} />
                  <div className='flex items-center gap-2'>
                    <div
                      className='flex'
                      role='img'
                      aria-label='5 out of 5 stars'
                    >
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className='w-4 h-4 fill-yellow-400 text-yellow-400'
                          aria-hidden='true'
                        />
                      ))}
                    </div>
                    <span className='sr-only'>Rated 5 out of 5 stars</span>
                    <span className='text-sm text-muted-foreground ml-1'>
                      (99+ reviews)
                    </span>
                  </div>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className='mt-8 flex flex-col items-center justify-center gap-2 md:flex-row relative z-10'
                >
                  <div className='bg-foreground/10 rounded-[14px] border p-0.5 relative z-10'>
                    <Button
                      asChild
                      size='lg'
                      className='rounded-xl px-5 text-base relative z-10'
                    >
                      <Link href='/get-started'>
                        <span className='text-nowrap'>Get Started</span>
                      </Link>
                    </Button>
                  </div>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className='relative flex justify-center mt-8 px-2 sm:mr-0 sm:mt-12 md:mt-20 z-20'>
                <div className='relative pt-12'>
                  <MockupFrame
                    className='animate-appear opacity-0 delay-700'
                    size='small'
                  >
                    <Mockup type='responsive'>
                      <div
                        aria-hidden
                        className='bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%'
                      />
                      <div className='bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl p-4'>
                        <Image
                          className='z-10 aspect-15/8 relative rounded-2xl dark:hidden w-full h-auto'
                          src='/product.png'
                          alt='app screen'
                          width='2700'
                          height='1440'
                        />
                      </div>
                    </Mockup>
                  </MockupFrame>
                  <Glow
                    variant='top'
                    intensity={'light'}
                    className='animate-appear-zoom opacity-0 delay-1000'
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
        <section
          id='testimonials'
          ref={testimonialsRef}
          className='bg-black pb-16 pt-16 md:pb-32 -mt-1 px-5 '
        >
          <AnimatedGroup
            preset='blur-slide'
            className='space-y-6'
            threshold={0.2}
            rootMargin='-50px'
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.1, // Increased from default 0.1 to slow down stagger
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
                    duration: 0.4, // Added duration to slow down individual items
                    ease: 'easeOut',
                  },
                },
              },
            }}
          >
            <h3 className='text-white text-center text-2xl sm:text-4xl font-bold mb-3 flex items-center justify-center gap-2 flex-wrap'>
              <Medal className='hidden sm:block w-10 h-10 flex-shrink-0' />
              <span className='whitespace-nowrap'>Trusted by Upwork</span>
              <span className='whitespace-nowrap'>Professionals</span>
            </h3>
            <p className='text-gray-300 text-center text-lg  sm:max-w-[330px] md:max-w-xl mx-auto'>
              Freelancers and agencies who've elevated their Upwork business
            </p>
            <div className='mt-10 max-w-4xl mx-auto relative border-2 border-white/20 rounded-3xl mx-5'>
              <BorderBeam
                size={150}
                duration={12}
                colorFrom='#ffaa40'
                colorTo='#9c40ff'
                delay={0}
                className='p-5'
              />
              <AnimatedTestimonialsDemo />
            </div>
          </AnimatedGroup>
        </section>

        <section id='features' className='mx-auto max-w-7xl px-6 '>
          <AnimatedGroup
            className='mx-auto max-w-7xl px-6 py-16 flex flex-col items-center justify-center gap-5'
            preset='blur-slide'
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.3, // Increased from 0.2 to slow down stagger
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
                    duration: 0.4, // Added duration to slow down individual items
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
                Upwork AI Agent that finds the perfect jobs for you and applies
                to them automatically
              </h3>
            </div>
          </AnimatedGroup>

          <div className='mt-10 space-y-16'>
            <AnimatedGroup preset='blur-slide' threshold={0.1}>
              <div className='relative border border-gray-200 rounded-lg dark:border-gray-700'>
                <FeatureCard
                  title={
                    <>
                      AI <Highlight variant='green'>Job Analysis</Highlight>
                    </>
                  }
                  description="Static filters aren't enough. Even if you filter for keywords, most jobs still won't be right for you. Lancer's AI suitability layer analyzes each job posting to determine true compatibility with your skills and preferences."
                  buttonText='Get Started'
                  buttonHref='/get-started'
                  checkmarkText='No card required'
                  imageSrc='https://i.ibb.co/Zsw2QQG/Group-8-2.png'
                  imageAlt='AI suitability filtering'
                />
              </div>
            </AnimatedGroup>

            <AnimatedGroup preset='blur-slide' threshold={0.1}>
              <div className='relative border border-gray-200 rounded-lg dark:border-gray-700'>
                <FeatureCard
                  title={
                    <>
                      Personalized{' '}
                      <Highlight variant='blue'>Proposals</Highlight>
                    </>
                  }
                  description='Stop wasting time writing the same cover letters over and over. Lancer generates personalized proposals and answers client questions using your knowledge base—making every application sound genuinely tailored to the job.'
                  buttonText='Get Started'
                  buttonHref='/get-started'
                  checkmarkText='No card required'
                  imageSrc='https://i.ibb.co/tp9s01gx/Screenshot-2025-06-09-at-15-26-25.png'
                  imageAlt='Automated proposal generation'
                />
              </div>
            </AnimatedGroup>

            <AnimatedGroup preset='blur-slide' threshold={0.1}>
              <div className='relative border border-gray-200 rounded-lg dark:border-gray-700'>
                <FeatureCard
                  title={
                    <>
                      {/* Mobile version - with line break after "Complete" */}
                      <span className='block md:hidden'>
                        Complete
                        <br />
                        <Highlight variant='orange'>
                          Bidding Automation
                        </Highlight>
                      </span>
                      {/* Desktop version - original layout */}
                      <span className='hidden md:inline'>
                        Complete{' '}
                        <Highlight variant='orange'>
                          Bidding Automation
                        </Highlight>
                      </span>
                    </>
                  }
                  description='Lancer connects to your agency manager account and handles the entire bidding process. From job analysis to proposal submission—your Upwork outreach runs completely hands-free while you focus on delivering work.'
                  buttonText='Get Started'
                  buttonHref='/get-started'
                  checkmarkText='No card required'
                  imageSrc='https://i.ibb.co/Wp6vdZ0b/Group-7.png'
                  imageAlt='Automated bidding system'
                />
              </div>
            </AnimatedGroup>

            <AnimatedGroup preset='blur-slide' threshold={0.1}>
              <div className='relative border border-gray-200 rounded-lg dark:border-gray-700'>
                <FeatureCard
                  title={
                    <>
                      Key <Highlight variant='purple'>Insights</Highlight>
                    </>
                  }
                  description='Track performance across multiple campaigns and accounts. Get detailed analytics on proposal success rates, instant notifications for new opportunities, and manage everything from one dashboard.'
                  buttonText='Get Started'
                  buttonHref='/get-started'
                  checkmarkText='No card required'
                  imageSrc='https://i.ibb.co/GQWW8PV0/image-6.png'
                  imageAlt='Analytics dashboard'
                />
              </div>
            </AnimatedGroup>
          </div>
        </section>

        <section className='relative bg-gradient-to-b from-background via-muted/20 to-background'>
          {/* Statistics Section with Particles */}
          <div className='relative py-40'>
            <Particles
              className='absolute inset-0'
              quantity={100}
              staticity={30}
              ease={50}
              color='black'
              refresh={false}
            />
            <div className='relative z-10 mx-auto max-w-7xl px-6 text-center'>
              <div className='text-8xl md:text-9xl lg:text-[12rem] font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent'>
                1,247
              </div>
              <p className='mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
                successful deals landed by Lancer users this month
              </p>
              <div className='mt-4 flex items-center justify-center gap-2 text-sm md:text-base font-medium text-muted-foreground/80'>
                <LinkPreview
                  isStatic={true}
                  imageSrc='https://i.pinimg.com/736x/f2/38/54/f2385487f44aaef17b7674249bcfa39c.jpg'
                  width={200}
                  height={200}
                  className='cursor-pointer hover:underline z-50'
                >
                  <TextGenerateEffect
                    words='💤 while they were sleeping 💤'
                    className='text-sm md:text-base font-medium text-muted-foreground/80'
                    duration={1}
                  />
                </LinkPreview>
              </div>
              <div className='mt-8 flex flex-col items-center justify-center gap-2 md:flex-row'>
                <div className='bg-foreground/10 rounded-[14px] border p-0.5'>
                  <Button
                    asChild
                    size='lg'
                    className='rounded-xl px-5 text-base'
                  >
                    <Link href='/get-started'>
                      <span className='text-nowrap'>Get Started</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <section id='pricing' className='mx-auto max-w-7xl px-6 py-2'>
            <div className='absolute inset-0 -z-10'>
              <div className='h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_35px] opacity-40 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]' />
            </div>
            <PricingBasic />
          </section>

          {/* FAQ Section */}
          <div className='relative mx-auto max-w-7xl px-6 mb-10'>
            <AnimatedGroup
              preset='blur-slide'
              threshold={0.2}
              rootMargin='-50px'
            >
              <FaqSection
                title='Frequently Asked Questions'
                description='Everything you need to know about Lancer and Upwork automation'
                items={faqData}
              />
            </AnimatedGroup>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const menuItems = [
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
];

const HeroHeader = ({ isOverDarkSection }: { isOverDarkSection: boolean }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <nav className='relative lg:fixed z-50 w-full px-2'>
        <div
          className={cn(
            'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
            isScrolled &&
              'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
          )}
        >
          <div className='relative flex items-center justify-center lg:justify-between gap-6 py-3 lg:py-4'>
            {/* Mobile: Centered logo */}
            <div className='lg:hidden'>
              <Link
                href='/'
                aria-label='home'
                className='flex items-center space-x-2'
              >
                <LogoIcon />
              </Link>
            </div>

            {/* Desktop: Logo on left */}
            <div className='hidden lg:block'>
              <Link
                href='/'
                aria-label='home'
                className='flex items-center space-x-2'
              >
                <LogoIcon />
              </Link>
            </div>

            {/* Desktop: Navigation menu */}
            <div className='absolute inset-0 m-auto hidden size-fit lg:block'>
              <ul className='flex gap-8 text-sm'>
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={cn(
                        'text-muted-foreground hover:text-accent-foreground block duration-150',
                        isOverDarkSection && 'text-white/80 hover:text-white'
                      )}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop: Get Started button */}
            <div className='hidden lg:flex'>
              <Button
                asChild
                size='sm'
                className={cn(isScrolled && 'lg:hidden')}
              >
                <Link href='/get-started'>
                  <span>Get Started</span>
                </Link>
              </Button>
              <Button
                asChild
                size='sm'
                className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}
              >
                <Link href='/get-started'>
                  <span>Get Started</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

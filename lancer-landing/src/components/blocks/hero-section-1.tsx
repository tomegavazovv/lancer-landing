import { AnimatedGroup } from '@/components/ui/animated-group';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { Button } from '@/components/ui/button';
import { Highlight } from '@/components/ui/hero-highlight';
import { LinkPreview } from '@/components/ui/link-preview';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { cn } from '@/lib/utils';
import { submitToZapier, WebhookPayload } from '@/lib/config';
import { CirclePlay, Medal, Sparkles, Info, Play, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { BorderBeam } from '../magicui/border-beam';
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
import { Input } from '../ui/input';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import ConversionStats from './conversion-stats';
import SalesPitch1 from './sales-pitch-1';
import { PricingSectionBasic } from '@/components/ui/demo-single-pricing-card';
import { CalendlyModal } from '../ui/calendly-modal';
import { EmailModal } from '../ui/email-modal';
import { VideoModal } from '../ui/video-modal';

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
    buttonText: 'Book Demo',
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
    buttonText: 'Book Demo',
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
    buttonText: 'Book Demo',
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
          'Offer Lancer as your own service to clients with custom branding and pricing.',
      },
      {
        title: 'Dedicated account manager',
        description:
          'Get a personal account manager to handle all your needs and optimize performance.',
      },
      {
        title: 'Custom integrations',
        description:
          'Integrate with your existing tools and workflows for seamless operation.',
      },
      {
        title: 'Priority feature requests',
        description:
          'Get new features and improvements prioritized based on your specific needs.',
      },
      {
        title: 'Weekly strategy calls',
        description:
          'Regular strategy sessions to maximize your ROI and scale your operations.',
      },
    ],
    description:
      'For agencies and consultants who want to offer Lancer as a service to their clients.',
    buttonText: 'Book Demo',
    isPopular: false,
  },
];

function PricingBasic({ onBookDemo }: { onBookDemo: () => void }) {
  const plansWithHandlers = demoPlans.map(plan => ({
    ...plan,
    onButtonClick: onBookDemo
  }));

  return (
    <div className='rounded-lg'>
      <Pricing
        plans={plansWithHandlers}
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
  const [isEmailModalOpen, setIsEmailModalOpen] = React.useState(false);
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = React.useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);
  
  // Email form state
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

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

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Webhook submission function
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      setSubmitStatus('error');
      return;
    }
    
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const payload: WebhookPayload = {
        email: email.trim(),
        timestamp: new Date().toISOString(),
        source: 'hero_cta'
      };

      const success = await submitToZapier(payload);

      if (success) {
        setSubmitStatus('success');
        setEmail(''); // Clear form on success
        
        // Scroll to pricing section after successful submission
        setTimeout(() => {
          const pricingSection = document.getElementById('pricing');
          if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Webhook submission error:', error);
      setErrorMessage('Something went wrong. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <HeroHeader isOverDarkSection={isOverDarkSection} onBookDemo={() => setIsCalendlyModalOpen(true)} onGetStarted={() => setIsEmailModalOpen(true)} />
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
          <div className='relative pt-4 md:pt-16'>
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
                  <div className='mt-8 lg:mt-16'>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className='mb-6 px-4 py-2 text-sm font-medium bg-[#D9F99D] text-black border-0 rounded-full cursor-help inline-flex items-center gap-1'>
                          55% open rate. 33% reply rate. 12.5% win rate
                          <Info className='w-4 h-4 align-middle -mt-0.5' />
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        Average conversion numbers from users running Lancer.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <SparklesText
                    text='Land high-paying Upwork jobs on autopilot.'
                    colors={{ first: '#9E7AFF', second: '#FE8BBB' }}
                    sparklesCount={12}
                    className='max-w-6xl mx-auto text-balance text-4xl font-semibold md:text-6xl xl:text-[5.25rem]'
                  />
                  <p className='mx-auto mt-4 mb-8 max-w-6xl text-balance text-lg md:text-xl text-muted-foreground font-normal'>
                    Lancer works 24/7, filters the crap, writes and sends winning proposals for the right jobs in your name.
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
                  className='mt-8 flex flex-col items-center justify-center gap-4 md:flex-row relative z-10'
                >
                  <div className="flex flex-col items-center gap-4">
                    <form onSubmit={handleEmailSubmit} className="flex items-center gap-0 bg-white rounded-2xl shadow-md p-1 transition-all">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (submitStatus === 'error') {
                            setSubmitStatus('idle');
                            setErrorMessage('');
                          }
                        }}
                        className="min-w-[220px] rounded-2xl border-0 focus:ring-2 focus:ring-primary/40 focus:outline-none text-base px-5 py-3 shadow-none"
                        disabled={isSubmitting || submitStatus === 'success'}
                      />
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting || submitStatus === 'success'}
                        className="rounded-2xl px-7 py-3 text-base font-semibold bg-black text-white hover:bg-primary transition-colors shadow-none border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Submitting...
                          </span>
                        ) : submitStatus === 'success' ? (
                          <span className="text-green-500">✓ Success!</span>
                        ) : (
                          <span className="text-nowrap">Access Launch Offer</span>
                        )}
                      </Button>
                    </form>
                    
                    {/* Status Messages */}
                    {submitStatus === 'error' && errorMessage && (
                      <div className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                        {errorMessage}
                      </div>
                    )}
                    
                    {submitStatus === 'success' && (
                      <div className="text-green-600 text-sm bg-green-50 px-4 py-2 rounded-lg border border-green-200 text-center">
                        🎉 Great! We've logged your request, scroll down to see our pricing.
                      </div>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => setIsVideoModalOpen(true)}
                    variant='outline'
                    size='lg'
                    className='rounded-xl px-5 text-base relative z-10 flex items-center gap-2 hidden md:flex'
                  >
                    <CirclePlay className='w-4 h-4' />
                    <span className='text-nowrap'>Watch Demo</span>
                  </Button>
                  <Button
                    asChild
                    variant='outline'
                    size='lg'
                    className='rounded-xl px-5 text-base relative z-10'
                  >
                    {/* <Link href='#testimonials'>
                      <CirclePlay className='w-4 h-4 mr-2' />
                      <span className='text-nowrap'>Watch Demo</span>
                    </Link> */}
                  </Button>
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
              <div className='relative flex justify-center mt-4 px-2 sm:mr-0 sm:mt-8 md:mt-12 z-10 mb-[-5%]'>
                <div className='relative pt-8'>
                  <MockupFrame
                    className='animate-appear opacity-0 delay-700'
                    size='small'
                  >
                    <Mockup type='responsive'>
                      <div
                        aria-hidden
                        className='bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%'
                      />
                      <div className='relative mx-auto max-w-6xl overflow-hidden rounded-2xl'>
                        <div className="relative aspect-15/8 rounded-2xl overflow-hidden">
                          <Image
                            src="https://img.youtube.com/vi/2B_q2alwPFA/maxresdefault.jpg"
                            alt="Lancer Demo Video Thumbnail"
                            className="w-full h-full object-cover rounded-2xl"
                            width={2700}
                            height={1440}
                          />
                          {/* Video Overlay Button */}
                          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 hover:bg-black/30 transition-colors cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
                            <Button
                              size="lg"
                              className="bg-red-600 hover:bg-red-700 text-white rounded-full w-20 h-20 shadow-2xl backdrop-blur-sm border-4 border-white hover:scale-110 transition-all duration-300 animate-pulse flex items-center justify-center"
                            >
                              <Play className='w-20 h-20' fill="currentColor" />
                            </Button>
                          </div>
                        </div>
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
          className='bg-black pb-16 pt-16 md:pb-32 -mt-1 px-5 relative z-20'
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
            <h3 className='text-white text-center text-3xl sm:text-4xl font-bold mb-3 flex items-center justify-center gap-2 flex-wrap'>
              <Medal className=' sm:block w-6 h-6 sm:w-10 sm:h-10  flex-shrink-0' />
              <span className='whitespace-nowrap'>Trusted by Upwork</span>
              <span className='whitespace-nowrap'>Professionals</span>
            </h3>
            <p className='text-gray-300 text-center text-lg  sm:max-w-[330px] md:max-w-xl mx-auto'>
              Freelancers and agencies winning more deals on Upwork
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
        <ConversionStats />
        <div className="max-w-7xl mx-auto bg-gradient-to-b from-[#18181b] to-[#23232a] rounded-3xl my-30 py-12 px-2 md:px-8 overflow-hidden flex justify-center items-center">
          <SalesPitch1 darkBg />
        </div>
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
              <div className='relative border border-gray-200 rounded-xl dark:border-gray-700'>
                <FeatureCard
                  title={
                    <>
                      AI <Highlight variant='green'>Job Analysis</Highlight>
                    </>
                  }
                  description="Static filters aren't enough. Even if you filter for keywords, most jobs still won't be right for you. Lancer's AI suitability layer analyzes each job posting to determine true compatibility with your skills and preferences."
                  buttonText='Access Launch Offer'
                  buttonHref='#pricing'

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
                  buttonText='Access Launch Offer'
                  buttonHref='#pricing'

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
                  buttonText='Access Launch Offer'
                  buttonHref='#pricing'

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
                  buttonText='Access Launch Offer'
                  buttonHref='#pricing'

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
              46              </div>
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
                    className='text-sm md:text-base font-medium text-muted-foreground/80 text-underline'
                    duration={1}
                  />
                </LinkPreview>
              </div>
              <div className='mt-8 flex flex-col items-center justify-center gap-2 md:flex-row'>
                <div className='bg-foreground/10 rounded-[14px] border p-0.5'>
                  <Button
                    size='lg'
                    className='rounded-xl px-5 text-base'
                    onClick={() => setIsCalendlyModalOpen(true)}
                  >
                    <span className='text-nowrap'>Boom Demo With Founder</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <section id='pricing' className='mx-auto max-w-7xl px-6 py-2'>
            <div className='absolute inset-0 -z-10'>
              <div className='h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_35px] opacity-40 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]' />
            </div>
            <PricingSectionBasic onBookDemo={() => setIsCalendlyModalOpen(true)} />
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
      <CalendlyModal 
        isOpen={isCalendlyModalOpen} 
        onClose={() => setIsCalendlyModalOpen(false)} 
      />
      <EmailModal 
        isOpen={isEmailModalOpen} 
        onClose={() => setIsEmailModalOpen(false)} 
      />
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />
    </>
  );
}

const menuItems = [
  { name: 'Calculate Wins', href: 'https://calculator.lancer.app' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
];

const HeroHeader = ({ isOverDarkSection, onBookDemo, onGetStarted }: { isOverDarkSection: boolean; onBookDemo: () => void; onGetStarted: () => void }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
          <div className='relative flex items-center justify-between gap-6 py-3 lg:py-4'>
            {/* Logo */}
            <div>
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
              <ul className={cn(
                'flex text-sm',
                isScrolled ? 'gap-4' : 'gap-8'
              )}>
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

            {/* Desktop: Navigation buttons */}
            <div className='hidden lg:flex gap-1'>
              <Button
                size='sm'
                variant="outline"
                className={cn(isScrolled && 'lg:hidden')}
                onClick={onGetStarted}
              >
                <span>Get Started</span>
              </Button>
              <Button
                size='sm'
                variant="outline"
                className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}
                onClick={onGetStarted}
              >
                <span>Get Started</span>
              </Button>
              <Button
                size='sm'
                className={cn(isScrolled && 'lg:hidden')}
                onClick={onBookDemo}
              >
                <span>Demo With Founder</span>
              </Button>
              <Button
                size='sm'
                className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}
                onClick={onBookDemo}
              >
                <span>Demo</span>
              </Button>
            </div>

            {/* Mobile: Hamburger menu button */}
            <div className='lg:hidden'>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'text-muted-foreground hover:text-accent-foreground',
                  isOverDarkSection && 'text-white/80 hover:text-white'
                )}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile: Navigation menu */}
          {isMobileMenuOpen && (
            <div className='lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border mt-2 rounded-b-2xl shadow-lg'>
              <div className='px-6 py-4 space-y-4'>
                {/* Mobile menu items */}
                <ul className='space-y-3'>
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={cn(
                          'text-muted-foreground hover:text-accent-foreground block py-2 duration-150',
                          isOverDarkSection && 'text-white/80 hover:text-white'
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                
                {/* Mobile action buttons */}
                <div className='flex flex-col gap-2 pt-4 border-t border-border'>
                  <Button
                    size='sm'
                    variant="outline"
                    onClick={() => {
                      onGetStarted();
                      setIsMobileMenuOpen(false);
                    }}
                    className='w-full'
                  >
                    <span>Get Started</span>
                  </Button>
                  <Button
                    size='sm'
                    onClick={() => {
                      onBookDemo();
                      setIsMobileMenuOpen(false);
                    }}
                    className='w-full'
                  >
                    <span>Demo With Founder</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

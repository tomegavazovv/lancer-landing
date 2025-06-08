import { AnimatedGroup } from '@/components/ui/animated-group';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Medal, Menu, Sparkles, Star, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { BorderBeam } from '../magicui/border-beam';
import { AvatarCircles } from '../ui/avatar-circles';
import { Badge } from '../ui/badge';
import { Glow } from '../ui/glow';
import { LogoIcon } from '../ui/logo-icon';
import { Mockup, MockupFrame } from '../ui/mockup';
import { SparklesText } from '../ui/sparkles-text';
import { FaqSection } from './faq';

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
  return <AnimatedTestimonials testimonials={testimonials} />;
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
          className='z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block'
        >
          <div className='w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]' />
          <div className='h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]' />
          <div className='h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]' />
        </div>
        <section>
          <div className='relative pt-24 md:pt-36'>
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
                  <h1 className='mt-8 max-w-4xl mx-auto text-balance text-6xl font-semibold md:text-7xl lg:mt-16 xl:text-[5.25rem]'>
                    Your{' '}
                    <SparklesText
                      text='Upwork Outreach'
                      colors={{ first: '#9E7AFF', second: '#FE8BBB' }}
                      sparklesCount={8}
                    />
                    . <br />
                    Running Itself.
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
                  className='mt-8 flex flex-col items-center justify-center gap-2 md:flex-row'
                >
                  <div className='bg-foreground/10 rounded-[14px] border p-0.5'>
                    <Button
                      asChild
                      size='lg'
                      className='rounded-xl px-5 text-base'
                    >
                      <Link href='#link'>
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
              <div className='relative flex justify-center -mr-56 mt-8 px-2 sm:mr-0 sm:mt-12 md:mt-20'>
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
                          className='z-2 aspect-15/8 relative rounded-2xl dark:hidden'
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
          ref={testimonialsRef}
          className='bg-black pb-16 pt-16 md:pb-32 -mt-1 '
        >
          <h3 className='text-white text-center text-4xl font-bold mb-3 flex items-center justify-center gap-2'>
            <Medal className='w-10 h-10' />
            <span>Trusted by Upwork Professionals</span>
          </h3>
          <p className='text-gray-300 text-center text-lg max-w-xl mx-auto'>
            Freelancers and agencies who've elevated their Upwork business
          </p>
          <div className='mt-10 max-w-4xl mx-auto relative border border-2 border-white/20 rounded-3xl mx-5'>
            <BorderBeam
              size={150}
              duration={12}
              colorFrom='#ffaa40'
              colorTo='#9c40ff'
              delay={0}
            />
            <AnimatedTestimonialsDemo />
          </div>
        </section>

        <section className='mx-auto max-w-7xl px-6 py-16 flex flex-col items-center justify-center gap-5'>
          <div>
            <Badge
              variant='outline'
              className='text-lg py-2 px-4 flex items-center gap-2 rounded-full'
            >
              <Sparkles className='w-[32px] h-[32px]' />
              <span className='text-foreground'>Enhanced Features</span>
            </Badge>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h3 className='text-4xl font-bold text-center max-w-4xl mx-auto'>
              Lancer is an Upwork AI Agent that finds the perfect jobs for you
              and applies to them automatically
            </h3>
            <div className='mt-10'>Features section coming soon</div>
          </div>
        </section>

        <section className='mx-auto max-w-7xl px-6 py-16'>
          <FaqSection
            title='Frequently Asked Questions'
            description='Everything you need to know about Lancer and Upwork automation'
            items={faqData}
          />
        </section>
      </main>
    </>
  );
}

const menuItems = [
  { name: 'Features', href: '#link' },
  { name: 'Solution', href: '#link' },
  { name: 'Pricing', href: '#link' },
];

const HeroHeader = ({ isOverDarkSection }: { isOverDarkSection: boolean }) => {
  const [menuState, setMenuState] = React.useState(false);
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
      <nav
        data-state={menuState && 'active'}
        className='fixed z-20 w-full px-2 group'
      >
        <div
          className={cn(
            'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
            isScrolled &&
              'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
          )}
        >
          <div className='relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4'>
            <div className='flex w-full justify-between lg:w-auto'>
              <Link
                href='/'
                aria-label='home'
                className='flex items-center space-x-2'
              >
                <LogoIcon />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className='relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden'
              >
                <Menu className='in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200' />
                <X className='group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200' />
              </button>
            </div>

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

            <div className='bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent'>
              <div className='lg:hidden'>
                <ul className='space-y-6 text-base'>
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className='text-muted-foreground hover:text-accent-foreground block duration-150'
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit'>
                <Button
                  asChild
                  size='sm'
                  className={cn(isScrolled && 'lg:hidden')}
                >
                  <Link href='#'>
                    <span>Get Started</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size='sm'
                  className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}
                >
                  <Link href='#'>
                    <span>Get Started</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

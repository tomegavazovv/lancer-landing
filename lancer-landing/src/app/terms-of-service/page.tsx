import { Footer } from '@/components/blocks/footer';
import { HeroHeader } from '@/components/blocks/hero-header';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { AlertTriangle, Mail } from 'lucide-react';
import { Metadata } from 'next';

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

export default function TermsOfService() {
  return (
    <>
      <HeroHeader />
      <main className='overflow-hidden'>
        <div
          aria-hidden
          className='z-0 absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block'
        >
          <div className='w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]' />
          <div className='h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]' />
          <div className='h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]' />
        </div>

        <section className='relative pt-8 md:pt-36'>
          <div
            aria-hidden
            className='absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]'
          />

          <div className='mx-auto max-w-4xl px-6'>
            <AnimatedGroup variants={transitionVariants}>
              <div className='text-center mb-16'>
                <h1 className='text-5xl md:text-6xl font-bold text-balance mb-6'>
                  Terms of Service
                </h1>

                <p className='text-xl text-muted-foreground mb-2'>
                  Last updated: 22 May 2025
                </p>

                <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                  These Terms of Service govern your use of Lancer and outline
                  our mutual responsibilities.
                </p>
              </div>
            </AnimatedGroup>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className='prose prose-lg max-w-none dark:prose-invert'
            >
              <div className='bg-card border rounded-2xl p-8 mb-8'>
                <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                  Welcome to Lancer! These Terms of Service ("Terms") are a
                  binding agreement between you ("User", "you") and Lancer
                  ("we", "us", "our") regarding your access to and use of the
                  Lancer platform, website (https://lancer.app), and related
                  services (the "Service").
                </p>
                <p className='text-base leading-relaxed text-muted-foreground mt-4 mb-0'>
                  By accessing or using the Service, you agree to these Terms.
                  If you do not agree, do not use Lancer.
                </p>
              </div>

              <div className='space-y-12 mb-10'>
                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    1. What Lancer Does
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      Lancer is an AI-powered sales agent that helps freelancers
                      and agencies grow their business on freelance platforms
                      like Upwork. Users create campaigns with filters. For each
                      job match, Lancer uses AI to:
                    </p>
                    <ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
                      <li>
                        Score job suitability based on your knowledge base
                      </li>
                      <li>
                        Generate and optionally send proposals automatically on
                        your behalf
                      </li>
                    </ul>
                    <p className='text-base leading-relaxed text-muted-foreground mt-4 mb-0'>
                      We streamline this entire process, and aim to help you
                      close more clients — faster.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    2. Your Upwork Account and Our Role
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      You may choose to connect your Upwork account to Lancer.
                      We access your Upwork account by adding one of our Upwork
                      profiles as an agency manager, which allows us to submit
                      proposals on your behalf without compromising your
                      personal login.
                    </p>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      You retain full control and ownership of your Upwork
                      account. You can remove Lancer's access at any time.
                    </p>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      Lancer only automates actions that could otherwise be done
                      manually by a human acting as your agency manager.
                    </p>
                  </div>
                </section>

                <section>
                  <div className='bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6'>
                    <div className='flex items-start gap-3'>
                      <AlertTriangle className='w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5' />
                      <div>
                        <h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
                          Disclaimer
                        </h3>
                        <p className='text-base leading-relaxed text-yellow-800 dark:text-yellow-200 mb-0'>
                          Lancer is not affiliated with or endorsed by Upwork.
                          By using our service, you acknowledge that using
                          automation tools carries a risk of violating Upwork's
                          Terms of Service. If your account is suspended,
                          restricted, or banned from Upwork (or any third-party
                          platform), Lancer assumes no responsibility. You use
                          our service at your own discretion.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    3. Eligibility
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      You must be at least 18 years old to use Lancer. By using
                      the Service, you confirm that you meet this requirement
                      and that you're using it for business purposes.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    4. Fees and Subscriptions
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      Lancer operates on a subscription model with additional
                      usage-based pricing. You'll be charged:
                    </p>
                    <ul className='list-disc pl-6 space-y-2 text-muted-foreground mb-4'>
                      <li>A monthly subscription fee (varies by tier)</li>
                      <li>
                        Overage charges for leads analyzed beyond your plan's
                        allowance
                      </li>
                    </ul>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      You'll always see your current usage and charges in your
                      dashboard.
                    </p>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      All payments are handled via Stripe. You agree to keep a
                      valid payment method on file.
                    </p>
                    <p className='text-base leading-relaxed text-muted-foreground font-semibold mb-0'>
                      All fees are non-refundable.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    5. Cancellation
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      You may cancel your subscription at any time. Your access
                      continues until the end of the current billing cycle.
                      After that, your automation will be paused and you'll lose
                      access to paid features.
                    </p>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      We reserve the right to suspend or terminate accounts that
                      violate these Terms or misuse the platform.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    6. User Content
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      Any data you input — your knowledge base, campaign rules,
                      lead preferences — remains yours. We don't claim
                      ownership.
                    </p>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      However, by using Lancer, you grant us permission to
                      process and use that data to deliver the Service (i.e.,
                      generate proposals, assess job suitability, etc.).
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    7. Acceptable Use
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      You agree not to:
                    </p>
                    <ul className='list-disc pl-6 space-y-2 text-muted-foreground mb-4'>
                      <li>Use Lancer for illegal purposes</li>
                      <li>
                        Abuse third-party platforms (like Upwork) using our
                        Service
                      </li>
                      <li>
                        Interfere with or disrupt our systems or other users
                      </li>
                      <li>
                        Attempt to reverse-engineer or copy our proprietary
                        systems
                      </li>
                    </ul>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      We reserve the right to suspend accounts that violate our
                      guidelines.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    8. Intellectual Property
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      All intellectual property in Lancer — including the
                      platform, code, brand, and content — belongs to us. You
                      may not copy, modify, or reuse any part without our
                      written permission.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    9. Limitation of Liability
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      To the fullest extent allowed by law, Lancer is provided
                      "as is". We do not guarantee results or outcomes from
                      using our product. We're not liable for lost revenue,
                      account bans, missed opportunities, or any indirect
                      damages related to your use of the Service.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    10. Changes to These Terms
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      We may update these Terms from time to time. If we do,
                      we'll notify you via the app or email. Continued use after
                      changes means you agree to the new Terms.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    11. Governing Law
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      These Terms are governed by the laws of Estonia.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    12. Contact Us
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      Have questions? Reach out at:
                    </p>
                    <div className='flex items-center gap-2 text-primary'>
                      <Mail className='w-4 h-4' />
                      <a
                        href='mailto:support@lancer.app'
                        className='hover:underline'
                      >
                        support@lancer.app
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </AnimatedGroup>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export const metadata: Metadata = {
  title: 'Terms of Service | Lancer',
  description: 'Terms of Service for Lancer',
};

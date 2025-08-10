import { Footer } from '@/components/blocks/footer';
import { HeroHeader } from '@/components/blocks/hero-header';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { Mail } from 'lucide-react';
import { Metadata } from 'next';
import { Suspense } from 'react';

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

export default function PrivacyPolicy() {
  return (
    <>
      <Suspense fallback={<div></div>}>
        <HeroHeader />
      </Suspense>
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
                  Privacy Policy
                </h1>

                <p className='text-xl text-muted-foreground mb-2'>
                  Last updated: 22 May 2025
                </p>

                <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                  This Privacy Policy explains how we collect, use, share, and
                  protect your personal data when you use Lancer.
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
                  Welcome to Lancer. This Privacy Policy explains how we
                  collect, use, share, and protect your personal data when you
                  use our platform, located at https://lancer.app.
                </p>
                <p className='text-base leading-relaxed text-muted-foreground mt-4 mb-0'>
                  By using our services, you agree to the terms in this Privacy
                  Policy. If you do not agree, please do not use the platform.
                </p>
              </div>

              <div className='space-y-12 mb-10'>
                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    1. Introduction
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      Welcome to Lancer. This Privacy Policy explains how we
                      collect, use, share, and protect your personal data when
                      you use our platform, located at https://lancer.app.
                    </p>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      By using our services, you agree to the terms in this
                      Privacy Policy. If you do not agree, please do not use the
                      platform.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    2. Information We Collect
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      We may collect the following types of information:
                    </p>
                    <ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
                      <li>
                        <strong>Account Information:</strong> Name, email
                        address, password, billing details.
                      </li>
                      <li>
                        <strong>Profile & Campaign Data:</strong> Upwork profile
                        URL, knowledge base content, campaign rules and
                        configurations.
                      </li>
                      <li>
                        <strong>Usage Data:</strong> Actions taken within the
                        app (e.g. rule edits, test runs, proposal submissions).
                      </li>
                      <li>
                        <strong>Technical Data:</strong> Browser type, IP
                        address, operating system, and device identifiers.
                      </li>
                      <li>
                        <strong>Marketing Data:</strong> Email preferences,
                        onboarding interactions, campaign responses.
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    3. How We Use Your Data
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      We use your data to:
                    </p>
                    <ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
                      <li>Deliver and operate our core services</li>
                      <li>Create and manage your campaigns</li>
                      <li>Automate job scoring and proposal generation</li>
                      <li>
                        Send emails related to onboarding, product updates, and
                        support
                      </li>
                      <li>
                        Improve our product through analytics and feedback
                      </li>
                      <li>Comply with legal and regulatory requirements</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    4. Use of Upwork Account Information
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      If you connect your Upwork account, we access it only via
                      agency manager roles. We never ask for your password and
                      we don't act outside of the permission you grant.
                    </p>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      You are responsible for the relationship with Upwork.
                      Lancer is not affiliated with or endorsed by Upwork. If
                      your account is restricted or banned, Lancer is not liable
                      for that action.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    5. Sharing Your Information
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      We may share data with third parties that help us operate
                      our service, such as:
                    </p>
                    <ul className='list-disc pl-6 space-y-2 text-muted-foreground mb-4'>
                      <li>Payment processors (e.g. Stripe)</li>
                      <li>Analytics providers</li>
                      <li>Email marketing tools</li>
                      <li>Customer support tools</li>
                    </ul>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      We do not sell or rent your data.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    6. Subprocessors
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      We rely on third-party service providers ("subprocessors")
                      to deliver some features of Lancer. These subprocessors
                      may process personal data on our behalf:
                    </p>
                    <ul className='list-disc pl-6 space-y-2 text-muted-foreground mb-4'>
                      <li>
                        <strong>Mixpanel</strong> - Product usage analytics
                      </li>
                      <li>
                        <strong>Hotjar</strong> - UX behavior analytics
                      </li>
                      <li>
                        <strong>Google Analytics</strong> - Website traffic
                        tracking
                      </li>
                      <li>
                        <strong>MailerLite</strong> - Email marketing /
                        onboarding
                      </li>
                      <li>
                        <strong>Stripe</strong> - Subscription billing and
                        invoicing
                      </li>
                      <li>
                        <strong>OpenRouter</strong> - AI provider routing and
                        fallback API
                      </li>
                    </ul>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      All subprocessors are contractually bound to keep data
                      secure and confidential and are required to comply with
                      applicable data protection laws.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    7. Your Rights
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      Depending on your location, you may have the right to:
                    </p>
                    <ul className='list-disc pl-6 space-y-2 text-muted-foreground mb-4'>
                      <li>Access or correct your personal data</li>
                      <li>Delete your personal data</li>
                      <li>Object to or restrict how we use your data</li>
                      <li>Request a copy of your data in a portable format</li>
                    </ul>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      To exercise these rights, contact us at{' '}
                      <a
                        href='mailto:support@lancer.app'
                        className='text-primary hover:underline'
                      >
                        support@lancer.app
                      </a>
                      .
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    8. Data Retention
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      We retain your data as long as necessary to provide our
                      service. You can request account deletion at any time by
                      emailing us.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    9. Security
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      We use encryption, secure servers, and access controls to
                      protect your data. However, no method of transmission over
                      the Internet is 100% secure.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    10. Cookies
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      We use cookies and similar technologies for functionality
                      and analytics. You can manage cookie preferences through
                      your browser settings.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    11. Children's Privacy
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      Lancer is not intended for use by anyone under 18. We do
                      not knowingly collect data from minors.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    12. Changes to This Policy
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-0'>
                      We may update this Privacy Policy periodically. We'll
                      notify users of significant changes via email or in-app
                      notice.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4 text-foreground'>
                    13. Contact Us
                  </h2>
                  <div className='bg-card border rounded-xl p-6'>
                    <p className='text-base leading-relaxed text-muted-foreground mb-4'>
                      For questions about this policy or your data:
                    </p>
                    <div className='space-y-2'>
                      <p className='text-base leading-relaxed text-muted-foreground mb-2'>
                        <strong>Lancer</strong>
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
  title: 'Privacy Policy | Lancer',
  description: 'Privacy Policy for Lancer',
};

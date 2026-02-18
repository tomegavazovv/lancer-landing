'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Particles } from '@/components/ui/particles';
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  CircleCheck,
  ExternalLink,
  X,
} from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { type: 'spring', bounce: 0.3, duration: 1.5 },
    },
  },
};

const STATS = [
  { value: '$1,037', label: 'Spent on Connects' },
  { value: '87', label: 'Proposals Sent' },
  { value: '4', label: 'Projects Won' },
  { value: '$240K', label: 'LTV Closed' },
];

const DELIVERABLES = [
  {
    number: '01',
    title: 'Onboarding Call',
    desc: 'We identify your niche, your ideal client, and your competitive edge.',
  },
  {
    number: '02',
    title: 'Profile Built to Convert',
    desc: 'Optimized from title to portfolio \u2014 structured the way Upwork\u2019s search works and what converts in under 10 seconds.',
  },
  {
    number: '03',
    title: 'ICP Definition',
    desc: 'We define exactly who to target, what jobs to bid on, and which clients to avoid.',
  },
  {
    number: '04',
    title: 'Campaign Strategy',
    desc: 'Clear rules on: proposals, proposal structure, bidding playbook, and monthly Connects budget \u2014 all mapped to your niche.',
  },
  {
    number: '05',
    title: 'Automated Outbound via Lancer',
    desc: 'Your proposals go out daily, on time, to the right jobs \u2014 without you touching the keys.',
  },
];

const QUALIFIERS = [
  {
    title: 'Already doing $10K+/month outside Upwork',
    desc: 'You have existing revenue and want Upwork to become your next channel, not your only channel.',
  },
  {
    title: 'High-ticket services \u2014 $5K+ LTV per client',
    desc: 'Your math works because each deal is worth real money. Small gigs won\u2019t justify this investment.',
  },
  {
    title: 'Willing to commit 2 hours/week for 90 days',
    desc: 'We do the heavy lifting, but you\u2019ll need to check in regularly and provide input on positioning. This is a partnership.',
  },
  {
    title: 'Ready to invest at least $5,000',
    desc: 'It takes time to experiment with offers and positioning on Upwork, and every proposal costs money to send. You should be ready to invest around $5,000 until we set up a validated, automated acquisition channel.',
  },
];

export function PlaybookDownloadView() {
  const downloadTriggered = useRef(false);
  const [showBanner, setShowBanner] = useState(true);
  const [showQualifyModal, setShowQualifyModal] = useState(false);

  useEffect(() => {
    if (downloadTriggered.current) return;
    downloadTriggered.current = true;

    const timer = setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/playbook/upwork-playbook.pdf';
      link.download = 'The-Top-1-Percent-Upwork-Blueprint.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='min-h-screen'>
      {/* ── Background ── */}
      <div aria-hidden className='pointer-events-none fixed inset-0 z-0'>
        <Image
          src='https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120'
          alt=''
          className='absolute inset-x-0 top-0 hidden dark:block'
          width={3276}
          height={4095}
          priority
        />
        <div className='absolute inset-0 [background:radial-gradient(125%_125%_at_50%_0%,transparent_0%,#0A0A0A_65%)]' />
        <div className='absolute inset-0 opacity-50 hidden lg:block'>
          <div className='w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]' />
          <div className='h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]' />
        </div>
      </div>

      <Particles
        className='fixed inset-0 z-0'
        quantity={80}
        staticity={30}
        ease={50}
        color='white'
      />

      {/* ── Download Banner (toast) ── */}
      {showBanner && (
        <div className='fixed top-4 left-1/2 z-50 -translate-x-1/2'>
          <div className='flex items-center gap-3 rounded-full border border-white/10 bg-[#1a1a1a] px-5 py-2.5 shadow-lg shadow-black/30'>
            <p className='text-sm text-white/70'>
              Your playbook is downloading.{' '}
              <a
                href='/playbook/upwork-playbook.pdf'
                download='The-Top-1-Percent-Upwork-Blueprint.pdf'
                className='font-medium text-white underline underline-offset-2 decoration-white/30 hover:decoration-white/60'
              >
                Download manually
              </a>
            </p>
            <button
              onClick={() => setShowBanner(false)}
              className='ml-1 text-white/30 hover:text-white/60 transition-colors'
            >
              <X className='h-3.5 w-3.5' />
            </button>
          </div>
        </div>
      )}

      {/* ── Headline ── */}
      <section className='relative z-10 pt-28 md:pt-36 pb-10 md:pb-12'>
        <div className='mx-auto max-w-3xl px-6 text-center'>
          <AnimatedGroup variants={transitionVariants}>
            <span
              className='mb-5 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide'
              style={{
                backgroundColor: 'rgba(109, 40, 217, 0.2)',
                color: '#a78bfa',
                border: '1px solid rgba(109, 40, 217, 0.35)',
              }}
            >
              🚀 Upwork Launch
            </span>

            <h1 className='text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl'>
              We turned a brand new Upwork account
              <br className='hidden sm:inline' />
              {' '}into $240K in 4 months.
            </h1>

            <p className='mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50'>
              Now we do it for a select number of agencies every month. If you
              don&apos;t have time to implement the playbook yourself — or you
              want to skip the learning curve entirely — here&apos;s what we built.
            </p>
          </AnimatedGroup>
        </div>
      </section>

      {/* ── Stats (Stepper) ── */}
      <section className='relative z-10 pb-10 md:pb-14'>
        <div className='mx-auto max-w-3xl px-6'>
          <AnimatedGroup variants={transitionVariants}>
            <div className='rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6'>
              <p className='mb-4 text-xs font-medium uppercase tracking-widest text-white/25'>
                Results from an Upwork Launch we ran for an agency client
              </p>

              {/* Desktop stepper (horizontal with arrows) */}
              <div className='hidden md:flex items-center justify-between'>
                {STATS.map((stat, i) => (
                  <React.Fragment key={stat.label}>
                    <div className='flex-1 text-center'>
                      <div className='text-2xl font-bold text-white'>
                        {stat.value}
                      </div>
                      <div className='mt-0.5 text-xs text-white/40'>
                        {stat.label}
                      </div>
                    </div>
                    {i < STATS.length - 1 && (
                      <ChevronRight className='mx-2 h-4 w-4 shrink-0 text-white/15' />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Mobile stepper (vertical with arrows) */}
              <div className='flex flex-col items-center gap-2 md:hidden'>
                {STATS.map((stat, i) => (
                  <React.Fragment key={stat.label}>
                    <div className='flex w-full items-center gap-3 rounded-lg px-3 py-2'>
                      <div className='text-xl font-bold text-white min-w-[70px]'>
                        {stat.value}
                      </div>
                      <div className='text-xs text-white/40'>
                        {stat.label}
                      </div>
                    </div>
                    {i < STATS.length - 1 && (
                      <ChevronRight className='h-3.5 w-3.5 rotate-90 text-white/15' />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className='mt-4 border-t border-white/[0.06] pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2'>
                <p className='text-xs text-white/25'>
                  Brand new account. Zero reviews, zero earnings history.
                </p>
                <a
                  href='https://notion.so'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1 text-xs font-medium transition-colors hover:text-white/60'
                  style={{ color: '#a78bfa' }}
                >
                  Full case study
                  <ExternalLink className='h-3 w-3' />
                </a>
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </section>

      {/* ── What You Get ── */}
      <section className='relative z-10 py-10 md:py-14'>
        <div className='mx-auto max-w-2xl px-6'>
          <AnimatedGroup variants={transitionVariants}>
            <div className='rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8'>
              <div className='mb-1 text-xs font-semibold uppercase tracking-widest text-white/25'>
                What You Get
              </div>
              <h2 className='text-lg font-bold text-white md:text-xl'>
                Everything you need before your first proposal.
              </h2>
              <p className='mt-2 text-sm text-white/40'>
                We handle the setup so you can focus on closing.
              </p>

              <div className='mt-6'>
                {DELIVERABLES.map((d, i) => (
                  <div
                    key={d.title}
                    className='flex gap-4 py-4'
                    style={{
                      borderBottom:
                        i < DELIVERABLES.length - 1
                          ? '1px solid rgba(255,255,255,0.06)'
                          : 'none',
                    }}
                  >
                    <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] text-[10px] font-semibold text-white/30'>
                      {d.number}
                    </div>
                    <div>
                      <h3 className='text-sm font-medium text-white/90'>
                        {d.title}
                      </h3>
                      <p className='mt-0.5 text-xs leading-relaxed text-white/40'>
                        {d.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </section>

      {/* ── Who This Is For ── */}
      <section className='relative z-10 py-10 md:py-14'>
        <div className='mx-auto max-w-2xl px-6'>
          <AnimatedGroup variants={transitionVariants}>
            <div className='rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8'>
              <div className='mb-1 text-xs font-semibold uppercase tracking-widest text-white/25'>
                Who This Is For
              </div>
              <p className='text-sm leading-relaxed text-white/50'>
                We&apos;re selective about who we work with. This works best for
                agencies that fit a specific profile.
              </p>

              <div className='mt-6 space-y-5'>
                {QUALIFIERS.map((q) => (
                  <div key={q.title} className='flex gap-3'>
                    <CircleCheck
                      className='mt-0.5 h-4 w-4 shrink-0'
                      style={{ color: '#a78bfa' }}
                    />
                    <div>
                      <h3 className='text-sm font-medium text-white/90'>
                        {q.title}
                      </h3>
                      <p className='mt-0.5 text-xs leading-relaxed text-white/40'>
                        {q.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className='mt-6 text-xs leading-relaxed text-white/35'>
                If that sounds like you, the next step is a 15-minute call where
                we assess fit and map out what your Upwork channel could look
                like.
              </p>
            </div>
          </AnimatedGroup>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className='relative z-10 py-10 md:py-16'>
        <div className='mx-auto max-w-2xl px-6 text-center'>
          <AnimatedGroup variants={transitionVariants}>
            <h2 className='text-lg font-bold text-white md:text-xl'>
              Ready to add Upwork to your pipeline?
            </h2>
            <p className='mx-auto mt-2 max-w-md text-xs text-white/35'>
              Limited spots per quarter. We only take on agencies we can deliver
              for.
            </p>

            <div className='mt-6'>
              <button
                onClick={() => setShowQualifyModal(true)}
                className='group inline-flex h-11 items-center gap-2 rounded-xl px-7 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]'
                style={{
                  background:
                    'linear-gradient(135deg, rgba(109,40,217,0.9) 0%, rgba(139,92,246,0.9) 100%)',
                  boxShadow:
                    '0 0 0 1px rgba(139,92,246,0.3), 0 4px 20px rgba(109,40,217,0.25)',
                }}
              >
                Book a Call
                <ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
              </button>
            </div>

            <div className='mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-white/20'>
              <span>200K+ proposals analyzed</span>
              <span className='text-white/10'>&middot;</span>
              <span>150+ freelancers &amp; agencies</span>
              <span className='hidden sm:inline text-white/10'>&middot;</span>
              <span className='hidden sm:inline'>Agencies scaled past $1M</span>
            </div>
          </AnimatedGroup>
        </div>
      </section>

      {/* Back link */}
      <section className='relative z-10 pb-16'>
        <div className='text-center'>
          <a
            href='https://lancer.app'
            className='text-xs text-white/25 underline underline-offset-4 decoration-white/10 transition-colors hover:text-white/40'
          >
            Back to lancer.app
          </a>
        </div>
      </section>

      {/* ── Qualification Modal ── */}
      <Dialog open={showQualifyModal} onOpenChange={setShowQualifyModal}>
        <DialogContent className='sm:max-w-[460px] border-white/10 bg-[#111] p-0 gap-0'>
          <DialogHeader className='px-6 pt-6 pb-0'>
            <DialogTitle className='text-lg font-semibold text-white'>
              Is this a good fit?
            </DialogTitle>
            <p className='text-sm text-white/40 mt-1'>
              Upwork Launch works best for agencies that match this profile.
            </p>
          </DialogHeader>

          <div className='px-6 pt-5 pb-6'>
            <div className='space-y-4'>
              {QUALIFIERS.map((q) => (
                <div key={q.title} className='flex gap-3'>
                  <CircleCheck
                    className='mt-0.5 h-4 w-4 shrink-0'
                    style={{ color: '#a78bfa' }}
                  />
                  <div>
                    <h3 className='text-sm font-medium text-white/90'>
                      {q.title}
                    </h3>
                    <p className='mt-0.5 text-xs leading-relaxed text-white/40'>
                      {q.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-6 space-y-3'>
              <button
                onClick={() => {
                  setShowQualifyModal(false);
                  window.open(
                    'https://calendly.com/ivan-mvp/lancer-1-1-demo-call',
                    '_blank'
                  );
                }}
                className='group flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.01] active:scale-[0.99]'
                style={{
                  background:
                    'linear-gradient(135deg, rgba(109,40,217,0.9) 0%, rgba(139,92,246,0.9) 100%)',
                  boxShadow:
                    '0 0 0 1px rgba(139,92,246,0.3), 0 4px 20px rgba(109,40,217,0.25)',
                }}
              >
                Yes, book my call
                <ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
              </button>

              <button
                onClick={() => setShowQualifyModal(false)}
                className='flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium text-white/50 transition-colors hover:text-white/70'
              >
                <BookOpen className='h-3.5 w-3.5' />
                Actually, I&apos;ll just read the playbook
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

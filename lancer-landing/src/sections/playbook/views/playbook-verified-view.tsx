'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { ArrowRight, Target } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

export function PlaybookVerifiedView() {
  const router = useRouter();

  return (
    <div className='min-h-screen'>
      {/* Atmospheric gradient backdrop */}
      <div
        aria-hidden
        className='pointer-events-none fixed inset-0 z-0 overflow-hidden'
      >
        <div className='absolute -top-[40%] left-1/2 h-[80rem] w-[80rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,hsla(220,60%,50%,.06)_0%,transparent_70%)]' />
        <div className='absolute top-[20%] -right-[20%] h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(ellipse_at_center,hsla(160,50%,40%,.04)_0%,transparent_60%)]' />
      </div>

      {/* ─────────────────────────────────────────────── */}
      {/* Hero — Two Column */}
      {/* ─────────────────────────────────────────────── */}
      <section className='relative z-10 pt-28 md:pt-44 pb-20 md:pb-28'>
        <div className='mx-auto max-w-6xl px-6'>
          <div className='grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20'>
            {/* Left — Text + CTA */}
            <AnimatedGroup variants={transitionVariants}>
              <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[13px] tracking-wide text-white/60'>
                <Target className='h-3.5 w-3.5' />
                For agencies looking to make $10K+ on Upwork
              </div>

              <h1 className='text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl'>
                The Top 1%
                <br />
                <span className='bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent'>
                  Upwork Blueprint
                </span>
              </h1>

              <p className='mt-5 max-w-md text-base leading-relaxed text-white/50 md:text-lg'>
                The system behind agencies closing $10K&ndash;$100K+ contracts on
                Upwork. From positioning to proposals to predictable pipeline.
              </p>

              <div className='mt-8'>
                <button
                  onClick={() =>
                    router.push('/playbook-download?source=verified')
                  }
                  className='group relative inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-white px-8 text-[15px] font-semibold text-[#0A0A0A] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_2px_20px_rgba(255,255,255,0.08)] transition-all hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_4px_30px_rgba(255,255,255,0.12)] hover:scale-[1.01] active:scale-[0.99]'
                >
                  Download Free Playbook
                  <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
                </button>
                <p className='mt-3 text-xs text-white/30'>
                  Instant download &middot; No email required &middot; PDF format
                </p>
              </div>

              <div className='mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-white/30'>
                <span>200K+ proposals analyzed</span>
                <span className='text-white/15'>&middot;</span>
                <span>150+ freelancers &amp; agencies</span>
                <span className='hidden sm:inline text-white/15'>&middot;</span>
                <span className='hidden sm:inline'>Agencies scaled past $1M</span>
              </div>
            </AnimatedGroup>

            {/* Right — Cover Image */}
            <AnimatedGroup variants={transitionVariants}>
              <div className='relative mx-auto max-w-sm md:max-w-none'>
                {/* Glow behind the cover */}
                <div
                  aria-hidden
                  className='absolute -inset-8 rounded-3xl bg-[radial-gradient(ellipse_at_center,hsla(220,50%,50%,.08)_0%,transparent_70%)] blur-2xl'
                />
                <div className='relative overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/40'>
                  <Image
                    src='/playbook/lancer-playbook-cover.jpg'
                    alt='The Top 1% Upwork Blueprint — Free Playbook by Lancer'
                    width={560}
                    height={720}
                    priority
                    className='h-auto w-full object-cover'
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </div>
      </section>

    </div>
  );
}

'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { FaqSection } from './faq';

const faqData = [
  {
    question: 'Is Upwork automation allowed?',
    answer:
      "Upwork prohibits spammy bots that mass-apply to jobs. Lancer is built to stay within Upwork's terms by sending tailored, high-quality proposals based on your profile, skills, and preferences - just like a human would.",
  },
  {
    question: 'How can I be sure that Lancer is safe to use?',
    answer:
      "Lancer's automation is completely indistinguishable from a real user - from browsing patterns to proposal timing and personalization. We've served 100+ freelancers with zero account issues or flags. Our system is built from the ground up to respect Upwork's terms, using natural human-like behavior and strict quality controls. You're in good hands.",
  },
  {
    question: 'Does using Lancer improve my chances of getting jobs on Upwork?',
    answer:
      'Yes - response speed and relevance are key factors on Upwork. Lancer applies faster than a human, with personalized proposals that align with job requirements. That gives you a competitive edge without sacrificing quality.',
  },
  {
    question: 'How does Lancer choose which jobs to apply to?',
    answer:
      "Lancer uses advanced filters that can evaluate jobs based on 99+ variables - everything from budget and client history to job description quality and requirements match. But we don't stop there. Our AI then reviews each job that passes the filters, just like a human would, to catch those edge cases that technically meet the criteria but are clearly not a good fit. This two-layer approach ensures you only apply to jobs worth your time.",
  },
  {
    question: "Can I still review proposals before they're sent?",
    answer:
      "Yes. You're always in control. You can play around with Lancer's outputs until you are satisfied. However, once you are confident in it's performance we recommend letting Lancer do it's thing on auto-pilot.",
  },
  {
    question: 'What types of freelancers benefit most from Lancer?',
    answer:
      'Lancer is best suited for: Solo freelancers who want to save time and focus on client work, Agencies who need to scale outreach across multiple accounts, Anyone tired of writing repetitive proposals but still wants to win top jobs.',
  },
];

export function FaqWrapper() {
  return (
    <div className='relative mx-auto max-w-7xl px-6 pb-10'>
      {/* Gradient transition from testimonials to FAQ */}
      <div
        className='absolute inset-0 -z-10'
        style={{
          background: 'transparent',
        }}
      />
      <AnimatedGroup preset='blur-slide' threshold={0.2} rootMargin='-50px'>
        <FaqSection
          title='Frequently Asked Questions'
          description='Everything you need to know about Lancer and Upwork automation'
          items={faqData}
        />
      </AnimatedGroup>
    </div>
  );
}

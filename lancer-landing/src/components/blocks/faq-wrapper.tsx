'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { FaqSection } from './faq';

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

export function FaqWrapper() {
  return (
    <div className='relative mx-auto max-w-7xl px-6 mb-10'>
      {/* Gradient transition from testimonials to FAQ */}
      <div
        className='absolute inset-0 -z-10'
        style={{
          background: `
            linear-gradient(to bottom, 
              transparent 0%, 
              rgba(255, 255, 255, 0.1) 20%, 
              rgba(255, 255, 255, 0.3) 40%, 
              rgba(255, 255, 255, 0.8) 60%, 
              rgba(255, 255, 255, 1) 80%
            )
          `,
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


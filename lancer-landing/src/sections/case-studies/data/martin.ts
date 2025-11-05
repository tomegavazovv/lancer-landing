import { DollarSign, Mail, Reply } from 'lucide-react';
import { CaseStudyData } from '../types';

export const martinCaseStudyData: CaseStudyData = {
  hero: {
    title: '$24K/month Upwork Funnel | iOS & MVP Developer',
    description: [
      'Martin is an ex-Facebook engineer, and the owner of Wolfware Labs, an iOS development boutique shop and an Upwork Veteran.',
      'However in the past few years he has used the platform periodically without any system. That led to underwhelming results, so he paused his efforts completely for an year.',
      'Back in April he decided to give Upwork another shot and he reached out. As a result we converted Upwork into their best performing funnel. Since then lancer.app has been actively bidding for them and winning them jobs.',
    ],
  },
  stats: {
    title: "📈 Martin's Upwork Funnel Stats",
    cards: [
      {
        label: 'Open Rate',
        value: '33.3%',
        icon: Mail,
        iconColor: '#60a5fa',
        iconBgColor: 'rgba(59, 130, 246, 0.2)',
        barColor: '#3b82f6',
      },
      {
        label: 'Reply Rate',
        value: '11.1%',
        icon: Reply,
        iconColor: '#4ade80',
        iconBgColor: 'rgba(34, 197, 94, 0.2)',
        barColor: '#22c55e',
      },
    ],
    fullWidthCard: {
      label: 'Monthly Funnel Value',
      value: '$24K/m',
      icon: DollarSign,
      iconColor: '#fb923c',
      iconBgColor: 'rgba(251, 146, 60, 0.2)',
      barColor: '#fb923c',
    },
  },
  content: [
    {
      type: 'heading',
      heading: 'Martin Testimonial Video',
      level: 2,
    },
    {
      type: 'video',
      videoUrl: 'https://www.youtube.com/embed/FfMXB4RB_Dc?si=a2gBT6Z2I_ILVuS3',
    },
    {
      type: 'testimonial',
      testimonial: {
        quote:
          "We started using Lancer a month ago and so far it has been incredible. We've gotten a ton of responses from clients saying how the approach (cover letter) was really genuine and we really put in effort into our proposals. However Lancer has been writing all of those proposals.\n\nWe were able to get a new client in the first two weeks, which was amazing, did not expect something like this from a new tool on the market.\n\nThe tool was easy to setup and the team was great to work with",
        author: 'Martin P.',
        authorRole: 'CEO - Wolfware Labs',
      },
    },
    {
      type: 'paragraph',
      content: 'We love you too Martin ❤️',
    },
  ],
  meta: {
    publishedDate: 'Sep 7, 2025',
  },
};

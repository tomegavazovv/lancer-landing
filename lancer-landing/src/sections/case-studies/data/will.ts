import { Mail, Reply } from 'lucide-react';
import { CaseStudyData } from '../types';

export const willCaseStudyData: CaseStudyData = {
  hero: {
    title: '26% Reply Rate Upwork Funnel | PPC Expert | Meta & Google Ads',
    description: [
      'Will was already killing it before he automated his outreach with our AI Agent - lancer.app.',
      'However he was able to take to the next level by just applying his tested cover letter and approach and just automating it and scaling it in a way only a well trainer AI Agent cant.',
      'The conversion numbers and results speak for them selves.',
    ],
  },
  stats: {
    title: "📈 Will's Upwork Funnel Stats",
    cards: [
      {
        label: 'Open Rate',
        value: '46.4%',
        icon: Mail,
        iconColor: '#60a5fa',
        iconBgColor: 'rgba(59, 130, 246, 0.2)',
        barColor: '#3b82f6',
      },
      {
        label: 'Reply Rate',
        value: '26%',
        icon: Reply,
        iconColor: '#4ade80',
        iconBgColor: 'rgba(34, 197, 94, 0.2)',
        barColor: '#22c55e',
      },
    ],
  },
  content: [
    {
      type: 'image',
      image: {
        src: 'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/case-studies%2Fwill%201.png?alt=media&token=f002dde8-1b1c-4b1a-9d97-1151bbb9d262',
        alt: 'Will results',
        width: 1000,
        height: 1000,
      },
    },
    {
      type: 'paragraph',
      content: 'Respect, Will 🫡',
    },
  ],
  meta: {
    publishedDate: 'Sep 7, 2025',
  },
};

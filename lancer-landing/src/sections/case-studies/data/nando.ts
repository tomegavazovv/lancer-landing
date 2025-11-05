import { DollarSign, Mail, Reply } from 'lucide-react';
import { CaseStudyData } from '../types';

export const nandoCaseStudyData: CaseStudyData = {
  hero: {
    title: '$40K/month Upwork Funnel | AI Agents & Automation',
    description: [
      'Nando started on Upwork only in 2025, and yet he quickly found success manually bidding on jobs.',
      'However as his business grew, he did not have the time to continue his manual outreach strategy.',
      "That's when he contacted me and we setup an automated funnel that scaled his Upwork outreach while maintaining his conversion stats. This has allowed him to focus on delivery, growing his team and enjoying more free time.",
    ],
  },
  stats: {
    title: "📈 Nando's Upwork Funnel Stats",
    cards: [
      {
        label: 'Open Rate',
        value: '34%',
        icon: Mail,
        iconColor: '#60a5fa',
        iconBgColor: 'rgba(59, 130, 246, 0.2)',
        barColor: '#3b82f6',
      },
      {
        label: 'Reply Rate',
        value: '15%',
        icon: Reply,
        iconColor: '#4ade80',
        iconBgColor: 'rgba(34, 197, 94, 0.2)',
        barColor: '#22c55e',
      },
    ],
    fullWidthCard: {
      label: 'Proposals/Month',
      value: '400/m',
      icon: DollarSign,
      iconColor: '#fb923c',
      iconBgColor: 'rgba(251, 146, 60, 0.2)',
      barColor: '#fb923c',
    },
  },
  content: [
    {
      type: 'heading',
      heading: '⚙️ Fully Automated',
      level: 2,
    },
    {
      type: 'paragraph',
      content:
        'As an owner of a fast growing agency - Nando was juggling the a ton responsibilities such as delivery for clients, finances, managing & growing his team along with managing his Upwork outreach.',
    },
    {
      type: 'paragraph',
      content:
        'After we set him up with our funnel system he got back up to 10 hours a week.',
    },
    {
      type: 'heading',
      heading: 'Results',
      level: 2,
    },
    {
      type: 'paragraph',
      content: '53 qualified leads each month',
    },
    {
      type: 'image',
      image: {
        src: 'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/case-studies%2Fnando%201.png?alt=media&token=a11bf5cf-b3b7-421c-a49e-1643e84c0c82',
        alt: 'Nando results',
        width: 1000,
        height: 1000,
      },
    },
    {
      type: 'paragraph',
      content: 'First client after 2 weeks -> $20K contract value',
    },
    {
      type: 'image',
      image: {
        src: 'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/case-studies%2Fnando%202.png?alt=media&token=6a147ba4-afe2-4a3f-9523-59d99768d3d2',
        alt: 'Nando final results',
        width: 1000,
        height: 1000,
      },
    },
  ],
  meta: {
    publishedDate: 'Sep 7, 2025',
  },
};

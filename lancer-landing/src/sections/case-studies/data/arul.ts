import { CheckCircle2, DollarSign, Mail, Reply } from 'lucide-react';
import { CaseStudyData } from '../types';

export const arulCaseStudyData: CaseStudyData = {
  hero: {
    title: '6 Clients in First Month | Migrated from Competitor Tool',
    description: [
      'Arul has been on Upwork for a long time, starting as a solo freelancer and then growing his business to managing a full team.',
      "He's tried every approach when it comes to Upwork Outreach, and they've all failed him - up until lancer.app.",
      'When we connected Arul had just subscribed to a different tool which he was not happy with. 2 weeks into the 3 month plan he migrated to Lancer on a free trial.',
      '2 weeks later he had 2 clients, by the end of the month he had closed 6 clients.',
    ],
  },
  stats: {
    title: "📈 Arul's Upwork Funnel Stats",
    cards: [
      {
        label: 'Open Rate',
        value: '24.5%',
        icon: Mail,
        iconColor: '#60a5fa',
        iconBgColor: 'rgba(59, 130, 246, 0.2)',
        barColor: '#3b82f6',
      },
      {
        label: 'Reply Rate',
        value: '13.2%',
        icon: Reply,
        iconColor: '#4ade80',
        iconBgColor: 'rgba(34, 197, 94, 0.2)',
        barColor: '#22c55e',
      },
      {
        label: 'Contracts/Month',
        value: '6',
        icon: CheckCircle2,
        iconColor: '#a78bfa',
        iconBgColor: 'rgba(167, 139, 250, 0.2)',
        barColor: '#a78bfa',
      },
    ],
    fullWidthCard: {
      label: 'Replies Per Week',
      value: '7-14',
      icon: DollarSign,
      iconColor: '#fb923c',
      iconBgColor: 'rgba(251, 146, 60, 0.2)',
      barColor: '#fb923c',
    },
  },
  content: [
    {
      type: 'heading',
      heading: 'Migrating From A Different Tool',
      level: 2,
    },
    {
      type: 'paragraph',
      content:
        'When we first started talking Arul had committed to a 3 month plan with a different tool which 2 weeks in was failing him.',
    },
    {
      type: 'paragraph',
      content:
        'Spending connects bidding on the wrong jobs, missing the correct high quality jobs, etc.',
    },
    {
      type: 'image',
      image: {
        src: 'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/case-studies%2Farul%201.png?alt=media&token=0542fc20-a87d-4754-a035-b9f3aaa45723',
        alt: 'Arul results',
        width: 1000,
        height: 1000,
      },
    },
    {
      type: 'paragraph',
      content:
        'So we arranged a 2-week free trial for him to see the difference. These were the results 👇',
    },
    {
      type: 'image',
      image: {
        src: 'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/case-studies%2Farul%202.png?alt=media&token=c4e6c638-1ac6-4d55-a26a-aabe0a68eed5',
        alt: 'Arul results',
        width: 1000,
        height: 1000,
      },
    },

    {
      type: 'image',
      image: {
        src: 'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/case-studies%2Farul%203.png?alt=media&token=95991f1f-0c95-47d3-a9c9-e3842657603e',
        alt: 'Arul results',
        width: 1000,
        height: 1000,
      },
    },
    {
      type: 'paragraph',
      content:
        'So unfortunately he is now paying for two tools in parallel but only using one 😅',
    },
    {
      type: 'paragraph',
      content: "We gave him a good deal though, don't worry.",
    },
  ],
  meta: {
    publishedDate: 'Sep 7, 2025',
  },
};

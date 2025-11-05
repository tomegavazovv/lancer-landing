import { CheckCircle2, DollarSign, Mail, Reply } from 'lucide-react';
import { CaseStudyData } from '../types';

export const nikolaCaseStudyData: CaseStudyData = {
  hero: {
    title: 'Webflow Expert: 7 Deals/Month with $35K Monthly Contract Value',
    description: [
      'Nikola is a Webflow Expert, he has been on Upwork since 2019 and up until we setup his funnel he used to bid on jobs periodically and in between projects.',
      'That changed when we setup his Upwork Funnel back in April 2025, since then he his exposure on Upwork exploded. He now averages 7 contracts a month through Upwork using our systems and tools - generating around $35K in contract value each month.',
    ],
  },
  stats: {
    title: 'Results 🚀🚀🚀',
    cards: [
      {
        label: 'Open Rate',
        value: '38%',
        icon: Mail,
        iconColor: '#60a5fa',
        iconBgColor: 'rgba(59, 130, 246, 0.2)',
        barColor: '#3b82f6',
      },
      {
        label: 'Reply Rate',
        value: '23%',
        icon: Reply,
        iconColor: '#4ade80',
        iconBgColor: 'rgba(34, 197, 94, 0.2)',
        barColor: '#22c55e',
      },
      {
        label: 'Deals/Month',
        value: '7',
        icon: CheckCircle2,
        iconColor: '#a78bfa',
        iconBgColor: 'rgba(167, 139, 250, 0.2)',
        barColor: '#a78bfa',
      },
    ],
    fullWidthCard: {
      label: 'Contract Value/Month',
      value: '$30K',
      icon: DollarSign,
      iconColor: '#fb923c',
      iconBgColor: 'rgba(251, 146, 60, 0.2)',
      barColor: '#fb923c',
    },
  },
  content: [
    {
      type: 'heading',
      heading: 'Day 1 Using Lancer:',
      level: 2,
    },
    {
      type: 'image',
      image: {
        src: 'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/case-studies%2Fnikola%201.png?alt=media&token=13ca54ad-30a4-48b3-b8d0-7b2464c4e2b4',
        alt: 'Nikola Day 1',
        width: 1000,
        height: 1000,
      },
    },
    {
      type: 'paragraph',
      content:
        'Translation: "I just started the campaign; Just to let you know while I was playing around with the setup these past few days I saw a job that Lancer had qualified and manually sent the proposal it recommended, and today I closed them as a client!"',
    },
    {
      type: 'paragraph',
      content: '...and then again later the same day',
    },
    {
      type: 'image',
      image: {
        src: 'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/case-studies%2Fnikola%202.png?alt=media&token=94a6d9d4-b8d3-42ab-a059-75deb1bd5083',
        alt: 'Nikola day1',
        width: 1000,
        height: 1000,
      },
    },
    {
      type: 'paragraph',
      content:
        'Translation:\n                Nikola: We can start a #wins channel (for the Discord\n                Beta Server), Lancer is killing it.\n                Me: is this the first\n                client or a second one?\n                Nikola: Second today.',
    },
    {
      type: 'heading',
      heading: 'Results after using 1 week of using Lancer:',
      level: 2,
    },
    {
      type: 'paragraph',
      content: "Nikola's stats after his first week of using Lancer 👇",
    },
    {
      type: 'image',
      image: {
        src: 'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/case-studies%2Fnikola%203.png?alt=media&token=980dc1c9-0abe-49b1-8147-85e1e5acb857',
        alt: 'Nikola week 1',
        width: 1000,
        height: 1000,
        inContainer: true,
      },
    },
    {
      type: 'paragraph',
      content:
        'Lets break it down: 18 proposals (cost per proposal: $4), 4 replies, 2 deals won.',
    },
    {
      type: 'list',
      listItems: [
        'Cost per lead: $18',
        'Cost per deal won: $36',
        'Average deal size: $3,500',
      ],
    },
    {
      type: 'paragraph',
      content:
        "Calculated ROCS (Return on Connects Spent) - 97X ! ! !\n                This wasn't an outlier, since then Nikola has been getting on average 5 replies a week on autopilot and closing 2 clients every week through Lancer with just 20ish proposals sent.",
    },
    {
      type: 'paragraph',
      content:
        '3 months later; again sharing great results on a weekly basis. 5 replies and $7K closed in deals from only weekly!',
    },
    {
      type: 'heading',
      heading: 'Monthly Stats Breakdown',
      level: 2,
    },
    {
      type: 'paragraph',
      content:
        "Last week we sat down with Nikola to breakdown his monthly performance on Upwork for his agency Flowscape. We recorded a great video going everything in detail, his approach, strategy and earnings breakdown. It's 30 minutes, if you are interested, let me know I will share it with you.",
    },
    {
      type: 'image',
      image: {
        src: 'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/case-studies%2Fnikola%204.png?alt=media&token=6736ec84-683d-4c96-a5fe-d901f8511400',
        alt: 'Nikola monthly stats',
        width: 1000,
        height: 1000,
      },
    },
    {
      type: 'paragraph',
      content:
        'In the video Nikola gave a detailed breakdown of how July went for him:',
    },
    {
      type: 'list',
      listItems: [
        '$405 in connects spent - boosted proposals',
        '5 won clients - $6,603 paid out by end of month',
        '$25,000 in total deal size won (average client LTV is $5,000)',
        'ROI: 62X',
        'Interesting fact: the number of job invites he is receiving has 4x-ed since he started using Lancer back in April.',
      ],
    },
    {
      type: 'tip',
      tipTitle: '🤓 Upwork Pro Tip',
      tipContent:
        'Upwork promotes freelancers that send proposals to clients since they know they are actively looking for jobs, that means more sent proposals more invites and dms!',
    },
  ],
  meta: {
    publishedDate: 'Sep 7, 2025',
  },
};

import { LucideIcon } from 'lucide-react';

export interface StatCard {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  barColor: string;
}

export interface ImageBlock {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  inContainer?: boolean;
}

export interface ContentBlock {
  type:
    | 'paragraph'
    | 'heading'
    | 'image'
    | 'list'
    | 'tip'
    | 'breakdown'
    | 'video'
    | 'testimonial';
  content?: string;
  heading?: string;
  level?: 1 | 2 | 3;
  image?: ImageBlock;
  listItems?: string[];
  tipTitle?: string;
  tipContent?: string;
  breakdownItems?: Array<{
    label: string;
    value: string;
  }>;
  videoUrl?: string;
  testimonial?: {
    quote: string;
    author: string;
    authorRole?: string;
  };
}

export interface CaseStudyData {
  // Hero Section
  hero: {
    title: string;
    description: string[];
    tags?: string[];
  };

  // Stats Section
  stats: {
    title: string;
    cards: StatCard[];
    fullWidthCard?: StatCard;
  };

  // Main Content
  content: ContentBlock[];

  // Meta
  meta: {
    publishedDate: string;
  };
}

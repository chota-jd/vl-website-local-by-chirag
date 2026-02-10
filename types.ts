import React from 'react';

export interface ServiceCardProps {
  title: string;
  items: string[];
  highlights: string[];
  icon: React.ReactNode;
}

export interface ImpactMetric {
  label: string;
  value: string;
}

export interface CaseStudyProps {
  title: string;
  location: string;
  impact: ImpactMetric[];
  services: string[];
  imageUrl: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface PressItem {
  id: string;
  region: string;
  headline: string;
  publisher: string;
  imageUrl: string;
  date: string;
  link: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
}

/** Stat badge for hero (e.g. "99.8% accuracy", "50+ languages") */
export interface ProductStat {
  label: string;
  value: string;
}

/** Feature with title and short description (DocXpert-style cards) */
export interface ProductFeatureDetail {
  title: string;
  description: string;
}

/** Step in a "How it works" flow */
export interface ProductHowItWorksStep {
  step: number;
  title: string;
  description: string;
}

/** Technical spec row (e.g. Security: Enterprise-Grade) */
export interface ProductTechnicalSpec {
  category: string;
  value: string;
}

/** Industry/solution vertical */
export interface ProductIndustrySolution {
  title: string;
  description: string;
}

/** Full testimonial with attribution */
export interface ProductTestimonialItem {
  quote: string;
  author: string;
  role?: string;
}

/** FAQ item */
export interface ProductFaqItem {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  features: string[];
  category: string;
  link?: string;
  testimonial?: string;
  /** Hero stats strip (e.g. 99.8% OCR, 50+ languages) */
  stats?: ProductStat[];
  /** Expanded feature cards with descriptions */
  featureDetails?: ProductFeatureDetail[];
  /** How it works steps (e.g. Upload → Configure → Process) */
  howItWorks?: ProductHowItWorksStep[];
  /** Technical specifications (Security, Uptime, Compliance) */
  technicalSpecs?: ProductTechnicalSpec[];
  /** Industry solutions / use cases */
  industrySolutions?: ProductIndustrySolution[];
  /** Full testimonials with author and role */
  testimonials?: ProductTestimonialItem[];
  /** FAQ entries */
  faqs?: ProductFaqItem[];
}
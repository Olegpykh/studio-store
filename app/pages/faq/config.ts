import React from 'react';
import { HelpCircle, HeartHandshake } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    title: 'Shopping & Drops FAQ',
    icon: React.createElement(HelpCircle, { className: 'w-4 h-4 text-black' }),
    items: [
      {
        question: 'How do product drops work and can I reserve items?',
        answer:
          'Our items are released in exclusive, limited drops. Adding an item to your bag does not reserve it; checkout must be completed to secure your piece. Once a drop is sold out, it will rarely be restocked in the same colorway.',
      },
      {
        question: 'What are your delivery times and shipping fees?',
        answer:
          'We offer complimentary priority shipping across Europe on all orders over €200. Standard delivery takes 2–4 business days, while express delivery takes 1–2 business days. Tracking details are emailed immediately upon dispatch.',
      },
      {
        question: 'What is your return policy?',
        answer:
          'We accept returns within 14 days of delivery. Items must be in pristine, unworn condition with all original tags and luxury packaging intact. Returns can be initiated through your account dashboard.',
      },
      {
        question: 'Do I have to pay international duties and taxes?',
        answer:
          'All orders shipped within the European Union include VAT and duties. For international orders outside the EU, duties and taxes are calculated at checkout so there are no surprise fees upon delivery.',
      },
    ],
  },
  {
    title: 'Premium Care Guide',
    icon: React.createElement(HeartHandshake, {
      className: 'w-4 h-4 text-black',
    }),
    items: [
      {
        question: 'How should I wash and care for premium heavyweight cotton?',
        answer:
          'To preserve the structure and fabric density of our hoodies and tees, wash them inside out in cold water (maximum 30°C) on a gentle cycle. Avoid fabric softeners, never tumble dry, and iron inside out on low heat.',
      },
      {
        question:
          'What is the maintenance routine for premium fixed-gear bikes?',
        answer:
          'Keep your drivetrain clean and dry. We recommend wiping down the chain and applying a high-quality dry lubricant every 100–150 km. Periodically check tire pressure (keep it between 90–110 PSI for urban tracks) and ensure all bolts are torqued correctly.',
      },
      {
        question:
          'How do I clean and store technical outerwear or technical fabrics?',
        answer:
          'Technical shells with water-resistant coatings should be spot-cleaned with a damp cloth whenever possible. For full washes, use a specialized technical liquid detergent, close all zippers, wash cold, and air dry away from direct heat sources.',
      },
      {
        question: 'How do I maintain leather details on accessories?',
        answer:
          'Treat premium leather components with a high-quality leather conditioner every few months to prevent drying or cracking. If it gets wet, blot gently with a dry cloth and let it dry naturally. Store in the provided dust bag.',
      },
    ],
  },
];

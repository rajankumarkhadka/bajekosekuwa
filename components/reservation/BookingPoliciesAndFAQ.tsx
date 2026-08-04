'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  PhoneCall,
  Users,
  Plus,
  Minus,
  HelpCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Booking Policies Data
const POLICIES = [
  {
    id: 'held',
    icon: CheckCircle2,
    title: 'Held for 15 mins',
    description: 'Your table is reserved for 15 minutes past your booking time.',
  },
  {
    id: 'cancel',
    icon: XCircle,
    title: 'Cancel anytime',
    description: 'Plans change — cancel up to 2 hours before with no penalty.',
  },
  {
    id: 'modify',
    icon: PhoneCall,
    title: 'Call to modify',
    description: 'Need to change the time or party size? Call us directly.',
  },
  {
    id: 'groups',
    icon: Users,
    title: 'Large groups',
    description: 'For parties of 10+, please call us to arrange a private setup.',
  },
];

// FAQ Data
const FAQS = [
  {
    id: 'payment',
    question: 'Do I need to pay to reserve a table?',
    answer:
      'No, table reservations at Bajeko Sekuwa are 100% free of charge. You only pay for what you order at the restaurant.',
  },
  {
    id: 'sameday',
    question: 'Can I make a reservation for the same day?',
    answer:
      'Yes! Same-day reservations can be made online up to 1 hour before your desired dining time, subject to table availability.',
  },
  {
    id: 'groupsize',
    question: 'What if my group size changes?',
    answer:
      'You can modify your party size by calling the outlet directly or updating your booking details at least 2 hours prior.',
  },
  {
    id: 'dresscode',
    question: 'Is there a dress code?',
    answer:
      'We welcome all guests in casual and smart-casual attire. Come as you are to enjoy authentic Himalayan dining.',
  },
];

export default function BookingPoliciesAndFAQ() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-10">
      {/* 1. BOOKING POLICIES SECTION (Matching screenshot) */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs uppercase font-extrabold tracking-widest text-gray-400">
          BOOKING POLICIES
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {POLICIES.map((policy) => {
            const Icon = policy.icon;
            return (
              <div
                key={policy.id}
                className="bg-white border border-gray-100/80 shadow-xs rounded-lg p-5 flex items-start gap-4 transition-all hover:shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C4010F] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-gray-900 text-sm">{policy.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {policy.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. COMMON QUESTIONS FAQ ACCORDION (Matching screenshot) */}
      <div className="bg-gray-50/60 border border-gray-100 rounded-lg p-6 sm:p-8 flex flex-col gap-5">
        <h3 className="text-xs uppercase font-extrabold tracking-widest text-gray-400">
          COMMON QUESTIONS
        </h3>

        <div className="divide-y divide-gray-200/60 flex flex-col">
          {FAQS.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div key={faq.id} className="py-4 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between text-left font-bold text-gray-900 text-sm sm:text-base gap-4 hover:text-[#C4010F] transition-colors"
                >
                  <span>{faq.question}</span>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-[#C4010F] shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 text-xs sm:text-sm mt-3 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. NEED HELP CALLOUT BANNER (Matching screenshot) */}
      <div className="bg-red-50/60 border border-red-100 rounded-lg p-5 sm:p-6 flex items-center gap-4 shadow-xs">
        <div className="w-11 h-11 rounded-full bg-red-100 text-[#C4010F] flex items-center justify-center shrink-0">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h4 className="font-bold text-gray-900 text-sm sm:text-base">
            Need help with your reservation?
          </h4>
          <p className="text-gray-500 text-xs sm:text-sm">
            Call us at{' '}
            <a
              href="tel:+97714712000"
              className="font-bold text-[#C4010F] hover:underline"
            >
              +977 1 4712000
            </a>{' '}
            or visit us in person.
          </p>
        </div>
      </div>
    </div>
  );
}

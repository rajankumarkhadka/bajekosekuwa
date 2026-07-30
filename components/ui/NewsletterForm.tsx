'use client';

import { useState } from 'react';
import Button from '@/components/ui/button';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  if (subscribed) {
    return (
      <div className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-green-50 border border-green-200 text-green-600 font-semibold text-sm animate-fade-in">
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        You&apos;re subscribed! Thank you.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto gap-2.5">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className="flex-1 lg:w-72 px-4 py-3.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-[#C4010F] focus:ring-2 focus:ring-[#C4010F]/10 transition-colors"
      />
      <Button
        type="submit"
        className="px-6 py-3.5 bg-[#C4010F] text-white font-bold text-sm transition-all duration-300 whitespace-nowrap"
      >
        Subscribe
      </Button>
    </form>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Send, CheckCircle2 } from 'lucide-react';
import { FAQ_CATEGORIES } from './config';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>('0-0');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Sizing & Fit Advice');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-12 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
          >
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>

        <div className="text-center space-y-3 mb-20">
          <span className="text-[10px] font-bold text-gray-400 tracking-[0.25em] uppercase block">
            Assistance & Longevity
          </span>
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-black sm:text-5xl">
            FAQ & Care
          </h1>
          <p className="text-sm text-gray-500 font-light max-w-md mx-auto leading-relaxed">
            Everything you need to know about our exclusive drops and preserving
            the quality of your premium goods.
          </p>
        </div>

        <div className="space-y-16">
          {FAQ_CATEGORIES.map((category, catIdx) => (
            <div key={catIdx} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                {category.icon}
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black">
                  {category.title}
                </h2>
              </div>

              <div className="divide-y divide-gray-100/60">
                {category.items.map((item, itemIdx) => {
                  const itemId = `${catIdx}-${itemIdx}`;
                  const isOpen = openIndex === itemId;

                  return (
                    <div key={itemIdx} className="py-5 first:pt-0 last:pb-0">
                      <button
                        onClick={() => toggleAccordion(itemId)}
                        className="flex w-full items-center justify-between text-left group"
                        aria-expanded={isOpen}
                      >
                        <span className="text-base font-medium text-black group-hover:text-gray-500 transition-colors duration-300 leading-snug pr-4">
                          {item.question}
                        </span>
                        <span
                          className={`transform transition-transform duration-500 shrink-0 p-1 text-gray-400 group-hover:text-black ${
                            isOpen ? 'rotate-180 text-black' : ''
                          }`}
                        >
                          <ChevronDown className="w-4 h-4 stroke-[1.5]" />
                        </span>
                      </button>

                      <div
                        className={`grid transition-all duration-500 ease-in-out overflow-hidden text-sm text-gray-500 font-light leading-relaxed ${
                          isOpen
                            ? 'grid-rows-[1fr] opacity-100 mt-3'
                            : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-1 max-w-3xl">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div
          id="concierge-section"
          className="mt-24 p-8 sm:p-12 rounded-3xl bg-[#fafafa] border border-gray-100/70 space-y-8 transition-all duration-500"
        >
          <div className="text-center space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-black">
              Still have questions?
            </p>
            <h3 className="text-xl font-extrabold uppercase tracking-tight text-black">
              Digital Concierge Service
            </h3>
            <p className="text-sm text-gray-500 font-light max-w-sm mx-auto leading-relaxed">
              Our premium team is online. Drop your details below for immediate
              assistance with orders, sizing, or care.
            </p>
          </div>

          {isSent ? (
            <div className="max-w-md mx-auto text-center py-12 space-y-4 animate-in fade-in zoom-in-95 duration-500">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-2 shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-black">
                Request Received
              </h4>
              <p className="text-xs text-gray-500 font-light max-w-xs mx-auto leading-relaxed">
                Thank you,{' '}
                <span className="font-semibold text-black">{name}</span>. Your
                inquiry has been routed to our digital concierge desk. A
                confirmation ticket has been sent to{' '}
                <span className="text-gray-700">{email}</span>.
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  setName('');
                  setEmail('');
                  setSubject('Sizing & Fit Advice');
                  setMessage('');
                }}
                className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-0.5 pt-4 hover:text-gray-500 hover:border-gray-400 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsSent(true);
              }}
              className="max-w-md mx-auto space-y-4 animate-in fade-in duration-500"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 px-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alexander"
                    className="w-full h-12 px-4 rounded-xl border border-gray-200/80 bg-white text-sm font-light focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 text-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 px-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@luxury.com"
                    className="w-full h-12 px-4 rounded-xl border border-gray-200/80 bg-white text-sm font-light focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 px-1">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200/80 bg-white text-sm font-light focus:outline-none focus:border-black transition-colors text-gray-700"
                >
                  <option>Sizing & Fit Advice</option>
                  <option>Order & Shipping Status</option>
                  <option>Garment Care Inquiry</option>
                  <option>Other Private Request</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 px-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our concierge assist you today?"
                  className="w-full p-4 rounded-xl border border-gray-200/80 bg-white text-sm font-light focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 resize-none text-black"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Send Request
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

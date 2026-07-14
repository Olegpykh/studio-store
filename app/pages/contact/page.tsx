'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background pt-12 pb-24 transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500 hover:text-foreground dark:hover:text-white transition-colors"
          >
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>

        <div className="text-center space-y-3 mb-20">
          <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 tracking-[0.25em] uppercase block">
            Get In Touch
          </span>
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-foreground sm:text-5xl">
            Contact Us
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400 font-light max-w-md mx-auto leading-relaxed">
            Have a question about an order, a specific drop, or partnership?
            Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-10 order-last lg:order-first">
            <div className="h-[1px] bg-border w-full hidden lg:block"></div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 dark:text-zinc-500">
                <Mail className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Client Support
                </span>
              </div>
              <p className="text-sm font-medium hover:text-gray-500 dark:hover:text-zinc-400 transition-colors text-foreground">
                <a href="mailto:support@yourbrand.com">support@yourbrand.com</a>
              </p>
              <p className="text-xs text-gray-400 dark:text-zinc-500 font-light">
                Response within 24 hours.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 dark:text-zinc-500">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Studio HQ
                </span>
              </div>
              <p className="text-sm font-light text-gray-600 dark:text-zinc-300 leading-relaxed">
                Premium Design Lab & Co.
                <br />
                Mitte, 10115 Berlin
                <br />
                Germany
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 dark:text-zinc-500">
                <Phone className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Concierge Hours
                </span>
              </div>
              <p className="text-sm font-medium text-foreground">
                Monday — Friday
              </p>
              <p className="text-xs text-gray-400 dark:text-zinc-500 font-light">
                09:00 – 18:00 CET
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 p-8 sm:p-10 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-border transition-all duration-500">
            {isSent ? (
              <div className="text-center py-16 space-y-5 max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background mb-2 shadow-sm">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold uppercase tracking-[0.2em] text-foreground">
                  Message Delivered
                </h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400 font-light leading-relaxed">
                  Thank you,{' '}
                  <span className="font-semibold text-foreground">{name}</span>.
                  Your message has been encrypted and routed to our support
                  desk. Check your inbox (
                  <span className="text-gray-600 dark:text-zinc-300 font-normal">
                    {email}
                  </span>
                  ) for an automated ticket confirmation.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setName('');
                      setEmail('');
                      setOrderNumber('');
                      setMessage('');
                    }}
                    className="text-[10px] font-bold uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-gray-400 dark:hover:text-zinc-500 hover:border-gray-300 transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSent(true);
                }}
                className="space-y-5 animate-in fade-in duration-500"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 mb-1.5 px-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alexander Wright"
                      className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm font-light focus:outline-none focus:border-foreground transition-colors placeholder:text-gray-400 dark:placeholder:text-zinc-600 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 mb-1.5 px-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@luxury.com"
                      className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm font-light focus:outline-none focus:border-foreground transition-colors placeholder:text-gray-400 dark:placeholder:text-zinc-600 text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 mb-1.5 px-1">
                    Order Number{' '}
                    <span className="text-gray-400 dark:text-zinc-600 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="#SUB-1094"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm font-light focus:outline-none focus:border-foreground transition-colors placeholder:text-gray-400 dark:placeholder:text-zinc-600 text-foreground uppercase"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 mb-1.5 px-1">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry in detail..."
                    className="w-full p-4 rounded-xl border border-border bg-background text-sm font-light focus:outline-none focus:border-foreground transition-colors placeholder:text-gray-400 dark:placeholder:text-zinc-600 resize-none text-foreground leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto h-12 bg-foreground text-background text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 px-10 hover:opacity-90 active:scale-[0.98] transition-all shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

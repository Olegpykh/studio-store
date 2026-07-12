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
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-12 pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* BACK NAVIGATION */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
          >
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>

        {/* HEADER SECTION */}
        <div className="text-center space-y-3 mb-20">
          <span className="text-[10px] font-bold text-gray-400 tracking-[0.25em] uppercase block">
            Get In Touch
          </span>
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-black sm:text-5xl">
            Contact Us
          </h1>
          <p className="text-sm text-gray-500 font-light max-w-md mx-auto leading-relaxed">
            Have a question about an order, a specific drop, or partnership?
            Reach out to our team.
          </p>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* LEFT COLUMN: INFO */}
          <div className="lg:col-span-4 space-y-10 order-last lg:order-first">
            <div className="h-[1px] bg-gray-100 w-full hidden lg:block"></div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Client Support
                </span>
              </div>
              <p className="text-sm font-medium hover:text-gray-500 transition-colors">
                <a href="mailto:support@yourbrand.com">support@yourbrand.com</a>
              </p>
              <p className="text-xs text-gray-400 font-light">
                Response within 24 hours.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Studio HQ
                </span>
              </div>
              <p className="text-sm font-light text-gray-600 leading-relaxed">
                Premium Design Lab & Co.
                <br />
                Mitte, 10115 Berlin
                <br />
                Germany
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Concierge Hours
                </span>
              </div>
              <p className="text-sm font-medium text-black">Monday — Friday</p>
              <p className="text-xs text-gray-400 font-light">
                09:00 – 18:00 CET
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: FORM / SUCCESS */}
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-3xl bg-[#fafafa] border border-gray-100/70 transition-all duration-500">
            {isSent ? (
              /* ЭКРАН УСПЕХА */
              <div className="text-center py-16 space-y-5 max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-2 shadow-sm">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold uppercase tracking-[0.2em] text-black">
                  Message Delivered
                </h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  Thank you,{' '}
                  <span className="font-semibold text-black">{name}</span>. Your
                  message has been encrypted and routed to our support desk.
                  Check your inbox (
                  <span className="text-gray-700 font-normal">{email}</span>)
                  for an automated ticket confirmation.
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
                    className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:text-gray-500 hover:border-gray-400 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              /* САМА ФОРМА */
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSent(true);
                }}
                className="space-y-5 animate-in fade-in duration-500"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 px-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alexander Wright"
                      className="w-full h-12 px-4 rounded-xl border border-gray-200/80 bg-white text-sm font-light focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 px-1">
                      Email Address
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
                    Order Number{' '}
                    <span className="text-gray-300 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="#SUB-1094"
                    className="w-full h-12 px-4 rounded-xl border border-gray-200/80 bg-white text-sm font-light focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 text-black uppercase"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 px-1">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry in detail..."
                    className="w-full p-4 rounded-xl border border-gray-200/80 bg-white text-sm font-light focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 resize-none text-black leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto h-12 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 px-10 hover:bg-gray-800 active:scale-[0.98] transition-all shadow-sm"
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

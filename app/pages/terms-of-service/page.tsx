import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-12 pb-24 transition-colors duration-300">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500 hover:text-foreground dark:hover:text-white transition-colors"
          >
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>

        <div className="mb-16">
          <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 tracking-[0.25em] uppercase block mb-2">
            Legal
          </span>
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-foreground sm:text-5xl">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400 font-light mt-3">
            Last updated: July 2026
          </p>
        </div>

        <div className="space-y-10 text-sm text-gray-600 dark:text-zinc-400 font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wide text-foreground">
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website, you accept and agree to be
              bound by these Terms of Service. If you do not agree, please do
              not use our store.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wide text-foreground">
              Orders and Payment
            </h2>
            <p>
              All orders are subject to product availability. We reserve the
              right to refuse or cancel any order at our discretion. Prices are
              listed in the currency shown at checkout and are subject to change
              without notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wide text-foreground">
              Shipping and Returns
            </h2>
            <p>
              Shipping timelines and return policies are detailed on our{' '}
              <Link
                href="/pages/shipping"
                className="text-foreground underline hover:no-underline"
              >
                Shipping & Returns page
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wide text-foreground">
              Intellectual Property
            </h2>
            <p>
              All content on this site, including text, graphics, logos, and
              images, is the property of SportGear and protected by applicable
              intellectual property laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wide text-foreground">
              Limitation of Liability
            </h2>
            <p>
              We are not liable for any indirect, incidental, or consequential
              damages arising from your use of this website or products
              purchased through it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wide text-foreground">
              Contact Us
            </h2>
            <p>
              Questions about these Terms? Reach out via our{' '}
              <Link
                href="/pages/contact"
                className="text-foreground underline hover:no-underline"
              >
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

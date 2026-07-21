// app/pages/privacy-policy/page.tsx
import Link from 'next/link';

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400 font-light mt-3">
            Last updated: July 2026
          </p>
        </div>

        <div className="space-y-10 text-sm text-gray-600 dark:text-zinc-400 font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wide text-foreground">
              Information We Collect
            </h2>
            <p>
              When you shop with us, we collect information you provide
              directly, such as your name, email address, shipping address, and
              payment details. We also automatically collect certain information
              about your device and browsing behavior.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wide text-foreground">
              How We Use Your Information
            </h2>
            <p>
              We use your information to process orders, communicate with you
              about your purchases, improve our products and services, and send
              you marketing communications if you have opted in.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wide text-foreground">
              Data Sharing
            </h2>
            <p>
              We do not sell your personal information. We may share your data
              with trusted third-party service providers who help us operate our
              store, such as payment processors and shipping carriers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wide text-foreground">
              Your Rights
            </h2>
            <p>
              You have the right to access, correct, or delete your personal
              information at any time. Contact our support team to exercise
              these rights.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wide text-foreground">
              Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please reach out
              via our{' '}
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

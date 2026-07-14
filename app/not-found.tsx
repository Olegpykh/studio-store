import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-background text-foreground flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <h1 className="text-7xl font-black tracking-tighter sm:text-8xl uppercase text-foreground/20">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-lg font-bold tracking-widest uppercase">
            Page Not Found
          </h2>
          <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed font-light normal-case tracking-normal">
            {
              "The page you are looking for doesn't exist, has been removed, or is temporarily unavailable."
            }
          </p>
        </div>

        <div className="w-12 h-[1px] bg-border mx-auto pt-2"></div>

        <div className="pt-4 flex justify-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-none bg-foreground text-background px-6 py-3.5 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.99] transition-all tracking-widest uppercase cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

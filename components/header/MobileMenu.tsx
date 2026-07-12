import Link from 'next/link';
import { navigationConfig } from './config';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md px-6 py-8 space-y-8 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
      {navigationConfig.map((cat) => (
        <div key={cat.trigger} className="space-y-4">
          <h2 className="text-xs font-bold text-black uppercase tracking-[0.2em] border-b border-gray-100 pb-2">
            {cat.title}
          </h2>

          <div className="flex flex-col gap-3.5 pl-1">
            {cat.groups
              .flatMap((g) => g.items)
              .map((item) => (
                <Link
                  key={item.handle}
                  href={`/collections/${item.handle}`}
                  onClick={onClose}
                  className="text-sm font-medium text-gray-500 hover:text-black active:text-black active:translate-x-1 transition-all duration-200 block"
                >
                  {item.name}
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

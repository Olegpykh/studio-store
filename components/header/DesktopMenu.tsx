import Link from 'next/link';
import { navigationConfig } from './config';

interface DesktopMenuProps {
  activeDropdown: string | null;
  onClose: () => void;
}

export function DesktopMenu({ activeDropdown, onClose }: DesktopMenuProps) {
  if (!activeDropdown) return null;

  return (
    <div className="hidden md:block absolute left-0 right-0 bg-white border-b border-gray-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.03)] z-50 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {navigationConfig
          .filter((cat) => cat.trigger === activeDropdown)
          .map((cat) => (
            <div key={cat.trigger} className="grid grid-cols-3 gap-12">
              {cat.groups.map((group) => (
                <div key={group.groupName} className="space-y-4">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    {group.groupName}
                  </h3>
                  <ul className="space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item.handle}>
                        <Link
                          href={`/collections/${item.handle}`}
                          onClick={onClose}
                          className="text-xs font-medium text-gray-600 hover:text-black transition-colors block py-0.5"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

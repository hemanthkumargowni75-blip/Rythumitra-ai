'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Map,
  Sprout,
  ShieldAlert,
  BookOpenCheck,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (['/login', '/register', '/verify-otp', '/forgot-password'].includes(pathname)) {
    return null;
  }

  const items = [
    { href: '/', label: t.nav.dashboard, icon: Home },
    { href: '/map', label: t.nav.map, icon: Map },
    { href: '/crops', label: t.nav.crops, icon: Sprout },
    { href: '/diagnostics', label: t.nav.diagnostics, icon: ShieldAlert },
    { href: '/passbook', label: t.nav.passbook, icon: BookOpenCheck },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl px-2 py-1.5">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                isActive
                  ? 'text-farm-700 font-black'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <div
                className={`p-1 rounded-full transition-all ${
                  isActive ? 'bg-farm-100 scale-110' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-farm-700 stroke-[2.5]' : 'text-gray-500'}`} />
              </div>
              <span className={`text-[10px] mt-0.5 truncate max-w-[64px] ${isActive ? 'font-black text-farm-800' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sprout,
  Languages,
  MapPin,
  Menu,
  X,
  Compass,
  FileText,
  CloudSun,
  ShieldAlert,
  Droplet,
  Calculator,
  MessageSquare,
  CheckCircle2,
  CalendarCheck,
  BookOpenCheck,
  UserCheck,
  LogOut,
  ShieldCheck,
  Building2,
  TrendingUp,
  Camera,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { useAuth } from '@/context/AuthContext';
import { Language, UserRole } from '@/types';

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, availableLanguages, t } = useLanguage();
  const { farmer, farm } = useFarm();
  const { user, role, logout, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Do not show navbar on auth pages
  if (['/login', '/register', '/verify-otp', '/forgot-password'].includes(pathname)) {
    return null;
  }

  const navLinks = [
    { href: '/', label: t.nav.dashboard, icon: Compass },
    { href: '/markets', label: language === 'te' ? 'మార్కెట్ ధరలు' : 'Markets', icon: TrendingUp },
    { href: '/government-services', label: language === 'te' ? 'ప్రభుత్వ సేవలు' : 'Gov Portals', icon: Building2 },
    { href: '/crop-images', label: language === 'te' ? 'పంట చిత్రాలు' : 'Crop Photos', icon: Camera },
    { href: '/map', label: t.nav.map, icon: MapPin },
    { href: '/crops', label: t.nav.crops, icon: Sprout },
    { href: '/soil', label: t.nav.soil, icon: FileText },
    { href: '/weather', label: t.nav.weather, icon: CloudSun },
    { href: '/diagnostics', label: t.nav.diagnostics, icon: ShieldAlert },
    { href: '/fertilizer', label: t.nav.fertilizer, icon: Calculator },
    { href: '/irrigation', label: t.nav.irrigation, icon: Droplet },
    { href: '/consult', label: t.nav.consult, icon: MessageSquare },
    { href: '/scouting', label: t.nav.scouting, icon: CalendarCheck },
    { href: '/follow-up', label: t.nav.followUp, icon: CheckCircle2 },
    { href: '/passbook', label: t.nav.passbook, icon: BookOpenCheck },
    ...(role === 'ADMIN' || role === 'SUPER_ADMIN'
      ? [{ href: '/admin/locations', label: language === 'te' ? 'లొకేషన్ల నిర్వహణ' : 'Locations Admin', icon: MapPin }]
      : []),
  ];

  const roleBadgeStyles: Record<UserRole, string> = {
    FARMER: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    EXPERT: 'bg-purple-50 text-purple-800 border-purple-300',
    ADMIN: 'bg-blue-50 text-blue-800 border-blue-300',
    SUPER_ADMIN: 'bg-rose-50 text-rose-800 border-rose-300',
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-farm-200 shadow-sm">
      {/* Top Agricultural Bar */}
      <div className="bg-farm-800 text-farm-50 text-xs px-4 py-1.5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-medium tracking-wide">
            {language === 'te'
              ? 'మీ పొలానికి మేము దగ్గరగా | ప్రత్యక్ష వ్యవసాయ మేధో వేదిక'
              : 'RythuMitra AI — Intelligent Farming Support, Right From Your Field'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-farm-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {farmer.village}, {farmer.district} ({farm.boundary.areaAcres} {t.dashboard.acres})
            </span>
          </div>

          {/* Multilingual 7-Language Selector */}
          <div className="relative inline-flex items-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-farm-700 hover:bg-farm-600 text-white text-[11px] font-bold py-0.5 pl-2 pr-6 rounded-full border border-farm-500 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-400 transition-colors"
              aria-label="Select Language"
            >
              {availableLanguages.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-farm-900 text-white py-1">
                  {lang.flagEmoji} {lang.nativeLabel} ({lang.label})
                </option>
              ))}
            </select>
            <Languages className="w-3 h-3 text-amber-300 absolute right-2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-farm-500 to-farm-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-farm-900 tracking-tight">
                  {t.brandName}
                </span>
                <span className="px-1.5 py-0.2 bg-amber-500 text-white text-[11px] font-bold rounded">
                  AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-farm-700 -mt-0.5">
                {t.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.slice(0, 8).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-farm-100 text-farm-900 font-bold border border-farm-300 shadow-xs'
                      : 'text-gray-600 hover:text-farm-800 hover:bg-farm-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-farm-600' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Profile, Role Selector & Logout */}
          <div className="flex items-center gap-2">
            {/* Role Badge & Switcher */}
            <div
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-bold shadow-xs ${
                roleBadgeStyles[role] || roleBadgeStyles.FARMER
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <select
                value={role}
                onChange={(e) => switchRole(e.target.value as UserRole)}
                className="bg-transparent text-[11px] font-extrabold cursor-pointer focus:outline-hidden"
                aria-label="User Role"
                title="Switch Active Role"
              >
                <option value="FARMER" className="text-gray-900">{t.auth.farmerRole}</option>
                <option value="EXPERT" className="text-gray-900">{t.auth.expertRole}</option>
                <option value="ADMIN" className="text-gray-900">{t.auth.adminRole}</option>
              </select>
            </div>

            {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
              <Link
                href="/admin/locations"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all shadow-xs"
                title="India-wide Administrative Hierarchy & Directory"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'te' ? 'లొకేషన్లు' : 'Locations'}</span>
              </Link>
            )}

            <Link
              href="/passbook"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-earth-50 hover:bg-earth-100 text-earth-800 border border-earth-300 text-xs font-bold transition-all shadow-xs"
            >
              <BookOpenCheck className="w-4 h-4 text-earth-700" />
              <span>{t.nav.passbook}</span>
            </Link>

            <Link
              href="/onboarding"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-farm-600 hover:bg-farm-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              <span className="hidden sm:inline">
                {user?.name || (language === 'te' ? farmer.nameTelugu : farmer.name)}
              </span>
            </Link>

            {/* Logout Button */}
            <button
              type="button"
              onClick={logout}
              title={t.auth.logout}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-600 border border-gray-200 text-xs font-bold transition-all shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.auth.logout}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-farm-800 hover:bg-farm-100 xl:hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-farm-200 bg-white px-4 py-3 space-y-2 shadow-xl">
          <div className="p-3 rounded-lg bg-farm-50 border border-farm-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-farm-900">
                {user?.name || (language === 'te' ? farmer.nameTelugu : farmer.name)}
              </p>
              <p className="text-[11px] text-farm-700">
                {farmer.village}, {farmer.mandal}, {farmer.district}
              </p>
              <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                {farm.name} — {farm.boundary.areaAcres} {t.dashboard.acres}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${roleBadgeStyles[role]}`}>
                {role}
              </span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="flex items-center gap-1 text-xs text-rose-600 font-bold hover:underline"
              >
                <LogOut className="w-3 h-3" />
                <span>{t.auth.logout}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold ${
                    isActive
                      ? 'bg-farm-600 text-white font-bold'
                      : 'bg-gray-50 hover:bg-farm-50 text-gray-800 border border-gray-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-farm-600'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

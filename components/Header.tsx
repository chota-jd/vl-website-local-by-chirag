'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if we are on a page that needs a white header by default
  const isSubPage = pathname !== '/';
  const useWhiteHeader = isScrolled || isSubPage;

  const navItems: { label: string; href: string }[] = [
    { label: 'Services', href: '/services' },
    { label: 'Strategy', href: '/strategy' },
    { label: 'Impact', href: '/impact' },
    { label: 'Insights', href: '/blog' },
    { label: 'Press', href: '/press' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
        useWhiteHeader 
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.04)]' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-8">
        <div 
          className={`flex items-center justify-between transition-all duration-500 ${
            useWhiteHeader 
              ? 'py-4' 
              : 'py-8'
          }`}
        >
          {/* Brand Identity - Optimized for visibility */}
          <Link 
            href="/"
            className="flex items-center space-x-5 group cursor-pointer"
          >
            <div className="w-12 h-12 bg-accent flex items-center justify-center text-lg font-black text-white shadow-[0_4px_20px_rgba(0,100,224,0.15)]">
              VL
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-display font-black tracking-tight leading-none transition-colors ${
                useWhiteHeader ? 'text-obsidian-900' : 'text-white'
              }`}>
                VersionLabs
              </span>
              <span className={`text-[9px] font-black uppercase tracking-[0.45em] mt-1.5 transition-colors ${
                useWhiteHeader ? 'text-slate-400' : 'text-slate-400/80'
              }`}>
                VERSIONLABS INFRASTRUCTURE
              </span>
            </div>
          </Link>
          
          {/* Main Navigation */}
          <nav className="hidden lg:flex items-center space-x-14">
            <div className={`flex items-center space-x-12 text-sm font-black uppercase tracking-[0.25em] transition-colors ${
              useWhiteHeader ? 'text-slate-500' : 'text-white/60'
            }`}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className={`relative py-2 group/nav transition-all duration-300 ${
                      isActive 
                        ? 'text-accent' 
                        : useWhiteHeader ? 'hover:text-obsidian-900' : 'hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {/* Underline indicator */}
                    <span className={`absolute -bottom-1 left-0 h-[3px] bg-accent transition-all duration-500 ${
                      isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'
                    }`}></span>
                  </Link>
                );
              })}
            </div>

            {/* Inquire Now Button */}
            <Link 
              href="/enquiry"
              className={`group/btn relative px-10 py-5 font-black uppercase tracking-[0.35em] text-[11px] transition-all duration-300 flex items-center space-x-4 border-2 ${
                pathname === '/enquiry' 
                ? 'border-accent bg-accent text-white' 
                : useWhiteHeader 
                  ? 'border-slate-200 text-obsidian-900 hover:border-accent hover:text-accent bg-white'
                  : 'border-white/20 text-white hover:border-white hover:bg-white/10'
              }`}
            >
              <span>Inquire Now</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-2`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </nav>

          {/* Mobile Menu Trigger */}
          <Link 
            href="/enquiry"
            className={`lg:hidden p-3 transition-colors ${
              useWhiteHeader ? 'text-obsidian-900 hover:text-accent' : 'text-white hover:text-amber-400'
            }`}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

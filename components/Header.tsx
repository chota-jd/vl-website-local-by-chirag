'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
          {/* Brand Identity - Logo from public folder */}
          <Link 
            href="/"
            className="flex items-center space-x-5 group cursor-pointer"
          >
            {/* Logo - Use appropriate version based on header background */}
            <div className="flex items-center">
              <Image
                src={useWhiteHeader ? "/DarkVersion-vl-logo.png" : "/WhiteVersion-vl-logo.png"}
                alt="Version Labs Logo"
                width={120}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
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

'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PROJECTS = [
  { title: "AI For All Entrepreneurship India AIM, NITI Aayog", count: "119,732", trend: "+12%" },
  { title: "AI For All Entrepreneurship India", count: "75", trend: "Stable" },
  { title: "AI For All Gujarat", count: "3,114", trend: "+5%" },
  { title: "AI For All UP", count: "952", trend: "+8%" },
  { title: "Padhai Ka Future", count: "498", trend: "Live" },
  { title: "AI For All", count: "5,277,666", trend: "+124k" },
  { title: "AI For All Odisha", count: "4,151", trend: "+3%" },
  { title: "AI For All Vietnam", count: "19,013", trend: "+15%" },
  { title: "AI Untuk Rakyat Malaysia", count: "1,391,472", trend: "+42k" },
  { title: "AI Skilling MLM Public", count: "86", trend: "Syncing" },
  { title: "AI For Space Managed", count: "370", trend: "Active" },
  { title: "AI For Accessibility Managed", count: "16", trend: "Active" }
];

const StatCard: React.FC<{ title: string; count: string; trend: string }> = ({ title, count, trend }) => (
  <div className="group relative">
    {/* Animated Border Gradient on Hover */}
    <div className="absolute -inset-[1px] bg-gradient-to-r from-accent/50 to-amber-500/50 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="relative bg-obsidian-950/40 backdrop-blur-3xl border border-white/5 p-10 rounded-2xl h-64 flex flex-col justify-between overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Live</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            {trend}
          </span>
        </div>
        <h3 className="text-white font-display font-bold text-lg leading-tight tracking-tight max-w-[200px] group-hover:text-accent transition-colors">
          {title}
        </h3>
      </div>

      <div className="relative z-10 flex flex-col items-end">
        <span className="text-slate-500 text-[9px] font-black uppercase tracking-ultra mb-2">
          Registered Users
        </span>
        <div className="flex items-baseline space-x-1">
          <span className="text-white font-display font-black text-4xl tracking-tighter group-hover:scale-105 transition-transform origin-right duration-500">
            {count}
          </span>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent group-hover:w-full transition-all duration-700"></div>
    </div>
  </div>
);

const IntelView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden selection:bg-accent selection:text-white">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] translate-y-1/2"></div>
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-8 lg:px-20 relative z-10 pt-40 pb-40">
        {/* Top Header Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-12 border-b border-white/5 pb-12">
          {/* Intel Branding */}
          <div className="flex items-center space-x-6 group">
            <Image
              src="/intel-logo.png"
              alt="Intel Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,104,181,0.5)]"
            />
            <div className="h-10 w-[1px] bg-white/10"></div>
            <Image
              src="/WhiteVersion-vl-logo.png"
              alt="Version Labs Logo"
              width={180}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Sync Stats */}
          <div className="flex items-center space-x-12">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-ultra text-slate-500 mb-1">Last Update</span>
              <span className="text-white font-mono text-sm uppercase">Just Now</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-ultra text-slate-500 mb-1">Deployment Status</span>
              <div className="flex items-center space-x-2">
                <span className="text-accent font-black text-xs uppercase tracking-ultra">Syncing Global Data</span>
                <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Title Section */}
        <div className="mb-20">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-px bg-accent"></div>
            <span className="text-accent text-[11px] font-black uppercase tracking-ultra">Enterprise Mission Dashboard</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter mb-8 max-w-4xl">
            Intel Live <span className="text-accent italic font-light">Infrastructure.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl text-balance">
            Real-time citizen engagement monitoring across all sovereign AI and learning platforms deployed in partnership with Intel.
          </p>
        </div>

        {/* Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PROJECTS.map((project, idx) => (
            <StatCard key={idx} title={project.title} count={project.count} trend={project.trend} />
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <Link 
            href="/"
            className="flex items-center space-x-4 text-slate-500 hover:text-white transition-all group"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="text-[10px] font-black uppercase tracking-ultra">Back to Command Hub</span>
          </Link>

          <div className="flex items-center space-x-8">
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-ultra text-slate-500">Security Protocol</p>
              <p className="text-white text-xs font-bold tracking-tight">E2E ENCRYPTED STREAM</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/5 border border-accent/20 flex items-center justify-center text-accent">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
               </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Extreme Background Text */}
      <div className="absolute top-0 right-0 w-full overflow-hidden pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[30vw] font-display font-black text-white leading-none -mt-[5vw] whitespace-nowrap tracking-tighter uppercase translate-x-1/4">
          INTEL
        </h2>
      </div>
    </div>
  );
};

export default IntelView;

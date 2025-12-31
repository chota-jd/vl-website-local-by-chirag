'use client'

import React from 'react';
import Link from 'next/link';

const VL_PROJECTS = [
  { 
    title: "DocXpert", 
    desc: "Intelligent Document Processing & Sovereign AI Analysis",
    count: "157", 
    trend: "Alpha Live",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  { 
    title: "TechEquity", 
    desc: "G20 Empowered Global Inclusive Learning Platform",
    count: "19,745", 
    trend: "+24% Growth",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  { 
    title: "Rakyat Digital Malaysia", 
    desc: "National Citizen Engagement & Digital Services Portal",
    count: "1,183,264", 
    trend: "Scale Phase",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  }
];

const ProjectStatCard: React.FC<{ title: string; count: string; trend: string; desc: string; icon: React.ReactNode }> = ({ title, count, trend, desc, icon }) => (
  <div className="group relative">
    {/* Glow Effect */}
    <div className="absolute -inset-[1px] bg-gradient-to-r from-accent to-blue-400 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="relative bg-obsidian-950/60 backdrop-blur-3xl border border-white/5 p-12 rounded-2xl h-[340px] flex flex-col justify-between overflow-hidden">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
            {icon}
          </div>
          <span className="text-[10px] font-black uppercase tracking-ultra text-accent bg-accent/5 px-4 py-1.5 rounded-full border border-accent/10">
            {trend}
          </span>
        </div>
        
        <h3 className="text-white font-display font-black text-2xl mb-3 tracking-tight group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 text-sm font-light leading-relaxed max-w-[240px]">
          {desc}
        </p>
      </div>

      <div className="relative z-10">
        <div className="h-px w-full bg-white/5 mb-6"></div>
        <div className="flex flex-col">
          <span className="text-slate-500 text-[9px] font-black uppercase tracking-ultra mb-2">
            Total Active Registered Users
          </span>
          <span className="text-white font-display font-black text-5xl tracking-tighter group-hover:scale-105 transition-transform duration-500 origin-left">
            {count}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const VersionLabsView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-8 lg:px-24 relative z-10 pt-48 pb-40">
        {/* Dynamic Header Strip */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-32 border-b border-white/5 pb-16">
          <Link 
            href="/"
            className="flex items-center space-x-6 cursor-pointer group"
          >
            <div className="w-14 h-14 bg-accent flex items-center justify-center text-xl font-black text-white shadow-[0_0_30px_rgba(0,100,224,0.3)]">
              VL
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-black text-white tracking-tighter uppercase leading-none">VersionLabs</span>
              <span className="text-slate-500 text-[9px] font-black uppercase tracking-ultra mt-2">Proprietary Mission Ledger</span>
            </div>
          </Link>

          <div className="flex items-center space-x-12 mt-10 md:mt-0">
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-ultra text-slate-500 block mb-1">Global System Load</span>
              <div className="flex items-center space-x-3">
                <span className="text-emerald-400 font-mono text-sm">OPTIMAL [0.04ms]</span>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-white/10"></div>
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-ultra text-slate-500 block mb-1">Active Instances</span>
              <span className="text-white font-display font-bold">14 Region Hubs</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mb-24">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-[2px] bg-accent"></div>
            <span className="text-accent text-[11px] font-black uppercase tracking-ultra">Proprietary Core Dashboard</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter mb-10 leading-[0.9]">
            Sovereign <br />
            <span className="text-accent italic font-light">Implementations.</span>
          </h1>
          <p className="text-slate-400 text-xl font-light leading-relaxed max-w-2xl text-balance">
            Real-time aggregate monitoring of VersionLabs' proprietary digital assets and citizen engagement infrastructure.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VL_PROJECTS.map((project, idx) => (
            <ProjectStatCard 
              key={idx} 
              title={project.title} 
              count={project.count} 
              trend={project.trend} 
              desc={project.desc}
              icon={project.icon}
            />
          ))}
        </div>

        {/* Return Action */}
        <div className="mt-32 flex flex-col items-center">
          <Link 
            href="/"
            className="group px-12 py-6 bg-transparent border border-white/10 text-white text-[11px] font-black uppercase tracking-ultra hover:bg-white hover:text-obsidian-900 transition-all duration-500 flex items-center space-x-6"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Exit Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Decorative Background Labels */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full flex justify-between px-20 opacity-[0.03] pointer-events-none select-none">
        <span className="text-[20vw] font-display font-black text-white uppercase tracking-tighter">VL</span>
        <span className="text-[20vw] font-display font-black text-white uppercase tracking-tighter">LIVE</span>
      </div>
    </div>
  );
};

export default VersionLabsView;

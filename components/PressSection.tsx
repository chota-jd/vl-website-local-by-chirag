'use client'

import React from 'react';
import Link from 'next/link';
import { PressItem } from '@/types';

export const PRESS_ITEMS: PressItem[] = [
  {
    id: "p1",
    region: "MALAYSIA",
    headline: "Rafizi: Govt launches AI Untuk Rakyat programme to boost AI literacy among Malaysians",
    publisher: "MALAY MAIL",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    date: "JAN 2024",
    link: "#"
  },
  {
    id: "p2",
    region: "MALAYSIA",
    headline: "More than half of 1.3m 'AI untuk Rakyat' participants are women - Gobind",
    publisher: "BUSINESS TIMES",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    date: "FEB 2024",
    link: "#"
  },
  {
    id: "p3",
    region: "VIETNAM",
    headline: "Vietnam, Intel join forces to make AI education accessible to all",
    publisher: "VIETNAM PLUS",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    date: "MAR 2024",
    link: "#"
  },
  {
    id: "p4",
    region: "MALAYSIA",
    headline: "Govt Launches “Rakyat Digital” Programme And Learning Platform",
    publisher: "LOWYAT",
    imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
    date: "APR 2024",
    link: "#"
  },
  {
    id: "p5",
    region: "INDIA",
    headline: "Bridging gender digital divide: TechEquity launch at G20 Summit tomorrow.",
    publisher: "THE ECONOMIC TIMES",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    date: "MAY 2024",
    link: "#"
  },
  {
    id: "p6",
    region: "MALAYSIA",
    headline: "Centre launches AI programme to empower 1 lakh young innovators",
    publisher: "THE TRIBUNE",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    date: "JUN 2024",
    link: "#"
  }
];

const PressCard: React.FC<{ item: PressItem }> = ({ item }) => {
  return (
    <div className="group h-full bg-white rounded-none overflow-hidden flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-2 border border-slate-100">
      {/* Top Image Area */}
      <div className="h-56 relative overflow-hidden bg-slate-100">
        <img 
          src={item.imageUrl} 
          alt={item.publisher} 
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="absolute top-6 left-6">
          <span className="px-4 py-1.5 bg-white/95 backdrop-blur-sm text-[9px] font-black tracking-ultra text-obsidian-900 border border-slate-100 uppercase">
            {item.region}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-10 flex flex-col flex-grow">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-accent/30 group-hover:text-accent transition-colors duration-500">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12M10.017 21L10.017 18C10.017 16.8954 9.12157 16 8.01699 16H5.01699C4.46471 16 4.01699 15.5523 4.01699 15V9C4.01699 8.44772 4.46471 8 5.01699 8H9.01699C9.56927 8 10.017 8.44772 10.017 9V12" />
            </svg>
          </div>
          <span className="text-sm font-black uppercase tracking-ultra text-slate-400 group-hover:text-accent transition-colors">{item.date}</span>
        </div>
        
        <h3 className="text-xl font-bold text-obsidian-900 leading-[1.3] mb-10 line-clamp-4 group-hover:text-accent transition-colors duration-500">
          "{item.headline}"
        </h3>
        
        <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-tight text-obsidian-950">
            {item.publisher}
          </span>
        </div>
      </div>
    </div>
  );
};

const PressSection: React.FC = () => {
  const featuredItems = PRESS_ITEMS.slice(0, 3);

  return (
    <section className="py-40 bg-obsidian-900 relative border-y border-white/5 overflow-hidden">
      {/* Subtle grid pattern for dark background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center space-x-4 text-accent text-sm font-black uppercase tracking-ultra">
              <span className="w-12 h-px bg-accent"></span>
              <span>Institutional Recognition</span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-0 leading-[0.9] tracking-tighter">
              Global Media <br />
              <span className="text-accent italic font-light">Presence.</span>
            </h2>
          </div>
          
          <div className="lg:text-right max-w-md">
             <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed">
                Strategic coverage across major international publications highlighting national-scale AI transformation.
             </p>
          </div>
        </div>

        {/* Curated Grid (3 Items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {featuredItems.map((item) => (
            <div key={item.id} className="h-full">
              <PressCard item={item} />
            </div>
          ))}
        </div>

        {/* Standardized 'View All Coverage' Button with Arrow */}
        <div className="flex flex-col items-center">
          <Link 
            href="/press"
            className="px-12 py-6 bg-white border border-slate-200 text-obsidian-900 text-sm font-black uppercase tracking-ultra hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 shadow-xl flex items-center space-x-4 group"
          >
            <span>View All Coverage</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          <div className="mt-20 flex items-center space-x-8 opacity-40">
             <div className="w-32 h-px bg-white"></div>
             <span className="text-[14px] font-black uppercase tracking-ultra text-white">Trusted by Global Ministries</span>
             <div className="w-32 h-px bg-white"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressSection;
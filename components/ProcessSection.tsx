import React from 'react';

const ProcessSection: React.FC = () => {
  const steps = [
    { 
      title: "Strategy", 
      desc: "Co-creating the digital blueprint for national impact.", 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A2 2 0 013 15.487V6.037a2 2 0 011.106-1.789l5.447-2.724a2 2 0 011.894 0l5.447 2.724A2 2 0 0118 6.037v9.45a2 2 0 01-1.106 1.789L11.447 20a2 2 0 01-1.894 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.5 8l3 2 3-2" />
        </svg>
      ) 
    },
    { 
      title: "Design", 
      desc: "Inclusive UI/UX architecture for diverse demographics.", 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ) 
    },
    { 
      title: "Deploy", 
      desc: "Rigorous security hardening and elastic scaling.", 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ) 
    },
    { 
      title: "Support", 
      desc: "24/7 mission-critical operations and maintenance.", 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) 
    }
  ];

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden border-t border-accent/5">
      {/* Decorative Accent Line */}
      <div className="hidden lg:block absolute top-[58%] left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-obsidian-900 mb-6">End-to-End Delivery Excellence</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">Our methodology ensures every public platform is resilient, accessible, and compliant from Day 1.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative text-center group">
              <div className="w-20 h-20 bg-accent/5 border border-accent/20 rounded-sm mx-auto mb-8 flex items-center justify-center text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-white shadow-xl shadow-accent/5">
                {step.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-obsidian-900 mb-4 group-hover:text-accent transition-colors">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed px-4 font-light">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
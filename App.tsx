import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import CaseStudies from './components/CaseStudies';
import PressSection from './components/PressSection';
import Footer from './components/Footer';
import ServicesView from './views/ServicesView';
import StrategyView from './views/StrategyView';
import ImpactView from './views/ImpactView';
import PressView from './views/PressView';
import PortfolioView from './views/PortfolioView';
import TestimonialsView from './views/TestimonialsView';
import LearningSolutionView from './views/LearningSolutionView';
import AutomationSolutionView from './views/AutomationSolutionView';
import StrategySolutionView from './views/StrategySolutionView';
import EnquiryView from './views/EnquiryView';
import PartnershipView from './views/PartnershipView';
import BlogView from './views/BlogView';
import BlogPostView from './views/BlogPostView';
import IntelView from './views/IntelView';
import VersionLabsView from './views/VersionLabsView';
import Chatbot from './components/Chatbot';
import { BlogPost } from './types';

export type ViewType = 
  | 'landing' 
  | 'services' 
  | 'strategy' 
  | 'impact' 
  | 'press' 
  | 'portfolio' 
  | 'testimonials' 
  | 'solution-learning' 
  | 'solution-automation' 
  | 'solution-strategy'
  | 'enquiry'
  | 'partnership'
  | 'blog'
  | 'blog-post'
  | 'intel'
  | 'vl';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedPost]);

  const handleOpenPost = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentView('blog-post');
  };

  const renderView = () => {
    switch (currentView) {
      case 'services':
        return <ServicesView setView={setCurrentView} />;
      case 'strategy':
        return <StrategyView setView={setCurrentView} />;
      case 'impact':
        return <ImpactView setView={setCurrentView} />;
      case 'press':
        return <PressView setView={setCurrentView} />;
      case 'portfolio':
        return <PortfolioView setView={setCurrentView} />;
      case 'testimonials':
        return <TestimonialsView setView={setCurrentView} />;
      case 'solution-learning':
        return <LearningSolutionView setView={setCurrentView} />;
      case 'solution-automation':
        return <AutomationSolutionView setView={setCurrentView} />;
      case 'solution-strategy':
        return <StrategySolutionView setView={setCurrentView} />;
      case 'enquiry':
        return <EnquiryView setView={setCurrentView} />;
      case 'partnership':
        return <PartnershipView setView={setCurrentView} />;
      case 'intel':
        return <IntelView setView={setCurrentView} />;
      case 'vl':
        return <VersionLabsView setView={setCurrentView} />;
      case 'blog':
        return <BlogView setView={setCurrentView} onOpenPost={handleOpenPost} />;
      case 'blog-post':
        return selectedPost ? (
          <BlogPostView post={selectedPost} setView={setCurrentView} />
        ) : (
          <BlogView setView={setCurrentView} onOpenPost={handleOpenPost} />
        );
      default:
        return (
          <>
            <Hero setView={setCurrentView} />
            <Features setView={setCurrentView} />
            <WhyUs />
            <CaseStudies setView={setCurrentView} />
            <PressSection setView={setCurrentView} />
            <Testimonials setView={setCurrentView} />
            
            {/* High-Impact Bottom Call to Action */}
            <section className="py-60 bg-obsidian-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent"></div>
              <div className="absolute inset-0 opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
              
              <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                  <div className="mb-10 inline-flex items-center space-x-3 text-accent text-xs font-black uppercase tracking-ultra">
                    <div className="w-10 h-px bg-accent"></div>
                    <span>Global Mission</span>
                  </div>
                  <h2 className="text-6xl md:text-9xl font-display font-black text-white mb-12 leading-tight tracking-tighter">
                    Transform at <span className="text-accent italic">Scale.</span>
                  </h2>
                  <p className="text-2xl text-slate-400 mb-20 leading-relaxed font-light max-w-3xl mx-auto text-balance">
                    Whether you are planning a national LMS, a government portal, or a digital governance platform — our team is ready to support your mission.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                    <div 
                      onClick={() => setCurrentView('enquiry')}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                       <p className="text-xs font-black text-accent uppercase tracking-ultra mb-3 transition-transform group-hover:-translate-y-1">Primary Consultation</p>
                       <p className="text-white font-display text-2xl border-b border-accent/40 pb-2 group-hover:text-accent transition-colors">chirag@versionlabs.co</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white bg-white overflow-x-hidden">
      <Header currentView={currentView} setView={setCurrentView} />
      
      <main className="animate-in fade-in duration-1000">
        {renderView()}
      </main>

      <Footer setView={setCurrentView} />
      <Chatbot />
    </div>
  );
};

export default App;
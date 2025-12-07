import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';

// Styles
import './styles/globals.css';

// Components
import CustomCursor from './components/UI/CustomCursor';
import LoadingScreen from './components/UI/LoadingScreen';
import Navigation from './components/UI/Navigation';

// Sections
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Skills from './components/Sections/Skills';
import Certificates from './components/Sections/Certificates';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';

// Config
import { portfolioConfig } from './config/portfolio.config';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('hero');

  // Track current section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = portfolioConfig.navigation.map(n => n.id);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set document title
  useEffect(() => {
    document.title = portfolioConfig.metadata.title;
  }, []);

  return (
    <div className="app">
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Custom Cursor (desktop only) */}
      {portfolioConfig.features.customCursor && <CustomCursor />}

      {/* Navigation */}
      {!isLoading && <Navigation currentSection={currentSection} />}

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Certificates />
        <Projects />
        <Contact />
      </main>

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;

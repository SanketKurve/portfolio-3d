import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioConfig } from '../../config/portfolio.config';
import './Navigation.css';

export default function Navigation({ currentSection }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { navigation } = portfolioConfig;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Desktop Navigation - Side Dots */}
            <nav className={`nav-desktop ${isScrolled ? 'scrolled' : ''}`}>
                <div className="nav-dots">
                    {navigation.map((item, index) => (
                        <motion.button
                            key={item.id}
                            className={`nav-dot ${currentSection === item.id ? 'active' : ''}`}
                            onClick={() => scrollToSection(item.id)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <span className="nav-dot-inner" />
                            <span className="nav-dot-label">{item.label}</span>
                            <span className="nav-dot-line" />
                        </motion.button>
                    ))}
                </div>

                {/* Progress line */}
                <div className="nav-progress-line" />
            </nav>

            {/* Mobile Navigation */}
            <nav className={`nav-mobile ${isScrolled ? 'scrolled' : ''}`}>
                {/* Mobile hamburger orb */}
                <motion.button
                    className={`nav-orb ${isOpen ? 'open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <span className="orb-core" />
                    <span className="orb-ring" />
                    <span className="orb-ring ring-2" />
                </motion.button>

                {/* Mobile menu overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="nav-mobile-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="nav-mobile-menu"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: 'spring', damping: 20 }}
                            >
                                {navigation.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        className={`nav-mobile-item ${currentSection === item.id ? 'active' : ''}`}
                                        onClick={() => scrollToSection(item.id)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <span className="nav-mobile-icon">{item.icon}</span>
                                        <span className="nav-mobile-label">{item.label}</span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom navigation bar for mobile */}
                <div className="nav-bottom-bar">
                    {navigation.slice(0, 5).map((item) => (
                        <button
                            key={item.id}
                            className={`nav-bottom-item ${currentSection === item.id ? 'active' : ''}`}
                            onClick={() => scrollToSection(item.id)}
                        >
                            <span className="nav-bottom-icon">{item.icon}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Logo */}
            <motion.div
                className={`nav-logo ${isScrolled ? 'scrolled' : ''}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <span className="logo-text">SK</span>
                <span className="logo-dot" />
            </motion.div>
        </>
    );
}

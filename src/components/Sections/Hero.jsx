import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import Portal from '../3D/Portal';
import ParticleField from '../3D/ParticleField';
import { portfolioConfig } from '../../config/portfolio.config';
import { useMousePosition, useDeviceType } from '../../hooks';
import './Hero.css';

export default function Hero() {
    const { personal, theme } = portfolioConfig;
    const { normalizedPosition } = useMousePosition();
    const deviceType = useDeviceType();
    const [isReady, setIsReady] = useState(false);
    const [textRevealed, setTextRevealed] = useState(false);
    const [taglineComplete, setTaglineComplete] = useState(false);
    const sectionRef = useRef(null);

    // Glitch effect on load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
            setTimeout(() => setTextRevealed(true), 500);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // Particle count based on device
    const particleCount = deviceType === 'mobile'
        ? theme.effects.particleCount.mobile
        : deviceType === 'tablet'
            ? theme.effects.particleCount.tablet
            : theme.effects.particleCount.desktop;

    // Split name into letters for animation
    const nameLetters = personal.name.split('');

    return (
        <section id="hero" className="hero" ref={sectionRef}>
            {/* Glitch overlay on entry */}
            <AnimatePresence>
                {!isReady && (
                    <motion.div
                        className="glitch-overlay"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="glitch-line" />
                        <div className="glitch-line" />
                        <div className="glitch-line" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3D Canvas */}
            <div className="hero-canvas">
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 60 }}
                    gl={{ antialias: true, alpha: true }}
                    dpr={[1, 2]}
                >
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.2} />
                        <Portal mouse={normalizedPosition} />
                        <ParticleField count={particleCount} mouse={normalizedPosition} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Hero content */}
            <div className="hero-content">
                {/* Name reveal */}
                <motion.h1
                    className="hero-name"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: textRevealed ? 1 : 0 }}
                >
                    {nameLetters.map((letter, index) => (
                        <motion.span
                            key={index}
                            className={`hero-letter ${letter === ' ' ? 'space' : ''}`}
                            initial={{ opacity: 0, y: 50, rotateX: -90 }}
                            animate={textRevealed ? {
                                opacity: 1,
                                y: 0,
                                rotateX: 0,
                            } : {}}
                            transition={{
                                delay: index * 0.05,
                                duration: 0.5,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Title */}
                <motion.p
                    className="hero-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={textRevealed ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: nameLetters.length * 0.05 + 0.3, duration: 0.5 }}
                >
                    {personal.title}
                </motion.p>

                {/* Tagline with typewriter */}
                <motion.div
                    className="hero-tagline-container"
                    initial={{ opacity: 0 }}
                    animate={textRevealed ? { opacity: 1 } : {}}
                    transition={{ delay: nameLetters.length * 0.05 + 0.6 }}
                >
                    <Typewriter
                        text={personal.tagline}
                        highlightWord={personal.highlightWord}
                        onComplete={() => setTaglineComplete(true)}
                        delay={nameLetters.length * 50 + 800}
                    />
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0, y: 20 }}
                    animate={taglineComplete ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    <span className="scroll-text">Enter the Dimension</span>
                    <div className="scroll-arrow">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </motion.div>
            </div>

            {/* Background grid */}
            <div className="hero-grid" />
        </section>
    );
}

// Typewriter component
function Typewriter({ text, highlightWord, onComplete, delay = 0 }) {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const startTyping = setTimeout(() => {
            setIsTyping(true);
        }, delay);

        return () => clearTimeout(startTyping);
    }, [delay]);

    useEffect(() => {
        if (!isTyping) return;

        if (displayText.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayText(text.slice(0, displayText.length + 1));
            }, 50);
            return () => clearTimeout(timer);
        } else {
            onComplete?.();
            // Keep cursor blinking for a bit then hide
            setTimeout(() => setShowCursor(false), 2000);
        }
    }, [displayText, isTyping, text, onComplete]);

    // Cursor blink
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
        return () => clearInterval(interval);
    }, []);

    // Render with highlight
    const renderText = () => {
        if (!highlightWord) return displayText;

        const parts = displayText.split(highlightWord);
        if (parts.length === 1) return displayText;

        return (
            <>
                {parts[0]}
                <span className="highlight-word">{highlightWord}</span>
                {parts[1]}
            </>
        );
    };

    return (
        <div className="typewriter">
            <span className="typewriter-prefix">&gt; </span>
            <span className="typewriter-text">{renderText()}</span>
            <span className={`typewriter-cursor ${showCursor ? 'visible' : ''}`}>_</span>
        </div>
    );
}

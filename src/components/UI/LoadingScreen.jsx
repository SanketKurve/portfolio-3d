import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(() => onComplete?.(), 500);
                    }, 500);
                    return 100;
                }
                // Non-linear progress for more realistic feel
                const increment = Math.random() * 15 + 5;
                return Math.min(prev + increment, 100);
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="loading-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    {/* Background grid */}
                    <div className="loading-grid" />

                    {/* Animated portal */}
                    <div className="loading-portal">
                        <div className="portal-ring ring-1" />
                        <div className="portal-ring ring-2" />
                        <div className="portal-ring ring-3" />
                        <div className="portal-core" />
                    </div>

                    {/* Loading content */}
                    <div className="loading-content">
                        <motion.h1
                            className="loading-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            INITIALIZING
                        </motion.h1>

                        {/* Progress bar */}
                        <div className="progress-container">
                            <div className="progress-bar">
                                <motion.div
                                    className="progress-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.2 }}
                                />
                                <div className="progress-glow" style={{ width: `${progress}%` }} />
                            </div>
                            <span className="progress-text">{Math.round(progress)}%</span>
                        </div>

                        {/* Loading tips */}
                        <motion.p
                            className="loading-tip"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {progress < 30 && "Loading reality fragments..."}
                            {progress >= 30 && progress < 60 && "Establishing dimensional link..."}
                            {progress >= 60 && progress < 90 && "Calibrating portal energy..."}
                            {progress >= 90 && "Breach imminent..."}
                        </motion.p>
                    </div>

                    {/* Scanline effect */}
                    <div className="scanline" />

                    {/* Particles */}
                    <div className="loading-particles">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="loading-particle"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: `${2 + Math.random() * 2}s`,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

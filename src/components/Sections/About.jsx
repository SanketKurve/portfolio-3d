import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks';
import { portfolioConfig } from '../../config/portfolio.config';
import './About.css';

export default function About() {
    const { personal } = portfolioConfig;
    const { ref, isVisible, hasAnimated } = useIntersectionObserver({ threshold: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section id="about" className="about section" ref={ref}>
            <div className="about-background">
                <div className="floating-shapes">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`floating-shape shape-${i + 1}`} />
                    ))}
                </div>
            </div>

            <motion.div
                className="section-content"
                variants={containerVariants}
                initial="hidden"
                animate={hasAnimated ? 'visible' : 'hidden'}
            >
                {/* Section title */}
                <motion.div className="section-title" variants={itemVariants}>
                    <h2 className="text-gradient">The Architect</h2>
                    <p>Building the future, one line of code at a time</p>
                </motion.div>

                <div className="about-grid">
                    {/* Bio panel */}
                    <motion.div className="about-panel bio-panel glass" variants={itemVariants}>
                        <div className="panel-header">
                            <span className="panel-icon">◈</span>
                            <h3>Profile</h3>
                        </div>
                        <div className="panel-content">
                            <p className="bio-text">{personal.bio.long}</p>

                            <div className="bio-meta">
                                <div className="meta-item">
                                    <span className="meta-icon">📍</span>
                                    <span>{personal.location}</span>
                                </div>
                                <div className="meta-item status-available">
                                    <span className="status-dot" />
                                    <span>{personal.status}</span>
                                </div>
                            </div>
                        </div>
                        <div className="panel-scanline" />
                    </motion.div>

                    {/* Stats panel */}
                    <motion.div className="about-panel stats-panel glass" variants={itemVariants}>
                        <div className="panel-header">
                            <span className="panel-icon">◇</span>
                            <h3>Stats</h3>
                        </div>
                        <div className="panel-content">
                            <div className="stats-grid">
                                {personal.stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        className="stat-item"
                                        initial={{ scale: 0 }}
                                        animate={hasAnimated ? { scale: 1 } : {}}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                    >
                                        <span className="stat-value">{stat.value}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="panel-scanline" />
                    </motion.div>

                    {/* Superpower panel */}
                    <motion.div className="about-panel superpower-panel glass" variants={itemVariants}>
                        <div className="panel-header">
                            <span className="panel-icon">⚡</span>
                            <h3>Superpower</h3>
                        </div>
                        <div className="panel-content">
                            <p className="superpower-text">{personal.superpower}</p>
                            <div className="superpower-bar">
                                <motion.div
                                    className="superpower-fill"
                                    initial={{ width: 0 }}
                                    animate={hasAnimated ? { width: '100%' } : {}}
                                    transition={{ delay: 0.8, duration: 1.5 }}
                                />
                            </div>
                        </div>
                        <div className="panel-scanline" />
                    </motion.div>
                </div>

                {/* Achievement badges */}
                <motion.div className="achievements-section" variants={itemVariants}>
                    <h3 className="achievements-title">Achievements Unlocked</h3>
                    <div className="achievements-grid">
                        {personal.achievements.map((achievement, index) => (
                            <motion.div
                                key={index}
                                className={`achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                                animate={hasAnimated ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                                transition={{ delay: 0.6 + index * 0.15, type: 'spring' }}
                                whileHover={{ scale: 1.05, rotateY: 10 }}
                            >
                                <div className="badge-icon">{achievement.icon}</div>
                                <div className="badge-content">
                                    <span className="badge-title">{achievement.title}</span>
                                    <span className="badge-desc">{achievement.description}</span>
                                </div>
                                <div className="badge-glow" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

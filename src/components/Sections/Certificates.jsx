import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks';
import { portfolioConfig } from '../../config/portfolio.config';
import './Certificates.css';

export default function Certificates() {
    const { certificates } = portfolioConfig;
    const { ref, hasAnimated } = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section id="certificates" className="certificates section" ref={ref}>
            <motion.div
                className="section-content"
                initial={{ opacity: 0 }}
                animate={hasAnimated ? { opacity: 1 } : {}}
            >
                <div className="section-title">
                    <h2 className="text-gradient">Achievements</h2>
                    <p>Certifications and accomplishments unlocked</p>
                </div>

                <motion.div
                    className="certificates-grid"
                    initial="hidden"
                    animate={hasAnimated ? 'visible' : 'hidden'}
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                >
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={index}
                            className={`certificate-card glass ${cert.isPlaceholder ? 'locked' : 'unlocked'}`}
                            variants={{
                                hidden: { opacity: 0, y: 30, rotateX: -15 },
                                visible: { opacity: 1, y: 0, rotateX: 0 }
                            }}
                            whileHover={{
                                scale: 1.02,
                                rotateY: 5,
                                boxShadow: '0 20px 40px rgba(0, 240, 255, 0.2)'
                            }}
                        >
                            {/* Trophy icon */}
                            <div className="cert-icon">
                                {cert.isPlaceholder ? '🔒' : '🏆'}
                            </div>

                            {/* Achievement banner */}
                            <div className="cert-banner">
                                {cert.isPlaceholder ? 'LOCKED' : 'ACHIEVEMENT UNLOCKED!'}
                            </div>

                            {/* Certificate details */}
                            <div className="cert-content">
                                <h3 className="cert-name">
                                    {cert.isPlaceholder ? '???' : cert.name}
                                </h3>
                                <p className="cert-issuer">
                                    Issued by: {cert.issuer}
                                </p>
                                <p className="cert-date">{cert.date}</p>
                            </div>

                            {/* Verify/Credential */}
                            {!cert.isPlaceholder && cert.verifyUrl ? (
                                <a
                                    href={cert.verifyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cert-verify btn"
                                >
                                    Verify
                                </a>
                            ) : cert.isPlaceholder ? (
                                <div className="cert-progress">
                                    <div className="progress-bar">
                                        <div className="progress-fill" />
                                    </div>
                                    <span>Keep Grinding!</span>
                                </div>
                            ) : null}

                            {/* Scanline effect */}
                            <div className="cert-scanline" />

                            {/* Glow border */}
                            <div className="cert-glow" />
                        </motion.div>
                    ))}

                    {/* Add placeholder cards if few certificates */}
                    {certificates.length < 4 && !certificates.some(c => c.isPlaceholder) && (
                        <motion.div
                            className="certificate-card glass locked"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <div className="cert-icon">🔒</div>
                            <div className="cert-banner">LOCKED</div>
                            <div className="cert-content">
                                <h3 className="cert-name">???</h3>
                                <p className="cert-issuer">Coming Soon...</p>
                            </div>
                            <div className="cert-progress">
                                <div className="progress-bar">
                                    <div className="progress-fill" />
                                </div>
                                <span>Keep Grinding!</span>
                            </div>
                            <div className="cert-scanline" />
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </section>
    );
}

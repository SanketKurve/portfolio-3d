import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks';
import { portfolioConfig } from '../../config/portfolio.config';
import './Projects.css';

export default function Projects() {
    const { projects } = portfolioConfig;
    const [selectedProject, setSelectedProject] = useState(null);
    const { ref, hasAnimated } = useIntersectionObserver({ threshold: 0.1 });

    const realProjects = projects.filter(p => !p.isPlaceholder);
    const placeholder = projects.find(p => p.isPlaceholder);

    return (
        <section id="projects" className="projects section" ref={ref}>
            <motion.div
                className="section-content"
                initial={{ opacity: 0 }}
                animate={hasAnimated ? { opacity: 1 } : {}}
            >
                <div className="section-title">
                    <h2 className="text-gradient">Dimension Showcase</h2>
                    <p>Projects that push the boundaries</p>
                </div>

                {/* Projects grid */}
                <motion.div
                    className="projects-grid"
                    initial="hidden"
                    animate={hasAnimated ? 'visible' : 'hidden'}
                    variants={{
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                >
                    {realProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="project-portal"
                            variants={{
                                hidden: { opacity: 0, scale: 0.8, y: 50 },
                                visible: { opacity: 1, scale: 1, y: 0 }
                            }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedProject(project)}
                            style={{ '--portal-color': project.portalColor }}
                        >
                            {/* Portal ring */}
                            <div className="portal-ring-outer">
                                <div className="portal-ring-inner">
                                    <div className="portal-content">
                                        <span className="project-category">{project.category}</span>
                                        <h3 className="project-name">{project.name}</h3>
                                        <p className="project-tagline">{project.tagline}</p>

                                        {/* Tech preview */}
                                        <div className="project-tech-preview">
                                            {project.techStack.slice(0, 3).map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="tech-tag"
                                                    style={{ borderColor: tech.color }}
                                                >
                                                    {tech.name}
                                                </span>
                                            ))}
                                            {project.techStack.length > 3 && (
                                                <span className="tech-tag more">+{project.techStack.length - 3}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Energy particles */}
                            <div className="portal-particles">
                                {[...Array(12)].map((_, i) => (
                                    <span key={i} className="particle" />
                                ))}
                            </div>

                            {/* Enter button */}
                            <div className="portal-enter">
                                <span>Enter Dimension</span>
                            </div>
                        </motion.div>
                    ))}

                    {/* Placeholder for future project */}
                    {placeholder && (
                        <motion.div
                            className="project-portal placeholder"
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 0.5, scale: 1 }
                            }}
                        >
                            <div className="portal-ring-outer">
                                <div className="portal-ring-inner">
                                    <div className="portal-content">
                                        <span className="project-category">???</span>
                                        <h3 className="project-name">{placeholder.name}</h3>
                                        <p className="project-tagline">{placeholder.tagline}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>

            {/* Project detail modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

// Project Modal Component
function ProjectModal({ project, onClose }) {
    return (
        <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="project-modal glass-heavy"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: 'spring', damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                style={{ '--portal-color': project.portalColor }}
            >
                {/* Header */}
                <div className="modal-header">
                    <button className="modal-close" onClick={onClose}>
                        ← Back
                    </button>
                    <div className="modal-actions">
                        {project.links.live && (
                            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn">
                                Launch ↗
                            </a>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="modal-content">
                    {/* Title section */}
                    <div className="modal-title-section">
                        <span className="modal-category">{project.category}</span>
                        <h2 className="modal-title">{project.name}</h2>
                        <p className="modal-tagline">{project.tagline}</p>
                    </div>

                    {/* Problem & Solution */}
                    <div className="modal-section">
                        <h4>▸ THE CHALLENGE</h4>
                        <p>{project.problem}</p>
                    </div>

                    <div className="modal-section">
                        <h4>▸ THE SOLUTION</h4>
                        <p>{project.solution}</p>
                    </div>

                    {/* Features */}
                    <div className="modal-section">
                        <h4>▸ KEY FEATURES</h4>
                        <div className="features-grid">
                            {project.features.map((feature, i) => (
                                <div key={i} className="feature-item">
                                    <span className="feature-icon">{feature.icon}</span>
                                    <div>
                                        <strong>{feature.name}</strong>
                                        <p>{feature.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="modal-section">
                        <h4>▸ TECH STACK</h4>
                        <div className="tech-stack">
                            {project.techStack.map((tech, i) => (
                                <motion.span
                                    key={i}
                                    className="tech-badge"
                                    style={{
                                        borderColor: tech.color,
                                        boxShadow: `0 0 15px ${tech.color}40`
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    {tech.name}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    {/* What I Learned */}
                    <div className="modal-section">
                        <h4>▸ WHAT I LEARNED</h4>
                        <p>{project.learned}</p>
                    </div>

                    {/* Impact */}
                    {project.impact && (
                        <div className="modal-impact">
                            <span className="impact-metric">{project.impact.metric}</span>
                            <span className="impact-desc">{project.impact.description}</span>
                        </div>
                    )}

                    {/* Links */}
                    <div className="modal-links">
                        {project.links.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn">
                                GitHub
                            </a>
                        )}
                        {project.links.live && (
                            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                View Live
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

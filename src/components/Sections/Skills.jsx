import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks';
import { portfolioConfig } from '../../config/portfolio.config';
import './Skills.css';

export default function Skills() {
    const { skills } = portfolioConfig;
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const { ref, hasAnimated } = useIntersectionObserver({ threshold: 0.1 });

    // Get unique categories
    const categories = useMemo(() => {
        const cats = ['all', ...new Set(skills.map(s => s.category))];
        return cats;
    }, [skills]);

    // Filter skills by category
    const filteredSkills = useMemo(() => {
        if (activeCategory === 'all') return skills;
        return skills.filter(s => s.category === activeCategory);
    }, [skills, activeCategory]);

    // Category colors
    const categoryColors = {
        'Programming': '#00f0ff',
        'Frontend': '#ff0080',
        'Backend': '#b026ff',
        'Database': '#39ff14',
        'AI/ML': '#ff6c00',
    };

    return (
        <section id="skills" className="skills section" ref={ref}>
            <motion.div
                className="section-content"
                initial={{ opacity: 0 }}
                animate={hasAnimated ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
            >
                {/* Section title */}
                <div className="section-title">
                    <h2 className="text-gradient">The Arsenal</h2>
                    <p>Technologies I wield with precision</p>
                </div>

                {/* Category filter */}
                <motion.div
                    className="skills-filter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                            style={{
                                '--btn-color': category === 'all' ? '#00f0ff' : categoryColors[category] || '#00f0ff'
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Skills grid - with AnimatePresence for proper transitions */}
                <div className="skills-grid">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            className="skills-grid-inner"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.05 }
                                },
                                hidden: {
                                    opacity: 0,
                                    transition: { staggerChildren: 0.02, staggerDirection: -1 }
                                }
                            }}
                        >
                            {filteredSkills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    className="skill-card glass"
                                    onClick={() => setSelectedSkill(skill)}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                            transition: { duration: 0.3 }
                                        }
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{ '--skill-color': skill.color }}
                                >
                                    <div className="skill-icon-wrapper">
                                        <div className="skill-orb" />
                                    </div>
                                    <span className="skill-name">{skill.name}</span>
                                    <div className="skill-level-bar">
                                        <motion.div
                                            className="skill-level-fill"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.level}%` }}
                                            transition={{ delay: index * 0.02, duration: 0.5 }}
                                        />
                                    </div>
                                    <span className="skill-percent">{skill.level}%</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Selected skill details */}
                <AnimatePresence>
                    {selectedSkill && (
                        <motion.div
                            className="skill-detail glass"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <button
                                className="skill-detail-close"
                                onClick={() => setSelectedSkill(null)}
                            >
                                ×
                            </button>
                            <div className="skill-detail-header">
                                <div
                                    className="skill-detail-orb"
                                    style={{ '--skill-color': selectedSkill.color }}
                                />
                                <div>
                                    <h3>{selectedSkill.name}</h3>
                                    <span className="skill-category">{selectedSkill.category}</span>
                                </div>
                            </div>
                            <p className="skill-description">{selectedSkill.description}</p>
                            <div className="skill-meta">
                                <div className="skill-meta-item">
                                    <span className="meta-label">Proficiency</span>
                                    <span className="meta-value" style={{ color: selectedSkill.color }}>
                                        {selectedSkill.level}%
                                    </span>
                                </div>
                                <div className="skill-meta-item">
                                    <span className="meta-label">Experience</span>
                                    <span className="meta-value">{selectedSkill.yearsExp} years</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}

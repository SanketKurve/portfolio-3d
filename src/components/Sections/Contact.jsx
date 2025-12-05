import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks';
import { portfolioConfig } from '../../config/portfolio.config';
import './Contact.css';

export default function Contact() {
    const { contact, personal } = portfolioConfig;
    const { ref, hasAnimated } = useIntersectionObserver({ threshold: 0.1 });
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isCopied, setIsCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(contact.email);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSubmitStatus(null), 5000);
        }, 1500);
    };

    return (
        <section id="contact" className="contact section" ref={ref}>
            <motion.div
                className="section-content"
                initial={{ opacity: 0 }}
                animate={hasAnimated ? { opacity: 1 } : {}}
            >
                <div className="section-title">
                    <h2 className="text-gradient">Connection Terminal</h2>
                    <p>Let's build something incredible together</p>
                </div>

                <div className="contact-grid">
                    {/* Terminal panel */}
                    <motion.div
                        className="contact-terminal glass"
                        initial={{ opacity: 0, x: -50 }}
                        animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Terminal header */}
                        <div className="terminal-header">
                            <div className="terminal-buttons">
                                <span className="tb red" />
                                <span className="tb yellow" />
                                <span className="tb green" />
                            </div>
                            <span className="terminal-title">transmission_portal.sh</span>
                        </div>

                        {/* Terminal content */}
                        <div className="terminal-content">
                            <div className="terminal-line">
                                <span className="prompt">$</span>
                                <span className="command">./initialize_contact</span>
                            </div>

                            <div className="terminal-output">
                                <p>Establishing secure connection...</p>
                                <p className="success">✓ Connection established</p>
                            </div>

                            {/* Contact methods */}
                            <div className="contact-methods">
                                {/* Email */}
                                <div className="contact-method">
                                    <span className="method-icon">📧</span>
                                    <div className="method-content">
                                        <span className="method-label">Email</span>
                                        <button
                                            className="method-value clickable"
                                            onClick={handleCopyEmail}
                                        >
                                            {contact.email}
                                            <span className="copy-hint">
                                                {isCopied ? '✓ Copied!' : 'Click to copy'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* GitHub */}
                                {contact.social.github && (
                                    <div className="contact-method">
                                        <span className="method-icon">🐙</span>
                                        <div className="method-content">
                                            <span className="method-label">GitHub</span>
                                            <a
                                                href={contact.social.github.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="method-value"
                                            >
                                                @{contact.social.github.username}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* LinkedIn */}
                                {contact.social.linkedin && (
                                    <div className="contact-method">
                                        <span className="method-icon">💼</span>
                                        <div className="method-content">
                                            <span className="method-label">LinkedIn</span>
                                            <a
                                                href={contact.social.linkedin.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="method-value"
                                            >
                                                View Profile
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Resume */}
                                {contact.resume.available && (
                                    <div className="contact-method">
                                        <span className="method-icon">📄</span>
                                        <div className="method-content">
                                            <span className="method-label">Resume</span>
                                            <a
                                                href={contact.resume.url}
                                                download={contact.resume.filename}
                                                className="method-value"
                                            >
                                                ⬇ Download PDF
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Cursor */}
                            <div className="terminal-line cursor-line">
                                <span className="prompt">$</span>
                                <span className="cursor">_</span>
                            </div>
                        </div>

                        {/* Scanline */}
                        <div className="terminal-scanline" />
                    </motion.div>

                    {/* Contact form */}
                    <motion.div
                        className="contact-form-panel glass"
                        initial={{ opacity: 0, x: 50 }}
                        animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="form-title">Send Transmission</h3>

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="input-field"
                                    placeholder="Sanket Kurve"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="input-field"
                                    placeholder="sanketkurve.2005@gmail.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Your Message</label>
                                <textarea
                                    id="message"
                                    className="input-field"
                                    placeholder="Let's build something amazing..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    rows={5}
                                />
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary submit-btn ${isSubmitting ? 'loading' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="loading-spinner" />
                                ) : (
                                    'Transmit Message'
                                )}
                            </button>

                            {submitStatus === 'success' && (
                                <motion.div
                                    className="submit-success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    ✓ Transmission successful! I'll respond soon.
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.footer
                    className="contact-footer"
                    initial={{ opacity: 0 }}
                    animate={hasAnimated ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    <p>Designed & Built by <span className="text-gradient">{personal.name}</span></p>
                    <p className="copyright">© {new Date().getFullYear()} All rights reserved.</p>
                </motion.footer>
            </motion.div>
        </section>
    );
}

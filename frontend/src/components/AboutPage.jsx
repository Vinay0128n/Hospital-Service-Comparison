import React from 'react';
import { motion } from 'framer-motion';
import './AboutPage.css';

function AboutPage() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-grid">
                    <motion.div
                        className="about-hero-text"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.span className="about-badge" variants={fadeInUp}>About Our Platform</motion.span>
                        <motion.h1 className="about-title" variants={fadeInUp}>
                            Expertly Navigating Your <span>Health Journey</span>
                        </motion.h1>
                        <motion.p className="about-description" variants={fadeInUp}>
                            We provide a sophisticated portal for patient-centered care, offering real-time insights into hospital services, waiting times, and transparent pricing. Our mission is to empower you with the data needed for critical healthcare decisions.
                        </motion.p>
                        <motion.div variants={fadeInUp}>
                            <button className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
                                Learn More
                            </button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="about-hero-image-wrapper"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="/about-illustration.png"
                            alt="Patient-Centered Healthcare Illustration"
                            className="about-hero-image"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Core Pillars</h2>
                        <p>We built this platform on three fundamental principles to ensure you receive the highest standard of information.</p>
                    </div>

                    <motion.div
                        className="values-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div className="value-card" variants={fadeInUp}>
                            <div className="value-icon">🔍</div>
                            <h3>Transparency</h3>
                            <p>Direct access to service costs and hospital ratings without hidden fees or obscure data.</p>
                        </motion.div>

                        <motion.div className="value-card" variants={fadeInUp}>
                            <div className="value-icon">⚡</div>
                            <h3>Efficiency</h3>
                            <p>Real-time waiting periods and bed availability to save critical minutes when they matter most.</p>
                        </motion.div>

                        <motion.div className="value-card" variants={fadeInUp}>
                            <div className="value-icon">🤝</div>
                            <h3>Compassion</h3>
                            <p>Designing workflows that respect your time and health, putting patients first in every interaction.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Banner */}
            <section className="stats-banner">
                <motion.div
                    className="stats-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <motion.div className="stat-item" variants={fadeInUp}>
                        <h4>500+</h4>
                        <p>Hospitals</p>
                    </motion.div>
                    <motion.div className="stat-item" variants={fadeInUp}>
                        <h4>12k</h4>
                        <p>Patients/Mo</p>
                    </motion.div>
                    <motion.div className="stat-item" variants={fadeInUp}>
                        <h4>98%</h4>
                        <p>Accuracy</p>
                    </motion.div>
                    <motion.div className="stat-item" variants={fadeInUp}>
                        <h4>24/7</h4>
                        <p>Availability</p>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}



export default AboutPage;

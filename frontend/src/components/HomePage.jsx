import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function HomePage() {
    const navigate = useNavigate();

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Hero Section */}
            <div className="hero-container">
                <div className="hero-content">
                    {/* LEFT COLUMN: Text + Call to Action */}
                    <div className="hero-text">
                        <motion.h1
                            className="hero-title"
                            variants={itemVariants}
                        >
                            Find the Best Hospitals for <br /> Your Medical Needs
                        </motion.h1>
                        <motion.p
                            className="hero-subtitle"
                            variants={itemVariants}
                        >
                            Compare hospital services, prices, and availability. Book your appointment at the best facility near you.
                        </motion.p>

                        <motion.button
                            className="btn-primary"
                            style={{ padding: '15px 40px', fontSize: '1.1rem', marginTop: '20px' }}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/search')}
                        >
                            Start Your Search
                        </motion.button>
                    </div>

                    {/* RIGHT COLUMN: Illustration */}
                    <motion.div
                        className="hero-image"
                        variants={itemVariants}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <img
                            src="/hero-illustration.png"
                            alt="Doctor Illustration"
                            className="hero-img-element"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section">
                <motion.div
                    className="features-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div className="feature-card" variants={itemVariants} whileHover={{ y: -5 }}>
                        <div className="feature-icon icon-blue">💙</div>
                        <h3>Compare Services</h3>
                        <p>Find and compare prices and availability of medical services like MRI, ICU, X-Ray and more.</p>
                    </motion.div>
                    <motion.div className="feature-card" variants={itemVariants} whileHover={{ y: -5 }}>
                        <div className="feature-icon icon-orange">🏷️</div>
                        <h3>Check Prices & Availability</h3>
                        <p>See costs and availability of services at nearby hospitals to make informed decisions.</p>
                    </motion.div>
                    <motion.div className="feature-card" variants={itemVariants} whileHover={{ y: -5 }}>
                        <div className="feature-icon icon-purple">📅</div>
                        <h3>Book Appointments</h3>
                        <p>Easily book an appointment online for the service you need at your preferred hospital.</p>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default HomePage;

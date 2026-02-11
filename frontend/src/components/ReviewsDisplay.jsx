import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getReviewsByHospital, getHospitalRatingStats } from '../services/api';
import { motion } from 'framer-motion';

function ReviewsDisplay() {
    const location = useLocation();
    const navigate = useNavigate();
    const { hospital } = location.state || {};

    const [reviews, setReviews] = useState([]);
    const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (hospital) {
            loadReviews();
            loadStats();
        }
    }, [hospital]);

    const loadReviews = async () => {
        try {
            const response = await getReviewsByHospital(hospital.id);
            setReviews(response.data);
        } catch (err) {
            setError('Failed to load reviews');
        } finally {
            setLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            const response = await getHospitalRatingStats(hospital.id);
            setStats(response.data);
        } catch (err) {
            console.error('Failed to load stats');
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    if (!hospital) {
        return (
            <div className="container">
                <div className="empty-state-container">
                    <div className="empty-state">
                        <h3>Hospital not found</h3>
                        <button className="btn-primary" onClick={() => navigate('/')}>
                            Back to Search
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="container reviews-container">
            <div className="back-navigation">
                <button className="btn-secondary" onClick={() => navigate(-1)}>
                    ← Back to Results
                </button>
            </div>

            <motion.div
                className="reviews-header-section"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <h1 className="reviews-title">{hospital.name}</h1>
                    <p className="reviews-location">📍 {hospital.address}, {hospital.city}</p>
                </div>

                <div className="rating-summary-card">
                    <div className="big-rating">{stats.averageRating.toFixed(1)}</div>
                    <div className="rating-info">
                        <div className="summary-stars">{renderStars(Math.round(stats.averageRating))}</div>
                        <div className="total-reviews">{stats.totalReviews} verified reviews</div>
                    </div>
                </div>
            </motion.div>

            <div className="reviews-content">
                <h3 className="section-subtitle">What Patients Say</h3>

                {loading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading patient experiences...</p>
                    </div>
                )}

                {error && <div className="error-banner">{error}</div>}

                {!loading && reviews.length === 0 && (
                    <div className="empty-reviews">
                        <div className="empty-icon">📝</div>
                        <h4>No reviews yet</h4>
                        <p>Be the first to share your experience with {hospital.name}.</p>
                    </div>
                )}

                {!loading && reviews.length > 0 && (
                    <motion.div
                        className="reviews-list"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {reviews.map((review) => (
                            <motion.div
                                key={review.id}
                                className="patient-review-card"
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                            >
                                <div className="review-meta">
                                    <div className="patient-avatar">
                                        {review.rating >= 4 ? '😊' : '😐'}
                                    </div>
                                    <div className="patient-info">
                                        <div className="patient-name">Verified Patient</div>
                                        <div className="review-date-text">{formatDate(review.createdAt)}</div>
                                    </div>
                                    <div className="card-rating">
                                        <span className="card-rating-stars">{renderStars(review.rating)}</span>
                                        <span className="card-rating-num">{review.rating}/5</span>
                                    </div>
                                </div>
                                {review.comment ? (
                                    <div className="patient-comment">"{review.comment}"</div>
                                ) : (
                                    <div className="patient-comment placeholder-comment">Patient did not leave a specific comment, but provided a {review.rating}-star rating.</div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default ReviewsDisplay;

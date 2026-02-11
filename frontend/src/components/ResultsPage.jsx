import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { compareHospitals } from '../services/api';
import { motion } from 'framer-motion';

function ResultsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { hospitals = [], serviceId, serviceName, searchCriteria } = location.state || {};
    const [selectedHospitals, setSelectedHospitals] = useState([]);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    if (!hospitals || hospitals.length === 0) {
        return (
            <motion.div
                className="container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="card empty-state-card">
                    <div className="empty-state">
                        <h3>No hospitals found</h3>
                        <p>We couldn't find any hospitals matching your criteria.</p>
                        <button className="btn-primary" onClick={() => navigate('/')}>
                            Back to Search
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    const toggleHospitalSelection = (hospitalId) => {
        setSelectedHospitals((prev) =>
            prev.includes(hospitalId)
                ? prev.filter((id) => id !== hospitalId)
                : [...prev, hospitalId]
        );
    };

    const handleCompare = async () => {
        if (selectedHospitals.length < 2) {
            alert('Please select at least 2 hospitals to compare');
            return;
        }

        try {
            const response = await compareHospitals(serviceId, selectedHospitals);
            navigate('/compare', {
                state: {
                    hospitals: response.data,
                    serviceName
                }
            });
        } catch (err) {
            alert('Failed to compare hospitals');
        }
    };

    const handleBookAppointment = (hospital) => {
        navigate('/appointment', {
            state: {
                hospital,
                serviceId,
                serviceName
            }
        });
    };

    const handleViewReviews = (hospital) => {
        navigate('/reviews', {
            state: { hospital }
        });
    };

    return (
        <div className="container">
            <div className="results-header">
                <div>
                    <h2>Search Results for <span className="highlight-text">{serviceName}</span></h2>
                    {searchCriteria && (
                        <div className="search-criteria-tag" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', margin: '10px 0' }}>
                            <span style={{ background: '#f0f9ff', padding: '5px 12px', borderRadius: '50px', fontSize: '0.85rem', color: '#0369a1', border: '1px solid #bae6fd' }}>
                                🏙️ City: <strong>{searchCriteria.city}</strong>
                            </span>
                            {searchCriteria.area && (
                                <span style={{ background: '#f0fdf4', padding: '5px 12px', borderRadius: '50px', fontSize: '0.85rem', color: '#166534', border: '1px solid #bbf7d0' }}>
                                    📍 Area: <strong>{searchCriteria.area}</strong>
                                </span>
                            )}
                            <span style={{ background: '#fafaf9', padding: '5px 12px', borderRadius: '50px', fontSize: '0.85rem', color: '#44403c', border: '1px solid #e7e5e4' }}>
                                📏 Radius: <strong>{searchCriteria.radius}km</strong>
                            </span>
                        </div>
                    )}
                    <p className="results-count">Found {hospitals.length} hospital(s) matching your criteria</p>
                </div>
                <div className="header-actions">
                    {selectedHospitals.length > 0 && (
                        <motion.button
                            className="btn-compare"
                            onClick={handleCompare}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            Compare Selected ({selectedHospitals.length})
                        </motion.button>
                    )}
                    <button className="btn-secondary" onClick={() => navigate('/')}>
                        New Search
                    </button>
                </div>
            </div>

            <motion.div
                className="results-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {hospitals.map((hospital) => (
                    <motion.div
                        key={hospital.id}
                        className={`hospital-card ${selectedHospitals.includes(hospital.id) ? 'selected-card' : ''}`}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                    >
                        <div className="card-header">
                            <div>
                                <h3>{hospital.name}</h3>
                                <p className="hospital-address">📍 {hospital.address}, {hospital.city}</p>
                            </div>
                            <div className="rating-badge">
                                <span>⭐</span> {hospital.averageRating.toFixed(1)}
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="label">Price</span>
                                    <span className="value price">₹{hospital.price}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Availability</span>
                                    <span className={`status-badge ${hospital.availability ? 'available' : 'unavailable'}`}>
                                        {hospital.availability ? 'Available' : 'Full'}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Wait Time</span>
                                    <span className="value">{hospital.waitingTime} min</span>
                                </div>
                                {hospital.distance && (
                                    <div className="info-item">
                                        <span className="label">Distance</span>
                                        <span className="value">{hospital.distance.toFixed(2)} km</span>
                                    </div>
                                )}
                            </div>

                            <div className="contact-info">
                                📞 {hospital.phone}
                            </div>
                        </div>

                        <div className="card-actions">
                            <label className="compare-checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectedHospitals.includes(hospital.id)}
                                    onChange={() => toggleHospitalSelection(hospital.id)}
                                />
                                <span>Compare</span>
                            </label>

                            <div className="action-buttons">
                                <button
                                    className="btn-book"
                                    onClick={() => handleBookAppointment(hospital)}
                                    disabled={!hospital.availability}
                                >
                                    Book Now
                                </button>
                                <button
                                    className="btn-outline"
                                    onClick={() => handleViewReviews(hospital)}
                                >
                                    Reviews
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default ResultsPage;

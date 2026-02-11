import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ComparisonView.css';

const ComparisonView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hospitals = [], serviceName } = location.state || {};

    if (!hospitals || hospitals.length === 0) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <motion.div
                    style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '48px',
                        textAlign: 'center',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        maxWidth: '500px'
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '20px'
                    }}>🏥</div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#1e293b',
                        margin: '0 0 12px 0'
                    }}>No hospitals selected for comparison</h3>
                    <p style={{
                        color: '#64748b',
                        margin: '0 0 24px 0'
                    }}>Please go back to search results and select hospitals to compare.</p>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '14px 28px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Back to Search
                    </button>
                </motion.div>
            </div>
        );
    }

    const getBestPrice = () => Math.min(...hospitals.map(h => h.price));
    const getBestWaitingTime = () => Math.min(...hospitals.map(h => h.waitingTime));
    const getBestRating = () => Math.max(...hospitals.map(h => h.averageRating));

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '40px 20px',
            position: 'relative'
        }}>
            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '10%',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto 40px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '32px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}
            >
                <div>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: '#1e293b',
                        margin: '0 0 8px 0',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Compare <span>{serviceName}</span>
                    </h2>
                    <p style={{
                        color: '#64748b',
                        margin: '0',
                        fontSize: '1.1rem'
                    }}>Side-by-side analysis of {hospitals.length} facilities</p>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: '#667eea',
                        border: '2px solid #667eea',
                        borderRadius: '12px',
                        padding: '12px 24px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    ← Back to Results
                </button>
            </motion.div>

            {/* Comparison Cards */}
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(hospitals.length, 4)}, 1fr)`,
                gap: '24px',
                alignItems: 'start'
            }}>
                {hospitals.map((hospital, index) => {
                    const isBestPrice = hospital.price === getBestPrice();
                    const isBestRating = hospital.averageRating === getBestRating();
                    const isBestWaitingTime = hospital.waitingTime === getBestWaitingTime();
                    const hasAnyBest = isBestPrice || isBestRating || isBestWaitingTime;

                    return (
                        <motion.div
                            key={hospital.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                padding: '32px',
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                                border: hasAnyBest ? '2px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.2)',
                                position: 'relative',
                                transition: 'all 0.3s ease'
                            }}
                            whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)' }}
                        >
                            {/* Best Badge */}
                            {hasAnyBest && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    right: '20px',
                                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                    color: 'white',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    boxShadow: '0 8px 20px rgba(251, 191, 36, 0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    🏆 Best Choice
                                </div>
                            )}

                            {/* Hospital Header */}
                            <div style={{ marginBottom: '24px' }}>
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    fontWeight: '700',
                                    color: '#1e293b',
                                    margin: '0 0 8px 0',
                                    lineHeight: '1.2'
                                }}>
                                    {hospital.name}
                                </h3>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: '#64748b',
                                    fontSize: '0.95rem'
                                }}>
                                    📍 {hospital.city}
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {/* Price */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '16px',
                                    background: isBestPrice ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' : '#f8fafc',
                                    borderRadius: '12px',
                                    border: isBestPrice ? '1px solid #fbbf24' : '1px solid #e2e8f0'
                                }}>
                                    <span style={{ color: '#64748b', fontWeight: '600' }}>💰 Price</span>
                                    <span style={{
                                        fontSize: '1.3rem',
                                        fontWeight: '800',
                                        color: isBestPrice ? '#d97706' : '#1e293b'
                                    }}>
                                        ₹{hospital.price}
                                        {isBestPrice && ' 🏆'}
                                    </span>
                                </div>

                                {/* Rating */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '16px',
                                    background: isBestRating ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' : '#f8fafc',
                                    borderRadius: '12px',
                                    border: isBestRating ? '1px solid #22c55e' : '1px solid #e2e8f0'
                                }}>
                                    <span style={{ color: '#64748b', fontWeight: '600' }}>⭐ Rating</span>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{
                                            fontSize: '1.3rem',
                                            fontWeight: '800',
                                            color: isBestRating ? '#16a34a' : '#1e293b'
                                        }}>
                                            {hospital.averageRating.toFixed(1)}
                                            {isBestRating && ' 🏆'}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                            {hospital.reviewCount || 0} reviews
                                        </div>
                                    </div>
                                </div>

                                {/* Waiting Time */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '16px',
                                    background: isBestWaitingTime ? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' : '#f8fafc',
                                    borderRadius: '12px',
                                    border: isBestWaitingTime ? '1px solid #3b82f6' : '1px solid #e2e8f0'
                                }}>
                                    <span style={{ color: '#64748b', fontWeight: '600' }}>⏱️ Wait Time</span>
                                    <span style={{
                                        fontSize: '1.3rem',
                                        fontWeight: '800',
                                        color: isBestWaitingTime ? '#2563eb' : '#1e293b'
                                    }}>
                                        {hospital.waitingTime} min
                                        {isBestWaitingTime && ' 🏆'}
                                    </span>
                                </div>

                                {/* Availability */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '16px',
                                    background: hospital.availability ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' : 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                                    borderRadius: '12px',
                                    border: hospital.availability ? '1px solid #22c55e' : '1px solid #ef4444'
                                }}>
                                    <span style={{ color: '#64748b', fontWeight: '600' }}>📅 Availability</span>
                                    <span style={{
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        color: hospital.availability ? '#16a34a' : '#dc2626'
                                    }}>
                                        {hospital.availability ? 'Available' : 'Unavailable'}
                                    </span>
                                </div>

                                {/* Contact */}
                                <div style={{
                                    padding: '16px',
                                    background: '#f8fafc',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    <div style={{ color: '#64748b', fontWeight: '600', marginBottom: '8px' }}>
                                        📞 Contact
                                    </div>
                                    <div style={{
                                        color: '#1e293b',
                                        fontWeight: '600',
                                        fontSize: '0.95rem'
                                    }}>
                                        {hospital.phone}
                                    </div>
                                </div>

                                {/* Location */}
                                <div style={{
                                    padding: '16px',
                                    background: '#f8fafc',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    <div style={{ color: '#64748b', fontWeight: '600', marginBottom: '8px' }}>
                                        📍 Address
                                    </div>
                                    <div style={{
                                        color: '#1e293b',
                                        fontWeight: '500',
                                        fontSize: '0.85rem',
                                        lineHeight: '1.4'
                                    }}>
                                        {hospital.address}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Legend */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                    maxWidth: '1400px',
                    margin: '40px auto 0',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '20px 32px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    justifyContent: 'center'
                }}
            >
                <span style={{ fontSize: '1.2rem' }}>🏆</span>
                <span style={{ color: '#64748b', fontWeight: '600' }}>
                    Best value or quality highlight based on your search criteria
                </span>
            </motion.div>
        </div>
    );
};

export default ComparisonView;

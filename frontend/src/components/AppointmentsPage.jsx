import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppointmentsByUserId } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

function AppointmentsPage() {
    const [user] = useState(JSON.parse(localStorage.getItem('user')));
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);
    const navigate = useNavigate();

    const fetchUserAppointments = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const response = await getAppointmentsByUserId(user.id);
            setAppointments(response.data);
            setSearched(true);
        } catch (err) {
            setError('Failed to fetch your appointments.');
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchUserAppointments();
        }
    }, [user, fetchUserAppointments]);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.25 } }
    };

    return (
        <div className="container appointments-list-container">
            <motion.div
                className="appointments-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Welcome, {user?.name || 'User'}</h1>
                <p>Here are your scheduled hospital visits.</p>
            </motion.div>

            {!user ? (
                <motion.div
                    className="no-appointments-card"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="empty-icon-large">🔐</div>
                    <h3>Login Required</h3>
                    <p>You must be logged in to view your appointments.</p>
                    <button className="btn-primary" style={{ marginTop: '20px' }} onClick={() => navigate('/login')}>
                        Sign In Now
                    </button>
                </motion.div>
            ) : (
                <div className="appointments-results">
                    {loading && (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Retrieving bookings...</p>
                        </div>
                    )}

                    <AnimatePresence>
                        {!loading && searched && appointments.length === 0 && (
                            <motion.div
                                className="no-appointments-card"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="empty-icon-large">📅</div>
                                <h3>No appointments found</h3>
                                <p>You haven't booked any appointments yet.</p>
                            </motion.div>
                        )}

                        {!loading && appointments.length > 0 && (
                            <motion.div
                                className="appointments-grid-list"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {appointments.map((appt) => (
                                    <motion.div
                                        key={appt.id}
                                        className="appointment-record-card"
                                        variants={itemVariants}
                                    >
                                        <div className="record-status-badge">{appt.status}</div>
                                        <div className="record-header">
                                            <h3>{appt.hospitalName || `Hospital ID: ${appt.hospitalId}`}</h3>
                                            <div className="record-date">
                                                <span>📅</span> {new Date(appt.appointmentDate).toLocaleDateString()}
                                                <span style={{ marginLeft: '10px' }}>⏰</span> {new Date(appt.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>

                                        <div className="record-body">
                                            <div className="record-item">
                                                <label>Patient:</label>
                                                <strong>{appt.patientName}</strong>
                                            </div>
                                            <div className="record-item">
                                                <label>Service:</label>
                                                <strong>{appt.serviceName || `ID: ${appt.serviceId}`}</strong>
                                            </div>
                                            <div className="record-item">
                                                <label>Phone:</label>
                                                <strong>{appt.patientPhone}</strong>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

export default AppointmentsPage;

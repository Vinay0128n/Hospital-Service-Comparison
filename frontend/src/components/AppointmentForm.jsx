import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookAppointment } from '../services/api';
import { motion } from 'framer-motion';

function AppointmentForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { hospital, serviceId, serviceName } = location.state || {};
    const [user] = useState(JSON.parse(localStorage.getItem('user')));

    const [formData, setFormData] = useState({
        patientName: user?.name || '',
        patientPhone: '',
        appointmentDate: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    if (!user) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <div className="empty-state-card">
                    <div className="empty-icon">🔐</div>
                    <h3>Login Required</h3>
                    <p>You must be logged in to book an appointment.</p>
                    <div className="success-actions" style={{ marginTop: '20px' }}>
                        <button className="btn-primary" onClick={() => navigate('/login', { state: { from: location } })}>
                            Login Now
                        </button>
                        <button className="btn-outline" onClick={() => navigate(-1)}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!hospital || !serviceId) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <div className="empty-state-card">
                    <div className="empty-icon">⚠️</div>
                    <h3>Invalid appointment request</h3>
                    <p>We couldn't find the hospital or service details for this booking.</p>
                    <button className="btn-primary" onClick={() => navigate('/')}>
                        Back to Search
                    </button>
                </div>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const appointmentData = {
                hospitalId: hospital.id,
                userId: user.id,
                serviceId: serviceId,
                patientName: formData.patientName,
                patientPhone: formData.patientPhone,
                appointmentDate: formData.appointmentDate
            };

            const response = await bookAppointment(appointmentData);

            if (response.data.success) {
                setSuccess(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to book appointment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="container appointment-success-container">
                <motion.div
                    className="success-card-focused"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="success-icon-large">🎉</div>
                    <h2>Appointment Booked!</h2>
                    <p className="success-text">
                        Friendly reminder: Your appointment at <strong>{hospital.name}</strong> for <strong>{serviceName}</strong> has been successfully scheduled.
                    </p>

                    <div className="success-details-box">
                        <div className="detail-row">
                            <span>Patient:</span>
                            <strong>{formData.patientName}</strong>
                        </div>
                        <div className="detail-row">
                            <span>Date:</span>
                            <strong>{new Date(formData.appointmentDate).toLocaleString()}</strong>
                        </div>
                    </div>

                    <div className="success-actions">
                        <button className="btn-primary" onClick={() => navigate('/')}>
                            Book Another
                        </button>
                        <button className="btn-outline" onClick={() => navigate('/results', { state: location.state })}>
                            Back to Results
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container appointment-container">
            <div className="back-navigation">
                <button className="btn-secondary" onClick={() => navigate(-1)}>
                    ← Back to Hospital
                </button>
            </div>

            <div className="appointment-grid">
                {/* Left Side: Summary Card */}
                <motion.div
                    className="appointment-summary-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="hospital-badge">Selected Facility</div>
                    <h2 className="summary-hospital-name">{hospital.name}</h2>
                    <p className="summary-hospital-loc">📍 {hospital.address}, {hospital.city}</p>

                    <div className="service-highlight">
                        <div className="highlight-label">Service Request</div>
                        <div className="highlight-value">{serviceName}</div>
                    </div>

                    <div className="pricing-grid">
                        <div className="price-item">
                            <span>Service Fee</span>
                            <strong>₹{hospital.price}</strong>
                        </div>
                        <div className="price-item">
                            <span>Waiting Time</span>
                            <strong>{hospital.waitingTime} mins</strong>
                        </div>
                    </div>

                    <div className="secure-badge">
                        🔒 Safe & Secure Booking
                    </div>
                </motion.div>

                {/* Right Side: Booking Form */}
                <motion.div
                    className="booking-form-card"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="form-header">
                        <h2>Patient Details</h2>
                        <p>Please provide the patient information to confirm your booking.</p>
                    </div>

                    {error && <div className="error-banner">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group-modern">
                            <label>Full Patient Name</label>
                            <input
                                type="text"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleChange}
                                required
                                placeholder="e.g. John Doe"
                            />
                        </div>

                        <div className="form-group-modern">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="patientPhone"
                                value={formData.patientPhone}
                                onChange={handleChange}
                                required
                                pattern="[0-9]{10}"
                                placeholder="10-digit mobile number"
                            />
                        </div>

                        <div className="form-group-modern">
                            <label>Preferred Date & Time</label>
                            <input
                                type="datetime-local"
                                name="appointmentDate"
                                value={formData.appointmentDate}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().slice(0, 16)}
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="btn-confirm-booking"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading ? 'Processing...' : 'Confirm Appointment'}
                        </motion.button>

                        <p className="form-footer">By clicking confirm, you agree to our terms and conditions.</p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

export default AppointmentForm;

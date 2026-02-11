import React, { useState, useEffect } from 'react';
import { getAllServices, searchHospitals, reverseGeocode } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHospital, FaMapMarkerAlt, FaSearch, FaGlobe, FaStethoscope } from 'react-icons/fa';

function SearchPage() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [radius, setRadius] = useState('20');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLocating, setIsLocating] = useState(false);
    const [locationMethod, setLocationMethod] = useState('MANUAL');
    const navigate = useNavigate();

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const response = await getAllServices();
            setServices(response.data);
        } catch (err) {
            setError('Failed to load services');
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!selectedService) {
            setError('Please select a healthcare service');
            return;
        }

        if (!city.trim()) {
            setError('City is mandatory for search');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await searchHospitals(
                selectedService,
                city.trim(),
                area.trim(),
                latitude || null,
                longitude || null,
                radius
            );

            navigate('/results', {
                state: {
                    hospitals: response.data,
                    serviceId: selectedService,
                    serviceName: services.find(s => s.id === parseInt(selectedService))?.name,
                    searchCriteria: {
                        city: city,
                        area: area,
                        location: locationMethod === 'GPS' ? 'Your Proximity' : `${area ? area + ', ' : ''}${city}`,
                        radius: radius
                    }
                }
            });
        } catch (err) {
            setError('No hospitals found. Try searching a different city or area.');
        } finally {
            setLoading(false);
        }
    };

    const getCurrentLocation = () => {
        setIsLocating(true);
        setError('');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude.toFixed(6);
                    const lon = position.coords.longitude.toFixed(6);
                    setLatitude(lat);
                    setLongitude(lon);
                    setLocationMethod('GPS');

                    try {
                        const geoResp = await reverseGeocode(lat, lon);
                        if (geoResp.data) {
                            if (geoResp.data.city) setCity(geoResp.data.city);
                            if (geoResp.data.area) setArea(geoResp.data.area);
                        }
                    } catch (err) {
                        console.error('Auto-population failed', err);
                    } finally {
                        setIsLocating(false);
                    }
                },
                (error) => {
                    setError('Unable to get GPS location. Please enter city manually.');
                    setIsLocating(false);
                }
            );
        } else {
            setError('Geolocation is not supported by your browser');
            setIsLocating(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            position: 'relative'
        }}>
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '15%',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '48px',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1), 0 10px 25px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <div style={{
                    textAlign: 'center',
                    marginBottom: '40px'
                }}>
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                            fontSize: '36px',
                            color: 'white',
                            boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
                        }}
                    >
                        🏥
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        style={{
                            fontSize: '2rem',
                            fontWeight: '800',
                            color: '#1e293b',
                            margin: '0 0 12px 0',
                            lineHeight: '1.2'
                        }}
                    >
                        Find Your Perfect Healthcare Provider
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{
                            fontSize: '1.1rem',
                            color: '#64748b',
                            margin: '0',
                            fontWeight: '500'
                        }}
                    >
                        Search hospitals, compare prices, and book appointments
                    </motion.p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                            border: '1px solid #fecaca',
                            borderRadius: '12px',
                            padding: '16px 20px',
                            marginBottom: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: '#dc2626',
                            fontWeight: '500'
                        }}
                    >
                        <span style={{ fontSize: '18px' }}>⚠️</span>
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '700',
                            color: '#1e293b',
                            fontSize: '1rem'
                        }}>
                            1. Healthcare Service
                        </label>
                        <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                height: '100%',
                                padding: '16px 20px',
                                border: '2px solid #e2e8f0',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                background: 'white',
                                color: '#1e293b',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="">-- Select a Service --</option>
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '700',
                            color: '#1e293b',
                            fontSize: '1rem'
                        }}>
                            2. Select Location
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '5px',
                                    fontSize: '0.85rem',
                                    color: '#64748b',
                                    fontWeight: '600'
                                }}>
                                    City (Required)*
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Pune"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        background: 'white',
                                        color: '#1e293b',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '5px',
                                    fontSize: '0.85rem',
                                    color: '#64748b',
                                    fontWeight: '600'
                                }}>
                                    Area (Optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Wakad"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        background: 'white',
                                        color: '#1e293b',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>
                        </div>

                        <motion.button
                            type="button"
                            onClick={getCurrentLocation}
                            disabled={isLocating}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                width: '100%',
                                padding: '14px 20px',
                                background: isLocating
                                    ? 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'
                                    : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                                border: '2px solid #0ea5e9',
                                borderRadius: '12px',
                                color: isLocating ? 'white' : '#0284c7',
                                fontWeight: '600',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                        >
                            <span>{isLocating ? '📍 Accessing GPS...' : '📍 Add Precise Location (GPS)'}</span>
                        </motion.button>
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '700',
                            color: '#1e293b',
                            fontSize: '1rem'
                        }}>
                            3. Search Distance
                        </label>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            padding: '15px',
                            background: '#f8fafc',
                            borderRadius: '12px',
                            border: '1px solid #f1f5f9'
                        }}>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={radius}
                                onChange={(e) => setRadius(e.target.value)}
                                style={{ flex: 1, accentColor: '#0ea5e9' }}
                            />
                            <span style={{
                                fontWeight: '800',
                                color: '#0ea5e9',
                                fontSize: '1.2rem',
                                minWidth: '60px'
                            }}>{radius}km</span>
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading || isLocating}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            width: '100%',
                            padding: '18px 24px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                            marginTop: '20px'
                        }}
                    >
                        {loading ? '🔍 Optimizing Results...' : '🔍 Search Hospitals'}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}

export default SearchPage;

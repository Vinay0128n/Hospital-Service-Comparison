import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SearchPage from './components/SearchPage';
import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage';
import ComparisonView from './components/ComparisonView';
import AppointmentForm from './components/AppointmentForm';
import ReviewsDisplay from './components/ReviewsDisplay';
import Navbar from './components/Navbar';
import AboutPage from './components/AboutPage';
import AppointmentsPage from './components/AppointmentsPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AnimatedPage from './components/AnimatedPage';
import './App.css';

function AppContent() {
    const location = useLocation();

    return (
        <div className="App">
            <Navbar />
            <div className="container">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
                        <Route path="/search" element={<AnimatedPage><SearchPage /></AnimatedPage>} />
                        <Route path="/login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
                        <Route path="/register" element={<AnimatedPage><RegisterPage /></AnimatedPage>} />
                        <Route path="/my-appointments" element={<AnimatedPage><AppointmentsPage /></AnimatedPage>} />
                        <Route path="/about" element={<AnimatedPage><AboutPage /></AnimatedPage>} />
                        <Route path="/results" element={<AnimatedPage><ResultsPage /></AnimatedPage>} />
                        <Route path="/compare" element={<AnimatedPage><ComparisonView /></AnimatedPage>} />
                        <Route path="/appointment" element={<AnimatedPage><AppointmentForm /></AnimatedPage>} />
                        <Route path="/reviews" element={<AnimatedPage><ReviewsDisplay /></AnimatedPage>} />
                    </Routes>
                </AnimatePresence>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;

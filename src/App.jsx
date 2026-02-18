import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Home from './components/Home';
import LiveCrowdTracker from './components/LiveCrowdTracker';
import SevaScheduling from './components/SevaScheduling';
import SevaBooking from './components/SevaBooking';
import OnlineDarshanBooking from './components/OnlineDarshanBooking';
import EDonation from './components/E-Donation';
import PrasadamTracking from './components/PrasadamTracking';
import EAccommodation from './components/E-Accommodation';
import ScrollToTop from './components/ScrollToTop';
import AccommodationBooking from './components/AccommodationBooking';
import PilgrimPath from './components/PilgrimPath';
import Login from './components/Login';
import { motion } from 'framer-motion';

// Separate Home component to include Hero
const HomePage = () => (
  <>
    <Hero />
    <Home />
  </>
);

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    // Sync state with localStorage if needed
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleSetAuth = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-temple-ivory text-temple-dark">
        {/* Only show Navbar and Footer if authenticated */}
        {isAuthenticated && <Navbar setAuth={handleSetAuth} />}

        <main className="flex-grow">
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <Login setAuth={handleSetAuth} />
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/live-tracker"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <LiveCrowdTracker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sevas"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <SevaScheduling />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-seva/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <SevaBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/darshan"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <OnlineDarshanBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hundi"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <EDonation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/prasadam"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <PrasadamTracking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accommodation"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <EAccommodation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-accommodation"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AccommodationBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/route-planner"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <PilgrimPath />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;

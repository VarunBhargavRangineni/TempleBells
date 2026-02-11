import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { motion } from 'framer-motion';

// Separate Home component to include Hero
const HomePage = () => (
  <>
    <Hero />
    <Home />
  </>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-temple-ivory text-temple-dark">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/live-tracker" element={<LiveCrowdTracker />} />
            <Route path="/sevas" element={<SevaScheduling />} />
            <Route path="/book-seva/:id" element={<SevaBooking />} />
            <Route path="/darshan" element={<OnlineDarshanBooking />} />
            <Route path="/hundi" element={<EDonation />} />
            <Route path="/prasadam" element={<PrasadamTracking />} />
            <Route path="/accommodation" element={<EAccommodation />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

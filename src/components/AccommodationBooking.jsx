import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Calendar, Users, Phone, Mail, CreditCard,
    ChevronRight, CheckCircle2, MapPin, BedDouble,
    User, Clock, Star, AlertCircle, Download, Shield,
    ArrowLeft
} from 'lucide-react';

const AccommodationBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { accommodation, templeName } = location.state || {};

    const [step, setStep] = useState(1); // 1: Dates, 2: Guest Details, 3: Payment, 4: Confirmation
    const [bookingData, setBookingData] = useState({
        checkIn: '',
        checkOut: '',
        rooms: 1,
        adults: 2,
        children: 0,
        guestName: '',
        email: '',
        phone: '',
        address: '',
        idProof: '',
        specialRequests: '',
        paymentMode: 'online'
    });
    const [bookingId, setBookingId] = useState('');

    // Redirect if no data is present
    useEffect(() => {
        if (!accommodation) {
            navigate('/route-planner');
        }
    }, [accommodation, navigate]);

    if (!accommodation) return null;

    // Calculate nights and total price
    const calculateNights = () => {
        if (!bookingData.checkIn || !bookingData.checkOut) return 0;
        const start = new Date(bookingData.checkIn);
        const end = new Date(bookingData.checkOut);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return nights > 0 ? nights : 0;
    };

    const calculateTotal = () => {
        const nights = calculateNights();
        const basePrice = parseInt(accommodation?.price?.replace(/[^0-9]/g, '') || 0);
        const roomTotal = basePrice * bookingData.rooms * nights;
        const tax = roomTotal * 0.12; // 12% GST
        return {
            subtotal: roomTotal,
            tax: tax,
            total: roomTotal + tax
        };
    };

    const handleInputChange = (field, value) => {
        setBookingData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step < 4) {
            if (step === 3) {
                // Generate booking ID
                const id = `TTD${Date.now().toString().slice(-8)}`;
                setBookingId(id);
            }
            setStep(step + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSubmit = () => {
        // Here you would typically send the booking data to your backend
        console.log('Booking submitted:', bookingData);
        // Navigate back after a delay or to a success page
        setTimeout(() => {
            navigate('/route-planner');
        }, 3000);
    };

    const pricing = calculateTotal();
    const nights = calculateNights();

    return (
        <div className="min-h-screen bg-temple-ivory pb-20 pt-6 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 bg-white rounded-full shadow-md text-slate-600 hover:text-kumkum hover:bg-slate-50 transition-all"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-temple-dark uppercase tracking-tight">
                            Reserve <span className="text-kumkum">Accommodation</span>
                        </h1>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                            Secure your stay at {templeName}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-kumkum/10">
                    <div className="grid grid-cols-1 lg:grid-cols-4">
                        {/* Sidebar: Selected Accommodation */}
                        <div className="lg:col-span-1 bg-gradient-to-b from-[#9B1B1B] to-[#450a0a] text-white p-8">
                            <div className="sticky top-28">
                                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 mb-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <BedDouble size={24} />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 block">Selected Room</span>
                                            <h3 className="font-bold text-lg leading-tight">{accommodation.name}</h3>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-white/80 font-medium">
                                            <MapPin size={14} className="text-white/40" />
                                            {templeName}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-white/80 font-medium">
                                            <Star size={14} className="text-amber-400" fill="currentColor" />
                                            {accommodation.rating} Rating
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-white/80 font-medium capitalize">
                                            <div className="w-1 h-3 bg-emerald-400 rounded-full" />
                                            {accommodation.type} Stay
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Indicator */}
                                <div className="space-y-6 mt-12">
                                    {[
                                        { s: 1, l: "Dates & Guests" },
                                        { s: 2, l: "Guest Details" },
                                        { s: 3, l: "Payment Mode" },
                                        { s: 4, l: "Confirmation" }
                                    ].map((item) => (
                                        <div key={item.s} className="flex items-center gap-4 group">
                                            <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-black border-2 transition-all ${step === item.s ? 'bg-white text-kumkum border-white shadow-lg shadow-black/20 scale-110' : step > item.s ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-transparent border-white/20 text-white/30'
                                                }`}>
                                                {step > item.s ? <CheckCircle2 size={20} /> : item.s}
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest transition-all ${step === item.s ? 'text-white translate-x-1' : 'text-white/40'}`}>
                                                {item.l}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-3">
                            <div className="p-8 md:p-12">
                                <AnimatePresence mode="wait">
                                    {/* Step 1: Date Selection */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-8"
                                        >
                                            <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-8">
                                                <div className="p-3 bg-red-50 text-kumkum rounded-xl">
                                                    <Calendar size={24} />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-black text-temple-dark uppercase tracking-tight">Select Travel Dates</h2>
                                                    <p className="text-slate-500 text-sm font-medium">When are you planning to visit?</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Check-in Date</label>
                                                    <input
                                                        type="date"
                                                        value={bookingData.checkIn}
                                                        onChange={(e) => handleInputChange('checkIn', e.target.value)}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-kumkum/20 focus:ring-4 focus:ring-kumkum/5 outline-none transition-all font-bold text-slate-700"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Check-out Date</label>
                                                    <input
                                                        type="date"
                                                        value={bookingData.checkOut}
                                                        onChange={(e) => handleInputChange('checkOut', e.target.value)}
                                                        min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-kumkum/20 focus:ring-4 focus:ring-kumkum/5 outline-none transition-all font-bold text-slate-700"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Rooms</label>
                                                    <select
                                                        value={bookingData.rooms}
                                                        onChange={(e) => handleInputChange('rooms', parseInt(e.target.value))}
                                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-kumkum/20 focus:ring-4 focus:ring-kumkum/5 outline-none transition-all font-bold text-slate-700 appearance-none"
                                                    >
                                                        {[...Array(Math.min(accommodation.rooms || 5, 5))].map((_, i) => (
                                                            <option key={i + 1} value={i + 1}>{i + 1} Room{i > 0 ? 's' : ''}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Adults</label>
                                                    <select
                                                        value={bookingData.adults}
                                                        onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-kumkum/20 focus:ring-4 focus:ring-kumkum/5 outline-none transition-all font-bold text-slate-700 appearance-none"
                                                    >
                                                        {[1, 2, 3, 4, 5, 6].map(n => (
                                                            <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Children</label>
                                                    <select
                                                        value={bookingData.children}
                                                        onChange={(e) => handleInputChange('children', parseInt(e.target.value))}
                                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-kumkum/20 focus:ring-4 focus:ring-kumkum/5 outline-none transition-all font-bold text-slate-700 appearance-none"
                                                    >
                                                        {[0, 1, 2, 3, 4].map(n => (
                                                            <option key={n} value={n}>{n} Child{n > 1 ? 'ren' : ''}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-2xl flex gap-4">
                                                <AlertCircle className="text-blue-600 shrink-0" size={24} />
                                                <div>
                                                    <p className="font-bold text-blue-900 text-sm mb-1 uppercase tracking-tight">Stay Guidelines</p>
                                                    <ul className="text-xs space-y-2 text-blue-800 font-medium">
                                                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full" /> Check-in: 12:00 PM | Check-out: 10:00 AM</li>
                                                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full" /> Direct ID verification required at reception</li>
                                                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full" /> Bookings are only valid for the specified pilgrims</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Guest Details */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-8"
                                        >
                                            <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-8">
                                                <div className="p-3 bg-red-50 text-kumkum rounded-xl">
                                                    <User size={24} />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-black text-temple-dark uppercase tracking-tight">Primary Devotee Info</h2>
                                                    <p className="text-slate-500 text-sm font-medium">As per Government ID proof</p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                                    <input
                                                        type="text"
                                                        value={bookingData.guestName}
                                                        onChange={(e) => handleInputChange('guestName', e.target.value)}
                                                        placeholder="Enter full name"
                                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-kumkum/20 focus:ring-4 focus:ring-kumkum/5 outline-none transition-all font-bold text-slate-700"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                                                        <input
                                                            type="email"
                                                            value={bookingData.email}
                                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                                            placeholder="your@email.com"
                                                            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-kumkum/20 focus:ring-4 focus:ring-kumkum/5 outline-none transition-all font-bold text-slate-700"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                                                        <input
                                                            type="tel"
                                                            value={bookingData.phone}
                                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                                            placeholder="+91 XXXXX XXXXX"
                                                            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-kumkum/20 focus:ring-4 focus:ring-kumkum/5 outline-none transition-all font-bold text-slate-700"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">ID Proof Type</label>
                                                    <select
                                                        value={bookingData.idProof}
                                                        onChange={(e) => handleInputChange('idProof', e.target.value)}
                                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-kumkum/20 focus:ring-4 focus:ring-kumkum/5 outline-none transition-all font-bold text-slate-700 appearance-none"
                                                    >
                                                        <option value="">Select ID Type</option>
                                                        <option value="aadhaar">Aadhaar Card</option>
                                                        <option value="voter">Voter ID</option>
                                                        <option value="pan">PAN Card</option>
                                                        <option value="passport">Passport No</option>
                                                    </select>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Address</label>
                                                    <textarea
                                                        value={bookingData.address}
                                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                                        placeholder="Your permanent address"
                                                        rows={3}
                                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-kumkum/20 focus:ring-4 focus:ring-kumkum/5 outline-none transition-all font-bold text-slate-700 resize-none"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 3: Payment */}
                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-8"
                                        >
                                            <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-8">
                                                <div className="p-3 bg-red-50 text-kumkum rounded-xl">
                                                    <CreditCard size={24} />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-black text-temple-dark uppercase tracking-tight">Payment Method</h2>
                                                    <p className="text-slate-500 text-sm font-medium">Choose your preferred way to pay</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className={`flex items-center gap-6 p-6 border-2 rounded-3xl cursor-pointer transition-all ${bookingData.paymentMode === 'online' ? 'border-kumkum bg-red-50/50 ring-4 ring-kumkum/5' : 'border-slate-100 hover:border-slate-200'}`}>
                                                    <input
                                                        type="radio"
                                                        name="paymentMode"
                                                        value="online"
                                                        checked={bookingData.paymentMode === 'online'}
                                                        onChange={(e) => handleInputChange('paymentMode', e.target.value)}
                                                        className="w-5 h-5 text-kumkum border-2 border-slate-300 focus:ring-0"
                                                    />
                                                    <div className="flex-grow">
                                                        <div className="font-black text-temple-dark uppercase tracking-tight text-base mb-1">Instant Online Payment</div>
                                                        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">UPI • Cards • Net Banking</div>
                                                    </div>
                                                    <Shield size={32} className="text-emerald-500 opacity-60" />
                                                </label>

                                                <label className={`flex items-center gap-6 p-6 border-2 rounded-3xl cursor-pointer transition-all ${bookingData.paymentMode === 'counter' ? 'border-kumkum bg-red-50/50 ring-4 ring-kumkum/5' : 'border-slate-100 hover:border-slate-200'}`}>
                                                    <input
                                                        type="radio"
                                                        name="paymentMode"
                                                        value="counter"
                                                        checked={bookingData.paymentMode === 'counter'}
                                                        onChange={(e) => handleInputChange('paymentMode', e.target.value)}
                                                        className="w-5 h-5 text-kumkum border-2 border-slate-300 focus:ring-0"
                                                    />
                                                    <div className="flex-grow">
                                                        <div className="font-black text-temple-dark uppercase tracking-tight text-base mb-1">Pay at Front Desk</div>
                                                        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Cash or Card at Check-in</div>
                                                    </div>
                                                </label>
                                            </div>

                                            <div className="p-8 bg-slate-50 rounded-3xl space-y-4">
                                                <h4 className="font-black text-slate-800 uppercase tracking-[0.2em] text-[10px]">Price Breakdown</h4>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between text-sm font-bold text-slate-600">
                                                        <span>Base Fare ({nights} night{nights > 1 ? 's' : ''})</span>
                                                        <span>₹{pricing.subtotal.toLocaleString('en-IN')}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm font-bold text-slate-600">
                                                        <span>Taxes & Service GST (12%)</span>
                                                        <span>₹{pricing.tax.toLocaleString('en-IN')}</span>
                                                    </div>
                                                    <div className="h-px bg-slate-200 my-2" />
                                                    <div className="flex justify-between items-center pt-2">
                                                        <span className="font-black text-temple-dark uppercase tracking-tight">Total Amount</span>
                                                        <span className="text-3xl font-black text-kumkum">₹{pricing.total.toLocaleString('en-IN')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 4: Confirmation */}
                                    {step === 4 && (
                                        <motion.div
                                            key="step4"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-12 space-y-8"
                                        >
                                            <div className="relative inline-block">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.2, type: "spring" }}
                                                    className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/20"
                                                >
                                                    <CheckCircle2 size={48} />
                                                </motion.div>
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="absolute inset-0 bg-emerald-500 rounded-full"
                                                />
                                            </div>

                                            <div>
                                                <h3 className="text-4xl font-black text-temple-dark uppercase tracking-tighter mb-2">Booking Success</h3>
                                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Your sacred stay is confirmed</p>
                                            </div>

                                            <div className="bg-kumkum/5 border-2 border-kumkum border-dashed rounded-3xl p-8 max-w-sm mx-auto">
                                                <div className="text-[10px] font-black text-kumkum uppercase tracking-[0.3em] mb-2">Booking Identifier</div>
                                                <div className="text-4xl font-black text-kumkum tracking-widest">{bookingId}</div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                                                <button className="px-6 py-4 bg-slate-100 text-slate-700 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                                                    <Download size={16} />
                                                    Voucher
                                                </button>
                                                <button
                                                    onClick={handleSubmit}
                                                    className="px-6 py-4 bg-kumkum text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-kumkum/90 transition-all shadow-lg shadow-kumkum/20"
                                                >
                                                    Finish
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Bottom Navigation */}
                                {step < 4 && (
                                    <div className="flex items-center justify-between gap-6 pt-12 border-t border-gray-100 mt-12">
                                        <button
                                            onClick={handlePrevious}
                                            disabled={step === 1}
                                            className={`px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            disabled={
                                                (step === 1 && (!bookingData.checkIn || !bookingData.checkOut || nights === 0)) ||
                                                (step === 2 && (!bookingData.guestName || !bookingData.email || !bookingData.phone || !bookingData.idProof))
                                            }
                                            className={`px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2 transition-all shadow-xl ${(step === 1 && (!bookingData.checkIn || !bookingData.checkOut || nights === 0)) || (step === 2 && (!bookingData.guestName || !bookingData.email || !bookingData.phone || !bookingData.idProof))
                                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                                : 'bg-kumkum text-white hover:bg-kumkum/90 shadow-kumkum/20'
                                                }`}
                                        >
                                            {step === 3 ? 'Confirm Booking' : 'Continue'}
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccommodationBooking;


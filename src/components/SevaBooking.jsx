import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, Clock, CreditCard, Calendar as CalendarIcon,
    User, Fingerprint, ChevronDown, ArrowRight, X, Check
} from 'lucide-react';
import { SEVA_DIRECTORY, TTDCalendar } from './SevaScheduling';

const SevaBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bookingSeva, setBookingSeva] = useState(null);
    const [bookingDate, setBookingDate] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [bookingStatus, setBookingStatus] = useState('idle');
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        gotram: '',
        idProof: 'Aadhar Card'
    });

    useEffect(() => {
        let timer;
        if (bookingStatus === 'success') {
            timer = setTimeout(() => {
                setBookingStatus('idle');
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [bookingStatus]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const isFormValid = formData.fullName.trim() !== '' && formData.age.trim() !== '' && formData.gotram.trim() !== '';

    useEffect(() => {
        const seva = SEVA_DIRECTORY.find(s => s.id === id);
        if (seva) {
            setBookingSeva(seva);
        } else {
            navigate('/sevas');
        }
    }, [id, navigate]);

    if (!bookingSeva) return null;

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-0 pb-12 font-outfit relative">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50l25-25-25-25-25 25z' fill='%239B1B1B'/%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }} />
            </div>



            {/* SEVA DETAILS HEADER */}
            <div className="pt-12 pb-8 px-8 md:px-16 lg:px-24 relative z-10 border-b border-gray-100/50">
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => navigate('/sevas')}
                    className="absolute top-8 md:top-12 right-8 md:right-16 lg:right-24 flex items-center gap-2 text-black hover:text-kumkum transition-all duration-500 group"
                >
                    <ChevronLeft size={22} className="group-hover:-translate-x-2 transition-transform duration-500" />
                    <div className="flex flex-col items-start">
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase leading-none mb-1.5 pointer-events-none">BACK TO SEVAS</span>
                        <div className="w-6 h-[2px] bg-kumkum/20 group-hover:w-full group-hover:bg-kumkum transition-all duration-500" />
                    </div>
                </motion.button>
                <div className="max-w-4xl">
                    <p className="text-[11px] font-black text-kumkum tracking-[0.3em] uppercase mb-4 opacity-80">{bookingSeva.tag}</p>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-temple-dark mb-6 tracking-tight leading-none uppercase whitespace-nowrap">{bookingSeva.title}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 border-l-2 border-kumkum/20 pl-4">{bookingSeva.temple}</p>
                    <div className="flex flex-wrap gap-4">
                        <div className="px-6 py-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center"><Clock size={14} className="text-orange-500" /></div>
                            <span className="text-xs font-black text-temple-dark">{bookingSeva.time}</span>
                        </div>
                        <div className="px-6 py-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center"><CreditCard size={14} className="text-kumkum" /></div>
                            <span className="text-xs font-black text-kumkum">{bookingSeva.price}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 w-full flex flex-col md:flex-row items-start">
                {/* LEFT PANEL - CALENDAR */}
                <div className="w-full md:w-[45%] bg-gray-50/20 px-8 py-12 md:px-16 lg:px-24 border-r border-gray-100/50 min-h-[600px]">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full" />
                        <div className="relative">
                            <TTDCalendar selectedDate={bookingDate} onSelectDate={(d) => { setBookingDate(d); setShowForm(true); }} />
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL - BOOKING FORM */}
                <div className="w-full md:w-[55%] px-8 py-12 md:px-16 lg:px-24 flex flex-col">
                    {!showForm ? (
                        <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-24 h-24 bg-gray-50/50 rounded-[2.5rem] flex items-center justify-center mb-12 border border-gray-100 shadow-sm">
                                <CalendarIcon size={40} className="text-gray-300" />
                            </motion.div>
                            <h4 className="text-2xl font-black text-temple-dark uppercase tracking-[0.25em] mb-4">Select Slot</h4>
                            <p className="text-sm font-medium text-gray-400 max-w-sm leading-relaxed">Choose an available date from the spiritual calendar to unlock your booking session.</p>
                        </div>
                    ) : (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-12">
                                <div className="space-y-2">
                                    <h4 className="text-[10px] font-black text-temple-dark tracking-[0.3em] uppercase">Primary Devotee Info</h4>
                                    <div className="w-16 h-1 bg-kumkum rounded-full" />
                                </div>
                                <div className="px-6 py-3 bg-green-50 text-green-600 rounded-2xl text-[11px] font-black border border-green-100 shadow-sm flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    SLOT: FEB {bookingDate}, 2026
                                </div>
                            </div>

                            <div className="flex-1 space-y-12">
                                <div className="grid md:grid-cols-[1.5fr_1fr] gap-12">
                                    <div className="space-y-5">
                                        <label className="text-[11px] font-black text-gray-400 tracking-widest uppercase ml-1">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-kumkum transition-colors" size={20} />
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                placeholder="As per Identity ID"
                                                className="w-full h-18 pl-16 pr-8 bg-white/50 backdrop-blur-sm rounded-[1.5rem] border border-gray-100 text-base font-bold focus:bg-white focus:border-kumkum/30 focus:ring-8 focus:ring-kumkum/5 outline-none transition-all shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-5">
                                        <label className="text-[11px] font-black text-gray-400 tracking-widest uppercase ml-1">Age</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleInputChange}
                                            placeholder="Years"
                                            className="w-full h-18 px-10 bg-white/50 backdrop-blur-sm rounded-[1.5rem] border border-gray-100 text-base font-bold focus:bg-white focus:border-kumkum/30 focus:ring-8 focus:ring-kumkum/5 outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="space-y-5">
                                        <label className="text-[11px] font-black text-gray-400 tracking-widest uppercase ml-1">Gotram</label>
                                        <input
                                            type="text"
                                            name="gotram"
                                            value={formData.gotram}
                                            onChange={handleInputChange}
                                            placeholder="Specify Gotram"
                                            className="w-full h-18 px-10 bg-white/50 backdrop-blur-sm rounded-[1.5rem] border border-gray-100 text-base font-bold focus:bg-white focus:border-kumkum/30 focus:ring-8 focus:ring-kumkum/5 outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-5">
                                        <label className="text-[11px] font-black text-gray-400 tracking-widest uppercase ml-1">Identity Proof</label>
                                        <div className="relative group">
                                            <Fingerprint className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-kumkum transition-colors" size={20} />
                                            <select
                                                name="idProof"
                                                value={formData.idProof}
                                                onChange={handleInputChange}
                                                className="w-full h-18 pl-16 pr-12 bg-white/50 backdrop-blur-sm rounded-[1.5rem] border border-gray-100 text-base font-bold appearance-none focus:bg-white focus:border-kumkum/30 focus:ring-8 focus:ring-kumkum/5 outline-none transition-all shadow-sm"
                                            >
                                                <option>Aadhar Card</option>
                                                <option>Passport</option>
                                                <option>Voter ID</option>
                                            </select>
                                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 pt-14 border-t border-gray-100/50">
                                <div className="flex justify-between items-end mb-12">
                                    <div>
                                        <p className="text-[11px] font-black text-gray-400 tracking-[0.3em] uppercase mb-2">Contribution Value</p>
                                        <p className="text-sm font-bold text-gray-300">All prices inclusive of sacred offerings</p>
                                    </div>
                                    <span className="text-6xl font-black text-kumkum tracking-tighter">{bookingSeva.price}</span>
                                </div>

                                <button
                                    disabled={!isFormValid}
                                    onClick={() => setBookingStatus('success')}
                                    className={`w-full group/btn relative py-8 rounded-[2rem] font-black tracking-[0.3em] text-[12px] transition-all duration-300
                                                ${isFormValid
                                            ? 'bg-temple-dark text-white shadow-2xl overflow-hidden active:scale-95 hover:shadow-kumkum/20 cursor-pointer'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'}`}
                                >
                                    {isFormValid && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-kumkum to-temple-maroon opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                                    )}
                                    <div className="relative z-10 flex items-center justify-center gap-5 text-center">
                                        CONFIRM & PROCEED TO PAYMENT
                                        <ArrowRight size={22} className={`transition-transformDuration-300 ${isFormValid ? 'group-hover/btn:translate-x-2' : ''}`} />
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
            {/* SUCCESS POPUP */}
            {/* SUCCESS POPUP */}
            <AnimatePresence>
                {bookingStatus === 'success' && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-temple-dark/80 backdrop-blur-xl"
                            onClick={() => setBookingStatus('idle')}
                        />
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, y: 50 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                                transition: { type: "spring", damping: 20, stiffness: 300 }
                            }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-[#FDFBF7] rounded-[3rem] p-12 text-center flex flex-col items-center shadow-2xl max-w-md w-full border-4 border-white ring-1 ring-gray-100 overflow-hidden"
                        >
                            {/* Decorative Background */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-orange-50 to-transparent" />

                            <button
                                onClick={() => setBookingStatus('idle')}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-kumkum transition-all z-20"
                            >
                                <X size={20} />
                            </button>

                            <div className="relative z-10 mb-8">
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", damping: 15, delay: 0.1 }}
                                    className="w-24 h-24 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 relative"
                                >
                                    <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-ping" />
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <motion.path
                                            d="M20 6L9 17l-5-5"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        />
                                    </svg>
                                </motion.div>
                            </div>

                            <div className="relative z-10 space-y-3">
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl font-black text-temple-dark uppercase tracking-tight"
                                >
                                    Seva Confirmed!
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-sm font-bold text-gray-400 max-w-[80%] mx-auto leading-relaxed"
                                >
                                    Your booking for <span className="text-kumkum">{bookingSeva.title}</span> has been successfully reserved.
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="pt-6"
                                >
                                    <div className="px-6 py-3 bg-white rounded-xl border border-gray-100 shadow-sm inline-block">
                                        <p className="text-[10px] font-black text-temple-gold uppercase tracking-[0.2em]">May {bookingSeva.deity || 'the Divine'} Bless You</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Timer Progress Bar */}
                            <motion.div
                                initial={{ scaleX: 1 }}
                                animate={{ scaleX: 0 }}
                                transition={{ duration: 5, ease: "linear" }}
                                className="absolute bottom-0 left-0 h-1.5 bg-green-500 origin-left w-full"
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </div>
    );
};

export default SevaBooking;

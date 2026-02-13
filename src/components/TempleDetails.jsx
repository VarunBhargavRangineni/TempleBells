import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Clock, Car, Utensils, Home, Info, MapPin,
    Users, AlertCircle, CheckCircle2, Building,
    ChevronRight, BedDouble, Star, Coffee,
    Sparkles
} from 'lucide-react';

const MOCK_DETAILS = {
    // ... (rest of MOCK_DETAILS remains the same)
    defaults: {
        timings: { open: "06:00 AM", close: "09:00 PM", break: "01:00 PM - 03:00 PM" },
        accommodation: [
            { name: "Temple Guest House", type: "Devasthanam", status: "Available", rooms: 15, price: "₹500", rating: 4.2 },
            { name: "Standard Lodge", type: "Private", status: "Available", rooms: 8, price: "₹1200", rating: 3.8 },
            { name: "Pilgrim Sadan", type: "Dormitory", status: "Available", rooms: 50, price: "₹100", rating: 3.5 },
            { name: "VIP Cottages", type: "Devasthanam", status: "Reserved", rooms: 0, price: "₹1500", rating: 4.5 },
            { name: "Tourist Home", type: "Government", status: "Available", rooms: 12, price: "₹800", rating: 4.0 },
            { name: "Highway Motel", type: "Private", status: "Available", rooms: 20, price: "₹1800", rating: 3.9 }
        ],
        annaprasadam: [
            { name: "Main Annadhanam Hall", status: "Serving", crowd: "Moderate", waitTime: "20 mins", servingNow: "Rice, Sambar, Buttermilk", capacity: "500/batch" },
            { name: "Prasadam Counter", status: "Open", crowd: "Low", waitTime: "5 mins", servingNow: "Laddu, Pulihora", capacity: "Takeaway" }
        ],
        parking: [
            { name: "Main Entrance Parking", status: "Available", capacity: 200, filled: 45 },
            { name: "Street Parking", status: "Full", capacity: 50, filled: 50 }
        ]
    },
    "Kanaka Durga": {
        timings: { open: "04:00 AM", close: "10:00 PM", break: "Naivedyam (12:30-1:00 PM)" },
        accommodation: [
            { name: "Mallikarjuna Mahamandapam", type: "Devasthanam", status: "Available", rooms: 42, price: "₹800", rating: 4.5 },
            { name: "Hotel Ilapuram", type: "Private", status: "Filling Fast", rooms: 5, price: "₹3500", rating: 4.3 },
            { name: "Devasthanam Choultries", type: "Dormitory", status: "Waitlist", rooms: 0, price: "₹100", rating: 3.5 },
            { name: "Grand Vijayawada", type: "Luxury", status: "Available", rooms: 18, price: "₹5000+", rating: 4.8 },
            { name: "Quality Hotel D V Manor", type: "Luxury", status: "Available", rooms: 12, price: "₹4500", rating: 4.6 },

        ],
        annaprasadam: [
            { name: "Mallikarjuna Mahamandapam", status: "Serving", crowd: "High", waitTime: "45 mins", servingNow: "Pulihora, Daddojanam", capacity: "2000/batch" },
            { name: "Annadanam Building", status: "Serving", crowd: "Moderate", waitTime: "20 mins", servingNow: "Rice, Sambar, Curry", capacity: "1200/batch" },
            { name: "Indrakeeladri Counter", status: "Open", crowd: "Very High", waitTime: "60 mins", servingNow: "Tiger Rice (Pulihora)", capacity: "Takeaway" }
        ],
        parking: [
            { name: "Ghat Road Multi-level", status: "Full", capacity: 300, filled: 300 },
            { name: "Bhavani Island Ferry", status: "Available", capacity: 800, filled: 230 },
            { name: "OMC Grounds", status: "Available", capacity: 1500, filled: 600 }
        ]
    },
    "Tirumala Sri Venkateswara Swamy": {
        timings: { open: "02:30 AM", close: "01:30 AM", break: "None" },
        accommodation: [
            { name: "Vakulmatha Rest House", type: "Devasthanam", status: "Booked", rooms: 0, price: "₹1500", rating: 4.6 },
            { name: "Nandakam Guest House", type: "Devasthanam", status: "Available", rooms: 124, price: "₹500", rating: 4.4 },
            { name: "Panchajanyam", type: "Devasthanam", status: "Filling Fast", rooms: 12, price: "₹750", rating: 4.1 },
            { name: "Kaustubham", type: "VIP", status: "Reserved", rooms: 0, price: "₹2500", rating: 4.9 },
            { name: "Sapthagiri Guest House", type: "Mutt", status: "Available", rooms: 8, price: "₹1000", rating: 3.8 },
            { name: "HVC Cottages", type: "Cottage", status: "Available", rooms: 15, price: "₹2000", rating: 4.3 },

        ],
        annaprasadam: [
            { name: "MTV Annaprasadam Complex", status: "Serving 24x7", crowd: "Very High", waitTime: "90 mins", servingNow: "Full South Indian Meal", capacity: "4500/batch" },
            { name: "PAC-II (Madhavam)", status: "Serving", crowd: "High", waitTime: "30 mins", servingNow: "Upma, Pongal, Coffee", capacity: "Continuous" },
            { name: "Vaikuntam Q Complex", status: "Serving", crowd: "Moderate", waitTime: "Breaks", servingNow: "Milk, Coffee", capacity: "Continuous" }
        ],
        parking: [
            { name: "Rambagicha 1", status: "Available", capacity: 1000, filled: 850 },
            { name: "Rambagicha 2", status: "Available", capacity: 1200, filled: 400 },
            { name: "MBC Parking", status: "Full", capacity: 300, filled: 300 }
        ]
    },
    "Srisailam Mallikarjuna": {
        timings: { open: "04:30 AM", close: "10:00 PM", break: "03:30 PM - 06:00 PM" },
        accommodation: [
            { name: "Ganga Sadan", type: "Devasthanam", status: "Available", rooms: 22, price: "₹600", rating: 4.0 },
            { name: "Pathaleswara Sadan", type: "VIP", status: "Available", rooms: 8, price: "₹1500", rating: 4.5 },
            { name: "Haritha Hotel", type: "Tourism", status: "Filling Fast", rooms: 3, price: "₹2200", rating: 4.2 },
            { name: "Mallikarjuna Sadan", type: "Devasthanam", status: "Booked", rooms: 0, price: "₹800", rating: 4.1 },
            { name: "Siva Sadan", type: "Private", status: "Available", rooms: 10, price: "₹1200", rating: 3.9 },

        ],
        annaprasadam: [
            { name: "Nitya Annadana Satram", status: "Closed", crowd: "Low", waitTime: "0 mins", servingNow: "Next Serving: 07:00 PM", capacity: "1500/batch" },
            { name: "Arya Vysya Annadanam", status: "Serving", crowd: "Moderate", waitTime: "15 mins", servingNow: "Full Meals", capacity: "500/batch" },
            { name: "Laddu Counter", status: "Open", crowd: "High", waitTime: "20 mins", servingNow: "Laddu, Pulihora", capacity: "Sales" }
        ],
        parking: [
            { name: "Main Teacher's Park", status: "Available", capacity: 500, filled: 120 },
            { name: "Mallamma Kanneeru", status: "Available", capacity: 300, filled: 45 }
        ]
    },
    "Yadadri Lakshmi Narasimha": {
        timings: { open: "04:00 AM", close: "09:45 PM", break: "12:45 PM - 03:00 PM" },
        accommodation: [
            { name: "Yadadri Donor Cottages", type: "Devasthanam", status: "Available", rooms: 45, price: "₹1000", rating: 4.7 },
            { name: "Haritha Grand", type: "Tourism", status: "Booked", rooms: 0, price: "₹2800", rating: 4.4 },
            { name: "Laxmi Nilayam", type: "Private", status: "Available", rooms: 12, price: "₹1500", rating: 4.1 },
            { name: "Punnami Hotel", type: "Tourism", status: "Filling Fast", rooms: 4, price: "₹2200", rating: 4.2 },
        ],
        annaprasadam: [
            { name: "Hare Krishna Golden Temple", status: "Serving", crowd: "Moderate", waitTime: "15 mins", servingNow: "Veg Biryani, Curd Rice", capacity: "2500/batch" },
            { name: "Devasthanam Annadanam", status: "Serving", crowd: "High", waitTime: "25 mins", servingNow: "Rice, Dal, Curry", capacity: "1000/batch" },
            { name: "Prasada Vitarana", status: "Open", crowd: "Low", waitTime: "5 mins", servingNow: "Laddu, Vada", capacity: "Sales" }
        ],
        parking: [
            { name: "Hill Base Parking", status: "Available", capacity: 2000, filled: 650 },
            { name: "VIP Hilltop", status: "Restricted", capacity: 50, filled: 20 }
        ]
    }
};

const StatusBadge = ({ status }) => {
    const getStyles = () => {
        const s = status.toLowerCase();
        if (s.includes('available') || s.includes('serving') || s.includes('open')) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
        if (s.includes('filling') || s.includes('moderate')) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
        if (s.includes('full') || s.includes('booked') || s.includes('high') || s.includes('waitlist')) return "text-rose-500 bg-rose-500/10 border-rose-500/20";
        return "text-slate-500 bg-slate-500/10 border-slate-500/20";
    };

    return (
        <span className={`px-1.5 py-0.5 rounded-[4px] text-[8px] uppercase font-black tracking-widest border ${getStyles()} flex items-center gap-1 w-fit`}>
            <span className={`w-1 h-1 rounded-full bg-current ${(status.toLowerCase().includes('available') || status.toLowerCase().includes('serving')) ? 'animate-pulse' : ''}`} />
            {status}
        </span>
    );
};

const DetailCard = ({ temple, index, isLast }) => {
    const data = MOCK_DETAILS[temple.name] || MOCK_DETAILS.defaults;
    const [activeTab, setActiveTab] = useState('stays');
    const navigate = useNavigate();

    const foodList = Array.isArray(data.annaprasadam) ? data.annaprasadam : [data.annaprasadam];
    const stayList = data.accommodation;

    const handleBookClick = (accommodation) => {
        navigate('/book-accommodation', {
            state: {
                accommodation,
                templeName: temple.name
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative pl-0 md:pl-0"
            id={`temple-detail-${temple.id}`}
        >
            <div className="bg-white rounded-[1.5rem] p-0 border border-kumkum/10 shadow-xl overflow-hidden group">

                {/* ANIMATED HEADER SECTION - Reduced Height */}
                <div className="relative h-32 md:h-40 overflow-hidden bg-gradient-to-br from-[#9B1B1B] via-[#7f1d1d] to-[#450a0a]">

                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    >
                        <motion.div
                            animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 w-full h-full"
                        />
                    </div>

                    {/* Large Watermark Number - Scaled Down */}
                    <span className="absolute -bottom-8 -right-2 text-[6rem] md:text-[8rem] font-black text-white/5 leading-none z-0 tracking-tighter select-none">
                        {(index + 1).toString().padStart(2, '0')}
                    </span>

                    {/* Content Overlay - Compact Padding */}
                    <div className="relative z-10 p-5 md:p-6 h-full flex flex-col justify-end">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="px-2 py-0.5 bg-white/10 backdrop-blur-md rounded text-white/90 text-[8px] font-black uppercase tracking-[0.2em] border border-white/20 shadow-sm"
                            >
                                Stop {(index + 1).toString().padStart(2, '0')}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="px-2 py-0.5 bg-emerald-500/20 backdrop-blur-md rounded text-emerald-300 text-[8px] font-black uppercase tracking-[0.1em] border border-emerald-500/30 flex items-center gap-1.5 shadow-sm"
                            >
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                </span>
                                Live
                            </motion.div>
                        </div>

                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight shadow-black drop-shadow-md leading-none"
                        >
                            {temple.name}
                        </motion.h3>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap items-center gap-3 text-white/70 text-[10px] md:text-xs font-bold uppercase tracking-wide"
                        >
                            <span className="flex items-center gap-1"><MapPin size={12} className="text-orange-400" /> {temple.location}</span>
                            <span className="text-white/20">|</span>
                            <span className="flex items-center gap-1"><Clock size={12} className="text-orange-400" /> {data.timings.open} - {data.timings.close}</span>
                        </motion.div>
                    </div>
                </div>

                {/* Tab Navigation - Compact */}
                <div className="flex items-center gap-1 px-4 md:px-6 pt-3 border-b border-gray-100 bg-white sticky top-0 z-20">
                    {['stays', 'food', 'parking'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative px-3 md:px-4 py-2.5 rounded-t-lg text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] transition-all flex items-center gap-1.5 ${activeTab === tab ? 'text-kumkum bg-red-50/50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                        >
                            {tab === 'stays' && <BedDouble size={14} />}
                            {tab === 'food' && <Utensils size={14} />}
                            {tab === 'parking' && <Car size={14} />}
                            <span className="hidden md:inline">{tab === 'stays' ? 'Accommodation' : tab === 'food' ? 'Annaprasadam' : 'Parking'}</span>
                            <span className="md:hidden">{tab === 'stays' ? 'Stays' : tab === 'food' ? 'Food' : 'Parking'}</span>

                            {activeTab === tab && (
                                <motion.div layoutId={`underline-${index}`} className="absolute bottom-0 left-0 right-0 h-0.5 bg-kumkum" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content Area - Sharper & Compact */}
                <div className="p-4 md:p-6 min-h-[300px] bg-white">
                    <AnimatePresence mode="wait">
                        {activeTab === 'stays' && (
                            <motion.div
                                key="stays"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                            >
                                {stayList.map((stay, i) => (
                                    <div key={i} className="flex flex-col p-4 bg-white border border-gray-100 rounded-xl hover:border-kumkum/20 hover:shadow-[0_4px_20px_rgb(0,0,0,0.04)] transition-all group/card">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 border border-slate-100 rounded px-1 py-px">{stay.type}</span>
                                                    <div className="flex text-amber-400">
                                                        {[...Array(5)].map((_, si) => (
                                                            <Star key={si} size={8} fill={si < Math.floor(stay.rating) ? "currentColor" : "none"} className={si < Math.floor(stay.rating) ? "" : "text-slate-200"} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <h4 className="font-bold text-temple-dark text-sm group-hover/card:text-kumkum transition-colors">{stay.name}</h4>
                                            </div>
                                            <StatusBadge status={stay.status} />
                                        </div>

                                        <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-50 border-dashed">
                                            <div className="text-right">
                                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-px">{stay.rooms > 0 ? `${stay.rooms} Rooms` : 'Full'}</p>
                                                <p className="text-sm font-black text-slate-800">{stay.price}<span className="text-[9px] text-slate-400 font-medium">/night</span></p>
                                            </div>
                                            <button
                                                onClick={() => stay.rooms > 0 && handleBookClick(stay)}
                                                className={`h-7 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all shadow-sm ${stay.rooms > 0 ? 'bg-slate-900 text-white hover:bg-kumkum hover:shadow-kumkum/20 shadow-slate-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                                            >
                                                {stay.rooms > 0 ? 'Book' : 'Notify'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* FOOD SECTION - Sharper & Compact */}
                        {activeTab === 'food' && (
                            <motion.div
                                key="food"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 gap-3"
                            >
                                {foodList.map((food, i) => (
                                    <div key={i} className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:border-orange-200 transition-all group/food">
                                        {/* Left: Status & Name */}
                                        <div className="w-full md:w-1/3 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100 pb-3 md:pb-0 md:pr-4 border-dashed">
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover/food:scale-110 transition-transform duration-300">
                                                        <Utensils size={16} />
                                                    </div>
                                                    <StatusBadge status={food.status} />
                                                </div>
                                                <h4 className="font-black text-temple-dark text-base leading-tight mb-1">{food.name}</h4>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 w-fit px-1.5 py-0.5 rounded">Cap: {food.capacity}</p>
                                            </div>
                                        </div>

                                        {/* Right: Stats */}
                                        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="p-3 bg-slate-50/50 rounded-lg border border-slate-100">
                                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1"><Users size={10} /> Crowd</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-black text-slate-700">{food.crowd}</span>
                                                </div>
                                                <div className="w-full h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: food.crowd === 'Very High' ? '90%' : food.crowd === 'High' ? '75%' : food.crowd === 'Moderate' ? '50%' : '25%' }}
                                                        transition={{ duration: 1 }}
                                                        className={`h-full rounded-full ${food.crowd === 'High' || food.crowd === 'Very High' ? 'bg-rose-500' : food.crowd === 'Moderate' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                                    />
                                                </div>
                                            </div>

                                            <div className="p-3 bg-slate-50/50 rounded-lg border border-slate-100">
                                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1"><Clock size={10} /> Wait</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-black text-slate-700">{food.waitTime}</span>
                                                </div>
                                            </div>

                                            <div className="col-span-1 sm:col-span-2 p-3 bg-orange-50/30 rounded-lg border border-orange-100/50 flex items-center gap-3">
                                                <div className="p-1.5 bg-orange-100 rounded-md text-orange-600"><Coffee size={12} /></div>
                                                <div>
                                                    <p className="text-[8px] font-black uppercase tracking-widest text-orange-400 mb-px">Menu</p>
                                                    <p className="text-xs font-bold text-slate-700">{food.servingNow}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* PARKING SECTION - Sharper & Compact */}
                        {activeTab === 'parking' && (
                            <motion.div
                                key="parking"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-3"
                            >
                                {data.parking.map((lot, i) => {
                                    const percent = Math.round((lot.filled / lot.capacity) * 100);
                                    const isFull = percent >= 95;
                                    const isHigh = percent > 75;

                                    return (
                                        <div key={i} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow h-fit transition-shadow group/parking">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isFull ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-600'}`}>
                                                <Car size={20} />
                                            </div>

                                            <div className="flex-grow">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h4 className="font-black text-temple-dark text-sm">{lot.name}</h4>
                                                    <StatusBadge status={lot.status} />
                                                </div>

                                                <div className="relative pt-1">
                                                    <div className="flex justify-between text-[9px] font-black text-slate-400 mb-1 uppercase tracking-wide">
                                                        <span>Occupancy</span>
                                                        <span className={`${isFull ? 'text-rose-500' : 'text-slate-600'}`}>{lot.filled} / {lot.capacity}</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${percent}%` }}
                                                            transition={{ duration: 1, ease: "easeOut" }}
                                                            className={`h-full rounded-full shadow-sm ${isFull ? 'bg-rose-500' : isHigh ? 'bg-amber-400' : 'bg-emerald-500'}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                <div className="mt-4 flex items-start gap-2 p-3 bg-sky-50/50 rounded-xl border border-sky-100">
                                    <Info size={14} className="text-sky-500 shrink-0 mt-0.5" />
                                    <p className="text-[10px] text-sky-800 font-medium leading-relaxed">
                                        Parking slots deplete rapidly during Seva timings.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

const TempleDetails = ({ temples }) => {
    if (!temples || temples.length === 0) return null;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-kumkum/5 rounded-full text-kumkum text-[9px] font-black tracking-[0.2em] uppercase mb-3 border border-kumkum/10"
                >
                    <Sparkles size={10} />
                    Live Pilgrimage Intelligence
                </motion.div>
                <h2 className="text-2xl md:text-4xl font-black text-temple-dark uppercase tracking-tight mb-2 leading-none">
                    Temple <span className="text-kumkum text-transparent bg-clip-text bg-gradient-to-r from-kumkum to-red-600">Essentials</span>
                </h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] max-w-xl mx-auto">
                    Real-time amenities status for your journey
                </p>
            </div>

            <div className="space-y-12">
                {temples.map((temple, index) => (
                    <DetailCard
                        key={temple.id}
                        temple={temple}
                        index={index}
                        isLast={index === temples.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default TempleDetails;

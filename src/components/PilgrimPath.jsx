import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { MapPin, Navigation, Clock, Search, Map as MapIcon, Compass, AlertCircle, MapPinOff, ChevronDown, Sparkles, ArrowLeft, ChevronRight, Car, Info, Utensils, Home } from 'lucide-react';
import TempleDetails from './TempleDetails';

// Temple Database
const TEMPLES = [
    // Andhra Pradesh
    { id: 1, name: "Tirumala Sri Venkateswara Swamy", location: "Tirupati", state: "Andhra Pradesh", lat: 13.68, lng: 79.35, opening: "03:00", closing: "23:59", type: "Major", famousFor: "Lord Venkateswara", description: "The world's richest temple and most visited spiritual destination." },
    { id: 2, name: "Padmavathi Ammavari", location: "Tiruchanur", state: "Andhra Pradesh", lat: 13.61, lng: 79.45, opening: "05:00", closing: "21:00", famousFor: "Goddess Padmavathi", description: "Dedicated to the consort of Lord Venkateswara." },
    { id: 3, name: "Sri Kalahasti Temple", location: "Srikalahasti", state: "Andhra Pradesh", lat: 13.75, lng: 79.70, opening: "06:00", closing: "21:00", famousFor: "Vayu Lingam (Lord Shiva)", description: "One of the Panchabhoota Sthalams representing Air." },
    { id: 4, name: "Kanipakam Vinayaka", location: "Kanipakam", state: "Andhra Pradesh", lat: 13.29, lng: 79.03, opening: "04:00", closing: "21:30", famousFor: "Swayambhu Vinayaka", description: "The deity is said to be growing in size over time." },
    { id: 5, name: "Srisailam Mallikarjuna", location: "Srisailam", state: "Andhra Pradesh", lat: 16.07, lng: 78.86, opening: "04:30", closing: "22:00", famousFor: "Jyotirlinga & Shakti Peetha", description: "One of the 12 Jyotirlingas and 18 Shakti Peethas." },
    { id: 6, name: "Kanaka Durga", location: "Vijayawada", state: "Andhra Pradesh", lat: 16.51, lng: 80.60, opening: "04:00", closing: "22:00", famousFor: "Goddess Durga", description: "Famous temple situated on Indrakeeladri hill." },
    { id: 7, name: "Annavaram Satyanarayana Swamy", location: "Annavaram", state: "Andhra Pradesh", lat: 17.28, lng: 82.40, opening: "05:00", closing: "21:00", famousFor: "Lord Satyanarayana", description: "Second most important temple in AP after Tirumala." },
    { id: 8, name: "Simhachalam Narasimha", location: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.76, lng: 83.25, opening: "04:00", closing: "21:00", famousFor: "Lord Narasimha", description: "Deity is always covered with sandalwood paste." },
    { id: 9, name: "Draksharamam Bhimeswara", location: "East Godavari", state: "Andhra Pradesh", lat: 16.80, lng: 82.06, opening: "06:00", closing: "20:00", famousFor: "Pancha Rama Kshetra", description: "One of the five Pancharama Kshetras." },
    { id: 10, name: "Ahobilam Narasimha", location: "Kurnool", state: "Andhra Pradesh", lat: 15.13, lng: 78.71, opening: "06:00", closing: "19:00", famousFor: "Nava Narasimha Temples", description: "Complex of nine temples dedicated to Narasimha." },

    // Telangana
    { id: 11, name: "Yadadri Lakshmi Narasimha", location: "Yadadri", state: "Telangana", lat: 17.58, lng: 78.94, opening: "04:00", closing: "21:30", famousFor: "Lord Narasimha", description: "Newly renovated architectural marvel of Telangana." },
    { id: 12, name: "Bhadrachalam Sita Ramachandra", location: "Bhadrachalam", state: "Telangana", lat: 17.67, lng: 80.89, opening: "04:00", closing: "21:00", famousFor: "Lord Rama", description: "Known as the Dakshina Ayodhya." },
    { id: 13, name: "Vemulawada Rajarajeshwara", location: "Vemulawada", state: "Telangana", lat: 18.47, lng: 78.87, opening: "04:00", closing: "21:00", famousFor: "Lord Shiva", description: "Known as the Dakshina Kashi." },
    { id: 14, name: "Basara Saraswati", location: "Basara", state: "Telangana", lat: 18.87, lng: 77.96, opening: "04:00", closing: "20:30", famousFor: "Goddess Saraswati", description: "One of the two famous Saraswati temples in India." },
    { id: 15, name: "Kaleshwaram Mukteswara", location: "Kaleshwaram", state: "Telangana", lat: 18.81, lng: 79.90, opening: "04:00", closing: "20:00", famousFor: "Lord Shiva (Twin Lingas)", description: "Unique temple with two Lingas on a single pedestal." },
    { id: 16, name: "Chilkur Balaji", location: "Hyderabad", state: "Telangana", lat: 17.36, lng: 78.30, opening: "05:00", closing: "20:00", famousFor: "Visa Balaji", description: "Known as 'Visa Balaji' for settling visa issues." },
    { id: 17, name: "Ramappa Temple", location: "Warangal", state: "Telangana", lat: 18.26, lng: 79.94, opening: "06:00", closing: "18:00", famousFor: "Architectural Marvel (Lord Shiva)", description: "UNESCO World Heritage site known for floating bricks." },
    { id: 18, name: "Bhadrakali Temple", location: "Warangal", state: "Telangana", lat: 18.00, lng: 79.57, opening: "05:00", closing: "20:00", famousFor: "Goddess Bhadrakali", description: "One of the oldest temples for Goddess Bhadrakali." },
];

const VehicleModel = ({ type = "car", size = 32, className = "", rotation = 0, color = "#dc2626" }) => {
    const isBus = type === "bus";
    const isBike = type === "bike";
    const isAuto = type === "auto";
    const isLorry = type === "lorry";

    return (
        <motion.div
            className={`relative ${className}`}
            style={{
                width: isBike ? size * 0.6 : (isBus || isLorry ? size * 1.2 : size),
                height: isBike ? size * 1.2 : (isBus ? size * 3.5 : isLorry ? size * 4 : isAuto ? size * 1.8 : size * 2.2)
            }}
            animate={{ y: [0, -1, 0] }}
            transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
        >
            {/* Dynamic Shadow */}
            <div
                className="absolute inset-0 bg-black/20 blur-md rounded-full translate-y-2 scale-95"
                style={{ transform: `rotate(${-rotation}deg) translateY(8px)` }}
            />

            <svg viewBox={isBus ? "0 0 45 120" : isLorry ? "0 0 50 140" : isBike ? "0 0 20 50" : "0 0 40 88"} width="100%" height="100%" fill="none">
                {isBike ? (
                    <g>
                        {/* Shadow for Bike Elements */}
                        <rect x="5" y="8" width="10" height="35" rx="5" fill="black" opacity="0.1" />

                        {/* Wheels Layer */}
                        <rect x="8" y="4" width="4" height="8" rx="2" fill="#0f172a" />
                        <rect x="8" y="38" width="4" height="10" rx="2" fill="#0f172a" />

                        {/* Chassis / Engine Block Area */}
                        <rect x="7" y="12" width="6" height="28" rx="1" fill="#1e293b" />
                        <rect x="6.5" y="15" width="7" height="12" rx="0.5" fill="#334155" />
                        {/* Cooling Fins / Detail */}
                        {[...Array(4)].map((_, i) => (
                            <line key={i} x1="7" y1={18 + i * 2} x2="13" y2={18 + i * 2} stroke="#0f172a" strokeWidth="0.5" />
                        ))}

                        {/* Side Exhaust Pipe (Chrome) */}
                        <path d="M13 25 L14.5 25 L15 45 L13.5 45 Z" fill="#94a3b8" />
                        <circle cx="14" cy="25" r="1.5" fill="#64748b" />

                        {/* Main Body / Fuel Tank - Premium Teardrop Shape */}
                        <defs>
                            <linearGradient id="bikeTankGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={color} />
                                <stop offset="50%" stopColor="white" stopOpacity="0.3" />
                                <stop offset="100%" stopColor={color} />
                            </linearGradient>
                        </defs>
                        <path d="M6 14 C6 8 14 8 14 14 L14 26 C14 30 6 30 6 26 Z" fill={color} />
                        <path d="M7 14 C7 10 13 10 13 14 L13 24 C13 28 7 28 7 24 Z" fill="url(#bikeTankGrad)" />

                        {/* Handlebars with Real Mirrors */}
                        <path d="M3 18 L17 18" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                        <rect x="2" y="16" width="3" height="4" rx="1" fill="#0f172a" />
                        <rect x="15" y="16" width="3" height="4" rx="1" fill="#0f172a" />
                        {/* Mirrors */}
                        <circle cx="2" cy="14" r="2.5" fill="#334155" />
                        <circle cx="2" cy="14" r="1.5" fill="#94a3b8" opacity="0.6" />
                        <circle cx="18" cy="14" r="2.5" fill="#334155" />
                        <circle cx="18" cy="14" r="1.5" fill="#94a3b8" opacity="0.6" />

                        {/* Seat (Black Textured) */}
                        <path d="M7 26 L13 26 L13 36 L7 36 Z" rx="2" fill="#0f172a" />

                        {/* Rider Detailed (Helmet + Shoulders) */}
                        <path d="M5 24 C5 22 15 22 15 24 L14 30 L6 30 Z" fill="#1e293b" opacity="0.8" />
                        <circle cx="10" cy="26" r="5" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />
                        {/* Helmet Visor Reflection */}
                        <path d="M7 24 A4.5 4.5 0 0 1 13 24" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" />

                        {/* Front LED Headlight */}
                        <rect x="8.5" y="10" width="3" height="2" rx="1" fill="#fef9c3" />
                        <circle cx="10" cy="11" r="5" fill="#fef9c3" fillOpacity="0.2" className="animate-pulse" />

                        {/* Tail Light */}
                        <rect x="9" y="46" width="2" height="2" rx="0.5" fill="#ef4444" />
                    </g>
                ) : isAuto ? (
                    <g>
                        <path d="M5 10 L35 10 L38 70 L2 70 Z" fill="#facc15" />
                        <rect x="8" y="15" width="24" height="20" rx="2" fill="#1e293b" />
                        <rect x="4" y="8" width="32" height="4" fill="#1e293b" />
                        <rect x="2" y="65" width="36" height="5" fill="#1e293b" />
                    </g>
                ) : isBus ? (
                    <g>
                        <rect x="2" y="2" width="41" height="116" rx="8" fill={color} />
                        <rect x="6" y="10" width="33" height="15" rx="2" fill="#1e293b" />
                        {[...Array(5)].map((_, i) => (
                            <rect key={i} x="6" y={35 + i * 15} width="8" height="10" rx="1" fill="#475569" />
                        ))}
                        {[...Array(5)].map((_, i) => (
                            <rect key={i} x="31" y={35 + i * 15} width="8" height="10" rx="1" fill="#475569" />
                        ))}
                    </g>
                ) : isLorry ? (
                    <g>
                        <rect x="2" y="2" width="46" height="40" rx="4" fill={color} />
                        <rect x="4" y="45" width="42" height="90" rx="2" fill="#64748b" />
                        <rect x="8" y="8" width="30" height="12" fill="#1e293b" />
                        <rect x="4" y="38" width="42" height="4" fill="#1e293b" />
                    </g>
                ) : (
                    <g>
                        <defs>
                            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#9b1c1c" />
                                <stop offset="50%" stopColor="#dc2626" />
                                <stop offset="100%" stopColor="#9b1c1c" />
                            </linearGradient>
                        </defs>
                        <rect x="2" y="4" width="36" height="80" rx="10" fill="url(#bodyGradient)" />
                        <rect x="2" y="4" width="36" height="80" rx="10" stroke="#7f1d1d" strokeWidth="0.5" />
                        <path d="M10 15C10 12 14 10 20 10C26 10 30 12 30 15V22H10V15Z" fill="#b91c1c" />
                        <rect x="6" y="24" width="28" height="42" rx="6" fill="#020617" />
                        <rect x="4" y="6" width="10" height="4" rx="2" fill="#fef9c3" />
                        <rect x="26" y="6" width="10" height="4" rx="2" fill="#fef9c3" />
                    </g>
                )}
            </svg>
        </motion.div>
    );
};

const CITIES = {
    // Andhra Pradesh
    "Amaravati": { lat: 16.57, lng: 80.35 },
    "Anantapur": { lat: 14.68, lng: 77.60 },
    "Chittoor": { lat: 13.21, lng: 79.10 },
    "Eluru": { lat: 16.71, lng: 81.10 },
    "Guntur": { lat: 16.30, lng: 80.43 },
    "Kadapa": { lat: 14.47, lng: 78.82 },
    "Kakinada": { lat: 16.98, lng: 82.24 },
    "Kurnool": { lat: 15.82, lng: 78.03 },
    "Nellore": { lat: 14.44, lng: 79.98 },
    "Ongole": { lat: 15.50, lng: 80.05 },
    "Rajahmundry": { lat: 17.00, lng: 81.78 },
    "Srikakulam": { lat: 18.30, lng: 83.90 },
    "Tirupati": { lat: 13.62, lng: 79.41 },
    "Vijayawada": { lat: 16.50, lng: 80.64 },
    "Visakhapatnam": { lat: 17.68, lng: 83.21 },
    "Vizianagaram": { lat: 18.11, lng: 83.40 },

    // Telangana
    "Adilabad": { lat: 19.66, lng: 78.53 },
    "Hyderabad": { lat: 17.38, lng: 78.48 },
    "Karimnagar": { lat: 18.43, lng: 79.13 },
    "Khammam": { lat: 17.24, lng: 80.14 },
    "Mahbubnagar": { lat: 16.73, lng: 77.98 },
    "Nalgonda": { lat: 17.05, lng: 79.26 },
    "Nizamabad": { lat: 18.67, lng: 78.10 },
    "Ramagundam": { lat: 18.76, lng: 79.47 },
    "Siddipet": { lat: 18.10, lng: 78.85 },
    "Warangal": { lat: 17.96, lng: 79.59 },
};

const CITIES_BY_REGION = {
    "Andhra Pradesh": [
        "Amaravati", "Anantapur", "Chittoor", "Eluru", "Guntur", "Kadapa", "Kakinada",
        "Kurnool", "Nellore", "Ongole", "Rajahmundry", "Srikakulam", "Tirupati",
        "Vijayawada", "Visakhapatnam", "Vizianagaram"
    ],
    "Telangana": [
        "Adilabad", "Hyderabad", "Karimnagar", "Khammam", "Mahbubnagar",
        "Nalgonda", "Nizamabad", "Ramagundam", "Siddipet", "Warangal"
    ]
};

const TIME_OPTIONS = [
    "00:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
];

const DivineDropdown = ({ value, onChange, options, icon: Icon, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        if (!isOpen) setCurrentRegion(null);
    }, [isOpen]);

    const isNested = !Array.isArray(options);
    const displayOptions = currentRegion ? options[currentRegion] : (isNested ? Object.keys(options) : options);

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors z-20 ${isOpen ? 'text-kumkum' : 'text-kumkum/40'}`}>
                <Icon size={20} />
            </div>
            <button
                type="button"
                className="w-full pl-12 pr-10 py-4 bg-white border border-kumkum/10 rounded-2xl focus:ring-4 focus:ring-kumkum/5 focus:border-kumkum outline-none transition-all font-bold text-temple-dark text-left relative overflow-hidden text-sm"
            >
                <span className="block truncate">{value}</span>
                <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-kumkum/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        className="absolute left-0 right-0 top-full mt-1 bg-white border border-kumkum/10 rounded-2xl shadow-2xl z-[100] overflow-hidden max-h-[300px] flex flex-col"
                    >
                        {currentRegion && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentRegion(null);
                                }}
                                className="flex items-center gap-2 px-5 py-3 text-[9px] font-black text-kumkum uppercase tracking-[0.2em] bg-kumkum/5 border-b border-kumkum/10 hover:bg-kumkum/10 transition-colors"
                            >
                                <ArrowLeft size={12} /> Back to Regions
                            </button>
                        )}
                        <div className="overflow-y-auto custom-scrollbar flex-grow py-1">
                            {displayOptions.map((opt, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (isNested && !currentRegion) {
                                            setCurrentRegion(opt);
                                        } else {
                                            onChange(opt);
                                            setIsOpen(false);
                                        }
                                    }}
                                    className={`w-full text-left px-5 py-2.5 text-[10px] font-black tracking-wider uppercase transition-colors hover:bg-kumkum/5 flex items-center justify-between ${value === opt ? 'text-kumkum bg-kumkum/5' : 'text-temple-dark/70'}`}
                                >
                                    <span>{opt}</span>
                                    {isNested && !currentRegion && <ChevronRight size={12} className="text-kumkum/40" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const PilgrimPath = () => {
    const [fromNode, setFromNode] = useState('Vijayawada');
    const [toNode, setToNode] = useState('Tirumala Sri Venkateswara Swamy');
    const [results, setResults] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [currentTime, setCurrentTime] = useState('06:00 AM');

    const scrollToDetails = (templeId) => {
        const element = document.getElementById(`temple-detail-${templeId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };


    const roadRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: roadRef,
        offset: ["start center", "end 0.9"]
    });

    const roadPoints = React.useMemo(() => {
        // Use 15% as the default to prevent the car from appearing in the center on first render
        if (!results) return { p: [0, 1], x: ["15%", "15%"], y: ["0%", "100%"], r: [180, 180] };

        const n = results.temples.length;
        const initialX = n > 0 ? "15%" : "50%";

        // JOURNEY MAP CONFIG
        const p = [0, 0.1]; // Car waits exactly at the start line for 10% of scroll
        const x = [initialX, initialX];
        const y = ["0%", "0%"];
        const r = [180, 180];

        const journeyStart = 0.1;
        const journeyEnd = 0.9;
        const journeyRange = journeyEnd - journeyStart;

        results.temples.forEach((_, i) => {
            const isLeft = i % 2 === 0;
            const targetX = isLeft ? "15%" : "85%";
            const pBase = journeyStart + (i / (n + 1)) * journeyRange;
            const pNextBase = journeyStart + ((i + 1) / (n + 1)) * journeyRange;
            const pTurnEnd = pBase + (pNextBase - pBase) * 0.3;
            const pVerticalEnd = pNextBase;

            const currentY = `${(i / (n + 1)) * 100}%`;
            const nextY = `${((i + 1) / (n + 1)) * 100}%`;

            const currentX = x[x.length - 1];

            if (currentX !== targetX) {
                p.push(pBase + 0.001); x.push(currentX); y.push(currentY); r.push(isLeft ? -90 : 90);
                p.push(pTurnEnd); x.push(targetX); y.push(currentY); r.push(isLeft ? -90 : 90);
            }

            p.push(pTurnEnd + 0.001); x.push(targetX); y.push(currentY); r.push(180);
            p.push(pVerticalEnd); x.push(targetX); y.push(nextY); r.push(180);
        });

        const pFinalBase = journeyStart + (n / (n + 1)) * journeyRange;
        const lastX = x[x.length - 1];
        const lastYStr = y[y.length - 1];

        // Final horizontal move to center
        p.push(pFinalBase + 0.001); x.push(lastX); y.push(lastYStr); r.push((n - 1) % 2 === 0 ? 90 : -90);
        p.push(pFinalBase + 0.03); x.push("50%"); y.push(lastYStr); r.push((n - 1) % 2 === 0 ? 90 : -90);

        // Final vertical move to end
        p.push(pFinalBase + 0.031); x.push("50%"); y.push(lastYStr); r.push(180);
        p.push(journeyEnd); x.push("50%"); y.push("100%"); r.push(180);

        // Final Buffer at bottom
        p.push(1); x.push("50%"); y.push("100%"); r.push(180);

        return { p, x, y, r };
    }, [results]);

    const pathD = React.useMemo(() => {
        if (!results) return "";
        const n = results.temples.length;
        const initialX = n > 0 ? 15 : 50;
        let d = `M ${initialX} 0`;
        results.temples.forEach((_, i) => {
            const y = ((i + 1) / (n + 1)) * 100;
            const x = i % 2 === 0 ? 15 : 85;
            const prevY = (i / (n + 1)) * 100;
            d += ` L ${x} ${prevY} L ${x} ${y}`;
        });
        const lastY = (n / (n + 1)) * 100;
        d += ` L 50 ${lastY} L 50 100`;
        return d;
    }, [results]);

    // --- AUTO DRIVE SYSTEM ---
    const vehicleTypes = [
        { type: 'car', color: '#dc2626', speed: 25000, offset: 0 },
        { type: 'bus', color: '#1d4ed8', speed: 35000, offset: 0.2 },
        { type: 'lorry', color: '#15803d', speed: 40000, offset: 0.4 },
        { type: 'auto', color: '#fbbf24', speed: 30000, offset: 0.6 },
        { type: 'bike', color: '#7c3aed', speed: 20000, offset: 0.8 },
        { type: 'bike', color: '#2563eb', speed: 22000, offset: 0.1 },
    ];

    const AutonomousVehicle = ({ type, color, speed, scrollOffset = 0, isMobile = false, size = 34 }) => {
        const progress = useMotionValue(0);

        useEffect(() => {
            let start = null;
            const animate = (time) => {
                if (!start) start = time;
                const elapsed = (time - start + (scrollOffset * speed)) % speed;
                progress.set(elapsed / speed);
                requestAnimationFrame(animate);
            };
            const frame = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(frame);
        }, [speed, scrollOffset, progress]);

        const x = useTransform(progress, roadPoints.p, roadPoints.x);
        const y = useTransform(progress, roadPoints.p, roadPoints.y);
        const r = useTransform(progress, roadPoints.p, roadPoints.r);

        const [vRotation, setVRotation] = useState(180);
        useEffect(() => {
            const unsub = r.on("change", v => setVRotation(v));
            return () => unsub();
        }, [r]);

        return (
            <motion.div
                style={{
                    top: isMobile ? useTransform(progress, [0, 1], ["0%", "100%"]) : y,
                    left: isMobile ? '24px' : x,
                    rotate: isMobile ? 180 : r,
                    x: "-50%",
                    y: "-50%"
                }}
                className="absolute z-10"
            >
                <VehicleModel
                    type={type}
                    color={color}
                    rotation={isMobile ? 180 : vRotation}
                    size={isMobile ? 24 : (type === 'bike' ? 24 : size)}
                    className={isMobile ? "rotate-180" : ""}
                />
            </motion.div>
        );
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const formatTime = (totalMinutes) => {
        const h = Math.floor(totalMinutes / 60) % 24;
        const m = totalMinutes % 60;
        const ampm = h >= 12 ? 'PM' : 'AM';
        const displayH = h % 12 || 12;
        return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    const to12h = (timeStr) => {
        if (!timeStr) return '';
        const [h, m] = timeStr.split(':').map(Number);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const dh = h % 12 || 12;
        return `${dh.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    const isTempleOnRoute = (temple, start, end) => {
        const latPadding = 0.35;
        const lngPadding = 0.35;
        const minLat = Math.min(start.lat, end.lat) - latPadding;
        const maxLat = Math.max(start.lat, end.lat) + latPadding;
        const minLng = Math.min(start.lng, end.lng) - lngPadding;
        const maxLng = Math.max(start.lng, end.lng) + lngPadding;

        if (temple.lat < minLat || temple.lat > maxLat || temple.lng < minLng || temple.lng > maxLng) {
            return false;
        }

        const dStartEnd = calculateDistance(start.lat, start.lng, end.lat, end.lng);
        const dStartTemple = calculateDistance(start.lat, start.lng, temple.lat, temple.lng);
        const dTempleEnd = calculateDistance(temple.lat, temple.lng, end.lat, end.lng);
        const detourDistance = (dStartTemple + dTempleEnd) - dStartEnd;

        return detourDistance < 35;
    };

    const handleSearch = () => {
        setIsSearching(true);
        const start = CITIES[fromNode];
        const endTemple = TEMPLES.find(t => t.name === toNode);
        const end = endTemple ? { lat: endTemple.lat, lng: endTemple.lng } : null;

        if (!start || !end) {
            alert("Please select valid cities");
            setIsSearching(false);
            return;
        }

        setTimeout(() => {
            // First pass: Find all temples that are generally on the way from start to end
            const candidates = TEMPLES.filter(t => isTempleOnRoute(t, start, end));

            // Sort by distance from start to establish potential sequence
            candidates.sort((a, b) => {
                const distA = calculateDistance(start.lat, start.lng, a.lat, a.lng);
                const distB = calculateDistance(start.lat, start.lng, b.lat, b.lng);
                return distA - distB;
            });

            // CUSTOM RULE: Padmavathi Ammavari should always differ to Tirumala (Visit Goddess first tradition)
            // We force this order in the candidates list before calculating the path
            const pIndex = candidates.findIndex(t => t.name === "Padmavathi Ammavari");
            const tIndex = candidates.findIndex(t => t.name === "Tirumala Sri Venkateswara Swamy");

            if (pIndex !== -1 && tIndex !== -1 && pIndex > tIndex) {
                // Move Padmavathi to be before Tirumala
                const padmavathi = candidates[pIndex];
                candidates.splice(pIndex, 1); // remove from old spot
                const newTIndex = candidates.findIndex(t => t.name === "Tirumala Sri Venkateswara Swamy"); // find new index of Tirumala
                candidates.splice(newTIndex, 0, padmavathi); // insert before
            }

            // Second pass: Iterative filtering to ensure realistic sequence without huge zig-zags
            // A temple is only added if it's "on the way" from the current position to the destination
            const onRoute = [];
            let currentPos = start;

            candidates.forEach(t => {
                const dDirect = calculateDistance(currentPos.lat, currentPos.lng, end.lat, end.lng);
                const dToTemple = calculateDistance(currentPos.lat, currentPos.lng, t.lat, t.lng);
                const dFromTempleToEnd = calculateDistance(t.lat, t.lng, end.lat, end.lng);

                // If adding this temple doesn't detour the current segment by more than 40km
                if ((dToTemple + dFromTempleToEnd) - dDirect < 40) {
                    onRoute.push(t);
                    currentPos = { lat: t.lat, lng: t.lng };
                }
            });

            // Parse AM/PM Time
            const [timePart, ampm] = currentTime.split(' ');
            let [hours, mins] = timePart.split(':').map(Number);
            if (ampm === 'PM' && hours !== 12) hours += 12;
            if (ampm === 'AM' && hours === 12) hours = 0;
            let cumulativeMinutes = hours * 60 + mins;
            let currentLat = start.lat;
            let currentLng = start.lng;
            let totalPathDistance = 0;
            const avgSpeed = 65; // km/h

            const processedTemples = onRoute.map(t => {
                const segmentDist = calculateDistance(currentLat, currentLng, t.lat, t.lng);
                const travelTimeMin = Math.round((segmentDist / avgSpeed) * 60);

                totalPathDistance += segmentDist;
                cumulativeMinutes += travelTimeMin;

                const arrival = formatTime(cumulativeMinutes);

                const openHour = parseInt(t.opening.split(':')[0]);
                const closeHour = parseInt(t.closing.split(':')[0]);
                const currentHour = Math.floor(cumulativeMinutes / 60) % 24;
                const isOpen = currentHour >= openHour && currentHour < closeHour;

                if (isOpen) cumulativeMinutes += 60; // 1 hour stay

                currentLat = t.lat;
                currentLng = t.lng;

                return { ...t, distanceTo: Math.round(segmentDist), arrivalTime: arrival, isOpen };
            });

            // Final segment to destination
            const finalDist = calculateDistance(currentLat, currentLng, end.lat, end.lng);
            totalPathDistance += finalDist;
            cumulativeMinutes += Math.round((finalDist / avgSpeed) * 60);
            const finalArrival = formatTime(cumulativeMinutes);

            setResults({
                temples: processedTemples,
                totalDistance: Math.round(totalPathDistance),
                estimatedTotalTime: Math.round(cumulativeMinutes - (hours * 60 + mins)),
                destinationArrival: finalArrival
            });
            setIsSearching(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] pb-24 font-outfit relative overflow-hidden pt-4 md:pt-6">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50l25-25-25-25-25 25z' fill='%239B1B1B'/%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-2 pb-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="flex flex-col items-center text-center mb-2">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-1">
                            <div className="w-12 h-12 border-2 border-temple-gold rounded-full flex items-center justify-center p-1">
                                <div className="w-full h-full bg-kumkum rounded-full flex items-center justify-center shadow-md">
                                    <Compass className="text-white" size={18} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <h1 className="text-lg md:text-2xl font-black text-temple-dark tracking-tight leading-[1.1] mb-0 uppercase">
                        SPIRITUAL <span className="text-kumkum">PATHFINDER</span> <br />
                        <span className="text-temple-gold text-xs md:text-base italic font-medium block mt-1">Navigate the sacred highways. Plan your pilgrimage with precision.</span>
                    </h1>
                </motion.div>

                {/* Search Console */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="sticky top-[72px] z-40 bg-white/40 backdrop-blur-md border border-white/50 rounded-[2rem] p-2 mb-8 shadow-2xl shadow-gray-200/50"
                >
                    <div className="bg-white rounded-[1.8rem] p-4 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-kumkum/60 ml-1">Journey Start</label>
                                <DivineDropdown
                                    value={fromNode}
                                    onChange={setFromNode}
                                    options={CITIES_BY_REGION}
                                    icon={MapPin}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-kumkum/60 ml-1">Sacred Destination</label>
                                <DivineDropdown
                                    value={toNode}
                                    onChange={setToNode}
                                    options={TEMPLES.map(t => t.name).sort()}
                                    icon={Navigation}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-kumkum/60 ml-1">Departure Time</label>
                                <DivineDropdown
                                    value={currentTime}
                                    onChange={setCurrentTime}
                                    options={TIME_OPTIONS}
                                    icon={Clock}
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSearch}
                                disabled={isSearching}
                                className="w-full bg-kumkum text-white py-4 rounded-2xl font-black tracking-widest uppercase text-xs flex items-center justify-center gap-3 shadow-[0_15px_30px_-5px_rgba(155,27,27,0.4)] hover:bg-temple-maroon transition-all disabled:opacity-50 h-[58px]"
                            >
                                {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search size={20} />}
                                Search
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Initial State / Welcome Section */}
                <AnimatePresence>
                    {!results && !isSearching && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="mt-8 flex flex-col items-center"
                        >
                            {/* Large Call to Action / Placeholder Visual */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="w-full p-12 bg-gradient-to-br from-kumkum/5 via-white to-temple-gold/5 rounded-[3rem] border border-kumkum/10 flex flex-col items-center text-center relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-kumkum/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-temple-gold/10 rounded-full blur-[100px] -ml-32 -mb-32" />

                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative z-10 mb-6"
                                >
                                    <div className="w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center p-5 border border-kumkum/5">
                                        <Navigation className="text-kumkum animate-pulse" size={40} />
                                    </div>
                                </motion.div>

                                <h2 className="text-2xl md:text-3xl font-black text-temple-dark uppercase tracking-tighter mb-4 relative z-10">
                                    Your Divine <span className="text-kumkum">Journey</span> Awaits
                                </h2>
                                <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] max-w-md relative z-10">
                                    Select your starting city and destination above to calculate distances, travel times, and temple availability.
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results Section */}
                <AnimatePresence mode="wait">
                    {results && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            className="mt-8 space-y-8"
                        >
                            {/* Summary Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { icon: Navigation, label: 'Total Distance', val: `${results.totalDistance} KM`, color: 'blue' },
                                    { icon: Clock, label: 'Est. Travel Time', val: `${Math.floor(results.estimatedTotalTime / 60)}h ${results.estimatedTotalTime % 60}m`, color: 'orange' },
                                    { icon: MapIcon, label: 'Temples on Route', val: `${results.temples.length} STOPS`, color: 'red' }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -5 }}
                                        className="bg-white p-4 rounded-2xl border border-kumkum/5 shadow-lg transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-3 bg-${stat.color}-50 rounded-xl`}>
                                                <stat.icon className={`text-${stat.color}-600`} size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-0.5">{stat.label}</p>
                                                <p className="text-lg font-black text-temple-dark leading-none">{stat.val}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Timeline Results */}
                            <div className="relative pt-20 pb-32 mt-16 bg-[#F7F4F0] rounded-[4rem] border border-kumkum/10 shadow-[inner_0_4px_40px_rgba(0,0,0,0.03)] overflow-hidden" ref={roadRef}>
                                {/* Decorative Urban/Architectural Background Pattern */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h40v40H10zM70 10h20v20H70zM100 10h50v50h-50zM10 60h20v20H10zM40 70h60v60H40zM110 70h40v40h-40zM10 110h20v40H10z' fill='%239B1B1B'/%3E%3C/svg%3E")`,
                                        backgroundSize: '240px'
                                    }}
                                />
                                {/* Gentle depth gradients to focus the roadmap */}
                                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#F7F4F0] to-transparent z-10" />
                                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F7F4F0] to-transparent z-10" />
                                {/* Road Track - Desktop (Winding Zig-Zag) */}
                                <div className="absolute inset-0 hidden md:block z-0">
                                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path
                                            d={pathD}
                                            stroke="#1e293b"
                                            strokeWidth="4.5"
                                            fill="none"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d={pathD}
                                            stroke="#ffffff"
                                            strokeWidth="0.3"
                                            strokeDasharray="1.5 3"
                                            fill="none"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            opacity="0.5"
                                        />
                                    </svg>
                                    {/* Main Pilgrim Vehicle (Now Autonomous for "Auto" look) */}
                                    <AutonomousVehicle type="car" color="#dc2626" speed={30000} />

                                    {/* Traffic System - 5 More Vehicles */}
                                    {vehicleTypes.map((v, i) => (
                                        <AutonomousVehicle
                                            key={i}
                                            type={v.type}
                                            color={v.color}
                                            speed={v.speed}
                                            scrollOffset={v.offset}
                                        />
                                    ))}
                                </div>

                                {/* Road Track - Mobile (Straight) */}
                                <div className="absolute left-[24px] top-0 bottom-0 w-3 bg-zinc-800 md:hidden shadow-md border-x-[0.5px] border-zinc-700 z-0 -translate-x-1/2">
                                    <div className="absolute inset-0 flex flex-col items-center justify-around overflow-hidden">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className="w-[1px] h-3 bg-white/20" />
                                        ))}
                                    </div>
                                    <div className="absolute inset-0 md:hidden z-10 pointer-events-none">
                                        <AutonomousVehicle type="car" size={24} speed={30000} isMobile />
                                    </div>
                                </div>

                                <div className="space-y-10 relative">
                                    <div className="flex items-center gap-6 md:pl-[calc(15%-24px)] relative z-20">
                                        <div className="w-12 h-12 bg-kumkum rounded-2xl flex items-center justify-center text-white ring-4 ring-kumkum/10 shrink-0 shadow-lg rotate-3">
                                            <div className="-rotate-3">
                                                <MapPin size={20} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-kumkum uppercase tracking-[0.3em] block mb-0.5">Pilgrim Journey Start</span>
                                            <h3 className="text-xl md:text-2xl font-black text-temple-dark tracking-tighter uppercase leading-none">{fromNode}</h3>
                                        </div>
                                    </div>

                                    {results.temples.map((temple, idx) => (
                                        <motion.div
                                            key={temple.id}
                                            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} relative`}
                                        >
                                            {/* Node Marker */}
                                            <div
                                                className="absolute left-[24px] w-12 top-0 h-12 flex items-center justify-center z-20 transition-all duration-700 -translate-x-1/2"
                                                style={{ left: typeof window !== 'undefined' && window.innerWidth < 768 ? '24px' : (idx % 2 === 0 ? '15%' : '85%') }}
                                            >
                                                <div className="w-6 h-6 bg-white border-[3px] border-temple-gold rounded-full shadow-lg relative">
                                                    <div className="absolute inset-0 bg-kumkum rounded-full animate-ping opacity-25" />
                                                    <div className="absolute inset-1.5 bg-kumkum rounded-full" />
                                                </div>
                                            </div>

                                            {/* Content Block */}
                                            <div className={`w-full md:w-[38%] pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:ml-auto md:mr-[10%]' : 'md:mr-auto md:ml-[10%]'}`}>
                                                <div className="group relative bg-white p-3 md:p-4 rounded-2xl border border-kumkum/10 shadow-sm hover:shadow-xl hover:border-temple-gold/40 transition-all duration-500 overflow-hidden">
                                                    {/* Premium Hover Glow */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-temple-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                                    {/* Phase Badge */}
                                                    <div className={`absolute top-0 ${idx % 2 === 0 ? 'md:left-0 md:rounded-br-xl' : 'md:right-0 md:left-auto md:rounded-bl-xl md:rounded-br-none'} left-0 rounded-br-xl bg-kumkum text-white px-3 py-1.5 font-black text-[9px] tracking-widest z-10 shadow-lg`}>
                                                        STOP {(idx + 1).toString().padStart(2, '0')}
                                                    </div>

                                                    {/* Status Badge */}
                                                    <div className={`absolute top-4 ${idx % 2 === 0 ? 'md:left-20 md:right-auto' : 'md:right-20 md:left-auto'} right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${temple.isOpen ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'
                                                        }`}>
                                                        {temple.isOpen ? 'Open' : 'Closed'}
                                                    </div>

                                                    <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'} mt-4`}>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-[9.5px] font-black text-kumkum/50 tracking-widest uppercase">{temple.location}</span>
                                                            <div className="w-1 h-1 bg-kumkum/10 rounded-full" />
                                                            <span className="text-[9.5px] font-black text-kumkum/50 tracking-widest uppercase">{temple.state}</span>
                                                        </div>
                                                        <h3 className="text-base md:text-lg font-black text-temple-dark leading-tight mb-1 group-hover:text-kumkum transition-colors">{temple.name}</h3>
                                                        <p className="text-xs md:text-[13px] text-temple-dark/60 font-medium mb-2 leading-relaxed line-clamp-2">{temple.description}</p>

                                                        <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} w-full`}>
                                                            <div className="flex items-center gap-2 bg-temple-paper/40 px-3 py-2 rounded-xl border border-kumkum/5 flex-grow md:flex-grow-0">
                                                                <Clock size={14} className="text-kumkum" />
                                                                <div className="text-left">
                                                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter mb-0.5">Arrival</p>
                                                                    <p className="text-xs font-black text-temple-dark leading-none">{temple.arrivalTime}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 bg-temple-paper/40 px-3 py-2 rounded-xl border border-kumkum/5 flex-grow md:flex-grow-0">
                                                                <Sparkles size={14} className="text-temple-gold" />
                                                                <div className="text-left">
                                                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter mb-0.5">Timings</p>
                                                                    <p className="text-xs font-black text-temple-dark leading-none">{to12h(temple.opening)} - {to12h(temple.closing)}</p>
                                                                </div>
                                                            </div>

                                                            {/* View Details Button */}
                                                            <div className={`mt-2 pt-2 border-t border-kumkum/10 flex w-full ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                                                <button
                                                                    onClick={() => scrollToDetails(temple.id)}
                                                                    className="group/btn relative px-4 py-2 bg-kumkum/5 text-kumkum font-black text-[9px] tracking-[0.2em] uppercase rounded-lg border border-kumkum/10 hover:bg-kumkum hover:text-white transition-all duration-300 overflow-hidden flex items-center gap-2"
                                                                >
                                                                    <span className="relative z-10 flex items-center gap-1.5">
                                                                        <Info size={12} />
                                                                        View Details
                                                                    </span>
                                                                    <div className="absolute inset-0 bg-gradient-to-r from-kumkum to-temple-maroon translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {!temple.isOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10 }}
                                                                whileInView={{ opacity: 1, y: 0 }}
                                                                className="mt-6 flex items-start gap-3 p-4 bg-red-50 rounded-2xl border border-red-100 w-full"
                                                            >
                                                                <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                                                                <p className="text-xs font-bold text-red-600 leading-normal text-left">
                                                                    DIVINE WARNING: The temple doors close at {temple.closing}. Plan to arrive earlier or maintain steady pace.
                                                                </p>
                                                            </motion.div>
                                                        )}
                                                    </div>

                                                    {/* Decorative Aura Overlay */}
                                                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-kumkum/5 rounded-full blur-[60px] group-hover:bg-kumkum/10 transition-all duration-700" />
                                                </div>
                                            </div>

                                            {/* Spacer for structural balance */}
                                            <div className="hidden md:block w-[42%]" />
                                        </motion.div>
                                    ))}

                                    <div className="flex items-center gap-6 md:justify-center relative z-20">
                                        <div className="w-12 h-12 bg-temple-gold rounded-2xl flex items-center justify-center text-white ring-4 ring-temple-gold/10 shrink-0 shadow-lg -rotate-3">
                                            <div className="rotate-3">
                                                <Compass size={20} />
                                            </div>
                                        </div>
                                        <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-y-1/2 md:-translate-x-[calc(100%+48px)] md:text-right">
                                            <span className="text-[9px] font-black text-temple-gold uppercase tracking-[0.3em] block mb-0.5">Sacred Destination</span>
                                            <h3 className="text-xl md:text-2xl font-black text-temple-dark tracking-tighter uppercase leading-none">{toNode}</h3>
                                            <div className="flex items-center gap-2 mt-1 md:justify-end">
                                                <Clock size={10} className="text-kumkum" />
                                                <span className="text-[9px] font-black text-kumkum uppercase tracking-widest">Arrival: {results.destinationArrival}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Temple Detailed Information Section */}
                            <div className="mt-16 bg-[#FDFBF7] rounded-[3rem] border border-kumkum/5 shadow-inner">
                                <TempleDetails temples={results.temples} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {results && results.temples.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-16 text-center bg-white p-12 md:p-20 rounded-[3rem] border border-kumkum/10 shadow-2xl max-w-3xl mx-auto"
                    >
                        <div className="inline-flex p-8 bg-gray-50 rounded-full mb-8 text-gray-300">
                            <MapPinOff size={64} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-temple-dark mb-4">No Major Temples on Direct Path</h3>
                        <p className="text-temple-dark/50 max-w-md mx-auto font-medium text-lg leading-relaxed">
                            We couldn't identify any prominent temples directly along this chosen route. Consider searching between regional hubs like Vijayawada, Hyderabad, or Tirupati.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PilgrimPath;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = ({ lang = 'EN' }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const translations = {
        EN: {
            hero_btn: 'EXPLORE DIVINITY',
            slides: [
                { tag: 'Om Namo Venkatesaya', title: 'Tirumala Tirupati Devasthanams', subtitle: 'Kali Yuga Vaikuntham - The Abode of Lord Venkateswara' },
                { tag: 'Om Namah Shivaya', title: 'Srisailam Mallikarjuna Swamy', subtitle: 'The Abode of Lord Shiva & Bhramaramba Devi' },
                { tag: 'Jai Durga Bhavani', title: 'Kanaka Durga Temple', subtitle: 'The Powerful Deity on Indrakeeladri Hill' },
                { tag: 'Om Namo Narayanaya', title: 'Simhachalam Temple', subtitle: 'The Abode of Lord Varaha Lakshmi Narasimha' },
                { tag: 'Om Namah Shivaya', title: 'Kotappakonda Sri Trikoteswara Swamy Temple', subtitle: 'The Hill of Three Peaks - Trikutachalam' },
                { tag: 'Nava Narasimha Kshetram', title: 'Ahobilam Temple', subtitle: 'The Nine Abodes of Lord Narasimha' },
                { tag: 'Mangalagiri Kshetram', title: 'Sri Panakala Lakshmi Narasimha Swamy', subtitle: 'The Lord Who Drinks Panakam' },
                { tag: 'Sri Rama Jayam', title: 'Bhadrachalam Sri Rama Temple', subtitle: 'The Vaikuntha of Lord Rama' },
                { tag: 'Vidya Kshetram', title: 'Basara Gnana Saraswati Temple', subtitle: 'The Ancient Abode of Goddess Saraswati' },
                { tag: 'Om Gam Ganapataye Namaha', title: 'Swayambhu Sri Varasiddhi Vinayaka Swamy', subtitle: 'Kanipakam Devasthanam - The Lord of Beginnings' },
                { tag: ' Om Namo Narasimhaya', title: 'Sri Lakshmi Narasimha Swamy Temple', subtitle: 'Yadagirigutta - Telangana Tirupati' },
                { tag: 'Om Arunachaleswaraya Namaha', title: 'Arunachaleswarar Temple - Thiruvannamalai', subtitle: 'The Agni Lingam - Eternal Fire of Wisdom' }
            ],
        }
    };

    const t = translations[lang];

    const slideImages = [
        'images/TTD.webp',
        'images/Srisailam.webp',
        'images/KanakaDurga.webp',
        'images/Simhachalam.webp',
        'images/Kotappakonda.webp',
        'images/Ahobilam.webp',
        'images/PanakalaNarasimhaSwamy.webp',
        'images/Bhadrachalam.webp',
        'images/BasaraGnanaSaraswati.webp',
        'images/KanipakamVarasiddhiVinayaka.webp',
        'images/Yadagirigutta.webp',
        'images/Thiruvannamalai.webp',
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [slideImages.length]);

    const tickerMessages = [
        "Free Annadanam Provided",
        "Traditional Attire Mandatory",
        "Sacred Mahakshetram",
        "Darshan Timings: 6 AM - 3 PM",
        "Online Seva Booking Open",
        "Maintain Silence in Sanctum",
    ];

    return (
        <section className="relative h-[92vh] overflow-hidden bg-black">
            {/* Professional Sacred Ticker Bar - Image Match */}
            <div className="absolute top-0 left-0 w-full z-40 bg-temple-ivory border-t-2 border-temple-gold overflow-hidden">
                <div className="flex items-center h-12">
                    {/* Fixed 'Latest Highlights' Badge */}
                    <div className="relative z-50 h-full bg-[#7E1010] px-8 flex items-center shadow-[10px_0_15px_rgba(0,0,0,0.2)] border-r border-[#7E1010]">
                        <span className="text-temple-gold font-black text-[11px] tracking-[0.1em] uppercase whitespace-nowrap">
                            LATEST HIGHLIGHTS
                        </span>
                    </div>

                    {/* Scrolling Section */}
                    <div className="flex-1 relative flex overflow-x-hidden bg-[#F8F5F2]">
                        <motion.div
                            animate={{ x: [0, -1500] }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 35,
                                    ease: "linear",
                                },
                            }}
                            className="flex whitespace-nowrap py-3"
                        >
                            {[...tickerMessages, ...tickerMessages, ...tickerMessages].map((msg, i) => (
                                <span key={i} className="text-[13px] font-bold text-[#2D2D2D] px-10 flex items-center gap-4">
                                    <svg width="20" height="20" viewBox="0 0 40 40" className="text-[#9B1B1B] fill-current">
                                        <path d="M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0zm0 4a16 16 0 1 0 0 32 16 16 0 0 0 0-32z" opacity=".2" />
                                        <path d="M20 8c6.627 0 12 5.373 12 12s-5.373 12-12 12S8 26.627 8 20 13.373 8 20 8zm0 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" />
                                        <circle cx="20" cy="20" r="4" />
                                    </svg>
                                    {msg}
                                </span>
                            ))}
                        </motion.div>

                        {/* Shadow Overlays for smooth entry/exit inside the scrolling track */}
                        <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent z-10" />
                    </div>
                </div>
            </div>
            {/* Clear Background Image Layer */}
            <AnimatePresence>
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    {/* Enhanced Professional Overlay: Darker on the left for text contrast, clear on the right */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-10" />

                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slideImages[currentSlide]})` }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Premium Visdom Badge - Hidden on mobile to avoid overlap */}
            <div className="absolute top-24 right-12 z-40 hidden lg:block">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-4 font-poppins pointer-events-none group"
                >
                    <div className="h-16 w-[1.5px] bg-gradient-to-b from-temple-gold via-temple-gold/40 to-transparent" />
                    <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-[0.4em] text-temple-gold/80 font-black mb-1">POWERED BY</span>
                        <span className="text-xl font-black text-temple-ivory tracking-tighter leading-none mb-1">VISDOM <span className="text-temple-gold">WAVES</span></span>
                        <span className="text-[7px] uppercase tracking-[0.2em] text-gray-400 font-bold">Innovation & Tradition</span>
                    </div>
                </motion.div>
            </div>

            {/* Content Layer - Professional Animation Only on Text */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
                <div className="max-w-none w-full space-y-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            className="space-y-6"
                        >
                            <div className="overflow-hidden mb-4">
                                <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 50, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="inline-flex items-center gap-4 bg-black/30 backdrop-blur-sm border-l-4 border-kumkum py-2 px-6 rounded-r-full shadow-2xl"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-temple-gold animate-pulse" />
                                    <span className="text-temple-gold font-black tracking-[0.3em] uppercase text-xs">
                                        {t.slides[currentSlide].tag}
                                    </span>
                                </motion.div>
                            </div>

                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-100%" }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-3xl md:text-5xl font-bold shimmer-orange leading-none uppercase tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] whitespace-nowrap"
                                >
                                    {t.slides[currentSlide].title}
                                </motion.h1>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="max-w-xl pl-6 border-l-2 border-temple-gold"
                            >
                                <p className="text-lg md:text-xl text-temple-ivory/90 font-medium leading-relaxed italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                                    "{t.slides[currentSlide].subtitle}"
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex gap-6 pt-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(184, 134, 11, 0.4)' }}
                                    className="px-12 py-5 bg-kumkum text-temple-ivory font-black tracking-widest rounded-xl shadow-2xl border border-white/10 active:scale-95 transition-all"
                                >
                                    {t.hero_btn}
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Hero;

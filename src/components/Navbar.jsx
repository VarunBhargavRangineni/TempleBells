import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'CROWD MONITOR', href: '/live-tracker' },
        { name: 'SEVAS', href: '/sevas' },
        { name: 'E-DARSHAN', href: '/darshan' },
        { name: 'E-DONATION', href: '/hundi' },
        { name: 'PRASADAM', href: '/prasadam' },
        { name: 'ACCOMMODATION', href: '/accommodation' },
    ];

    return (
        <motion.nav
            className={`sticky top-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-kumkum/95 backdrop-blur-3xl py-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-temple-gold/30'
                : 'bg-kumkum py-2 border-b border-temple-gold/10'
                }`}
        >
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden text-temple-ivory">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                        x: [-10, 10, -10]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-1/2 -left-1/4 w-full h-[200%] bg-kumkum rounded-full blur-[140px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.15, 0.1],
                        x: [10, -10, 10]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-1/2 -right-1/4 w-full h-[200%] bg-temple-gold rounded-full blur-[140px]"
                />
            </div>

            <div className="w-full px-4 md:px-6 lg:px-8 relative z-10">
                <div className="flex justify-between items-center">

                    <Link to="/" className="flex items-center gap-4 group cursor-pointer ml-4" onClick={() => window.scrollTo(0, 0)}>
                        <div className="relative">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                                transition={{ duration: 0.4 }}
                                className="w-12 h-12 flex items-center justify-center transition-all duration-500 overflow-hidden"
                            >
                                <img
                                    src="/images/Vslogo.webp"
                                    alt="Temple Logo"
                                    className="w-full h-full object-contain mix-blend-screen brightness-110 contrast-110"
                                />
                            </motion.div>
                        </div>
                        <div className="flex flex-col">
                            <motion.div
                                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                <h1 className="text-lg font-black tracking-[0.15em] text-temple-ivory leading-none flex items-center gap-1">
                                    TEMPLE <span className="shimmer-orange">BELLS</span>
                                </h1>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="flex items-center gap-2 mt-1"
                            >
                                <motion.div
                                    animate={{ width: [0, 15, 12] }}
                                    className="h-[1px] bg-temple-gold shadow-[0_0_5px_rgba(184,134,11,1)]"
                                />
                                <p className="text-[9px] text-temple-ivory/80 tracking-[0.35em] uppercase font-black group-hover:text-temple-ivory transition-colors">Spiritual Echoes of Bells</p>
                            </motion.div>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-12">
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                                whileHover={{ y: -3, scale: 1.05 }}
                            >
                                <Link
                                    to={link.href}
                                    className="text-[12px] font-black tracking-[0.25em] transition-all duration-300 relative group py-2 text-temple-ivory/90 hover:text-temple-gold block"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-temple-gold to-transparent transition-all duration-500 group-hover:w-full group-hover:left-0 shadow-[0_0_10px_rgba(184,134,11,0.8)]" />
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-temple-gold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100" />
                                </Link>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            className="p-2.5 bg-gradient-to-br from-white/10 to-transparent rounded-xl border border-white/20 cursor-pointer text-temple-ivory hover:text-temple-gold hover:border-temple-gold/50 transition-all shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]"
                        >
                            <User size={20} className="filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]" />
                        </motion.div>
                    </div>

                    {/* Animated Mobile Trigger */}
                    <div className="md:hidden flex items-center">
                        <motion.button
                            whileTap={{ scale: 0.9, rotate: 90 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2.5 bg-white/5 rounded-xl border border-white/15 text-temple-ivory shadow-lg backdrop-blur-md"
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <X size={26} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Menu size={26} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* High-Animation Mobile sanctum Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                        className="md:hidden absolute top-full left-2 right-2 mt-2 bg-black/95 backdrop-blur-3xl border border-temple-gold/20 rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] px-4 py-8 z-[100] overflow-hidden text-temple-ivory"
                    >
                        {/* Mobile Background Aura */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-kumkum/40 to-transparent" />
                        </div>

                        <div className="flex flex-col gap-5 relative z-10">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        to={link.href}
                                        className="text-center py-4 text-[12px] font-black tracking-[0.3em] rounded-[1rem] text-gray-300 border border-white/5 bg-white/5 hover:bg-white/10 hover:text-white transition-all active:bg-kumkum/20 active:border-kumkum/40 block"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-temple-gold to-transparent shadow-[0_0_20px_rgba(184,134,11,1)] opacity-100"
            />
        </motion.nav>
    );
};

export default Navbar;

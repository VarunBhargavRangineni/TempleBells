import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Youtube, Twitter, Instagram, ExternalLink, ShieldCheck } from 'lucide-react';

const Footer = () => {
    const pilgrimServices = [
        'Online Darshan Booking',
        'Arjitha Seva Registration',
        'E-Accommodation',
        'Kalyanamandapam',
        'E-Donation (Hundi)',
        'Prasadam Tracking'
    ];

    const devasthanam = [
        'Administrative Structure',
        'Temple History & Chronicles',
        'Vaikhanasa Agama',
        'Annual Brahmotsavams',
        'Media & Publications',
        'Tendering & Gau-Shala'
    ];

    const supportHelp = [
        'Accommodation Feedback',
        'Refund & Cancellation',
        'Report Corruption/Help',
        'Lost & Found',
        'Volunteer (Srivari Seva)',
        'Contact Helpdesk'
    ];

    const socialLinks = [
        { icon: <Facebook size={18} />, label: 'FB' },
        { icon: <Youtube size={18} />, label: 'YT' },
        { icon: <Twitter size={18} />, label: 'TW' },
        { icon: <Instagram size={18} />, label: 'IG' },
    ];

    return (
        <footer className="relative bg-kumkum text-temple-ivory pt-12 pb-6 overflow-hidden border-t-2 border-temple-gold/40">
            {/* Sacred Aura Glow - Matching Navbar */}
            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden text-temple-ivory">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-kumkum rounded-full blur-[140px]"
                />
                <motion.div
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-temple-gold rounded-full blur-[140px]"
                />
            </div>

            {/* Premium Gold Line Top - Mirroring Navbar's Bottom */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-temple-gold to-transparent shadow-[0_5px_20px_rgba(184,134,11,0.5)]" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-center md:text-left">
                    {/* Main Info */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center md:items-start"
                        >
                            <h2 className="text-xl font-black text-temple-ivory tracking-[0.1em] leading-none uppercase">
                                TEMPLE <span className="text-temple-gold">BELLS</span>
                            </h2>
                            <p className="text-[9px] text-temple-gold font-black tracking-[0.3em] mt-1 uppercase">Sacred Echoes</p>
                        </motion.div>

                        <p className="text-xs leading-relaxed text-temple-ivory/60 italic">
                            "A spiritual beacon for millions connecting tradition with technology."
                        </p>

                        <div className="flex justify-center md:justify-start gap-3">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    whileHover={{ y: -3, borderColor: '#B8860B', backgroundColor: 'rgba(184, 134, 11, 0.1)' }}
                                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 text-temple-gold shadow-inner"
                                >
                                    {React.cloneElement(social.icon, { size: 14 })}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Columns Re-styled for Compactness */}
                    {[
                        { title: 'Services', items: pilgrimServices.slice(0, 4) },
                        { title: 'Information', items: devasthanam.slice(0, 4) },
                        { title: 'Support', items: supportHelp.slice(0, 4) }
                    ].map((col, idx) => (
                        <div key={idx}>
                            <h3 className="text-temple-gold font-black tracking-[0.2em] text-[12px] uppercase mb-4 flex items-center justify-center md:justify-start gap-3 drop-shadow-[0_0_10px_rgba(184,134,11,0.3)]">
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-1.5 h-1.5 bg-kumkum rounded-full shadow-[0_0_12px_rgba(155,27,27,1)]"
                                />
                                {col.title}
                            </h3>
                            <ul className="space-y-2">
                                {col.items.map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-[11px] text-temple-ivory/70 hover:text-temple-gold font-bold transition-all duration-300 inline-block uppercase tracking-wider">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar Tighter */}
                <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-[10px] text-temple-ivory/40 font-black uppercase tracking-[0.3em]">
                        © 2026 Temple Bells. Crafted for Devotion.
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="text-[10px] flex items-center gap-2 font-black text-temple-ivory/40 tracking-[0.2em]">
                            POWERED BY <span className="shimmer-orange text-sm italic tracking-normal">VISDOMWAVES</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

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
        <footer className="relative bg-[#FDFBF7] text-black pt-8 pb-0 overflow-hidden">
            {/* Shiny Black Top Line */}
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-black opacity-80 z-20" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-40 z-20" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center md:text-left">
                    {/* Main Info */}
                    <div className="space-y-4">
                        <div className="flex flex-col items-center md:items-start">
                            <h2 className="text-2xl font-black text-black tracking-[0.1em] leading-none uppercase drop-shadow-sm">
                                TEMPLE <span className="text-kumkum">BELLS</span>
                            </h2>
                            <p className="text-[10px] text-black font-black tracking-[0.4em] mt-1.5 uppercase leading-none">Sacred Digital Sanctum</p>
                        </div>

                        <p className="text-xs leading-relaxed text-black/70 font-bold italic max-w-xs mx-auto md:mx-0">
                            "Connecting the divine heritage of ancient traditions with the precision of modern engineering."
                        </p>

                        <div className="flex justify-center md:justify-start gap-3">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    whileHover={{ scale: 1.1, backgroundColor: '#000', color: '#FFF' }}
                                    className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center transition-all duration-300 text-black shadow-md"
                                >
                                    {React.cloneElement(social.icon, { size: 16 })}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Columns */}
                    {[
                        { title: 'Pilgrim Services', items: pilgrimServices.slice(0, 4) },
                        { title: 'Divine Info', items: devasthanam.slice(0, 4) },
                        { title: 'Help & Support', items: supportHelp.slice(0, 4) }
                    ].map((col, idx) => (
                        <div key={idx}>
                            <h3 className="text-black font-black tracking-[0.2em] text-[12px] uppercase mb-4 flex items-center justify-center md:justify-start gap-2">
                                <span className="w-1.5 h-1.5 bg-kumkum rounded-full shadow-[0_0_8px_rgba(155,27,27,0.4)]" />
                                {col.title}
                            </h3>
                            <ul className="space-y-2.5">
                                {col.items.map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-[11px] text-black/60 hover:text-kumkum font-black transition-all duration-300 inline-block uppercase tracking-wider">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-black/10 pt-6 pb-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left relative z-10">
                    <div className="text-[10px] text-black font-bold uppercase tracking-[0.3em]">
                        © 2026 Temple Bells. All Rights Reserved.
                    </div>

                    <div className="text-[10px] flex items-center gap-2 font-black text-black tracking-[0.2em]">
                        POWERED BY <span className="text-kumkum text-xs italic tracking-normal font-black">VISDOMWAVES</span>
                    </div>
                </div>
            </div>

            {/* All Lords Silhouette Background - Full Footer Coverage */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.85]">
                <img
                    src="/images/footer.png"
                    alt="Sacred Divine Background Silhouette"
                    className="w-full h-full object-cover object-bottom filter brightness-110 contrast-110 saturate-150"
                />
                {/* Subtle White Overlay for better contrast */}
                <div className="absolute inset-0 bg-white/10" />
            </div>
        </footer>
    );
};

export default Footer;

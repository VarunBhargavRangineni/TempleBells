import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <main className="flex-grow py-24 bg-[#FDFBF7]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 space-y-4"
                >
                    <h2 className="text-sm font-black text-kumkum tracking-[0.4em] uppercase">OUR DIGITAL CRAFTSMANSHIP</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-temple-dark tracking-tighter uppercase leading-tight">
                        Specialized Engineering for <span className="shimmer-orange">Sacred Spaces</span>
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-temple-gold to-transparent mx-auto mt-6" />
                </motion.div>

                {/* Service Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'Sacred Web Experience',
                            desc: 'Designing immersive digital portals that capture the divine essence of your temple through modern UI/UX.',
                            icon: '🕉️'
                        },
                        {
                            title: 'Spiritual E-Commerce',
                            desc: 'Secure systems for Prasadam, Vastram, and Seva bookings with seamless payment integration.',
                            icon: '🛒'
                        },
                        {
                            title: 'Live Darshan Streaming',
                            desc: 'Low-latency, high-definition streaming solutions for millions of devotees worldwide.',
                            icon: '📹'
                        },
                        {
                            title: 'Digital Hundi Systems',
                            desc: 'Modern, transparent, and secure electronic donation platforms for global contributions.',
                            icon: '🪙'
                        },
                        {
                            title: 'Crowd Analytics & Flow',
                            desc: 'AI-powered real-time tracking to ensure pilgrim safety and efficient temple navigation.',
                            icon: '📊'
                        },
                        {
                            title: 'Temple Heritage Archives',
                            desc: 'Digitizing ancient texts, inscriptions, and history into interactive digital libraries.',
                            icon: '📜'
                        }
                    ].map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group p-10 bg-white rounded-[2.5rem] border border-temple-gold/10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(155,27,27,0.08)] transition-all duration-500 text-left relative overflow-hidden"
                        >
                            {/* Accent Background */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-kumkum/5 rounded-bl-full -mr-16 -mt-16 group-hover:bg-kumkum/10 transition-colors" />

                            <div className="text-4xl mb-6">{service.icon}</div>

                            <h4 className="text-xl font-black text-temple-dark group-hover:text-kumkum transition-colors mb-4 uppercase tracking-tight">
                                {service.title}
                            </h4>

                            <p className="text-gray-500 font-medium leading-relaxed mb-8">
                                {service.desc}
                            </p>

                            <div className="flex items-center gap-3 text-kumkum font-black text-[10px] tracking-[0.2em] uppercase cursor-pointer group/link">
                                Learn More
                                <div className="w-6 h-[1px] bg-kumkum group-hover/link:w-10 transition-all duration-300" />
                            </div>

                            {/* Bottom Border Accent */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-temple-gold/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Intelligent Temple Management Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mt-32">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 space-y-4"
                >
                    <h2 className="text-sm font-black text-temple-gold tracking-[0.4em] uppercase">EFFICIENT SANCTUM OPERATIONS</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-temple-dark tracking-tighter uppercase leading-tight">
                        Intelligent Temple <span className="shimmer-orange">Management</span>
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-kumkum to-transparent mx-auto mt-6" />
                </motion.div>

                {/* Management Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'LIVE CROWD TRACKER',
                            desc: 'Real-time monitoring of pilgrim density and automated flow control systems.',
                            icon: '👥'
                        },
                        {
                            title: 'Automated Seva Scheduling',
                            desc: 'Smart queue management and digital slot allocation for all temple rituals.',
                            icon: '🗓️'
                        },
                        {
                            title: 'Online Darshan Booking',
                            desc: 'A seamless, high-volume reservation portal for verified pilgrim visits.',
                            icon: '🎫'
                        },
                        {
                            title: 'E-Donation (Hundi)',
                            desc: 'Secure digital offerings with instant receipts and transparent tracking.',
                            icon: '🕉️'
                        },
                        {
                            title: 'Prasadam Tracking',
                            desc: 'Blockchain-enabled supply chain for authentic and holy offering distributions.',
                            icon: '🍱'
                        },
                        {
                            title: 'E-Accommodation',
                            desc: 'Near-sanctum stay bookings with integrated pilgrim verification services.',
                            icon: '🏨'
                        }
                    ].map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -12, rotate: [0, 1, -1, 0] }}
                            className={`group p-10 bg-white rounded-[2rem] border border-kumkum/5 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(184,134,11,0.1)] transition-all duration-500 text-left relative overflow-hidden ${service.title === 'LIVE CROWD TRACKER' ? 'cursor-pointer' : ''}`}
                            onClick={() => {
                                if (service.title === 'LIVE CROWD TRACKER') {
                                    navigate('/live-tracker');
                                    window.scrollTo(0, 0);
                                }
                            }}
                        >
                            {/* Visual Accent */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-temple-gold/5 rounded-bl-full -mr-12 -mt-12 group-hover:bg-temple-gold/10 transition-colors" />

                            <div className="w-14 h-14 bg-kumkum/5 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-kumkum group-hover:text-white transition-all duration-500">
                                {service.icon}
                            </div>

                            <h4 className="text-xl font-bold text-temple-dark group-hover:text-kumkum transition-colors mb-4 uppercase tracking-tighter">
                                {service.title}
                            </h4>

                            <div className="text-gray-500 font-medium leading-relaxed mb-6 line-clamp-2">
                                {service.desc}
                            </div>

                            {service.title === 'LIVE CROWD TRACKER' ? (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-4 px-8 py-3 bg-kumkum text-white text-[10px] font-black tracking-[0.2em] rounded-full uppercase shadow-xl hover:shadow-kumkum/40 transition-all duration-300"
                                >
                                    SEE LIVE TRACKER
                                </motion.button>
                            ) : (
                                <div className="flex items-center gap-2 text-temple-gold font-black text-[9px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                    Access Portal
                                    <span>→</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Why Temples Choose Us - Unique Vertical Path Layout */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20 md:mt-40 mb-20 md:mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left Content: Typography */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 lg:sticky lg:top-32"
                    >
                        <div className="space-y-3">
                            <h2 className="text-sm font-black text-kumkum tracking-[0.4em] uppercase">WHY TEMPLES CHOOSE US</h2>
                            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-temple-dark tracking-tighter uppercase leading-[1.1]">
                                Bridging <span className="shimmer-orange">Tradition</span> <br className="hidden sm:block" />
                                with Technology
                            </h3>
                        </div>

                        <p className="text-gray-600 text-lg font-medium leading-relaxed max-w-lg">
                            We don't just build software; we architect sacred digital experiences that respect the sanctity of ancient rituals while embracing the efficiency of tomorrow.
                        </p>

                        <div className="flex gap-4 pt-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-10 py-4 bg-kumkum text-white font-black tracking-widest rounded-full text-[11px] shadow-2xl"
                            >
                                DOWNLOAD PORTFOLIO
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right Content: Vertical Path Journey */}
                    <div className="relative pl-12 md:pl-20 border-l-[1.5px] border-temple-gold/20 space-y-16 py-8">
                        {[
                            {
                                title: 'Deep Domain Expertise',
                                desc: 'Our team comprises experts who understand Temple Agamas, rituals, and the unique sensitivities required for sacred digital spaces.',
                                number: '01'
                            },
                            {
                                title: 'Proven Scalability',
                                desc: 'Engineered to handle millions of transactions during peak Brahmotsavams and festival seasons without a single byte of latency.',
                                number: '02'
                            },
                            {
                                title: 'Verifiable Security',
                                desc: 'Implementing multi-layer encryption and blockchain-ready systems to ensure every hundi offering and seva booking is transparent.',
                                number: '03'
                            },
                            {
                                title: 'Agama-Compliant Digital UI',
                                desc: 'Interfaces designed to be intuitive for devotees of all ages, maintaining a professional yet spiritual visual language.',
                                number: '04'
                            },
                            {
                                title: '24/7 Sanctum Support',
                                desc: 'Dedicated technical teams providing round-the-clock monitoring and support for critical temple infrastructure.',
                                number: '05'
                            }
                        ].map((point, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="relative"
                            >
                                {/* Glowing Node on the line */}
                                <div className="absolute -left-[57px] md:-left-[89.5px] top-0 w-12 h-12 bg-white rounded-full border-[1.5px] border-temple-gold/40 flex items-center justify-center shadow-lg z-20">
                                    <span className="text-[10px] font-black text-kumkum">{point.number}</span>
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="absolute inset-0 bg-temple-gold/20 rounded-full"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-2xl font-black text-temple-dark uppercase tracking-tight">
                                        {point.title}
                                    </h4>
                                    <p className="text-gray-500 font-medium leading-relaxed max-w-xl">
                                        {point.desc}
                                    </p>
                                    <div className="w-12 h-[2px] bg-gradient-to-r from-temple-gold to-transparent" />
                                </div>
                            </motion.div>
                        ))}

                        {/* Bottom Decorative Gold Fade */}
                        <div className="absolute bottom-0 -left-[1.5px] w-[3px] h-32 bg-gradient-to-t from-white via-temple-gold to-transparent" />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;

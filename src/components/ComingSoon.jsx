import React from 'react';
import { motion } from 'framer-motion';

const ComingSoon = ({ title }) => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#0F172A] relative overflow-hidden px-6">
            {/* Background Accents */}
            <div className="absolute inset-0 opacity-20">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-kumkum to-transparent blur-[120px]"
                />
            </div>

            <div className="relative z-10 text-center space-y-8 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-6 py-2 bg-temple-gold/10 border border-temple-gold/30 rounded-full"
                >
                    <span className="text-temple-gold font-black tracking-[0.4em] uppercase text-[10px]">Digital Transformation</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase"
                >
                    {title} <br />
                    <span className="shimmer-orange">Coming Soon</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[#94A3B8] text-lg font-medium leading-relaxed italic"
                >
                    "We are architecting a sacred digital bridge to bring the temple closer to your heart. Stay connected while we refine this experience."
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="pt-8"
                >
                    <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-temple-gold to-transparent mx-auto" />
                </motion.div>
            </div>
        </div>
    );
};

export default ComingSoon;

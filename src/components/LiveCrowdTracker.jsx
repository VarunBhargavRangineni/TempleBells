import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function LiveCrowdTracker() {
    const canvasRef = useRef(null);
    const [viewMode, setViewMode] = useState('Live'); // 'Live', 'Heatmap', 'Predictive'
    const [stats, setStats] = useState({
        activePilgrims: 0,
        avgWaitTime: 42,
        flowRate: 0,
        congestionLevel: 'STABLE'
    });

    const [isEntryOpen, setIsEntryOpen] = useState(true);
    const [moveFactor, setMoveFactor] = useState(1); // 1 = 1x, 2 = 2x speed

    // Simulation State
    const particles = useRef([]);
    const mainPath = [
        { x: 100, y: 80 }, { x: 300, y: 80 }, { x: 300, y: 180 }, { x: 100, y: 180 }, { x: 100, y: 300 },
        { x: 400, y: 300 }, { x: 400, y: 100 }, { x: 600, y: 100 }, { x: 600, y: 400 }, { x: 200, y: 400 },
        { x: 200, y: 500 }, { x: 650, y: 500 }
    ];

    const prasadamPath = [
        { x: 100, y: 80 }, { x: 300, y: 80 }, { x: 300, y: 180 }, { x: 100, y: 180 }, { x: 100, y: 300 },
        { x: 400, y: 300 }, { x: 400, y: 100 },
        { x: 500, y: 100 }, { x: 750, y: 100 }, { x: 750, y: 350 }, { x: 600, y: 350 }, // Use right gap
        { x: 600, y: 400 }, { x: 200, y: 400 }, { x: 200, y: 500 }, { x: 650, y: 500 }
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let tick = 0;

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const getScaledPoint = (pt) => {
            const scaleX = canvas.width / 800;
            const scaleY = canvas.height / 600;
            return { x: pt.x * scaleX, y: pt.y * scaleY };
        };

        const spawnParticle = () => {
            if (!isEntryOpen) return;
            const maxParticles = viewMode === 'Predictive' ? 300 : 150;
            if (particles.current.length < maxParticles) {
                const isPrasadam = Math.random() > 0.7;
                particles.current.push({
                    pathIndex: 0,
                    progress: 0,
                    speed: (0.002 + Math.random() * 0.003) * (viewMode === 'Predictive' ? 2 : 1),
                    color: viewMode === 'Predictive' ? '#00f2ff' : (Math.random() > 0.9 ? '#FFD700' : '#ffffff'),
                    size: viewMode === 'Predictive' ? 2.5 : (Math.random() * 2.5 + 3.5),
                    idOffset: Math.random() * 100,
                    isPrasadam: isPrasadam,
                    hasPrasadam: false
                });
            }
        };

        const draw = () => {
            ctx.fillStyle = '#0F172A';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Grid
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += 40) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += 40) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }

            // 1. Draw Static Path Background
            const drawPath = (points) => {
                ctx.beginPath();
                const start = getScaledPoint(points[0]);
                ctx.moveTo(start.x, start.y);
                points.slice(1).forEach(pt => {
                    const p = getScaledPoint(pt);
                    ctx.lineTo(p.x, p.y);
                });
                ctx.stroke();
            };

            ctx.strokeStyle = viewMode === 'Predictive' ? 'rgba(0, 242, 255, 0.08)' : 'rgba(212, 175, 55, 0.1)';
            ctx.lineWidth = 30;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            drawPath(mainPath);
            drawPath(prasadamPath);

            // 2. Render Particles
            let nearExitCount = 0;
            particles.current.forEach((p) => {
                const currentPath = p.isPrasadam ? prasadamPath : mainPath;
                if (p.pathIndex >= currentPath.length - 1) return;

                const p1 = getScaledPoint(currentPath[p.pathIndex]);
                const p2 = getScaledPoint(currentPath[p.pathIndex + 1]);

                const isDarshan = p.pathIndex === 5;
                const isPrasadamDwell = p.isPrasadam && p.pathIndex === 8;

                const curSpeed = ((isDarshan || isPrasadamDwell) ? (p.speed * 0.4) : p.speed) * moveFactor;

                if (isPrasadamDwell && p.progress > 0.48) p.hasPrasadam = true;

                const x = p1.x + (p2.x - p1.x) * p.progress;
                const y = p1.y + (p2.y - p1.y) * p.progress;

                if (p.pathIndex >= currentPath.length - 2 && p.progress > 0.6) {
                    nearExitCount++;
                }

                const isInsideTemple = (p.pathIndex === 4 && p.progress > 0.72) ||
                    (p.pathIndex === 5 && p.progress < 0.82);

                const isInsidePrasadam = p.isPrasadam && p.pathIndex === 8 && p.progress > 0.3 && p.progress < 0.7;

                if (!isInsideTemple && !isInsidePrasadam) {
                    if (viewMode === 'Heatmap') {
                        const grad = ctx.createRadialGradient(x, y, 0, x, y, 25);
                        grad.addColorStop(0, 'rgba(255, 69, 0, 0.4)');
                        grad.addColorStop(1, 'rgba(255, 69, 0, 0)');
                        ctx.fillStyle = grad;
                        ctx.globalCompositeOperation = 'lighter';
                        ctx.beginPath(); ctx.arc(x, y, 25, 0, Math.PI * 2); ctx.fill();
                        ctx.globalCompositeOperation = 'source-over';
                    } else if (viewMode === 'Predictive') {
                        ctx.fillStyle = p.color;
                        ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2); ctx.fill();
                        ctx.strokeStyle = p.color;
                        ctx.lineWidth = 1;
                        ctx.globalAlpha = 0.3;
                        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - (p2.x - p1.x) * 0.1, y - (p2.y - p1.y) * 0.1); ctx.stroke();
                        ctx.globalAlpha = 1.0;
                    } else {
                        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
                        const size = p.size * 1.8;
                        const walkCycle = (tick * curSpeed * 60) + p.idOffset;

                        const legSwing = Math.sin(walkCycle) * (size * 0.6);
                        const armSwing = Math.sin(walkCycle) * (size * 0.4);

                        ctx.save();
                        ctx.translate(x, y);
                        ctx.rotate(angle);

                        ctx.fillStyle = 'rgba(0,0,0,0.2)';
                        ctx.beginPath();
                        ctx.ellipse(0, 0, size * 1.2, size * 0.6, 0, 0, Math.PI * 2);
                        ctx.fill();

                        ctx.fillStyle = p.color;
                        ctx.strokeStyle = p.color;
                        ctx.lineCap = 'round';
                        ctx.lineWidth = size * 0.25;

                        ctx.globalAlpha = 0.5;
                        ctx.beginPath();
                        ctx.ellipse(legSwing, -size * 0.45, size * 0.3, size * 0.15, 0, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.ellipse(-legSwing, size * 0.45, size * 0.3, size * 0.15, 0, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.globalAlpha = 1.0;

                        ctx.lineWidth = size * 0.2;
                        ctx.beginPath();
                        ctx.moveTo(-size * 0.2, -size * 0.6);
                        ctx.lineTo(-armSwing, -size * 0.8);
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.moveTo(-size * 0.2, size * 0.6);
                        ctx.lineTo(armSwing, size * 0.8);
                        ctx.stroke();

                        if (p.hasPrasadam) {
                            ctx.save();
                            ctx.translate(armSwing, size * 0.85);
                            ctx.fillStyle = '#FF8C00';
                            ctx.beginPath();
                            ctx.fillRect(-size * 0.15, 0, size * 0.3, size * 0.3);
                            ctx.strokeStyle = '#FFD700';
                            ctx.lineWidth = 0.5;
                            ctx.strokeRect(-size * 0.15, 0, size * 0.3, size * 0.3);
                            ctx.restore();
                        }

                        ctx.beginPath();
                        ctx.moveTo(-size * 0.5, -size * 0.55);
                        ctx.lineTo(size * 0.35, -size * 0.45);
                        ctx.lineTo(size * 0.35, size * 0.45);
                        ctx.lineTo(-size * 0.5, size * 0.55);
                        ctx.closePath();
                        ctx.fill();

                        ctx.beginPath();
                        ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                        ctx.lineWidth = 1;
                        ctx.stroke();

                        ctx.restore();
                    }
                }

                p.progress += curSpeed;
                if (p.progress >= 1) {
                    p.progress = 0;
                    p.pathIndex++;
                }
            });

            // Architecture
            const drawSecurityGuard = (x, y, mode, angle) => {
                ctx.save();
                ctx.translate(x, y);
                const guardScale = 1.3;
                const uniformColor = '#1E293B';
                const skinColor = '#FDBA74';
                const badgeColor = '#FFD700';

                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.beginPath(); ctx.ellipse(0, 8, 5, 2, 0, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = uniformColor;
                ctx.fillRect(-3 * guardScale, 4 * guardScale, 2.5 * guardScale, 6 * guardScale);
                ctx.fillRect(0.5 * guardScale, 4 * guardScale, 2.5 * guardScale, 6 * guardScale);
                ctx.fillRect(-4 * guardScale, -4 * guardScale, 8 * guardScale, 9 * guardScale);

                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-4.5 * guardScale, -3.5 * guardScale, 2 * guardScale, 0.8 * guardScale);
                ctx.fillRect(2.5 * guardScale, -3.5 * guardScale, 2 * guardScale, 0.8 * guardScale);

                ctx.fillStyle = badgeColor;
                ctx.beginPath(); ctx.arc(1.5 * guardScale, -1.5 * guardScale, 1, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = skinColor;
                ctx.beginPath(); ctx.arc(0, -7 * guardScale, 3 * guardScale, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = uniformColor;
                ctx.fillRect(-3.5 * guardScale, -9.5 * guardScale, 7 * guardScale, 2.5 * guardScale);
                ctx.lineWidth = 0.5;
                ctx.strokeStyle = '#000000';
                ctx.strokeRect(-3.5 * guardScale, -9.5 * guardScale, 7 * guardScale, 2.5 * guardScale);

                ctx.strokeStyle = uniformColor;
                ctx.lineWidth = 2.5 * guardScale;
                ctx.lineCap = 'round';

                if (mode === 'guiding') {
                    ctx.beginPath(); ctx.moveTo(4 * guardScale, 0); ctx.lineTo(7 * guardScale, 5 * guardScale); ctx.stroke();
                    ctx.save();
                    ctx.rotate(angle || 0);
                    const pointAmt = Math.sin(tick * 0.1) * 2;
                    ctx.beginPath(); ctx.moveTo(-4 * guardScale, 0); ctx.lineTo(-12 * guardScale + pointAmt, 0); ctx.stroke();
                    ctx.fillStyle = skinColor;
                    ctx.beginPath(); ctx.arc(-12 * guardScale + pointAmt, 0, 1.5, 0, Math.PI * 2); ctx.fill();
                    ctx.restore();
                } else if (mode === 'scanning') {
                    const scanAmt = Math.sin(tick * 0.1) * 0.4;
                    ctx.save();
                    ctx.rotate(scanAmt);
                    ctx.beginPath(); ctx.moveTo(4 * guardScale, 0); ctx.lineTo(10 * guardScale, 4 * guardScale); ctx.stroke();
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(8 * guardScale, 3 * guardScale, 5 * guardScale, 2.5 * guardScale);
                    ctx.restore();
                    ctx.beginPath(); ctx.moveTo(-4 * guardScale, 0); ctx.lineTo(-8 * guardScale, 4 * guardScale); ctx.stroke();
                } else if (mode === 'greeting') {
                    const shakeAmt = Math.sin(tick * 0.2) * 0.2;
                    ctx.save();
                    ctx.translate(-4 * guardScale, -1 * guardScale);
                    ctx.rotate(-0.8 + shakeAmt);
                    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-10 * guardScale, 0); ctx.stroke();
                    ctx.restore();
                    ctx.beginPath(); ctx.moveTo(4 * guardScale, 0); ctx.lineTo(7 * guardScale, 5 * guardScale); ctx.stroke();
                }

                if (moveFactor === 2) {
                    ctx.save();
                    const floatY = Math.sin(tick * 0.15) * 2;
                    ctx.translate(0, -22 + floatY);
                    ctx.fillStyle = '#FFD700';
                    ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(-3, 14); ctx.lineTo(3, 14); ctx.fill();
                    ctx.beginPath(); ctx.roundRect(-25, -5, 50, 15, 4); ctx.fill();
                    ctx.fillStyle = '#000000';
                    ctx.font = 'bold 8px Outfit';
                    ctx.textAlign = 'center';
                    ctx.fillText('MOVE FAST!', 0, 5);
                    ctx.restore();
                }
                ctx.restore();
            };

            // Draw Structures
            const entryPt = getScaledPoint(mainPath[0]);
            const sanctum = getScaledPoint({ x: 400, y: 300 });
            const prasadam = getScaledPoint({ x: 750, y: 220 });
            const exitPt = getScaledPoint(mainPath[mainPath.length - 1]);

            // Guards
            const extraGuardPoints = [
                { x: 200, y: 180, label: 'MARSHAL-1', angle: 0 },
                { x: 250, y: 300, label: 'MARSHAL-2', angle: Math.PI },
                { x: 625, y: 100, label: 'MARSHAL-4', angle: Math.PI },
                { x: 600, y: 400, label: 'MARSHAL-5', angle: 0 },
                { x: 200, y: 500, label: 'MARSHAL-6', angle: Math.PI }
            ];

            extraGuardPoints.forEach((pt) => {
                const pos = getScaledPoint(pt);
                ctx.save();
                ctx.translate(pos.x, pos.y);
                drawSecurityGuard(0, 0, 'guiding', pt.angle);
                ctx.fillStyle = 'rgba(0, 242, 255, 0.4)';
                ctx.font = 'bold 7px Outfit';
                ctx.textAlign = 'center';
                ctx.fillText(pt.label, 0, 15);
                ctx.restore();
            });

            // Entry Guard
            ctx.save();
            ctx.translate(entryPt.x, entryPt.y);
            drawSecurityGuard(0, 0, isEntryOpen ? 'scanning' : 'guiding', 0);
            ctx.fillStyle = '#10B981';
            ctx.font = 'bold 9px Outfit';
            ctx.textAlign = 'right';
            ctx.fillText('ENTRY GATE', -15, -10);
            ctx.restore();

            // Temple Namuna (Blueprint Style)
            ctx.save();
            ctx.translate(sanctum.x, sanctum.y);
            const templePulse = (Math.sin(tick * 0.05) + 1) / 2;

            // Outer Base Outlines (Double Line)
            ctx.strokeStyle = '#D4AF37';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(-90, -90, 180, 180);
            ctx.lineWidth = 0.8;
            ctx.strokeRect(-82, -82, 164, 164);

            // Central Vertical Glow Stripe
            const vGlow = ctx.createLinearGradient(0, -180, 0, 90);
            vGlow.addColorStop(0, 'rgba(212, 175, 55, 0)');
            vGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.15)');
            vGlow.addColorStop(1, 'rgba(212, 175, 55, 0)');
            ctx.fillStyle = vGlow;
            ctx.fillRect(-15, -180, 30, 270);

            // Main Sanctum Block (Base of tower)
            ctx.fillStyle = 'rgba(212, 175, 55, 0.05)';
            ctx.fillRect(-50, -60, 100, 120);
            ctx.strokeStyle = '#D4AF37';
            ctx.lineWidth = 1;
            ctx.strokeRect(-50, -60, 100, 120);

            // Tiered Tower Structure (Precisely matching the image)
            const templeTiers = [
                { w: 80, h: 25, y: -35 }, // Large base tier
                { w: 60, h: 20, y: -55 },
                { w: 45, h: 18, y: -73 },
                { w: 32, h: 22, y: -95 },
                { w: 18, h: 25, y: -120 },
                { w: 8, h: 15, y: -135 },
                { w: 4, h: 10, y: -145 }
            ];

            templeTiers.forEach((tier, i) => {
                ctx.fillStyle = `rgba(212, 175, 55, ${0.1 + i * 0.02})`;
                ctx.fillRect(-tier.w / 2, tier.y, tier.w, tier.h);
                ctx.strokeStyle = `rgba(212, 175, 55, 0.8)`;
                ctx.lineWidth = 1;
                ctx.strokeRect(-tier.w / 2, tier.y, tier.w, tier.h);
            });

            // Top Flag
            ctx.save();
            ctx.translate(0, -145);
            ctx.strokeStyle = '#D4AF37';
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -35); ctx.stroke();
            ctx.fillStyle = '#FF4D00'; // Saffron/Orange
            ctx.beginPath();
            ctx.moveTo(0, -35);
            const flagMove = Math.sin(tick * 0.04) * 4;
            ctx.bezierCurveTo(12, -35 + flagMove, 20, -28, 15, -22);
            ctx.lineTo(0, -25);
            ctx.fill();
            ctx.restore();

            // Background Radial Glow
            const glow = ctx.createRadialGradient(0, -50, 0, 0, -50, 130);
            glow.addColorStop(0, `rgba(255, 215, 0, ${0.1 + templePulse * 0.05})`);
            glow.addColorStop(1, 'rgba(255, 215, 0, 0)');
            ctx.fillStyle = glow;
            ctx.beginPath(); ctx.arc(0, -50, 130, 0, Math.PI * 2); ctx.fill();
            ctx.restore();

            // Prasadam Hub (Blueprint Style)
            ctx.save();
            ctx.translate(prasadam.x, prasadam.y);

            // Vertical Glow Stripe Behind
            const pVGlow = ctx.createLinearGradient(0, -50, 0, 50);
            pVGlow.addColorStop(0, 'rgba(212, 175, 55, 0)');
            pVGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.15)');
            pVGlow.addColorStop(1, 'rgba(212, 175, 55, 0)');
            ctx.fillStyle = vGlow; // Reusing vGlow logic or similar
            ctx.fillRect(-10, -50, 20, 100);

            // Foundation/Base
            ctx.strokeStyle = '#D4AF37';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(-35, 15, 70, 12);
            ctx.fillStyle = 'rgba(212, 175, 55, 0.05)';
            ctx.fillRect(-35, 15, 70, 12);

            // 4 Pillars
            ctx.lineWidth = 1;
            const pCols = [-25, -10, 10, 25];
            pCols.forEach(px => {
                ctx.strokeRect(px - 1.5, -15, 3, 30);
                ctx.fillStyle = 'rgba(212, 175, 55, 0.1)';
                ctx.fillRect(px - 1.5, -15, 3, 30);
            });

            // Main Roof Bar
            ctx.strokeRect(-40, -22, 80, 8);
            ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
            ctx.fillRect(-40, -22, 80, 8);

            // Stacked Roof Tiers
            const pRoofTiers = [
                { w: 50, h: 6, y: -28 },
                { w: 30, h: 5, y: -33 },
                { w: 12, h: 4, y: -37 }
            ];
            pRoofTiers.forEach(tier => {
                ctx.strokeRect(-tier.w / 2, tier.y, tier.w, tier.h);
                ctx.fillStyle = 'rgba(212, 175, 55, 0.1)';
                ctx.fillRect(-tier.w / 2, tier.y, tier.w, tier.h);
            });

            // Label Styling
            ctx.fillStyle = '#D4AF37';
            ctx.font = '900 11px Outfit';
            ctx.textAlign = 'center';
            ctx.fillText('PRASADAM HUB', 0, 42);
            ctx.restore();

            // Exit Gate
            ctx.save();
            ctx.translate(exitPt.x, exitPt.y);
            drawSecurityGuard(0, 0, nearExitCount > 0 ? 'greeting' : 'hustling');
            ctx.fillStyle = '#EF4444';
            ctx.font = 'bold 9px Outfit';
            ctx.textAlign = 'left';
            ctx.fillText('EXIT GATE', 15, -10);
            ctx.restore();

            // Particle Maintenance
            particles.current = particles.current.filter(p => {
                const currentPath = p.isPrasadam ? prasadamPath : mainPath;
                return p.pathIndex < currentPath.length - 1;
            });

            if (tick % 15 === 0) {
                const multiplier = viewMode === 'Predictive' ? 2.5 : 1;
                const count = particles.current.length;
                const calculatedWaitTime = count === 0 ? 0 : Math.floor(5 + (count * 0.12) * multiplier);
                setStats(prev => ({
                    ...prev,
                    activePilgrims: count,
                    avgWaitTime: calculatedWaitTime,
                    flowRate: Math.floor((80 + Math.floor(Math.random() * 10)) * multiplier),
                    congestionLevel: count > (viewMode === 'Predictive' ? 250 : 130) ? 'HIGH' :
                        count > (viewMode === 'Predictive' ? 150 : 80) ? 'MODERATE' : 'LOW'
                }));
            }

            tick++;
            if (tick % (viewMode === 'Predictive' ? 5 : 20) === 0) spawnParticle();
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [viewMode, isEntryOpen, moveFactor]);

    return (
        <section id="live-tracker" className="bg-[#0F172A] py-16 border-b-2 border-temple-gold relative overflow-hidden text-white">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-widest mb-2 uppercase bg-gradient-to-r from-temple-gold via-white to-temple-gold bg-clip-text text-transparent">
                        REAL-TIME CROWD INTELLIGENCE
                    </h2>
                    <p className="text-[#94A3B8] text-sm md:text-base uppercase tracking-wider mb-8">
                        {viewMode === 'Live' && 'Live Digital Twin of Temple Complex • AI Driven'}
                        {viewMode === 'Heatmap' && 'Density Intensity Analysis • Optimization Mode'}
                        {viewMode === 'Predictive' && 'AI Forecasting • High Load Stress Simulation'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8 bg-[#141E33] border border-[#334155] rounded-3xl p-4 shadow-2xl">
                    <div className="lg:col-span-3 relative h-[600px] bg-[#0F172A] rounded-xl overflow-hidden border border-[#334155]">
                        <div className="absolute top-6 right-6 flex flex-col items-end gap-3 z-10">
                            <div className={`px-4 py-1.5 rounded font-extrabold text-xs border-1.5 animate-pulse tracking-widest shadow-lg ${viewMode === 'Live' ? 'bg-red-500/15 text-red-500 border-red-500/50' :
                                viewMode === 'Heatmap' ? 'bg-orange-500/15 text-orange-500 border-orange-500/50' :
                                    'bg-cyan-500/15 text-cyan-500 border-cyan-500/50'
                                }`}>
                                {viewMode === 'Live' ? '● LIVE SYSTEM' : viewMode === 'Heatmap' ? '🔥 HEATMAP ACTIVE' : '🧬 PREDICTIVE AI'}
                            </div>
                            <div className={`px-3 py-1 rounded text-[10px] font-bold tracking-wider ${isEntryOpen ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/40' :
                                'bg-red-500/15 text-red-500 border border-red-500/40 animate-pulse'
                                }`}>
                                {isEntryOpen ? 'ENTRY OPEN' : 'ENTRY CLOSED'}
                            </div>
                        </div>
                        <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair"></canvas>
                        <div className="absolute bottom-4 left-0 w-full flex justify-between px-6 text-[10px] text-[#64748B] uppercase pointer-events-none font-bold">
                            <span>Q-Complex Entry</span>
                            <span>Sanctum Sanctorum</span>
                            <span>Exit</span>
                        </div>
                    </div>

                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <div className="bg-[#0F172A] p-4 rounded-xl border border-[#334155] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>
                            <span className="block text-[#94A3B8] text-[9px] mb-1 uppercase font-black tracking-tighter">
                                {viewMode === 'Predictive' ? 'Forecasted Pilgrims' : 'Active Pilgrims'}
                            </span>
                            <h3 className="text-2xl font-black text-white">{stats.activePilgrims}</h3>
                            <div className="absolute top-4 right-4 text-[9px] font-bold text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                ▲ 12%
                            </div>
                        </div>

                        <div className="bg-[#0F172A] p-4 rounded-xl border border-[#334155] relative overflow-hidden group">
                            <span className="block text-[#94A3B8] text-[9px] mb-1 uppercase font-black tracking-tighter">Avg. Wait Time</span>
                            <h3 className="text-2xl font-black text-white">{stats.avgWaitTime} <span className="text-[10px] text-[#64748B] font-normal tracking-normal uppercase">mins</span></h3>
                            <div className="absolute top-4 right-4 text-[9px] font-bold text-red-500 flex items-center gap-1 bg-red-500/10 px-2 py-0.5 rounded-full">
                                ▼ 2m
                            </div>
                        </div>

                        <div className="bg-[#0F172A] p-4 rounded-xl border border-[#334155]">
                            <span className="block text-[#94A3B8] text-[9px] mb-1 uppercase font-black tracking-tighter">Flow Rate</span>
                            <h3 className="text-2xl font-black text-white">{stats.flowRate} <span className="text-[10px] text-[#64748B] font-normal tracking-normal uppercase">/min</span></h3>
                            <div className="h-1.5 bg-[#1E293B] rounded-full mt-3 overflow-hidden">
                                <motion.div
                                    animate={{ width: viewMode === 'Predictive' ? '95%' : '75%' }}
                                    className="h-full bg-temple-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                                ></motion.div>
                            </div>
                        </div>

                        <div className="bg-[#0F172A] p-4 rounded-xl border border-[#334155]">
                            <span className="block text-[#94A3B8] text-[9px] mb-1 uppercase font-black tracking-tighter">Current Status</span>
                            <h3 className={`text-xl font-black ${stats.congestionLevel === 'HIGH' ? 'text-red-500' :
                                stats.congestionLevel === 'MODERATE' ? 'text-orange-500' : 'text-emerald-500'
                                }`}>
                                {stats.congestionLevel}
                            </h3>
                            <p className="text-[9px] text-temple-gold mt-3 flex items-center font-bold tracking-tight">
                                <span className="mr-1.5 animate-pulse">✦</span> AI Insight: {viewMode === 'Predictive' ? 'Simulating Peak Load' : 'Stable Flow Maintained'}
                            </p>
                        </div>

                        <div className="flex flex-col gap-5 mt-auto pt-5 border-t border-[#1E293B]">
                            <div className="flex flex-col gap-2">
                                <span className="text-[9px] font-black text-[#64748B] uppercase tracking-[0.2em]">Entrance Control</span>
                                <div className="flex gap-2">
                                    <button
                                        className={`flex-1 py-1.5 px-2 text-[9px] font-black rounded-lg transition-all uppercase tracking-wider ${isEntryOpen ? 'bg-temple-gold text-[#0F172A]' : 'bg-[#1E293B] border border-[#475569] text-[#94A3B8]'
                                            }`}
                                        onClick={() => setIsEntryOpen(true)}
                                    >Open Entry</button>
                                    <button
                                        className={`flex-1 py-1.5 px-2 text-[9px] font-black rounded-lg transition-all uppercase tracking-wider ${!isEntryOpen ? 'bg-red-500 text-white' : 'bg-[#1E293B] border border-[#475569] text-[#94A3B8]'
                                            }`}
                                        onClick={() => setIsEntryOpen(false)}
                                    >Close Entry</button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-[9px] font-black text-[#64748B] uppercase tracking-[0.2em]">Flow Command</span>
                                <div className="flex gap-2">
                                    <button
                                        className={`flex-1 py-1.5 px-2 text-[9px] font-black rounded-lg transition-all uppercase tracking-wider ${moveFactor === 1 ? 'bg-temple-gold text-[#0F172A]' : 'bg-[#1E293B] border border-[#475569] text-[#94A3B8]'
                                            }`}
                                        onClick={() => setMoveFactor(1)}
                                    >Steady</button>
                                    <button
                                        className={`flex-1 py-1.5 px-2 text-[9px] font-black rounded-lg transition-all uppercase tracking-wider ${moveFactor === 2 ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'bg-[#1E293B] border border-[#475569] text-[#94A3B8]'
                                            }`}
                                        onClick={() => setMoveFactor(2)}
                                    >Rapid</button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-[9px] font-black text-[#64748B] uppercase tracking-[0.2em]">View Modes</span>
                                <div className="flex gap-1">
                                    {['Live', 'Heatmap', 'Predictive'].map(mode => (
                                        <button
                                            key={mode}
                                            className={`flex-1 py-1 px-1 text-[8px] font-black rounded transition-all uppercase ${viewMode === mode ? 'bg-temple-gold text-[#0F172A]' : 'bg-[#1E293B] border border-[#475569] text-[#94A3B8]'
                                                }`}
                                            onClick={() => setViewMode(mode)}
                                        >{mode}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-4 text-[#475569] text-[10px] mt-8 font-black tracking-[0.3em] uppercase">
                    <span>Powered By:</span>
                    <span className="text-white bg-white/5 px-3 py-1 rounded">VisdomWaves</span>
                </div>
            </div>
        </section>
    );
}

export default LiveCrowdTracker;

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Gift,
  Utensils,
  Flame,
  Hammer,
  BookOpen,
  Heart,
  Leaf,
  CheckCircle,
  ShieldCheck,
  FileText,
  Landmark,
  CreditCard,
  Smartphone,
  Globe,
  Bell,
  ChevronDown
} from 'lucide-react';

const Cow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 21a4 4 0 0 1-4-4V9a5 5 0 0 1 10 0v8a4 4 0 0 1-4 4Z" />
    <path d="M9 7V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v3" />
    <path d="M11 21h3a4 4 0 0 0 4-4V9a5 5 0 0 0-10 0v4" />
    <path d="M7 13h10" />
    <path d="M17 7V5c0-1.1.9-2 2-2h1" />
    <path d="M21 7v3" />
  </svg>
);

// --- DATA ---
const DONATION_CATEGORIES = [
  {
    id: 'hundi',
    title: 'General Hundi Donation',
    description: 'Supports overall temple maintenance and daily rituals.',
    icon: 'images/Hundi.webp',
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  },
  {
    id: 'annadanam',
    title: 'Annadanam',
    description: 'Providing free meals to thousands of devotees daily.',
    icon: 'images/Annadanam.webp',
    color: 'text-green-600',
    bg: 'bg-green-50'
  },
  {
    id: 'nityaseva',
    title: 'Nitya Seva Support',
    description: 'Contribute to the eternal lamps and daily poojas.',
    icon: 'images/Nitya Seva.webp',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50'
  },
  {
    id: 'renovation',
    title: 'Temple Renovation Fund',
    description: 'Restoring ancient structures and building new amenities.',
    icon: 'images/Renovation.webp',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    id: 'veda',
    title: 'Veda Patashala Support',
    description: 'Preserving ancient vedic knowledge and education.',
    icon: 'images/Veda Patashala.webp',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  {
    id: 'medical',
    title: 'Charity & Medical Help',
    description: 'Medical aid for the needy and poor pilgrims.',
    icon: 'images/Charity & Medical.webp',
    color: 'text-red-600',
    bg: 'bg-red-50'
  },
  {
    id: 'goshala',
    title: 'Goshala Donation',
    description: 'Protection and care for cows (Go-Samrakshana).',
    icon: 'images/Goshala.webp',
    color: 'text-amber-700',
    bg: 'bg-amber-50'
  }
];

const PRESET_AMOUNTS = [100, 500, 1000];

const RECENT_DONORS = [
  { name: "Srinivas Rao", amount: 5001, purpose: "Annadanam" },
  { name: "Lakshmi Devi", amount: 501, purpose: "Hundi" },
  { name: "Uma Maheswara Rao D.", amount: 5116, purpose: "Goshala" },
  { name: "Narendra Babu R.", amount: 1011, purpose: "Renovation" },
  { name: "Ananya Reddy", amount: 200, purpose: "Medical" },
  { name: "Venkatesh P.", amount: 1001, purpose: "Nitya Seva" },
  { name: "Krishna Murthy", amount: 116, purpose: "Hundi" },
];

const IMPACT_STATS = [
  { label: "Today Total Donations", value: 125850, suffix: "", prefix: "₹", icon: 'images/Hundi.webp' },
  { label: "Meals Served", value: 25000, suffix: "+", prefix: "", icon: 'images/Annadanam.webp' },
  { label: "Renovation Projects", value: 3, suffix: "", prefix: "", icon: 'images/Renovation.webp' },
];

// --- COMPONENTS ---
const Counter = ({ value, duration = 1 }) => {
  const [count, setCount] = useState(value);
  const countRef = useRef(value);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) {
      setCount(value);
      countRef.current = value;
      return;
    }

    const start = countRef.current;
    const end = value;

    const isUpdate = Math.abs(end - start) < 500 && start !== 0;
    const animDuration = isUpdate ? 0.5 : duration;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / animDuration, 1);

      const easeOutQuad = t => t * (2 - t);
      const currentCount = Math.round(start + (end - start) * easeOutQuad(progress));

      setCount(currentCount);
      countRef.current = currentCount;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, isInView, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with sophisticated blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-temple-dark/40 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden p-10 text-center border border-white/20"
          >
            {/* Divine Particles / Petals Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -20, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [100, 400],
                    x: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                    rotate: 360
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                  className="absolute w-2 h-2 bg-temple-gold/40 rounded-full"
                  style={{ left: `${Math.random() * 100}%`, top: -20 }}
                />
              ))}
            </div>

            {/* Glowing Bell Section */}
            <div className="flex justify-center mb-8 relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative z-10"
              >
                <div className="absolute inset-x-0 bottom-0 h-4 bg-yellow-500/20 blur-xl rounded-full translate-y-4"></div>
                <div className="p-8 bg-gradient-to-b from-yellow-50 to-white rounded-full shadow-inner border border-yellow-100/50">
                  <motion.div
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Bell className="w-20 h-20 text-temple-gold drop-shadow-[0_0_15px_rgba(184,134,11,0.4)]" />
                  </motion.div>
                </div>

                {/* Divine Rays */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 -z-10 opacity-30"
                >
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute inset-0 flex justify-center" style={{ transform: `rotate(${i * 45}deg)` }}>
                      <div className="w-1 h-32 bg-gradient-to-t from-temple-gold/0 via-temple-gold to-temple-gold/0"></div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-4xl font-black text-temple-maroon mb-4 tracking-tight">
                Divine Offering Received
              </h3>

              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-temple-gold to-transparent mx-auto mb-6 opacity-50"></div>

              <p className="text-gray-600 mb-10 text-lg font-medium leading-relaxed max-w-sm mx-auto">
                Thank you for your noble contribution. <br />
                <span className="text-temple-maroon/80 italic font-bold">May Lord Venkateswara shower his choicest blessings upon you.</span>
              </p>

              <motion.button
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full py-4 bg-gradient-to-r from-temple-maroon via-kumkum to-temple-maroon bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-black tracking-[0.1em] uppercase rounded-2xl shadow-[0_20px_40px_-12px_rgba(155,27,27,0.3)] text-base"
              >
                Start New Offering
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- MAIN COMPONENT ---

const EDonation = () => {
  const formRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    gotram: '',
    mobile: '',
    email: '',
    purpose: '',
    amount: '',
    paymentMethod: 'UPI'
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Live Stats Logic
  const [liveStats, setLiveStats] = useState({
    donations: 125850,
    meals: 25000
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        donations: prev.donations + Math.floor(Math.random() * 80 + 20), // Increment by ₹20-100
        meals: prev.meals + (Math.random() > 0.6 ? 1 : 0) // Increment meal occasionally
      }));
    }, 2000); // Update every 2 seconds for a balanced feel
    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCardClick = (purpose, amount) => {
    setFormData(prev => ({ ...prev, purpose, amount }));
    scrollToForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount || !formData.purpose) {
      alert("Please fill in all mandatory fields");
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true);
      // Reset form usually happens here or after modal close
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-outfit relative overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50l25-25-25-25-25 25z' fill='%239B1B1B'/%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }} />
      </div>

      {/* --- SECTION 1: DIVINE HEADER --- */}
      <header className="relative h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="images/E-Donation Bg.webp"
            alt="Temple Banner"
            className="w-full h-full object-cover object-center"
          />
          {/* Clearer Gradient - Dark Text Protection on edges only */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10" />
        </div>

        <div className="relative z-20 text-center max-w-5xl px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-48"
          >

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(184, 134, 11, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToForm}
              className="px-10 py-5 bg-gradient-to-r from-temple-gold to-yellow-600 text-white font-bold tracking-widest uppercase rounded-full shadow-2xl border border-white/20 transition-all text-sm md:text-base relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Gift className="w-5 h-5" /> Donate Now
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </motion.button>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-20 relative z-10 -mt-20">

        {/* --- SECTION 2: DONATION CATEGORIES --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
          {DONATION_CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group h-full"
            >
              <div className={`p-6 ${cat.bg} border-b border-gray-100 flex items-center gap-5`}>
                <div className="w-20 h-20 bg-white rounded-[2rem] shadow-[0_8px_20px_-4px_rgba(184,134,11,0.2)] flex items-center justify-center overflow-hidden border-2 border-white transition-all duration-300 group-hover:shadow-[0_12px_24px_-4px_rgba(184,134,11,0.4)] group-hover:scale-105 flex-shrink-0">
                  {typeof cat.icon === 'string' ? (
                    <img
                      src={cat.icon}
                      alt={cat.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <cat.icon className={`w-9 h-9 ${cat.color}`} />
                  )}
                </div>
                <h3 className="font-black text-temple-maroon text-xl leading-[1.2] group-hover:translate-x-1 transition-transform">{cat.title}</h3>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-500 text-sm mb-6 flex-1">{cat.description}</p>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quick Amount</p>
                  <div className="flex gap-2">
                    {PRESET_AMOUNTS.map(amt => (
                      <button
                        key={amt}
                        onClick={() => handleCardClick(cat.id, amt)}
                        className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-temple-gold hover:text-white hover:border-temple-gold transition-colors"
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handleCardClick(cat.id, '')}
                    className="w-full py-2 bg-gray-50 text-temple-maroon font-bold text-sm rounded-lg hover:bg-temple-maroon hover:text-white transition-colors"
                  >
                    Custom Amount
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* --- SECTION 3: QUICK DONATION FORM --- */}
          <div className="lg:col-span-8">
            <div ref={formRef} className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-temple-maroon via-temple-gold to-temple-maroon"></div>

              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-temple-dark mb-4">Make a Divine Offering</h2>
                <p className="text-gray-500">Fill in your details to process the donation securely.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider ml-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Venkat Rao"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-temple-gold outline-none transition-all font-medium text-temple-dark"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider ml-1">Gotram</label>
                    <input
                      type="text"
                      value={formData.gotram}
                      onChange={(e) => setFormData({ ...formData, gotram: e.target.value })}
                      placeholder="e.g. Bharadwaja"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-temple-gold outline-none transition-all font-medium text-temple-dark"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider ml-1">Mobile Number</label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-temple-gold outline-none transition-all font-medium text-temple-dark"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider ml-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-temple-gold outline-none transition-all font-medium text-temple-dark"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider ml-1">Donation Purpose</label>
                    <div className="relative">
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-temple-gold outline-none transition-all font-medium text-temple-dark appearance-none cursor-pointer"
                        required
                      >
                        <option value="" disabled>Select Purpose</option>
                        {DONATION_CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.title}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider ml-1">Amount (₹)</label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="Enter Amount"
                      className="w-full p-4 bg-white border-2 border-temple-gold/30 rounded-xl focus:ring-2 focus:ring-temple-gold outline-none transition-all font-bold text-lg text-temple-maroon shadow-inner"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-wider ml-1">Payment Method</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['UPI', 'Card', 'Net Banking'].map(method => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: method })}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === method
                          ? 'border-temple-maroon bg-temple-maroon/5 text-temple-maroon shadow-md ring-1 ring-temple-maroon'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                          }`}
                      >
                        {method === 'UPI' && <Smartphone className="w-6 h-6" />}
                        {method === 'Card' && <CreditCard className="w-6 h-6" />}
                        {method === 'Net Banking' && <Landmark className="w-6 h-6" />}
                        <span className="text-sm font-bold">{method}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-gradient-to-r from-temple-maroon to-kumkum text-white font-black tracking-widest uppercase rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all text-lg mt-6"
                >
                  Offer Donation
                </button>

              </form>
            </div>
          </div>

          {/* --- SECTION 6: RECENT DONORS (SIDEBAR) --- */}
          <div className="lg:col-span-4 space-y-8">
            {/* Recent Donors */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 bg-temple-paper border-b border-temple-gold/20">
                <h3 className="font-bold text-temple-maroon uppercase tracking-widest text-sm text-center">Recent Divine Contributions</h3>
              </div>

              <div className="h-[400px] overflow-hidden relative">
                <motion.div
                  animate={{ y: ["0%", "-33.33%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 15,
                    ease: "linear",
                    repeatType: "loop"
                  }}
                  className="p-4 space-y-4 hover:pause"
                  onMouseEnter={(e) => {
                    // Note: hover pause is usually handled by CSS, hard to do with Framer Motion simple animation
                    // Simplest is keyframe animation in CSS or complex state. 
                    // For simplicity, we stick to continuous scroll or use CSS.
                  }}
                  style={{ cursor: 'default' }}
                >
                  {/* Duplicated list for seamless loop */}
                  {[...RECENT_DONORS, ...RECENT_DONORS, ...RECENT_DONORS].map((donor, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-temple-gold transition-colors">
                      <div>
                        <p className="font-bold text-temple-dark text-sm">{donor.name}</p>
                        <p className="text-xs text-gray-400 uppercase">{donor.purpose}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-temple-maroon text-lg drop-shadow-sm group-hover:scale-110 transition-transform">₹{donor.amount}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Gradient Overlay for Fade Effect */}
                <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Quick Info Box */}
            <div className="bg-temple-maroon rounded-3xl p-8 text-white text-center shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <Globe className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-xl font-bold mb-2">Foreign Contributions</h3>
              <p className="text-white/70 text-sm mb-6">We accept international donations through FCRA compliant gateways.</p>
              <button className="px-6 py-2 bg-white/10 rounded-lg text-sm font-bold border border-white/20 hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>
          </div>

        </div>

        {/* --- SECTION 5: DONATION IMPACT COUNTER --- */}
        <div className="mt-24 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#1A1814] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl border border-white/5"
          >
            {/* Sharper Dot Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='white'/%3E%3C/svg%3E")`, backgroundSize: '24px 24px' }}>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-center">
              {[
                { ...IMPACT_STATS[0], value: liveStats.donations },
                { ...IMPACT_STATS[1], value: liveStats.meals },
                IMPACT_STATS[2]
              ].map((stat, i) => (
                <div key={i} className={`flex flex-col items-center px-4 ${i !== 2 ? 'md:border-r border-white/10' : ''}`}>
                  <div className="mb-8 p-1 bg-white/5 rounded-2xl border border-white/10 shadow-xl">
                    {typeof stat.icon === 'string' ? (
                      <img src={stat.icon} alt={stat.label} className="w-14 h-14 object-cover rounded-[1rem]" />
                    ) : (
                      <div className="w-14 h-14 flex items-center justify-center bg-temple-gold/10 rounded-[1rem]">
                        <stat.icon className="w-8 h-8 text-temple-gold" />
                      </div>
                    )}
                  </div>

                  <div className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter flex items-center justify-center gap-1">
                    {stat.prefix && <span className="text-4xl md:text-5xl opacity-80 font-bold">{stat.prefix}</span>}
                    <Counter value={stat.value} />
                    {stat.suffix && <span className="text-4xl md:text-5xl opacity-80 font-bold">{stat.suffix}</span>}
                  </div>

                  <p className="text-white/40 uppercase tracking-[0.25em] text-[10px] md:text-xs font-black">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* --- SECTION 4: 100% TRANSPARENCY SECTION --- */}
        <div className="bg-white rounded-3xl p-10 md:p-14 shadow-lg border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-temple-dark mb-12 uppercase tracking-widest">Trust & Transparency</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Landmark, title: "Govt. Registered", desc: "Reg. Trust No. 123/2024" },
              { icon: FileText, title: "Tax Exemption", desc: "80G & 12A Certified" },
              { icon: CheckCircle, title: "Instant Receipt", desc: "Auto-generated via Email" },
              { icon: ShieldCheck, title: "Secure Payment", desc: "256-bit Encryption" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-temple-maroon">
                  <item.icon size={32} />
                </div>
                <h3 className="font-bold text-temple-dark mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Success Modal */}
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />

    </div>
  );
};

export default EDonation;

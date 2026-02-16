import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    BedDouble,
    Bath,
    MapPin,
    Wind,
    Shield,
    ShowerHead,
    CheckCircle,
    Star,
    Users,
    ArrowRight,
    Home,
    ShoppingBag,
    LayoutGrid,
    Compass,
    Search,
    Zap,
    Clock,
    Utensils
} from 'lucide-react';

const EAccommodation = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const accommodations = [
        {
            id: 'lux-1',
            name: "Srinivasa Nilayam",
            type: "Premium Suite",
            price: "₹2,500",
            capacity: "2 Adults, 1 Child",
            rating: 4.8,
            amenities: ["AC", "WiFi", "King Bed", "Temple View"],
            image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
            category: "premium",
            description: "Experience divine luxury steps away from the main temple complex.",
            stats: { total: 150, occupied: 142, empty: 8 }
        },
        {
            id: 'lux-2',
            name: "Venkateswara Cottage",
            type: "Family Cottage",
            price: "₹1,800",
            capacity: "4 Adults",
            rating: 4.6,
            amenities: ["Non-AC", "2 Bedrooms", "Garden", "Parking"],
            image: "https://karoonhotel.com/wp-content/uploads/2018/05/Karoon-Hotel-3-star-Tehran-Iran-VIP.jpg",
            category: "premium",
            description: "Spacious cottages perfect for large families seeking spiritual retreat.",
            stats: { total: 80, occupied: 65, empty: 15 }
        },
        {
            id: 'lux-3',
            name: "Padmavathi Guest House",
            type: "VIP Villa",
            price: "₹5,000",
            capacity: "6 Adults",
            rating: 4.9,
            amenities: ["Central AC", "3 Bedrooms", "Kitchen", "Driver Room"],
            image: "https://tirumalatirupationline.com/wp-content/uploads/2018/05/sri-padmavathi-guest-house-tirupati-hotels-zxmza.jpg",
            category: "premium",
            description: "Exclusive villas for large groups with premium amenities and private parking.",
            stats: { total: 20, occupied: 18, empty: 2 }
        },
        {
            id: 'lux-4',
            name: "Sapthagiri Residency",
            type: "Deluxe Room",
            price: "₹1,200",
            capacity: "2 Adults",
            rating: 4.5,
            amenities: ["AC", "TV", "Hot Water", "Lift"],
            image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
            category: "premium",
            description: "Modern comfort at an affordable price, located near the shopping complex.",
            stats: { total: 200, occupied: 180, empty: 20 }
        },
        {
            id: 'dorm-1',
            name: "Pilgrim Hall A",
            type: "Dormitory Bed",
            price: "₹100/bed",
            capacity: "Single Person",
            rating: 4.2,
            amenities: ["Locker", "Common Bath", "Fan", "Charging Point"],
            image: "https://tirupatitirumalainfo.com/wp-content/uploads/2023/05/nandakam-Guest-House.jpg",
            category: "dormitory",
            available: "45 Beds",
            description: "Clean and secure dormitory beds with locker facilities for budget travelers.",
            stats: { total: 500, occupied: 455, empty: 45 }
        },
        {
            id: 'dorm-2',
            name: "Narayana Sadan",
            type: "Floor Mattress",
            price: "₹50/spot",
            capacity: "Single Person",
            rating: 4.0,
            amenities: ["Locker", "Common Hall", "Water", "Security"],
            image: "https://i.ytimg.com/vi/uRfZtPyioKg/maxresdefault.jpg",
            category: "dormitory",
            available: "120 Spots",
            description: "Large community hall for mass accommodation with basic amenities.",
            stats: { total: 1000, occupied: 880, empty: 120 }
        },
        {
            id: 'dorm-3',
            name: "Govinda Nilayam",
            type: "Low Bed Hall",
            price: "₹75/bed",
            capacity: "Single Person",
            rating: 4.1,
            amenities: ["Low Wooden Cot", "Common Bath", "RO Water", "CCTV"],
            image: "https://i.ytimg.com/vi/Ajr8rsmnMuI/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLAnFlr7iVaqgPFt6sccPNsbkmt_dw",
            category: "dormitory",
            available: "80 Beds",
            description: "Traditional low wooden cots in a spacious, airy hall for a comfortable rest.",
            stats: { total: 300, occupied: 220, empty: 80 }
        },
        {
            id: 'dorm-4',
            name: "Madhavam Complex",
            type: "AC Dormitory",
            price: "₹200/bed",
            capacity: "Single Person",
            rating: 4.4,
            amenities: ["AC", "Locker", "Reading Light", "Shoe Rack"],
            image: "https://media-cdn.tripadvisor.com/media/photo-s/12/14/47/05/hairtha-srinivasam-complex.jpg",
            category: "dormitory",
            available: "15 Beds",
            description: "Air-conditioned dormitory for pilgrims seeking extra comfort during summer.",
            stats: { total: 150, occupied: 135, empty: 15 }
        }
    ];

    const furnitureItems = [
        {
            id: 'fur-1',
            name: "Single Bed",
            price: "₹4,250",
            location: "Central TTD Store, Srinivasa Complex",
            stock: 12,
            type: "Sale",
            image: "https://www.expofurnituregallery.com/cdn/shop/files/1753-1_noBG_front_9268_original_980x700.jpg?v=1706606357"
        },
        {
            id: 'fur-1a',
            name: "Wooden Bed",
            price: "₹1,999",
            location: "Pilgrim Utility Center",
            stock: 80,
            type: "Sale",
            image: "https://m.media-amazon.com/images/I/51JNiKlsibL.jpg"
        },
        {
            id: 'fur-1b',
            name: "Mattress & Pillow Set",
            price: "₹1,850",
            location: "GNC Complex, Counter 2",
            stock: 120,
            type: "Sale",
            image: "https://static.vecteezy.com/system/resources/previews/020/917/694/original/white-bed-isolated-png.png"
        },
        {
            id: 'fur-2',
            name: "Meditation Chair",
            price: "₹1,200",
            location: "CRO General Store, Counter 4",
            stock: 45,
            type: "Sale",
            image: "https://www.myhappyconscious.com/content/images/2023/05/Mediation-Chair---Mindful-Modern-Folding-Adjustable-Pro-Meditation-Chair.png"
        },
        {
            id: 'fur-3',
            name: "Folding Mat",
            price: "₹250",
            location: "All Reception Centers",
            stock: 200,
            type: "Sale",
            image: "https://2.imimg.com/data2/DV/CM/MY-5194383/folding-mat-250x250.jpg"
        },
        {
            id: 'fur-4',
            name: "Iron Bed",
            price: "₹1,200",
            location: "Pilgrim Utility Center, GNC",
            stock: 25,
            type: "Sale",
            image: "http://5.imimg.com/data5/SELLER/Default/2023/5/308293995/XU/XA/DR/142024080/iron-bed.png"
        },
        {
            id: 'fur-5',
            name: "Woolen Blanket",
            price: "₹450",
            location: "CRO Compelx, Reception",
            stock: 500,
            type: "Sale",
            image: "https://i.etsystatic.com/24876080/r/il/016572/4611341506/il_1080xN.4611341506_shtw.jpg"
        },
        {
            id: 'fur-6',
            name: "Baby Mosquito Net",
            price: "₹300",
            location: "Medical Stores & General Counters",
            stock: 150,
            type: "Sale",
            image: "https://5.imimg.com/data5/SELLER/Default/2023/4/299973750/SE/IF/PZ/183300208/img-20230412-wa0516-500x500.jpg"
        }
    ];

    const freshUpCenters = [
        {
            id: 'fresh-1',
            name: "Ganga Sthanam",
            location: "North Gate",
            price: "₹20",
            features: ["Hot Water", "Soap Provided", "Towel Rental", "Private Cubicle"],
            status: "Open Now",
            type: "Premium Bath"
        },
        {
            id: 'fresh-2',
            name: "Yamuna Complex",
            location: "Bus Stand Area",
            price: "₹10",
            features: ["Cold Water", "Changing Room", "Luggage Keeping", "Toilets"],
            status: "Open Now",
            type: "Basic Bath"
        },
        {
            id: 'fresh-3',
            name: "Triveni Utility",
            location: "Shopping Complex",
            price: "₹30",
            features: ["Deluxe Bath", "Locker Access", "Toiletries Kit", "Ironing"],
            status: "Busy",
            type: "Full Service"
        },
        {
            id: 'fresh-4',
            name: "Kaveri Ghat",
            location: "East Main Road",
            price: "Free",
            features: ["Public Bath", "Changing Room", "Drinking Water", "Shoe Stand"],
            status: "Open Now",
            type: "Public Utility"
        },
        {
            id: 'fresh-5',
            name: "Narmada Bhavan",
            location: "Railway Station",
            price: "₹50",
            features: ["AC Lounge", "Hot Shower", "Luggage Locker", "Nap Room"],
            status: "Available",
            type: "Premium Bath"
        },
        {
            id: 'fresh-6',
            name: "Saraswati Block",
            location: "Old Queue Complex",
            price: "₹15",
            features: ["Warm Water", "Mirror Area", "Mobile Charging", "Cloak Room"],
            status: "Crowded",
            type: "Standard Bath"
        }
    ];

    const handleBook = (place) => {
        navigate('/book-accommodation', {
            state: {
                accommodation: place,
                templeName: 'Tirumala'
            }
        });
    };

    const premiumAvailable = accommodations
        .filter(a => a.category === 'premium')
        .reduce((acc, curr) => acc + curr.stats.empty, 0);

    const dormAvailable = accommodations
        .filter(a => a.category === 'dormitory')
        .reduce((acc, curr) => acc + curr.stats.empty, 0);

    const features = [
        { icon: Shield, title: "24/7 Security", desc: "Round-the-clock surveillance for your safety." },
        { icon: Clock, title: "Instant Booking", desc: "Real-time confirmation for all room types." },
        { icon: Utensils, title: "Annaprasadam", desc: "Free hygienic food counters near all stays." },
        { icon: Zap, title: "Power Backup", desc: "Uninterrupted power supply in all complexes." }
    ];

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
                                    <Home className="text-white" size={18} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <h1 className="text-lg md:text-2xl font-black text-temple-dark tracking-tight leading-[1.1] mb-0 uppercase">
                        SACRED <span className="text-kumkum">SANCTUARIES</span> <br />
                        <span className="text-temple-gold text-xs md:text-base italic font-medium block mt-1">Experience divine hospitality. From luxury suites to pilgrim dormitories.</span>
                    </h1>
                </motion.div>

                {/* Search/Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="sticky top-[72px] z-40 bg-white/40 backdrop-blur-md border border-white/50 rounded-[2rem] p-2 mb-8 shadow-2xl shadow-gray-200/50"
                >
                    <div className="bg-white rounded-[1.8rem] p-4 md:p-6">
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                            <div className="flex gap-2 bg-slate-100 p-1 rounded-2xl w-full md:w-auto">
                                {['all', 'premium', 'Common'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all w-full md:w-auto ${selectedCategory === cat
                                            ? 'bg-kumkum text-white shadow-lg shadow-kumkum/30'
                                            : 'text-slate-500 hover:text-slate-700'
                                            }`}
                                    >
                                        {cat === 'all' ? 'View All' : cat}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                                <div className="text-right hidden md:block">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Customer Support</div>
                                    <div className="font-bold text-temple-dark">+91 877 227 7XXX</div>
                                </div>
                                <button className="bg-temple-dark text-temple-gold px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2">
                                    Check Availability <Search size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Live Availability Dashboard */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                >
                    {/* Premium Stats Card */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-temple-gold/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Live Status</span>
                                </div>
                                <h3 className="text-xl font-black text-temple-dark uppercase tracking-tight">Premium Stays</h3>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-kumkum">{premiumAvailable}</span>
                                    <span className="text-sm font-bold text-slate-500">Rooms Available</span>
                                </div>
                            </div>
                            <div className="p-3 bg-temple-gold/10 rounded-2xl text-temple-gold">
                                <Star size={24} />
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                                <span>Occupancy Rate</span>
                                <span className="text-temple-dark">85% Full</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-temple-gold to-orange-500 w-[85%] rounded-full"></div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500">
                                <Clock size={14} className="text-orange-500" />
                                <span>Fast Filling: 12 rooms booked in last hour</span>
                            </div>
                        </div>
                    </div>

                    {/* Dormitory Stats Card */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Live Status</span>
                                </div>
                                <h3 className="text-xl font-black text-temple-dark uppercase tracking-tight">Common Rooms</h3>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-emerald-600">{dormAvailable}</span>
                                    <span className="text-sm font-bold text-slate-500">Beds Available</span>
                                </div>
                            </div>
                            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                                <Users size={24} />
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                                <span>Occupancy Rate</span>
                                <span className="text-temple-dark">45% Full</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 w-[45%] rounded-full"></div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500">
                                <CheckCircle size={14} className="text-emerald-500" />
                                <span>High Availability: Instant confirmation</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Accommodations Grid */}
                < div className="space-y-16" >
                    {(selectedCategory === 'all' || selectedCategory === 'premium') && (
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-px bg-slate-200 flex-grow"></div>
                                <h2 className="text-3xl font-black text-temple-dark uppercase tracking-tight flex items-center gap-3">
                                    <Star className="text-temple-gold fill-temple-gold" />
                                    Premium Stays
                                </h2>
                                <div className="h-px bg-slate-200 flex-grow"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                                {accommodations.filter(a => a.category === 'premium').map((place) => (
                                    <motion.div
                                        key={place.id}
                                        whileHover={{ y: -5 }}
                                        className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl hover:shadow-kumkum/10 transition-all duration-300"
                                    >
                                        <div className="grid md:grid-cols-2 h-full">
                                            <div className="relative overflow-hidden h-64 md:h-auto">
                                                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-temple-dark shadow-sm">
                                                    {place.type}
                                                </div>
                                                <img
                                                    src={place.image}
                                                    alt={place.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                                <div className="absolute bottom-4 left-4 text-white">
                                                    <div className="flex items-center gap-1 text-yellow-400 mb-1">
                                                        <Star size={14} fill="currentColor" />
                                                        <span className="font-bold text-xs">{place.rating}/5</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-8 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-2xl font-black text-temple-dark uppercase tracking-tight mb-2 group-hover:text-kumkum transition-colors">
                                                        {place.name}
                                                    </h3>

                                                    {/* Room Stats */}
                                                    <div className="flex gap-4 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                        <div className="text-center">
                                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total</div>
                                                            <div className="font-black text-slate-700">{place.stats.total}</div>
                                                        </div>
                                                        <div className="w-px bg-slate-200"></div>
                                                        <div className="text-center">
                                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Occupied</div>
                                                            <div className="font-black text-orange-600">{place.stats.occupied}</div>
                                                        </div>
                                                        <div className="w-px bg-slate-200"></div>
                                                        <div className="text-center">
                                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Empty</div>
                                                            <div className="font-black text-emerald-600">{place.stats.empty}</div>
                                                        </div>
                                                    </div>

                                                    <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">
                                                        {place.description}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        {place.amenities.map((amenity, i) => (
                                                            <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-slate-100">
                                                                {amenity}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex items-end justify-between mt-4 border-t border-slate-100 pt-6">
                                                    <div>
                                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Price per night</div>
                                                        <div className="text-2xl font-black text-temple-dark">{place.price}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleBook(place)}
                                                        className="bg-kumkum text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-kumkum/90 shadow-lg shadow-kumkum/20 transition-all flex items-center gap-2"
                                                    >
                                                        Book Now <ArrowRight size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}

                    {
                        (selectedCategory === 'all' || selectedCategory === 'Common') && (
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-px bg-slate-200 flex-grow"></div>
                                    <h2 className="text-3xl font-black text-temple-dark uppercase tracking-tight flex items-center gap-3">
                                        <Users className="text-temple-dark" />
                                        Common Rooms
                                    </h2>
                                    <div className="h-px bg-slate-200 flex-grow"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {accommodations.filter(a => a.category === 'dormitory').map((place) => (
                                        <motion.div
                                            key={place.id}
                                            whileHover={{ y: -5 }}
                                            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 group"
                                        >
                                            <div className="relative h-48 overflow-hidden">
                                                <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                                                    {place.stats.empty} Beds Free
                                                </div>
                                                <img
                                                    src={place.image}
                                                    alt={place.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                <div className="absolute bottom-4 left-4 text-white">
                                                    <h3 className="text-xl font-black uppercase tracking-widest">{place.name}</h3>
                                                    <div className="flex items-center gap-2 opacity-80 text-xs font-medium">
                                                        <MapPin size={12} /> Near Main Complex
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    {place.amenities.map((amenity, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-slate-600 text-xs font-bold">
                                                            <CheckCircle size={14} className="text-emerald-500" />
                                                            {amenity}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex justify-between items-center text-xs font-bold text-slate-500 bg-slate-50 p-2 rounded-lg mb-4">
                                                    <span>Total: {place.stats.total}</span>
                                                    <span className="text-orange-500">Filled: {place.stats.occupied}</span>
                                                    <span className="text-green-600">Free: {place.stats.empty}</span>
                                                </div>

                                                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                                    <div className="text-2xl font-black text-kumkum">{place.price}</div>
                                                    <button
                                                        onClick={() => handleBook(place)}
                                                        className="text-temple-dark border-2 border-temple-dark px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-temple-dark hover:text-white transition-all"
                                                    >
                                                        Select Bed
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )
                    }

                    {/* Furniture & Essentials Sales */}
                    <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 overflow-hidden mb-16">
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <Home size={200} className="text-amber-900" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <ShoppingBag className="text-amber-700" size={20} />
                                        <span className="text-amber-700 font-black text-[10px] uppercase tracking-[0.3em]">Comfort Essentials</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-temple-dark uppercase tracking-tight">
                                        Temple Furniture <span className="text-amber-600">&</span> Utils
                                    </h2>
                                </div>
                                <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-white text-amber-900 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm hover:shadow-md transition-all">
                                    View Catalog <ArrowRight size={16} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {furnitureItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        whileHover={{ y: -5 }}
                                        className="bg-white p-4 rounded-2xl shadow-lg shadow-amber-900/5 border border-amber-100/50 flex gap-4"
                                    >
                                        <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col justify-between py-1 flex-grow">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-black text-temple-dark text-sm uppercase tracking-wide leading-tight">{item.name}</h3>
                                                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase tracking-wider">{item.type}</span>
                                                </div>
                                                <p className="text-[10px] text-slate-500 font-bold mt-1 line-clamp-1">{item.location}</p>
                                            </div>
                                            <div className="flex items-end justify-between">
                                                <div>
                                                    <div className="text-[10px] text-slate-400 font-bold uppercase">Price</div>
                                                    <div className="text-lg font-black text-amber-900">{item.price}</div>
                                                </div>
                                                <div className="text-[10px] font-bold text-slate-400">
                                                    Stock: <span className="text-slate-600">{item.stock}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Fresh Up Centers */}
                    <section className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-[2.5rem] border border-slate-200">
                        <div className="text-center mb-10">
                            <span className="text-sky-500 font-black text-[10px] uppercase tracking-[0.3em] bg-sky-50 px-4 py-2 rounded-full border border-sky-100">Public Utilities</span>
                            <h2 className="text-3xl md:text-4xl font-black text-temple-dark uppercase tracking-tight mt-4 mb-2">
                                Fresh-up Centers <span className="text-sky-500">&</span> Bathrooms
                            </h2>
                            <p className="text-slate-500 font-medium text-sm">Clean, hygienic, and affordable facilities for quick refreshments outside the temple.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {freshUpCenters.map((center) => (
                                <motion.div
                                    key={center.id}
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <ShowerHead size={80} className="text-sky-500" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-3 rounded-2xl ${center.type === 'Premium Bath' ? 'bg-amber-50 text-amber-600' :
                                                center.type === 'Full Service' ? 'bg-purple-50 text-purple-600' :
                                                    'bg-sky-50 text-sky-600'
                                                }`}>
                                                {center.type === 'Premium Bath' ? <Bath size={24} /> :
                                                    center.type === 'Full Service' ? <Wind size={24} /> : <ShowerHead size={24} />}
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${center.status === 'Open Now' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                {center.status}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-black text-temple-dark uppercase tracking-tight mb-1">{center.name}</h3>
                                        <div className="flex items-center gap-1 text-slate-400 text-xs font-bold uppercase tracking-wide mb-6">
                                            <MapPin size={12} /> {center.location}
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            {center.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-sky-200"></div>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                                            <div>
                                                <span className="text-xs text-slate-400 font-bold uppercase">Entry Fee</span>
                                                <div className="text-2xl font-black text-temple-dark">{center.price}</div>
                                            </div>
                                            <button className="p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-temple-dark hover:text-white transition-all">
                                                <MapPin size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                    {/* Why Choose Us Section */}
                    <section className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-temple-dark uppercase tracking-tight">Pilgrim Facilities</h2>
                            <p className="text-slate-500 font-bold mt-2">Everything you need for a comfortable spiritual journey</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {features.map((feature, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg text-center hover:-translate-y-2 transition-transform duration-300">
                                    <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 text-temple-dark">
                                        <feature.icon size={28} />
                                    </div>
                                    <h3 className="font-black text-temple-dark uppercase tracking-wide mb-2">{feature.title}</h3>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div >
            </div >
        </div >
    );
};

export default EAccommodation;

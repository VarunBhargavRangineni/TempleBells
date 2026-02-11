import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, Calendar as CalendarIcon, Users, Info, ShieldCheck,
    ChevronLeft, ChevronRight, MapPin, Shirt, Utensils,
    ArrowRight, Search, Filter, BookOpen,
    HelpCircle, Bell, Award, Zap,
    Sun, Sunrise, Sunset, Moon, Star, Sparkles,
    User, Fingerprint, CreditCard, ChevronDown
} from 'lucide-react';

// Custom Premium Spiritual Icons
export const PrayIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.5V5M9.5 3.5L10.5 5.5M14.5 3.5L13.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 19C16 19 14.5 21.5 12 21.5C9.5 21.5 8 19 8 19V11L12 7L16 11V19Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M12 21.5C9.5 21.5 8 19 8 19V11L12 7L16 11V19C16 19 14.5 21.5 12 21.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 7V21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const DiyaIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3C12 3 10 5.5 10 7C10 8.5 11 9 12 9C13 9 14 8.5 14 7C14 5.5 12 3 12 3Z" fill="#EF4444" />
        <path d="M5 14C5 11 8 10 12 10C16 10 19 11 19 14C19 17 16 19 12 19C8 19 5 17 5 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 19C15.866 19 19 17 19 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 18C4 18 6 21 12 21C18 21 20 18 20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const TempleIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2V5M12 2L15 4M12 2L9 4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 21H20M5 21V11L12 6L19 11V21M8 21V15H16V21M12 15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 14H18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

export const DarshanIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8V6M12 18V16M8 12H6M18 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const TilakIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M7 4C7 4 7 12 12 12C17 12 17 4 17 4V10C17 13 15 15 12 15C9 15 7 13 7 10V4Z" fill="currentColor" />
        <path d="M12 12C12 12 11 10 12 8C13 10 12 12 12 12Z" fill="white" />
        <circle cx="12" cy="18" r="2.5" fill="#EF4444" />
    </svg>
);

export const AbhishekamIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.5C12 2.5 7 8 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 8 12 2.5 12 2.5Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
        <path d="M12 17V21M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 12C9 12 10 13 12 13C14 13 15 12 15 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const KalyanamIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
        <path d="M12 12C12 12 10.5 9 12 7C13.5 9 12 12 12 12Z" fill="currentColor" />
        <path d="M10 8L14 16M14 8L10 16" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
);

export const VidyaIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M4 19.5V5C4 3.89543 4.89543 3 6 3H20V17H6C4.89543 17 4 17.8954 4 19.5ZM4 19.5C4 20.6046 4.89543 21.5 6 21.5H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 7V13M9 10H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const HomaIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3C12 3 10 6 10 8C10 10 11 11 12 11C13 11 14 10 14 8C14 6 12 3 12 3Z" fill="#EF4444" />
        <rect x="6" y="12" width="12" height="3" rx="1" fill="currentColor" />
        <rect x="4" y="15" width="16" height="3" rx="1" fill="currentColor" />
        <rect x="2" y="18" width="20" height="3" rx="1" fill="currentColor" />
    </svg>
);

const SEVA_CATEGORIES = [
    { id: 'all', name: 'ALL SEVAS', icon: Sparkles },
    { id: 'daily', name: 'DAILY RITUALS', icon: PrayIcon },
    { id: 'weekly', name: 'WEEKLY SPECIALS', icon: DiyaIcon },
    { id: 'annual', name: 'ANNUAL FESTIVALS', icon: HomaIcon },
];

export const SEVA_DIRECTORY = [
    {
        id: 'suprabhatam',
        title: 'Suprabhatha Seva',
        temple: 'Tirumala Tirupati Devasthanams',
        tag: 'Om Namo Venkatesaya',
        location: 'Tirupati, AP',
        category: 'daily',
        time: '03:00 AM',
        reporting: '02:30 AM',
        price: '₹120',
        availability: 'Limited',
        dressCode: 'Traditional Mandatory',
        prasadam: 'Ladoo (1), Sacred Water',
        sanctum: 'Main Sanctum Entry',
        description: 'The celestial awakening ceremony of the Lord with sacred hymns and Veda Parayanam.',
        importance: 'Aims to awaken the divine energy within the seeker alongside the Lord.',
        deity: 'Lord Venkateswara',
        icon: TilakIcon
    },
    {
        id: 'rudrabhishekam',
        title: 'Maha Rudrabhishekam',
        temple: 'Srisailam Mallikarjuna Swamy',
        tag: 'Om Namah Shivaya',
        location: 'Srisailam, AP',
        category: 'daily',
        time: '04:30 AM',
        reporting: '04:00 AM',
        price: '₹500',
        availability: 'Available',
        dressCode: 'Dhoti/Saree Mandatory',
        prasadam: 'Vibhuti, Ladoo',
        sanctum: 'Main Sanctum',
        description: 'Sacred bath ritual for Lord Mallikarjuna with 11 types of holy ingredients.',
        importance: 'Purification of soul and removal of negative karmas.',
        deity: 'Lord Mallikarjuna Swamy',
        icon: AbhishekamIcon
    },
    {
        id: 'kumkumarchana',
        title: 'Khadgamala Kumkumarchana',
        temple: 'Kanaka Durga Temple',
        tag: 'Jai Durga Bhavani',
        location: 'Vijayawada, AP',
        category: 'daily',
        time: '08:00 AM',
        reporting: '07:30 AM',
        price: '₹300',
        availability: 'Available',
        dressCode: 'Traditional',
        prasadam: 'Kumkum, Blouse Piece',
        sanctum: 'Main Temple',
        description: 'Ritualistic offering of Kumkum while chanting the 1000 names of the Mother Goddess.',
        importance: 'Aims to seek the protection and blessings of Goddess Kanaka Durga.',
        deity: 'Goddess Kanaka Durga',
        icon: PrayIcon
    },
    {
        id: 'narasimha-abhishekam',
        title: 'Nijaroopa Darshanam',
        temple: 'Simhachalam Temple',
        tag: 'Om Namo Narayanaya',
        location: 'Visakhapatnam, AP',
        category: 'annual',
        time: '05:00 AM',
        reporting: '04:00 AM',
        price: '₹1000',
        availability: 'Waitlist',
        dressCode: 'Traditional',
        prasadam: 'Sandal Paste',
        sanctum: 'Main Sanctum',
        description: 'The only day in the year when the deity\'s actual form is visible without the sandalwood paste.',
        importance: 'Darshan of the Lord\'s original form is considered extremely auspicious.',
        deity: 'Lord Varaha Narasimha',
        icon: DarshanIcon
    },
    {
        id: 'kotappakonda-pooja',
        title: 'Visesha Pooja',
        temple: 'Kotappakonda Sri Trikoteswara Swamy Temple',
        tag: 'Om Namah Shivaya',
        location: 'Narasaraopet, AP',
        category: 'weekly',
        time: '06:00 AM',
        reporting: '05:30 AM',
        price: '₹200',
        availability: 'Available',
        dressCode: 'Traditional',
        prasadam: 'Sweet Pongal',
        sanctum: 'Hill Temple',
        description: 'Special rituals performed at the hill temple of Lord Trikoteswara.',
        importance: 'Seeking peace and spiritual elevation in the hill atmosphere.',
        deity: 'Lord Trikoteswara Swamy',
        icon: PrayIcon
    },
    {
        id: 'ahobilam-abhishekam',
        title: 'Nava Narasimha Abhishekam',
        temple: 'Ahobilam Temple',
        tag: 'Nava Narasimha Kshetram',
        location: 'Kurnool, AP',
        category: 'daily',
        time: '07:00 AM',
        reporting: '06:30 AM',
        price: '₹400',
        availability: 'Filling Fast',
        dressCode: 'Traditional',
        prasadam: 'Pulihora',
        sanctum: 'Upper Ahobilam',
        description: 'Sacred bath performed for any one of the nine Narasimha deities of Ahobilam.',
        importance: 'Seeking protection from the ferocious yet compassionate Lord Narasimha.',
        deity: 'Lord Narasimha Swamy',
        icon: AbhishekamIcon
    },
    {
        id: 'mangalagiri-panakam',
        title: 'Panakala Seva',
        temple: 'Sri Panakala Lakshmi Narasimha Swamy',
        tag: 'Mangalagiri Kshetram',
        location: 'Mangalagiri, AP',
        category: 'daily',
        time: '09:00 AM',
        reporting: 'Continuously',
        price: '₹100',
        availability: 'Available',
        dressCode: 'Formal',
        prasadam: 'Panakam',
        sanctum: 'Main Cave Sanctum',
        description: 'Offering jaggery water (Panakam) to the Lord, which He is believed to drink audibly.',
        importance: 'A unique architectural and spiritual phenomenon.',
        deity: 'Lord Panakala Narasimha',
        icon: Utensils
    },
    {
        id: 'bhadrachalam-kalyanam',
        title: 'Nitya Kalyanotsavam',
        temple: 'Bhadrachalam Sri Rama Temple',
        tag: 'Sri Rama Jayam',
        location: 'Bhadrachalam, TS',
        category: 'daily',
        time: '10:30 AM',
        reporting: '09:45 AM',
        price: '₹1000',
        availability: 'Available',
        dressCode: 'Dhoti/Saree',
        prasadam: 'Ladoo, Vada, Talambralu',
        sanctum: 'Kalyana Mandapam',
        description: 'The celestial wedding of Lord Rama and Mother Sita performed daily.',
        importance: 'Seeking harmony in married life and family peace.',
        deity: 'Lord Rama & Sita Mata',
        icon: KalyanamIcon
    },
    {
        id: 'basara-aksharabhyasam',
        title: 'Aksharabhyasam',
        temple: 'Basara Gnana Saraswati Temple',
        tag: 'Vidya Kshetram',
        location: 'Basara, TS',
        category: 'daily',
        time: '05:00 AM',
        reporting: '04:30 AM',
        price: '₹300',
        availability: 'Filling Fast',
        dressCode: 'Traditional',
        prasadam: 'Slate, Chalk, Sacred Akshatas',
        sanctum: 'Temple Hall',
        description: 'The initiation of a child into education through the blessings of Goddess Saraswati.',
        importance: 'The perfect beginning for a child\'s educational journey.',
        deity: 'Goddess Gnana Saraswati',
        icon: VidyaIcon
    },
    {
        id: 'kanipakam-pooja',
        title: 'Swayambhu Varasiddhi Pooja',
        temple: 'Swayambhu Sri Varasiddhi Vinayaka Swamy',
        tag: 'Om Gam Ganapataye Namaha',
        location: 'Kanipakam, AP',
        category: 'daily',
        time: '06:00 AM',
        reporting: '05:30 AM',
        price: '₹250',
        availability: 'Available',
        dressCode: 'Formal',
        prasadam: 'Ladoo, Sacred Thread',
        sanctum: 'Main Shrine',
        description: 'Pooja performed to the the self-manifested Ganesha who grows in size within the waters.',
        importance: 'Success in beginnings and removal of obstacles.',
        deity: 'Lord Varasiddhi Vinayaka',
        icon: Sparkles
    },
    {
        id: 'yadagirigutta-kalyanam',
        title: 'Shanti Kalyanotsavam',
        temple: 'Sri Lakshmi Narasimha Swamy Temple',
        tag: 'Om Namo Narasimhaya',
        location: 'Yadagirigutta, TS',
        category: 'daily',
        time: '11:00 AM',
        reporting: '10:30 AM',
        price: '₹1200',
        availability: 'Available',
        dressCode: 'Dhoti/Saree',
        prasadam: 'Ladoo, Sacred Silk Vastram',
        sanctum: 'Kalyana Mandapam',
        description: 'Grand celestial wedding performed for Lord Narasimha and Lakshmi Devi.',
        importance: 'Prosperity and spiritual peace for the devotee\'s family.',
        deity: 'Lord Lakshmi Narasimha',
        icon: KalyanamIcon
    },
    {
        id: 'thiruvannamalai-deepam',
        title: 'Deepa Pooja',
        temple: 'Arunachaleswarar Temple - Thiruvannamalai',
        tag: 'Om Arunachaleswaraya Namaha',
        location: 'Thiruvannamalai, TN',
        category: 'daily',
        time: '06:00 PM',
        reporting: '05:30 PM',
        price: '₹150',
        availability: 'Available',
        dressCode: 'Traditional',
        prasadam: 'Sacred Lamp Oil',
        sanctum: 'Arunachala Sanctum',
        description: 'Ritual lighting of lamps to the Fire Lingam, representing the eternal fire of wisdom.',
        importance: 'Enlightenment and removal of the darkness of ignorance.',
        deity: 'Lord Arunachaleswara',
        icon: DiyaIcon
    },
    {
        id: 'sukravara-abhishekam',
        title: 'Sukravara Abhishekam',
        temple: 'Tirumala Tirupati Devasthanams',
        tag: 'Holy Friday Ritual',
        location: 'Tirupati, AP',
        category: 'weekly',
        time: '04:30 AM',
        reporting: '03:30 AM',
        price: '₹1500',
        availability: 'Waitlist',
        dressCode: 'Traditional Mandatory',
        prasadam: 'Special Ladoo, Vastram',
        sanctum: 'Main Sanctum',
        description: 'Sacred Friday bath ritual for Lord Venkateswara using civet oil and saffron.',
        importance: 'A rare opportunity to witness the Lord without ornaments.',
        deity: 'Lord Venkateswara',
        icon: AbhishekamIcon
    },
    {
        id: 'guruvara-pooja',
        title: 'Guruvara Visesha Pooja',
        temple: 'Shirdi Sai Baba Sansthan',
        tag: 'Sacred Thursday',
        location: 'Shirdi, MH',
        category: 'weekly',
        time: '05:15 AM',
        reporting: '04:45 AM',
        price: '₹500',
        availability: 'Available',
        dressCode: 'Formal',
        prasadam: 'Udi, Ladoo',
        sanctum: 'Samadhi Mandir',
        description: 'Special Thursday prayers and Kakad Aarti at the feet of the Great Master.',
        importance: 'Seeking spiritual guidance and inner peace.',
        deity: 'Shirdi Sai Baba',
        icon: PrayIcon
    },
    {
        id: 'navaratri-alankaram',
        title: 'Sharannavaratri Alankaram',
        temple: 'Kanaka Durga Temple',
        tag: 'Dussehra Special',
        location: 'Vijayawada, AP',
        category: 'annual',
        time: '03:00 AM',
        reporting: '02:00 AM',
        price: '₹500',
        availability: 'Filling Fast',
        dressCode: 'Traditional',
        prasadam: 'Sakambari Prasadam',
        sanctum: 'Main Temple',
        description: 'Daily unique Avatar alankaram (decoration) for the Mother Goddess during the 10 days of Navaratri.',
        importance: 'Celebrating the victory of good over evil.',
        deity: 'Goddess Kanaka Durga',
        icon: Sparkles
    },
    {
        id: 'shivaratri-jagaram',
        title: 'Maha Shivaratri Lingodbhavam',
        temple: 'Srisailam Temple',
        tag: 'The Great Night of Shiva',
        location: 'Srisailam, AP',
        category: 'annual',
        time: '11:00 PM',
        reporting: '09:00 PM',
        price: '₹2000',
        availability: 'Limited',
        dressCode: 'Traditional',
        prasadam: 'Vibhuti, Rudraksha',
        sanctum: 'Main Sanctum',
        description: 'Midnight abhishekam performed during the auspicious Lingodbhava Kaalam of Shivaratri.',
        importance: 'Vigil and prayer on this night are believed to transcend human limitations.',
        deity: 'Lord Shiva',
        icon: AbhishekamIcon
    }
];

export const TTDCalendar = ({ selectedDate, onSelectDate }) => {
    const [viewDate, setViewDate] = useState(new Date(2026, 1, 1)); // Default Feb 2026
    const daysArr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const prevMonth = () => {
        if (currentYear === 2026 && currentMonth === 1) return;
        setViewDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const nextMonth = () => {
        if (currentYear === 2027 && currentMonth === 1) return;
        setViewDate(new Date(currentYear, currentMonth + 1, 1));
    };

    // Simulated status for demo
    const getStatus = (day) => {
        const seed = (currentYear * 1000) + (currentMonth * 100) + day;
        if (seed % 15 === 0) return 'full';
        if (seed % 7 === 0) return 'filling';
        if (seed % 10 === 0) return 'not-opened';
        return 'available';
    };

    return (
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/20 relative overflow-hidden group/cal">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-kumkum/30 to-transparent" />

            <div className="flex items-center justify-between mb-12">
                <div className="flex flex-col">
                    <h4 className="text-[10px] font-black text-kumkum tracking-[0.4em] uppercase mb-1">Divine Portal</h4>
                    <span className="text-xl font-black text-temple-dark tracking-tight">{months[currentMonth]} {currentYear}</span>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={prevMonth}
                        disabled={currentYear === 2026 && currentMonth === 1}
                        className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-gray-50 transition-all border border-gray-100 disabled:opacity-20 disabled:cursor-not-allowed group/btn"
                    >
                        <ChevronLeft size={20} className="text-gray-400 group-hover/btn:text-kumkum group-hover/btn:-translate-x-1 transition-all" />
                    </button>
                    <button
                        onClick={nextMonth}
                        disabled={currentYear === 2027 && currentMonth === 1}
                        className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-gray-50 transition-all border border-gray-100 disabled:opacity-20 disabled:cursor-not-allowed group/btn"
                    >
                        <ChevronRight size={20} className="text-gray-400 group-hover/btn:text-kumkum group-hover/btn:translate-x-1 transition-all" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-y-4 gap-x-3">
                {daysArr.map(d => (
                    <div key={d} className="text-[10px] font-black text-gray-300 text-center pb-6 uppercase tracking-widest">{d}</div>
                ))}

                {/* Empty slots for first day offset */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-14" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const status = getStatus(day);
                    const isSelected = selectedDate === day;
                    const isNotOpened = status === 'not-opened';

                    return (
                        <button
                            key={day}
                            disabled={isNotOpened}
                            onClick={() => onSelectDate(day)}
                            className={`group/day relative h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${isSelected
                                ? 'bg-temple-dark shadow-2xl shadow-temple-dark/20 scale-110 z-10'
                                : isNotOpened
                                    ? 'opacity-30 cursor-not-allowed grayscale'
                                    : 'hover:bg-gray-50 hover:shadow-lg hover:shadow-gray-200/50'
                                }`}
                        >
                            <span className={`text-[13px] font-black transition-colors ${isSelected ? 'text-white' : 'text-temple-dark'}`}>
                                {day}
                            </span>
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 transition-all ${isSelected ? 'bg-temple-gold ring-4 ring-temple-gold/20 scale-125' :
                                status === 'available' ? 'bg-green-500' :
                                    status === 'filling' ? 'bg-orange-500' :
                                        status === 'full' ? 'bg-red-500' : 'bg-gray-300'
                                }`} />

                            {!isNotOpened && !isSelected && (
                                <div className="absolute inset-0 border border-transparent group-hover/day:border-kumkum/10 rounded-2xl transition-all" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-50 flex flex-wrap gap-x-8 gap-y-4">
                {[
                    { label: 'Available', color: 'bg-green-500' },
                    { label: 'Filling Fast', color: 'bg-orange-500' },
                    { label: 'Waitlist', color: 'bg-red-500' },
                    { label: 'Locked/Off', color: 'bg-gray-300' }
                ].map(s => (
                    <div key={s.label} className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${s.color} shadow-sm`} />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SevaStatsTicker = () => {
    // Stats to display
    const tickerItems = [
        { label: "Today's Seva Bookings", value: "14,320", icon: Sparkles },
        { label: "Pilgrims Darshan Completed", value: "45,102", icon: User },
        { label: "Annaprasadam Served", value: "82,000+", icon: Utensils },
        { label: "Ladoos Distributed", value: "1.2 Lakhs", icon: Award },
        { label: "Hundi Offerings Processed", value: "Live", icon: Zap },
        { label: "Next Suprabhatham", value: "02:30 AM", icon: Moon },
        { label: "Kalyanam Slots", value: "Filling Fast", icon: KalyanamIcon },
    ];

    return (
        <div className="w-full bg-gradient-to-r from-[#FFF9F0] via-[#FFFBF5] to-[#FFF9F0] text-temple-dark overflow-hidden border-b border-temple-gold/20 relative z-30 shadow-md">
            {/* Subtle Divine Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-temple-gold/5 to-transparent pointer-events-none" />

            {/* Shiny Black Bottom Line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black opacity-70" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />

            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex items-center gap-12 py-4 px-6"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    {[...tickerItems, ...tickerItems].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 opacity-90 hover:opacity-100 transition-opacity cursor-default group">
                            <div className="p-2 bg-temple-gold/10 rounded-full border border-temple-gold/20 group-hover:bg-temple-gold/20 group-hover:border-temple-gold/40 transition-colors shadow-sm">
                                <item.icon size={18} className="text-kumkum drop-shadow-sm" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1">{item.label}</span>
                                <span className="text-base font-bold tracking-tight text-temple-dark group-hover:text-kumkum transition-colors">{item.value}</span>
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-kumkum/30 ml-6 shadow-sm" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

const SevaScheduling = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSeva, setSelectedSeva] = useState(null);

    const filteredSevas = SEVA_DIRECTORY.filter(seva => {
        const matchesTab = activeTab === 'all' || seva.category === activeTab;
        const matchesSearch = seva.title.toLowerCase().includes(searchQuery.toLowerCase()) || seva.temple.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#FDFBF7] pb-24 font-outfit">
            <SevaStatsTicker />
            <div className="h-12" /> {/* Spacer to push content down */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50l25-25-25-25-25 25z' fill='%239B1B1B'/%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center mb-4">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-2">
                        <div className="w-16 h-16 border-2 border-temple-gold rounded-full flex items-center justify-center p-1.5">
                            <div className="w-full h-full bg-kumkum rounded-full flex items-center justify-center shadow-lg"><Sparkles className="text-white" size={24} /></div>
                        </div>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-xl md:text-3xl font-black text-temple-dark tracking-tight leading-[1.1] mb-0 uppercase">
                        DIVINE <span className="text-kumkum">SEVA</span> GATEWAY <br />
                        <span className="text-temple-gold text-sm md:text-lg italic font-medium block mt-1">Universal Access to Sacred Temple Traditions</span>
                    </motion.h1>
                </div>

                <div className="sticky top-[72px] z-40 bg-white/40 backdrop-blur-md border border-white/50 rounded-[2.5rem] p-3 mb-8 shadow-2xl shadow-gray-200/50">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2 p-1 bg-gray-50/50 rounded-full border border-gray-100/50">
                            {SEVA_CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-black tracking-widest transition-all duration-500 relative overflow-hidden ${activeTab === cat.id
                                        ? 'bg-kumkum text-white shadow-lg shadow-kumkum/30 scale-105'
                                        : 'text-gray-400 hover:text-kumkum hover:bg-white'
                                        }`}
                                >
                                    <cat.icon size={16} className={activeTab === cat.id ? 'animate-pulse' : ''} />
                                    {cat.name}
                                    {activeTab === cat.id && (
                                        <motion.div
                                            layoutId="activeTabGlow"
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                            animate={{ x: ['-100%', '100%'] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full lg:w-96 group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-kumkum transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search by Temple or Seva..."
                                className="w-full h-14 pl-14 pr-6 bg-white/80 border border-gray-100 rounded-full text-sm font-bold focus:border-kumkum/50 focus:ring-4 focus:ring-kumkum/5 outline-none shadow-sm transition-all"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden mb-24">
                    <div className="hidden md:grid grid-cols-[2.5fr_1.2fr_1.2fr_1fr_1.2fr] gap-6 p-8 bg-temple-dark/[0.03] border-b border-gray-100 relative">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-temple-gold to-transparent" />
                        {['Temple & Sacred Ritual', 'Timing', 'Contribution', 'Status', 'Booking'].map(h => (
                            <span key={h} className="text-[11px] font-black tracking-[0.25em] text-temple-dark/70 uppercase">{h}</span>
                        ))}
                    </div>
                    <div className="divide-y divide-gray-50/50">
                        <AnimatePresence mode='popLayout'>
                            {filteredSevas.map((seva) => (
                                <motion.div
                                    key={seva.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="group hover:bg-white transition-colors duration-300 relative"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-[2.5fr_1.2fr_1.2fr_1fr_1.2fr] gap-6 p-8 items-center relative z-10">
                                        <div className="flex items-center gap-6">
                                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 overflow-hidden relative ${seva.category === 'daily' ? 'bg-orange-50/50 group-hover:bg-orange-100/50' :
                                                seva.category === 'weekly' ? 'bg-amber-50/50 group-hover:bg-amber-100/50' :
                                                    'bg-red-50/50 group-hover:bg-red-100/50'
                                                }`}>
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
                                                {(() => {
                                                    const IconComponent = seva.icon || (
                                                        seva.category === 'daily' ? PrayIcon :
                                                            seva.category === 'weekly' ? DiyaIcon :
                                                                TempleIcon
                                                    );
                                                    const colorClass = seva.category === 'daily' ? 'text-orange-500' :
                                                        seva.category === 'weekly' ? 'text-temple-gold' :
                                                            'text-kumkum';
                                                    return <IconComponent className={`${colorClass} group-hover:scale-110 transition-transform`} size={28} />;
                                                })()}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-kumkum animate-pulse" />
                                                    <p className="text-[10px] font-black text-kumkum tracking-[.25em] uppercase">{seva.tag}</p>
                                                </div>
                                                <h3 className="text-xl font-black text-temple-dark group-hover:text-kumkum transition-colors mb-1 tracking-tight">{seva.title}</h3>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{seva.temple}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 text-temple-dark mb-1">
                                                <Clock size={14} className="text-kumkum/40" />
                                                <span className="text-sm font-black">{seva.time}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400 ml-5">Rep: {seva.reporting}</span>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Value</div>
                                            <div className="text-2xl font-black text-kumkum group-hover:scale-105 transition-transform origin-left">{seva.price}</div>
                                        </div>
                                        <div>
                                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black tracking-widest border transition-all duration-500 ${seva.availability === 'Available'
                                                ? 'bg-green-50/50 text-green-600 border-green-100/50 group-hover:bg-green-100/50'
                                                : seva.availability === 'Waitlist'
                                                    ? 'bg-orange-50/50 text-orange-600 border-orange-100/50 group-hover:bg-orange-100/50'
                                                    : 'bg-red-50/50 text-red-600 border-red-100/50 group-hover:bg-red-100/50'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${seva.availability === 'Available' ? 'bg-green-500' : seva.availability === 'Waitlist' ? 'bg-orange-500' : 'bg-red-500'}`} />
                                                {seva.availability.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex justify-end items-center gap-4">
                                            <motion.button
                                                whileHover={{ scale: 1.1, rotate: 90 }}
                                                onClick={() => setSelectedSeva(seva)}
                                                className="w-10 h-10 border border-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-400 hover:text-kumkum"
                                            >
                                                <Info size={18} />
                                            </motion.button>
                                            <button
                                                onClick={() => navigate(`/book-seva/${seva.id}`)}
                                                className="relative group/btn overflow-hidden bg-temple-dark text-white px-8 py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] shadow-xl shadow-temple-dark/10 hover:shadow-kumkum/20 transition-all active:scale-95"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-kumkum to-temple-maroon opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                                                <span className="relative z-10">BOOK NOW</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 border border-kumkum/0 group-hover:border-kumkum/5 rounded-[2rem] transition-all pointer-events-none" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* DETAIL MODAL */}
            <AnimatePresence>
                {selectedSeva && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedSeva(null)} className="absolute inset-0 bg-temple-dark/60 backdrop-blur-md" />
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-[3.5rem] overflow-hidden shadow-2xl p-12 md:p-20">
                            <button onClick={() => setSelectedSeva(null)} className="absolute top-10 right-10 text-gray-400 hover:text-kumkum text-xl transition-colors">✕</button>
                            <div className="mb-12">
                                <p className="text-[10px] font-black text-kumkum tracking-[0.3em] uppercase mb-4">{selectedSeva.tag}</p>
                                <h2 className="text-3xl md:text-5xl font-black text-temple-dark mb-6 tracking-tight leading-tight">{selectedSeva.title}</h2>
                                <p className="text-lg text-gray-500 font-medium italic leading-relaxed">"{selectedSeva.description}"</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-12 mb-12">
                                <div className="space-y-6">
                                    <div className="bg-white p-6 rounded-3xl border border-gray-50"><p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Spiritual Importance</p><p className="text-sm font-bold text-temple-dark leading-relaxed">{selectedSeva.importance}</p></div>
                                    <div className="bg-white p-6 rounded-3xl border border-gray-50"><p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Temple Sanctum</p><p className="text-sm font-bold text-temple-dark">{selectedSeva.sanctum}, {selectedSeva.location}</p></div>
                                </div>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-6 rounded-3xl border border-gray-100"><Clock size={16} className="text-kumkum mb-3" /><p className="text-[8px] font-black text-gray-400 uppercase mb-1">Timing</p><p className="text-xs font-black">{selectedSeva.time}</p></div>
                                        <div className="bg-white p-6 rounded-3xl border border-gray-100"><Shirt size={16} className="text-kumkum mb-3" /><p className="text-[8px] font-black text-gray-400 uppercase mb-1">Dress Code</p><p className="text-xs font-black">{selectedSeva.dressCode}</p></div>
                                    </div>
                                    <button onClick={() => { setSelectedSeva(null); navigate(`/book-seva/${selectedSeva.id}`); }} className="w-full bg-kumkum text-white py-6 rounded-3xl font-black tracking-[0.2em] text-[10px] shadow-2xl hover:bg-temple-maroon transition-all">RESERVE SLOT FOR {selectedSeva.price}</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SevaScheduling;

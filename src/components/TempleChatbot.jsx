import React, { useState, useEffect, useRef } from 'react';
import './TempleChatbot.css';

function TempleChatbot({ lang = 'EN' }) {
  const [isOpen, setIsOpen] = useState(false);
  const getBotName = () => {
    if (lang === 'HI') return 'टेम्पल बेल्स बोट';
    if (lang === 'TE') return 'టెంపుల్ బెల్స్ బోట్';
    return 'Temple Bells Bot';
  };

  const getWelcomeMsg = () => {
    if (lang === 'HI') return 'नमस्ते! टेम्पल बेल्स सहायता में आपका स्वागत है। मैं आज आपकी कैसे सहायता कर सकता हूँ?';
    if (lang === 'TE') return 'నమస్తే! టెంపుల్ బెల్స్ సహాయ కేంద్రానికి స్వాగతం. నేను మీకు ఏ విధంగా సహాయపడగలను?';
    return 'Namaste! Welcome to Temple Bells Support. How can I assist you today?';
  };

  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: getWelcomeMsg() }
  ]);
  const [showOptions, setShowOptions] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mainOptions = [
    { id: 'acc', label: lang === 'HI' ? 'आवास प्रतिक्रिया' : lang === 'TE' ? 'వసతి అభిప్రాయం' : 'Accommodation Feedback', icon: '🏠' },
    { id: 'ref', label: lang === 'HI' ? 'वापसी और रद्दीकरण' : lang === 'TE' ? 'రీఫండ్ & క్యాన్సిలేషన్' : 'Refund & Cancellation', icon: '💸' },
    { id: 'cor', label: lang === 'HI' ? 'भ्रष्टाचार की रिपोर्ट/सहायता' : lang === 'TE' ? 'అవినీతిపై ఫిర్యాదు/సహాయం' : 'Report Corruption/Help', icon: '🛡️' },
    { id: 'lost', label: lang === 'HI' ? 'खोया और पाया' : lang === 'TE' ? 'కోల్పోయిన & దొరికిన వస్తువులు' : 'Lost & Found', icon: '🔍' },
    { id: 'help', label: lang === 'HI' ? 'सहायता डेस्क से संपर्क करें' : lang === 'TE' ? 'సహాయ కేంద్రాన్ని సంప్రదించండి' : 'Contact Helpdesk', icon: '🎧' }
  ];

  const subOptions = {
    acc: [
      { id: 'acc_1', label: lang === 'HI' ? 'स्वच्छता प्रतिक्रिया' : lang === 'TE' ? 'శుభ్రత అభిప్రాయం' : 'Cleanliness Feedback', icon: '✨' },
      { id: 'acc_2', label: lang === 'HI' ? 'कर्मचारी व्यवहार' : lang === 'TE' ? 'సిబ్బంది ప్రవర్తన' : 'Staff Behavior', icon: '👤' },
      { id: 'acc_3', label: lang === 'HI' ? 'सुविधा संबंधी' : lang === 'TE' ? 'సదుపాయాల సంబంధిత' : 'Facility Related', icon: '🛋️' },
      { id: 'acc_4', label: lang === 'HI' ? 'रूम सर्विस' : lang === 'TE' ? 'రూమ్ సర్వీస్' : 'Room Service', icon: '🛎️' },
      { id: 'back', label: lang === 'HI' ? 'मुख्य मेनू पर वापस' : lang === 'TE' ? 'ప్రధాన మెనూకి తిరిగి వెళ్లండి' : 'Back to Main Menu', icon: '⬅️' }
    ],
    ref: [
      { id: 'ref_1', label: lang === 'HI' ? 'रिफंड स्थिति की जाँच करें' : lang === 'TE' ? 'రీఫండ్ స్థితిని తనిఖీ చేయండి' : 'Check Refund Status', icon: '📊' },
      { id: 'ref_2', label: lang === 'HI' ? 'बुकिंग रद्द करें' : lang === 'TE' ? 'బుకింగ్ రద్దు చేయండి' : 'Cancel Booking', icon: '🚫' },
      { id: 'ref_3', label: lang === 'HI' ? 'रिफंड नीति' : lang === 'TE' ? 'రీఫండ్ పాలసీ' : 'Refund Policy', icon: '📜' },
      { id: 'ref_4', label: lang === 'HI' ? 'भुगतान विफल' : lang === 'TE' ? 'చెల్లింపు విఫలమైంది' : 'Payment Failed', icon: '⚠️' },
      { id: 'back', label: lang === 'HI' ? 'मुख्य मेनू पर वापस' : lang === 'TE' ? 'ప్రధాన మెనూకి తిరిగి వెళ్లండి' : 'Back to Main Menu', icon: '⬅️' }
    ],
    cor: [
      { id: 'cor_1', label: lang === 'HI' ? 'भ्रष्टाचार की रिपोर्ट करें' : lang === 'TE' ? 'అవినీతిపై ఫిర్యాదు చేయండి' : 'Report Corruption', icon: '📢' },
      { id: 'cor_2', label: lang === 'HI' ? 'सामान्य शिकायत' : lang === 'TE' ? 'సాధారణ ఫిర్యాదు' : 'General Complaint', icon: '📝' },
      { id: 'cor_3', label: lang === 'HI' ? 'आपातकालीन सहायता' : lang === 'TE' ? 'అత్యవసర సహాయం' : 'Emergency Help', icon: '🚨' },
      { id: 'cor_4', label: lang === 'HI' ? 'सुरक्षा चिंता' : lang === 'TE' ? 'భద్రతా సమస్య' : 'Security Concern', icon: '👮' },
      { id: 'back', label: lang === 'HI' ? 'मुख्य मेनू पर वापस' : lang === 'TE' ? 'ప్రధాన మెనూకి తిరిగి వెళ్లండి' : 'Back to Main Menu', icon: '⬅️' }
    ],
    lost: [
      { id: 'lost_1', label: lang === 'HI' ? 'खोई हुई वस्तु की रिपोर्ट करें' : lang === 'TE' ? 'కోల్పోయిన వస్తువును నివేదించండి' : 'Report Lost Item', icon: '📢' },
      { id: 'lost_2', label: lang === 'HI' ? 'मिली हुई वस्तुओं की जाँच करें' : lang === 'TE' ? 'దొరికిన వస్తువులను తనిఖీ చేయండి' : 'Check Found Items', icon: '📦' },
      { id: 'lost_3', label: lang === 'HI' ? 'दावा प्रक्रिया' : lang === 'TE' ? 'క్లెయిమ్ ప్రక్రియ' : 'Claim Process', icon: '✅' },
      { id: 'back', label: lang === 'HI' ? 'मुख्य मेनू पर वापस' : lang === 'TE' ? 'ప్రధాన మెనూకి తిరిగి వెళ్లండి' : 'Back to Main Menu', icon: '⬅️' }
    ],
    help: [
      { id: 'help_1', label: lang === 'HI' ? 'कॉल सहायता' : lang === 'TE' ? 'ఫోన్ ద్వారా సహాయం' : 'Call Support', icon: '📞' },
      { id: 'help_2', label: lang === 'HI' ? 'ईमेल सहायता' : lang === 'TE' ? 'ఈమెయిల్ ద్వారా సహాయం' : 'Email Support', icon: '📧' },
      { id: 'help_3', label: lang === 'HI' ? 'व्हाट्सएप सहायता' : lang === 'TE' ? 'వాట్సాప్ ద్వారా సహాయం' : 'WhatsApp Support', icon: '💬' },
      { id: 'back', label: lang === 'HI' ? 'मुख्य मेनू पर वापस' : lang === 'TE' ? 'ప్రధాన మెనూకి తిరిగి వెళ్లండి' : 'Back to Main Menu', icon: '⬅️' }
    ]
  };

  const [currentMenu, setCurrentMenu] = useState('main');

  const handleOptionClick = (option) => {
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: option.label }]);

    if (option.id === 'back') {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: lang === 'HI' ? 'मैं आपकी और क्या सहायता कर सकता हूँ?' : lang === 'TE' ? 'నేను మీకు ఇంకే విధంగా సహాయపడగలను?' : 'What else can I help you with?' }]);
        setCurrentMenu('main');
        setShowOptions(true);
      }, 500);
      return;
    }

    if (subOptions[option.id]) {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: lang === 'HI' ? `आपने ${option.label} चुना है। कृपया एक विशिष्ट श्रेणी चुनें:` : lang === 'TE' ? `మీరు ${option.label} ఎంచుకున్నారు. దయచేసి ఒక విభాగాన్ని ఎంచుకోండి:` : `You selected ${option.label}. Please choose a specific category:` }]);
        setCurrentMenu(option.id);
        setShowOptions(true);
      }, 500);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: lang === 'HI' ? `${option.label} चुनने के लिए धन्यवाद। हमारी टीम जल्द ही आपकी सहायता करेगी। क्या कुछ और है?` : lang === 'TE' ? `${option.label} ఎంచుకున్నందుకు ధన్యవాదాలు. మా బృందం త్వరలో మీకు సహాయం చేస్తుంది. ఇంకేమైనా ఉందా?` : `Thank you for choosing ${option.label}. Our team will assist you shortly. Is there anything else?` }]);
        setCurrentMenu('main');
        setShowOptions(true);
      }, 800);
    }
  };

  const resetChat = () => {
    setMessages([{ id: Date.now(), type: 'bot', text: getWelcomeMsg() }]);
    setCurrentMenu('main');
    setShowOptions(true);
  };

  const optionsToDisplay = currentMenu === 'main' ? mainOptions : subOptions[currentMenu];

  return (
    <>
      <div className="temple-chatbot-container">
        <button
          className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Chatbot"
        >
          <div className="om-logo-glow">
            <img src="https://play-lh.googleusercontent.com/qh6Pnf73m0fLjAYwyokuT73d_LB6sdXkfaCCSGgpIU1EneH15dUgBLV31X-2QkXsNQ" alt="Bot Logo" className="bot-logo-img" />
          </div>
        </button>

        {!isOpen && (
          <div className="chatbot-label">
            <span>{lang === 'HI' ? 'नमस्ते! मैं कैसे मदद कर सकता हूँ?' : lang === 'TE' ? 'నమస్తే! నేను మీకు ఏ విధంగా సహాయపడగలను?' : 'Namaste! How can I help?'}</span>
          </div>
        )}

        {isOpen && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <div className="header-info">
                <div className="bot-avatar">
                  <img src="https://play-lh.googleusercontent.com/qh6Pnf73m0fLjAYwyokuT73d_LB6sdXkfaCCSGgpIU1EneH15dUgBLV31X-2QkXsNQ" alt="Bot" />
                </div>
                <div>
                  <h3>{getBotName()}</h3>
                  <span className="online-status">{lang === 'HI' ? 'ऑनलाइन' : lang === 'TE' ? 'ఆన్‌లైన్' : 'Online'}</span>
                </div>
              </div>
              <div className="header-actions">
                <button className="close-btn" onClick={() => { setIsOpen(false); resetChat(); }}>×</button>
              </div>
            </div>

            <div className="chatbot-messages">
              {messages.map(msg => (
                <div key={msg.id} className={`message-wrapper ${msg.type}`}>
                  <div className="message-bubble">
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {showOptions && (
              <div className="chatbot-options-scroll">
                <div className="chatbot-options">
                  {optionsToDisplay.map(opt => (
                    <button
                      key={opt.id}
                      className="option-btn"
                      onClick={() => handleOptionClick(opt)}
                    >
                      <span className="opt-icon">{opt.icon}</span>
                      <span className="opt-label">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="chatbot-footer">
              <p>Providing divine assistance to pilgrims</p>
              <p style={{ marginTop: '4px', fontSize: '0.6rem', color: '#7c4dff', fontWeight: '700' }}>powered by Visdomwaves</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TempleChatbot;

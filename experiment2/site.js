import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Custom creative icons instead of lucide-react (остаются без изменений)
const CreativePhone = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z" />
    <path d="M12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M7 9a2 2 0 0 1 0-4" />
    <path d="M17 15a2 2 0 0 1 0 4" />
  </svg>
);

const CreativeMail = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
    <path d="m22 6-10 7L2 6" />
    <path d="M22 6v12" />
    <path d="M2 6v12" />
  </svg>
);

const CreativeMapPin = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
    <path d="M12 2v4" />
    <path d="M12 16v4" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
  </svg>
);

const CreativeCalendar = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
    <circle cx="12" cy="16" r="3" />
    <path d="M12 13v6" />
    <path d="M9 16h6" />
  </svg>
);

const CreativeClock = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
  </svg>
);

const CreativeStar = ({ className, fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
  </svg>
);

const CreativeChevronDown = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M6 9l6 6 6-6" />
    <path d="M12 3v12" />
    <circle cx="12" cy="18" r="3" />
  </svg>
);

const CreativeCheckCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
    <path d="M12 6v2" />
    <path d="M12 16v2" />
  </svg>
);

const CreativeMessageCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <path d="M8 12h.01" />
    <path d="M12 12h.01" />
    <path d="M16 12h.01" />
  </svg>
);

const CreativeYoutube = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.602-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.995-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.943.266 1.685 1.04 1.938 2.022Z" />
    <path d="M10 15.5c0 .828.672 1.5 1.5 1.5s1.5-.672 1.5-1.5v-5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5v5Z" />
  </svg>
);

const CreativeInstagram = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const CreativeUser = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M12 13v6" />
    <path d="M16 15v2" />
    <path d="M8 15v2" />
  </svg>
);

const CreativePlay = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.5 9.375a.563.563 0 0 1 .875-.477l8.25 4.687a.563.563 0 0 1 0 .956l-8.25 4.687a.563.563 0 0 1-.875-.477V9.375Z" />
  </svg>
);

// Mock data (остается без изменений)
const mockSlots = [
  { id: 1, date: '2025-12-24', time: '18:00', style: 'Бачата', available: true, location: 'Павелецкая' },
  { id: 2, date: '2025-12-24', time: '19:30', style: 'Сальса', available: true, location: 'Марксистская' },
  { id: 3, date: '2025-12-25', time: '17:00', style: 'Кизомба', available: true, location: 'Лубянка' },
  { id: 4, date: '2025-12-25', time: '20:00', style: 'Бачата', available: true, location: 'Павелецкая' },
  { id: 5, date: '2025-12-26', time: '18:30', style: 'Сальса', available: false, location: 'Марксистская' },
];

const testimonials = [
  {
    id: 1,
    name: 'Екатерина, 29 лет',
    text: 'Тренер нашел подход даже к самой неуверенной в себе ученице. За месяц я освоила базовые шаги бачаты и перестала бояться танцевать в клубах!',
    style: 'Бачата',
    rating: 5
  },
  {
    id: 2,
    name: 'Алексей, 34 года',
    text: 'После травмы колена думал, что никогда не вернусь к танцам. Индивидуальная программа от тренера помогла восстановиться и снова чувствовать ритм.',
    style: 'Сальса Касино',
    rating: 5
  },
  {
    id: 3,
    name: 'Мария, 26 лет',
    text: 'Выбрала пакет из 24 занятий по всем трем стилям. Это полностью изменило мое представление о латиноамериканских танцах. Тренер объясняет так, что даже сложные элементы становятся понятными.',
    style: 'Кизомба',
    rating: 5
  }
];

const pricingPlans = [
  {
    id: 1,
    name: 'Пробное занятие',
    price: '1 900 ₽',
    duration: '60 минут',
    features: [
      'Персональная программа',
      'Анализ телодвижений',
      'Рекомендации по дальнейшему обучению'
    ],
    popular: true,
    note: 'Только для новых учеников'
  },
  {
    id: 2,
    name: 'Одно занятие',
    price: '2 900 ₽',
    duration: '60 минут',
    features: [
      'Гибкое расписание',
      'Доступ к видео-разборам',
      'Домашние задания с проверкой'
    ],
    popular: false,
    note: ''
  },
  {
    id: 3,
    name: 'Пакет 4 занятия',
    price: '9 900 ₽',
    duration: '4 занятия',
    features: [
      'Экономия 1 700 ₽',
      'Приоритетное бронирование',
      'Бесплатная отработка пропусков'
    ],
    popular: false,
    note: ''
  },
  {
    id: 4,
    name: 'Базовый курс',
    price: '16 900 ₽',
    duration: '8 занятий',
    features: [
      'Программа с нуля',
      'Сертификат об окончании',
      'Приглашение на закрытые вечеринки'
    ],
    popular: false,
    note: 'Рекомендуемый старт'
  },
  {
    id: 5,
    name: 'Полный пакет',
    price: '45 000 ₽',
    duration: '24 занятия',
    features: [
      'Все 3 стиля: Бачата+Сальса+Кизомба',
      'Индивидуальная хореография',
      'Съемка профессионального видео',
      'Персональный плейлист'
    ],
    popular: false,
    premium: true,
    note: 'Самый полный формат обучения'
  }
];

const danceStyles = [
  {
    id: 'bachata',
    name: 'Бачата',
    color: '#6C4BFF',
    gradient: 'from-indigo-500 to-violet-600',
    description: 'Страстный танец из Доминиканы с плавными движениями бедер и эмоциональными связями. Идеален для новичков благодаря простому ритму и постепенному освоению сложных элементов.',
    videoUrl: 'https://placehold.co/600x400/6C4BFF/FFFFFF?text=Бачата',
    faq: [
      { q: 'Нужен ли партнер для занятий?', a: 'Нет, на индивидуальных занятиях тренер выступает в роли партнера.' },
      { q: 'Что надеть на первое занятие?', a: 'Удобную одежду и обувь на плоской подошве. Для женщин необязательно надевать юбку.' },
      { q: 'Сколько занятий нужно для первого танца?', a: 'Обычно базовых навыков хватает для простого танца уже через 4-6 занятий.' }
    ]
  },
  {
    id: 'salsa',
    name: 'Сальса Касино',
    color: '#FF4B91',
    gradient: 'from-pink-500 to-rose-600',
    description: 'Кубинский стиль с круговыми движениями, импровизацией и живым взаимодействием. Отлично развивает координацию, музыкальность и уверенность в себе.',
    videoUrl: 'https://placehold.co/600x400/FF4B91/FFFFFF?text=Сальса+Касино',
    faq: [
      { q: 'Сложно ли начать с нуля?', a: 'Сальса Касино считается одним из самых доступных стилей для новичков благодаря своей цикличности.' },
      { q: 'Нужно ли уметь считать музыку?', a: 'Тренер научит вас чувствовать ритм и структуру музыки во время занятий.' },
      { q: 'Как часто нужно заниматься?', a: 'Оптимально 1-2 раза в неделю для устойчивого прогресса.' }
    ]
  },
  {
    id: 'kizomba',
    name: 'Кизомба',
    color: '#13C296',
    gradient: 'from-teal-500 to-emerald-600',
    description: 'Африканский танец с плавными движениями и глубоким соединением партнеров. Идеален для релаксации, развития чувственности и эмоционального выражения.',
    videoUrl: 'https://placehold.co/600x400/13C296/FFFFFF?text=Кизомба',
    faq: [
      { q: 'Подходит ли для людей с лишним весом?', a: 'Абсолютно! Кизомба не требует резких движений и идеально подходит для любого телосложения.' },
      { q: 'Насколько близкий контакт с партнером?', a: 'Тренер всегда учитывает личные границы ученика и постепенно раскрывает особенности стиля.' },
      { q: 'Нужна ли специальная обувь?', a: 'Для первых занятий подойдет любая удобная обувь на небольшом каблуке или без него.' }
    ]
  }
];

const studioLocations = [
  {
    id: 1,
    name: 'Dance First (Павелецкая)',
    address: 'ул. Кожевническая, 14с1',
    metro: '5 мин. от м. Павелецкая',
    coords: '55.7305, 37.6270'
  },
  {
    id: 2,
    name: 'Dance First (Марксистская)',
    address: 'ул. Марксистская, 3/2',
    metro: '3 мин. от м. Марксистская',
    coords: '55.7528, 37.6440'
  },
  {
    id: 3,
    name: 'Dance First (Лубянка)',
    address: 'ул. Рождественка, 11с1',
    metro: '4 мин. от м. Лубянка',
    coords: '55.7605, 37.6253'
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedStyle, setSelectedStyle] = useState('bachata');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', style: '', time: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [navBackground, setNavBackground] = useState('transparent');
  
  // Scroll effects
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    const updateNavBackground = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setNavBackground(scrollPercent > 0.1 ? 'rgba(255, 255, 255, 0.9)' : 'transparent');
    };
    
    window.addEventListener('scroll', updateNavBackground);
    updateNavBackground();
    return () => window.removeEventListener('scroll', updateNavBackground);
  }, []);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const sections = ['hero', 'styles', 'pricing', 'about', 'contacts'];
    const scrollPosition = window.scrollY + 100;
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
        setActiveSection(section);
        break;
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', phone: '', style: '', time: '' });
    }, 3000);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div 
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ 
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(108, 75, 255, 0.05) 0%, rgba(255, 75, 145, 0.05) 15%, transparent 30%), radial-gradient(circle at 90% 80%, rgba(19, 194, 150, 0.05) 0%, rgba(108, 75, 255, 0.05) 20%, transparent 40%)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Navigation */}
      <motion.nav 
        className="fixed w-full z-50 py-4 px-6"
        initial={{ backgroundColor: 'transparent' }}
        animate={{ backgroundColor: navBackground }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-extrabold tracking-tight flex items-center"
          >
            <span className="mr-2 text-3xl animate-pulse">✨</span>
            <div className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91] font-black">
                RHYTHM
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91] rounded-full"></span>
            </div>
            <span className="text-gray-700 ml-1 font-extrabold">LAB</span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {['hero', 'styles', 'pricing', 'about', 'contacts'].map((section) => (
              <motion.a
                key={section}
                href={`#${section}`}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  activeSection === section 
                    ? 'bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91] text-white shadow-lg shadow-indigo-200/50'
                    : 'text-gray-700 hover:text-[#6C4BFF] hover:bg-indigo-50/50'
                }`}
                whileHover={{ y: -2 }}
              >
                {section === 'hero' 
                  ? 'Главная' 
                  : section === 'styles' 
                    ? 'Стили' 
                    : section === 'pricing' 
                      ? 'Цены' 
                      : section === 'about' 
                        ? 'О нас' 
                        : 'Контакты'}
              </motion.a>
            ))}
          </div>
          
          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91] text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:rotate-1"
            onClick={() => document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' })}
          >
            Пробное занятие 1900₽
          </motion.button>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-gray-800 mb-1.5 rounded-full transition-transform duration-300" style={{ transform: isMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }}></div>
            <div className="w-6 h-0.5 bg-gray-800 mb-1.5 rounded-full transition-opacity duration-300" style={{ opacity: isMenuOpen ? 0 : 1 }}></div>
            <div className="w-6 h-0.5 bg-gray-800 rounded-full transition-transform duration-300" style={{ transform: isMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }}></div>
          </button>
        </div>
        
        {/* Mobile menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden mt-4"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100">
            <div className="flex flex-col space-y-4">
              {['hero', 'styles', 'pricing', 'about', 'contacts'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`block font-medium py-3 px-4 rounded-xl ${
                    activeSection === section 
                      ? 'bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91] text-white'
                      : 'text-gray-700 hover:bg-indigo-50/50'
                  }`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {section === 'hero' 
                    ? 'Главная' 
                    : section === 'styles' 
                      ? 'Стили' 
                      : section === 'pricing' 
                        ? 'Цены' 
                        : section === 'about' 
                          ? 'О нас' 
                          : 'Контакты'}
                </a>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="mt-2 bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91] text-white font-bold py-3 rounded-xl w-full shadow-lg"
                onClick={() => {
                  setIsMenuOpen(false);
                  document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Пробное занятие 1900₽
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section - MOBILE FIRST REDESIGN with new colors */}
      <section id="hero" className="pt-36 pb-24 md:pb-28 relative overflow-hidden">
        {/* Animated Background Elements - Simplified for mobile */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            className="absolute w-full h-full bg-gradient-to-br from-[#6C4BFF]/5 to-[#FF4B91]/5"
            animate={{ 
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#FF4B91]/10 blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-[#13C296]/10 blur-3xl"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center bg-gradient-to-r from-[#6C4BFF]/10 to-[#FF4B91]/10 backdrop-blur-sm border border-indigo-200/50 rounded-full px-4 py-1.5 mb-6 mx-auto">
                <div className="w-2 h-2 rounded-full bg-[#6C4BFF] mr-2 animate-pulse"></div>
                <span className="text-[#6C4BFF] font-medium text-sm">Индивидуальные занятия в центре Москвы</span>
              </div>
              
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="block mb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91] font-black">
                    Танцуйте уверенно
                  </span>
                </span>
                <span className="block text-gray-200 font-black">уже через месяц</span> {/* Изменен цвет текста на светлый */}
                <span className="block text-[#13C296] mt-1 text-lg font-medium">с нашими профессиональными тренерами</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto px-2" /* Изменен цвет текста на светлый */
              >
                Индивидуальные уроки бачаты, сальсы и кизомбы для начинающих без опыта. Занимайтесь в комфортной обстановке в центре Москвы.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row justify-center gap-4 mb-8 mx-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91] text-white font-bold py-4 px-6 sm:px-8 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all transform hover:rotate-1 relative overflow-hidden group w-full sm:w-auto"
                  onClick={() => document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Пробное занятие 1900₽
                    <CreativeChevronDown className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mt-8"
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#6C4BFF] mb-1">350+</div>
                  <div className="text-gray-200 font-medium text-sm sm:text-base">учеников</div> {/* Изменен цвет текста на светлый */}
                </div>
                
                <div className="hidden sm:block w-1 h-6 sm:h-8 bg-gradient-to-b from-[#6C4BFF] to-[#FF4B91] rounded-full"></div>
                
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#FF4B91] mb-1">8 лет</div>
                  <div className="text-gray-200 font-medium text-sm sm:text-base">опыта</div> {/* Изменен цвет текста на светлый */}
                </div>
                
                <div className="hidden sm:block w-1 h-6 sm:h-8 bg-gradient-to-b from-[#6C4BFF] to-[#FF4B91] rounded-full"></div>
                
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#13C296] mb-1">98%</div>
                  <div className="text-gray-200 font-medium text-sm sm:text-base">удовлетворенности</div> {/* Изменен цвет текста на светлый */}
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Mobile-optimized dance cards */}
          <div className="mt-12 sm:mt-16">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Стили танцев</h2> {/* Изменен цвет текста на белый */}
              <p className="text-gray-200 max-w-2xl mx-auto">Выберите направление, которое подойдет именно вам</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 max-w-5xl mx-auto px-2">
              {danceStyles.map((style, index) => (
                <motion.div
                  key={style.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`relative rounded-2xl overflow-hidden shadow-xl flex-1 min-w-[250px] ${
                    index === 1 ? 'md:scale-105' : ''
                  }`}
                  style={{ 
                    backgroundImage: `linear-gradient(135deg, ${style.color}15 0%, ${style.color}08 100%)`,
                    border: `1px solid ${style.color}20`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 self-center">
                      <span className="text-white text-2xl">💃</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2 text-center">{style.name}</h3>
                    
                    <p className="text-indigo-100 text-sm mb-6 text-center flex-grow">
                      {style.description.split('.')[0]}. 
                      <span className="hidden sm:inline"> {style.description.split('.')[1]}</span>
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/20 backdrop-blur-sm text-white font-medium py-2 px-4 rounded-lg text-center hover:bg-white/30 transition-colors mt-auto self-center"
                    >
                      Подробнее
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Styles Section (остальное без изменений, так как по заданию нужно изменить только верхние блоки) */}
      {/* Pricing Section, About Section, Testimonials Section, Contact Section, Footer остаются без изменений */}
      
      {/* Оставшиеся разделы без изменений, так как по заданию нужно изменить только верхние блоки */}
      {/* Styles Section */}
      <section id="styles" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* ... оставшееся содержимое без изменений ... */}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Наши танцевальные стили
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Каждый стиль — это новый мир эмоций и движений. Мы адаптируем программу под ваши цели и физические особенности.
            </p>
          </div>
          
          {/* Mobile-optimized style selector */}
          <div className="mb-8 md:hidden">
            <div className="flex overflow-x-auto pb-2 hide-scrollbar">
              {danceStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`flex flex-col items-center justify-center min-w-[120px] px-4 py-3 mx-1 rounded-xl transition-all ${
                    selectedStyle === style.id
                      ? `bg-gradient-to-r from-${style.color}-500 to-${style.color}-600 text-white shadow-md`
                      : 'bg-white/80 hover:bg-white'
                  }`}
                  style={{ 
                    boxShadow: selectedStyle === style.id ? `0 4px 6px ${style.color}20` : 'none'
                  }}
                >
                  <div className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center ${
                    selectedStyle === style.id ? 'bg-white/20' : `bg-${style.color}-100`
                  }`}>
                    <span className={`text-xl ${
                      selectedStyle === style.id ? 'text-white' : `text-${style.color}-600`
                    }`}>💃</span>
                  </div>
                  <span className="font-medium text-sm">{style.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Desktop style selector - hidden on mobile */}
          <div className="hidden md:flex justify-center mb-12">
            {danceStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`px-6 py-3 m-1 rounded-full font-bold text-lg transition-all ${
                  selectedStyle === style.id
                    ? `bg-gradient-to-r from-${style.color}-500 to-${style.color}-600 text-white shadow-lg`
                    : 'bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white/80 hover:text-gray-900'
                }`}
                style={{ 
                  boxShadow: selectedStyle === style.id ? `0 10px 15px -3px ${style.color}40` : 'none'
                }}
              >
                {style.name}
              </button>
            ))}
          </div>
          
          {/* Style content with mobile-first layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {danceStyles.map((style, index) => (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: selectedStyle === style.id ? 1 : 0.4,
                  y: 0,
                  scale: selectedStyle === style.id ? 1 : 0.95
                }}
                transition={{ duration: 0.3 }}
                className={`
                  ${selectedStyle === style.id ? 'block' : 'hidden lg:block'}
                  bg-white rounded-2xl shadow-lg overflow-hidden
                  border border-gray-100 hover:shadow-xl transition-all duration-300
                `}
                style={{ 
                  borderColor: selectedStyle === style.id ? `${style.color}30` : 'transparent'
                }}
              >
                {/* Style header with gradient background */}
                <div 
                  className="h-48 md:h-64 relative p-6 flex flex-col justify-end"
                  style={{ 
                    background: `linear-gradient(135deg, ${style.color}15 0%, ${style.color}05 100%)`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                      <span className="text-white text-3xl">💃</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white">{style.name}</h3>
                  </div>
                </div>
                
                <div className="p-6 md:p-8">
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    {style.description}
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <CreativeStar className="h-5 w-5 text-[#FFD700]" fill="currentColor" />
                      Преимущества стиля
                    </h4>
                    <ul className="space-y-3">
                      {[
                        'Идеален для начинающих без опыта',
                        'Развивает координацию и музыкальность',
                        'Помогает преодолеть скованность в движениях'
                      ].map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 bg-${style.color}-100 text-${style.color}-600`}>
                            <CreativeCheckCircle className="h-4 w-4" />
                          </div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h4>
                    {style.faq.map((item, idx) => (
                      <div key={idx} className="border-b border-gray-200 last:border-b-0 py-4">
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="flex justify-between items-center w-full text-left font-medium text-gray-900 text-lg"
                        >
                          <span>{item.q}</span>
                          <motion.div
                            animate={{ rotate: activeFaq === idx ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <CreativeChevronDown className={`h-6 w-6 ${activeFaq === idx ? `text-${style.color}-500` : 'text-gray-500'}`} />
                          </motion.div>
                        </button>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: activeFaq === idx ? 1 : 0,
                            height: activeFaq === idx ? 'auto' : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-600 mt-3 pl-1">{item.a}</p>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-[#FF4B91]/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-[#13C296]/5 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-gradient-to-r from-[#FF4B91]/10 to-[#13C296]/10 backdrop-blur-sm border border-pink-200/30 rounded-full px-4 py-1.5 mb-6 mx-auto"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF4B91] mr-2"></span>
              <span className="text-[#FF4B91] font-medium">Прозрачная система оплаты</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
            >
              Стоимость занятий
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Без скрытых платежей и обязательных доплат. Гарантия возврата денег, если формат не подойдет.
            </motion.p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-6 mb-24">
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: plan.id * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className={`relative rounded-3xl overflow-hidden shadow-xl ${
                  plan.popular ? 'lg:col-span-2 z-10' : 'lg:col-span-1'
                } ${plan.premium ? 'border-2 border-dashed border-[#6C4BFF]' : ''}`}
                style={{ 
                  background: plan.popular 
                    ? 'linear-gradient(135deg, #f9f7ff 0%, #fefeff 100%)' 
                    : plan.premium
                      ? 'linear-gradient(135deg, #f0f0ff 0%, #fef6ff 100%)'
                      : 'white',
                  boxShadow: plan.popular
                    ? '0 25px 50px -12px rgba(108, 75, 255, 0.25)'
                    : plan.premium
                      ? '0 25px 50px -12px rgba(19, 194, 150, 0.25)'
                      : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91] text-white font-bold px-6 py-2 rounded-bl-xl text-lg z-10">
                    Популярно
                  </div>
                )}
                {plan.premium && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#13C296] to-[#6C4BFF] text-white font-bold px-6 py-2 rounded-bl-xl text-lg z-10">
                    PREMIUM
                  </div>
                )}
                
                <div className="p-8 pt-16 relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <div className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91] my-3">
                    {plan.price}
                  </div>
                  <p className="text-gray-600 mb-5">{plan.duration}</p>
                  
                  {plan.note && (
                    <div className={`text-sm font-medium mb-5 p-2 rounded-lg ${
                      plan.popular ? 'bg-indigo-50 text-[#6C4BFF]' : plan.premium ? 'bg-teal-50 text-[#13C296]' : 'bg-gray-50'
                    }`}>
                      {plan.note}
                    </div>
                  )}
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                          plan.popular ? 'bg-indigo-100 text-[#6C4BFF]' : plan.premium ? 'bg-teal-100 text-[#13C296]' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <CreativeCheckCircle className="h-4 w-4" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform ${
                      plan.popular || plan.premium
                        ? 'bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91] text-white hover:from-[#6C4BFF]/90 hover:to-[#FF4B91]/90 shadow-lg hover:shadow-xl'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {plan.id === 1 ? 'Записаться' : 'Выбрать пакет'}
                  </motion.button>
                </div>
                
                {/* Decorative elements */}
                <div className={`absolute inset-0 opacity-5 ${
                  plan.popular ? 'bg-gradient-to-br from-[#6C4BFF] to-[#FF4B91]' : 
                  plan.premium ? 'bg-gradient-to-br from-[#13C296] to-[#6C4BFF]' : 
                  'bg-gradient-to-br from-gray-200 to-gray-100'
                }`}></div>
              </motion.div>
            ))}
          </div>
          
          {/* Studio Locations */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
            >
              Наши студии в центре Москвы
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Все локации в 3-5 минутах от метро, современные залы с кондиционером, зеркалами и профессиональным покрытием
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {studioLocations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-50 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6C4BFF]/5 to-[#FF4B91]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <CreativeMapPin className="h-12 w-12 text-[#6C4BFF] mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-900">{location.name.split(' ')[2]}</h4>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-gray-600 mb-2 flex items-start">
                    <CreativeMapPin className="h-5 w-5 text-[#6C4BFF] mr-2 mt-0.5 flex-shrink-0" />
                    {location.address}
                  </p>
                  <p className="text-[#FF4B91] font-medium flex items-start">
                    <CreativeClock className="h-5 w-5 text-[#6C4BFF] mr-2 mt-0.5 flex-shrink-0" />
                    {location.metro}
                  </p>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="mt-4 text-[#6C4BFF] font-medium flex items-center group/button"
                  >
                    Подробнее о студии
                    <CreativeChevronDown className="ml-1 h-4 w-4 rotate-90 group-hover/button:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#6C4BFF]/5 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-[#FF4B91]/5 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-gradient-to-r from-[#13C296]/10 to-[#6C4BFF]/10 backdrop-blur-sm border border-teal-200/30 rounded-full px-4 py-1.5 mb-6 mx-auto"
            >
              <CreativeUser className="h-4 w-4 text-[#13C296] mr-2" />
              <span className="text-[#13C296] font-medium">О наших тренерах</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
            >
              Наши тренеры
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Команда опытных тренеров с профессиональным образованием. Помогли более 350 ученикам обрести уверенность в движениях и в жизни.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-[#6C4BFF] to-[#FF4B91] flex items-center justify-center p-8">
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center">
                    <CreativeUser className="h-24 w-24 text-white mb-4" />
                    <p className="text-2xl font-bold text-white mb-2">Команда Rhythm Lab</p>
                    <p className="text-indigo-100 text-lg">Профессиональные тренеры</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-gradient-to-br from-[#13C296] to-[#FF4B91] opacity-20 blur-3xl"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { value: '8 лет', label: 'Опыт' },
                  { value: '350+', label: 'Учеников' },
                  { value: '98%', label: 'Результат' }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91]">{item.value}</div>
                    <div className="text-gray-600 mt-1 text-sm">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Почему мы работаем только индивидуально?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Групповые занятия часто заставляют учеников чувствовать себя некомфортно, особенно новичков. Индивидуальный формат позволяет:
              </p>
              
              <div className="space-y-4">
                {[
                  { title: 'Максимально персонализировать программу', text: 'Учитываем физические особенности, темперамент и цели каждого ученика' },
                  { title: 'Давать обратную связь в реальном времени', text: 'Корректируем движения сразу, а не после того как привычки закрепятся' },
                  { title: 'Создавать безопасную атмосферу', text: 'Новички часто стесняются своих движений в группе, индивидуальные занятия снимают этот стресс' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91] flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Наше образование</h4>
                <ul className="space-y-3">
                  {[
                    { title: 'Cuban Salsa Academy, Гавана', text: 'Сертифицированные тренеры по латиноамериканским танцам' },
                    { title: 'Moscow Dance Institute', text: 'Курсы повышения квалификации по индивидуальному обучению' },
                    { title: 'Moscow State University', text: 'Психология общения и работа со страхами в танце' }
                  ].map((item, index) => (
                    <li key={index} className="border-l-2 border-[#6C4BFF] pl-4 py-2">
                      <div className="font-bold text-gray-900">{item.title}</div>
                      <div className="text-gray-600">{item.text}</div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-gradient-to-r from-[#FF4B91] to-[#6C4BFF] text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  <CreativeYoutube className="mr-2 h-5 w-5" />
                  YouTube
                </motion.button>
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  <CreativeInstagram className="mr-2 h-5 w-5" />
                  Instagram
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-[#FF4B91] to-[#13C296] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 mx-auto"
            >
              <CreativeStar className="h-4 w-4 text-yellow-300 mr-2" fill="currentColor" />
              <span className="text-white font-medium">Отзывы учеников</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              Истории наших учеников
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-indigo-100 max-w-3xl mx-auto"
            >
              Реальные люди, реальные результаты. Они начали с нуля и нашли себя в танце благодаря индивидуальному подходу.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <CreativeStar key={i} className="h-5 w-5 text-yellow-300" fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-indigo-50 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91] flex items-center justify-center text-white font-bold text-xl mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{testimonial.name}</p>
                    <p className="text-yellow-200">{testimonial.style}</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center text-yellow-200">
                    <span className="text-3xl font-bold mr-2">"</span>
                    <span className="text-sm font-medium">Занимается {index + 1} год</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#FF4B91] font-bold px-8 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all transform hover:rotate-1"
            >
              Посмотреть все отзывы
            </motion.button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-[#6C4BFF]/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-[#13C296]/5 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-gradient-to-r from-[#6C4BFF]/10 to-[#13C296]/10 backdrop-blur-sm border border-indigo-200/30 rounded-full px-4 py-1.5 mb-6 mx-auto"
            >
              <CreativeMessageCircle className="h-4 w-4 text-[#6C4BFF] mr-2" />
              <span className="text-[#6C4BFF] font-medium">Готовы начать танцевать?</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
            >
              Запишитесь на пробное занятие
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Оставьте заявку и наш менеджер перезвонит вам в течение часа, чтобы подобрать удобное время и место
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CreativeMapPin className="h-6 w-6 text-[#6C4BFF] mr-2" />
                  Студии в центре Москвы
                </h3>
                {studioLocations.map((location) => (
                  <div key={location.id} className="border-b border-gray-100 last:border-b-0 py-4">
                    <h4 className="font-bold text-gray-900">{location.name}</h4>
                    <p className="text-gray-600 flex items-start mt-1">
                      <CreativeMapPin className="h-4 w-4 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                      {location.address}
                    </p>
                    <p className="text-[#FF4B91] font-medium flex items-start mt-1">
                      <CreativeClock className="h-4 w-4 text-[#6C4BFF] mr-2 mt-1 flex-shrink-0" />
                      {location.metro}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-br from-[#6C4BFF] to-[#FF4B91] rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <CreativePhone className="h-6 w-6 mr-2" />
                  Связаться напрямую
                </h3>
                <div className="space-y-4">
                  {['WhatsApp', 'Telegram', 'Телефон'].map((app) => (
                    <div key={app} className="flex items-center p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        <CreativeMessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{app}</div>
                        <div className="text-sm opacity-80">Быстрый ответ в течение 5 минут</div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-white/20 text-center">
                    <div className="text-2xl font-bold">+7 (999) 123-45-67</div>
                    <div className="text-sm opacity-80 mt-1">Звонок или WhatsApp</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-dashed border-[#6C4BFF]/30">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#6C4BFF]/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <CreativeStar className="h-6 w-6 text-[#6C4BFF]" fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Гарантия результата</h3>
                    <p className="text-gray-600">
                      Если после 4 занятий вы не почувствуете прогресс, вернем вам деньги за оставшиеся занятия.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-10"
            >
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CreativeCheckCircle className="h-12 w-12 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-600 mb-4 max-w-md mx-auto">
                    Наш менеджер перезвонит вам в течение часа для подтверждения записи на пробное занятие за 1900 ₽
                  </p>
                  <div className="mt-6 bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91] text-white font-bold py-3 rounded-xl max-w-xs mx-auto">
                    <div className="flex items-center justify-center">
                      <span>Ждем вас на занятии!</span>
                      <span className="ml-2 animate-pulse">💃</span>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6C4BFF] focus:border-transparent transition-all"
                      placeholder="Анна"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6C4BFF] focus:border-transparent transition-all"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
                      Выберите стиль танца
                    </label>
                    <select
                      id="style"
                      value={formData.style}
                      onChange={(e) => setFormData({...formData, style: e.target.value})}
                      required
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6C4BFF] focus:border-transparent transition-all appearance-none bg-white"
                    >
                      <option value="">Выберите стиль</option>
                      {danceStyles.map((style) => (
                        <option key={style.id} value={style.id}>
                          {style.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Предпочитаемое время и место
                    </label>
                    <select
                      id="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      required
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6C4BFF] focus:border-transparent transition-all appearance-none bg-white"
                    >
                      <option value="">Выберите удобное время</option>
                      {mockSlots.filter(slot => slot.available).map((slot) => (
                        <option key={slot.id} value={`${slot.date} ${slot.time}`}>
                          {slot.date} в {slot.time}, {slot.style} ({slot.location})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91] text-white font-bold py-4 px-6 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all transform hover:rotate-1 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Записаться на пробное занятие за 1900 ₽
                      <CreativeChevronDown className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6C4BFF]/80 to-[#FF4B91]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                  
                  <p className="text-center text-sm text-gray-500 mt-2">
                    Нажимая кнопку, вы соглашаетесь с <a href="#" className="text-[#6C4BFF] hover:underline">обработкой персональных данных</a>
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - from previous version */}
      <footer className="bg-[#1a2530] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-[#6C4BFF] flex items-center mb-4">
                <span className="mr-2">✨</span>
                <div>
                  <div className="font-extrabold tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6C4BFF] to-[#FF4B91]">RHYTHM</span>
                    <span className="text-white">LAB</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Индивидуальные уроки Бачаты, Сальсы и Кизомбы в центре Москвы для начинающих без опыта
              </p>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-[#2C3E50] flex items-center justify-center"
                >
                  <CreativeInstagram className="h-5 w-5 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-[#2C3E50] flex items-center justify-center"
                >
                  <CreativeYoutube className="h-5 w-5 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-[#2C3E50] flex items-center justify-center"
                >
                  <CreativePhone className="h-5 w-5 text-white" />
                </motion.button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#FFD700]">Стили танцев</h3>
              <ul className="space-y-2">
                {danceStyles.map((style) => (
                  <li key={style.id}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors block py-1">
                      {style.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors block py-1">
                    Все стили (24 занятия)
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#FFD700]">Студии</h3>
              <ul className="space-y-3">
                {studioLocations.map((location) => (
                  <li key={location.id} className="flex">
                    <CreativeMapPin className="h-5 w-5 text-[#FFD700] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-400">
                      {location.name.split(' ')[2]}<br />
                      <span className="text-sm">{location.address}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#FFD700]">Контакты</h3>
              <ul className="space-y-3">
                {[
                  { icon: <CreativePhone className="h-5 w-5 text-[#FFD700]" />, text: '+7 (999) 123-45-67' },
                  { icon: <CreativeMail className="h-5 w-5 text-[#FFD700]" />, text: 'hello@dancefirst.ru' },
                  { icon: <CreativeClock className="h-5 w-5 text-[#FFD700]" />, text: 'Пн-Сб: 10:00 - 22:00' },
                  { icon: <CreativeMapPin className="h-5 w-5 text-[#FFD700]" />, text: 'Москва, центр' }
                ].map((item, index) => (
                  <li key={index} className="flex">
                    <div className="mr-3 mt-1">{item.icon}</div>
                    <span className="text-gray-400">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#2C3E50] mt-12 pt-8 text-center text-gray-500">
            <p>© 2025 Rhythm Lab. Все права защищены.</p>
            <p className="mt-2 text-sm">
              Ключевые слова: бачата для начинающих Москва, индивидуальные уроки сальсы, кизомба тренер центр, Rhythm Lab студия танцев
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

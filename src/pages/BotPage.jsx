// File: src/pages/BotPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, ArrowUp, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import PopUpToast from '../components/PopUpToast';
import { useSettings } from '../context/SettingsContext';
import { useSavedData } from '../context/SavedDataContext';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const platformIcons = {
  Netflix: '/icons/netflix.png',
  'Amazon Prime Video': '/icons/prime.jpg',
  'Apple TV': '/icons/apple.jpg',
  'Disney+': '/icons/disney.jpg',
  HBO: '/icons/hbo.jpg',
};

const ScrollToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg transition-all duration-300"
        >
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

function GenreSelector({ selectedGenres, onGenreSelect }) {
  const genres = [
    { id:'comedy', emoji:'😂', name:'Comedy',      color:'from-yellow-500 to-orange-500' },
    { id:'drama',  emoji:'🎭', name:'Drama',       color:'from-red-500 to-pink-500'    },
    { id:'sci-fi', emoji:'🚀', name:'Sci-Fi',      color:'from-blue-500 to-cyan-500'   },
    { id:'animation', emoji:'🎨', name:'Animation', color:'from-purple-500 to-indigo-500'},
    { id:'crime', emoji:'🕵️', name:'Crime',       color:'from-gray-600 to-gray-800'   },
    { id:'romance', emoji:'💕', name:'Romance',    color:'from-pink-500 to-rose-500'   },
    { id:'documentary', emoji:'📚', name:'Documentary', color:'from-green-500 to-emerald-500'}
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
      {genres.map((g,i) => {
        const sel = selectedGenres.includes(g.id);
        return (
          <motion.button
            key={g.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.08, y: -8, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onGenreSelect(g.id)}
            className={`
              relative p-6 md:p-8 rounded-3xl backdrop-blur-sm border transition duration-300 cursor-pointer
              ${sel 
                ? 'bg-white/25 ring-4 ring-blue-400 shadow-2xl scale-105'
                : 'bg-white/10 hover:bg-white/20'
              }
              border-white/20 hover:border-white/40
            `}
          >
            {/* gradient background */}
            <div className={`
              absolute inset-0 rounded-3xl bg-gradient-to-br ${g.color}
              ${sel ? 'opacity-40' : 'opacity-20'} transition-opacity duration-300
            `}/>
            {/* glow when selected */}
            <div className={`
              absolute inset-0 rounded-3xl bg-gradient-to-br ${g.color} blur-xl
              ${sel ? 'opacity-30' : 'opacity-0'} transition-opacity duration-300
            `}/>

            <div className="relative z-10 text-center">
              <motion.div
                animate={sel 
                  ? { scale: [1,1.2,1], rotate: [0,10,-10,0] }
                  : {}
                }
                transition={{ duration: 0.5 }}
                className="text-4xl mb-3"
              >
                {g.emoji}
              </motion.div>
              <div className="text-white font-bold">{g.name}</div>
            </div>

            {sel && (
              <>
                {/* checkmark */}
                <motion.div
                  initial={{ scale:0, rotate:-180 }}
                  animate={{ scale:1, rotate:0 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs shadow-lg"
                >✓</motion.div>
                {/* floating particles */}
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 bg-white/70 rounded-full"
                  animate={{ y: [0,-20,0], opacity: [0,1,0], scale: [0.5,1,0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-2 left-2 w-1 h-1 bg-white/50 rounded-full"
                  animate={{ y: [0,-15,0], opacity: [0,1,0], scale: [0.5,1,0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              </>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

function LevelSelector({ selectedLevel, onLevelSelect }) {
  const levels = [
    { id:'beginner',     title:'Beginner',     subtitle:'Simple dialogue, clear speech',      icons:['🌱','⚡'], color:'from-green-400 to-green-600' },
    { id:'intermediate', title:'Intermediate', subtitle:'Moderate pace, everyday topics',    icons:['🎯','🏹'], color:'from-yellow-400 to-yellow-600' },
    { id:'advanced',     title:'Advanced',     subtitle:'Complex plots, natural speech',     icons:['🏆','🥇'], color:'from-purple-400 to-indigo-600' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {levels.map((lv,i) => {
        const sel = selectedLevel === lv.id;
        return (
          <motion.div
            key={lv.id}
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            onClick={() => onLevelSelect(lv.id)}
            className={`
              relative p-10 rounded-2xl backdrop-blur-sm cursor-pointer
              bg-gradient-to-br ${lv.color}/30
              ${sel 
                ? 'ring-4 ring-blue-300 shadow-2xl scale-105'
                : 'hover:ring-2 hover:ring-white/40 hover:scale-105'
              }
              transition-all duration-300
            `}
          >
            <div className="relative z-10 text-center">
              <div className="text-5xl mb-4">{lv.icons.join(' ')}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{lv.title}</h3>
              <p className="text-white/80">{lv.subtitle}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function BotCard({ series, expandedId, setExpandedId, onRemove }) {
  const isExpanded = expandedId === series.id;
  const navigate = useNavigate();
  const { settings } = useSettings();
  const lang = settings?.uiLang || 'he';

  const { savedSeries, saveSeries, removeSeries } = useSavedData();
  const isSaved = savedSeries.includes(series.id);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const cardRef = useRef(null);

  //	scroll down just enough to show details
  useEffect(() => {
    if (isExpanded) {
      const rect = cardRef.current.getBoundingClientRect();
      const overflow = rect.bottom - window.innerHeight + 20;
      if (overflow > 0) window.scrollBy({ top: overflow, behavior: 'smooth' });
    }
  }, [isExpanded]);

  const getText = field => {
    const v = series[field];
    return !v ? '' : typeof v === 'object' ? v[lang] || v.he : v;
  };

  const handleFavorite = e => {
    e.stopPropagation();
    if (isSaved) {
      removeSeries(series.id);
      setToastMessage(lang==='en'?'🗑️ Removed!':'🗑️ הוסרה מהמועדפים!');
    } else {
      saveSeries(series.id);
      setToastMessage(lang==='en'?'⭐ Added!':'⭐ נוספה למועדפים!');
      // fly animation...
      const icon = document.querySelector('#favorites-icon');
      const from = cardRef.current.getBoundingClientRect();
      const to = icon?.getBoundingClientRect();
      if (from && to) {
        const clone = cardRef.current.cloneNode(true);
        Object.assign(clone.style,{
          position:'fixed',
          left:`${from.left}px`,
          top:`${from.top}px`,
          width:`${from.width}px`,
          height:`${from.height}px`,
          transition:'transform 1.3s ease, opacity 1.3s ease',
          zIndex:1000
        });
        document.body.appendChild(clone);
        requestAnimationFrame(()=>{
          const dx = to.left - from.left;
          const dy = to.top - from.top;
          clone.style.transform = `translate(${dx}px, ${dy}px) scale(0.25)`;
          clone.style.opacity = '0';
        });
        setTimeout(()=>clone.remove(),1400);
      }
    }
    setShowToast(true);
    setTimeout(()=>setShowToast(false),1800);
  };

  const handleNavigate = () => {
    if (!isExpanded) navigate(`/episodes/${series.id}`);
  };

  const toggle = e => {
    e.stopPropagation();
    setExpandedId(isExpanded ? null : series.id);
  };

  const handleRemove = e => {
    e.stopPropagation();
    onRemove(series.id);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleNavigate}
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.015] transition duration-300 overflow-hidden cursor-pointer"
    >
      {/* remove irrelevant */}
      <div className="absolute top-2 right-2 z-10" onClick={handleRemove}>
        <X className="w-5 h-5 text-gray-400 hover:text-gray-600 transition"/>
      </div>

      {/* favorite */}
      <div className="absolute top-2 left-2 z-10" onClick={handleFavorite}>
        <button
          className={`p-1 rounded-full bg-white dark:bg-gray-800 transition-colors ${
            isSaved? 'text-red-600 hover:text-red-800':'text-green-600 hover:text-green-800'
          }`}
          aria-label={isSaved?'הסר סדרה':'הוסף סדרה'}
        >
          {isSaved?'💔':'❤️'}
        </button>
      </div>

      {/* image + title */}
      <div className="p-2 flex flex-col items-center">
        {series.image
          ? <img src={series.image} alt={getText('name')} className="w-full rounded-md aspect-video object-cover mb-2 group-hover:scale-110 transition"/>
          : <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg mb-2">
              <span className="text-gray-500 dark:text-gray-300">{lang==='en'?'No Image':'אין תמונה'}</span>
            </div>
        }
        <div className="text-base font-semibold text-gray-800 dark:text-white text-center">
          {getText('name')}
        </div>
      </div>

      {/* platforms */}
      {series.platforms?.length > 0 && (
        <div className="flex justify-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
          {series.platforms.map(p=>platformIcons[p]&&(
            <img key={p} src={platformIcons[p]} alt={p} title={p}
                 className="w-5 h-5 object-contain rounded shadow-sm hover:scale-110 transition"/>
          ))}
        </div>
      )}

      {/* toggle details */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20">
        <button onClick={toggle}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label={lang==='en'?'Show description':'הצג תיאור'}>
          {isExpanded
            ? <ChevronUpIcon className="w-4 h-4 text-gray-500"/>
            : <ChevronDownIcon className="w-4 h-4 text-gray-500"/>}
        </button>
      </div>

      {/* expand details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity:0, height:0 }}
            animate={{ opacity:1, height:'auto' }}
            exit={{ opacity:0, height:0 }}
            transition={{ duration:0.3 }}
            className="px-3 pb-3 pt-1 overflow-hidden text-sm text-gray-700 dark:text-gray-300 space-y-2"
          >
            <div>
              <strong className="block text-gray-900 dark:text-gray-100">
                {lang==='en'?'About:':'על הסדרה:'}
              </strong>
              <p>{getText('description')}</p>
            </div>
            <div>
              <strong className="block text-gray-900 dark:text-gray-100">
                {lang==='en'?'Details:':'פרטים:'}
              </strong>
              <p>{getText('details')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PopUpToast message={toastMessage} show={showToast}/>
    </div>
  );
}

export default function BotPage() {
  const [seriesList, setSeriesList] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const levelRef = useRef(null);
  const recRef = useRef(null);

  useEffect(() => {
    fetch('/data/seriesList.json')
      .then(r => r.json())
      .then(setSeriesList)
      .catch(console.error);
  }, []);

  const handleGenreSelect = id => {
    setSelectedGenres(prev => {
      const next = prev.includes(id)? prev.filter(x=>x!==id):[...prev,id];
      if (!prev.length) setTimeout(()=>levelRef.current?.scrollIntoView({behavior:'smooth',block:'center'}),300);
      if (!next.length) setSelectedLevel(''), setRecommendations([]);
      return next;
    });
    setExpandedId(null);
  };

  const handleLevelSelect = lvl=>{
    setSelectedLevel(lvl);
    const filtered = seriesList.filter(s=>
      selectedGenres.includes(s.genre.toLowerCase()) &&
      s.level.toLowerCase()===lvl
    );
    setRecommendations(filtered);
    setExpandedId(null);
    setTimeout(()=>recRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),300);
  };

  const handleRemoveRec = id=>{
    setRecommendations(prev=>prev.filter(r=>r.id!==id));
    if (expandedId===id) setExpandedId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"/>
        <div className="absolute top-60 right-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000"/>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"/>
<div
  className={`absolute inset-0 opacity-20 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]`}
/>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 space-y-16">
        {/* header */}
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }} className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <motion.div
              animate={{ rotate:[0,10,-10,0], scale:[1,1.1,1] }}
              transition={{ duration:3, repeat:Infinity, repeatDelay:2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full blur-xl opacity-50"/>
              <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full shadow-2xl">
                <Bot className="w-6 h-6 text-white"/>
              </div>
            </motion.div>
            <motion.div
              animate={{ rotate:[0,360], scale:[1,1.2,1] }}
              transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
            >
              <Sparkles className="w-5 h-5 text-yellow-400"/>
            </motion.div>
          </div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
            animate={{ backgroundPosition:['0% 50%','100% 50%','0% 50%'] }}
            transition={{ duration:5, repeat:Infinity, ease:'linear' }}
          >
            🤖 Find the Show That Fits You
          </motion.h1>

          <motion.p
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:0.5, duration:0.8 }}
            className="max-w-2xl mx-auto text-lg text-blue-100 backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/10"
          >
            Your personal AI assistant for discovering the perfect TV series to master English. Let’s find something you’ll love watching while learning! ✨
          </motion.p>
        </motion.div>

        {/* Step 1 */}
        <div className="space-y-6 text-center">
          <motion.span
            className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-300/30 shadow-2xl"
            whileHover={{ scale:1.05 }}
          >
            🎭 Step 1
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Choose Your Favorite Genres
          </h2>
          <p className="text-blue-200">Select one or more genres that interest you!</p>
          <GenreSelector selectedGenres={selectedGenres} onGenreSelect={handleGenreSelect}/>
        </div>

        {/* Step 2 */}
        <AnimatePresence>
          {selectedGenres.length > 0 && (
            <motion.div
              ref={levelRef}
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-20 }}
              transition={{ duration:0.6 }}
              className="space-y-6 text-center"
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-300/30 shadow-2xl"
                whileHover={{ scale:1.05 }}
              >
                📊 Step 2
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Select Your English Level
              </h2>
              <p className="text-blue-200">Help me find shows at your learning stage</p>
              <LevelSelector selectedLevel={selectedLevel} onLevelSelect={handleLevelSelect}/>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3 */}
        <AnimatePresence>
          {recommendations.length > 0 && (
            <motion.div
              ref={recRef}
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-20 }}
              transition={{ duration:0.6 }}
              className="space-y-6 text-center"
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-green-300/30 shadow-2xl"
                whileHover={{ scale:1.05 }}
              >
                🎁 Step 3
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-green-200">
                Your Personalized Recommendations
              </h2>
              <p className="text-blue-200">Scroll down to see them!</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <AnimatePresence>
                  {recommendations.map((s, index) => {
  const isExpanded = expandedId === s.id;

  return (
    <motion.div
      key={s.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.05 }}
    >
      <BotCard
        series={s}
        isExpanded={isExpanded}
        onExpand={() => setExpandedId(isExpanded ? null : s.id)}
        onRemove={() => handleRemoveRec(s.id)}
      />
    </motion.div>
  );
})}

                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ScrollToTop />

      <style jsx>{`
        @keyframes float {
          0%,100% { transform: translateY(0) rotate(0deg); }
          33%     { transform: translateY(-20px) rotate(1deg); }
          66%     { transform: translateY(-10px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, Play, Menu, X, Star, Clock, CalendarDays } from 'lucide-react';

export default function AnimeHomepage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [recentAnime, setRecentAnime] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [heroAnime, setHeroAnime] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [activeDay, setActiveDay] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const [homeRes, scheduleRes] = await Promise.all([
          fetch('https://www.sankavollerei.com/anime/samehadaku/home'),
          fetch('https://www.sankavollerei.com/anime/schedule')
        ]);

        const homeResult = await homeRes.json();
        const scheduleResult = await scheduleRes.json();

        if (homeResult.status === 'success') {
          setRecentAnime(homeResult.data.recent.animeList);
          setTrendingAnime(homeResult.data.top10.animeList);
          setHeroAnime(homeResult.data.movie.animeList[0]);
        }

        if (scheduleResult.status === 'success') {
          setScheduleData(scheduleResult.data);
          if (scheduleResult.data.length > 0) {
            const currentDayStr = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
            const todaySchedule = scheduleResult.data.find(d => d.day.toLowerCase() === currentDayStr.toLowerCase());
            setActiveDay(todaySchedule ? todaySchedule.day : scheduleResult.data[0].day);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-cyan-400 gap-4">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="font-medium animate-pulse">Menghubungkan ke Nexus Core...</p>
      </div>
    );
  }

  const activeScheduleList = scheduleData.find(d => d.day === activeDay)?.anime_list || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30">
      <nav className="sticky top-0 z-50 w-full bg-slate-950/40 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0">
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent cursor-pointer">
                NEXUS<span className="text-white">ANIME</span>
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              {['Home', 'Terbaru', 'Jadwal', 'Top 10'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                  {item}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <button className="text-slate-400 hover:text-cyan-400 transition-colors"><Search size={20} /></button>
              <button className="text-slate-400 hover:text-purple-400 transition-colors"><Bell size={20} /></button>
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[2px] cursor-pointer">
                <div className="h-full w-full bg-slate-900 rounded-full flex items-center justify-center">
                  <User size={16} className="text-slate-300" />
                </div>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {heroAnime && (
        <section id="home" className="relative h-[75vh] md:h-[85vh] w-full flex items-end pb-20 md:pb-32 justify-center">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={heroAnime.poster} 
              alt={heroAnime.title} 
              className="w-full h-full object-cover object-center opacity-40 blur-sm scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/30"></div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-end gap-8"
          >
            <div className="hidden md:block w-48 rounded-xl overflow-hidden shadow-2xl shadow-purple-900/50 border border-white/10 shrink-0">
              <img src={heroAnime.poster} alt="Poster" className="w-full h-auto object-cover" />
            </div>

            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-full backdrop-blur-md">
                FEATURED MOVIE • {heroAnime.releaseDate}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                {heroAnime.title}
              </h1>
              
              <div className="flex gap-2 mb-8 flex-wrap">
                {heroAnime.genreList?.map((genre) => (
                   <span key={genre.genreId} className="px-2 py-1 text-xs text-slate-300 bg-white/5 border border-white/10 rounded-md">
                     {genre.title}
                   </span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-purple-500/25 transition-all transform hover:scale-105">
                  <Play fill="currentColor" size={20} /> Watch Movie
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 relative z-20">
        
        <section id="terbaru">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="text-cyan-400" /> Baru Saja Rilis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentAnime.slice(0, 6).map((anime) => (
              <div key={anime.animeId} className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:bg-white/10 transition-colors duration-300 cursor-pointer flex h-36">
                <div className="relative w-28 shrink-0 overflow-hidden">
                  <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play fill="white" size={20} />
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-center overflow-hidden w-full">
                  <h3 className="text-white font-semibold line-clamp-2 leading-tight mb-2">{anime.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mt-auto">
                    <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                      Ep {anime.episodes}
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      {anime.releasedOn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="jadwal">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <CalendarDays className="text-purple-400" /> Jadwal Rilis
            </h2>
            <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar gap-2">
              {scheduleData.map((item) => (
                <button
                  key={item.day}
                  onClick={() => setActiveDay(item.day)}
                  className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-300 ${
                    activeDay === item.day 
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25 border-transparent' 
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {item.day}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            key={activeDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            <AnimatePresence>
              {activeScheduleList.map((anime) => (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={anime.slug} 
                  className="group relative rounded-xl overflow-hidden bg-slate-900 shadow-xl shadow-slate-950/50 cursor-pointer border border-white/5 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="aspect-[3/4] relative w-full overflow-hidden">
                    <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <Play fill="white" size={16} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-xs leading-snug line-clamp-2">{anime.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <section id="top10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Star className="text-yellow-400" /> Top 10 Trending
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {trendingAnime.map((anime) => (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                key={anime.animeId} 
                className="group relative rounded-2xl overflow-hidden bg-slate-900 shadow-xl shadow-slate-950/50 cursor-pointer border border-transparent hover:border-white/20 transition-all duration-300"
              >
                <div className="absolute top-2 left-2 z-10 bg-gradient-to-br from-purple-500 to-cyan-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-xs font-black shadow-lg">
                  #{anime.rank}
                </div>
                <div className="absolute top-2 right-2 z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-2 py-1 flex items-center gap-1">
                  <Star size={10} className="text-yellow-400" fill="currentColor" />
                  <span className="text-xs font-bold text-white">{anime.score}</span>
                </div>
                
                <div className="aspect-[2/3] relative w-full overflow-hidden">
                  <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">{anime.title}</h3>
                  <div className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mt-2 group-hover:w-1/2 transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

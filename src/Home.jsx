import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Star, Clock, CalendarDays, TrendingUp, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

export default function Home() {
  const [recentAnime, setRecentAnime] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [heroAnime, setHeroAnime] = useState(null);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [todayName, setTodayName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [homeRes, scheduleRes] = await Promise.all([
          fetch('https://www.sankavollerei.com/anime/samehadaku/home'),
          fetch('https://www.sankavollerei.com/anime/schedule')
        ]);

        const homeResult = await homeRes.json();
        const scheduleResult = await scheduleRes.json();

        if (homeResult.status === 'success') {
          setRecentAnime(homeResult.data.recent.animeList);
          setTrendingAnime(homeResult.data.top10.animeList.slice(0, 5));
          setHeroAnime(homeResult.data.movie.animeList[0]);
        }

        if (scheduleResult.status === 'success') {
          const currentDayStr = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
          setTodayName(currentDayStr);
          const scheduleToday = scheduleResult.data.find(d => d.day.toLowerCase() === currentDayStr.toLowerCase());
          if (scheduleToday) {
            setTodaySchedule(scheduleToday.anime_list.slice(0, 6));
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center text-cyan-400 gap-4">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="font-semibold tracking-wide animate-pulse">Memuat Nexus Data...</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {heroAnime && (
        <section className="relative h-[70vh] md:h-[80vh] w-full flex items-end pb-16 md:pb-24 justify-center overflow-hidden">
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
            <div className="hidden md:block w-56 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/40 border border-white/10 shrink-0">
              <img src={heroAnime.poster} alt="Poster" className="w-full h-auto object-cover" />
            </div>

            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 mb-5 text-xs font-bold tracking-widest text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-md uppercase">
                Sorotan Utama
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight drop-shadow-lg">
                {heroAnime.title}
              </h1>
              
              <div className="flex gap-2 mb-8 flex-wrap">
                {heroAnime.genreList?.map((genre) => (
                   <span key={genre.genreId} className="px-3 py-1 text-xs font-medium text-slate-200 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                     {genre.title}
                   </span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-105">
                  <Play fill="currentColor" size={20} /> Tonton Sekarang
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-20 -mt-8">
        
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Clock className="text-cyan-400" size={24} /> Baru Saja Rilis
            </h2>
          </div>
          <Swiper
            modules={[FreeMode, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            freeMode={true}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.5 },
            }}
            className="w-full pb-8"
          >
            {recentAnime.map((anime) => (
              <SwiperSlide key={anime.animeId}>
                <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:bg-white/10 transition-colors duration-300 cursor-pointer flex h-36">
                  <div className="relative w-28 shrink-0 overflow-hidden">
                    <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play fill="white" size={20} />
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-center overflow-hidden w-full">
                    <h3 className="text-white font-semibold line-clamp-2 leading-tight mb-2">{anime.title}</h3>
                    <div className="flex items-center justify-between text-xs font-medium mt-auto">
                      <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-2 py-0.5 rounded shadow-sm">
                        Ep {anime.episodes}
                      </span>
                      <span className="text-slate-400 truncate ml-2">
                        {anime.releasedOn}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <CalendarDays className="text-purple-400" size={24} /> Rilis Hari Ini <span className="text-slate-500 text-lg font-medium ml-2">({todayName})</span>
            </h2>
            <Link to="/jadwal" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Lihat Semua Jadwal <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {todaySchedule.map((anime) => (
              <div key={anime.slug} className="group relative rounded-xl overflow-hidden bg-slate-900 shadow-xl cursor-pointer border border-white/5 hover:border-cyan-500/50 transition-all duration-300">
                <div className="aspect-[3/4] relative w-full overflow-hidden">
                  <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg">
                      <Play fill="white" size={20} className="ml-1" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-xs leading-snug line-clamp-2">{anime.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <Link to="/jadwal" className="sm:hidden mt-6 w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-3 rounded-xl text-sm font-semibold transition-colors">
            Lihat Semua Jadwal <ChevronRight size={16} />
          </Link>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-green-400" size={24} /> Top 5 Trending
            </h2>
            <Link to="/trending" className="flex items-center gap-1 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Peringkat Lengkap <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {trendingAnime.map((anime) => (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                key={anime.animeId} 
                className="group relative rounded-xl overflow-hidden bg-slate-900 shadow-xl cursor-pointer border border-transparent hover:border-white/20 transition-all duration-300"
              >
                <div className="absolute top-2 left-2 z-10 bg-gradient-to-br from-purple-500 to-cyan-500 text-white w-8 h-8 flex items-center justify-center rounded-lg text-sm font-black shadow-lg">
                  #{anime.rank}
                </div>
                <div className="absolute top-2 right-2 z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-2 py-1 flex items-center gap-1">
                  <Star size={12} className="text-yellow-400" fill="currentColor" />
                  <span className="text-xs font-bold text-white">{anime.score}</span>
                </div>
                
                <div className="aspect-[2/3] relative w-full overflow-hidden">
                  <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">{anime.title}</h3>
                  <div className="w-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mt-3 group-hover:w-full transition-all duration-500 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

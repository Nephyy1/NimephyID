import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Info, Sparkles, Flame, Clock } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

export default function Home() {
  const [animeList, setAnimeList] = useState([]);
  const [donghuaList, setDonghuaList] = useState([]);
  const [dramaList, setDramaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [animeRes, donghuaRes, dramaRes] = await Promise.all([
          fetch('https://www.sankavollerei.com/anime/ongoing-anime?page=1'),
          fetch('https://www.sankavollerei.com/anime/donghua/latest/1'),
          fetch('https://www.sankavollerei.com/anime/drachin/latest?page=1')
        ]);

        const animeData = await animeRes.json();
        const donghuaData = await donghuaRes.json();
        const dramaData = await dramaRes.json();

        setAnimeList(animeData.data?.animeList || []);
        setDonghuaList(donghuaData.latest_donghua || []);
        setDramaList(dramaData.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[100vh] flex flex-col items-center justify-center text-cyan-400 gap-4 bg-slate-950">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const heroItem = animeList.length > 0 ? animeList[0] : null;

  return (
    <div className="pb-24 bg-slate-950 min-h-screen">
      {heroItem && (
        <section className="relative h-[85vh] w-full flex items-end pb-24 md:pb-32 justify-start overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={heroItem.poster} 
              alt={heroItem.title} 
              className="w-full h-full object-cover object-top opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
          >
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-[10px] font-black tracking-widest text-white bg-red-600 rounded-md uppercase shadow-lg">
                NimephyID Exclusive
              </span>
              <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl line-clamp-2 md:line-clamp-3">
                {heroItem.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm font-semibold text-slate-300 drop-shadow-md">
                <span className="text-green-400">98% Match</span>
                <span className="border border-slate-500 px-1.5 py-0.5 rounded text-xs">HD</span>
                <span>{heroItem.latestReleaseDate || 'Baru Rilis'}</span>
                <span>Anime</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/anime/${heroItem.animeId}`} className="flex items-center justify-center gap-2 bg-white hover:bg-white/80 text-black px-8 py-3.5 rounded-lg font-bold transition-all">
                  <Play fill="currentColor" size={20} /> Putar
                </Link>
                <Link to={`/anime/${heroItem.animeId}`} className="flex items-center justify-center gap-2 bg-slate-500/50 hover:bg-slate-500/70 backdrop-blur-md text-white px-8 py-3.5 rounded-lg font-bold transition-all border border-white/10">
                  <Info size={20} /> Selengkapnya
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-20 relative z-20 -mt-16 md:-mt-24">
        
        {animeList.length > 0 && (
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 px-1 drop-shadow-md flex items-center gap-2">
              Anime Sedang Tayang <Sparkles className="text-cyan-400" size={20} />
            </h2>
            <Swiper
              modules={[FreeMode]}
              spaceBetween={12}
              slidesPerView={2.2}
              freeMode={true}
              breakpoints={{ 640: { slidesPerView: 3.2 }, 1024: { slidesPerView: 5.2 }, 1280: { slidesPerView: 6.2 } }}
              className="w-full pb-4"
            >
              {animeList.slice(1).map((item) => (
                <SwiperSlide key={item.animeId}>
                  <Link to={`/anime/${item.animeId}`}>
                    <div className="group relative aspect-[2/3] rounded-md overflow-hidden bg-slate-800 cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl border border-transparent hover:border-white/20">
                      <img src={item.poster} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg z-10">Baru</div>
                      <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <h3 className="text-white font-bold text-sm line-clamp-2 mb-1">{item.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                          <span className="text-cyan-400 font-semibold">{item.latestReleaseDate}</span>
                          <span>•</span>
                          <span>Ep {item.episodes}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {donghuaList.length > 0 && (
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 px-1 drop-shadow-md flex items-center gap-2">
              Donghua Terbaru <Clock className="text-emerald-400" size={20} />
            </h2>
            <Swiper
              modules={[FreeMode]}
              spaceBetween={12}
              slidesPerView={2.2}
              freeMode={true}
              breakpoints={{ 640: { slidesPerView: 3.2 }, 1024: { slidesPerView: 5.2 }, 1280: { slidesPerView: 6.2 } }}
              className="w-full pb-4"
            >
              {donghuaList.map((item) => (
                <SwiperSlide key={item.slug}>
                  <Link to={`/donghua/detail/${item.slug}`}>
                    <div className="group relative aspect-[2/3] rounded-md overflow-hidden bg-slate-800 cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl border border-transparent hover:border-emerald-500/50">
                      <img src={item.poster} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg z-10">Donghua</div>
                      <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <h3 className="text-white font-bold text-sm line-clamp-2 mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-300">{item.status}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {dramaList.length > 0 && (
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 px-1 drop-shadow-md flex items-center gap-2">
              Drama Asia Trending <Flame className="text-fuchsia-400" size={20} />
            </h2>
            <Swiper
              modules={[FreeMode]}
              spaceBetween={12}
              slidesPerView={2.2}
              freeMode={true}
              breakpoints={{ 640: { slidesPerView: 3.2 }, 1024: { slidesPerView: 5.2 }, 1280: { slidesPerView: 6.2 } }}
              className="w-full pb-4"
            >
              {dramaList.map((item, idx) => (
                <SwiperSlide key={item.slug || idx}>
                  <Link to={`/drama/${item.slug}/1`} state={{ title: item.title }}>
                    <div className="group relative aspect-[3/4] rounded-md overflow-hidden bg-slate-800 cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl border border-transparent hover:border-fuchsia-500/50">
                      <img src={item.poster} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-fuchsia-400 text-[10px] font-bold px-2 py-0.5 rounded border border-white/10 z-10">{item.episode_info}</div>
                      <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <h3 className="text-white font-bold text-sm line-clamp-2">{item.title}</h3>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

      </main>
    </div>
  );
}

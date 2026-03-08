import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Clock, Zap, ShieldCheck, MonitorSmartphone, Sparkles, CheckCircle2, LayoutGrid } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

export default function Home() {
  const [ongoingAnime, setOngoingAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://www.sankavollerei.com/anime/ongoing-anime?page=1');
        const result = await response.json();

        if (result.status === 'success' && result.data?.animeList) {
          setOngoingAnime(result.data.animeList);
        }
      } catch (error) {
        console.error("Gagal menarik data ongoing:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center text-cyan-400 gap-4">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="font-semibold tracking-wide animate-pulse">Memuat Nexus Data...</p>
      </div>
    );
  }

  const heroAnime = ongoingAnime.length > 0 ? ongoingAnime[0] : null;

  return (
    <div className="pb-24">
      {/* Hero Section */}
      {heroAnime && (
        <section className="relative h-[70vh] md:h-[80vh] w-full flex items-end pb-16 md:pb-24 justify-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={heroAnime.poster} 
              alt={heroAnime.title} 
              className="w-full h-full object-cover object-top opacity-40 blur-sm scale-105"
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
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-5 text-xs font-bold tracking-widest text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-md uppercase">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                Baru Saja Rilis
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg line-clamp-2">
                {heroAnime.title}
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/anime/${heroAnime.animeId}`} className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-105">
                  <Play fill="currentColor" size={20} /> Tonton Sekarang
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 relative z-20 -mt-8">
        
        {/* Ongoing Carousel Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Clock className="text-cyan-400" size={24} /> Sedang Tayang (Ongoing)
            </h2>
          </div>
          <Swiper
            modules={[FreeMode, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            freeMode={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.5 }, 1280: { slidesPerView: 4.5 } }}
            className="w-full pb-8"
          >
            {ongoingAnime.slice(1).map((anime) => (
              <SwiperSlide key={anime.animeId}>
                <Link to={`/anime/${anime.animeId}`}>
                  <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer flex h-36">
                    <div className="relative w-28 shrink-0 overflow-hidden">
                      <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Play fill="white" size={20} />
                      </div>
                    </div>
                    <div className="p-4 flex flex-col justify-center overflow-hidden w-full">
                      <h3 className="text-white font-semibold text-sm line-clamp-2 leading-tight mb-2">{anime.title}</h3>
                      <div className="flex items-center justify-between text-xs font-medium mt-auto">
                        <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-2 py-0.5 rounded shadow-sm">
                          Ep {anime.episodes}
                        </span>
                        <span className="text-slate-400 truncate ml-2">{anime.latestReleaseDate}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Branding & Features Section */}
        <section className="relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Kenapa Memilih <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">NimephyID?</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Kami menghadirkan pengalaman menonton anime terbaik dengan antarmuka yang bersih, cepat, dan tanpa gangguan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl hover:bg-white/10 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4 border border-cyan-500/30">
                <Zap className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Update Tercepat</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Nikmati episode terbaru sesaat setelah tayang di Jepang tanpa harus menunggu lama.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl hover:bg-white/10 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 border border-purple-500/30">
                <Sparkles className="text-purple-400" size={24} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Kualitas Premium</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Tersedia berbagai pilihan resolusi hingga 720p HD dengan server yang stabil dan kencang.</p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl hover:bg-white/10 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-fuchsia-500/20 flex items-center justify-center mb-4 border border-fuchsia-500/30">
                <MonitorSmartphone className="text-fuchsia-400" size={24} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Multi Platform</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Desain responsif yang menyesuaikan layar Anda, nyaman ditonton di HP, Tablet, maupun PC.</p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl hover:bg-white/10 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4 border border-emerald-500/30">
                <ShieldCheck className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Aman & Nyaman</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Tampilan UI/UX modern ala Glassmorphism yang memanjakan mata tanpa iklan pop-up mengganggu.</p>
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="mt-12">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent to-purple-900/20 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                Jelajahi Arsip Anime Kami
              </h2>
              <p className="text-slate-400 mb-0">
                Dari Action yang mendebarkan hingga Romance yang bikin baper, NimephyID punya semuanya. Mau maraton anime yang sudah tamat? Kami sediakan khusus untukmu.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
              <Link to="/tamat" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/10 backdrop-blur-md shadow-lg">
                <CheckCircle2 size={18} /> Anime Tamat
              </Link>
              <Link to="/genres" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white font-bold transition-all shadow-lg shadow-cyan-500/25 transform hover:scale-105">
                <LayoutGrid size={18} /> Eksplorasi Genre
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
              

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, User, Play, Plus, Menu, X, Star, Clock } from 'lucide-react';

export default function AnimeHomepage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State untuk menyimpan data API
  const [recentAnime, setRecentAnime] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [heroAnime, setHeroAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mengambil data dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await fetch('https://www.sankavollerei.com/anime/samehadaku/home');
        const result = await response.json();

        if (result.status === 'success') {
          setRecentAnime(result.data.recent.animeList);
          setTrendingAnime(result.data.top10.animeList);
          // Mengambil film pertama untuk hero banner
          setHeroAnime(result.data.movie.animeList[0]); 
        }
      } catch (error) {
        console.error("Gagal mengambil data API:", error);
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30">
      
      {/* Navbar: Sticky Glass */}
      <nav className="sticky top-0 z-50 w-full bg-slate-950/40 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent cursor-pointer">
                NEXUS<span className="text-white">ANIME</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'Terbaru', 'Top 10', 'Movies'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                  {item}
                </a>
              ))}
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-slate-400 hover:text-cyan-400 transition-colors"><Search size={20} /></button>
              <button className="text-slate-400 hover:text-purple-400 transition-colors"><Bell size={20} /></button>
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[2px] cursor-pointer">
                <div className="h-full w-full bg-slate-900 rounded-full flex items-center justify-center">
                  <User size={16} className="text-slate-300" />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cinematic Hero Section (Menggunakan Data API Movie Pertama) */}
      {heroAnime && (
        <section className="relative h-[75vh] md:h-[85vh] w-full flex items-end pb-20 md:pb-32 justify-center">
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
            {/* Poster Khusus Hero */}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 relative z-20">
        
        {/* Rilis Terbaru (Dari data.recent) */}
        <section id="terbaru">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">Baru Saja Rilis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentAnime.slice(0, 6).map((anime) => (
              <div key={anime.animeId} className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:bg-white/10 transition-colors duration-300 cursor-pointer flex h-36">
                <div className="relative w-28 shrink-0 overflow-hidden">
                  <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play fill="white" size={20} />
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-center overflow-hidden">
                  <h3 className="text-white font-semibold line-clamp-2 leading-tight mb-2">{anime.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                      Ep {anime.episodes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {anime.releasedOn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top 10 Trending (Dari data.top10) */}
        <section id="top10">
          <h2 className="text-2xl font-bold text-white mb-6">Top 10 Trending</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {trendingAnime.map((anime) => (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                key={anime.animeId} 
                className="group relative rounded-2xl overflow-hidden bg-slate-900 shadow-xl shadow-slate-950/50 cursor-pointer border border-transparent hover:border-white/20 transition-all duration-300"
              >
                {/* Badge Rank & Rating */}
                <div className="absolute top-2 left-2 z-10 bg-gradient-to-br from-purple-500 to-cyan-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-xs font-black shadow-lg">
                  #{anime.rank}
                </div>
                <div className="absolute top-2 right-2 z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-2 py-1 flex items-center gap-1">
                  <Star size={10} className="text-yellow-400" fill="currentColor" />
                  <span className="text-xs font-bold text-white">{anime.score}</span>
                </div>
                
                {/* Poster Image */}
                <div className="aspect-[2/3] relative w-full overflow-hidden">
                  <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">{anime.title}</h3>
                  <div className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mt-2 group-hover:w-1/2 transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

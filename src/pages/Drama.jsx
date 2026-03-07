import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Clapperboard, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Drama() {
  const [dramas, setDramas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDramas = async () => {
      try {
        const response = await fetch('https://www.sankavollerei.com/anime/dramabox/latest?page=1');
        const result = await response.json();
        
        if (result.status === 'success') {
          setDramas(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDramas();
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-fuchsia-400 gap-4">
        <div className="w-12 h-12 border-4 border-fuchsia-500/30 border-t-fuchsia-500 rounded-full animate-spin"></div>
        <p className="font-semibold tracking-wide animate-pulse">Menghubungkan ke DramaBox...</p>
      </div>
    );
  }

  return (
    <div className="pb-24 selection:bg-fuchsia-500/30">
      <section className="relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-fuchsia-950/40"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-fuchsia-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-fuchsia-300 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-full backdrop-blur-md uppercase">
            <Sparkles size={14} /> NimephyID Originals
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
            Drama <span className="bg-gradient-to-r from-fuchsia-500 to-rose-500 bg-clip-text text-transparent">Asia</span> Terbaik
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Jelajahi koleksi drama terbaru dengan kualitas premium. Dari romansa hingga aksi, temukan cerita favoritmu di sini.
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Clapperboard className="text-fuchsia-400" size={24} /> Rilis Terbaru
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {dramas.map((drama, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={drama.bookId}
            >
              <Link to={`/drama/${drama.bookId}`}>
                <div className="group relative rounded-2xl overflow-hidden bg-slate-900 shadow-xl shadow-slate-950/50 cursor-pointer border border-transparent hover:border-fuchsia-500/30 transition-all duration-500 flex flex-col h-full">
                  <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-2.5 py-1 flex items-center shadow-lg">
                    <span className="text-xs font-bold text-fuchsia-300">{drama.total_episode}</span>
                  </div>

                  <div className="aspect-[3/4] relative w-full overflow-hidden shrink-0">
                    <img 
                      src={drama.cover} 
                      alt={drama.judul} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 bg-fuchsia-500/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.5)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play fill="white" size={24} className="ml-1 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 bg-white/5 backdrop-blur-sm border-t border-white/5 p-4 flex flex-col justify-between group-hover:bg-fuchsia-950/20 transition-colors duration-300">
                    <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 mb-3">
                      {drama.judul}
                    </h3>
                    <div className="w-0 h-1 bg-gradient-to-r from-fuchsia-500 to-rose-500 group-hover:w-full transition-all duration-500 rounded-full mt-auto"></div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

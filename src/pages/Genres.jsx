import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, ChevronRight } from 'lucide-react';

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://www.sankavollerei.com/anime/genres');
        const result = await response.json();
        
        if (result.status === 'success') {
          setGenres(result.data.genreList);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="pb-24 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 min-h-screen">
      <div className="mb-10 border-b border-white/10 pb-6">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-3">
          <LayoutGrid className="text-cyan-400" size={36} />
          Eksplorasi Genre
        </h1>
        <p className="text-slate-400">
          Temukan tontonan anime favoritmu berdasarkan kategori dan genre yang tersedia.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 text-cyan-400 gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="font-semibold tracking-wide animate-pulse">Menarik Data Kategori...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {genres.map((genre, index) => (
            <motion.div
              key={genre.genreId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
            >
              <Link 
                to={`/genre/${genre.genreId}`}
                className="group flex items-center justify-between p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
              >
                <span className="font-bold text-slate-200 group-hover:text-white transition-colors truncate pr-2">
                  {genre.title}
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-900/50 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:border-cyan-400 transition-all duration-300">
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-white" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

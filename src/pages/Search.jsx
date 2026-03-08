import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Star, Play, MonitorPlay } from 'lucide-react';

export default function Search() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://www.sankavollerei.com/anime/search/${query}`);
        const result = await response.json();
        
        if (result.status === 'success' && result.data.animeList) {
          setResults(result.data.animeList);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
    window.scrollTo(0, 0);
  }, [query]);

  return (
    <div className="pb-24 pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 min-h-screen">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center justify-center md:justify-start gap-3">
          <SearchIcon className="text-cyan-400" size={32} />
          Hasil Pencarian
        </h1>
        <p className="text-slate-400 text-lg">
          Menampilkan hasil untuk: <span className="text-cyan-400 font-bold">"{query}"</span>
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-cyan-400 gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="font-semibold tracking-wide animate-pulse">Mencari Data Frame...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {results.map((anime, index) => (
            <Link to={`/anime/${anime.animeId}`} key={anime.animeId}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 shadow-xl shadow-slate-950/50 cursor-pointer border border-transparent hover:border-cyan-500/30 transition-all duration-300 flex flex-col h-full"
              >
                <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-2 py-1 flex items-center gap-1 shadow-lg">
                  <Star size={12} className="text-yellow-400" fill="currentColor" />
                  <span className="text-xs font-bold text-white">{anime.score}</span>
                </div>
                
                <div className="absolute top-2 right-2 z-10 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 rounded-lg px-2 py-1 shadow-lg">
                  <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">{anime.status}</span>
                </div>

                <div className="aspect-[2/3] relative w-full overflow-hidden shrink-0">
                  <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-cyan-500/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play fill="white" size={20} className="ml-1 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 bg-white/5 backdrop-blur-sm p-4 flex flex-col justify-between group-hover:bg-cyan-950/20 transition-colors duration-300">
                  <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 mb-2">
                    {anime.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {anime.genreList?.slice(0, 2).map((genre) => (
                      <span key={genre.genreId} className="text-[10px] font-medium text-slate-300 bg-white/10 px-1.5 py-0.5 rounded border border-white/5">
                        {genre.title}
                      </span>
                    ))}
                  </div>
                  <div className="w-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mt-3 group-hover:w-full transition-all duration-500 rounded-full"></div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <MonitorPlay size={64} className="text-slate-600 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Anime tidak ditemukan</h2>
          <p className="text-slate-400">Coba gunakan kata kunci lain untuk mencari tontonanmu.</p>
        </div>
      )}
    </div>
  );
}                       

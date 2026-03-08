import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Star, Play, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Tamat() {
  const [animeList, setAnimeList] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page')) || 1;

  useEffect(() => {
    const fetchCompletedAnime = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://www.sankavollerei.com/anime/complete-anime?page=${currentPage}`);
        const result = await response.json();
        
        if (result.status === 'success') {
          setAnimeList(result.data.animeList);
          setPagination(result.pagination);
        }
      } catch (error) {
        console.error("Gagal mengambil data anime tamat:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompletedAnime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    navigate(`/tamat?page=${newPage}`);
  };

  return (
    <div className="pb-24 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-3">
            <CheckCircle2 className="text-green-400" size={36} />
            Anime Tamat
          </h1>
          <p className="text-slate-400">
            Daftar lengkap anime yang sudah selesai tayang. Maraton sekarang tanpa harus menunggu minggu depan!
          </p>
        </div>
        
        {pagination && (
          <div className="bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-semibold text-cyan-400 shrink-0 shadow-inner">
            Halaman {pagination.currentPage} dari {pagination.totalPages}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 text-cyan-400 gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="font-semibold tracking-wide animate-pulse">Menarik Arsip Nexus...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {animeList.map((anime, index) => (
              <Link to={`/anime/${anime.animeId}`} key={anime.animeId}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 shadow-xl shadow-slate-950/50 cursor-pointer border border-transparent hover:border-green-500/30 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-2 py-1 flex items-center gap-1 shadow-lg">
                    <Star size={12} className="text-yellow-400" fill="currentColor" />
                    <span className="text-xs font-bold text-white">{anime.score}</span>
                  </div>
                  
                  <div className="absolute top-2 right-2 z-10 bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-lg px-2 py-1 shadow-lg">
                    <span className="text-[10px] font-bold text-green-300 uppercase tracking-wider">{anime.episodes} Eps</span>
                  </div>

                  <div className="aspect-[2/3] relative w-full overflow-hidden shrink-0">
                    <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-green-500/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.5)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play fill="white" size={20} className="ml-1 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 bg-white/5 backdrop-blur-sm p-4 flex flex-col justify-between group-hover:bg-green-950/20 transition-colors duration-300">
                    <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 mb-2">
                      {anime.title}
                    </h3>
                    <div className="mt-auto">
                      <span className="text-xs text-slate-400 block mb-2">Tamat pada: {anime.lastReleaseDate}</span>
                      <div className="w-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-4">
              <button
                onClick={() => handlePageChange(pagination.prevPage)}
                disabled={!pagination.hasPrevPage}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all shadow-lg ${
                  pagination.hasPrevPage 
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-cyan-400/50 hover:shadow-cyan-500/20' 
                    : 'bg-white/5 text-slate-500 border border-transparent cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={20} /> Prev
              </button>
              
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-slate-400">Page</span>
                <span className="text-lg font-black text-white px-4 py-2 bg-slate-900 border border-white/10 rounded-lg shadow-inner">
                  {pagination.currentPage}
                </span>
                <span className="text-slate-400">of {pagination.totalPages}</span>
              </div>

              <button
                onClick={() => handlePageChange(pagination.nextPage)}
                disabled={!pagination.hasNextPage}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all shadow-lg ${
                  pagination.hasNextPage 
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white shadow-cyan-500/25 transform hover:scale-105' 
                    : 'bg-white/5 text-slate-500 border border-transparent cursor-not-allowed'
                }`}
              >
                Next <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
              

import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, Star, Play, ChevronLeft, ChevronRight, MonitorPlay } from 'lucide-react';

export default function GenreDetail() {
  const { genreId } = useParams();
  const [animeList, setAnimeList] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page')) || 1;

  const formatGenreTitle = (id) => {
    return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  useEffect(() => {
    const fetchGenreAnime = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://www.sankavollerei.com/anime/genre/${genreId}?page=${currentPage}`);
        const result = await response.json();
        
        if (result.status === 'success' && result.data && result.data.animeList) {
          setAnimeList(result.data.animeList);
          setPagination(result.pagination);
        } else {
          setAnimeList([]);
          setPagination(null);
        }
      } catch (error) {
        console.error("Gagal mengambil data anime per genre:", error);
        setAnimeList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenreAnime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [genreId, currentPage]);

  const handlePageChange = (newPage) => {
    navigate(`/genre/${genreId}?page=${newPage}`);
  };

  return (
    <div className="pb-24 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-3">
            <LayoutGrid className="text-orange-400" size={36} />
            Genre: {formatGenreTitle(genreId)}
          </h1>
          <p className="text-slate-400">
            Menampilkan daftar anime terbaik untuk kategori <span className="text-orange-400 font-bold">{formatGenreTitle(genreId)}</span>.
          </p>
        </div>
        
        {pagination && pagination.totalPages > 0 && (
          <div className="bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-semibold text-orange-400 shrink-0 shadow-inner">
            Halaman {pagination.currentPage} dari {pagination.totalPages}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 text-orange-400 gap-4">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="font-semibold tracking-wide animate-pulse">Memuat Daftar Anime...</p>
        </div>
      ) : animeList.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {animeList.map((anime, index) => (
              <Link to={`/anime/${anime.animeId}`} key={anime.animeId}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 shadow-xl shadow-slate-950/50 cursor-pointer border border-transparent hover:border-orange-500/30 transition-all duration-300 flex flex-col h-full"
                >
                  {anime.score && (
                    <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-2 py-1 flex items-center gap-1 shadow-lg">
                      <Star size={12} className="text-yellow-400" fill="currentColor" />
                      <span className="text-xs font-bold text-white">{anime.score}</span>
                    </div>
                  )}
                  
                  <div className="absolute top-2 right-2 z-10 bg-orange-500/20 backdrop-blur-md border border-orange-500/30 rounded-lg px-2 py-1 shadow-lg">
                    <span className="text-[10px] font-bold text-orange-300 uppercase tracking-wider">
                      {anime.episodes ? `${anime.episodes} Eps` : 'Ongoing'}
                    </span>
                  </div>

                  <div className="aspect-[2/3] relative w-full overflow-hidden shrink-0">
                    <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-orange-500/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.5)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play fill="white" size={20} className="ml-1 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 bg-white/5 backdrop-blur-sm p-4 flex flex-col justify-between group-hover:bg-orange-950/20 transition-colors duration-300">
                    <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 mb-2">
                      {anime.title}
                    </h3>
                    <div className="mt-auto">
                      <span className="text-xs text-slate-400 block mb-2">{anime.season || anime.studios}</span>
                      <div className="w-0 h-1 bg-gradient-to-r from-orange-400 to-amber-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
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
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-orange-400/50 hover:shadow-orange-500/20' 
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
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white shadow-orange-500/25 transform hover:scale-105' 
                    : 'bg-white/5 text-slate-500 border border-transparent cursor-not-allowed'
                }`}
              >
                Next <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <MonitorPlay size={64} className="text-slate-600 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Belum Ada Anime</h2>
          <p className="text-slate-400">Tidak ada anime yang ditemukan untuk genre ini.</p>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, CalendarDays, Film, MonitorPlay, Play, Hash } from 'lucide-react';

export default function Detail() {
  const { slug } = useParams();
  const [anime, setAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await fetch(`https://www.sankavollerei.com/anime/anime/${slug}`);
        const result = await response.json();
        
        if (result.status === 'success') {
          setAnime(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeDetail();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center text-cyan-400 gap-4">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="font-semibold tracking-wide animate-pulse">Menarik Data Frame...</p>
      </div>
    );
  }

  if (!anime) return <div className="text-center text-white mt-20">Anime tidak ditemukan.</div>;

  return (
    <div className="pb-24">
      <section className="relative h-[55vh] md:h-[65vh] w-full">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={anime.poster} 
            alt={anime.title} 
            className="w-full h-full object-cover object-top opacity-30 blur-xl scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-64 md:-mt-80">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-48 md:w-72 shrink-0 mx-auto md:mx-0"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/30 border border-white/10 relative group">
              <img src={anime.poster} alt={anime.title} className="w-full h-auto object-cover" />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                <Star size={14} className="text-yellow-400" fill="currentColor" />
                <span className="text-sm font-bold text-white">{anime.score}</span>
              </div>
            </div>
            
            {anime.episodeList && anime.episodeList.length > 0 && (
              <Link 
                to={`/episode/${anime.episodeList[anime.episodeList.length - 1].episodeId}`}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-105"
              >
                <Play fill="currentColor" size={20} /> Mulai Menonton
              </Link>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 pt-4 md:pt-12"
          >
            <div className="mb-6">
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">
                {anime.title}
              </h1>
              {anime.japanese && (
                <h2 className="text-lg md:text-xl font-medium text-cyan-400 mb-4">
                  {anime.japanese}
                </h2>
              )}
              <div className="flex flex-wrap gap-2 mb-8">
                {anime.genreList?.map((genre) => (
                  <span key={genre.genreId} className="px-3 py-1 text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                    {genre.title}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <MonitorPlay size={16} /> <span className="text-xs font-medium uppercase tracking-wider">Status</span>
                </div>
                <p className="text-white font-semibold">{anime.status}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Hash size={16} /> <span className="text-xs font-medium uppercase tracking-wider">Episode</span>
                </div>
                <p className="text-white font-semibold">{anime.episodes} Eps</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Clock size={16} /> <span className="text-xs font-medium uppercase tracking-wider">Durasi</span>
                </div>
                <p className="text-white font-semibold">{anime.duration}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <CalendarDays size={16} /> <span className="text-xs font-medium uppercase tracking-wider">Rilis</span>
                </div>
                <p className="text-white font-semibold">{anime.aired}</p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Film className="text-purple-400" /> Sinopsis
              </h3>
              <div className="text-slate-300 leading-relaxed space-y-4 text-sm md:text-base bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                {anime.synopsis?.paragraphs?.length > 0 ? (
                  anime.synopsis.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
                ) : (
                  <p className="italic text-slate-500">Sinopsis belum tersedia untuk anime ini.</p>
                )}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-sm text-cyan-400 font-medium">
                  Studio: <span className="text-white">{anime.studios}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <section className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <MonitorPlay className="text-cyan-400" size={24} /> Daftar Episode
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {anime.episodeList?.map((eps) => (
              <Link to={`/episode/${eps.episodeId}`} key={eps.episodeId}>
                <div className="group flex items-center justify-between p-4 bg-slate-900 border border-white/5 rounded-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer shadow-lg">
                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-sm mb-1 group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {eps.title}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <CalendarDays size={12} /> {eps.date}
                    </span>
                  </div>
                  <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-cyan-500 transition-all duration-300 ml-4">
                    <Play size={16} className="text-slate-300 group-hover:text-white ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {anime.recommendedAnimeList?.length > 0 && (
          <section className="mt-20">
            <h3 className="text-2xl font-bold text-white mb-6">Rekomendasi Serupa</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {anime.recommendedAnimeList.map((rec) => (
                <Link to={`/anime/${rec.animeId}`} key={rec.animeId}>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="group relative rounded-xl overflow-hidden bg-slate-900 shadow-xl cursor-pointer border border-transparent hover:border-white/20 transition-all duration-300"
                  >
                    <div className="aspect-[2/3] relative w-full overflow-hidden">
                      <img src={rec.poster} alt={rec.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">{rec.title}</h3>
                      <div className="w-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mt-2 group-hover:w-full transition-all duration-500 rounded-full"></div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

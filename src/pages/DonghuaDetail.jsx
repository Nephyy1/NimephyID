import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowLeft, CloudLightning, Film, CalendarDays, MonitorPlay, ListVideo } from 'lucide-react';

export default function DonghuaDetail() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://www.sankavollerei.com/anime/donghua/detail/${slug}`);
        const result = await response.json();
        if (result.title) {
          setData(result);
        }
      } catch (error) {
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center text-emerald-400 gap-4">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center text-white mt-32 font-bold text-xl">Donghua tidak ditemukan.</div>;
  }

  return (
    <div className="pb-24 pt-20">
      <section className="relative h-[55vh] md:h-[65vh] w-full">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={data.poster} 
            alt={data.title} 
            className="w-full h-full object-cover object-top opacity-30 blur-xl scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-64 md:-mt-80">
        <Link 
          to="/donghua" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-6 font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft size={18} /> Pustaka Donghua
        </Link>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-48 md:w-72 shrink-0 mx-auto md:mx-0"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/30 border border-white/10 relative">
              <img src={data.poster} alt={data.title} className="w-full h-auto object-cover" />
              <div className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1 shadow-lg">
                <span className="text-xs font-bold text-white uppercase">{data.status}</span>
              </div>
            </div>
            
            {data.episodes_list && data.episodes_list.length > 0 && (
              <Link 
                to={`/donghua/episode/${data.episodes_list[data.episodes_list.length - 1].slug}`}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-emerald-500/25 transition-all transform hover:scale-105"
              >
                <Play fill="currentColor" size={20} /> Tonton Ep 1
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
                {data.title}
              </h1>
              {data.alter_title && (
                <h2 className="text-lg md:text-xl font-medium text-emerald-400 mb-4">
                  {data.alter_title}
                </h2>
              )}
              <div className="flex flex-wrap gap-2 mb-8">
                {data.genres?.map((genre, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <MonitorPlay size={16} /> <span className="text-xs font-medium uppercase tracking-wider">Studio</span>
                </div>
                <p className="text-white font-semibold truncate">{data.studio || '-'}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <ListVideo size={16} /> <span className="text-xs font-medium uppercase tracking-wider">Episode</span>
                </div>
                <p className="text-white font-semibold">{data.episodes_count}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <CloudLightning size={16} /> <span className="text-xs font-medium uppercase tracking-wider">Tipe</span>
                </div>
                <p className="text-white font-semibold">{data.type}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <CalendarDays size={16} /> <span className="text-xs font-medium uppercase tracking-wider">Rilis</span>
                </div>
                <p className="text-white font-semibold truncate">{data.released}</p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Film className="text-emerald-400" /> Sinopsis
              </h3>
              <div className="text-slate-300 leading-relaxed text-sm md:text-base bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                {data.synopsis || "Sinopsis tidak tersedia."}
              </div>
            </div>
          </motion.div>
        </div>

        <section className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <MonitorPlay className="text-emerald-400" size={24} /> Daftar Episode
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {data.episodes_list?.map((eps, i) => (
              <Link to={`/donghua/episode/${eps.slug}`} key={i}>
                <div className="group flex items-center justify-between p-4 bg-slate-900 border border-white/5 rounded-xl hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300 shadow-lg">
                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-sm group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {eps.episode}
                    </span>
                  </div>
                  <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 transition-all duration-300 ml-4">
                    <Play size={16} className="text-slate-300 group-hover:text-white ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16, 185, 129, 0.5); }
      `}</style>
    </div>
  );
}
            

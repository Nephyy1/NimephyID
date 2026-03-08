import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, CalendarDays, MonitorPlay, Hash, Download, HardDrive, Server, ArrowLeft } from 'lucide-react';

export default function Batch() {
  const { batchId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBatchData = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await fetch(`https://www.sankavollerei.com/anime/batch/${batchId}`);
        
        if (!response.ok) {
          throw new Error("Gagal terhubung ke server (API Error)");
        }

        const result = await response.json();
        
        if (result.status === 'success' && result.data) {
          setData(result.data);
        } else {
          throw new Error("Data Batch tidak ditemukan.");
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBatchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [batchId]);

  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center text-cyan-400 gap-4">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="font-semibold tracking-wide animate-pulse">Menyiapkan Berkas Batch...</p>
      </div>
    );
  }

  if (errorMessage || !data) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <Server size={64} className="text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Gagal Memuat Data</h2>
        <p className="text-slate-400">{errorMessage || "Data tidak ditemukan."}</p>
        <Link to="/" className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/10">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link 
        to={`/anime/${data.animeId}`} 
        className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8 font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
      >
        <ArrowLeft size={18} /> Kembali ke Info Anime
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-48 md:w-72 shrink-0 mx-auto md:mx-0"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/30 border border-white/10 relative group sticky top-28">
            <img src={data.poster} alt={data.title} className="w-full h-auto object-cover" />
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-lg">
              <Star size={14} className="text-yellow-400" fill="currentColor" />
              <span className="text-sm font-bold text-white">{data.score}</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-950 to-transparent p-4">
              <span className="inline-block px-3 py-1 bg-purple-500/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-md border border-purple-400/50 shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                Batch Download
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">
              {data.title}
            </h1>
            {data.japanese && (
              <h2 className="text-lg md:text-xl font-medium text-cyan-400 mb-4">
                {data.japanese}
              </h2>
            )}
            
            <div className="flex flex-wrap gap-2 mb-8">
              {data.genreList?.map((genre) => (
                <Link to={`/genre/${genre.genreId}`} key={genre.genreId}>
                  <span className="px-3 py-1 text-xs font-semibold text-slate-200 bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/50 border border-white/10 rounded-lg backdrop-blur-sm transition-all cursor-pointer">
                    {genre.title}
                  </span>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm shadow-inner">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <MonitorPlay size={16} /> <span className="text-xs font-medium uppercase tracking-wider">Tipe</span>
                </div>
                <p className="text-white font-semibold">{data.type}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm shadow-inner">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Hash size={16} /> <span className="text-xs font-medium uppercase tracking-wider">Episode</span>
                </div>
                <p className="text-white font-semibold">{data.episodes} Eps</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm shadow-inner">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Clock size={16} /> <span className="text-xs font-medium uppercase tracking-wider">Durasi</span>
                </div>
                <p className="text-white font-semibold">{data.duration}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm shadow-inner">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <CalendarDays size={16} /> <span className="text-xs font-medium uppercase tracking-wider">Rilis</span>
                </div>
                <p className="text-white font-semibold">{data.aired}</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4 relative z-10">
                <Download className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Tautan Unduhan Batch</h3>
              </div>

              <div className="space-y-10 relative z-10">
                {data.downloadUrl?.formats?.map((format, formatIdx) => (
                  <div key={formatIdx}>
                    <h4 className="text-lg font-semibold text-purple-300 mb-6 bg-purple-900/20 px-4 py-2 rounded-lg border border-purple-500/20 inline-block">
                      {format.title}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {format.qualities?.map((quality, qualityIdx) => (
                        <div key={qualityIdx} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-cyan-500/30 transition-colors shadow-lg">
                          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                            <h5 className="text-white font-bold flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                              {quality.title}
                            </h5>
                            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-slate-950 px-2.5 py-1 rounded-md border border-white/10">
                              <HardDrive size={12} className="text-cyan-400" />
                              {quality.size}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2.5">
                            {quality.urls?.map((urlItem, urlIdx) => (
                              <a 
                                key={urlIdx}
                                href={urlItem.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-900/30 rounded-lg text-slate-300 hover:text-white transition-all shadow-inner"
                              >
                                <Download size={12} className="text-cyan-400" />
                                {urlItem.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm relative z-10">
                <span className="text-slate-400">
                  <strong className="text-white">Studio:</strong> {data.studios}
                </span>
                <span className="text-slate-400 text-xs md:text-sm">
                  <strong className="text-white">Producers:</strong> {data.producers}
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
                  

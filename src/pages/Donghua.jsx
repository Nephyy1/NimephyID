import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CloudLightning, Search, Play, Sparkles, Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Donghua() {
  const [donghuas, setDonghuas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState('latest');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (mode === 'latest') {
      fetchData(`https://www.sankavollerei.com/anime/donghua/latest/${page}`, 'latest_donghua');
    } else if (mode === 'ongoing') {
      fetchData(`https://www.sankavollerei.com/anime/donghua/ongoing/${page}`, 'ongoing_donghua');
    } else if (mode === 'completed') {
      fetchData(`https://www.sankavollerei.com/anime/donghua/completed/${page}`, 'completed_donghua');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [mode, page]);

  const fetchData = async (url, dataKey) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result.status === 'success' && result[dataKey]) {
        setDonghuas(result[dataKey]);
      } else {
        setDonghuas([]);
      }
    } catch (error) {
      setDonghuas([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setMode('latest');
      setPage(1);
      return;
    }
    
    setMode('search');
    setIsLoading(true);
    try {
      const response = await fetch(`https://www.sankavollerei.com/anime/donghua/search/${encodeURIComponent(searchQuery)}`);
      const result = await response.json();
      if (result.data) {
        setDonghuas(result.data);
      } else {
        setDonghuas([]);
      }
    } catch (error) {
      setDonghuas([]);
    } finally {
      setIsLoading(false);
    }
  };

  let sectionTitle = "";
  let sectionIcon = null;
  
  if (mode === 'latest') {
    sectionTitle = "Update Terbaru";
    sectionIcon = <Sparkles className="text-emerald-400" size={24} />;
  } else if (mode === 'ongoing') {
    sectionTitle = "Sedang Tayang";
    sectionIcon = <Clock className="text-teal-400" size={24} />;
  } else if (mode === 'completed') {
    sectionTitle = "Sudah Tamat";
    sectionIcon = <CheckCircle2 className="text-emerald-500" size={24} />;
  } else {
    sectionTitle = `Hasil Pencarian: "${searchQuery}"`;
    sectionIcon = <Search className="text-cyan-400" size={24} />;
  }

  return (
    <div className="pb-24 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-3">
            <CloudLightning className="text-emerald-400" size={36} />
            Donghua
          </h1>
          <p className="text-slate-400">
            Eksplorasi animasi Tiongkok terbaik dengan kualitas grafis dan cerita memukau.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative w-full md:w-96 shrink-0">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul donghua..."
            className="w-full bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl pl-11 pr-24 py-3.5 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 text-white placeholder-slate-500 shadow-inner"
          />
          <button 
            type="submit"
            disabled={isLoading && mode === 'search'}
            className="absolute inset-y-1.5 right-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold px-4 rounded-xl transition-colors disabled:opacity-50"
          >
            Cari
          </button>
        </form>
      </div>

      {mode !== 'search' && (
        <div className="flex flex-wrap items-center gap-3 mb-8 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit backdrop-blur-md">
          <button
            onClick={() => { setMode('latest'); setPage(1); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              mode === 'latest' 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles size={16} /> Terbaru
          </button>
          <button
            onClick={() => { setMode('ongoing'); setPage(1); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              mode === 'ongoing' 
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Clock size={16} /> Ongoing
          </button>
          <button
            onClick={() => { setMode('completed'); setPage(1); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              mode === 'completed' 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <CheckCircle2 size={16} /> Tamat
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          {sectionIcon}
          <h2 className="text-2xl font-bold text-white">{sectionTitle}</h2>
        </div>
        
        {mode === 'search' && (
          <button 
            onClick={() => { setMode('latest'); setSearchQuery(''); }}
            className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/20 transition-colors"
          >
            Kembali
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 text-emerald-400 gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
      ) : donghuas.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {donghuas.map((donghua, index) => (
              <Link 
                to={`/donghua/detail/${donghua.slug}`} 
                key={donghua.slug || index}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 shadow-xl shadow-slate-950/50 border border-transparent hover:border-emerald-500/30 transition-all duration-300 flex flex-col h-full cursor-pointer"
                >
                  <div className="absolute top-2 right-2 z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-2 py-1 shadow-lg">
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">{donghua.status}</span>
                  </div>

                  <div className="aspect-[3/4] relative w-full overflow-hidden shrink-0 bg-slate-800">
                    <img src={donghua.poster} alt={donghua.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-emerald-500/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play fill="white" size={20} className="ml-1 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 bg-white/5 backdrop-blur-sm p-4 flex flex-col justify-between group-hover:bg-emerald-950/20 transition-colors duration-300">
                    <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 mb-2">
                      {donghua.title}
                    </h3>
                    <div className="w-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mt-auto group-hover:w-full transition-all duration-500 rounded-full"></div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {mode !== 'search' && (
            <div className="mt-16 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all shadow-lg ${
                  page > 1 
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-emerald-400/50 hover:shadow-emerald-500/20' 
                    : 'bg-white/5 text-slate-500 border border-transparent cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={20} /> Prev
              </button>
              
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-slate-400">Page</span>
                <span className="text-lg font-black text-white px-4 py-2 bg-slate-900 border border-white/10 rounded-lg shadow-inner">
                  {page}
                </span>
              </div>

              <button
                onClick={() => setPage(prev => prev + 1)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all shadow-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-500/25 transform hover:scale-105"
              >
                Next <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <CloudLightning size={64} className="text-slate-600 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Donghua tidak ditemukan</h2>
        </div>
      )}
    </div>
  );
}
                    

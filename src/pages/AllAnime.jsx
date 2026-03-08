import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Library, ChevronRight, AlertTriangle, Hash } from 'lucide-react';

export default function AllAnime() {
  const [alphabetData, setAlphabetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAllAnime = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await fetch('https://www.sankavollerei.com/anime/unlimited');
        
        if (!response.ok) throw new Error("Gagal mengakses database pusat.");

        const result = await response.json();
        
        if (result.status === 'success' && result.data && result.data.list) {
          setAlphabetData(result.data.list);
        } else {
          throw new Error("Format data tidak sesuai.");
        }
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllAnime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToLetter = (letter) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-24 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 min-h-screen">
      <div className="mb-8 border-b border-white/10 pb-6">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3 flex items-center gap-3">
          <Library className="text-purple-400" size={36} />
          Pustaka NimephyID (A-Z)
        </h1>
        <p className="text-slate-400">
          Jelajahi ribuan koleksi anime kami. Gunakan navigasi abjad di bawah untuk melompat cepat.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 text-purple-400 gap-4">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <p className="font-semibold tracking-wide animate-pulse">Menyusun Ribuan Arsip...</p>
        </div>
      ) : errorMessage ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-red-950/20 border border-red-500/30 rounded-3xl backdrop-blur-md p-6">
          <AlertTriangle size={64} className="text-red-500 mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-white mb-3">Sistem Gagal Menarik Data</h2>
          <p className="text-slate-300">{errorMessage}</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Quick Jump Sidebar / Topbar */}
          <div className="w-full lg:w-16 shrink-0 lg:sticky lg:top-28 z-30">
            <div className="flex flex-row lg:flex-col flex-wrap justify-center gap-1.5 bg-slate-900/80 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-xl max-h-[300px] lg:max-h-[70vh] overflow-y-auto custom-scrollbar">
              {alphabetData.map((group) => (
                <button
                  key={group.startWith}
                  onClick={() => scrollToLetter(group.startWith)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold text-slate-400 hover:text-white hover:bg-gradient-to-tr hover:from-purple-500 hover:to-cyan-500 transition-all border border-transparent hover:border-white/20 shadow-sm"
                >
                  {group.startWith}
                </button>
              ))}
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 w-full space-y-12">
            {alphabetData.map((group) => (
              <div key={group.startWith} id={`letter-${group.startWith}`} className="scroll-mt-28">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                    <span className="text-2xl font-black text-white">
                      {group.startWith}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {group.animeList.map((anime) => (
                    <Link 
                      key={anime.animeId} 
                      to={`/anime/${anime.animeId}`}
                      className="group flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/30 rounded-xl transition-all duration-300 backdrop-blur-sm"
                    >
                      <span className="text-sm font-medium text-slate-300 group-hover:text-white line-clamp-1 pr-2 transition-colors">
                        {anime.title}
                      </span>
                      <ChevronRight size={16} className="text-slate-500 group-hover:text-purple-400 shrink-0 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(168,85,247,0.5); }
      `}</style>
    </div>
  );
}
          

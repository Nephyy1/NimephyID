import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, ChevronRight, AlertTriangle } from 'lucide-react';

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        // PERHATIKAN BARIS INI: Huruf 's' dihilangkan menjadi /anime/genre
        const response = await fetch('https://www.sankavollerei.com/anime/genre');
        
        if (!response.ok) {
          throw new Error(`Gagal akses API (Status: ${response.status} ${response.statusText})`);
        }

        const result = await response.json();
        
        if (result.status === 'success' && result.data && result.data.genreList) {
          setGenres(result.data.genreList);
        } else {
          throw new Error("Data berhasil ditarik, tapi struktur JSON tidak sesuai (genreList tidak ditemukan).");
        }
      } catch (error) {
        console.error("Error Detail:", error);
        setErrorMessage(error.message);
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
          <LayoutGrid className="text-orange-400" size={36} />
          Eksplorasi Genre
        </h1>
        <p className="text-slate-400">
          Temukan tontonan anime favoritmu berdasarkan kategori dan genre yang tersedia.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 text-orange-400 gap-4">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="font-semibold tracking-wide animate-pulse">Menghubungkan ke Database...</p>
        </div>
      ) : errorMessage ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-red-950/20 border border-red-500/30 rounded-3xl backdrop-blur-md p-6">
          <AlertTriangle size={64} className="text-red-500 mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-white mb-3">Sistem Gagal Menarik Data</h2>
          <p className="text-slate-300 max-w-md mx-auto mb-4">
            Ini adalah pesan error dari server API Anda:
          </p>
          <div className="bg-black/50 p-4 rounded-xl border border-red-500/20 text-red-400 font-mono text-sm break-words w-full max-w-lg">
            {errorMessage}
          </div>
        </div>
      ) : genres.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
          <AlertTriangle size={64} className="text-orange-500 mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-white mb-2">Daftar Genre Kosong</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            API berhasil dihubungi, tetapi tidak ada satupun genre yang dikirimkan oleh server.
          </p>
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
                className="group flex items-center justify-between p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-amber-500/20 hover:border-orange-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]"
              >
                <span className="font-bold text-slate-200 group-hover:text-white transition-colors truncate pr-2">
                  {genre.title}
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-900/50 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:border-orange-400 transition-all duration-300">
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

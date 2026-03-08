import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, AlertTriangle } from 'lucide-react';

export default function DramaWatch() {
  const { bookId, episodeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mengambil judul dari halaman sebelumnya (karena Detail API mati)
  const dramaTitle = location.state?.title || "Drama Box Series";

  const [streamData, setStreamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchStream = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await fetch(`https://www.sankavollerei.com/anime/dramabox/stream?bookId=${bookId}&episode=${episodeId}`);
        const result = await response.json();
        
        if (result.status === 'success' && result.data && result.data.chapter) {
          setStreamData(result.data);
        } else {
          throw new Error("Gagal mengambil tautan video atau episode tidak tersedia.");
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStream();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [bookId, episodeId]);

  // Membuat daftar episode (dari 1 sampai allEps)
  const totalEps = streamData?.allEps || parseInt(episodeId);
  const epsArray = Array.from({ length: totalEps }, (_, i) => i + 1);

  return (
    <div className="pb-24 pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link 
        to="/drama" 
        className="inline-flex items-center gap-2 text-slate-400 hover:text-fuchsia-400 transition-colors mb-6 font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
      >
        <ArrowLeft size={18} /> Kembali ke Daftar Drama
      </Link>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        
        {/* Player Video Vertikal */}
        <div className="w-full lg:w-[400px] shrink-0 mx-auto">
          <div className="bg-slate-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-fuchsia-900/20 relative">
            <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10 backdrop-blur-sm">
              <div>
                <h1 className="text-white font-bold line-clamp-1">{dramaTitle}</h1>
                <p className="text-xs text-fuchsia-400 mt-0.5">Episode {episodeId}</p>
              </div>
            </div>

            {/* Container Video Ratio 9:16 (Vertikal) */}
            <div className="aspect-[9/16] w-full bg-black relative flex items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-4 border-fuchsia-500/30 border-t-fuchsia-500 rounded-full animate-spin"></div>
                  <p className="text-fuchsia-400 text-sm font-semibold animate-pulse">Memuat Video...</p>
                </div>
              ) : errorMessage ? (
                <div className="flex flex-col items-center text-center p-6">
                  <AlertTriangle size={48} className="text-red-500 mb-3 opacity-80" />
                  <p className="text-slate-400 text-sm">{errorMessage}</p>
                </div>
              ) : streamData?.chapter?.video?.mp4 ? (
                <video 
                  key={streamData.chapter.video.mp4} // Key penting agar video reload saat pindah eps
                  controls 
                  autoPlay 
                  poster={streamData.chapter.cover}
                  className="w-full h-full object-contain"
                >
                  <source src={streamData.chapter.video.mp4} type="video/mp4" />
                  Browser Anda tidak mendukung tag video ini.
                </video>
              ) : (
                <p className="text-slate-500">Video tidak ditemukan.</p>
              )}
            </div>
          </div>
        </div>

        {/* Daftar Episode */}
        <div className="flex-1 w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 shadow-xl lg:sticky lg:top-28">
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Play className="text-fuchsia-400" size={20} fill="currentColor" /> 
              Pilih Episode
            </h3>
            <span className="text-sm font-semibold bg-white/10 text-slate-300 px-3 py-1 rounded-lg">
              Total: {totalEps} Eps
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-6 xl:grid-cols-8 gap-2.5 max-h-[50vh] lg:max-h-[600px] overflow-y-auto custom-scrollbar pr-2 pb-2">
            {epsArray.map((eps) => {
              const isCurrent = eps === parseInt(episodeId);
              return (
                <button
                  key={eps}
                  onClick={() => navigate(`/drama/${bookId}/${eps}`, { state: { title: dramaTitle } })}
                  className={`aspect-square flex items-center justify-center rounded-xl font-bold text-sm transition-all shadow-sm ${
                    isCurrent 
                      ? 'bg-gradient-to-tr from-fuchsia-500 to-rose-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.4)] transform scale-105 border border-fuchsia-400' 
                      : 'bg-slate-900 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white hover:border-fuchsia-500/50'
                  }`}
                >
                  {eps}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(217,70,239,0.5); }
      `}</style>
    </div>
  );
}

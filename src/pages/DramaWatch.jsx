import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Clapperboard, Layers, Info, Settings } from 'lucide-react';

export default function DramaWatch() {
  const { slug, index } = useParams();
  const navigate = useNavigate();

  const [detailData, setDetailData] = useState(null);
  const [streamData, setStreamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [quality, setQuality] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const detailResponse = await fetch(`https://www.sankavollerei.com/anime/drachin/detail/${slug}`);
        if (!detailResponse.ok) throw new Error("Gagal mengambil detail drama.");
        const detailResult = await detailResponse.json();
        
        if (detailResult.status === 'success' && detailResult.data) {
          setDetailData(detailResult.data);
        } else {
          throw new Error("Data detail tidak ditemukan.");
        }

        const streamResponse = await fetch(`https://www.sankavollerei.com/anime/drachin/episode/${slug}?index=${index}`);
        const streamResult = await streamResponse.json();

        if (streamResult.status === 'success' && streamResult.data) {
          setStreamData(streamResult.data);
          if (streamResult.data.videos) {
            const availableQualities = Object.keys(streamResult.data.videos);
            if (availableQualities.length > 0) {
              if (availableQualities.includes("720p")) setQuality("720p");
              else if (availableQualities.includes("1080p")) setQuality("1080p");
              else setQuality(availableQualities[0]);
            }
          }
        } else {
          throw new Error("Episode tidak tersedia.");
        }

      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug, index]);

  const currentVideoUrl = streamData && quality ? streamData.videos[quality] : null;

  return (
    <div className="pb-24 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 min-h-screen">
      <div className="absolute top-40 left-10 w-72 h-72 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Link 
          to="/drama" 
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-8 font-medium bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-md shadow-lg"
        >
          <ArrowLeft size={18} /> Kembali ke Pustaka Drama
        </Link>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-[420px] shrink-0 mx-auto">
            <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
              <div className="p-5 bg-gradient-to-b from-white/10 to-transparent border-b border-white/5">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-fuchsia-500/20 flex items-center justify-center border border-fuchsia-500/30 shrink-0">
                    <Clapperboard size={14} className="text-fuchsia-400" />
                  </div>
                  <h1 className="text-white font-bold line-clamp-1 text-lg">
                    {detailData ? detailData.title.replace(/ EP \d+/g, '') : "Memuat Drama..."}
                  </h1>
                </div>
                <p className="text-sm font-medium text-fuchsia-400 ml-11">Episode {index}</p>
              </div>

              <div className="aspect-[9/16] w-full bg-black/80 relative flex items-center justify-center overflow-hidden">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center gap-4 z-10">
                    <div className="w-12 h-12 border-4 border-fuchsia-500/30 border-t-fuchsia-500 rounded-full animate-spin"></div>
                  </div>
                ) : errorMessage ? (
                  <div className="flex flex-col items-center text-center p-8 bg-slate-900/80 backdrop-blur-md w-full h-full justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4 border border-red-500/30">
                      <AlertTriangle size={32} className="text-red-500" />
                    </div>
                    <p className="text-slate-400 text-sm">{errorMessage}</p>
                  </div>
                ) : currentVideoUrl ? (
                  <video 
                    key={currentVideoUrl} 
                    controls 
                    autoPlay 
                    playsInline
                    poster={streamData?.poster}
                    className="w-full h-full object-contain"
                  >
                    <source src={currentVideoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <div className="text-center p-6">
                    <AlertTriangle size={40} className="text-slate-600 mx-auto mb-3" />
                  </div>
                )}
              </div>

              {streamData && streamData.videos && Object.keys(streamData.videos).length > 0 && (
                <div className="p-4 bg-slate-950/80 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                    <Settings size={16} /> Resolusi
                  </div>
                  <div className="flex items-center gap-2">
                    {Object.keys(streamData.videos).map(q => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                          quality === q 
                            ? 'bg-fuchsia-500 text-white shadow-[0_0_10px_rgba(217,70,239,0.4)]' 
                            : 'bg-white/10 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col gap-6">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-5">
                <div>
                  <h3 className="text-2xl font-black text-white flex items-center gap-3">
                    <Layers className="text-fuchsia-400" size={28} /> 
                    Daftar Episode
                  </h3>
                </div>
                <span className="text-xs font-black tracking-widest uppercase bg-white/10 border border-white/10 text-slate-300 px-4 py-2 rounded-xl shadow-inner">
                  Total: {detailData?.total_episodes || '-'} Eps
                </span>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-6 xl:grid-cols-8 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-3 pb-4">
                {detailData?.episodes?.map((eps) => {
                  const isCurrent = eps.index === index;
                  return (
                    <button
                      key={eps.index}
                      onClick={() => navigate(`/drama/${slug}/${eps.index}`)}
                      className={`relative aspect-square flex items-center justify-center rounded-2xl font-black text-sm md:text-base transition-all duration-300 ${
                        isCurrent 
                          ? 'bg-gradient-to-tr from-fuchsia-500 to-rose-500 text-white shadow-[0_0_20px_rgba(217,70,239,0.5)] transform scale-110 border border-fuchsia-300/50 z-10' 
                          : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white hover:border-fuchsia-500/50 hover:shadow-[0_0_15px_rgba(217,70,239,0.2)]'
                      }`}
                    >
                      {eps.index}
                    </button>
                  );
                })}
              </div>
            </div>

            {detailData?.synopsis && (
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                  <Info className="text-fuchsia-400" size={24} /> 
                  Sinopsis
                </h3>
                <div className="flex flex-wrap gap-2 mb-5">
                  {detailData.tags?.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 text-slate-300 text-xs font-semibold rounded-lg border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {detailData.synopsis}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { 
          width: 8px; 
        }
        .custom-scrollbar::-webkit-scrollbar-track { 
          background: rgba(255, 255, 255, 0.02); 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: rgba(255, 255, 255, 0.1); 
          border-radius: 10px; 
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: rgba(217, 70, 239, 0.4); 
        }
      `}</style>
    </div>
  );
}

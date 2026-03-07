import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Download, ChevronLeft, ChevronRight, ListVideo, MonitorPlay, Server, ArrowLeft } from 'lucide-react';

export default function Watch() {
  const { episodeId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('streaming');
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    const fetchEpisodeData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://www.sankavollerei.com/anime/episode/${episodeId}`);
        const result = await response.json();
        
        if (result.status === 'success') {
          setData(result.data);
          setIframeUrl(result.data.defaultStreamingUrl);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisodeData();
    window.scrollTo(0, 0);
  }, [episodeId]);

  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center text-cyan-400 gap-4">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="font-semibold tracking-wide animate-pulse">Memuat Nexus Player...</p>
      </div>
    );
  }

  if (!data) return <div className="text-center text-white mt-20">Episode tidak ditemukan.</div>;

  return (
    <div className="pb-24 pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link 
        to={`/anime/${data.animeId}`} 
        className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-6 font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
      >
        <ArrowLeft size={18} /> Kembali ke Detail Anime
      </Link>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-1">
          <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-900/20">
            <div className="aspect-video w-full bg-black relative">
              {iframeUrl ? (
                <iframe 
                  src={iframeUrl} 
                  title="Video Player" 
                  className="w-full h-full absolute top-0 left-0" 
                  allowFullScreen 
                  frameBorder="0"
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                  <MonitorPlay size={48} className="opacity-50" />
                </div>
              )}
            </div>

            <div className="p-4 md:p-6 bg-white/5 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white mb-1 line-clamp-2">
                  {data.title}
                </h1>
                <p className="text-sm text-cyan-400">{data.releaseTime}</p>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                {data.hasPrevEpisode ? (
                  <button 
                    onClick={() => navigate(`/episode/${data.prevEpisode.episodeId}`)}
                    className="flex items-center justify-center p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all shadow-lg hover:shadow-cyan-500/20"
                  >
                    <ChevronLeft size={20} />
                  </button>
                ) : (
                  <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-slate-600 cursor-not-allowed">
                    <ChevronLeft size={20} />
                  </div>
                )}
                
                {data.hasNextEpisode ? (
                  <button 
                    onClick={() => navigate(`/episode/${data.nextEpisode.episodeId}`)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 border border-transparent rounded-xl text-white font-bold transition-all shadow-lg shadow-cyan-500/25 transform hover:scale-105"
                  >
                    Next <ChevronRight size={20} />
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/5 rounded-xl text-slate-600 cursor-not-allowed font-bold">
                    Next <ChevronRight size={20} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 shadow-xl">
            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
              <button 
                onClick={() => setActiveTab('streaming')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'streaming' 
                    ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Server size={18} /> Server Streaming
              </button>
              <button 
                onClick={() => setActiveTab('download')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'download' 
                    ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Download size={18} /> Link Download
              </button>
            </div>

            {activeTab === 'streaming' && (
              <div className="space-y-6">
                {data.server?.qualities?.map((quality, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-white font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                      Resolusi {quality.title}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {quality.serverList?.length > 0 ? (
                        quality.serverList.map((srv, srvIdx) => (
                          <button 
                            key={srvIdx}
                            className="px-4 py-2 text-sm bg-slate-900 border border-white/10 hover:border-cyan-500/50 hover:bg-white/5 rounded-lg text-slate-300 hover:text-white transition-colors capitalize shadow-inner"
                          >
                            {srv.title}
                          </button>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500 italic">Server tidak tersedia</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'download' && (
              <div className="space-y-6">
                {data.downloadUrl?.qualities?.map((quality, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                        {quality.title}
                      </h3>
                      <span className="text-xs font-semibold text-slate-400 bg-black/30 px-2 py-1 rounded-md border border-white/5">
                        {quality.size}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {quality.urls?.map((urlItem, urlIdx) => (
                        <a 
                          key={urlIdx}
                          href={urlItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 text-sm bg-slate-900 border border-white/10 hover:border-purple-500/50 hover:bg-white/5 rounded-lg text-slate-300 hover:text-white transition-colors shadow-inner"
                        >
                          <Download size={14} className="text-purple-400" />
                          {urlItem.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl sticky top-28">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <ListVideo className="text-cyan-400" size={20} /> Daftar Episode
            </h3>
            
            <div className="max-h-[500px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {data.info?.episodeList?.map((eps) => {
                const isCurrent = eps.episodeId === episodeId;
                return (
                  <Link 
                    key={eps.episodeId}
                    to={`/episode/${eps.episodeId}`}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all border ${
                      isCurrent 
                        ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-cyan-500/30 shadow-lg' 
                        : 'bg-slate-900/50 border-transparent hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isCurrent ? (
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                          <Play size={14} className="text-cyan-400 ml-0.5" fill="currentColor" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center shrink-0 border border-white/5">
                          <span className="text-xs font-bold text-slate-500">{eps.eps}</span>
                        </div>
                      )}
                      <span className={`text-sm font-semibold line-clamp-1 ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                        {eps.title}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
      `}</style>
    </div>
  );
}       

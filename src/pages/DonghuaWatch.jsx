import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, Download, ChevronLeft, ChevronRight, ListVideo, MonitorPlay, Server, ArrowLeft } from 'lucide-react';

export default function DonghuaWatch() {
  const { episodeSlug } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('streaming');
  const [iframeUrl, setIframeUrl] = useState('');
  const [activeServer, setActiveServer] = useState('');

  useEffect(() => {
    const fetchEpisode = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://www.sankavollerei.com/anime/donghua/episode/${episodeSlug}`);
        const result = await response.json();
        
        if (result.status === 'success' && result.streaming) {
          setData(result);
          if (result.streaming.main_url) {
            setIframeUrl(result.streaming.main_url.url);
            setActiveServer(result.streaming.main_url.name);
          }
        }
      } catch (error) {
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisode();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [episodeSlug]);

  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center text-emerald-400 gap-4">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) return <div className="text-center text-white mt-20 font-bold text-xl">Episode tidak tersedia.</div>;

  return (
    <div className="pb-24 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
      <Link 
        to={`/donghua/detail/${data.navigation?.all_episodes?.slug}`} 
        className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-6 font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
      >
        <ArrowLeft size={18} /> Kembali ke Detail Donghua
      </Link>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-1">
          <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/20">
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
                <h1 className="text-lg md:text-xl font-bold text-white mb-1 line-clamp-2">
                  {data.episode}
                </h1>
                <p className="text-sm text-emerald-400">{data.donghua_details?.title}</p>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                {data.navigation?.previous_episode ? (
                  <button 
                    onClick={() => navigate(`/donghua/episode/${data.navigation.previous_episode.slug}`)}
                    className="flex items-center justify-center p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all shadow-lg hover:shadow-emerald-500/20"
                  >
                    <ChevronLeft size={20} />
                  </button>
                ) : (
                  <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-slate-600 cursor-not-allowed">
                    <ChevronLeft size={20} />
                  </div>
                )}
                
                {data.navigation?.next_episode ? (
                  <button 
                    onClick={() => navigate(`/donghua/episode/${data.navigation.next_episode.slug}`)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 border border-transparent rounded-xl text-white font-bold transition-all shadow-lg shadow-emerald-500/25 transform hover:scale-105"
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
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Server size={18} /> Server Streaming
              </button>
              <button 
                onClick={() => setActiveTab('download')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'download' 
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Download size={18} /> Link Download
              </button>
            </div>

            {activeTab === 'streaming' && (
              <div className="flex flex-wrap gap-3">
                {data.streaming?.servers?.map((srv, idx) => {
                  const isActive = activeServer === srv.name;
                  return (
                    <button 
                      key={idx}
                      onClick={() => {
                        setIframeUrl(srv.url);
                        setActiveServer(srv.name);
                      }}
                      className={`px-4 py-2 text-sm border rounded-lg transition-all shadow-inner ${
                        isActive
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                          : 'bg-slate-900 border-white/10 hover:border-emerald-500/50 hover:bg-white/5 text-slate-300 hover:text-white'
                      }`}
                    >
                      {srv.name}
                    </button>
                  );
                })}
              </div>
            )}

            {activeTab === 'download' && data.download_url && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(data.download_url).map(([qualityKey, links]) => {
                  const qTitle = qualityKey.replace('download_url_', '').toUpperCase();
                  return (
                    <div key={qualityKey} className="bg-slate-900/50 border border-white/5 rounded-xl p-4">
                      <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Resolusi {qTitle}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(links).map(([host, url]) => (
                          <a 
                            key={host} 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/50 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            {host}
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl lg:sticky lg:top-28">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <ListVideo className="text-emerald-400" size={20} /> Daftar Episode
            </h3>
            
            <div className="max-h-[500px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {data.episodes_list?.map((eps, i) => {
                const isCurrent = eps.slug === episodeSlug;
                return (
                  <Link 
                    key={i}
                    to={`/donghua/episode/${eps.slug}`}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all border ${
                      isCurrent 
                        ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30 shadow-lg' 
                        : 'bg-slate-900/50 border-transparent hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isCurrent ? (
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                          <Play size={14} className="text-emerald-400 ml-0.5" fill="currentColor" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center shrink-0 border border-white/5">
                          <Play size={12} className="text-slate-500 ml-0.5" />
                        </div>
                      )}
                      <span className={`text-sm font-semibold line-clamp-1 ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                        {eps.episode.split(' ').slice(0, 4).join(' ')}
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
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16, 185, 129, 0.5); }
      `}</style>
    </div>
  );
}
                    

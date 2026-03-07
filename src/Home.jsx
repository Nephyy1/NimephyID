import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, User, Play, Plus, Menu, X, Star } from 'lucide-react';

const mockTrending = [
  { id: 1, title: "Demon Slayer", rating: "4.9", img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=400&h=600" },
  { id: 2, title: "Jujutsu Kaisen", rating: "4.8", img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=400&h=600" },
  { id: 3, title: "Attack on Titan", rating: "5.0", img: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=400&h=600" },
  { id: 4, title: "Cyberpunk: Edgerunners", rating: "4.7", img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=400&h=600" },
  { id: 5, title: "Solo Leveling", rating: "4.9", img: "https://images.unsplash.com/photo-1614583224978-f05ce51ef5fa?auto=format&fit=crop&q=80&w=400&h=600" },
];

const mockContinueWatching = [
  { id: 1, title: "One Piece", episode: "Ep 1089", progress: 75, img: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?auto=format&fit=crop&q=80&w=600&h=300" },
  { id: 2, title: "Bleach: TYBW", episode: "Ep 21", progress: 30, img: "https://images.unsplash.com/photo-1541562232579-512a21360020?auto=format&fit=crop&q=80&w=600&h=300" },
  { id: 3, title: "Spy x Family", episode: "Ep 34", progress: 90, img: "https://images.unsplash.com/photo-1580477659154-08102280d9ee?auto=format&fit=crop&q=80&w=600&h=300" },
];

export default function AnimeHomepage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30">
      
      {/* Navbar: Sticky Glass */}
      <nav className="sticky top-0 z-50 w-full bg-slate-950/40 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent cursor-pointer">
                NEXUS<span className="text-white">ANIME</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'Trending', 'Schedule', 'Genres'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 hover:shadow-cyan-500/50">
                  {item}
                </a>
              ))}
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Search size={20} />
              </button>
              <button className="text-slate-400 hover:text-purple-400 transition-colors">
                <Bell size={20} />
              </button>
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[2px] cursor-pointer">
                <div className="h-full w-full bg-slate-900 rounded-full flex items-center justify-center">
                  <User size={16} className="text-slate-300" />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cinematic Hero Section */}
      <section className="relative h-[75vh] md:h-[85vh] w-full flex items-end pb-20 md:pb-32 justify-center">
        {/* Hero Background */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Anime Background" 
            className="w-full h-full object-cover object-top opacity-60"
          />
          {/* Deep Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        >
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-full backdrop-blur-md">
              NEW EPISODE OUT NOW
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
              CYBER <br /> FRONTIER
            </h1>
            <p className="text-slate-300 text-lg md:text-xl mb-8 max-w-2xl line-clamp-3 drop-shadow-md">
              In a dystopian future where humanity is strictly monitored by AI overlords, a rogue hacker discovers a hidden network that could free them all. The revolution begins in the shadows.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-purple-500/25 transition-all transform hover:scale-105 active:scale-95">
                <Play fill="currentColor" size={20} />
                Watch Now
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white px-8 py-3.5 rounded-xl font-medium shadow-xl transition-all">
                <Plus size={20} />
                Add to List
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 relative z-20">
        
        {/* Continue Watching (Glass Cards) */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            Continue Watching
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockContinueWatching.map((anime) => (
              <div 
                key={anime.id} 
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:bg-white/10 transition-colors duration-300 cursor-pointer"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={anime.img} alt={anime.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                      <Play fill="white" size={24} />
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-800/80">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-500" 
                      style={{ width: `${anime.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold truncate">{anime.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{anime.episode}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Now (Bento Grid) */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {mockTrending.map((anime) => (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                key={anime.id} 
                className="group relative rounded-2xl overflow-hidden bg-slate-900 shadow-xl shadow-slate-950/50 cursor-pointer border border-transparent hover:border-white/20 transition-all duration-300"
              >
                {/* Rating Glass Pill */}
                <div className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                  <Star size={12} className="text-yellow-400" fill="currentColor" />
                  <span className="text-xs font-bold text-white">{anime.rating}</span>
                </div>
                
                {/* Poster Image */}
                <div className="aspect-[2/3] relative w-full overflow-hidden">
                  <img src={anime.img} alt={anime.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Bottom Text Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold leading-tight line-clamp-2">{anime.title}</h3>
                  <div className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mt-2 group-hover:w-1/2 transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
                                                              }
                

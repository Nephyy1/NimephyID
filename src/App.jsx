import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import Home from './Home';
import Detail from './pages/Detail';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Jadwal', path: '/jadwal' },
    { name: 'Trending', path: '/trending' }
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-950/70 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-slate-900/50 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0 z-50">
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              NEXUS<span className="text-white">ANIME</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-8 absolute left-1/2 transform -translate-x-1/2 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-semibold transition-all duration-300 px-3 py-1.5 rounded-md ${
                  location.pathname === item.path
                    ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Cari anime..."
                className="bg-white/5 backdrop-blur-md border border-white/10 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-slate-500 transition-all w-48 lg:w-56 focus:w-64 lg:focus:w-72 shadow-inner"
              />
            </div>

            <button className="relative text-slate-400 hover:text-purple-400 transition-colors p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 backdrop-blur-sm">
              <Bell size={18} strokeWidth={2.5} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.8)]"></span>
            </button>

            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[2px] cursor-pointer shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform">
              <div className="h-full w-full bg-slate-900 rounded-full flex items-center justify-center">
                <User size={18} className="text-slate-200" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center z-50">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-slate-300 p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden fixed inset-0 bg-slate-950/95 backdrop-blur-2xl transition-all duration-300 ease-in-out z-40 flex flex-col pt-24 px-6 ${
        isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
      }`}>
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Cari anime..."
            className="w-full bg-white/5 backdrop-blur-xl border border-white/10 text-base rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-slate-500 shadow-inner"
          />
        </div>

        <div className="flex flex-col space-y-2 border-b border-white/10 pb-8 mb-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg font-semibold px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[2px]">
              <div className="h-full w-full bg-slate-900 rounded-full flex items-center justify-center">
                <User size={20} className="text-slate-200" />
              </div>
            </div>
            <div>
              <p className="text-white font-semibold">Guest User</p>
              <p className="text-xs text-cyan-400">Login untuk sinkronisasi</p>
            </div>
          </div>
          <button className="relative p-3 bg-white/5 rounded-xl border border-white/10 text-slate-300">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-cyan-500 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.8)]"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/:slug" element={<Detail />} />
          <Route path="/jadwal" element={<div className="p-20 text-center text-xl text-slate-500">Halaman Jadwal Sedang Dikembangkan</div>} />
          <Route path="/trending" element={<div className="p-20 text-center text-xl text-slate-500">Halaman Trending Sedang Dikembangkan</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

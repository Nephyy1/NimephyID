import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, X, MonitorPlay, Clapperboard, CalendarDays, TrendingUp } from 'lucide-react';
import Home from './Home';
import Detail from './pages/Detail';
import Drama from './pages/Drama';

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <MonitorPlay size={18} /> },
    { name: 'Drama', path: '/drama', icon: <Clapperboard size={18} /> },
    { name: 'Jadwal', path: '/jadwal', icon: <CalendarDays size={18} /> },
    { name: 'Trending', path: '/trending', icon: <TrendingUp size={18} /> }
  ];

  return (
    <>
      <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled || isMobileMenuOpen
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-slate-900/50 py-3' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex-shrink-0 flex flex-col z-50" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="text-2xl md:text-3xl font-black tracking-tighter bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent leading-none drop-shadow-sm">
                NIMEPHY<span className="text-white">ID</span>
              </span>
              <span className="text-[9px] md:text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">
                Premium Entertainment
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1 lg:space-x-4 absolute left-1/2 transform -translate-x-1/2 bg-white/5 backdrop-blur-lg border border-white/10 px-4 py-2 rounded-full shadow-xl">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                const isDrama = item.name === 'Drama';
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-full flex items-center gap-2 ${
                      isActive
                        ? isDrama 
                          ? 'bg-gradient-to-r from-fuchsia-500/20 to-rose-500/20 text-fuchsia-400 border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.15)]'
                          : 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                        : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 z-50">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={16} className="text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Cari tontonan..."
                  className="bg-slate-900/50 backdrop-blur-md border border-white/10 text-sm rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-slate-500 transition-all w-48 lg:w-60 focus:w-64 lg:focus:w-80 shadow-inner"
                />
              </div>

              <button className="relative text-slate-300 hover:text-cyan-400 transition-colors p-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 backdrop-blur-sm shadow-lg">
                <Bell size={18} strokeWidth={2.5} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
              </button>

              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[2px] cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-105 transition-transform">
                <div className="h-full w-full bg-slate-950 rounded-full flex items-center justify-center">
                  <User size={18} className="text-slate-200" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            <div className="md:hidden flex items-center z-50">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="text-slate-200 p-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg active:scale-95 transition-transform"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`md:hidden fixed top-0 left-0 w-full h-screen bg-slate-950/98 backdrop-blur-3xl transition-all duration-400 ease-in-out z-40 flex flex-col pt-28 px-6 pb-8 overflow-y-auto ${
        isMobileMenuOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-8'
      }`}>
        <div className="relative mb-8 mt-2">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Cari anime atau drama..."
            className="w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 text-base rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-slate-400 shadow-inner"
          />
        </div>

        <div className="flex flex-col space-y-3 flex-1">
          <p className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-2 px-2">Menu Utama</p>
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            const isDrama = item.name === 'Drama';

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 text-lg font-semibold px-5 py-4 rounded-2xl transition-all ${
                  isActive
                    ? isDrama
                      ? 'bg-gradient-to-r from-fuchsia-500/20 to-rose-500/10 text-fuchsia-400 border border-fuchsia-500/30 shadow-[0_4px_20px_rgba(217,70,239,0.1)]'
                      : 'bg-gradient-to-r from-purple-500/20 to-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_4px_20px_rgba(34,211,238,0.1)]'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 flex items-center justify-between px-2 pb-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[2px] shadow-lg shadow-cyan-500/20">
              <div className="h-full w-full bg-slate-900 rounded-full flex items-center justify-center">
                <User size={20} className="text-slate-200" />
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Guest User</p>
              <p className="text-xs text-cyan-400 mt-0.5">Login untuk sinkronisasi</p>
            </div>
          </div>
          <button className="relative p-3.5 bg-white/5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/10 transition-colors shadow-lg">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
          </button>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30 flex flex-col">
        <Navbar />
        <div className="flex-1 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:slug" element={<Detail />} />
            <Route path="/drama" element={<Drama />} />
            <Route path="/jadwal" element={<div className="p-20 text-center text-xl text-slate-500">Halaman Jadwal Sedang Dikembangkan</div>} />
            <Route path="/trending" element={<div className="p-20 text-center text-xl text-slate-500">Halaman Trending Sedang Dikembangkan</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
                  }
              

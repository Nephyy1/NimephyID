import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import Home from './Home';
import Detail from './pages/Detail';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Jadwal', path: '/jadwal' },
    { name: 'Trending', path: '/trending' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950/60 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex-shrink-0">
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              NEXUS<span className="text-white">ANIME</span>
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-semibold transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Search size={20} strokeWidth={2.5} />
            </button>
            <button className="text-slate-400 hover:text-purple-400 transition-colors">
              <Bell size={20} strokeWidth={2.5} />
            </button>
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[2px] cursor-pointer shadow-lg shadow-cyan-500/20">
              <div className="h-full w-full bg-slate-900 rounded-full flex items-center justify-center">
                <User size={16} className="text-slate-200" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/10 px-4 py-6 space-y-4">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-300 hover:text-cyan-400"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
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

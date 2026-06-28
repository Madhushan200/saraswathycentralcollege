import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Academics", path: "/academics" },
    { name: "Achievements", path: "/achievements" },
    { name: "Event & News", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Clubs & Societies", path: "/clubs" },
    { name: "Student Life", path: "/student-life" },
    { name: "Contact Us", path: "/contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change asynchronously to avoid render cascade
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);


  return (
    <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300 font-sans">
      {/* Top Banner */}
      <div className={`bg-school-navy-dark border-b border-school-gold/15 text-slate-300 py-2.5 px-6 hidden md:block transition-all duration-300 ${
        isScrolled ? 'h-0 py-0 overflow-hidden border-b-0' : ''
      }`}>
        <div className="w-full flex justify-between items-center text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-school-gold" />
              +94 21 222 1234
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-school-gold" />
              info@saraswathycc.edu.lk
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-school-gold font-bold text-sm tracking-wider font-semibold">
              மகுடம்: உழை உயர் (உழைத்து உயர்வோம்)
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 px-6 ${
        isScrolled 
          ? 'bg-school-navy/95 shadow-xl backdrop-blur-md border-b border-school-gold/20 py-2.5' 
          : 'bg-school-navy/90 backdrop-blur-sm md:bg-school-navy/80 py-4'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full relative">
          {/* Left Navigation (Desktop Only) */}
          <div className="hidden xl:flex items-center justify-end gap-1.5 xl:gap-3 flex-1 pr-6">
            {navLinks.slice(0, 5).map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`px-2.5 xl:px-3.5 py-2 text-[10px] xl:text-xs font-bold tracking-wide uppercase transition-all duration-200 rounded-md relative whitespace-nowrap ${
                    isActive 
                      ? 'text-school-gold' 
                      : 'text-slate-100 hover:text-school-gold hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 xl:left-3.5 xl:right-3.5 h-0.5 bg-school-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Center Logo Only (Desktop & Mobile) */}
          <div className="flex justify-center items-center flex-shrink-0 xl:px-6 w-full xl:w-auto">
            <Link to="/" className="group flex justify-center">
              <img 
                src="https://image.winudf.com/v2/image1/Y29tLm1heHdlbGwuc2FyYXN3YXRoeWNlbnRyYWxjb2xsZWdlX2ljb25fMTU4MzA4NjI0M18wNjI/icon.png?w=184&fakeurl=1" 
                alt="Saraswathy Central College Logo" 
                className={`object-contain rounded-2xl bg-white p-1 shadow-md border-2 border-white/90 group-hover:scale-105 transition-all duration-300 ${
                  isScrolled ? 'w-12 h-12 md:w-14 h-14' : 'w-16 h-16 md:w-20 h-20'
                }`}
              />
            </Link>
          </div>

          {/* Right Navigation (Desktop Only) */}
          <div className="hidden xl:flex items-center justify-start gap-1.5 xl:gap-3 flex-1 pl-6">
            {navLinks.slice(5).map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`px-2.5 xl:px-3.5 py-2 text-[10px] xl:text-xs font-bold tracking-wide uppercase transition-all duration-200 rounded-md relative whitespace-nowrap ${
                    isActive 
                      ? 'text-school-gold' 
                      : 'text-slate-100 hover:text-school-gold hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 xl:left-3.5 xl:right-3.5 h-0.5 bg-school-gold rounded-full" />
                  )}
                </Link>
              );
            })}


          </div>

          {/* Mobile Hamburger on the right */}
          <div className="flex xl:hidden items-center gap-3 absolute right-0 top-1/2 -translate-y-1/2">
            <span className="text-school-gold text-xs font-bold tracking-wider font-semibold border border-school-gold/30 px-2 py-0.5 rounded hidden sm:inline-block">
              உழை உயர்
            </span>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-school-gold p-1 transition-colors outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`fixed inset-0 top-0 xl:hidden bg-school-navy-dark/98 z-30 transition-all duration-500 overflow-y-auto px-6 pt-28 pb-8 flex flex-col ${
        isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
      }`}>
        <div className="flex flex-col gap-4 text-center mt-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`py-2.5 text-base font-bold tracking-wider uppercase border-b border-white/5 transition-all duration-200 ${
                  isActive 
                    ? 'text-school-gold text-shadow-gold' 
                    : 'text-slate-200 hover:text-school-gold'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Info footer for Mobile menu */}
        <div className="mt-auto pt-10 text-center border-t border-white/5 space-y-4">
          <p className="text-school-gold font-bold text-sm tracking-wider font-semibold">
            மகுடம்: உழை உயர்
          </p>
          <div className="flex flex-col items-center gap-2 text-slate-400 text-xs">
            <span>info@saraswathycc.edu.lk</span>
            <span>+94 21 222 1234</span>
            <span className="text-[10px] text-slate-500 mt-2">Badulla, Sri Lanka</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

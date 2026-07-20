import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowUp } from 'lucide-react';

const FacebookSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const YoutubeSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const LinkedinSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: "About", path: "/about" },
    { name: "Academics", path: "/academics" },
    { name: "Achievements", path: "/achievements" },
    { name: "Contact Us", path: "/contact" }
  ];

  const secondaryLinks = [
    { name: "Event & News", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Clubs & Societies", path: "/clubs" },
    { name: "Student Life", path: "/student-life" }
  ];

  return (
    <footer className="bg-school-navy-dark text-slate-300 pt-16 pb-8 border-t-2 border-school-gold/20 font-sans relative">
      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-school-gold text-school-navy p-3.5 rounded-full hover:bg-school-gold-dark shadow-xl hover:scale-110 transition-all cursor-pointer border-2 border-white/10"
      >
        <ArrowUp className="w-5 h-5 font-bold" />
      </button>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* School Branding */}
        <div className="space-y-6 flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="flex flex-col items-center lg:items-start gap-2.5">
            <img 
              src="https://image.winudf.com/v2/image1/Y29tLm1heHdlbGwuc2FyYXN3YXRoeWNlbnRyYWxjb2xsZWdlX2ljb25fMTU4MzA4NjI0M18wNjI/icon.png?w=184&fakeurl=1" 
              alt="Saraswathy Central College Logo" 
              className="w-16 h-16 md:w-20 h-20 object-contain rounded-2xl bg-white p-1 shadow-md border-2 border-white/20"
            />
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-lg md:text-xl font-bold text-white tracking-wide leading-tight">
                Saraswathy Central College
              </h3>
              <p className="text-xs text-school-gold font-bold tracking-wider uppercase mt-0.5">
                (National School)
              </p>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            A premier educational institution in Badulla, Sri Lanka, nurturing leaders and scholars since 1934. Committed to academic rigor, discipline, and cultural heritage.
          </p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-school-gold hover:text-school-navy flex items-center justify-center text-slate-300 transition-colors border border-white/10">
              <FacebookSVG className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-school-gold hover:text-school-navy flex items-center justify-center text-slate-300 transition-colors border border-white/10">
              <TwitterSVG className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-school-gold hover:text-school-navy flex items-center justify-center text-slate-300 transition-colors border border-white/10">
              <YoutubeSVG className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-school-gold hover:text-school-navy flex items-center justify-center text-slate-300 transition-colors border border-white/10">
              <LinkedinSVG className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Group 1 */}
        <div>
          <h3 className="text-white font-bold text-base mb-6 uppercase tracking-wider relative pb-2 border-b border-white/10">
            Navigation
          </h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path}
                  onClick={scrollToTop}
                  className="hover:text-school-gold transition-colors text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-school-gold/60 mr-2 group-hover:bg-school-gold group-hover:scale-125 transition-all" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Group 2 */}
        <div>
          <h3 className="text-white font-bold text-base mb-6 uppercase tracking-wider relative pb-2 border-b border-white/10">
            Resources
          </h3>
          <ul className="space-y-3">
            {secondaryLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path}
                  onClick={scrollToTop}
                  className="hover:text-school-gold transition-colors text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-school-gold/60 mr-2 group-hover:bg-school-gold group-hover:scale-125 transition-all" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-base mb-6 uppercase tracking-wider relative pb-2 border-b border-white/10">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-school-gold mt-0.5 flex-shrink-0" />
              <span className="text-slate-400">
                Saraswathy Central College,<br />
                Mahiyanganaya Road, Badulla,<br />
                Uva Province, Sri Lanka.
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-school-gold flex-shrink-0" />
              <span className="text-slate-400">+94 21 222 1234</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-school-gold flex-shrink-0" />
              <span className="text-slate-400">info@saraswathycc.edu.lk</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-school-gold mt-0.5 flex-shrink-0" />
              <span className="text-slate-400">
                Office Hours: Mon - Fri<br />
                7:30 AM - 2:00 PM
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <p>© 2026 Saraswathy Central College. All Rights Reserved.</p>
        <div className="flex gap-6">
          <Link to="/about" className="hover:text-school-gold transition-colors">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-school-gold transition-colors">Campus Map</Link>
          <Link to="/admin" className="hover:text-school-gold transition-colors font-semibold">Admin Portal</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

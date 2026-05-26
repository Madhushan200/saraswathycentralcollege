import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const slides = [
    {
      title: "Saraswathy Central College",
      subtitle: "Guided by our motto “உழை உயர்”, we inspire students to work hard, rise high, and serve society with knowledge and discipline.",
      image: "/school-building.jpg",
      primaryBtn: "Explore Our School",
      primaryLink: "/about",
      secondaryBtn: "Contact Us",
      secondaryLink: "/contact"
    },
    {
      title: "Excellence in Education",
      subtitle: "Building confident learners through strong academics, values, leadership, and innovation.",
      image: "/students.jpg",
      primaryBtn: "Academic Programs",
      primaryLink: "/academics",
      secondaryBtn: "Contact Us",
      secondaryLink: "/contact"
    },
    {
      title: "Proud Student Life",
      subtitle: "A vibrant school community filled with sports, arts, culture, clubs, leadership, and teamwork.",
      image: "/sports.jpg",
      primaryBtn: "Clubs & Societies",
      primaryLink: "/clubs",
      secondaryBtn: "Student Life",
      secondaryLink: "/student-life"
    },
    {
      title: "Achievements & Legacy",
      subtitle: "Celebrating the success of our students, teachers, past pupils, and the proud history of our college.",
      image: "/cultural-event.jpg",
      primaryBtn: "View Achievements",
      primaryLink: "/achievements",
      secondaryBtn: "News & Events",
      secondaryLink: "/events"
    },
    {
      title: "Nurturing Talents & Skills",
      subtitle: "Empowering every student to develop their unique gifts in art, culture, technology, and sports.",
      image: "/banner-1.jpg",
      primaryBtn: "Explore Gallery",
      primaryLink: "/gallery",
      secondaryBtn: "Student Activities",
      secondaryLink: "/student-life"
    },
    {
      title: "Vibrant School Environment",
      subtitle: "Providing a welcoming and supportive campus to foster academic growth and lifelong friendships.",
      image: "/banner-2.jpg",
      primaryBtn: "About Our College",
      primaryLink: "/about",
      secondaryBtn: "Contact Admin",
      secondaryLink: "/contact"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); // Change slide every 6s
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-900">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div 
          key={idx}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            idx === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
          }`}
        >
          {/* Slide Background Image */}
          <div className="absolute inset-0 bg-school-navy-dark/65 z-[1]" />
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover" 
          />

          {/* Slide Text Content */}
          <div className="absolute inset-0 z-[2] flex flex-col justify-center px-6 sm:px-12 md:px-24 max-w-4xl text-white pt-20 md:pt-28">
            <div className={`transition-all duration-700 delay-300 transform ${
              idx === current ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-white leading-tight">
                {slide.title}
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-slate-200 mb-8 max-w-2xl leading-relaxed font-light">
                {slide.subtitle}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {slide.primaryBtn && (
                  <Link 
                    to={slide.primaryLink}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-school-gold hover:bg-school-gold-dark text-school-navy font-bold rounded-xl transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base cursor-pointer"
                  >
                    {slide.primaryBtn}
                  </Link>
                )}
                {slide.secondaryBtn && (
                  <Link 
                    to={slide.secondaryLink}
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white hover:border-school-gold hover:text-school-gold text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base cursor-pointer"
                  >
                    {slide.secondaryBtn}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-school-gold hover:text-school-navy text-white flex items-center justify-center transition-colors border border-white/10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-school-gold hover:text-school-navy text-white flex items-center justify-center transition-colors border border-white/10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide dots indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
              idx === current 
                ? 'bg-school-gold w-8' 
                : 'bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;

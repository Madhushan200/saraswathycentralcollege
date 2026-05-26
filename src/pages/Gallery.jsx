import React from 'react';
import SectionTitle from '../components/SectionTitle';
import GalleryGrid from '../components/GalleryGrid';

const Gallery = () => {
  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* Banner */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-school-navy-dark/75 z-10" />
        <img src="/gallery-2.jpg" alt="Gallery Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center space-y-4">
          <span className="text-school-gold font-bold text-sm uppercase tracking-widest font-semibold block">
            Media Library
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            College Gallery
          </h1>
          <div className="h-1 w-20 bg-school-gold mx-auto" />
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionTitle 
            title="Life at Saraswathy Central College" 
            subtitle="Browse through images of sports meets, academic science exhibitions, classroom learning, and cultural showcases." 
          />

          <GalleryGrid />
        </div>
      </section>
    </div>
  );
};

export default Gallery;

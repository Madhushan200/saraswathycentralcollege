import React, { useState, useEffect } from 'react';
import { Eye, X } from 'lucide-react';
import { supabase, isMockEnabled } from '../supabaseClient';

const GalleryGrid = ({ limit = null }) => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        if (isMockEnabled) {
          const localGallery = localStorage.getItem('saraswathy_gallery');
          if (localGallery) {
            setGallery(JSON.parse(localGallery));
          }
          return;
        }

        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setGallery(data);
        }
      } catch (err) {
        console.warn('Deferred gallery load:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = [
    "All",
    "School Building",
    "Events",
    "Sports",
    "Cultural Programs",
    "Students",
    "Achievements",
    "Clubs"
  ];

  const fallbackItems = [
    {
      id: 1,
      title: "Majestic Main Administration Block",
      category: "School Building",
      image: "/school-building.webp",
      description: "Our historic main building symbolizing over nine decades of academic excellence."
    },
    {
      id: 2,
      title: "Interactive Chemistry Lab Session",
      category: "Students",
      image: "/gallery-1.jpg",
      description: "Senior secondary students performing controlled experiments under faculty guidance."
    },
    {
      id: 3,
      title: "Inter-House Cricket Championship Match",
      category: "Sports",
      image: "/sports.jpg",
      description: "The college first XI team showing intense dedication during the finals."
    },
    {
      id: 4,
      title: "Traditional Ves Dance Performance",
      category: "Cultural Programs",
      image: "/cultural-event.jpg",
      description: "Vibrant showcase of traditional dances during the Annual Cultural Day."
    },
    {
      id: 5,
      title: "Annual Prize Giving Ceremony",
      category: "Events",
      image: "/gallery-3.jpg",
      description: "Honoring academic giants and special achievers on our grand stage."
    },
    {
      id: 6,
      title: "Students Programming in the ICT Hub",
      category: "Clubs",
      image: "/gallery-2.jpg",
      description: "ICT Club members collaborating on soft-skills coding assignments."
    },
    {
      id: 7,
      title: "National Olympiad Team Finalists",
      category: "Achievements",
      image: "/students.jpg",
      description: "Celebrating the intellectual breakthroughs of our junior scientists."
    },
    {
      id: 8,
      title: "Principal & Staff Assembly Meet",
      category: "Events",
      image: "/principal.jpg",
      description: "A meeting of minds driving strategic leadership for the college."
    }
  ];

  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxItem, setLightboxItem] = useState(null);

  const activeItems = gallery.length > 0 ? gallery : fallbackItems;

  const filteredItems = activeFilter === "All"
    ? activeItems
    : activeItems.filter(item => item.category === activeFilter);

  // Apply visual limits for preview on Home Page
  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  return (
    <div className="space-y-10">
      {/* Filters (Hide if limit is passed - e.g. on homepage preview) */}
      {!limit && (
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-school-navy text-school-gold shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-school-navy hover:text-school-navy'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {displayedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedItems.map((item) => (
            <div 
              key={item.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 aspect-[4/3] cursor-pointer"
              onClick={() => setLightboxItem(item)}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-school-navy-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-school-gold font-bold text-xs uppercase tracking-wider mb-1.5">
                  {item.category}
                </span>
                <h4 className="text-lg font-bold text-white leading-tight mb-2">
                  {item.title}
                </h4>
                <p className="text-slate-300 text-xs line-clamp-2 mb-4 leading-relaxed font-light">
                  {item.description}
                </p>
                <div className="inline-flex items-center gap-1 text-school-gold text-xs font-bold uppercase tracking-widest font-semibold border-b border-school-gold/30 pb-0.5 w-max">
                  <Eye className="w-4 h-4" /> View Fullscreen
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl">
          <p className="text-slate-400 font-medium">No items found in this category.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <button 
            className="absolute top-4 right-4 bg-white/10 hover:bg-school-gold hover:text-school-navy text-white p-3 rounded-full transition-colors z-50 cursor-pointer"
            onClick={() => setLightboxItem(null)}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            className="max-w-4xl w-full flex flex-col items-center gap-4 bg-transparent animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src={lightboxItem.image} 
                alt={lightboxItem.title} 
                className="max-w-full max-h-[75vh] object-contain" 
              />
            </div>
            
            <div className="text-center text-white px-4 max-w-2xl">
              <span className="text-school-gold font-bold text-xs uppercase tracking-widest block mb-1">
                {lightboxItem.category}
              </span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">
                {lightboxItem.title}
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                {lightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;

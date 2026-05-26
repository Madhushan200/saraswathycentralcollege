import React, { useState } from 'react';
import { Calendar, Tag, X, Clock } from 'lucide-react';

const NewsCard = ({ image, date, category, title, description, fullContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-video">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute top-4 left-4 bg-school-navy text-school-gold px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1 border border-school-gold/20">
            <Tag className="w-3 h-3" />
            {category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-2 text-slate-400 text-xs md:text-sm mb-3">
            <Calendar className="w-4 h-4 text-school-gold" />
            <span>{date}</span>
          </div>
          
          <h3 className="text-xl font-bold text-school-navy mb-3 group-hover:text-school-navy-light transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 flex-grow line-clamp-3">
            {description}
          </p>

          <div>
            <button 
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center px-4 py-2 border border-school-navy text-school-navy hover:bg-school-navy hover:text-school-gold text-sm font-bold rounded-lg transition-all duration-300 shadow-sm"
            >
              Read More
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image & Header */}
            <div className="relative h-64 md:h-80 w-full">
              <img src={image} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-school-gold hover:text-school-navy text-white p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-school-gold text-school-navy px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                  {category}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-shadow-gold">
                  {title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-4">
              <div className="flex items-center gap-4 text-slate-400 text-xs md:text-sm border-b border-slate-100 pb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-school-gold" />
                  {date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-school-gold" />
                  Published: school-year-2026
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                {description}
              </p>
              <div className="text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line space-y-2">
                {fullContent || "More details will be updated by the administration soon. Stay tuned for further updates."}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-school-navy text-white hover:bg-school-navy-light text-sm font-bold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;

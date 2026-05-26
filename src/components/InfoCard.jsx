import React from 'react';

const InfoCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <div 
      className="p-6 md:p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-school-gold group"
      style={{ animationDelay: `${delay}ms` }}
    >
      {Icon && (
        <div className="w-12 h-12 flex items-center justify-center bg-school-navy-light/10 text-school-navy group-hover:bg-school-navy group-hover:text-school-gold rounded-xl transition-all duration-300 mb-6">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-xl font-bold text-school-navy mb-3 group-hover:text-school-navy-light transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed text-sm md:text-base">
        {description}
      </p>
    </div>
  );
};

export default InfoCard;

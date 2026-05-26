import React from 'react';

const SectionTitle = ({ title, subtitle, align = 'center', light = false }) => {
  const isCenter = align === 'center';
  
  return (
    <div className={`mb-12 flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'}`}>
      <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${
        light ? 'text-white' : 'text-school-navy'
      }`}>
        {title}
      </h2>
      <div className={`h-1 w-20 rounded-full mt-3 ${
        light ? 'bg-school-gold-light' : 'bg-school-gold'
      }`} />
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-lg ${
          light ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;

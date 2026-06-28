import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ClubIcon from './ClubIcon';

const ClubCard = ({ id, icon, name, description, activities = [] }) => {
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return <ClubIcon name={icon} className="w-6 h-6" />;
    }
    const IconComponent = icon;
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-school-gold transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full group">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 flex items-center justify-center bg-school-navy-light/10 text-school-navy group-hover:bg-school-navy group-hover:text-school-gold rounded-xl transition-all duration-300">
          {renderIcon()}
        </div>
        <Link to={`/clubs/${id}`} className="block">
          <h3 className="text-xl font-bold text-school-navy hover:text-school-gold-dark transition-colors duration-200 text-left">
            {name}
          </h3>
        </Link>
      </div>
      
      <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 flex-grow text-left">
        {description}
      </p>

      {activities && activities.length > 0 && (
        <div className="border-t border-slate-100 pt-4 mt-auto">
          <h4 className="text-xs font-bold text-school-navy uppercase tracking-wider mb-3 text-left">
            Key Activities & Events
          </h4>
          <ul className="space-y-2">
            {activities.map((act, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-600 text-left">
                <ArrowRight className="w-4 h-4 text-school-gold mt-0.5 flex-shrink-0" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-school-navy group-hover:text-school-gold-dark transition-colors duration-200">
        <Link to={`/clubs/${id}`} className="inline-flex items-center gap-1.5 hover:underline">
          Explore Portal <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
        </Link>
      </div>
    </div>
  );
};

export default ClubCard;


import React from 'react';
import { 
  ShieldCheck, Landmark, BookOpen, PenTool, Languages, 
  Atom, TrendingUp, Laptop, Leaf, Tv, Compass, PlusSquare, Trophy, HelpCircle 
} from 'lucide-react';

const iconMap = {
  ShieldCheck,
  Landmark,
  BookOpen,
  PenTool,
  Languages,
  Atom,
  TrendingUp,
  Laptop,
  Leaf,
  Tv,
  Compass,
  PlusSquare,
  Trophy
};

const ClubIcon = ({ name, className = "w-6 h-6" }) => {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent className={className} />;
};

export default ClubIcon;
export { iconMap };

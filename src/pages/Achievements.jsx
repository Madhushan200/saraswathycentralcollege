import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import AchievementCounter from '../components/AchievementCounter';
import { Award, BookOpen, Trophy, ShieldCheck, Heart, Calendar, Users, Star, Sparkles, CheckCircle2, GraduationCap } from 'lucide-react';
import { supabase, isMockEnabled } from '../supabaseClient';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        if (isMockEnabled) {
          let localAchievements = localStorage.getItem('saraswathy_achievements');
          if (!localAchievements) {
            const seedAchievements = [
              { id: 1, title: "National School Athletic Championship Gold Medal", level: "National", category: "Sports", description: "Gold medal in 400m and high jump events won at the national athletic arena.", image: "/sports.jpg", year: "2025" },
              { id: 2, title: "Uva Province Under-19 Cricket Champions", level: "Province", category: "Sports", description: "Our Under-19 cricket team won the championship trophy of the Uva Province schools league.", image: "/sports.jpg", year: "2025" },
              { id: 3, title: "Zonal School Science Exhibition Winner", level: "Zonal", category: "Academic", description: "First prize for the robotic solar irrigation prototype model designed by the science society.", image: "/gallery-1.jpg", year: "2026" },
              { id: 4, title: "National Chemistry Olympiad Finalist", level: "National", category: "Academic", description: "Honorable mention and finalist award at the National Chemistry Olympiad finals held in Colombo.", image: "/students.jpg", year: "2025" },
              { id: 5, title: "Provincial Tamil Literary Oratorical Award", level: "Province", category: "Cultural", description: "First place in the senior Tamil oratorical category during the Provincial Tamil Literary Festival.", image: "/cultural-event.jpg", year: "2025" },
              { id: 6, title: "Zonal School Badminton Singles Silver", level: "Zonal", category: "Sports", description: "Silver medal in junior singles category at the zonal schools tournament.", image: "/sports.jpg", year: "2026" }
            ];
            localStorage.setItem('saraswathy_achievements', JSON.stringify(seedAchievements));
            localAchievements = JSON.stringify(seedAchievements);
          }
          setAchievements(JSON.parse(localAchievements));
          return;
        }

        const { data, error } = await supabase
          .from('achievements')
          .select('*')
          .order('id', { ascending: false });

        if (error) throw error;
        setAchievements(data || []);
      } catch (err) {
        console.warn('Error fetching achievements:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const filteredAchievements = activeTab === 'All'
    ? achievements
    : achievements.filter(ach => ach.level === activeTab);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Academic': return BookOpen;
      case 'Sports': return Trophy;
      case 'Cultural': return Sparkles;
      case 'Leadership': return ShieldCheck;
      default: return Award;
    }
  };

  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* Banner */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-school-navy-dark/75 z-10" />
        <img src="/sports.jpg" alt="Achievements Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center space-y-4">
          <span className="text-school-gold font-bold text-sm uppercase tracking-widest font-semibold block">
            Proud Records
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Our Achievements
          </h1>
          <div className="h-1 w-20 bg-school-gold mx-auto" />
        </div>
      </section>

      {/* Counters Section */}
      <section className="py-20 bg-slate-950 text-white px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionTitle title="College at a Glance" subtitle="Key metrics representing decades of dedication, growth, and excellence." light={true} />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <AchievementCounter endValue="90" suffix="+" label="Years of Legacy" icon={Award} />
            <AchievementCounter endValue="1000" suffix="+" label="Active Students" icon={Users} />
            <AchievementCounter endValue="60" suffix="+" label="Expert Teachers" icon={GraduationCap} />
            <AchievementCounter endValue="50" suffix="+" label="Annual Events" icon={Calendar} />
            <AchievementCounter endValue="25" suffix="+" label="Clubs & Societies" icon={Trophy} />
          </div>
        </div>
      </section>

      {/* Detailed Achievements Cards Grid */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionTitle 
            title="Areas of Pride & Performance" 
            subtitle="Explore our students' achievements across National, Provincial, and Zonal levels." 
          />

          {/* Level Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {['All', 'National', 'Province', 'Zonal'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setActiveTab(lvl)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  activeTab === lvl
                    ? 'bg-school-navy text-school-gold shadow-md font-bold'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-school-navy hover:text-school-navy'
                }`}
              >
                {lvl === 'All' ? 'All Levels' : `${lvl} Level`}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <span className="w-8 h-8 border-4 border-school-navy border-t-transparent rounded-full animate-spin inline-block"></span>
              <p className="text-slate-400 text-sm mt-3">Loading achievements archive...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAchievements.map((ach) => {
                const Icon = getCategoryIcon(ach.category);
                return (
                  <div key={ach.id} className="bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden hover:border-school-gold transition-all duration-300 flex flex-col group shadow-sm hover:shadow-lg">
                    <div className="h-52 w-full overflow-hidden relative border-b border-slate-200">
                      <img 
                        src={ach.image || '/sports.jpg'} 
                        alt={ach.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <span className="absolute top-4 left-4 bg-school-navy text-school-gold text-xs font-bold px-3 py-1 rounded-full shadow border border-school-gold/25">
                        {ach.level} Level
                      </span>
                      <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow border border-white/20">
                        {ach.year}
                      </span>
                    </div>

                    <div className="p-8 flex-grow flex flex-col justify-between text-left space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-school-navy text-school-gold flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">{ach.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-school-navy tracking-tight leading-tight">
                          {ach.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-light">
                          {ach.description}
                        </p>
                      </div>

                      <div className="border-t border-slate-200 pt-4 flex items-center gap-2 text-school-gold text-xs font-bold uppercase tracking-wider font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-school-navy" /> Verified College Record
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredAchievements.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-400">
                  No achievements listed for this level. Setup data in administration dashboard.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Achievements;

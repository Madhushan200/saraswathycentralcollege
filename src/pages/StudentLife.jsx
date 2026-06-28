import React, { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { supabase, isMockEnabled } from '../supabaseClient';
import { 
  ShieldAlert, Users, Trophy, Sparkles, Smile, Compass, BookOpen, Star,
  FileText, Download, Search, Calendar
} from 'lucide-react';

const fallbackTimetables = [
  { id: 1, title: 'Grade 10 Class Timetable - Term 1', type: 'Class', grade_stream: 'Grade 10', file_url: '/school-building.jpg', academic_year: '2026' },
  { id: 2, title: 'G.C.E. Advanced Level Science Stream Schedule', type: 'Class', grade_stream: 'A/L Science', file_url: '/gallery-1.jpg', academic_year: '2026' },
  { id: 3, title: 'Grade 8 General Subjects Time Table', type: 'Class', grade_stream: 'Grade 8', file_url: '/gallery-2.jpg', academic_year: '2026' },
  { id: 4, title: 'First Term Examination Schedule - All Grades', type: 'Exam', grade_stream: 'All Grades', file_url: '/gallery-3.jpg', academic_year: '2026' },
  { id: 5, title: 'G.C.E. Ordinary Level Mock Seminar Program', type: 'Exam', grade_stream: 'Grade 11', file_url: '/students.jpg', academic_year: '2026' }
];

const StudentLife = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('All');

  useEffect(() => {
    const fetchTimetables = async () => {
      setLoading(true);
      try {
        if (isMockEnabled) {
          let localTts = localStorage.getItem('saraswathy_timetables');
          if (!localTts) {
            localStorage.setItem('saraswathy_timetables', JSON.stringify(fallbackTimetables));
            localTts = JSON.stringify(fallbackTimetables);
          }
          setTimetables(JSON.parse(localTts));
          return;
        }

        if (!supabase) {
          setTimetables(fallbackTimetables);
          return;
        }

        const { data, error } = await supabase
          .from('timetables')
          .select('*')
          .order('title', { ascending: true });

        if (error) throw error;
        setTimetables(data || []);
      } catch (err) {
        console.error('Error fetching timetables:', err);
        setTimetables(fallbackTimetables);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetables();
  }, []);

  const filteredTimetables = timetables.filter(item => {
    const matchesType = activeType === 'All' || item.type === activeType;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.grade_stream.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const pillars = [
    {
      title: "Leadership & Responsibility",
      icon: Compass,
      desc: "We believe every student has leadership potential. Through class monitors, team captains, and prefect posts, students learn management, crisis resolution, and collaborative planning."
    },
    {
      title: "Sports & Physical Well-being",
      icon: Trophy,
      desc: "Our college emphasizes fitness alongside academics. We provide cricket nets, a football ground, athletic track training, and chess clubs to build health, resilience, and fair play."
    },
    {
      title: "Cultural & Literary Enrichment",
      icon: Sparkles,
      desc: "We celebrate classical Tamil heritage, traditional music, folk dances, and debate forums. These activities help students express themselves, build confidence, and appreciate their roots."
    },
    {
      title: "Moral & Religious Activities",
      icon: Star,
      desc: "We begin our school days with prayers and thoughts for the day. Special ceremonies are organized for Hindu festivals (Saraswathy Poojai, Thai Pongal) and other faiths to encourage respect and values."
    },
    {
      title: "Healthy Competition",
      icon: Smile,
      desc: "Whether in inter-house sports, local debates, or science fairs, students learn to compete with integrity. We teach them to celebrate success with humility and view setbacks as opportunities to learn."
    },
    {
      title: "Community Outreach",
      icon: Users,
      desc: "We encourage students to look beyond themselves. Through scouting, first-aid camps, and clean-up drives, they learn the value of service, empathy, and social impact."
    },
    {
      title: "Values and Discipline",
      icon: ShieldAlert,
      desc: "Our students follow a clear code of conduct. Discipline is not about punishment; it is about building self-control, punctuality, respect for elders, and honesty in daily interactions."
    },
    {
      title: "Friendship & Teamwork",
      icon: BookOpen,
      desc: "The bonds formed at Saraswathy College last a lifetime. Group projects, inter-house sports, and collaborative club activities help students build trust, empathy, and strong teamwork skills."
    }
  ];

  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* Banner */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-school-navy-dark/75 z-10" />
        <img src="/students.jpg" alt="Student Life Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center space-y-4">
          <span className="text-school-gold font-bold text-sm uppercase tracking-widest font-semibold block">
            Vibrant Campus Ecosystem
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Student Life
          </h1>
          <div className="h-1 w-20 bg-school-gold mx-auto" />
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <SectionTitle title="A Balanced & Inspiring Journey" align="center" />
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
            Life at Saraswathy Central College is structured to ensure that academic development is accompanied by personal growth. We offer a supportive environment that inspires students to discover their creative talents, build lifelong friendships, and develop strong ethical values. From morning assemblies to afternoon club training, our students learn, laugh, and grow together.
          </p>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionTitle 
            title="Pillars of Student Growth" 
            subtitle="The core experiences that shape a student's daily life and personality at our college." 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1 hover:border-school-gold">
                  <div className="w-10 h-10 bg-school-navy/10 text-school-navy group-hover:bg-school-navy group-hover:text-school-gold rounded-xl flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-school-navy text-lg mb-2 group-hover:text-school-navy-light transition-colors">{pillar.title}</h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed flex-grow">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timetables Download Section */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
            <div className="text-left">
              <SectionTitle 
                title="Academic Schedules & Timetables" 
                subtitle="Download class-wise daily rosters and upcoming exam timetables in PDF/image format." 
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              {/* Type Filter */}
              <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
                {['All', 'Class', 'Exam'].map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`flex-grow sm:flex-none px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                      activeType === type 
                        ? 'bg-school-navy text-school-gold shadow-sm' 
                        : 'text-slate-600 hover:text-school-navy'
                    }`}
                  >
                    {type === 'All' ? 'All Files' : type === 'Class' ? 'Class Roster' : 'Exam Tables'}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search class or exam..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-school-gold rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="py-12 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-school-navy"></div>
            </div>
          ) : filteredTimetables.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTimetables.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:border-school-gold transition-all duration-300 flex flex-col justify-between group shadow-3xs hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-school-navy/5 text-school-navy rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        item.type === 'Class' 
                          ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {item.type === 'Class' ? 'Class Timetable' : 'Examination'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <h4 className="font-extrabold text-school-navy group-hover:text-school-navy-light transition-colors text-base md:text-lg line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        Grade/Stream: {item.grade_stream}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Year: {item.academic_year || '2026'}</span>
                    </div>
                    
                    <a 
                      href={item.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-school-navy hover:bg-school-navy-light text-white font-bold rounded-xl text-xs shadow-2xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-school-gold" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-3xl bg-slate-50">
              <p className="text-slate-500 font-medium">No timetables found matching your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Daily Routine Summary */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="max-w-4xl mx-auto border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm bg-white grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-2 border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-6">
            <span className="text-3xl font-extrabold text-school-navy">7:30 AM</span>
            <h4 className="font-bold text-school-navy-light">Assembly & Devotion</h4>
            <p className="text-xs text-slate-500">Prayer, pledge, and daily messages to prepare for the school day.</p>
          </div>
          <div className="text-center space-y-2 border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-6">
            <span className="text-3xl font-extrabold text-school-navy">10:30 AM</span>
            <h4 className="font-bold text-school-navy-light">Interval & Recreation</h4>
            <p className="text-xs text-slate-500">A short recess for snacks, conversations, and classroom breaks.</p>
          </div>
          <div className="text-center space-y-2">
            <span className="text-3xl font-extrabold text-school-navy">1:40 PM</span>
            <h4 className="font-bold text-school-navy-light">Clubs & Sports</h4>
            <p className="text-xs text-slate-500">Afternoon practice, coding lab sessions, and literature debates.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLife;

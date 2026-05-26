import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { BookOpen, GraduationCap, Laptop, FileText, CheckCircle, Database } from 'lucide-react';
import { supabase, isMockEnabled } from '../supabaseClient';

const Academics = () => {
  const [academics, setAcademics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcademics = async () => {
      try {
        if (isMockEnabled) {
          let localAcademics = localStorage.getItem('saraswathy_academics');
          if (!localAcademics) {
            const seedAcademics = [
              {
                id: 1,
                title: "Primary Education (Grades 1 - 5)",
                category: "Primary",
                description: "Developing foundational literacy, numeracy, social skills, and creative intelligence. We focus on active cognitive stimulation and early child values.",
                subjects: "Mother Tongue (Tamil), Mathematics, English Language, Environmental Studies, Religious Studies, Arts & Crafts",
                image: "/gallery-1.jpg"
              },
              {
                id: 2,
                title: "Junior Secondary Education (Grades 6 - 9)",
                category: "Junior Secondary",
                description: "Constructing advanced conceptual reasoning, critical logic, scientific inquiry, and core linguistic competencies.",
                subjects: "Science & Technology, Mathematics, English, Tamil Literature, History, Geography, Health & Physical Ed, ICT Basics",
                image: "/gallery-2.jpg"
              },
              {
                id: 3,
                title: "Senior Secondary Education - G.C.E. O/L (Grades 10 - 11)",
                category: "Ordinary Level",
                description: "Rigorous academic grooming aimed at preparing students for the National G.C.E. Ordinary Level exams. Focuses on broad stream competence.",
                subjects: "Science, Mathematics, Tamil/Sinhala, English, History, Religion, Category I (e.g., Music/Art), Category II (Commerce), Category III (ICT)",
                image: "/students.jpg"
              },
              {
                id: 4,
                title: "Biological & Physical Sciences",
                category: "Advanced Level",
                description: "Prepares students for medicine, bio-system engineering, veterinary science, physical research, and civil engineering paths.",
                subjects: "Physics, Chemistry, Combined Mathematics, Biology, Agricultural Science",
                image: "/gallery-1.jpg"
              },
              {
                id: 5,
                title: "Commerce Stream",
                category: "Advanced Level",
                description: "Builds foundations in corporate administration, finance audit, economics research, and global commerce management.",
                subjects: "Accounting, Business Studies, Economics, Business Statistics",
                image: "/school-building.webp"
              },
              {
                id: 6,
                title: "Arts & Humanities Stream",
                category: "Advanced Level",
                description: "Nurtures analytical skills in linguistic literature, historical studies, law, governance, and creative expression.",
                subjects: "Tamil/English Literature, Political Science, Geography, History, Logic, Fine Arts",
                image: "/cultural-event.jpg"
              },
              {
                id: 7,
                title: "Technology Stream",
                category: "Advanced Level",
                description: "A modern stream specializing in technical, field-focused engineering processes and software solutions.",
                subjects: "Engineering Technology, Biosystems Technology, Science for Technology, Information & Communication Technology",
                image: "/gallery-2.jpg"
              }
            ];
            localStorage.setItem('saraswathy_academics', JSON.stringify(seedAcademics));
            localAcademics = JSON.stringify(seedAcademics);
          }
          setAcademics(JSON.parse(localAcademics));
          return;
        }

        const { data, error } = await supabase
          .from('academics')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        setAcademics(data || []);
      } catch (err) {
        console.warn('Error fetching academics:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAcademics();
  }, []);

  const generalLevels = academics.filter(a => a.category !== 'Advanced Level');
  const alStreams = academics.filter(a => a.category === 'Advanced Level');

  const getSubjectsList = (subjectsStr) => {
    if (!subjectsStr) return [];
    return subjectsStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
  };

  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* Banner */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-school-navy-dark/75 z-10" />
        <img src="/gallery-1.jpg" alt="Academics Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center space-y-4">
          <span className="text-school-gold font-bold text-sm uppercase tracking-widest font-semibold block">
            Curriculum & Learning
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Academic Programs
          </h1>
          <div className="h-1 w-20 bg-school-gold mx-auto" />
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <SectionTitle title="Academic Structure" align="center" />
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Saraswathy Central College offers a comprehensive national curriculum in Tamil medium, ensuring that every learner achieves high competence. Our educational architecture is planned to smoothly guide students from foundational primary years up to advanced competitive college entrance exams.
          </p>
        </div>
      </section>

      {/* Grade levels */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionTitle title="General Curriculum Levels" subtitle="Structured education pathways approved by the Ministry of Education, Sri Lanka." />

          {loading ? (
            <div className="text-center py-12">
              <span className="w-8 h-8 border-4 border-school-navy border-t-transparent rounded-full animate-spin inline-block"></span>
              <p className="text-slate-400 text-sm mt-3">Loading academic levels...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {generalLevels.map((lvl) => (
                <div key={lvl.id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col h-full group">
                  <div className="h-48 w-full overflow-hidden relative border-b border-slate-100">
                    <img 
                      src={lvl.image || '/gallery-1.jpg'} 
                      alt={lvl.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-4 right-4 bg-school-navy text-school-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow border border-school-gold/20">
                      {lvl.category}
                    </span>
                  </div>
                  <div className="p-8 flex flex-col flex-grow text-left">
                    <div className="w-10 h-10 rounded-lg bg-school-navy/10 text-school-navy flex items-center justify-center mb-4">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-school-navy mb-3">{lvl.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{lvl.description}</p>
                    
                    <div className="border-t border-slate-100 pt-4">
                      <h4 className="text-xs font-bold text-school-navy uppercase tracking-wider mb-3">Core Subject Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {getSubjectsList(lvl.subjects).map((sub, sIdx) => (
                          <span key={sIdx} className="bg-slate-50 text-slate-600 text-xs px-2.5 py-1 rounded-md border border-slate-100">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {generalLevels.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-400">
                  No records found. Setup data in administration dashboard.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* AL streams */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionTitle title="Advanced Level (G.C.E. A/L) Streams" subtitle="Specialized pathways (Grades 12 - 13) leading to university entrance and professional career lines." />

          {loading ? (
            <div className="text-center py-12">
              <span className="w-8 h-8 border-4 border-school-navy border-t-transparent rounded-full animate-spin inline-block"></span>
              <p className="text-slate-400 text-sm mt-3">Loading streams...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {alStreams.map((stream) => (
                <div key={stream.id} className="bg-slate-50 border border-slate-200/50 rounded-3xl overflow-hidden hover:border-school-gold transition-all relative group flex flex-col">
                  <div className="h-56 w-full overflow-hidden relative border-b border-slate-200">
                    <img 
                      src={stream.image || '/gallery-2.jpg'} 
                      alt={stream.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <span className="absolute bottom-4 left-6 bg-school-gold text-school-navy text-xs font-black uppercase tracking-widest px-3 py-1 rounded-md shadow-md">
                      A/L Stream
                    </span>
                  </div>
                  <div className="p-8 flex-grow flex flex-col justify-between space-y-6 text-left">
                    <div>
                      <h3 className="text-2xl font-bold text-school-navy mb-3">{stream.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{stream.description}</p>
                    </div>
                    
                    <div className="border-t border-slate-200/60 pt-4">
                      <h4 className="text-xs font-bold text-school-navy uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-school-gold" />
                        Specialized Subjects
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {getSubjectsList(stream.subjects).map((sub, sIdx) => (
                          <span key={sIdx} className="text-xs text-slate-700 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-school-gold flex-shrink-0" />
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {alStreams.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-400">
                  No records found. Setup data in administration dashboard.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Support systems (Digital, Library, Tracking) */}
      <section className="py-20 bg-slate-900 text-white px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-school-navy-dark/95 z-[1]" />
        
        <div className="max-w-7xl mx-auto relative z-10 space-y-16">
          <SectionTitle title="Academic Support Services" subtitle="Empowering student performance with dynamic tools, library reserves, and mentorship." light={true} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Library */}
            <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-800 glass-panel space-y-4">
              <div className="w-10 h-10 rounded-lg bg-school-gold/10 text-school-gold flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Central Research Library</h3>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Housing over 15,000 reference books, educational journals, history manuscripts, and Tamil literature resources. Provides quiet discussion corners and digital library terminals for research databases.
              </p>
            </div>

            {/* Digital Learning */}
            <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-800 glass-panel space-y-4">
              <div className="w-10 h-10 rounded-lg bg-school-gold/10 text-school-gold flex items-center justify-center">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Smart Classroom Hubs</h3>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Equipped with high-definition digital smartboards, visual projections, and software modules. Promotes interactive simulations in chemistry, physics geometry, and geography maps to enhance comprehension.
              </p>
            </div>

            {/* Student Tracking */}
            <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-800 glass-panel space-y-4">
              <div className="w-10 h-10 rounded-lg bg-school-gold/10 text-school-gold flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Progress Tracking & Seminars</h3>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Regular term testing, detailed grade cards, and student progress metrics. Features targeted exam seminar programs, revision tests, and parent-teacher consultations to maximize G.C.E. results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;

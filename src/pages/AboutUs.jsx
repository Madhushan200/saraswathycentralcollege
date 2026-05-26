import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { Target, Compass, BookOpen, ShieldCheck, Heart, Users, Award, Landmark, Mail, Phone, Calendar } from 'lucide-react';
import { supabase, isMockEnabled } from '../supabaseClient';

const AboutUs = () => {
  const [principals, setPrincipals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrincipals = async () => {
      try {
        if (isMockEnabled) {
          let localPrincipals = localStorage.getItem('saraswathy_principals');
          if (!localPrincipals) {
            const seedPrincipals = [
              { id: 1, name: "Mr. K. Somasundaram", period: "1935 - 1948", image: "/principal.jpg", description: "Founding Principal of Saraswathy Central College who laid the pillars of academic integrity and discipline." },
              { id: 2, name: "Mr. T. Vyramuttu", period: "1948 - 1965", image: "/principal.jpg", description: "Championed the free education scheme and built the main administrative block and library facility." },
              { id: 3, name: "Mr. V. Tharmalingam", period: "1965 - 1982", image: "/principal.jpg", description: "Fostered athletic programs and established the annual Inter-House Sports Meet structure." }
            ];
            localStorage.setItem('saraswathy_principals', JSON.stringify(seedPrincipals));
            localPrincipals = JSON.stringify(seedPrincipals);
          }
          setPrincipals(JSON.parse(localPrincipals));
          return;
        }

        const { data, error } = await supabase
          .from('principals')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        setPrincipals(data || []);
      } catch (err) {
        console.warn('Error fetching principals:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPrincipals();
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }, [principals]);

  const values = [
    { name: "Discipline", icon: ShieldCheck, desc: "Fostering absolute self-discipline, integrity, and adherence to social and moral codes of conduct." },
    { name: "Knowledge", icon: BookOpen, desc: "Striving for pure academic wisdom, intellectual discovery, critical analysis, and modern innovation." },
    { name: "Respect", icon: Heart, desc: "Valuing other classmates, elders, teachers, parents, diverse cultures, and our natural environment." },
    { name: "Leadership", icon: Target, desc: "Inspiring confidence, administrative skill, responsibility, and driving collective progress for our peers." },
    { name: "Service", icon: Users, desc: "Dedicating ourselves to helping others and making impactful volunteer contributions to our communities." },
    { name: "Unity", icon: Award, desc: "Standing together regardless of background, race, or belief to safeguard the pride of Saraswathy College." }
  ];

  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* Banner */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-school-navy-dark/75 z-10" />
        <img src="/school-building.webp" alt="About College Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center space-y-4">
          <span className="text-school-gold font-bold text-sm uppercase tracking-widest font-semibold block">
            Nurturing Generations Since 1935
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            About Saraswathy Central College
          </h1>
          <div className="h-1 w-20 bg-school-gold mx-auto" />
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <SectionTitle title="Our Foundations" align="center" />
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Saraswathy Central College is a highly respected educational institution committed to building disciplined, knowledgeable, and responsible students. Guided by the motto **“உழை உயர்”**, the college encourages every student to work with dedication, rise through education, and contribute positively to society.
          </p>
        </div>
      </section>

      {/* Principal's Message */}
      <section id="principal-message" className="py-20 bg-slate-50 border-t border-slate-200/50 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="relative w-64 h-72 sm:w-72 sm:h-80 lg:w-full">
              <div className="absolute inset-0 bg-school-gold rounded-3xl rotate-3" />
              <img 
                src="/principal.jpg" 
                alt="Principal Mr. S. Sivanesan" 
                className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-xl border border-slate-100 transform hover:rotate-0 transition-transform duration-300"
              />
            </div>
            
            <div className="w-full bg-white border border-slate-200 p-6 rounded-2xl space-y-4 text-sm shadow-sm">
              <div className="text-center pb-2 border-b border-slate-150">
                <h3 className="text-lg font-bold text-school-navy">Mr. S. Sivanesan</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-0.5 font-semibold">Principal</p>
              </div>
              
              <div className="space-y-2 text-slate-600 text-left">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-school-gold flex-shrink-0" />
                  <span className="truncate">principal@saraswathycc.edu.lk</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-school-gold flex-shrink-0" />
                  <span>+94 21 222 1234 ext: 101</span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-school-gold flex-shrink-0" />
                  <span>Office Appointments: Tue & Thu</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Message Letter */}
          <div className="lg:col-span-8 space-y-6 text-slate-700 leading-relaxed text-base md:text-lg text-left">
            <span className="text-school-gold font-bold text-sm uppercase tracking-widest font-semibold block">
              Leadership & Vision
            </span>
            <h2 className="text-3xl font-extrabold text-school-navy tracking-tight">
              Principal's Message
            </h2>
            <div className="h-1.5 w-16 bg-school-gold rounded-full" />
            
            <div className="space-y-6 font-light">
              <p>
                It is with great pride and a deep sense of humility that I welcome you to Saraswathy Central College. Our school stands as a place where education, discipline, culture, and character come together to shape the future of our students. Guided by our meaningful motto **“உழை உயர்”**, we believe that sincere effort and hard work are the foundation of success.
              </p>
              
              <p>
                At Saraswathy Central College, we aim to provide a learning environment where every student can discover their talents, strengthen their confidence, and become a responsible citizen. We understand that educational development is multi-dimensional. Academic excellence must coexist with physical fitness, creative expression, and moral integrity.
              </p>

              <blockquote className="bg-white border-l-4 border-school-gold p-6 rounded-r-2xl italic font-serif my-6 text-school-navy-light text-lg shadow-sm">
                "Our vision is to provide an ecosystem where students do not studying for examinations, but build characters that can stand firm against the tests of life. We want them to walk out of our gates with an unshakeable sense of self-discipline, curiosity, and cultural pride."
              </blockquote>

              <p>
                Our teachers, parents, past pupils, and the wider school community continue to support our journey toward excellence. The partnerships we have established with our global alumni network have enabled us to invest heavily in scientific laboratories, digital smart screens, and athletic development infrastructure.
              </p>
            </div>

            {/* Signature Area */}
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <p className="text-slate-500 text-sm">Yours sincerely,</p>
                <div className="h-12 flex items-center mt-2">
                  <span className="font-serif italic text-2xl text-school-navy border-b border-slate-300 pb-1">
                    S. Sivanesan
                  </span>
                </div>
                <p className="text-school-navy font-bold mt-2 text-sm">Mr. S. Sivanesan</p>
                <p className="text-slate-500 text-xs uppercase tracking-wider">Principal, Saraswathy Central College</p>
              </div>
              
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-school-gold/15 text-school-gold flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-school-navy text-left">National Education Council</p>
                  <p className="text-[10px] text-slate-500 font-medium text-left">Certified Grade-I Principal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-school-gold rounded-3xl rotate-3 scale-95 opacity-20 -z-10" />
            <img 
              src="/gallery-1.jpg" 
              alt="Historical Campus Archive" 
              className="w-full aspect-[4/3] object-cover rounded-3xl shadow-xl border border-slate-100" 
            />
          </div>
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <Landmark className="w-6 h-6 text-school-gold" />
              <h2 className="text-3xl font-extrabold text-school-navy tracking-tight">
                Our History & Legacy
              </h2>
            </div>
            <div className="h-1.5 w-16 bg-school-gold rounded-full" />
            <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
              <p>
                Established in 1935 in the historical educational town of Karaveddy, Saraswathy Central College began as a humble community initiative to provide premium education to children in the region. Driven by local philanthropists and visionary educators, the school steadily grew in stature.
              </p>
              <p>
                In 1947, under the government's free education scheme pioneered by C.W.W. Kannangara, the college expanded its infrastructure and academic offerings, quickly earning a reputation for sending outstanding scholars to national universities.
              </p>
              <p>
                Over the decades, the college has survived challenging periods, remaining an unwavering beacon of hope, unity, and academic excellence. Today, we stand proud of our robust alumni network, spread globally, contributing to research, administration, business, and public service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-slate-900 text-white px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-school-navy-dark/95 z-[1]" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision */}
          <div className="p-8 md:p-12 rounded-3xl bg-slate-800/40 border border-slate-800 glass-panel space-y-4 transform hover:scale-[1.02] transition-transform">
            <div className="w-12 h-12 bg-school-gold/10 text-school-gold rounded-xl flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Our Vision</h3>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              To be a premier center of educational excellence in Sri Lanka, nurturing generations of morally sound, intellectually brilliant, and highly skilled leaders who will steer the nation toward global standards of innovation and unity.
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 md:p-12 rounded-3xl bg-slate-800/40 border border-slate-800 glass-panel space-y-4 transform hover:scale-[1.02] transition-transform">
            <div className="w-12 h-12 bg-school-gold/10 text-school-gold rounded-xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Our Mission</h3>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              To provide a safe, holistic learning environment that facilitates secondary education of global standard. We are dedicated to nurturing character, promoting student-led innovation, instilling absolute discipline, and equipping learners with practical life skills based on our motto “உழை உயர்”.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Why Choose Saraswathy Central College?" 
            subtitle="Explore our key pillars that promise premium care and quality output for every student."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <span className="text-4xl font-extrabold text-school-gold">01</span>
              <h4 className="text-xl font-bold text-school-navy">Experienced Faculty</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Over 60 dedicated, highly qualified teachers with specialized training in national curricula delivery and student psychological counseling.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <span className="text-4xl font-extrabold text-school-gold">02</span>
              <h4 className="text-xl font-bold text-school-navy">Modern Infrastructure</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                State of the art Science labs, full-access ICT centers, dynamic audio-visual rooms, cricket nets, and a comprehensive research library.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <span className="text-4xl font-extrabold text-school-gold">03</span>
              <h4 className="text-xl font-bold text-school-navy">Proven Track Record</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Consistently placing among top institutions for Ordinary Level (O/L) and Advanced Level (A/L) pass rates in the district.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Our Core Values" 
            subtitle="The fundamental pillars defining code of behavior and character building in our college." 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white border border-slate-100 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all group">
                  <div className="w-10 h-10 bg-school-navy/10 text-school-navy group-hover:bg-school-navy group-hover:text-school-gold rounded-lg flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-school-navy mb-2">{val.name}</h4>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Past Principals Section */}
      <section id="past-principals" className="py-20 bg-white px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionTitle 
            title="Our Past Principals" 
            subtitle="Honoring the visionary educational leaders who guided Saraswathy Central College across the decades." 
          />

          {loading ? (
            <div className="text-center py-12">
              <span className="w-8 h-8 border-4 border-school-navy border-t-transparent rounded-full animate-spin inline-block"></span>
              <p className="text-slate-400 text-sm mt-3">Loading historical archive...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {principals.map((pr) => (
                <div key={pr.id} className="bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col">
                  <div className="aspect-[4/3] w-full overflow-hidden relative border-b border-slate-200">
                    <img 
                      src={pr.image || '/principal.jpg'} 
                      alt={pr.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4 bg-school-navy text-school-gold px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md border border-school-gold/25">
                      {pr.period}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex-grow space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-school-navy">{pr.name}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed font-light">{pr.description}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/65 flex items-center gap-2 text-school-gold text-xs font-bold uppercase tracking-wider font-semibold">
                      <Users className="w-4 h-4 text-school-navy" /> Legacy of Leadership
                    </div>
                  </div>
                </div>
              ))}
              {principals.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-400">
                  No records found. Setup data in administration dashboard.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

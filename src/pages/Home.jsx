import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, ShieldCheck, Heart, Award, ArrowRight, Calendar, Users, MapPin, Phone, Mail, GraduationCap } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import SectionTitle from '../components/SectionTitle';
import InfoCard from '../components/InfoCard';
import AchievementCounter from '../components/AchievementCounter';
import NewsCard from '../components/NewsCard';
import GalleryGrid from '../components/GalleryGrid';
import { supabase, isMockEnabled } from '../supabaseClient';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestEvents = async () => {
      try {
        if (isMockEnabled) {
          const localEvents = localStorage.getItem('saraswathy_events');
          if (localEvents) {
            setEvents(JSON.parse(localEvents).slice(0, 3));
          }
          return;
        }

        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        if (data && data.length > 0) {
          setEvents(data);
        }
      } catch (err) {
        console.warn('Deferred events load:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestEvents();
  }, []);

  // Latest 3 news items for preview
  const newsPreview = [
    {
      id: 1,
      image: "/gallery-3.jpg",
      date: "May 15, 2026",
      category: "Academic",
      title: "Annual Prize Giving Ceremony 2025/2026",
      description: "Celebrating our academic achievements, leadership accomplishments, and honoring the top scorers of Advanced Level and Ordinary Level examinations.",
      fullContent: "The Annual Prize Giving Ceremony of Saraswathy Central College was held with grandeur at the College Main Hall. The event was graced by distinguished past pupils and senior educational administrative officials. A total of 150 students received medals, certificates, and trophies for outstanding achievements in academics, sports, and co-curricular programs. Special awards were presented to island-ranked students in Advanced Level Streams, signifying our commitment to premium educational standards."
    },
    {
      id: 2,
      image: "/sports.jpg",
      date: "April 28, 2026",
      category: "Sports",
      title: "Annual Inter-House Sports Meet Celebrations",
      description: "A grand showcase of athletic talents, sportsmanship, and house teamwork at the college grounds. Visuals include drill displays and tracks events.",
      fullContent: "The Annual Inter-House Sports Meet was celebrated with high energy at the college playground. The chief guest, a prominent national athlete and alumnus, declared the meet open. Following intense competition across track and field events, Bharathi House secured the overall championship, with Ramanujan House as runners-up. The event culminated in a colorful band display and march past by the Senior Prefect Council."
    },
    {
      id: 3,
      image: "/cultural-event.jpg",
      date: "March 12, 2026",
      category: "Cultural",
      title: "Cultural Day Program & Art Exhibition",
      description: "Students representing various clubs presented traditional dances, music recitals, and visual art pieces highlighting rich regional heritage.",
      fullContent: "Saraswathy Central College hosted its Cultural Day Program, bringing alive the diverse cultural heritage of Sri Lanka. The program included traditional dance forms, instrumental recitals, and Tamil and Sinhala literature recitals. Alongside the stage performances, the Student Art Society hosted an exhibition showcasing beautiful oil paintings, sketches, and handicrafts created entirely by our students, drawing appreciation from parents and well-wishers."
    }
  ];

  return (
    <div className="font-sans">
      {/* 1. Hero Image Slider */}
      <HeroSlider />

      {/* 2. Welcome Section */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-school-gold font-extrabold text-sm uppercase tracking-widest block font-semibold">
              Welcome to Our College
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-school-navy leading-tight tracking-tight">
              Nurturing Hearts, Minds, and Future Leaders
            </h2>
            <div className="h-1.5 w-16 bg-school-gold rounded-full" />
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Saraswathy Central College is a premier educational institution committed to developing highly disciplined, knowledgeable, and responsible citizens. Founded on deep values and cultural heritage, our college fosters a balanced environment where students excel in classroom studies, sports arenas, and creative arts.
            </p>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              We empower learners to dream big, strive for absolute excellence, and impact their community positively. Through modern digital classrooms, high-tech science laboratories, and experienced staff, we build strong foundations for higher education and career paths.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-school-navy hover:bg-school-navy-light text-white hover:text-school-gold text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer">
                <span>Discover Our History</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-school-gold rounded-3xl rotate-3 scale-95 opacity-20 -z-10" />
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-school-gold/15 rounded-2xl -z-10" />
            <img 
              src="/school-building.jpg" 
              alt="School Campus" 
              className="w-full aspect-[4/3] object-cover rounded-3xl shadow-xl border border-slate-100" 
            />
          </div>
        </div>
      </section>

      {/* 3. Motto Section */}
      <section className="py-20 bg-slate-900 text-white text-center px-6 relative overflow-hidden">
        {/* Background glow lines */}
        <div className="absolute inset-0 bg-gradient-to-r from-school-navy-dark via-school-navy to-school-navy-dark z-[1]" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-school-gold/10 rounded-full blur-[100px] z-[2]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-school-navy-light/40 rounded-full blur-[100px] z-[2]" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="text-school-gold font-extrabold text-sm uppercase tracking-widest block font-semibold">
            Our Divine Motto
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-wide text-shadow-gold">
            உழை உயர்
          </h2>
          <p className="text-xl md:text-2xl text-school-gold-light font-bold italic font-serif">
            "Work Hard, Rise High"
          </p>
          <div className="h-0.5 w-24 bg-school-gold mx-auto my-4" />
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            These sacred Tamil words stand as our guiding light. We teach our students that success is never accidental; it is built on sincere dedication, constant discipline, and focused intellect. Through hard work, we rise to serve the nation.
          </p>
        </div>
      </section>

      {/* 4. Principal's Message Preview */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-72 h-80">
              <div className="absolute inset-0 bg-school-navy rounded-3xl -rotate-3 border-2 border-school-gold" />
              <img 
                src="/principal.jpg" 
                alt="Principal Profile" 
                className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-xl transform hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
          
          <div className="lg:col-span-8 space-y-6">
            <span className="text-school-gold font-extrabold text-sm uppercase tracking-widest block font-semibold">
              Principal's Message Preview
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-school-navy tracking-tight">
              Leading with Vision and Care
            </h2>
            <div className="h-1.5 w-16 bg-school-gold rounded-full" />
            <blockquote className="text-slate-600 text-lg italic leading-relaxed border-l-4 border-school-gold pl-6 py-2">
              "It is with great pride that I welcome you to Saraswathy Central College. Our school stands as a place where education, discipline, culture, and character come together to shape the future of our students. Guided by our meaningful motto “உழை உயர்”, we believe that sincere effort and hard work are the foundation of success."
            </blockquote>
            <div>
              <p className="text-school-navy font-bold text-base">Mr. A. Kanagaderan (S.L.P.S - 1)</p>
              <p className="text-slate-500 text-xs uppercase tracking-wider">Principal, Saraswathy Central College</p>
            </div>
            <div className="pt-2">
              <Link to="/about#principal-message" className="inline-flex items-center gap-1.5 text-school-navy hover:text-school-gold font-extrabold text-sm tracking-wide uppercase transition-colors">
                <span>Read Full Message</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Academics Overview */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Academic Excellence" 
            subtitle="Providing structural academic pathways that empower students to discover their ultimate potential." 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoCard 
              icon={GraduationCap}
              title="Primary & Junior Education"
              description="Nurturing curiosity, literacy, numeracy, and strong core values in young minds from Grades 1 to 9. Focusing on foundational learning and positive behavioral traits."
            />
            <InfoCard 
              icon={BookOpen}
              title="Senior Secondary Stream"
              description="Preparing students for G.C.E. Ordinary Level exams (Grades 10-11). Developing critical problem-solving skills in Mathematics, Sciences, Languages, and Humanities."
            />
            <InfoCard 
              icon={Trophy}
              title="Advanced Level Streams"
              description="Comprehensive specialized streams in Science (Biology/Physics), Commerce, Arts, and Technology. Facilitating path to premium universities and research institutions."
            />
          </div>

          <div className="text-center mt-12">
            <Link to="/academics" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-school-navy hover:bg-school-navy hover:text-school-gold text-school-navy text-sm font-bold rounded-xl transition-all cursor-pointer">
              <span>Explore Curriculum Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Achievements Counter Bar */}
      <section className="py-16 bg-slate-900 text-white px-6 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-school-navy-dark/95 z-[1]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <AchievementCounter endValue="90" suffix="+" label="Years of Legacy" icon={Award} />
            <AchievementCounter endValue="1000" suffix="+" label="Active Students" icon={Users} />
            <AchievementCounter endValue="60" suffix="+" label="Expert Teachers" icon={GraduationCap} />
            <AchievementCounter endValue="50" suffix="+" label="Annual Events" icon={Calendar} />
            <AchievementCounter endValue="25" suffix="+" label="Clubs & Societies" icon={Trophy} />
          </div>
        </div>
      </section>

      {/* 7. Latest Events and News */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
            <SectionTitle 
              title="Events & Campus News" 
              subtitle="Stay informed about our major achievements, upcoming programs, and recent highlights."
              align="left"
            />
            <Link to="/events" className="inline-flex items-center gap-1.5 text-school-navy hover:text-school-gold font-extrabold text-sm tracking-wide uppercase transition-colors pb-6 md:pb-0">
              <span>View All Events</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(events.length > 0 ? events : newsPreview).map((item) => (
              <NewsCard 
                key={item.id}
                image={item.image}
                date={item.date}
                category={item.category}
                title={item.title}
                description={item.description}
                fullContent={item.full_content || item.fullContent}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Clubs & Societies Preview */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-school-gold font-extrabold text-sm uppercase tracking-widest block font-semibold">
              Co-Curricular Pride
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-school-navy tracking-tight leading-tight">
              Vibrant Clubs and Student Societies
            </h2>
            <div className="h-1.5 w-16 bg-school-gold rounded-full" />
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Education goes beyond textbooks. Our college hosts more than 25 active clubs and student associations covering Literary Forums (Tamil, English, Sinhala), Scientific Societies, ICT Clubs, Environmental Teams, and Leadership organizations like the Prefect Board.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              These networks teach leadership, teamwork, public speaking, and project execution. Students participate in district and national level debates, coding challenges, and cultural festivals.
            </p>
            <div className="pt-2">
              <Link to="/clubs" className="inline-flex items-center gap-2 px-6 py-3 bg-school-navy hover:bg-school-navy-light text-white hover:text-school-gold text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer">
                <span>Browse All Clubs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-3 group hover:border-school-gold hover:bg-white transition-all">
              <div className="w-10 h-10 bg-school-navy/10 text-school-navy group-hover:bg-school-navy group-hover:text-school-gold rounded-lg flex items-center justify-center transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-school-navy text-lg">Prefect Board</h4>
              <p className="text-xs text-slate-500">Maintaining campus discipline, organizing principal initiatives, and mentoring juniors.</p>
            </div>
            
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-3 group hover:border-school-gold hover:bg-white transition-all">
              <div className="w-10 h-10 bg-school-navy/10 text-school-navy group-hover:bg-school-navy group-hover:text-school-gold rounded-lg flex items-center justify-center transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-school-navy text-lg">Literary Associations</h4>
              <p className="text-xs text-slate-500">Celebrating language, poetry, drama, and hosting state-wide writing competitions.</p>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-3 group hover:border-school-gold hover:bg-white transition-all">
              <div className="w-10 h-10 bg-school-navy/10 text-school-navy group-hover:bg-school-navy group-hover:text-school-gold rounded-lg flex items-center justify-center transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-school-navy text-lg">Science Society</h4>
              <p className="text-xs text-slate-500">Fostering research curiosity, organizing exhibitions, and science trivia panels.</p>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-3 group hover:border-school-gold hover:bg-white transition-all">
              <div className="w-10 h-10 bg-school-navy/10 text-school-navy group-hover:bg-school-navy group-hover:text-school-gold rounded-lg flex items-center justify-center transition-colors">
                <Trophy className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-school-navy text-lg">ICT Club</h4>
              <p className="text-xs text-slate-500">Engaging in web designing, scratch algorithms, competitive programming, and robotics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Gallery Preview */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
            <SectionTitle 
              title="Campus Showcase" 
              subtitle="Peek into our dynamic academic environment and vibrant school celebrations."
              align="left"
            />
            <Link to="/gallery" className="inline-flex items-center gap-1.5 text-school-navy hover:text-school-gold font-extrabold text-sm tracking-wide uppercase transition-colors pb-6 md:pb-0">
              <span>Enter Full Gallery</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </div>

          <GalleryGrid limit={4} />
        </div>
      </section>

      {/* 10. Admissions Call-To-Action (CTA) */}
      <section className="py-20 bg-slate-900 text-white px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-school-navy-dark/95 z-[1]" />
        {/* Glow patterns */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-school-gold/10 rounded-full blur-[100px] z-[2]" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-school-gold font-extrabold text-sm uppercase tracking-widest block font-semibold">
            Inquire for Admissions (School Year 2026/2027)
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Shape Your Child's Future Today
          </h2>
          <div className="h-1 w-20 bg-school-gold mx-auto" />
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            We welcome inquiries for student admission transfers and advanced level specialized academic streams. Contact our administrative office to guide you through the process.
          </p>
          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-8 py-4 bg-school-gold hover:bg-school-gold-dark text-school-navy font-bold rounded-xl transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base">
              Contact Admin Office
            </Link>
            <Link to="/about" className="px-8 py-4 border-2 border-white hover:border-school-gold hover:text-school-gold text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base">
              About Our School
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Contact / Location Section Preview */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-school-gold font-extrabold text-sm uppercase tracking-widest block font-semibold">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-school-navy tracking-tight leading-tight">
              We Welcome Your Visit
            </h2>
            <div className="h-1.5 w-16 bg-school-gold rounded-full" />
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Have questions regarding admissions, extracurricular programs, or past-pupil associations? Our front desk team is ready to assist you.
            </p>
            
            <ul className="space-y-4 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-school-gold mt-1 flex-shrink-0" />
                <span className="text-slate-700">
                  Saraswathy Central College, Mahiyanganaya Road, Badulla, Uva Province, Sri Lanka.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-school-gold flex-shrink-0" />
                <span className="text-slate-700">+94 21 222 1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-school-gold flex-shrink-0" />
                <span className="text-slate-700">info@saraswathycc.edu.lk</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-school-navy hover:bg-school-navy-light text-white hover:text-school-gold text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer">
                <span>View Full Contact Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 h-96 w-full bg-slate-100 rounded-3xl overflow-hidden shadow-md border border-slate-200">
            {/* Google Map Mock Embed (using beautiful visual style to mimic embedding) */}
            <div className="w-full h-full relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.2582845681615!2d80.20914841530733!3d9.744111393026362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe05763ca7b96b%3A0xe54ef3945f3c051a!2sSaraswathy%20Central%20College!5e0!3m2!1sen!2slk!4v1655000000000!5m2!1sen!2slk" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Saraswathy Central College Map"
                className="grayscale opacity-90 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

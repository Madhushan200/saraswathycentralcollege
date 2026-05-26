import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { ShieldAlert, Users, Trophy, Sparkles, Smile, Compass, BookOpen, Star } from 'lucide-react';

const StudentLife = () => {
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

      {/* Daily Routine Summary */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm bg-slate-50 grid grid-cols-1 md:grid-cols-3 gap-8">
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

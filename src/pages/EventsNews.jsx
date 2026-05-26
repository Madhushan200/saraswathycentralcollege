import React, { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import NewsCard from '../components/NewsCard';
import { supabase, isMockEnabled } from '../supabaseClient';

const EventsNews = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (isMockEnabled) {
          const localEvents = localStorage.getItem('saraswathy_events');
          if (localEvents) {
            setEvents(JSON.parse(localEvents));
          }
          return;
        }

        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('created_at', { ascending: false });

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
    fetchEvents();
  }, []);

  const fallbackEvents = [
    {
      id: 1,
      image: "/gallery-3.jpg",
      date: "May 15, 2026",
      category: "Academic",
      title: "Annual Prize Giving Ceremony",
      description: "Honoring academic giants and special achievers on our grand stage. Top scorers of Advanced Level and Ordinary Level examinations are celebrated.",
      fullContent: "The Annual Prize Giving Ceremony of Saraswathy Central College was held with grandeur at the College Main Hall. The event was graced by distinguished past pupils and senior educational administrative officials. A total of 150 students received medals, certificates, and trophies for outstanding achievements in academics, sports, and co-curricular programs. Special awards were presented to island-ranked students in Advanced Level Streams, signifying our commitment to premium educational standards."
    },
    {
      id: 2,
      image: "/sports.jpg",
      date: "April 28, 2026",
      category: "Sports",
      title: "Sports Meet Celebration",
      description: "A grand showcase of athletic talents, sportsmanship, and house teamwork at the college grounds. Visuals include drill displays and track events.",
      fullContent: "The Annual Inter-House Sports Meet was celebrated with high energy at the college playground. The chief guest, a prominent national athlete and alumnus, declared the meet open. Following intense competition across track and field events, Bharathi House secured the overall championship, with Ramanujan House as runners-up. The event culminated in a colorful band display and march past by the Senior Prefect Council."
    },
    {
      id: 3,
      image: "/cultural-event.jpg",
      date: "March 12, 2026",
      category: "Cultural Programs",
      title: "Cultural Day Program",
      description: "Students representing various clubs presented traditional dances, music recitals, and visual art pieces highlighting rich regional heritage.",
      fullContent: "Saraswathy Central College hosted its Cultural Day Program, bringing alive the diverse cultural heritage of Sri Lanka. The program included traditional dance forms, instrumental recitals, and Tamil and Sinhala literature recitals. Alongside the stage performances, the Student Art Society hosted an exhibition showcasing beautiful oil paintings, sketches, and handicrafts created entirely by our students, drawing appreciation from parents and well-wishers."
    },
    {
      id: 4,
      image: "/gallery-1.jpg",
      date: "February 20, 2026",
      category: "Competitions",
      title: "Annual Science Exhibition",
      description: "A massive science fair displaying models of robotics, renewable energy systems, chemistry setups, and eco-friendly farming designs.",
      fullContent: "The Annual Science & Technology Exhibition of Saraswathy Central College drew hundreds of visitors, including students from neighboring schools. Working under the guidance of our science faculty, students displayed working prototypes of solar irrigators, smart home automation sensors, and models representing biological cells. The ICT club also showcased web development frameworks and small video games created using Scratch and JavaScript."
    },
    {
      id: 5,
      image: "/principal.jpg",
      date: "January 18, 2026",
      category: "Leadership",
      title: "Prefects’ Investiture Ceremony",
      description: "Official badge pinning and pledge taking by the newly elected student leaders, pledging to safeguard discipline and code of conduct.",
      fullContent: "The Prefect Investiture Ceremony for the school year 2026 was held under the patronage of the Principal, Mr. S. Sivanesan. Eighty students from grades 11 and 13 were badged as Senior and Junior Prefects. The newly appointed Head Prefect took the oath of office, leading the board in promising to maintain school rules, coordinate student programs, and serve as role models of discipline and dedication."
    },
    {
      id: 6,
      image: "/school-building.jpg",
      date: "June 05, 2026",
      category: "Community Service",
      title: "Environmental Awareness Program",
      description: "Marking World Environment Day, students launched a clean campus drive and planted native trees around the municipality grounds.",
      fullContent: "In celebration of World Environment Day, the Environmental Club of Saraswathy Central College organized a series of community-centric activities. Students from grades 8 to 12 participated in a clean-up campaign targeting public spaces around the Karaveddy junction. Additionally, the college planted 50 native trees on school borders and hosted a seminar on waste management and single-use plastic reduction."
    }
  ];

  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* Banner */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-school-navy-dark/75 z-10" />
        <img src="/gallery-3.jpg" alt="Events Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center space-y-4">
          <span className="text-school-gold font-bold text-sm uppercase tracking-widest font-semibold block">
            Latest News
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Events & News
          </h1>
          <div className="h-1 w-20 bg-school-gold mx-auto" />
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionTitle 
            title="Campus Highlights & Upcoming Dates" 
            subtitle="Catch up with recent occurrences, major accomplishments, and official dates at Saraswathy Central College." 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(events.length > 0 ? events : fallbackEvents).map((event) => (
              <NewsCard 
                key={event.id}
                image={event.image}
                date={event.date}
                category={event.category}
                title={event.title}
                description={event.description}
                fullContent={event.full_content || event.fullContent}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsNews;

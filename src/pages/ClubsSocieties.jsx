import React, { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import ClubCard from '../components/ClubCard';
import { 
  ShieldCheck, Landmark, BookOpen, PenTool, Languages, 
  Atom, TrendingUp, Laptop, Leaf, Tv, Compass, PlusSquare, Trophy 
} from 'lucide-react';
import { supabase, isMockEnabled } from '../supabaseClient';

const ClubsSocieties = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        if (isMockEnabled) {
          const localClubs = localStorage.getItem('saraswathy_clubs');
          if (localClubs) {
            setClubs(JSON.parse(localClubs));
          }
          return;
        }

        const { data, error } = await supabase
          .from('clubs')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          setClubs(data);
        }
      } catch (err) {
        console.warn('Deferred clubs load:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClubs();
  }, []);

  const fallbackClubs = [
    {
      id: 1,
      name: "Prefect Board",
      icon: ShieldCheck,
      description: "The senior student leadership body responsible for maintaining campus discipline, representing the college at official events, coordinating student assemblies, and mentoring junior classes.",
      activities: ["Daily general assembly coordination", "Conducting disciplinary rounds", "Guiding junior students and guiding sports meet structures"],
      logo_url: "/gallery-2.jpg",
      banner_image: "/school-building.jpg",
      detailed_description: "The Prefect Board of Saraswathy Central College is the pinnacle of student leadership. Comprising the most exemplary students from grades 11 and 13, the board acts as the bridge between the administration, faculty, and the student body. Prefects are badged in a solemn Investiture Ceremony at the start of each academic year and take an oath of service and integrity. The board plays a vital role in organizing the annual Inter-House Sports Meet, managing daily general assemblies, enforcing the school code of conduct, and coordinating student welfare programs. Through their service, prefects build critical leadership, administrative, and public speaking skills.",
      head_name: "Master K. Ramanujan",
      head_title: "Head Prefect (2026)",
      head_image: "/principal.jpg",
      head_message: "Serving as the Head Prefect of Saraswathy Central College is a profound honor. Our duty is not just to maintain order, but to inspire our fellow students to achieve greatness. Under our motto 'உழை உயர்' (Rise through Effort), we strive to lead by example, fostering discipline, academic dedication, and a strong sense of community. I am immensely proud of the achievements of my fellow prefects this year and the legacy of service we pass on to the next generation.",
      head_achievements: [
        "Led the organization of the 2026 Annual Inter-House Sports Meet, introducing digitized scorekeeping.",
        "Initiated the 'Prefect Mentorship Program' pairing senior students with grade 6 juniors for peer academic support.",
        "Represented the college at the National Student Leadership Forum in Colombo, winning the Best Delegation award."
      ],
      gallery_years: [
        { "year": "2026", "images": ["/school-building.jpg", "/sports.jpg"] },
        { "year": "2025", "images": ["/gallery-1.jpg", "/cultural-event.jpg"] }
      ],
      member_lists: [
        {
          "year": "2026",
          "members": [
            "Master K. Ramanujan (Head Prefect)",
            "Miss S. Pavithra (Deputy Head Prefect)",
            "Master T. Arul (Senior Prefect - Games)",
            "Miss A. Janaki (Senior Prefect - Discipline)",
            "Master M. Kugan (Junior Prefect Coordinator)",
            "Miss V. Dharshini (Prefect)",
            "Master R. Senthan (Prefect)"
          ]
        },
        {
          "year": "2025",
          "members": [
            "Master M. Karthik (Head Prefect)",
            "Miss K. Shalini (Deputy Head Prefect)",
            "Master S. Kajendran (Senior Prefect - Games)",
            "Miss R. Anusha (Senior Prefect - Discipline)",
            "Master T. Jeyan (Prefect)",
            "Miss P. Priya (Prefect)"
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Student Parliament",
      icon: Landmark,
      description: "Mimicking national governance structures to teach administrative logic, policy debates, and democratic representation. Students raise suggestions and debate campus development matters.",
      activities: ["Term-based parliamentary sessions", "Debating student requests", "Drafting proposals for principal review"]
    },
    {
      id: 3,
      name: "Tamil Literary Association",
      icon: PenTool,
      description: "Safeguarding and celebrating the rich Tamil language, classical literature, poetry composition, and creative speech. Nurtures next-generation writers and orators.",
      activities: ["Annual Tamil Literary Festival coordination", "Poetry and debate tournaments", "Publishing the annual student journal 'Saraswathy'"]
    },
    {
      id: 4,
      name: "English Literary Association",
      icon: Languages,
      description: "Improving conversational eloquence, poetry writing, creative prose, and staging drama. Prepares students for national English Day competitions.",
      activities: ["Spelling bees and impromptu speech panels", "School play productions", "Writing workshops and reading clubs"]
    },
    {
      id: 5,
      name: "Sinhala Literary Association",
      icon: BookOpen,
      description: "Fostering bilingualism and celebrating Sinhala classical literature, traditional songs, and cultural history to build strong national unity.",
      activities: ["Bilingual speech contests", "Literary critiques and reading groups", "Inter-school cultural exchanges"]
    },
    {
      id: 6,
      name: "Science Society",
      icon: Atom,
      description: "Incubating scientific curiosity, physics models, biology research, and logical thinking. Organizes competitive science exhibitions.",
      activities: ["Fireside science fair models design", "Olympiad training and group revision panels", "Field trips to astronomical observatories"]
    },
    {
      id: 7,
      name: "Commerce Society",
      icon: TrendingUp,
      description: "Fostering entrepreneurial skills, basic accounting practices, and commercial market trends. Organizes career-path lectures and model trade fairs.",
      activities: ["Annual Commerce Day and trade models expo", "Seminars on inflation and business metrics", "Filing mock account statements"]
    },
    {
      id: 8,
      name: "ICT Club",
      icon: Laptop,
      description: "Fostering computational skills, software coding (HTML/JS/Python), graphic design, and basic robotics. Manages technical setups for events.",
      activities: ["Weekly programming bootcamps", "School web portal maintenance support", "Scratch algorithmic competitions"]
    },
    {
      id: 9,
      name: "Environmental Club",
      icon: Leaf,
      description: "Nurturing biodiversity awareness, eco-friendly farming practices, recycling systems, and local reforestation campaigns.",
      activities: ["World Environment Day sapling planting", "Setting up school herbal gardens", "Waste collection and segregation systems"]
    },
    {
      id: 10,
      name: "Media Unit",
      icon: Tv,
      description: "The official broadcasting body of the college. Responsible for managing sound systems, photography coverage, and campus newsletters.",
      activities: ["Announcements and morning sound setup", "Filming and photography of events", "Managing the college bulletin boards"]
    },
    {
      id: 11,
      name: "Scouts Group",
      icon: Compass,
      description: "Building physical fitness, outdoor survival skills, first-aid knowledge, and character integrity based on scouting guidelines.",
      activities: ["Weekend camping and trekking drills", "Pioneering structures construction", "Assisting crowd control in local festivals"]
    },
    {
      id: 12,
      name: "St. John Ambulance",
      icon: PlusSquare,
      description: "The premier first-aid student division, training members in cardiopulmonary resuscitation (CPR), wound treatment, and emergency evacuation.",
      activities: ["Emergency first-aid training cycles", "Setting up medical aid tents at sports meets", "Health awareness lectures for juniors"]
    },
    {
      id: 13,
      name: "Sports Clubs Association",
      icon: Trophy,
      description: "The collective association of cricket, football, chess, and athletic clubs. Organizes training camps and matches against rival schools.",
      activities: ["Inter-house championship fixtures", "Physical fitness endurance routines", "Hosting guest coaches and alumni matches"]
    }
  ];

  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* Banner */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-school-navy-dark/75 z-10" />
        <img src="/gallery-2.jpg" alt="Clubs Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center space-y-4">
          <span className="text-school-gold font-bold text-sm uppercase tracking-widest font-semibold block">
            Student Organizations
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Clubs & Societies
          </h1>
          <div className="h-1 w-20 bg-school-gold mx-auto" />
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionTitle 
            title="Nurturing Diverse Talents" 
            subtitle="Participating in clubs is key to character building at Saraswathy Central College. Discover our rich network of student organizations." 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(clubs.length > 0 ? clubs : fallbackClubs).map((club, idx) => (
              <ClubCard 
                key={idx}
                id={club.id || idx + 1}
                name={club.name}
                icon={club.icon_name || club.icon}
                description={club.description}
                activities={club.activities}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClubsSocieties;

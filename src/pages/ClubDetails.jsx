import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, isMockEnabled } from '../supabaseClient';
import { 
  ArrowLeft, ShieldCheck, Calendar, Users, Award, 
  Image as ImageIcon, BookOpen, Clock, Heart, ChevronRight,
  User, CheckCircle, Info
} from 'lucide-react';
import ClubIcon from '../components/ClubIcon';

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRosterYear, setActiveRosterYear] = useState('');
  const [activeGalleryYear, setActiveGalleryYear] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Fallback clubs data (matches ClubsSocieties fallback list + rich Board of Prefects data)
  const fallbackClubs = [
    {
      id: 1,
      name: "Prefect Board",
      icon_name: "ShieldCheck",
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
      leadership_history: [
        {
          "year": "2026",
          "name": "Master K. Ramanujan",
          "title": "Head Prefect",
          "image": "/principal.jpg",
          "message": "Serving as the Head Prefect of Saraswathy Central College is a profound honor. Our duty is not just to maintain order, but to inspire our fellow students to achieve greatness. Under our motto 'உழை உயர்' (Rise through Effort), we strive to lead by example, fostering discipline, academic dedication, and a strong sense of community. I am immensely proud of the achievements of my fellow prefects this year and the legacy of service we pass on to the next generation.",
          "achievements": [
            "Led the organization of the 2026 Annual Inter-House Sports Meet, introducing digitized scorekeeping.",
            "Initiated the 'Prefect Mentorship Program' pairing senior students with grade 6 juniors for peer academic support.",
            "Represented the college at the National Student Leadership Forum in Colombo, winning the Best Delegation award."
          ]
        },
        {
          "year": "2025",
          "name": "Master M. Karthik",
          "title": "Head Prefect",
          "image": "/principal.jpg",
          "message": "It was a privilege to lead the board during our 90th anniversary year. We focused on community outreach and strengthening school discipline through positive reinforcement, building a legacy of service.",
          "achievements": [
            "Organized the first provincial school leadership symposium with 15 participating schools.",
            "Initiated the campus plastic-free green pledge in collaboration with the Environmental Club."
          ]
        }
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
      icon_name: "Landmark",
      description: "Mimicking national governance structures to teach administrative logic, policy debates, and democratic representation. Students raise suggestions and debate campus development matters.",
      activities: ["Term-based parliamentary sessions", "Debating student requests", "Drafting proposals for principal review"]
    },
    {
      id: 3,
      name: "Tamil Literary Association",
      icon_name: "PenTool",
      description: "Safeguarding and celebrating the rich Tamil language, classical literature, poetry composition, and creative speech. Nurtures next-generation writers and orators.",
      activities: ["Annual Tamil Literary Festival coordination", "Poetry and debate tournaments", "Publishing the annual student journal 'Saraswathy'"]
    },
    {
      id: 4,
      name: "English Literary Association",
      icon_name: "Languages",
      description: "Improving conversational eloquence, poetry writing, creative prose, and staging drama. Prepares students for national English Day competitions.",
      activities: ["Spelling bees and impromptu speech panels", "School play productions", "Writing workshops and reading clubs"]
    },
    {
      id: 5,
      name: "Sinhala Literary Association",
      icon_name: "BookOpen",
      description: "Fostering bilingualism and celebrating Sinhala classical literature, traditional songs, and cultural history to build strong national unity.",
      activities: ["Bilingual speech contests", "Literary critiques and reading groups", "Inter-school cultural exchanges"]
    },
    {
      id: 6,
      name: "Science Society",
      icon_name: "Atom",
      description: "Incubating scientific curiosity, physics models, biology research, and logical thinking. Organizes competitive science exhibitions.",
      activities: ["Fireside science fair models design", "Olympiad training and group revision panels", "Field trips to astronomical observatories"]
    },
    {
      id: 7,
      name: "Commerce Society",
      icon_name: "TrendingUp",
      description: "Fostering entrepreneurial skills, basic accounting practices, and commercial market trends. Organizes career-path lectures and model trade fairs.",
      activities: ["Annual Commerce Day and trade models expo", "Seminars on inflation and business metrics", "Filing mock account statements"]
    },
    {
      id: 8,
      name: "ICT Club",
      icon_name: "Laptop",
      description: "Fostering computational skills, software coding (HTML/JS/Python), graphic design, and basic robotics. Manages technical setups for events.",
      activities: ["Weekly programming bootcamps", "School web portal maintenance support", "Scratch algorithmic competitions"]
    },
    {
      id: 9,
      name: "Environmental Club",
      icon_name: "Leaf",
      description: "Nurturing biodiversity awareness, eco-friendly farming practices, recycling systems, and local reforestation campaigns.",
      activities: ["World Environment Day sapling planting", "Setting up school herbal gardens", "Waste collection and segregation systems"]
    },
    {
      id: 10,
      name: "Media Unit",
      icon_name: "Tv",
      description: "The official broadcasting body of the college. Responsible for managing sound systems, photography coverage, and campus newsletters.",
      activities: ["Announcements and morning sound setup", "Filming and photography of events", "Managing the college bulletin boards"]
    },
    {
      id: 11,
      name: "Scouts Group",
      icon_name: "Compass",
      description: "Building physical fitness, outdoor survival skills, first-aid knowledge, and character integrity based on scouting guidelines.",
      activities: ["Weekend camping and trekking drills", "Pioneering structures construction", "Assisting crowd control in local festivals"]
    },
    {
      id: 12,
      name: "St. John Ambulance",
      icon_name: "PlusSquare",
      description: "The premier first-aid student division, training members in cardiopulmonary resuscitation (CPR), wound treatment, and emergency evacuation.",
      activities: ["Emergency first-aid training cycles", "Setting up medical aid tents at sports meets", "Health awareness lectures for juniors"]
    },
    {
      id: 13,
      name: "Sports Clubs Association",
      icon_name: "Trophy",
      description: "The collective association of cricket, football, chess, and athletic clubs. Organizes training camps and matches against rival schools.",
      activities: ["Inter-house championship fixtures", "Physical fitness endurance routines", "Hosting guest coaches and alumni matches"]
    }
  ];

  useEffect(() => {
    const fetchClubDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
          throw new Error('Invalid club identifier.');
        }

        if (isMockEnabled) {
          const localClubs = localStorage.getItem('saraswathy_clubs');
          const allClubs = localClubs ? JSON.parse(localClubs) : fallbackClubs;
          const foundClub = allClubs.find(c => parseInt(c.id, 10) === parsedId);
          if (!foundClub) {
            throw new Error('Club not found in fallback database.');
          }
          setClub(foundClub);
          initializeYears(foundClub);
          return;
        }

        if (!supabase) {
          // Fallback to local array if Supabase is unavailable
          const foundClub = fallbackClubs.find(c => c.id === parsedId);
          if (!foundClub) {
            throw new Error('Club not found in fallback array.');
          }
          setClub(foundClub);
          initializeYears(foundClub);
          return;
        }

        const { data, error: dbError } = await supabase
          .from('clubs')
          .select('*')
          .eq('id', parsedId)
          .single();

        if (dbError) throw dbError;

        if (data) {
          // Parse JSON lists if stored as stringified JSON in database
          const formattedClub = {
            ...data,
            activities: Array.isArray(data.activities) ? data.activities : JSON.parse(data.activities || '[]'),
            head_achievements: Array.isArray(data.head_achievements) ? data.head_achievements : JSON.parse(data.head_achievements || '[]'),
            gallery_years: Array.isArray(data.gallery_years) ? data.gallery_years : JSON.parse(data.gallery_years || '[]'),
            member_lists: Array.isArray(data.member_lists) ? data.member_lists : JSON.parse(data.member_lists || '[]'),
            leadership_history: Array.isArray(data.leadership_history) ? data.leadership_history : JSON.parse(data.leadership_history || '[]')
          };
          setClub(formattedClub);
          initializeYears(formattedClub);
        } else {
          // Fallback to mock if nothing in DB
          const foundClub = fallbackClubs.find(c => c.id === parsedId);
          if (!foundClub) {
            throw new Error('Club record not found.');
          }
          setClub(foundClub);
          initializeYears(foundClub);
        }
      } catch (err) {
        console.error('Error fetching club details:', err);
        // Direct fallback on failure
        const parsedId = parseInt(id, 10);
        const found = fallbackClubs.find(c => c.id === parsedId);
        if (found) {
          setClub(found);
          initializeYears(found);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [id]);

  const initializeYears = (clubData) => {
    if (clubData.member_lists && clubData.member_lists.length > 0) {
      setActiveRosterYear(clubData.member_lists[0].year);
    }
    if (clubData.gallery_years && clubData.gallery_years.length > 0) {
      setActiveGalleryYear(clubData.gallery_years[0].year);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 md:pt-28 min-h-screen flex flex-col justify-center items-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-school-navy"></div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading club portal...</p>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="pt-24 md:pt-28 min-h-screen flex flex-col justify-center items-center bg-slate-50 px-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-xl space-y-6">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
            <Info className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-school-navy">Club Not Found</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              The club or society portal you are trying to visit does not exist or has been disabled by the administrator.
            </p>
          </div>
          <Link 
            to="/clubs" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 w-full bg-school-navy hover:bg-school-navy-light text-white font-bold rounded-xl transition-all shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Clubs</span>
          </Link>
        </div>
      </div>
    );
  }

  // Get active roster list
  const activeRoster = club.member_lists?.find(r => r.year === activeRosterYear)?.members || [];
  // Get active gallery images
  const activeGalleryImages = club.gallery_years?.find(g => g.year === activeGalleryYear)?.images || [];
  
  // Resolve active leader for the current year tab from leadership history
  const activeLeader = club.leadership_history?.find(l => l.year === activeRosterYear) || null;
  const resolvedLeader = activeLeader || (club.head_name ? {
    name: club.head_name,
    title: club.head_title || 'Leader',
    image: club.head_image,
    message: club.head_message,
    achievements: club.head_achievements
  } : null);

  return (
    <div className="pt-24 md:pt-28 font-sans bg-slate-50 min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-[250px] md:h-[350px] bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-school-navy-dark/95 via-school-navy-dark/70 to-transparent z-10" />
        <img 
          src={club.banner_image || "/school-building.jpg"} 
          alt={club.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        
        <div className="absolute bottom-0 inset-x-0 z-20 pb-8 md:pb-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Logo / Badge */}
            <div className="w-20 h-20 md:w-28 md:h-28 bg-white border-4 border-school-gold shadow-lg rounded-2xl flex items-center justify-center text-school-navy relative z-25 overflow-hidden flex-shrink-0">
              {club.logo_url ? (
                <img src={club.logo_url} alt="Club Logo" className="w-full h-full object-cover" />
              ) : (
                <ClubIcon name={club.icon_name} className="w-10 h-10 md:w-14 md:h-14 text-school-navy" />
              )}
            </div>

            <div className="space-y-2 md:mb-2 text-left">
              <Link 
                to="/clubs" 
                className="inline-flex items-center gap-1 text-xs font-bold text-school-gold uppercase tracking-wider hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Organizations
              </Link>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                {club.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="py-12 md:py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Description & Activities */}
          <div className="lg:col-span-7 space-y-8 md:space-y-12">
            
            {/* Description */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm text-left">
              <h2 className="text-2xl font-black text-school-navy mb-4 border-b border-slate-100 pb-3">
                Overview & Purpose
              </h2>
              <p className="text-slate-700 leading-relaxed text-base md:text-lg mb-6">
                {club.detailed_description || club.description}
              </p>

              {/* Activities */}
              {club.activities && club.activities.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-school-gold uppercase tracking-widest flex items-center gap-2">
                    <Award className="w-4 h-4" /> Core Commitments & Activities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {club.activities.map((act, index) => (
                      <div key={index} className="flex items-start gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-2xs">
                        <CheckCircle className="w-5 h-5 text-school-gold flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base font-semibold text-slate-700 leading-tight">
                          {act}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Year-wise Roster (Prefect/Member Lists) */}
            {club.member_lists && club.member_lists.length > 0 ? (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-school-navy flex items-center gap-2">
                      <Users className="w-6 h-6 text-school-gold" /> Member Roster
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm">Historical archive of leaders and council representatives</p>
                  </div>

                  {/* Year Tabs */}
                  <div className="flex flex-wrap gap-2">
                    {club.member_lists.map(list => (
                      <button
                        key={list.year}
                        onClick={() => setActiveRosterYear(list.year)}
                        className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                          activeRosterYear === list.year 
                            ? 'bg-school-navy text-school-gold shadow-md' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {list.year}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Member Roster List */}
                {activeRoster.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeRoster.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100/80 p-3.5 border border-slate-150 rounded-xl transition-all">
                        <div className="w-8 h-8 rounded-full bg-school-navy/10 text-school-navy flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {member.charAt(0)}
                        </div>
                        <span className="text-slate-700 font-bold text-sm md:text-base">{member}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm italic">No roster details found for this academic year.</p>
                )}
              </div>
            ) : (
              // Generic fallback notice
              <div className="bg-slate-150 border border-slate-200/50 rounded-3xl p-6 md:p-8 shadow-inner text-left flex items-start gap-4">
                <Info className="w-6 h-6 text-school-navy flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-school-navy">Roster Compilation in Progress</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    The historical rosters and active member directories for {club.name} are being compiled by the College Media Unit and will be available shortly.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Leadership Card & Year-wise Gallery */}
          <div className="lg:col-span-5 space-y-8 md:space-y-12">
            
            {/* Leadership Message Card */}
            {resolvedLeader ? (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-school-gold/10 rounded-bl-full flex items-center justify-center flex-shrink-0 -z-10" />
                
                <h3 className="text-lg font-bold text-school-gold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <User className="w-5 h-5" /> Leadership Message ({activeRosterYear})
                </h3>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
                  {/* Leader Image */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-school-gold flex-shrink-0 shadow-md">
                    <img 
                      src={resolvedLeader.image || "/principal.jpg"} 
                      alt={resolvedLeader.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-xl font-bold text-school-navy">{resolvedLeader.name}</h4>
                    <p className="text-xs font-bold text-school-gold uppercase tracking-wider">{resolvedLeader.title || 'Leader'}</p>
                    <p className="text-[11px] text-slate-500 font-medium">Saraswathy Central College</p>
                  </div>
                </div>

                {/* Message Speech bubble */}
                {resolvedLeader.message && (
                  <blockquote className="bg-slate-50 border-l-4 border-school-gold p-4 rounded-r-xl italic font-serif text-slate-700 text-sm md:text-base mb-6 leading-relaxed relative">
                    "{resolvedLeader.message}"
                  </blockquote>
                )}

                {/* Leader Achievements */}
                {resolvedLeader.achievements && resolvedLeader.achievements.length > 0 && (
                  <div className="space-y-3">
                    <h5 className="text-xs font-black uppercase text-school-navy tracking-wider border-b border-slate-100 pb-1.5">
                      Key Contributions & Achievements
                    </h5>
                    <ul className="space-y-2">
                      {resolvedLeader.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-600">
                          <ChevronRight className="w-4 h-4 text-school-gold flex-shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : null}

            {/* Gallery Year-wise */}
            {club.gallery_years && club.gallery_years.length > 0 ? (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-school-navy flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-school-gold" /> Photo Gallery
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm">Activities & historic achievements</p>
                  </div>

                  {/* Gallery Year tabs */}
                  <div className="flex flex-wrap gap-1.5">
                    {club.gallery_years.map(g => (
                      <button
                        key={g.year}
                        onClick={() => setActiveGalleryYear(g.year)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                          activeGalleryYear === g.year 
                            ? 'bg-school-navy text-school-gold shadow-sm' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {g.year}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photo Grid */}
                {activeGalleryImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {activeGalleryImages.map((img, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setSelectedImage(img)}
                        className="relative aspect-video rounded-xl overflow-hidden cursor-zoom-in border border-slate-100 group shadow-2xs hover:shadow-md transition-all duration-200"
                      >
                        <img 
                          src={img} 
                          alt="Gallery item" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                          View Large
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm italic">No gallery images found for this academic year.</p>
                )}
              </div>
            ) : null}

          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 transition-all duration-300 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            <img src={selectedImage} alt="Large View" className="object-contain w-full h-full rounded-xl" />
            <button 
              className="absolute top-4 right-4 bg-black/55 text-white hover:bg-black/80 w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg shadow-md cursor-pointer transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubDetails;

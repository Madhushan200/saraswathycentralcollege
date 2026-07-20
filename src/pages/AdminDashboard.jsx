import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isMockEnabled } from '../supabaseClient';
import { 
  LogOut, Plus, Edit, Trash2, Calendar, Image as ImageIcon, 
  Users, FileText, CheckCircle2, AlertCircle, Upload, X, ExternalLink, Award
} from 'lucide-react';
import ClubIcon from '../components/ClubIcon';

const AVAILABLE_ICONS = [
  'ShieldCheck', 'Landmark', 'BookOpen', 'PenTool', 'Languages', 
  'Atom', 'TrendingUp', 'Laptop', 'Leaf', 'Tv', 'Compass', 'PlusSquare', 'Trophy'
];

const GALLERY_CATEGORIES = [
  "School Building", "Events", "Sports", "Cultural Programs", "Students", "Achievements", "Clubs"
];

const EVENT_CATEGORIES = [
  "Academic", "Sports", "Cultural Programs", "Competitions", "Leadership", "Community Service", "General"
];

// Seed constants for local mock fallback
const SEED_EVENTS = [
  { id: 1, image: "/gallery-3.jpg", date: "May 15, 2026", category: "Academic", title: "Annual Prize Giving Ceremony", description: "Honoring academic giants and special achievers on our grand stage. Top scorers of Advanced Level and Ordinary Level examinations are celebrated.", full_content: "The Annual Prize Giving Ceremony of Saraswathy Central College was held with grandeur at the College Main Hall. The event was graced by distinguished past pupils and senior educational administrative officials. A total of 150 students received medals, certificates, and trophies for outstanding achievements in academics, sports, and co-curricular programs. Special awards were presented to island-ranked students in Advanced Level Streams, signifying our commitment to premium educational standards." },
  { id: 2, image: "/sports.jpg", date: "April 28, 2026", category: "Sports", title: "Sports Meet Celebration", description: "A grand showcase of athletic talents, sportsmanship, and house teamwork at the college grounds. Visuals include drill displays and track events.", full_content: "The Annual Inter-House Sports Meet was celebrated with high energy at the college playground. The chief guest, a prominent national athlete and alumnus, declared the meet open. Following intense competition across track and field events, Bharathi House secured the overall championship, with Ramanujan House as runners-up. The event culminated in a colorful band display and march past by the Senior Prefect Council." },
  { id: 3, image: "/cultural-event.jpg", date: "March 12, 2026", category: "Cultural Programs", title: "Cultural Day Program", description: "Students representing various clubs presented traditional dances, music recitals, and visual art pieces highlighting rich regional heritage.", full_content: "Saraswathy Central College hosted its Cultural Day Program, bringing alive the diverse cultural heritage of Sri Lanka. The program included traditional dance forms, instrumental recitals, and Tamil and Sinhala literature recitals. Alongside the stage performances, the Student Art Society hosted an exhibition showcasing beautiful oil paintings, sketches, and handicrafts created entirely by our students, drawing appreciation from parents and well-wishers." },
  { id: 4, image: "/gallery-1.jpg", date: "February 20, 2026", category: "Competitions", title: "Annual Science Exhibition", description: "A massive science fair displaying models of robotics, renewable energy systems, chemistry setups, and eco-friendly farming designs.", full_content: "The Annual Science & Technology Exhibition of Saraswathy Central College drew hundreds of visitors, including students from neighboring schools. Working under the guidance of our science faculty, students displayed working prototypes of solar irrigators, smart home automation sensors, and models representing biological cells. The ICT club also showcased web development frameworks and small video games created using Scratch and JavaScript." },
  { id: 5, image: "/principal.jpg", date: "January 18, 2026", category: "Leadership", title: "Prefects’ Investiture Ceremony", description: "Official badge pinning and pledge taking by the newly elected student leaders, pledging to safeguard discipline and code of conduct.", full_content: "The Prefect Investiture Ceremony for the school year 2026 was held under the patronage of the Principal, Mr. A. Kanagaderan (S.L.P.S - 1). Eighty students from grades 11 and 13 were badged as Senior and Junior Prefects. The newly appointed Head Prefect took the oath of office, leading the board in promising to maintain school rules, coordinate student programs, and serve as role models of discipline and dedication." },
  { id: 6, image: "/school-building.jpg", date: "June 05, 2026", category: "Community Service", title: "Environmental Awareness Program", description: "Marking World Environment Day, students launched a clean campus drive and planted native trees around the municipality grounds.", full_content: "In celebration of World Environment Day, the Environmental Club of Saraswathy Central College organized a series of community-centric activities. Students from grades 8 to 12 participated in a clean-up campaign targeting public spaces around the Badulla junction. Additionally, the college planted 50 native trees on school borders and hosted a seminar on waste management and single-use plastic reduction." }
];

const SEED_GALLERY = [
  { id: 1, title: "Majestic Main Administration Block", category: "School Building", image: "/school-building.jpg", description: "Our historic main building symbolizing over nine decades of academic excellence." },
  { id: 2, title: "Interactive Chemistry Lab Session", category: "Students", image: "/gallery-1.jpg", description: "Senior secondary students performing controlled experiments under faculty guidance." },
  { id: 3, title: "Inter-House Cricket Championship Match", category: "Sports", image: "/sports.jpg", description: "The college first XI team showing intense dedication during the finals." },
  { id: 4, title: "Traditional Ves Dance Performance", category: "Cultural Programs", image: "/cultural-event.jpg", description: "Vibrant showcase of traditional dances during the Annual Cultural Day." },
  { id: 5, title: "Annual Prize Giving Ceremony", category: "Events", image: "/gallery-3.jpg", description: "Honoring academic giants and special achievers on our grand stage." },
  { id: 6, title: "Students Programming in the ICT Hub", category: "Clubs", image: "/gallery-2.jpg", description: "ICT Club members collaborating on soft-skills coding assignments." },
  { id: 7, title: "National Olympiad Team Finalists", category: "Achievements", image: "/students.jpg", description: "Celebrating the intellectual breakthroughs of our junior scientists." },
  { id: 8, title: "Principal & Staff Assembly Meet", category: "Events", image: "/principal.jpg", description: "A meeting of minds driving strategic leadership for the college." }
];

const SEED_CLUBS = [
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
  { id: 2, name: "Student Parliament", icon_name: "Landmark", description: "Mimicking national governance structures to teach administrative logic, policy debates, and democratic representation. Students raise suggestions and debate campus development matters.", activities: ["Term-based parliamentary sessions", "Debating student requests", "Drafting proposals for principal review"] },
  { id: 3, name: "Tamil Literary Association", icon_name: "PenTool", description: "Safeguarding and celebrating the rich Tamil language, classical literature, poetry composition, and creative speech. Nurtures next-generation writers and orators.", activities: ["Annual Tamil Literary Festival coordination", "Poetry and debate tournaments", "Publishing the annual student journal 'Saraswathy'"] },
  { id: 4, name: "English Literary Association", icon_name: "Languages", description: "Improving conversational eloquence, poetry writing, creative prose, and staging drama. Prepares students for national English Day competitions.", activities: ["Spelling bees and impromptu speech panels", "School play productions", "Writing workshops and reading clubs"] },
  { id: 5, name: "Sinhala Literary Association", icon_name: "BookOpen", description: "Fostering bilingualism and celebrating Sinhala classical literature, traditional songs, and cultural history to build strong national unity.", activities: ["Bilingual speech contests", "Literary critiques and reading groups", "Inter-school cultural exchanges"] },
  { id: 6, name: "Science Society", icon_name: "Atom", description: "Incubating scientific curiosity, physics models, biology research, and logical thinking. Organizes competitive science exhibitions.", activities: ["Fireside science fair models design", "Olympiad training and group revision panels", "Field trips to astronomical observatories"] },
  { id: 7, name: "Commerce Society", icon_name: "TrendingUp", description: "Fostering entrepreneurial skills, basic accounting practices, and commercial market trends. Organizes career-path lectures and model trade fairs.", activities: ["Annual Commerce Day and trade models expo", "Seminars on inflation and business metrics", "Filing mock account statements"] },
  { id: 8, name: "ICT Club", icon_name: "Laptop", description: "Fostering computational skills, software coding (HTML/JS/Python), graphic design, and basic robotics. Manages technical setups for events.", activities: ["Weekly programming bootcamps", "School web portal maintenance support", "Scratch algorithmic competitions"] },
  { id: 9, name: "Environmental Club", icon_name: "Leaf", description: "Nurturing biodiversity awareness, eco-friendly farming practices, recycling systems, and local reforestation campaigns.", activities: ["World Environment Day sapling planting", "Setting up school herbal gardens", "Waste collection and segregation systems"] },
  { id: 10, name: "Media Unit", icon_name: "Tv", description: "The official broadcasting body of the college. Responsible for managing sound systems, photography coverage, and campus newsletters.", activities: ["Announcements and morning sound setup", "Filming and photography of events", "Managing the college bulletin boards"] },
  { id: 11, name: "Scouts Group", icon_name: "Compass", description: "Building physical fitness, outdoor survival skills, first-aid knowledge, and character integrity based on scouting guidelines.", activities: ["Weekend camping and trekking drills", "Pioneering structures construction", "Assisting crowd control in local festivals"] },
  { id: 12, name: "St. John Ambulance", icon_name: "PlusSquare", description: "The premier first-aid student division, training members in cardiopulmonary resuscitation (CPR), wound treatment, and emergency evacuation.", activities: ["Emergency first-aid training cycles", "Setting up medical aid tents at sports meets", "Health awareness lectures for juniors"] },
  { id: 13, name: "Sports Clubs Association", icon_name: "Trophy", description: "The collective association of cricket, football, chess, and athletic clubs. Organizes training camps and matches against rival schools.", activities: ["Inter-house championship fixtures", "Physical fitness endurance routines", "Hosting guest coaches and alumni matches"] }
];

const SEED_PAGES = [
  { id: 1, title: "Alumni Association", slug: "alumni-association", banner_image: "/school-building.jpg", content: "<h2>Welcome to the Saraswathy College Alumni Network</h2><p>Our alumni network connects past pupils from all around the world. We collaborate on development projects for the college, offer mentorship programs for senior secondary students, and host annual gather-ups to recall memories and build new connections.</p><h3>Key Initiatives</h3><ul><li>Alumni Scholarship Fund for higher education</li><li>Modernizing the physics and chemistry laboratories</li><li>Sponsoring school sports tournaments and equipment</li></ul><p>If you are a past pupil, register today to stay connected with your alma mater!</p>" }
];

const SEED_PRINCIPALS = [
  { id: 1, name: "Mr. K. Somasundaram", period: "1934 - 1948", image: "/principal.jpg", description: "Founding Principal of Saraswathy Central College who laid the pillars of academic integrity and discipline." },
  { id: 2, name: "Mr. T. Vyramuttu", period: "1948 - 1965", image: "/principal.jpg", description: "Championed the free education scheme and built the main administrative block and library facility." },
  { id: 3, name: "Mr. V. Tharmalingam", period: "1965 - 1982", image: "/principal.jpg", description: "Fostered athletic programs and established the annual Inter-House Sports Meet structure." }
];

const SEED_ACADEMICS = [
  { id: 1, title: "Primary Education (Grades 1 - 5)", category: "Primary", description: "Developing foundational literacy, numeracy, social skills, and creative intelligence. We focus on active cognitive stimulation and early child values.", subjects: "Mother Tongue (Tamil), Mathematics, English Language, Environmental Studies, Religious Studies, Arts & Crafts", image: "/gallery-1.jpg" },
  { id: 2, title: "Junior Secondary Education (Grades 6 - 9)", category: "Junior Secondary", description: "Constructing advanced conceptual reasoning, critical logic, scientific inquiry, and core linguistic competencies.", subjects: "Science & Technology, Mathematics, English, Tamil Literature, History, Geography, Health & Physical Ed, ICT Basics", image: "/gallery-2.jpg" },
  { id: 3, title: "Senior Secondary Education - G.C.E. O/L (Grades 10 - 11)", category: "Ordinary Level", description: "Rigorous academic grooming aimed at preparing students for the National G.C.E. Ordinary Level exams. Focuses on broad stream competence.", subjects: "Science, Mathematics, Tamil/Sinhala, English, History, Religion, Category I (e.g., Music/Art), Category II (Commerce), Category III (ICT)", image: "/students.jpg" },
  { id: 4, title: "Biological & Physical Sciences", category: "Advanced Level", description: "Prepares students for medicine, bio-system engineering, veterinary science, physical research, and civil engineering paths.", subjects: "Physics, Chemistry, Combined Mathematics, Biology, Agricultural Science", image: "/gallery-1.jpg" },
  { id: 5, title: "Commerce Stream", category: "Advanced Level", description: "Builds foundations in corporate administration, finance audit, economics research, and global commerce management.", subjects: "Accounting, Business Studies, Economics, Business Statistics", image: "/school-building.jpg" },
  { id: 6, title: "Arts & Humanities Stream", category: "Advanced Level", description: "Nurtures analytical skills in linguistic literature, historical studies, law, governance, and creative expression.", subjects: "Tamil/English Literature, Political Science, Geography, History, Logic, Fine Arts", image: "/cultural-event.jpg" },
  { id: 7, title: "Technology Stream", category: "Advanced Level", description: "A modern stream specializing in technical, field-focused engineering processes and software solutions.", subjects: "Engineering Technology, Biosystems Technology, Science for Technology, Information & Communication Technology", image: "/gallery-2.jpg" }
];

const SEED_ACHIEVEMENTS = [
  { id: 1, title: "National School Athletic Championship Gold Medal", level: "National", category: "Sports", description: "Gold medal in 400m and high jump events won at the national athletic arena.", image: "/sports.jpg", year: "2025" },
  { id: 2, title: "Uva Province Under-19 Cricket Champions", level: "Province", category: "Sports", description: "Our Under-19 cricket team won the championship trophy of the Uva Province schools league.", image: "/sports.jpg", year: "2025" },
  { id: 3, title: "Zonal School Science Exhibition Winner", level: "Zonal", category: "Academic", description: "First prize for the robotic solar irrigation prototype model designed by the science society.", image: "/gallery-1.jpg", year: "2026" },
  { id: 4, title: "National Chemistry Olympiad Finalist", level: "National", category: "Academic", description: "Honorable mention and finalist award at the National Chemistry Olympiad finals held in Colombo.", image: "/students.jpg", year: "2025" },
  { id: 5, title: "Provincial Tamil Literary Oratorical Award", level: "Province", category: "Cultural", description: "First place in the senior Tamil oratorical category during the Provincial Tamil Literary Festival.", image: "/cultural-event.jpg", year: "2025" },
  { id: 6, title: "Zonal School Badminton Singles Silver", level: "Zonal", category: "Sports", description: "Silver medal in junior singles category at the zonal schools tournament.", image: "/sports.jpg", year: "2026" }
];

const SEED_TIMETABLES = [
  { id: 1, title: 'Grade 10 Class Timetable - Term 1', type: 'Class', grade_stream: 'Grade 10', file_url: '/school-building.jpg', academic_year: '2026' },
  { id: 2, title: 'G.C.E. Advanced Level Science Stream Schedule', type: 'Class', grade_stream: 'A/L Science', file_url: '/gallery-1.jpg', academic_year: '2026' },
  { id: 3, title: 'Grade 8 General Subjects Time Table', type: 'Class', grade_stream: 'Grade 8', file_url: '/gallery-2.jpg', academic_year: '2026' },
  { id: 4, title: 'First Term Examination Schedule - All Grades', type: 'Exam', grade_stream: 'All Grades', file_url: '/gallery-3.jpg', academic_year: '2026' },
  { id: 5, title: 'G.C.E. Ordinary Level Mock Seminar Program', type: 'Exam', grade_stream: 'Grade 11', file_url: '/students.jpg', academic_year: '2026' }
];

// To stringify leadership_history:
const stringifyLeadershipHistory = (historyList) => {
  if (!Array.isArray(historyList)) return '';
  return historyList.map(item => {
    const achs = Array.isArray(item.achievements) ? item.achievements.join('; ') : '';
    return `${item.year}:\nName: ${item.name || ''}\nTitle: ${item.title || ''}\nImage: ${item.image || ''}\nMessage: ${item.message || ''}\nAchievements: ${achs}`;
  }).join('\n\n');
};

// To parse leadership_history back:
const parseLeadershipHistory = (str) => {
  const history = [];
  if (!str) return history;
  const blocks = str.split(/\n\s*\n/);
  blocks.forEach(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return;
    
    const yearLine = lines[0];
    if (!yearLine.endsWith(':')) return;
    const year = yearLine.slice(0, -1).trim();
    if (!year) return;

    let name = '';
    let title = '';
    let image = '';
    let message = '';
    let achievements = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const colonIdx = line.indexOf(':');
      if (colonIdx === -1) continue;
      const key = line.substring(0, colonIdx).trim().toLowerCase();
      const val = line.substring(colonIdx + 1).trim();

      if (key === 'name') name = val;
      else if (key === 'title') title = val;
      else if (key === 'image') image = val;
      else if (key === 'message') message = val;
      else if (key === 'achievements') {
        achievements = val.split(';').map(a => a.trim()).filter(a => a.length > 0);
      }
    }

    if (name) {
      history.push({ year, name, title, image, message, achievements });
    }
  });
  return history;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('events');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // Database Data States
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [pages, setPages] = useState([]);
  const [principals, setPrincipals] = useState([]);
  const [academics, setAcademics] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [timetables, setTimetables] = useState([]);

  // Modal Control States
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('event'); // 'event', 'gallery', 'club', 'page', 'principal', 'academic', 'achievement', 'timetable'
  const [editingItem, setEditingItem] = useState(null); // null for create, object for edit

  // Form Fields
  const [eventForm, setEventForm] = useState({ title: '', category: 'Academic', date: '', description: '', full_content: '', image: '', file: null });
  const [galleryForm, setGalleryForm] = useState({ title: '', category: 'Events', description: '', image: '', file: null });
  const [clubForm, setClubForm] = useState({
    name: '',
    icon_name: 'ShieldCheck',
    description: '',
    activities: '',
    logo_url: '',
    banner_image: '',
    detailed_description: '',
    head_name: '',
    head_title: 'Head Prefect',
    head_image: '',
    head_message: '',
    head_achievements: '',
    gallery_years: '',
    member_lists: '',
    leadership_history: [],
    logoFile: null,
    bannerFile: null,
    headImageFile: null
  });
  const [pageForm, setPageForm] = useState({ title: '', slug: '', banner_image: '', content: '', file: null });
  const [principalForm, setPrincipalForm] = useState({ name: '', period: '', description: '', image: '', file: null });
  const [academicForm, setAcademicForm] = useState({ title: '', category: 'Primary', description: '', subjects: '', image: '', file: null });
  const [achievementForm, setAchievementForm] = useState({ title: '', level: 'National', category: 'Academic', description: '', year: '', image: '', file: null });
  const [timetableForm, setTimetableForm] = useState({
    title: '',
    type: 'Class',
    grade_stream: '',
    academic_year: '2026',
    file_url: '',
    file: null
  });

  // ----------------------------------------------------
  // Toast Notification
  // ----------------------------------------------------
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // ----------------------------------------------------
  // Data Fetching
  // ----------------------------------------------------
  const fetchData = useCallback(async () => {
    setLoading(true);
    if (isMockEnabled) {
      // LocalStorage Fetch
      let localEvents = localStorage.getItem('saraswathy_events');
      let localGallery = localStorage.getItem('saraswathy_gallery');
      let localClubs = localStorage.getItem('saraswathy_clubs');
      let localPages = localStorage.getItem('saraswathy_pages');
      let localPrincipals = localStorage.getItem('saraswathy_principals');
      let localAcademics = localStorage.getItem('saraswathy_academics');
      let localAchievements = localStorage.getItem('saraswathy_achievements');
      let localTimetables = localStorage.getItem('saraswathy_timetables');

      if (!localEvents) {
        localStorage.setItem('saraswathy_events', JSON.stringify(SEED_EVENTS));
        localEvents = JSON.stringify(SEED_EVENTS);
      }
      if (!localGallery) {
        localStorage.setItem('saraswathy_gallery', JSON.stringify(SEED_GALLERY));
        localGallery = JSON.stringify(SEED_GALLERY);
      }
      if (!localClubs) {
        localStorage.setItem('saraswathy_clubs', JSON.stringify(SEED_CLUBS));
        localClubs = JSON.stringify(SEED_CLUBS);
      }
      if (!localPages) {
        localStorage.setItem('saraswathy_pages', JSON.stringify(SEED_PAGES));
        localPages = JSON.stringify(SEED_PAGES);
      }
      if (!localPrincipals) {
        localStorage.setItem('saraswathy_principals', JSON.stringify(SEED_PRINCIPALS));
        localPrincipals = JSON.stringify(SEED_PRINCIPALS);
      }
      if (!localAcademics) {
        localStorage.setItem('saraswathy_academics', JSON.stringify(SEED_ACADEMICS));
        localAcademics = JSON.stringify(SEED_ACADEMICS);
      }
      if (!localAchievements) {
        localStorage.setItem('saraswathy_achievements', JSON.stringify(SEED_ACHIEVEMENTS));
        localAchievements = JSON.stringify(SEED_ACHIEVEMENTS);
      }
      if (!localTimetables) {
        localStorage.setItem('saraswathy_timetables', JSON.stringify(SEED_TIMETABLES));
        localTimetables = JSON.stringify(SEED_TIMETABLES);
      }

      setEvents(JSON.parse(localEvents));
      setGallery(JSON.parse(localGallery));
      setClubs(JSON.parse(localClubs));
      setPages(JSON.parse(localPages));
      setPrincipals(JSON.parse(localPrincipals));
      setAcademics(JSON.parse(localAcademics));
      setAchievements(JSON.parse(localAchievements));
      setTimetables(JSON.parse(localTimetables));
      setLoading(false);
      return;
    }

    try {
      const [eventsRes, galleryRes, clubsRes, pagesRes, principalsRes, academicsRes, achievementsRes, timetablesRes] = await Promise.all([
        supabase.from('events').select('*').order('created_at', { ascending: false }),
        supabase.from('gallery').select('*').order('created_at', { ascending: false }),
        supabase.from('clubs').select('*').order('id', { ascending: true }),
        supabase.from('pages').select('*').order('created_at', { ascending: false }),
        supabase.from('principals').select('*').order('id', { ascending: true }),
        supabase.from('academics').select('*').order('id', { ascending: true }),
        supabase.from('achievements').select('*').order('id', { ascending: false }),
        supabase.from('timetables').select('*').order('title', { ascending: true })
      ]);

      if (eventsRes.error) throw eventsRes.error;
      if (galleryRes.error) throw galleryRes.error;
      if (clubsRes.error) throw clubsRes.error;
      if (pagesRes.error) throw pagesRes.error;
      if (principalsRes.error) throw principalsRes.error;
      if (academicsRes.error) throw academicsRes.error;
      if (achievementsRes.error) throw achievementsRes.error;
      if (timetablesRes.error) throw timetablesRes.error;

      setEvents(eventsRes.data || []);
      setGallery(galleryRes.data || []);
      setClubs(clubsRes.data || []);
      setPages(pagesRes.data || []);
      setPrincipals(principalsRes.data || []);
      setAcademics(academicsRes.data || []);
      setAchievements(achievementsRes.data || []);
      setTimetables(timetablesRes.data || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  // ----------------------------------------------------
  // Lifecycle & Auth
  // ----------------------------------------------------
  useEffect(() => {
    const checkAuth = async () => {
      if (isMockEnabled) {
        const localSession = localStorage.getItem('saraswathy_admin_session');
        if (localSession !== 'true') {
          navigate('/admin/login');
        } else {
          setSession({ user: { email: 'admin@saraswathy.edu' } });
          fetchData();
        }
      } else {
        try {
          if (!supabase) {
            navigate('/admin/login');
            return;
          }
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) {
            navigate('/admin/login');
          } else {
            setSession(session);
            fetchData();
          }
        } catch (e) {
          console.error('Session check error:', e);
          navigate('/admin/login');
        }
      }
    };
    checkAuth();
  }, [navigate, fetchData]);

  const handleSignOut = async () => {
    if (isMockEnabled) {
      localStorage.removeItem('saraswathy_admin_session');
      navigate('/admin/login');
    } else {
      if (supabase) {
        try {
          await supabase.auth.signOut();
        } catch (e) {
          console.error('Sign out error:', e);
        }
      }
      navigate('/admin/login');
    }
  };


  // ----------------------------------------------------
  // Image Upload Helper
  // ----------------------------------------------------
  const uploadImage = async (file) => {
    if (!file) return '';

    if (isMockEnabled) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 600;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Compress to JPEG with 0.7 quality to ensure small file size
            const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
            resolve(dataUrl);
          };
          img.onerror = (err) => reject(err);
          img.src = e.target.result;
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error('Error uploading image to storage:', err);
      throw new Error(`Storage Error: ${err.message || 'Make sure you created a public bucket named "uploads" in Supabase.'}`, { cause: err });
    }
  };

  const handleLeaderChange = (index, field, value) => {
    setClubForm(prev => {
      const updatedHistory = [...(prev.leadership_history || [])];
      updatedHistory[index] = { ...updatedHistory[index], [field]: value };
      return { ...prev, leadership_history: updatedHistory };
    });
  };

  const addLeaderRow = () => {
    setClubForm(prev => ({
      ...prev,
      leadership_history: [
        ...(prev.leadership_history || []),
        { year: new Date().getFullYear().toString(), name: '', title: 'President', image: '', message: '', achievements: [], file: null }
      ]
    }));
  };

  const removeLeaderRow = (index) => {
    setClubForm(prev => {
      const updatedHistory = (prev.leadership_history || []).filter((_, idx) => idx !== index);
      return { ...prev, leadership_history: updatedHistory };
    });
  };

  // ----------------------------------------------------
  // CRUD Handlers
  // ----------------------------------------------------
  const openCreateModal = (type) => {
    setModalType(type);
    setEditingItem(null);
    if (type === 'event') {
      setEventForm({ title: '', category: 'Academic', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), description: '', full_content: '', image: '', file: null });
    } else if (type === 'gallery') {
      setGalleryForm({ title: '', category: 'Events', description: '', image: '', file: null });
    } else if (type === 'club') {
      setClubForm({
        name: '',
        icon_name: 'ShieldCheck',
        description: '',
        activities: '',
        logo_url: '',
        banner_image: '',
        detailed_description: '',
        head_name: '',
        head_title: 'Head Prefect',
        head_image: '',
        head_message: '',
        head_achievements: '',
        gallery_years: '',
        member_lists: '',
        leadership_history: [],
        logoFile: null,
        bannerFile: null,
        headImageFile: null
      });
    } else if (type === 'page') {
      setPageForm({ title: '', slug: '', banner_image: '', content: '', file: null });
    } else if (type === 'principal') {
      setPrincipalForm({ name: '', period: '', description: '', image: '', file: null });
    } else if (type === 'academic') {
      setAcademicForm({ title: '', category: 'Primary', description: '', subjects: '', image: '', file: null });
    } else if (type === 'achievement') {
      setAchievementForm({ title: '', level: 'National', category: 'Academic', description: '', year: new Date().getFullYear().toString(), image: '', file: null });
    } else if (type === 'timetable') {
      setTimetableForm({ title: '', type: 'Class', grade_stream: '', academic_year: '2026', file_url: '', file: null });
    }
    setShowModal(true);
  };

  const openEditModal = (type, item) => {
    setModalType(type);
    setEditingItem(item);
    if (type === 'event') {
      setEventForm({ ...item, file: null });
    } else if (type === 'gallery') {
      setGalleryForm({ ...item, file: null });
    } else if (type === 'club') {
      const acts = Array.isArray(item.activities) 
        ? item.activities.join('\n') 
        : typeof item.activities === 'string' 
          ? JSON.parse(item.activities || '[]').join('\n') 
          : '';

      const hAchs = Array.isArray(item.head_achievements)
        ? item.head_achievements.join('\n')
        : typeof item.head_achievements === 'string'
          ? JSON.parse(item.head_achievements || '[]').join('\n')
          : '';

      const mListsObj = Array.isArray(item.member_lists)
        ? item.member_lists
        : typeof item.member_lists === 'string'
          ? JSON.parse(item.member_lists || '[]')
          : [];
      const mListsStr = Array.isArray(mListsObj) ? mListsObj.map(r => `${r.year}: ${r.members.join(', ')}`).join('\n') : '';

      const galYearsObj = Array.isArray(item.gallery_years)
        ? item.gallery_years
        : typeof item.gallery_years === 'string'
          ? JSON.parse(item.gallery_years || '[]')
          : [];
      const galYearsStr = Array.isArray(galYearsObj) ? galYearsObj.map(g => `${g.year}: ${g.images.join(', ')}`).join('\n') : '';

      setClubForm({
        name: item.name || '',
        icon_name: item.icon_name || 'ShieldCheck',
        description: item.description || '',
        activities: acts,
        logo_url: item.logo_url || '',
        banner_image: item.banner_image || '',
        detailed_description: item.detailed_description || '',
        head_name: item.head_name || '',
        head_title: item.head_title || 'Head Prefect',
        head_image: item.head_image || '',
        head_message: item.head_message || '',
        head_achievements: hAchs,
        gallery_years: galYearsStr,
        member_lists: mListsStr,
        leadership_history: Array.isArray(item.leadership_history) ? item.leadership_history : [],
        logoFile: null,
        bannerFile: null,
        headImageFile: null
      });
    } else if (type === 'page') {
      setPageForm({ ...item, file: null });
    } else if (type === 'principal') {
      setPrincipalForm({ ...item, file: null });
    } else if (type === 'academic') {
      setAcademicForm({ ...item, file: null });
    } else if (type === 'achievement') {
      setAchievementForm({ ...item, file: null });
    } else if (type === 'timetable') {
      setTimetableForm({ ...item, file: null });
    }
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (modalType === 'event') {
        let imageUrl = eventForm.image;
        if (eventForm.file) {
          imageUrl = await uploadImage(eventForm.file);
        }

        const payload = {
          id: editingItem ? editingItem.id : Date.now(),
          title: eventForm.title,
          category: eventForm.category,
          date: eventForm.date,
          description: eventForm.description,
          full_content: eventForm.full_content,
          image: imageUrl || '/gallery-2.jpg'
        };

        if (isMockEnabled) {
          let currentList = [...events];
          if (editingItem) {
            currentList = currentList.map(item => item.id === editingItem.id ? payload : item);
            showToast('Event updated in LocalStorage');
          } else {
            currentList.unshift(payload);
            showToast('Event created in LocalStorage');
          }
          localStorage.setItem('saraswathy_events', JSON.stringify(currentList));
        } else {
          const payloadDb = { ...payload };
          delete payloadDb.id; // DB auto increments ID
          if (editingItem) {
            const { error } = await supabase.from('events').update(payloadDb).eq('id', editingItem.id);
            if (error) throw error;
            showToast('Event updated successfully');
          } else {
            const { error } = await supabase.from('events').insert([payloadDb]);
            if (error) throw error;
            showToast('Event created successfully');
          }
        }

      } else if (modalType === 'gallery') {
        let imageUrl = galleryForm.image;
        if (galleryForm.file) {
          imageUrl = await uploadImage(galleryForm.file);
        }

        const payload = {
          id: editingItem ? editingItem.id : Date.now(),
          title: galleryForm.title,
          category: galleryForm.category,
          description: galleryForm.description,
          image: imageUrl || '/gallery-2.jpg'
        };

        if (isMockEnabled) {
          let currentList = [...gallery];
          if (editingItem) {
            currentList = currentList.map(item => item.id === editingItem.id ? payload : item);
            showToast('Gallery item updated in LocalStorage');
          } else {
            currentList.unshift(payload);
            showToast('Gallery item added to LocalStorage');
          }
          localStorage.setItem('saraswathy_gallery', JSON.stringify(currentList));
        } else {
          const payloadDb = { ...payload };
          delete payloadDb.id;
          if (editingItem) {
            const { error } = await supabase.from('gallery').update(payloadDb).eq('id', editingItem.id);
            if (error) throw error;
            showToast('Gallery item updated successfully');
          } else {
            const { error } = await supabase.from('gallery').insert([payloadDb]);
            if (error) throw error;
            showToast('Gallery item added successfully');
          }
        }

      } else if (modalType === 'club') {
        let logoUrl = clubForm.logo_url;
        let bannerUrl = clubForm.banner_image;
        let headImageUrl = clubForm.head_image;

        if (clubForm.logoFile) {
          logoUrl = await uploadImage(clubForm.logoFile);
        }
        if (clubForm.bannerFile) {
          bannerUrl = await uploadImage(clubForm.bannerFile);
        }
        if (clubForm.headImageFile) {
          headImageUrl = await uploadImage(clubForm.headImageFile);
        }

        const activitiesArr = clubForm.activities
          .split('\n')
          .map(a => a.trim())
          .filter(a => a.length > 0);

        const headAchievementsArr = clubForm.head_achievements
          .split('\n')
          .map(a => a.trim())
          .filter(a => a.length > 0);

        // Parse rosters
        const memberListsArr = [];
        if (clubForm.member_lists) {
          clubForm.member_lists.split('\n').forEach(line => {
            const parts = line.split(':');
            if (parts.length >= 2) {
              const year = parts[0].trim();
              const members = parts[1].split(',').map(m => m.trim()).filter(m => m.length > 0);
              if (year && members.length > 0) {
                memberListsArr.push({ year, members });
              }
            }
          });
        }

        // Parse gallery
        const galleryYearsArr = [];
        if (clubForm.gallery_years) {
          clubForm.gallery_years.split('\n').forEach(line => {
            const parts = line.split(':');
            if (parts.length >= 2) {
              const year = parts[0].trim();
              const images = parts[1].split(',').map(img => img.trim()).filter(img => img.length > 0);
              if (year && images.length > 0) {
                galleryYearsArr.push({ year, images });
              }
            }
          });
        }

        // Upload images for leadership history items
        const leadershipHistoryArr = await Promise.all(
          (clubForm.leadership_history || []).map(async (leader) => {
            let imgUrl = leader.image;
            if (leader.file) {
              imgUrl = await uploadImage(leader.file);
            }
            return {
              year: leader.year || '',
              name: leader.name || '',
              title: leader.title || '',
              image: imgUrl || '',
              message: leader.message || '',
              achievements: Array.isArray(leader.achievements)
                ? leader.achievements
                : typeof leader.achievements === 'string'
                  ? leader.achievements.split('\n').map(a => a.trim()).filter(a => a.length > 0)
                  : []
            };
          })
        );
        const latestLeader = leadershipHistoryArr.find(l => l.year === '2026') || leadershipHistoryArr[0] || null;

        const payload = {
          id: editingItem ? editingItem.id : Date.now(),
          name: clubForm.name,
          icon_name: clubForm.icon_name,
          description: clubForm.description,
          activities: activitiesArr,
          logo_url: logoUrl || null,
          banner_image: bannerUrl || null,
          detailed_description: clubForm.detailed_description || null,
          head_name: latestLeader ? latestLeader.name : null,
          head_title: latestLeader ? latestLeader.title : 'Head Prefect',
          head_image: latestLeader ? latestLeader.image : null,
          head_message: latestLeader ? latestLeader.message : null,
          head_achievements: latestLeader ? latestLeader.achievements : [],
          gallery_years: galleryYearsArr,
          member_lists: memberListsArr,
          leadership_history: leadershipHistoryArr
        };

        if (isMockEnabled) {
          let currentList = [...clubs];
          if (editingItem) {
            currentList = currentList.map(item => item.id === editingItem.id ? payload : item);
            showToast('Club updated in LocalStorage');
          } else {
            currentList.push(payload);
            showToast('Club added to LocalStorage');
          }
          localStorage.setItem('saraswathy_clubs', JSON.stringify(currentList));
        } else {
          const payloadDb = { ...payload };
          delete payloadDb.id;
          
          try {
            if (editingItem) {
              const { error } = await supabase.from('clubs').update(payloadDb).eq('id', editingItem.id);
              if (error) throw error;
              showToast('Club updated successfully');
            } else {
              const { error } = await supabase.from('clubs').insert([payloadDb]);
              if (error) throw error;
              showToast('Club added successfully');
            }
          } catch (dbErr) {
            if (dbErr.code === '42703' || dbErr.message?.includes('column')) {
              throw new Error('Database structure mismatch: columns are missing. Please execute the ALTER TABLE SQL script in schema.sql on your Supabase dashboard to support rich fields.', { cause: dbErr });
            }
            throw dbErr;
          }
        }

      } else if (modalType === 'page') {
        let imageUrl = pageForm.banner_image;
        if (pageForm.file) {
          imageUrl = await uploadImage(pageForm.file);
        }

        const cleanedSlug = (pageForm.slug || pageForm.title)
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-');

        const payload = {
          id: editingItem ? editingItem.id : Date.now(),
          title: pageForm.title,
          slug: cleanedSlug,
          banner_image: imageUrl || null,
          content: pageForm.content
        };

        if (isMockEnabled) {
          let currentList = [...pages];
          if (editingItem) {
            currentList = currentList.map(item => item.id === editingItem.id ? payload : item);
            showToast('Custom page updated in LocalStorage');
          } else {
            currentList.unshift(payload);
            showToast('Custom page created in LocalStorage');
          }
          localStorage.setItem('saraswathy_pages', JSON.stringify(currentList));
        } else {
          const payloadDb = { ...payload };
          delete payloadDb.id;
          if (editingItem) {
            const { error } = await supabase.from('pages').update(payloadDb).eq('id', editingItem.id);
            if (error) throw error;
            showToast('Custom page updated successfully');
          } else {
            const { error } = await supabase.from('pages').insert([payloadDb]);
            if (error) throw error;
            showToast('Custom page created successfully');
          }
        }
      } else if (modalType === 'principal') {
        let imageUrl = principalForm.image;
        if (principalForm.file) {
          imageUrl = await uploadImage(principalForm.file);
        }

        const payload = {
          id: editingItem ? editingItem.id : Date.now(),
          name: principalForm.name,
          period: principalForm.period,
          description: principalForm.description,
          image: imageUrl || '/principal.jpg'
        };

        if (isMockEnabled) {
          let currentList = [...principals];
          if (editingItem) {
            currentList = currentList.map(item => item.id === editingItem.id ? payload : item);
            showToast('Past principal updated in LocalStorage');
          } else {
            currentList.push(payload);
            showToast('Past principal added to LocalStorage');
          }
          localStorage.setItem('saraswathy_principals', JSON.stringify(currentList));
        } else {
          const payloadDb = { ...payload };
          delete payloadDb.id;
          if (editingItem) {
            const { error } = await supabase.from('principals').update(payloadDb).eq('id', editingItem.id);
            if (error) throw error;
            showToast('Past principal updated successfully');
          } else {
            const { error } = await supabase.from('principals').insert([payloadDb]);
            if (error) throw error;
            showToast('Past principal added successfully');
          }
        }

      } else if (modalType === 'academic') {
        let imageUrl = academicForm.image;
        if (academicForm.file) {
          imageUrl = await uploadImage(academicForm.file);
        }

        const payload = {
          id: editingItem ? editingItem.id : Date.now(),
          title: academicForm.title,
          category: academicForm.category,
          description: academicForm.description,
          subjects: academicForm.subjects,
          image: imageUrl || '/gallery-1.jpg'
        };

        if (isMockEnabled) {
          let currentList = [...academics];
          if (editingItem) {
            currentList = currentList.map(item => item.id === editingItem.id ? payload : item);
            showToast('Academic program updated in LocalStorage');
          } else {
            currentList.push(payload);
            showToast('Academic program added to LocalStorage');
          }
          localStorage.setItem('saraswathy_academics', JSON.stringify(currentList));
        } else {
          const payloadDb = { ...payload };
          delete payloadDb.id;
          if (editingItem) {
            const { error } = await supabase.from('academics').update(payloadDb).eq('id', editingItem.id);
            if (error) throw error;
            showToast('Academic program updated successfully');
          } else {
            const { error } = await supabase.from('academics').insert([payloadDb]);
            if (error) throw error;
            showToast('Academic program added successfully');
          }
        }

      } else if (modalType === 'achievement') {
        let imageUrl = achievementForm.image;
        if (achievementForm.file) {
          imageUrl = await uploadImage(achievementForm.file);
        }

        const payload = {
          id: editingItem ? editingItem.id : Date.now(),
          title: achievementForm.title,
          level: achievementForm.level,
          category: achievementForm.category,
          description: achievementForm.description,
          year: achievementForm.year,
          image: imageUrl || '/sports.jpg'
        };

        if (isMockEnabled) {
          let currentList = [...achievements];
          if (editingItem) {
            currentList = currentList.map(item => item.id === editingItem.id ? payload : item);
            showToast('Achievement updated in LocalStorage');
          } else {
            currentList.unshift(payload);
            showToast('Achievement added to LocalStorage');
          }
          localStorage.setItem('saraswathy_achievements', JSON.stringify(currentList));
        } else {
          const payloadDb = { ...payload };
          delete payloadDb.id;
          if (editingItem) {
            const { error } = await supabase.from('achievements').update(payloadDb).eq('id', editingItem.id);
            if (error) throw error;
            showToast('Achievement updated successfully');
          } else {
            const { error } = await supabase.from('achievements').insert([payloadDb]);
            if (error) throw error;
            showToast('Achievement added successfully');
          }
        }
      } else if (modalType === 'timetable') {
        let fileUrl = timetableForm.file_url;
        if (timetableForm.file) {
          fileUrl = await uploadImage(timetableForm.file);
        }

        const payload = {
          id: editingItem ? editingItem.id : Date.now(),
          title: timetableForm.title,
          type: timetableForm.type,
          grade_stream: timetableForm.grade_stream,
          academic_year: timetableForm.academic_year,
          file_url: fileUrl || '/school-building.jpg'
        };

        if (isMockEnabled) {
          let currentList = [...timetables];
          if (editingItem) {
            currentList = currentList.map(item => item.id === editingItem.id ? payload : item);
            showToast('Timetable updated in LocalStorage');
          } else {
            currentList.push(payload);
            showToast('Timetable added to LocalStorage');
          }
          localStorage.setItem('saraswathy_timetables', JSON.stringify(currentList));
        } else {
          const payloadDb = { ...payload };
          delete payloadDb.id;
          if (editingItem) {
            const { error } = await supabase.from('timetables').update(payloadDb).eq('id', editingItem.id);
            if (error) throw error;
            showToast('Timetable updated successfully');
          } else {
            const { error } = await supabase.from('timetables').insert([payloadDb]);
            if (error) throw error;
            showToast('Timetable added successfully');
          }
        }
      }

      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}? This action cannot be undone.`)) {
      return;
    }

    try {
      if (isMockEnabled) {
        if (type === 'event') {
          const filtered = events.filter(e => e.id !== id);
          localStorage.setItem('saraswathy_events', JSON.stringify(filtered));
        } else if (type === 'gallery') {
          const filtered = gallery.filter(g => g.id !== id);
          localStorage.setItem('saraswathy_gallery', JSON.stringify(filtered));
        } else if (type === 'club') {
          const filtered = clubs.filter(c => c.id !== id);
          localStorage.setItem('saraswathy_clubs', JSON.stringify(filtered));
        } else if (type === 'page') {
          const filtered = pages.filter(p => p.id !== id);
          localStorage.setItem('saraswathy_pages', JSON.stringify(filtered));
        } else if (type === 'principal') {
          const filtered = principals.filter(p => p.id !== id);
          localStorage.setItem('saraswathy_principals', JSON.stringify(filtered));
        } else if (type === 'academic') {
          const filtered = academics.filter(a => a.id !== id);
          localStorage.setItem('saraswathy_academics', JSON.stringify(filtered));
        } else if (type === 'achievement') {
          const filtered = achievements.filter(a => a.id !== id);
          localStorage.setItem('saraswathy_achievements', JSON.stringify(filtered));
        } else if (type === 'timetable') {
          const filtered = timetables.filter(t => t.id !== id);
          localStorage.setItem('saraswathy_timetables', JSON.stringify(filtered));
        }
        showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted from LocalStorage`);
      } else {
        let table = 'events';
        if (type === 'gallery') table = 'gallery';
        if (type === 'club') table = 'clubs';
        if (type === 'page') table = 'pages';
        if (type === 'principal') table = 'principals';
        if (type === 'academic') table = 'academics';
        if (type === 'achievement') table = 'achievements';
        if (type === 'timetable') table = 'timetables';

        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) throw error;

        showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
      }
      fetchData();
    } catch (err) {
      console.error(err);
      showToast(err.message, 'error');
    }
  };

  const handleTitleChangeForSlug = (title) => {
    if (!editingItem) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      setPageForm(prev => ({ ...prev, title, slug: generatedSlug }));
    } else {
      setPageForm(prev => ({ ...prev, title }));
    }
  };

  // ----------------------------------------------------
  // Render Helpers
  // ----------------------------------------------------

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      
      {/* Toast Alert */}
      {notification && (
        <div className={`fixed top-28 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border transition-all animate-fadeIn ${
          notification.type === 'error' 
            ? 'bg-red-500/10 border-red-500/20 text-red-200' 
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200'
        }`}>
          {notification.type === 'error' 
            ? <AlertCircle className="w-5 h-5 text-red-400" />
            : <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          }
          <span className="font-semibold text-sm">{notification.message}</span>
        </div>
      )}

      {/* Admin Navbar/Bar */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">System Administration</h1>
          <p className="text-slate-400 text-sm mt-1">Manage events, galleries, academic clubs, and dynamic portal pages.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full font-bold text-slate-300">
            Authenticated Admin
          </span>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-red-500/15 hover:bg-red-500 text-red-200 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-8 text-center">
          <div className="bg-white/5 border border-white/10 p-4.5 rounded-2xl space-y-1">
            <div className="text-school-gold flex justify-center"><Calendar className="w-5 h-5" /></div>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Events</p>
            <h3 className="text-2xl font-black text-white">{events.length}</h3>
          </div>
          <div className="bg-white/5 border border-white/10 p-4.5 rounded-2xl space-y-1">
            <div className="text-school-gold flex justify-center"><ImageIcon className="w-5 h-5" /></div>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Media</p>
            <h3 className="text-2xl font-black text-white">{gallery.length}</h3>
          </div>
          <div className="bg-white/5 border border-white/10 p-4.5 rounded-2xl space-y-1">
            <div className="text-school-gold flex justify-center"><Users className="w-5 h-5" /></div>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Clubs</p>
            <h3 className="text-2xl font-black text-white">{clubs.length}</h3>
          </div>
          <div className="bg-white/5 border border-white/10 p-4.5 rounded-2xl space-y-1">
            <div className="text-school-gold flex justify-center"><FileText className="w-5 h-5" /></div>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Pages</p>
            <h3 className="text-2xl font-black text-white">{pages.length}</h3>
          </div>
          <div className="bg-white/5 border border-white/10 p-4.5 rounded-2xl space-y-1">
            <div className="text-school-gold flex justify-center"><Users className="w-5 h-5" /></div>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Principals</p>
            <h3 className="text-2xl font-black text-white">{principals.length}</h3>
          </div>
          <div className="bg-white/5 border border-white/10 p-4.5 rounded-2xl space-y-1">
            <div className="text-school-gold flex justify-center"><Calendar className="w-5 h-5" /></div>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Academics</p>
            <h3 className="text-2xl font-black text-white">{academics.length}</h3>
          </div>
          <div className="bg-white/5 border border-white/10 p-4.5 rounded-2xl space-y-1">
            <div className="text-school-gold flex justify-center"><Award className="w-5 h-5" /></div>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Achievements</p>
            <h3 className="text-2xl font-black text-white">{achievements.length}</h3>
          </div>
        </div>

        {/* Storage Instruction Banner */}
        <div className="bg-blue-500/10 border border-blue-500/20 text-blue-200 p-4.5 rounded-2xl mb-8 text-sm flex gap-3.5 items-start">
          <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
          <div>
            <span className="font-bold text-white block mb-0.5">Supabase Storage Configuration Reminder:</span>
            To enable image file uploads, ensure you create a bucket named <code className="bg-white/15 px-1.5 py-0.5 rounded font-mono text-white text-xs">uploads</code> in your Supabase project under Storage and configure its access policies to allow public reads and authenticated uploads.
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4 mb-8">
          <button 
            onClick={() => setActiveTab('events')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'events' ? 'bg-school-gold text-school-navy shadow-lg font-black' : 'hover:bg-white/5 text-slate-400'
            }`}
          >
            Events & News
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'gallery' ? 'bg-school-gold text-school-navy shadow-lg font-black' : 'hover:bg-white/5 text-slate-400'
            }`}
          >
            Gallery
          </button>
          <button 
            onClick={() => setActiveTab('clubs')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'clubs' ? 'bg-school-gold text-school-navy shadow-lg font-black' : 'hover:bg-white/5 text-slate-400'
            }`}
          >
            Clubs & Societies
          </button>
          <button 
            onClick={() => setActiveTab('pages')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'pages' ? 'bg-school-gold text-school-navy shadow-lg font-black' : 'hover:bg-white/5 text-slate-400'
            }`}
          >
            Custom Pages
          </button>
          <button 
            onClick={() => setActiveTab('principals')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'principals' ? 'bg-school-gold text-school-navy shadow-lg font-black' : 'hover:bg-white/5 text-slate-400'
            }`}
          >
            Past Principals
          </button>
          <button 
            onClick={() => setActiveTab('academics')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'academics' ? 'bg-school-gold text-school-navy shadow-lg font-black' : 'hover:bg-white/5 text-slate-400'
            }`}
          >
            Academics
          </button>
          <button 
            onClick={() => setActiveTab('achievements')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'achievements' ? 'bg-school-gold text-school-navy shadow-lg font-black' : 'hover:bg-white/5 text-slate-400'
            }`}
          >
            Achievements
          </button>
          <button 
            onClick={() => setActiveTab('timetables')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'timetables' ? 'bg-school-gold text-school-navy shadow-lg font-black' : 'hover:bg-white/5 text-slate-400'
            }`}
          >
            Timetables
          </button>
        </div>

        {/* Action Button & Loader */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black capitalize tracking-tight">{activeTab} List</h2>
          <button
            onClick={() => openCreateModal(activeTab === 'gallery' ? 'gallery' : activeTab === 'timetables' ? 'timetable' : activeTab.slice(0, -1))}
            className="flex items-center gap-1.5 bg-school-navy hover:bg-school-navy-light text-white hover:text-school-gold border border-school-gold/20 px-5 py-3 rounded-xl text-sm font-bold shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New {activeTab === 'gallery' ? 'Gallery Item' : activeTab === 'timetables' ? 'Timetable' : activeTab.slice(0, -1)}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 bg-white/5 border border-white/5 rounded-3xl animate-pulse">
            <p className="text-slate-400 font-semibold text-sm">Querying database rows...</p>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {activeTab === 'events' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs">
                      <th className="p-4">Image</th>
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Short Description</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {events.map((e) => (
                      <tr key={e.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <img src={e.image} alt={e.title} className="w-14 h-10 object-cover rounded-lg border border-white/15" />
                        </td>
                        <td className="p-4 font-bold text-white max-w-[200px] truncate">{e.title}</td>
                        <td className="p-4"><span className="bg-school-gold/15 text-school-gold text-xs px-2.5 py-1 rounded-full font-bold">{e.category}</span></td>
                        <td className="p-4 text-slate-400 font-medium text-xs">{e.date}</td>
                        <td className="p-4 text-slate-400 max-w-[280px] truncate">{e.description}</td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button onClick={() => openEditModal('event', e)} className="p-2 hover:bg-white/10 text-indigo-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete('event', e.id)} className="p-2 hover:bg-white/10 text-rose-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {events.length === 0 && (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-slate-400">No events found. Click "Add New Event" to create one.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs">
                      <th className="p-4">Photo</th>
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Description</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {gallery.map((g) => (
                      <tr key={g.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <img src={g.image} alt={g.title} className="w-14 h-10 object-cover rounded-lg border border-white/15" />
                        </td>
                        <td className="p-4 font-bold text-white max-w-[200px] truncate">{g.title}</td>
                        <td className="p-4"><span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-full font-bold">{g.category}</span></td>
                        <td className="p-4 text-slate-400 max-w-[300px] truncate">{g.description}</td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button onClick={() => openEditModal('gallery', g)} className="p-2 hover:bg-white/10 text-indigo-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete('gallery', g.id)} className="p-2 hover:bg-white/10 text-rose-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {gallery.length === 0 && (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-slate-400">No media assets found. Click "Add New Gallery" to upload one.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'clubs' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs">
                      <th className="p-4 w-16">Icon</th>
                      <th className="p-4">Club Name</th>
                      <th className="p-4">Description</th>
                      <th className="p-4">Activities</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {clubs.map((c) => (
                      <tr key={c.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 text-school-gold">
                          <ClubIcon name={c.icon_name} className="w-6 h-6" />
                        </td>
                        <td className="p-4 font-bold text-white">{c.name}</td>
                        <td className="p-4 text-slate-400 max-w-[280px] truncate">{c.description}</td>
                        <td className="p-4 text-slate-400 max-w-[280px] truncate">
                          {Array.isArray(c.activities) ? c.activities.join(', ') : c.activities}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button onClick={() => openEditModal('club', c)} className="p-2 hover:bg-white/10 text-indigo-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete('club', c.id)} className="p-2 hover:bg-white/10 text-rose-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {clubs.length === 0 && (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-slate-400">No student clubs found. Click "Add New Club" to define one.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'pages' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs">
                      <th className="p-4">Title</th>
                      <th className="p-4">Url Slug</th>
                      <th className="p-4">Banner Preview</th>
                      <th className="p-4">Relative Path</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {pages.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-white">{p.title}</td>
                        <td className="p-4 font-mono text-xs text-school-gold">/{p.slug}</td>
                        <td className="p-4">
                          {p.banner_image ? (
                            <img src={p.banner_image} alt={p.title} className="w-14 h-10 object-cover rounded-lg border border-white/15" />
                          ) : (
                            <span className="text-xs text-slate-500 italic">No Banner</span>
                          )}
                        </td>
                        <td className="p-4">
                          <a 
                            href={`/pages/${p.slug}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-slate-400 hover:text-school-gold transition-colors text-xs font-semibold"
                          >
                            <span>/pages/{p.slug}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button onClick={() => openEditModal('page', p)} className="p-2 hover:bg-white/10 text-indigo-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete('page', p.id)} className="p-2 hover:bg-white/10 text-rose-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {pages.length === 0 && (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-slate-400">No custom pages created yet. Click "Add New Page" to publish one.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'principals' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs">
                      <th className="p-4">Photo</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Period</th>
                      <th className="p-4">Description</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {principals.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <img src={p.image || '/principal.jpg'} alt={p.name} className="w-14 h-10 object-cover rounded-lg border border-white/15" />
                        </td>
                        <td className="p-4 font-bold text-white max-w-[200px] truncate">{p.name}</td>
                        <td className="p-4 text-school-gold font-medium text-xs">{p.period}</td>
                        <td className="p-4 text-slate-400 max-w-[300px] truncate">{p.description}</td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button onClick={() => openEditModal('principal', p)} className="p-2 hover:bg-white/10 text-indigo-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete('principal', p.id)} className="p-2 hover:bg-white/10 text-rose-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {principals.length === 0 && (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-slate-400">No past principals created yet. Click "Add New Principal" to create one.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'academics' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs">
                      <th className="p-4">Image</th>
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Description</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {academics.map((a) => (
                      <tr key={a.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <img src={a.image || '/gallery-1.jpg'} alt={a.title} className="w-14 h-10 object-cover rounded-lg border border-white/15" />
                        </td>
                        <td className="p-4 font-bold text-white max-w-[200px] truncate">{a.title}</td>
                        <td className="p-4"><span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-full font-bold">{a.category}</span></td>
                        <td className="p-4 text-slate-400 max-w-[300px] truncate">{a.description}</td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button onClick={() => openEditModal('academic', a)} className="p-2 hover:bg-white/10 text-indigo-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete('academic', a.id)} className="p-2 hover:bg-white/10 text-rose-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {academics.length === 0 && (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-slate-400">No academic programs created yet. Click "Add New Academic" to define one.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs">
                      <th className="p-4">Image</th>
                      <th className="p-4">Title</th>
                      <th className="p-4">Level</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Year</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {achievements.map((ach) => (
                      <tr key={ach.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <img src={ach.image || '/sports.jpg'} alt={ach.title} className="w-14 h-10 object-cover rounded-lg border border-white/15" />
                        </td>
                        <td className="p-4 font-bold text-white max-w-[200px] truncate">{ach.title}</td>
                        <td className="p-4"><span className="bg-school-gold/15 text-school-gold text-xs px-2.5 py-1 rounded-full font-bold">{ach.level}</span></td>
                        <td className="p-4 text-slate-300 text-xs font-medium">{ach.category}</td>
                        <td className="p-4 text-slate-400 text-xs">{ach.year}</td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button onClick={() => openEditModal('achievement', ach)} className="p-2 hover:bg-white/10 text-indigo-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete('achievement', ach.id)} className="p-2 hover:bg-white/10 text-rose-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {achievements.length === 0 && (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-slate-400">No achievements recorded yet. Click "Add New Achievement" to log one.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'timetables' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs">
                      <th className="p-4">Title</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Grade / Stream</th>
                      <th className="p-4">Year</th>
                      <th className="p-4">Resource URL</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {timetables.map((tt) => (
                      <tr key={tt.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-white max-w-[200px] truncate">{tt.title}</td>
                        <td className="p-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                            tt.type === 'Class' 
                              ? 'bg-blue-500/15 text-blue-400' 
                              : 'bg-amber-500/15 text-amber-400'
                          }`}>
                            {tt.type}
                          </span>
                        </td>
                        <td className="p-4 text-slate-300 text-xs font-semibold">{tt.grade_stream}</td>
                        <td className="p-4 text-slate-400 text-xs">{tt.academic_year || '2026'}</td>
                        <td className="p-4 text-slate-400 text-xs max-w-[150px] truncate">
                          <a href={tt.file_url} target="_blank" rel="noopener noreferrer" className="text-school-gold hover:underline flex items-center gap-1 font-bold">
                            Link <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button onClick={() => openEditModal('timetable', tt)} className="p-2 hover:bg-white/10 text-indigo-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete('timetable', tt.id)} className="p-2 hover:bg-white/10 text-rose-400 hover:text-white rounded-lg transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {timetables.length === 0 && (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-slate-400">No schedules recorded yet. Click \"Add New Timetable\" to upload one.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-white/10 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-8 animate-scaleUp space-y-6">
            
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-xl font-black text-white">
                {editingItem ? 'Modify' : 'Add New'} {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/5 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              
              {/* Event Editor Fields */}
              {modalType === 'event' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Event Title</label>
                      <input 
                        type="text" 
                        required
                        value={eventForm.title}
                        onChange={(e) => setEventForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category</label>
                      <select 
                        value={eventForm.category}
                        onChange={(e) => setEventForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-slate-900 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      >
                        {EVENT_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Display Date (e.g. May 15, 2026)</label>
                      <input 
                        type="text" 
                        required
                        value={eventForm.date}
                        onChange={(e) => setEventForm(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Event Cover Image (File Upload)</label>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 hover:border-school-gold text-slate-300 rounded-xl cursor-pointer text-xs font-bold w-full transition-all">
                          <Upload className="w-4 h-4 text-school-gold" />
                          <span className="truncate">{eventForm.file ? eventForm.file.name : 'Select file...'}</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => setEventForm(prev => ({ ...prev, file: e.target.files[0] }))}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or Use Existing Image Path (e.g. /gallery-3.jpg)</label>
                    <input 
                      type="text" 
                      value={eventForm.image}
                      placeholder="Leave empty if uploading a file..."
                      onChange={(e) => setEventForm(prev => ({ ...prev, image: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Short Description (Hover summary)</label>
                    <textarea 
                      required
                      value={eventForm.description}
                      onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                      rows="2"
                      className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Content (Detailed description in dialog popup)</label>
                    <textarea 
                      required
                      value={eventForm.full_content}
                      onChange={(e) => setEventForm(prev => ({ ...prev, full_content: e.target.value }))}
                      rows="5"
                      className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                    />
                  </div>
                </>
              )}

              {/* Gallery Editor Fields */}
              {modalType === 'gallery' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Photo Title</label>
                      <input 
                        type="text" 
                        required
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category</label>
                      <select 
                        value={galleryForm.category}
                        onChange={(e) => setGalleryForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-slate-900 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      >
                        {GALLERY_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upload Photo File</label>
                      <label className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 hover:border-school-gold text-slate-300 rounded-xl cursor-pointer text-xs font-bold w-full transition-all">
                        <Upload className="w-4 h-4 text-school-gold" />
                        <span className="truncate">{galleryForm.file ? galleryForm.file.name : 'Select file...'}</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => setGalleryForm(prev => ({ ...prev, file: e.target.files[0] }))}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or Image Path (e.g. /sports.jpg)</label>
                      <input 
                        type="text" 
                        value={galleryForm.image}
                        placeholder="Leave empty if uploading a file..."
                        onChange={(e) => setGalleryForm(prev => ({ ...prev, image: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Image Description</label>
                    <textarea 
                      required
                      value={galleryForm.description}
                      onChange={(e) => setGalleryForm(prev => ({ ...prev, description: e.target.value }))}
                      rows="3"
                      className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                    />
                  </div>
                </>
              )}

              {/* Club Editor Fields */}
              {modalType === 'club' && (
                <>
                  {/* SECTION 1: BASIC INFORMATION */}
                  <div className="border-b border-white/10 pb-4 mb-4">
                    <h3 className="text-sm font-extrabold text-school-gold uppercase tracking-wider mb-3">1. Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Club Name</label>
                        <input 
                          type="text" 
                          required
                          value={clubForm.name}
                          onChange={(e) => setClubForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lucide Symbol Icon</label>
                        <select 
                          value={clubForm.icon_name}
                          onChange={(e) => setClubForm(prev => ({ ...prev, icon_name: e.target.value }))}
                          className="w-full bg-slate-900 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                        >
                          {AVAILABLE_ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5 mt-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Brief Summary</label>
                      <textarea 
                        required
                        value={clubForm.description}
                        onChange={(e) => setClubForm(prev => ({ ...prev, description: e.target.value }))}
                        rows="2"
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5 mt-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detailed Overview / Description (Markdown/Plaintext)</label>
                      <textarea 
                        value={clubForm.detailed_description}
                        placeholder="Detailed history, mission statement, etc..."
                        onChange={(e) => setClubForm(prev => ({ ...prev, detailed_description: e.target.value }))}
                        rows="4"
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5 mt-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Activities (Write each activity on a new line)</label>
                      <textarea 
                        required
                        placeholder="e.g.&#10;Daily assembly coordination&#10;Conducting discipline audits&#10;Mentoring junior leaders"
                        value={clubForm.activities}
                        onChange={(e) => setClubForm(prev => ({ ...prev, activities: e.target.value }))}
                        rows="3"
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* SECTION 2: CLUB MEDIA */}
                  <div className="border-b border-white/10 pb-4 mb-4">
                    <h3 className="text-sm font-extrabold text-school-gold uppercase tracking-wider mb-3">2. Media & Branding</h3>
                    
                    {/* Logo Image */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upload Logo File</label>
                        <label className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 hover:border-school-gold text-slate-300 rounded-xl cursor-pointer text-xs font-bold w-full transition-all">
                          <Upload className="w-4 h-4 text-school-gold" />
                          <span className="truncate">{clubForm.logoFile ? clubForm.logoFile.name : 'Select logo...'}</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => setClubForm(prev => ({ ...prev, logoFile: e.target.files[0] }))}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or Logo URL Path</label>
                        <input 
                          type="text" 
                          placeholder="e.g. /gallery-2.jpg"
                          value={clubForm.logo_url}
                          onChange={(e) => setClubForm(prev => ({ ...prev, logo_url: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Banner Image */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upload Banner File</label>
                        <label className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 hover:border-school-gold text-slate-300 rounded-xl cursor-pointer text-xs font-bold w-full transition-all">
                          <Upload className="w-4 h-4 text-school-gold" />
                          <span className="truncate">{clubForm.bannerFile ? clubForm.bannerFile.name : 'Select banner...'}</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => setClubForm(prev => ({ ...prev, bannerFile: e.target.files[0] }))}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or Banner URL Path</label>
                        <input 
                          type="text" 
                          placeholder="e.g. /school-building.jpg"
                          value={clubForm.banner_image}
                          onChange={(e) => setClubForm(prev => ({ ...prev, banner_image: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: LEADERSHIP HISTORY */}
                  <div className="border-b border-white/10 pb-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-extrabold text-school-gold uppercase tracking-wider">3. Year-Wise Leadership History</h3>
                        <p className="text-[10px] text-slate-500 font-medium">Add president / head prefect listings horizontally</p>
                      </div>
                      <button
                        type="button"
                        onClick={addLeaderRow}
                        className="flex items-center gap-1 px-3 py-1.5 bg-school-gold hover:bg-school-gold/90 text-school-navy font-bold rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Leader
                      </button>
                    </div>

                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                      {(!clubForm.leadership_history || clubForm.leadership_history.length === 0) ? (
                        <div className="text-center py-6 border border-dashed border-white/10 rounded-2xl bg-white/5">
                          <p className="text-xs text-slate-500 font-medium">No historical leaders added yet. Click 'Add Leader' to start.</p>
                        </div>
                      ) : (
                        clubForm.leadership_history.map((leader, index) => (
                          <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-3 relative group">
                            {/* Horizontal grid matching image upload, year, name, title, delete */}
                            <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
                              {/* Image Box */}
                              <div className="flex-shrink-0">
                                <label className="relative w-12 h-12 bg-black border border-dashed border-white/20 hover:border-school-gold rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all group/img">
                                  {leader.file || leader.image ? (
                                    <img 
                                      src={leader.file ? URL.createObjectURL(leader.file) : leader.image} 
                                      alt="Leader" 
                                      className="w-full h-full object-cover" 
                                    />
                                  ) : (
                                    <Upload className="w-4 h-4 text-slate-500 group-hover/img:text-school-gold transition-colors" />
                                  )}
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => handleLeaderChange(index, 'file', e.target.files[0])}
                                    className="hidden"
                                  />
                                </label>
                              </div>

                              {/* Year Field */}
                              <div className="w-20 flex-shrink-0">
                                <input 
                                  type="text" 
                                  placeholder="Year" 
                                  required
                                  value={leader.year} 
                                  onChange={(e) => handleLeaderChange(index, 'year', e.target.value)}
                                  className="w-full bg-black/40 border border-white/10 focus:border-school-gold rounded-lg py-2 px-2 text-white text-xs font-bold text-center outline-none"
                                />
                              </div>

                              {/* Name Field */}
                              <div className="flex-grow min-w-[150px]">
                                <input 
                                  type="text" 
                                  placeholder="Leader Name (e.g. Master K. Ramanujan)" 
                                  required
                                  value={leader.name} 
                                  onChange={(e) => handleLeaderChange(index, 'name', e.target.value)}
                                  className="w-full bg-black/40 border border-white/10 focus:border-school-gold rounded-lg py-2 px-3 text-white text-xs font-medium outline-none"
                                />
                              </div>

                              {/* Title / Role Field */}
                              <div className="w-[180px] flex-shrink-0">
                                <input 
                                  type="text" 
                                  placeholder="Title (e.g. Head Prefect)" 
                                  required
                                  value={leader.title} 
                                  onChange={(e) => handleLeaderChange(index, 'title', e.target.value)}
                                  className="w-full bg-black/40 border border-white/10 focus:border-school-gold rounded-lg py-2 px-3 text-white text-xs font-bold outline-none"
                                />
                              </div>

                              {/* Delete Button */}
                              <button 
                                type="button" 
                                onClick={() => removeLeaderRow(index)}
                                className="p-2 bg-red-950/20 hover:bg-red-900/40 text-red-400 hover:text-white rounded-lg transition-colors cursor-pointer flex-shrink-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Additional Message and Achievements fields inside sub-grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-white/5">
                              <div>
                                <textarea 
                                  placeholder="Leader Message Quote (optional)..."
                                  value={leader.message || ''}
                                  onChange={(e) => handleLeaderChange(index, 'message', e.target.value)}
                                  rows="2"
                                  className="w-full bg-black/20 border border-white/10 focus:border-school-gold rounded-lg py-1.5 px-3 text-white text-xs outline-none"
                                />
                              </div>
                              <div>
                                <textarea 
                                  placeholder="Achievements (one per line, optional)..."
                                  value={Array.isArray(leader.achievements) ? leader.achievements.join('\n') : leader.achievements || ''}
                                  onChange={(e) => handleLeaderChange(index, 'achievements', e.target.value)}
                                  rows="2"
                                  className="w-full bg-black/20 border border-white/10 focus:border-school-gold rounded-lg py-1.5 px-3 text-white text-xs outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* SECTION 4: ROSTERS AND HISTORICAL GALLERY */}
                  <div>
                    <h3 className="text-sm font-extrabold text-school-gold uppercase tracking-wider mb-3">4. Rosters & Galleries</h3>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Year-Wise Member Rosters</span>
                        <span className="text-[10px] text-slate-500 font-medium normal-case">Format: Year: Name1, Name2</span>
                      </label>
                      <textarea 
                        value={clubForm.member_lists}
                        placeholder="e.g.&#10;2026: Master K. Ramanujan (Head Prefect), Miss S. Pavithra&#10;2025: Master M. Karthik (Head Prefect), Miss K. Shalini"
                        onChange={(e) => setClubForm(prev => ({ ...prev, member_lists: e.target.value }))}
                        rows="3"
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5 mt-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Year-Wise Photo Gallery</span>
                        <span className="text-[10px] text-slate-500 font-medium normal-case">Format: Year: URL1, URL2</span>
                      </label>
                      <textarea 
                        value={clubForm.gallery_years}
                        placeholder="e.g.&#10;2026: /school-building.jpg, /sports.jpg&#10;2025: /gallery-1.jpg, /cultural-event.jpg"
                        onChange={(e) => setClubForm(prev => ({ ...prev, gallery_years: e.target.value }))}
                        rows="3"
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Custom Page Editor Fields */}
              {modalType === 'page' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Page Title</label>
                      <input 
                        type="text" 
                        required
                        value={pageForm.title}
                        onChange={(e) => handleTitleChangeForSlug(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">URL Slug (e.g. alumni-info)</label>
                      <input 
                        type="text" 
                        required
                        value={pageForm.slug}
                        onChange={(e) => setPageForm(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white font-mono text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upload Banner Photo</label>
                      <label className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 hover:border-school-gold text-slate-300 rounded-xl cursor-pointer text-xs font-bold w-full transition-all">
                        <Upload className="w-4 h-4 text-school-gold" />
                        <span className="truncate">{pageForm.file ? pageForm.file.name : 'Select file...'}</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => setPageForm(prev => ({ ...prev, file: e.target.files[0] }))}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or Banner Image Path</label>
                      <input 
                        type="text" 
                        value={pageForm.banner_image}
                        placeholder="/gallery-2.jpg"
                        onChange={(e) => setPageForm(prev => ({ ...prev, banner_image: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Page Content (HTML support enabled)</label>
                    <textarea 
                      required
                      placeholder="e.g.&#10;<h2>Our Mission</h2>&#10;<p>Writing paragraphs and building rich portals for students...</p>"
                      value={pageForm.content}
                      onChange={(e) => setPageForm(prev => ({ ...prev, content: e.target.value }))}
                      rows="8"
                      className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white font-mono text-sm outline-none transition-all"
                    />
                  </div>
                </>
              )}

              {/* Principal Editor Fields */}
              {modalType === 'principal' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Principal Name</label>
                      <input 
                        type="text" 
                        required
                        value={principalForm.name}
                        onChange={(e) => setPrincipalForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Period (e.g. 1934 - 1948)</label>
                      <input 
                        type="text" 
                        required
                        value={principalForm.period}
                        onChange={(e) => setPrincipalForm(prev => ({ ...prev, period: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upload Portrait Photo</label>
                      <label className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 hover:border-school-gold text-slate-300 rounded-xl cursor-pointer text-xs font-bold w-full transition-all">
                        <Upload className="w-4 h-4 text-school-gold" />
                        <span className="truncate">{principalForm.file ? principalForm.file.name : 'Select file...'}</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => setPrincipalForm(prev => ({ ...prev, file: e.target.files[0] }))}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or Image Path (e.g. /principal.jpg)</label>
                      <input 
                        type="text" 
                        value={principalForm.image}
                        placeholder="Leave empty if uploading a file..."
                        onChange={(e) => setPrincipalForm(prev => ({ ...prev, image: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Principal Bio / Legacy Summary</label>
                    <textarea 
                      required
                      value={principalForm.description}
                      onChange={(e) => setPrincipalForm(prev => ({ ...prev, description: e.target.value }))}
                      rows="4"
                      className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                    />
                  </div>
                </>
              )}

              {/* Academic Editor Fields */}
              {modalType === 'academic' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Program Title</label>
                      <input 
                        type="text" 
                        required
                        value={academicForm.title}
                        onChange={(e) => setAcademicForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Curriculum Category</label>
                      <select 
                        value={academicForm.category}
                        onChange={(e) => setAcademicForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-slate-900 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      >
                        <option value="Primary">Primary</option>
                        <option value="Junior Secondary">Junior Secondary</option>
                        <option value="Ordinary Level">Ordinary Level</option>
                        <option value="Advanced Level">Advanced Level</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upload Cover Photo</label>
                      <label className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 hover:border-school-gold text-slate-300 rounded-xl cursor-pointer text-xs font-bold w-full transition-all">
                        <Upload className="w-4 h-4 text-school-gold" />
                        <span className="truncate">{academicForm.file ? academicForm.file.name : 'Select file...'}</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => setAcademicForm(prev => ({ ...prev, file: e.target.files[0] }))}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or Image Path (e.g. /gallery-1.jpg)</label>
                      <input 
                        type="text" 
                        value={academicForm.image}
                        placeholder="Leave empty if uploading a file..."
                        onChange={(e) => setAcademicForm(prev => ({ ...prev, image: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Core Subjects (Comma separated)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Mother Tongue (Tamil), Mathematics, English Language"
                      value={academicForm.subjects}
                      onChange={(e) => setAcademicForm(prev => ({ ...prev, subjects: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Program Description</label>
                    <textarea 
                      required
                      value={academicForm.description}
                      onChange={(e) => setAcademicForm(prev => ({ ...prev, description: e.target.value }))}
                      rows="4"
                      className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                    />
                  </div>
                </>
              )}

              {/* Achievement Editor Fields */}
              {modalType === 'achievement' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Achievement Title</label>
                      <input 
                        type="text" 
                        required
                        value={achievementForm.title}
                        onChange={(e) => setAchievementForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Year</label>
                      <input 
                        type="text" 
                        required
                        value={achievementForm.year}
                        onChange={(e) => setAchievementForm(prev => ({ ...prev, year: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Competition Level</label>
                      <select 
                        value={achievementForm.level}
                        onChange={(e) => setAchievementForm(prev => ({ ...prev, level: e.target.value }))}
                        className="w-full bg-slate-900 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      >
                        <option value="National">National Level</option>
                        <option value="Province">Province Level</option>
                        <option value="Zonal">Zonal Level</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category</label>
                      <select 
                        value={achievementForm.category}
                        onChange={(e) => setAchievementForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-slate-900 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      >
                        <option value="Academic">Academic</option>
                        <option value="Sports">Sports</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upload Media Photo</label>
                      <label className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 hover:border-school-gold text-slate-300 rounded-xl cursor-pointer text-xs font-bold w-full transition-all">
                        <Upload className="w-4 h-4 text-school-gold" />
                        <span className="truncate">{achievementForm.file ? achievementForm.file.name : 'Select file...'}</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => setAchievementForm(prev => ({ ...prev, file: e.target.files[0] }))}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or Image Path (e.g. /sports.jpg)</label>
                      <input 
                        type="text" 
                        value={achievementForm.image}
                        placeholder="Leave empty if uploading a file..."
                        onChange={(e) => setAchievementForm(prev => ({ ...prev, image: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Achievement Description</label>
                    <textarea 
                      required
                      value={achievementForm.description}
                      onChange={(e) => setAchievementForm(prev => ({ ...prev, description: e.target.value }))}
                      rows="4"
                      className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                    />
                  </div>
                </>
              )}

              {/* Timetable Editor Fields */}
              {modalType === 'timetable' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Timetable Title</label>
                      <input 
                        type="text" 
                        required
                        value={timetableForm.title}
                        onChange={(e) => setTimetableForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Academic Year</label>
                      <input 
                        type="text" 
                        required
                        value={timetableForm.academic_year}
                        onChange={(e) => setTimetableForm(prev => ({ ...prev, academic_year: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Schedule Type</label>
                      <select 
                        value={timetableForm.type}
                        onChange={(e) => setTimetableForm(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full bg-slate-900 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      >
                        <option value="Class">Class Timetable</option>
                        <option value="Exam">Examination Schedule</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Grade / Stream / Level</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Grade 10, A/L Commerce, All Grades"
                        value={timetableForm.grade_stream}
                        onChange={(e) => setTimetableForm(prev => ({ ...prev, grade_stream: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upload Schedule PDF / Image</label>
                      <label className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 hover:border-school-gold text-slate-300 rounded-xl cursor-pointer text-xs font-bold w-full transition-all">
                        <Upload className="w-4 h-4 text-school-gold" />
                        <span className="truncate">{timetableForm.file ? timetableForm.file.name : 'Select file...'}</span>
                        <input 
                          type="file" 
                          accept="application/pdf,image/*"
                          onChange={(e) => setTimetableForm(prev => ({ ...prev, file: e.target.files[0] }))}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or Resource URL Link</label>
                      <input 
                        type="text" 
                        value={timetableForm.file_url}
                        placeholder="/school-building.jpg"
                        onChange={(e) => setTimetableForm(prev => ({ ...prev, file_url: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Submit Buttons */}
              <div className="flex justify-end items-center gap-3 border-t border-white/5 pt-5 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-sm font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-school-gold hover:bg-school-gold-dark text-school-navy font-black rounded-xl text-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="w-5 h-5 border-2 border-school-navy border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>Save Record</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

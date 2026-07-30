import { Project, SkillCategory, Certification, Education } from '../types';

export const PERSONAL_INFO = {
  name: 'KIRAN KUMAR BEHERA',
  shortName: 'Kiran',
  headline: 'B.Tech CSE Student | CSE Undergraduate | AI, ML & Data Science Enthusiast',
  status: 'Open for Internship Opportunities & Research Collaborations',
  location: 'Berhampur, Odisha, India',
  email: 'kirankumarbehera2006@gmail.com',
  phone: '7735310875',
  github: 'https://github.com/Kiran2006NGU',
  linkedin: 'https://www.linkedin.com/in/kiran-kumar-behera-53aa08306/',
  university: 'NIST University, Berhampur',
  cgpa: '9.82',
  year: '3rd Year Undergraduate (2024 - Present)',
  about: `I am a third-year B.Tech CSE student at NIST University with a strong interest in Artificial Intelligence, Machine Learning, and scientific computing. I am motivated to explore how computational methods can be applied to solve complex scientific problems. I am eager to gain research experience and contribute to interdisciplinary projects with multiple hackathon competition participations.`,
  objective: `Motivated third-year B.Tech Computer Science student with strong academic performance and a keen interest in Artificial Intelligence, Data Science, and Software Development. Seeking a challenging internship opportunity to apply computational and problem-solving skills in real-world and research-driven environments.`,
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  resumePdfUrl: '',
};

export const EDUCATION_DATA: Education = {
  degree: 'B.Tech in Computer Science and Engineering',
  institution: 'NIST University, Berhampur',
  location: 'Berhampur, Odisha, India',
  period: '2024 – Present',
  cgpa: '9.82 / 10.0',
  highlights: [
    'Secured a top academic rank with CGPA of 9.82 in B.Tech CSE',
    'Consistently among the top performers in class across all semesters',
    'Active participant in university coding competitions & hackathons',
    'Specializing in Data Structures, Algorithms, AI/ML, and Full-Stack Engineering',
  ],
  courses: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming (C++/Java)',
    'Database Management Systems',
    'Operating Systems & Linux Kernel',
    'Computer Networks & Protocols',
    'Machine Learning & Artificial Intelligence',
    'Theory of Computation & Discrete Mathematics'
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'campus-energy-dashboard',
    title: 'Campus Energy Dashboard',
    category: 'Fullstack',
    shortDescription: 'Fullstack energy monitoring application tracking real-time campus power consumption, load distribution, and efficiency metrics.',
    fullDescription: 'An end-to-end fullstack platform designed to monitor, visualize, and analyze energy usage across various campus departments and facilities. Built with interactive analytics charts, load anomaly alerts, and energy saving forecasting tools.',
    techStack: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Chart.js', 'REST API'],
    keyFeatures: [
      'Real-time power consumption visualization across campus buildings',
      'Load spike detection and anomaly warning algorithms',
      'Interactive energy savings analytics & carbon footprint metrics',
      'Role-based access control for facility administrators',
    ],
    githubUrl: 'https://github.com/Kiran2006NGU',
    imageAccent: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
    architectureNotes: 'Frontend built with React and Tailwind CSS; Express backend handles metric aggregation and serves analytical endpoints with caching.',
    metrics: [
      { label: 'Energy Savings', value: '18.4%' },
      { label: 'Monitored Nodes', value: '42 Campus Labs' },
      { label: 'Telemetry Ping', value: '< 150ms' }
    ],
    sampleCodeOrOutput: `// Energy Load Calculation Logic
const calculateCampusLoad = (buildingMetrics) => {
  return buildingMetrics.reduce((acc, curr) => {
    const isPeakHour = curr.hour >= 9 && curr.hour <= 17;
    const factor = isPeakHour ? 1.25 : 0.85;
    return acc + (curr.kwUsage * factor);
  }, 0);
};`
  },
  {
    id: 'delay-analysis-system',
    title: 'Delay Analysis System',
    category: 'Fullstack',
    shortDescription: 'Fullstack server-handled diagnostic platform that logs, models, and analyzes process and network transmission delays.',
    fullDescription: 'A robust server handling system developed to diagnose execution and data transfer latencies across distributed environments. Features server logging tools, process tracing, and database indexing for high-performance delay resolution.',
    techStack: ['Fullstack', 'Node.js', 'Express', 'phpMyAdmin', 'PuTTY', 'WinSCP', 'Linux CLI'],
    keyFeatures: [
      'Automated process latency tracking & bottleneck identification',
      'Server configuration management with PuTTY and WinSCP tools',
      'Database query optimization & trace logging in phpMyAdmin',
      'Interactive latency telemetry reporting dashboard',
    ],
    githubUrl: 'https://github.com/Kiran2006NGU',
    imageAccent: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30',
    architectureNotes: 'Server-side logging middleware intercepts requests, measures round-trip time (RTT), and persists traces for offline analysis.',
    metrics: [
      { label: 'Trace Accuracy', value: '99.2%' },
      { label: 'Latency Reduction', value: '35ms' },
      { label: 'Server Tools', value: 'PuTTY / WinSCP' }
    ],
    sampleCodeOrOutput: `// Server Latency Interceptor
app.use((req, res, next) => {
  const startMs = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - startMs;
    logDelayTrace(req.path, req.method, duration);
  });
  next();
});`
  },
  {
    id: 'ai-chatbot',
    title: 'AI ChatBot',
    category: 'AI / ML',
    shortDescription: 'Intelligent conversational bot leveraging natural language understanding for automated user query resolution.',
    fullDescription: 'An interactive AI chatbot designed to assist users with contextual automated responses. Built with modern NLP pipelines, user session tracking, and fallback knowledge-retrieval mechanisms.',
    techStack: ['Python', 'AI/ML', 'Gemini API', 'NLP', 'JavaScript', 'Tailwind CSS'],
    keyFeatures: [
      'Context-aware conversational query resolution',
      'Custom domain knowledge retrieval pipeline',
      'Responsive, real-time typing animation interface',
      'Conversation history persistence and reset options',
    ],
    githubUrl: 'https://github.com/Kiran2006NGU',
    imageAccent: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    architectureNotes: 'Integrates natural language embeddings with prompt-engineering rules for high relevance and low latency.',
    metrics: [
      { label: 'Model', value: 'Gemini 2.5' },
      { label: 'Response Time', value: '0.8s' },
      { label: 'Query Accuracy', value: '96.5%' }
    ],
    sampleCodeOrOutput: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'Help the user with technical queries.',
});`
  },
  {
    id: 'brand-logo-detection',
    title: 'Brand Logo Detection',
    category: 'AI / ML',
    shortDescription: 'Computer vision & machine learning system using OpenCV to detect and classify brand logos in real-time visual feeds.',
    fullDescription: 'A computer vision application trained to recognize, bound, and classify corporate brand logos within video streams and static images using OpenCV feature extraction and classification algorithms.',
    techStack: ['Python', 'OpenCV', 'Machine Learning', 'NumPy', 'Image Processing'],
    keyFeatures: [
      'Real-time video frame logo feature matching',
      'Bounding box highlight with detection confidence scores',
      'Scale and rotation invariant feature detection (SIFT/ORB)',
      'Custom image preprocessing and noise filtering pipeline',
    ],
    githubUrl: 'https://github.com/Kiran2006NGU',
    imageAccent: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
    architectureNotes: 'Utilizes OpenCV image filtering, keypoint detection, and template matching with threshold confidence scoring.',
    metrics: [
      { label: 'FPS', value: '60 FPS' },
      { label: 'Match Precision', value: '94.8%' },
      { label: 'Tech', value: 'OpenCV / SIFT' }
    ],
    sampleCodeOrOutput: `import cv2

def detect_logo(frame, template):
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    res = cv2.matchTemplate(gray_frame, template, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
    return max_val, max_loc`
  },
  {
    id: 'smart-food-ordering-system',
    title: 'Smart Food Ordering System',
    category: 'C++ / DSA',
    shortDescription: 'High-performance C++ software utilizing custom data structures, priority order queues, and OOP principles.',
    fullDescription: 'A console-based food ordering management system engineered in C++ to demonstrate efficient memory utilization, priority-queue-driven order dispatch, menu search trees, and file-based data persistence.',
    techStack: ['C++', 'Data Structures & Algorithms', 'OOP', 'File Handling'],
    keyFeatures: [
      'Custom Priority Queue for urgent order dispatching',
      'Fast O(log N) menu searching using sorted data structures',
      'Object-oriented order and bill generation engine',
      'Persistent record storage using C++ file streams',
    ],
    githubUrl: 'https://github.com/Kiran2006NGU',
    imageAccent: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
    architectureNotes: 'Built entirely in pure C++ using standard templates and OOP classes for Order, MenuItem, and CustomerQueue.',
    metrics: [
      { label: 'Time Complexity', value: 'O(log N)' },
      { label: 'Language', value: 'ISO C++17' },
      { label: 'Memory Footprint', value: '< 2.4 MB' }
    ],
    sampleCodeOrOutput: `#include <iostream>
#include <queue>

struct Order {
  int orderId;
  std::string customerName;
  int priority; // High priority for rush orders
  
  bool operator<(const Order& other) const {
    return priority < other.priority;
  }
};`
  },
  {
    id: 'simple-student-task-tracker',
    title: 'Simple Student Task Tracker',
    category: 'Systems & Tools',
    shortDescription: 'Intuitive web application tailored for students to track coursework deadlines, priorities, and task progress.',
    fullDescription: 'A lightweight and clean student task manager designed to streamline academic workflow, assignment tracking, priority color coding, and deadline countdowns.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage', 'Responsive Design'],
    keyFeatures: [
      'Interactive task creation with deadline dates & categories',
      'Priority tags and status filters (Pending, In Progress, Complete)',
      'Client-side LocalStorage persistence for instant loads',
      'Clean mobile-friendly layout and task statistics',
    ],
    githubUrl: 'https://github.com/Kiran2006NGU',
    imageAccent: 'from-violet-500/20 to-fuchsia-500/20 border-violet-500/30',
    architectureNotes: 'Zero-dependency JavaScript application with LocalStorage state synchronization.',
    metrics: [
      { label: 'Bundle Size', value: '12 KB' },
      { label: 'Load Time', value: '45ms' },
      { label: 'Storage', value: 'Client LocalStorage' }
    ],
    sampleCodeOrOutput: `// LocalStorage Synchronization
function saveTasksToStorage(tasks) {
  localStorage.setItem('kiran_tasks', JSON.stringify(tasks));
}`
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    iconName: 'Code',
    skills: [
      { name: 'C++', level: 95, category: 'Languages', tag: 'Primary / DSA', description: 'Advanced C++17, STL containers, pointers, memory optimization, competitive problem solving.' },
      { name: 'C', level: 90, category: 'Languages', tag: 'Core Systems', description: 'Memory management, pointers, bitwise logic, foundational algorithms.' },
      { name: 'Python', level: 90, category: 'Languages', tag: 'AI / ML / OpenCV', description: 'NumPy, OpenCV, Machine Learning workflows, script automation, Gemini API.' },
      { name: 'Java', level: 85, category: 'Languages', tag: 'OOP / DSA', description: 'Object Oriented Programming design patterns, Collections framework.' },
      { name: 'JavaScript / TypeScript', level: 88, category: 'Languages', tag: 'Web / ES6+', description: 'Modern async/await, DOM manipulation, React component state management.' },
      { name: 'HTML5 & CSS3', level: 92, category: 'Languages', tag: 'Frontend', description: 'Responsive layouts, Flexbox/Grid, Tailwind CSS utilities, animations.' },
      { name: 'DSA in C', level: 95, category: 'Languages', tag: 'Foundational', description: 'Linked lists, binary search trees, heap priority queues, graph algorithms.' },
    ],
  },
  {
    title: 'Core CS & Concepts',
    iconName: 'Cpu',
    skills: [
      { name: 'Data Structures & Algorithms', level: 96, category: 'Core CS', tag: 'Problem Solving', description: 'Trees, Graphs, Dynamic Programming, Greedy, Sorting & Searching optimization.' },
      { name: 'Object-Oriented Programming (OOP)', level: 92, category: 'Core CS', tag: 'Architecture', description: 'Inheritance, Polymorphism, Encapsulation, Abstraction, SOLID principles.' },
      { name: 'Problem Solving', level: 95, category: 'Core CS', tag: 'Competitive', description: 'Consistently top CGPA performer, high efficiency algorithmic approach.' },
      { name: 'Scientific Computing', level: 88, category: 'Core CS', tag: 'Research Interest', description: 'Applying computational techniques to solve complex multi-domain problems.' },
    ],
  },
  {
    title: 'Technologies & Server Tools',
    iconName: 'Terminal',
    skills: [
      { name: 'Git & GitHub', level: 90, category: 'Tools', tag: 'Version Control', description: 'Branching strategies, pull requests, commit conventions, project repositories.' },
      { name: 'VS Code', level: 95, category: 'Tools', tag: 'IDE', description: 'Extensions, debugging, terminal workflows, snippet shortcuts.' },
      { name: 'phpMyAdmin & MySQL', level: 85, category: 'Tools', tag: 'Database', description: 'Relational database schema modeling, SQL query optimization.' },
      { name: 'PuTTY & WinSCP', level: 86, category: 'Tools', tag: 'Server SSH / Transfer', description: 'Remote server administration, SSH key management, secure file syncing.' },
      { name: 'VirtualBox (VM Box)', level: 85, category: 'Tools', tag: 'Virtualization', description: 'Environment isolation, guest OS setup, Linux machine configuration.' },
      { name: 'Kali Linux & Bash CLI', level: 88, category: 'Tools', tag: 'Linux CLI', description: 'Shell scripting, network utilities, filesystem navigation, permission controls.' },
    ],
  },
  {
    title: 'Domains of Interest',
    iconName: 'Sparkles',
    skills: [
      { name: 'Artificial Intelligence', level: 92, category: 'Domains', tag: 'Focus', description: 'Prompt engineering, LLM API integration, automated reasoning.' },
      { name: 'Machine Learning', level: 88, category: 'Domains', tag: 'Focus', description: 'Feature extraction, regression, classification, OpenCV vision algorithms.' },
      { name: 'Data Science', level: 85, category: 'Domains', tag: 'Analytics', description: 'Exploratory data analysis, statistical modeling, visual dashboards.' },
      { name: 'Fullstack Web Development', level: 90, category: 'Domains', tag: 'Fullstack', description: 'React, Node.js, Express, RESTful APIs, responsive UI design.' },
      { name: 'Cybersecurity', level: 80, category: 'Domains', tag: 'Exploration', description: 'Network security principles, Linux hardening, vulnerability concepts.' },
      { name: 'DevOps', level: 82, category: 'Domains', tag: 'Tools & Linux', description: 'Server deployment workflows, CI/CD pipeline basics, environmental setup.' },
    ],
  },
  {
    title: 'Soft Skills',
    iconName: 'Users',
    skills: [
      { name: 'Teamwork & Leadership', level: 92, category: 'Soft Skills', tag: 'Collaborative', description: 'Hackathon team coordination, project guidance, peer code reviews.' },
      { name: 'Consistency & Discipline', level: 98, category: 'Soft Skills', tag: 'Work Ethic', description: 'Maintained stellar 9.82 CGPA across rigorous engineering coursework.' },
      { name: 'Problem Solving Mindset', level: 95, category: 'Soft Skills', tag: 'Analytical', description: 'Methodical breakdown of complex engineering issues.' },
      { name: 'Quick Learner', level: 96, category: 'Soft Skills', tag: 'Adaptable', description: 'Rapidly absorbs new languages, frameworks, and server utilities.' },
    ],
  },
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: 'rinl-internship',
    title: 'Fullstack Internship',
    issuer: 'RINL Plant, Visakhapatnam',
    description: 'Industrial internship experience building fullstack software solutions, server integration, and industrial computing workflows.',
    badgeColor: 'emerald',
    skillsCovered: ['Fullstack Web Dev', 'Industrial Software', 'Database Management', 'Server Workflows'],
  },
  {
    id: 'outskill-genai',
    title: 'Gen AI Certification',
    issuer: 'Outskill',
    description: 'Specialized training in Generative AI architectures, prompt engineering, LLM application development, and AI models integration.',
    badgeColor: 'purple',
    skillsCovered: ['Generative AI', 'LLM Integration', 'Prompt Engineering', 'AI Solutions'],
  },
  {
    id: 'cisco-cpp',
    title: 'C++ Certification',
    issuer: 'Cisco Networking Academy',
    description: 'Verified certification in advanced C++ programming, object-oriented concepts, memory allocation, and performance algorithms.',
    badgeColor: 'blue',
    skillsCovered: ['C++', 'OOP', 'Memory Management', 'Algorithms'],
  },
  {
    id: 'cisco-c-essentials',
    title: 'C Essentials Certification',
    issuer: 'Cisco Networking Academy',
    description: 'Core foundational certification covering low-level C syntax, pointers, data structures, and computer memory fundamentals.',
    badgeColor: 'cyan',
    skillsCovered: ['C Language', 'Pointers', 'Data Structures', 'System Fundamentals'],
  },
  {
    id: 'python-cert',
    title: 'Python Certification',
    issuer: 'Recognized Institute',
    description: 'Comprehensive certification in Python development, object modeling, data manipulation, and scientific computing packages.',
    badgeColor: 'amber',
    skillsCovered: ['Python', 'Data Analytics', 'Automation', 'Scripting'],
  },
  {
    id: 'apll-it-course',
    title: 'APLL IT Course Certification',
    issuer: 'APLL',
    description: 'Professional IT fundamentals qualification covering hardware, operating systems, networking basics, and software tools.',
    badgeColor: 'indigo',
    skillsCovered: ['IT Infrastructure', 'Networking Basics', 'Software Systems', 'Computing'],
  },
];

export const ACADEMIC_ACHIEVEMENTS = [
  {
    title: 'Stellar 9.82 CGPA in B.Tech CSE',
    description: 'Secured an outstanding CGPA of 9.82 out of 10 at NIST University, Berhampur.',
    icon: 'Trophy',
  },
  {
    title: 'Top Academic Rank Holder',
    description: 'Consistently recognized among top performers across all academic semesters.',
    icon: 'Award',
  },
  {
    title: 'Multiple Hackathon Participations',
    description: 'Active contributor and participant in competitive coding & hackathon competitions.',
    icon: 'Zap',
  },
];

export const DEFAULT_PORTFOLIO_DATA = {
  personalInfo: PERSONAL_INFO,
  education: EDUCATION_DATA,
  projects: PROJECTS_DATA,
  skills: SKILL_CATEGORIES,
  certifications: CERTIFICATIONS_DATA,
  achievements: ACADEMIC_ACHIEVEMENTS,
};


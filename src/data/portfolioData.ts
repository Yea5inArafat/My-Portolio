export interface ContactInfo {
  id: string;
  title: string;
  value: string;
  link: string;
  icon: string;
  isGlow?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  iconPath: string;
  actionText?: string;
  actionUrl?: string;
  badge?: string;
}

export interface SkillItem {
  name: string;
  percentage: number;
}

export interface TimelineItem {
  title: string;
  period: string;
  institution?: string;
  description: string;
  bullets?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'systems' | 'algorithms' | 'academic' | 'dsa';
  categoryLabel: string;
  description: string;
  image?: string;
  gradient: string;
  icon: string;
  link?: string;
  tags: string[];
}

export const PERSONAL_INFO = {
  name: "Md Yeasin Arafat",
  title: "Computer Science Student | Competitive Programmer | Aspiring Software Developer",
  shortRole: "CS Student & Competitive Programmer",
  location: "Dinajpur, Bangladesh",
  avatarUrl: "/src/assets/images/avatar_clean_notext_1791483754652.jpg",
  avatarLightUrl: "/src/assets/images/avatar_light_mode_1791498014473.jpg",
  logoUrl: "/assets/images/yeasin_avatar.jpg",
  bioParagraphs: [
    "I'm a Computer Science enthusiast passionate about problem solving, Data Structures & Algorithms, competitive programming, and software development.",
    "I enjoy learning new technologies, exploring efficient solutions, and turning complex problems into simple and understandable ones.",
    "Currently, I'm strengthening my skills in C++, Java, DSA, and software development while building projects and continuously improving my technical knowledge."
  ],
  email: "yea5inar4fat@gmail.com",
  blog: "yea5inarafat.blogspot.com",
  blogUrl: "https://yea5inarafat.blogspot.com",
  university: {
    name: "Hajee Mohammad Danesh Science and Technology University (HSTU)",
    department: "Computer Science & Engineering (CSE)",
    batch: "CSE'21 Batch (HSTU'24)"
  }
};

export const CONTACT_ITEMS: ContactInfo[] = [
  {
    id: "email",
    title: "Email",
    value: "yea5inar4fat@gmail.com",
    link: "mailto:yea5inar4fat@gmail.com",
    icon: "mail"
  },
  {
    id: "github",
    title: "GitHub",
    value: "Yea5inArafat",
    link: "https://github.com/Yea5inArafat",
    icon: "github"
  },
  {
    id: "codeforces",
    title: "Codeforces",
    value: "Yea5inArafat",
    link: "https://codeforces.com/profile/Yea5inArafat",
    icon: "codeforces"
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    value: "Yea5inArafat",
    link: "https://linkedin.com/in/Yea5inArafat",
    icon: "linkedin"
  },
  {
    id: "discord",
    title: "Discord",
    value: "Yea5inArafat",
    link: "https://discord.com/users/Yea5inArafat",
    icon: "discord"
  },
  {
    id: "telegram",
    title: "Telegram",
    value: "@Yea5inArafat",
    link: "https://t.me/Yea5inArafat",
    icon: "telegram"
  },
  {
    id: "x",
    title: "X (Twitter)",
    value: "Yea5inArafat",
    link: "https://x.com/Yea5inArafat",
    icon: "twitter"
  },
  {
    id: "facebook",
    title: "Facebook",
    value: "Yea5inArafat",
    link: "https://facebook.com/Yea5inArafat",
    icon: "facebook"
  },
  {
    id: "instagram",
    title: "Instagram",
    value: "Yea5inArafat",
    link: "https://instagram.com/Yea5inArafat",
    icon: "instagram"
  },
  {
    id: "blog",
    title: "Personal Blog",
    value: "yea5inarafat.blogspot.com",
    link: "https://yea5inarafat.blogspot.com",
    icon: "globe",
    isGlow: true
  }
];

export const WHAT_IM_DOING: ServiceItem[] = [
  {
    id: "competitive-programming",
    title: "Competitive Programming & Problem Solving",
    description: "Actively practicing algorithmic challenges in C++, optimizing time & space complexities, and participating in online judge contests.",
    iconPath: "/assets/images/code-working-outline.svg"
  },
  {
    id: "dsa-core",
    title: "Data Structures & Algorithms Implementation",
    description: "Comprehensive implementation of tree structures, graphs, heaps, dynamic programming, sorting, and search algorithms from the ground up.",
    iconPath: "/assets/images/construct-outline.svg"
  },
  {
    id: "software-development",
    title: "C++ & Java Software Development",
    description: "Developing robust object-oriented systems, campus utility platforms, and foundational desktop & backend software.",
    iconPath: "/assets/images/server-outline.svg"
  },
  {
    id: "academic-projects",
    title: "Academic Systems & Research",
    description: "Designing real-world software solutions, exploring UI/UX, GPS mapping logic, and modern software paradigms.",
    iconPath: "/assets/images/create-outline.svg"
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "problem-solving-tutoring",
    title: "Data Structures & Algorithms Guidance",
    description: "Algorithm walkthroughs, pseudocode translation, complexity analysis, and deep-dive explanations of searching, sorting, heaps, and dynamic programming.",
    iconPath: "/assets/images/code-working-outline.svg",
    actionText: "Discuss Topics",
    actionUrl: "mailto:yea5inar4fat@gmail.com?subject=DSA%20Discussion",
    badge: "Core Expertise"
  },
  {
    id: "cpp-java-solutions",
    title: "C++ & Java Application Development",
    description: "Clean, object-oriented codebases written in C++ and Java with strict adhering to best practices, modular structures, and performance optimization.",
    iconPath: "/assets/images/server-outline.svg",
    actionText: "View Code on GitHub",
    actionUrl: "https://github.com/Yea5inArafat",
    badge: "Software Engineering"
  },
  {
    id: "code-debugging",
    title: "Code Debugging & Algorithm Optimization",
    description: "Diagnosing logical bugs, fixing edge cases, and transforming brute-force implementations into optimal O(N) or O(N log N) solutions.",
    iconPath: "/assets/images/construct-outline.svg",
    actionText: "Get in Touch",
    actionUrl: "mailto:yea5inar4fat@gmail.com?subject=Code%20Review%20Inquiry",
    badge: "Problem Solving"
  },
  {
    id: "academic-collaborations",
    title: "Academic Programming & System Concepts",
    description: "Collaborative engineering on university projects, campus transportation utilities, and technical documentation writing.",
    iconPath: "/assets/images/create-outline.svg",
    actionText: "Read Tech Blog",
    actionUrl: "https://yea5inarafat.blogspot.com",
    badge: "HSTU CSE'21"
  }
];

export const SKILLS_LIST: SkillItem[] = [
  { name: "C++", percentage: 85 },
  { name: "Problem Solving", percentage: 85 },
  { name: "Data Structures & Algorithms", percentage: 80 },
  { name: "Competitive Programming", percentage: 80 },
  { name: "Object-Oriented Programming (OOP)", percentage: 70 },
  { name: "Java", percentage: 65 },
  { name: "Git & GitHub", percentage: 65 },
  { name: "VS Code", percentage: 90 },
  { name: "HTML & CSS", percentage: 60 },
  { name: "JavaScript", percentage: 50 },
  { name: "SQL & Databases", percentage: 50 }
];

export const EXPERIENCE_TIMELINE: TimelineItem[] = [
  {
    title: "Competitive Programming & Software Development",
    period: "2024 — Present",
    institution: "Personal Engineering & Contest Practice",
    description: "Focused dedication to competitive programming and algorithmic problem solving with C++.",
    bullets: [
      "Practicing competitive programming and solving algorithmic problems using C++.",
      "Studying and implementing Data Structures & Algorithms from foundational to advanced levels.",
      "Exploring Java and software development paradigms alongside modern C++."
    ]
  }
];

export const EDUCATION_TIMELINE: TimelineItem[] = [
  {
    title: "B.Sc. in Computer Science & Engineering (CSE)",
    period: "2024 — 2028 / Present",
    institution: "Hajee Mohammad Danesh Science and Technology University (HSTU)",
    description: "CSE'21 Batch at HSTU, Dinajpur, Bangladesh. In-depth focus on Computer Science fundamentals, algorithm design, software architecture, and theoretical computing.",
    bullets: [
      "Data Structures & Algorithms and Advanced Problem Solving",
      "Object-Oriented Programming (OOP) in C++ and Java",
      "Database Management Systems (DBMS), SQL, and Computer Systems",
      "Software Development Life Cycles and System Engineering"
    ]
  }
];

export const LEARNING_FOCUS = [
  "Data Structures & Algorithms",
  "Competitive Programming",
  "C++ Modern Standards",
  "Java Ecosystem",
  "Object-Oriented Programming",
  "Software Development",
  "Computer Science Fundamentals"
];

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "HSTU BUS Tracker",
    category: "systems",
    categoryLabel: "Campus Utility App",
    description: "A specialized bus tracking application concept designed for HSTU students to monitor bus positions in real-time, improving transit convenience, route visibility, and campus schedule awareness.",
    image: "/assets/images/bus_tracker_app_1791472687798.jpg",
    gradient: "from-teal-950/70 via-[#1e1e1f] to-emerald-950/50",
    icon: "bus",
    link: "https://github.com/Yea5inArafat",
    tags: ["Mobile App", "GPS", "Location Tracking", "Maps", "UI/UX", "HSTU"]
  },
  {
    id: "p2",
    title: "Competitive Programming & DSA Repository",
    category: "algorithms",
    categoryLabel: "Algorithm Codebase",
    description: "A comprehensive collection of competitive programming solutions and Data Structures & Algorithms implementations in C++, ranging from fundamental algorithms through advanced contest problem-solving techniques.",
    image: "/assets/images/dsa_algorithms_code_1791472698765.jpg",
    gradient: "from-amber-950/70 via-[#1e1e1f] to-orange-950/50",
    icon: "code",
    link: "https://github.com/Yea5inArafat",
    tags: ["C++", "Algorithms", "Data Structures", "Competitive Programming", "Complexity Analysis"]
  },
  {
    id: "p3",
    title: "DSA Algorithm Notes & Mechanism Guide",
    category: "dsa",
    categoryLabel: "Algorithm Documentation",
    description: "A structured repository of DSA notes detailing algorithms from basic to advanced levels (searching, sorting, priority queues, heaps, and dynamic programming) with mechanisms, pseudocode, C++ code, and optimization insights.",
    gradient: "from-blue-950/70 via-[#1e1e1f] to-indigo-950/50",
    icon: "book",
    link: "https://yea5inarafat.blogspot.com",
    tags: ["C++", "DSA", "Algorithms", "Dynamic Programming", "Optimization", "Technical Notes"]
  }
];

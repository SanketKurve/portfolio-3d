// ============================================
// 🎯 PORTFOLIO CONFIGURATION
// ============================================
// EDIT THIS FILE TO UPDATE YOUR PORTFOLIO
// All content is controlled from here!
// ============================================

export const portfolioConfig = {

    // ===== PERSONAL INFO =====
    personal: {
        name: "Sanket Shrikant Kurve",
        firstName: "Sanket",
        title: "Full-Stack Developer",
        tagline: "From back-end logic to front-end MAGIC",
        highlightWord: "MAGIC",

        bio: {
            short: "Passionate full-stack developer who thrives on learning bleeding-edge technologies.",
            long: `I'm a full-stack developer with a superpower: I adopt new technologies at lightning speed. 
             Whether it's building AI-powered applications or crafting seamless web experiences, 
             I turn complex problems into elegant solutions. My code doesn't just work—it excels.`
        },

        superpower: "Lightning-fast technology adoption",
        location: "Nagpur, India",
        status: "Open to opportunities",

        achievements: [
            {
                icon: "🚀",
                title: "Tech Speedrunner",
                description: "Mastered 8+ technologies in record time",
                unlocked: true
            },
            {
                icon: "🤖",
                title: "AI Whisperer",
                description: "Built 2+ AI-powered applications",
                unlocked: true
            },
            {
                icon: "⚡",
                title: "Full-Stack Wizard",
                description: "Commands both frontend and backend magic",
                unlocked: true
            },
            {
                icon: "🎯",
                title: "Problem Destroyer",
                description: "Transforms complex challenges into elegant code",
                unlocked: true
            },
        ],

        stats: [
            { label: "Years Coding", value: "3+" },
            { label: "Projects Built", value: "10+" },
            { label: "Technologies", value: "15+" },
        ]
    },

    // ===== CONTACT INFO =====
    contact: {
        email: "sanketkurve.2005@gmail.com",

        social: {
            github: {
                username: "SanketKurve",
                url: "https://github.com/SanketKurve",
                icon: "github",
                color: "#00f0ff"
            },
            linkedin: {
                url: "https://www.linkedin.com/in/sanket-kurve-03a8b3196",
                icon: "linkedin",
                color: "#ff0080"
            },
        },

        resume: {
            available: false,
            url: "/resume.pdf",
            filename: "Sanket_Kurve_Resume.pdf"
        }
    },

    // ===== SKILLS =====
    skills: [
        // Programming Core
        {
            name: "C",
            category: "Programming",
            level: 80,
            yearsExp: 2,
            color: "#00f0ff",
            description: "Systems programming and algorithms"
        },
        {
            name: "Java",
            category: "Programming",
            level: 85,
            yearsExp: 2,
            color: "#00f0ff",
            description: "OOP and enterprise applications"
        },
        {
            name: "Python",
            category: "Programming",
            level: 90,
            yearsExp: 3,
            color: "#00f0ff",
            description: "AI/ML, backend, and automation"
        },

        // Frontend
        {
            name: "React",
            category: "Frontend",
            level: 85,
            yearsExp: 2,
            color: "#ff0080",
            description: "Modern UI development"
        },
        {
            name: "JavaScript",
            category: "Frontend",
            level: 88,
            yearsExp: 3,
            color: "#ff0080",
            description: "Core web development"
        },
        {
            name: "HTML/CSS",
            category: "Frontend",
            level: 90,
            yearsExp: 3,
            color: "#ff0080",
            description: "Web fundamentals & styling"
        },

        // Backend
        {
            name: "Node.js",
            category: "Backend",
            level: 80,
            yearsExp: 2,
            color: "#b026ff",
            description: "Server-side JavaScript"
        },
        {
            name: "Express.js",
            category: "Backend",
            level: 80,
            yearsExp: 2,
            color: "#b026ff",
            description: "RESTful API development"
        },
        {
            name: "Django",
            category: "Backend",
            level: 75,
            yearsExp: 1,
            color: "#b026ff",
            description: "Python web framework"
        },

        // Database
        {
            name: "MongoDB",
            category: "Database",
            level: 75,
            yearsExp: 2,
            color: "#39ff14",
            description: "NoSQL database design"
        },
        {
            name: "MySQL",
            category: "Database",
            level: 70,
            yearsExp: 2,
            color: "#39ff14",
            description: "Relational database management"
        },

        // AI/ML
        {
            name: "AI/ML",
            category: "AI/ML",
            level: 75,
            yearsExp: 1,
            color: "#ff6c00",
            description: "Machine learning & computer vision"
        },
    ],

    // ===== CERTIFICATES =====
    certificates: [
        {
            name: "Coming Soon",
            issuer: "Keep Grinding!",
            date: "2024",
            credentialId: null,
            verifyUrl: null,
            isPlaceholder: true
        }
    ],

    // ===== PROJECTS =====
    projects: [
        {
            id: 1,
            name: "Hajeeri",
            tagline: "AI-Powered Attendance Revolution",

            problem: "Manual attendance marking is time-consuming, prone to errors, and wastes valuable class time.",

            solution: "Built an intelligent attendance system using AI face recognition that automates the entire process with 99% accuracy.",

            features: [
                { name: "Real-time Face Recognition", icon: "🎯", detail: "Instantly identifies students using advanced AI" },
                { name: "Automated Marking", icon: "⚡", detail: "Marks attendance in seconds, not minutes" },
                { name: "Analytics Dashboard", icon: "📊", detail: "Visualize attendance patterns and trends" },
                { name: "Report Generation", icon: "📄", detail: "Export detailed reports in multiple formats" },
            ],

            techStack: [
                { name: "Python", color: "#00f0ff" },
                { name: "AI/ML", color: "#ff6c00" },
                { name: "Django", color: "#b026ff" },
                { name: "React", color: "#ff0080" },
                { name: "MongoDB", color: "#39ff14" },
            ],

            learned: "Mastered computer vision, real-time processing optimization, and building scalable AI systems.",

            impact: {
                metric: "95%",
                description: "Reduction in attendance marking time"
            },

            links: {
                live: null,
                github: null,
                caseStudy: null,
            },

            year: 2024,
            category: "AI/ML",
            status: "completed",
            featured: true,
            portalColor: "#00f0ff",
        },

        {
            id: 2,
            name: "Gradient",
            tagline: "Smart Expense Tracking for Students",

            problem: "Students struggle to manage their finances, often overspending without realizing it.",

            solution: "Created an AI-powered expense tracker that automatically categorizes spending and provides intelligent budget recommendations.",

            features: [
                { name: "Smart Categorization", icon: "🏷️", detail: "AI automatically sorts your expenses" },
                { name: "AI Budget Insights", icon: "🤖", detail: "Personalized recommendations based on spending patterns" },
                { name: "Spending Analytics", icon: "📈", detail: "Beautiful visualizations of your financial health" },
                { name: "Bill Reminders", icon: "⏰", detail: "Never miss a payment again" },
            ],

            techStack: [
                { name: "React", color: "#ff0080" },
                { name: "Node.js", color: "#b026ff" },
                { name: "AI/ML", color: "#ff6c00" },
                { name: "MongoDB", color: "#39ff14" },
            ],

            learned: "Deep-dived into data visualization, predictive algorithms, and building intuitive financial UIs.",

            impact: {
                metric: "40%",
                description: "Average reduction in unnecessary spending"
            },

            links: {
                live: null,
                github: null,
                caseStudy: null,
            },

            year: 2024,
            category: "Web App",
            status: "completed",
            featured: true,
            portalColor: "#ff0080",
        },

        // Placeholder for future projects
        {
            id: 999,
            name: "Next Dimension",
            tagline: "Something Epic is Loading...",
            problem: "???",
            solution: "The code is still compiling...",
            features: [
                { name: "Mystery Feature", icon: "❓", detail: "Coming soon" },
            ],
            techStack: [
                { name: "Innovation", color: "#b026ff" },
            ],
            learned: "Stay tuned to find out!",
            links: {
                live: null,
                github: null,
                caseStudy: null,
            },
            year: 2025,
            category: "Future",
            status: "planned",
            featured: false,
            portalColor: "#b026ff",
            isPlaceholder: true,
        }
    ],

    // ===== NAVIGATION =====
    navigation: [
        { id: 'hero', label: 'Home', icon: '⬡' },
        { id: 'about', label: 'About', icon: '◈' },
        { id: 'skills', label: 'Skills', icon: '◇' },
        { id: 'certificates', label: 'Certs', icon: '◆' },
        { id: 'projects', label: 'Projects', icon: '⬢' },
        { id: 'contact', label: 'Contact', icon: '◎' },
    ],

    // ===== THEME SETTINGS =====
    theme: {
        colors: {
            void: '#000000',
            space: '#0d0221',
            electricCyan: '#00f0ff',
            hotPink: '#ff0080',
            laserPurple: '#b026ff',
            toxicGreen: '#39ff14',
            solarOrange: '#ff6c00',
        },

        effects: {
            particleCount: {
                desktop: 800,
                tablet: 400,
                mobile: 200,
            },
            glowIntensity: 0.8,
            animationSpeed: 1,
        }
    },

    // ===== FEATURE FLAGS =====
    features: {
        soundEnabled: false,
        easterEggsEnabled: true,
        customCursor: true,
        contactFormEnabled: true,
    },

    // ===== SEO & METADATA =====
    metadata: {
        title: "Sanket Kurve | Full-Stack Developer Portfolio",
        description: "Portfolio of Sanket Kurve - Full-Stack Developer specializing in AI-powered web applications. React, Node.js, Python, Django.",
        keywords: [
            "Full-Stack Developer",
            "React Developer",
            "Node.js Developer",
            "Python Developer",
            "AI Developer",
            "Web Development",
            "Portfolio",
            "Sanket Kurve"
        ],
        author: "Sanket Kurve",
    },
};

export default portfolioConfig;

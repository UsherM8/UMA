import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCode, faGlobe, faDatabase, faMicrochip, faShieldAlt, faCalculator 
} from '@fortawesome/free-solid-svg-icons';
import { 
    faGithub, faReact, faLaravel, faPhp, faJs, faJava, faWindows, faNodeJs, faVuejs 
} from '@fortawesome/free-brands-svg-icons';

const translations = {
    en: {
        nav: { home: "Home", portfolio: "Portfolio", contact: "Contact" },
        header: {
            title: "Portfolio",
            sub: "An overview of my experience in enterprise software, complex algorithms, and full-stack solutions."
        },
        footer: { crafted: "Crafted with" },
        projects: [
            {
                title: "Bodegro Care Portal",
                description: "Healthcare portal where protocols are automatically linked to patients via a custom algorithm. Built with strict data isolation so patient data is only accessible by their own doctors.",
                tech: ["PHP", "Laravel", "Custom Algorithm", "Healthcare Security"]
            },
            {
                title: "TaxModel Onboarding Portal",
                description: "Full-stack application within a Scrum/DevOps team. Managed backend upgrade from .NET 6 to 8 and resolved dependency mismatches.",
                tech: [".NET 8", "Vue 3", "DevOps", "Scrum"]
            },
            {
                title: "EasyFlex Matching Engine",
                description: "A .NET MVC application designed to match flex workers to jobs via a sophisticated algorithm. It weighs distance, age, and skills to realize the most efficient match.",
                tech: [".NET MVC", "C#", "Matching Logic", "CRUD"]
            },
            {
                title: "Dual-Backend Auto Tracker",
                description: "Unique architecture with two backends: Java Security for authentication and .NET for vehicle management. Uses external API calls for real-time data.",
                tech: ["Java Security", ".NET Core", "Vue 3", "External API"]
            },
            {
                title: "YourAirTravel Affiliate Engine",
                description: "Custom flight comparison tool built with PHP/Laravel. Includes an extensive tracking system visualized in an analytics dashboard.",
                tech: ["Laravel", "PHP", "Affiliate Tracking", "Analytics"]
            },
            {
                title: "Event Scheduling Optimizer",
                description: "Mathematical scheduling algorithm designed for visitor efficiency. The logic balances booking order with capacity autonomously.",
                tech: ["Algorithm Design", "Mathematical Logic", "Optimization"]
            },
            {
                title: "CyberSecurity Pentest",
                description: "Performed penetration tests on login portals using custom Node.js brute-force scripts to audit infrastructure resilience.",
                tech: ["Node.js", "CyberSecurity", "Penetration Testing"]
            }
        ]
    },
    nl: {
        nav: { home: "Home", portfolio: "Portfolio", contact: "Contact" },
        header: {
            title: "Portfolio",
            sub: "Een overzicht van mijn ervaring in enterprise software, complexe algoritmes en fullstack oplossingen."
        },
        footer: { crafted: "Gemaakt met" },
        projects: [
            {
                title: "Care Portal",
                description: "Zorgportaal waarbij patiënten via een op maat gemaakt algoritme automatisch gekoppeld worden aan medische protocollen. Gebouwd met strikte data-isolatie.",
                tech: ["PHP", "Laravel", "Custom Algorithm", "Healthcare Security"]
            },
            {
                title: "Onboarding Portal",
                description: "Fullstack applicatie binnen een Scrum/DevOps team. Verantwoordelijk voor backend upgrade (.NET 6 naar 8) en het oplossen van mismatches.",
                tech: [".NET 8", "Vue 3", "DevOps", "Scrum"]
            },
            {
                title: "Matching Engine",
                description: "Een .NET MVC applicatie die flexwerkers koppelt aan klussen via een algoritme dat afstand, leeftijd en ervaring meeweegt.",
                tech: [".NET MVC", "C#", "Matching Logic", "CRUD"]
            },
            {
                title: "Dual-Backend Auto Tracker",
                description: "Unieke architectuur met Java Security backend voor authenticatie en .NET voor voertuigbeheer. Gebruikt externe API's.",
                tech: ["Java Security", ".NET Core", "Vue 3", "External API"]
            },
            {
                title: "YourAirTravel Affiliate Engine",
                description: "Vakantievergelijker gebouwd met PHP/Laravel. Bevat een geavanceerd tracking-systeem dat kliks naar partners analyseert.",
                tech: ["Laravel", "PHP", "Affiliate Tracking", "Analytics"]
            },
            {
                title: "Event Scheduling Optimizer",
                description: "Wiskundig inplannings-algoritme voor bezoekersefficiëntie. De logica balanceert boekingsvolgorde met realtime capaciteit.",
                tech: ["Algorithm Design", "Mathematical Logic", "Optimization"]
            },
            {
                title: "CyberSecurity Pentest",
                description: "Penetratietests uitgevoerd op login-portalen met custom Node.js brute-force scripts om de authenticatie-infra te auditen.",
                tech: ["Node.js", "CyberSecurity", "Penetration Testing"]
            }
        ]
    }
};

export default function Portfolio() {
    const [lang, setLang] = useState(() => {
        return (typeof window !== 'undefined' ? localStorage.getItem('user_lang') : 'nl') || 'nl';
    });

    useEffect(() => {
        localStorage.setItem('user_lang', lang);
        window.dispatchEvent(new Event("storage_sync"));
    }, [lang]);

    useEffect(() => {
        const syncLang = () => {
            const saved = localStorage.getItem('user_lang');
            if (saved && saved !== lang) setLang(saved);
        };
        window.addEventListener('storage_sync', syncLang);
        return () => window.removeEventListener('storage_sync', syncLang);
    }, [lang]);

    const t = translations[lang];

    // Helper functie om iconen toe te wijzen aan tech tags
    const getTechIcon = (tech) => {
        const name = tech.toLowerCase();
        if (name.includes('laravel')) return faLaravel;
        if (name.includes('react')) return faReact;
        if (name.includes('vue')) return faVuejs;
        if (name.includes('php')) return faPhp;
        if (name.includes('js') || name.includes('javascript')) return faJs;
        if (name.includes('java')) return faJava;
        if (name.includes('.net') || name.includes('c#')) return faWindows;
        if (name.includes('sql') || name.includes('database')) return faDatabase;
        if (name.includes('node')) return faNodeJs;
        if (name.includes('algorithm') || name.includes('logic')) return faCalculator;
        if (name.includes('security') || name.includes('pentest')) return faShieldAlt;
        return faCode; // Default icoon
    };

    const projectMeta = [
        { github: "https://github.com/UsherM8", color: "from-blue-600 to-cyan-500" },
        { github: "https://github.com/UsherM8", color: "from-emerald-600 to-teal-500" },
        { github: "https://github.com/UsherM8", color: "from-orange-600 to-yellow-500" },
        { github: "https://github.com/UsherM8", color: "from-purple-600 to-indigo-500" },
        { github: "https://github.com/UsherM8", color: "from-red-600 to-pink-500" },
        { github: "https://github.com/UsherM8", color: "from-cyan-600 to-blue-500" },
        { github: "https://github.com/UsherM8", color: "from-gray-700 to-slate-900" }
    ];

    return (
        <div className="bg-slate-950 text-white min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden flex flex-col items-center py-24 px-6 relative">
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
            </div>

            <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-lg z-[100]">
                <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 shadow-2xl flex items-center justify-between">
                    <ul className="flex gap-8 items-center text-[10px] md:text-xs font-black uppercase tracking-[0.2em] italic">
                        <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">{t.nav.home}</Link></li>
                        <li><Link href="/portfolio" className="text-blue-400">{t.nav.portfolio}</Link></li>
                        <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">{t.nav.contact}</Link></li>
                    </ul>
                    <button 
                        onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-all flex items-center gap-2 group"
                    >
                        <FontAwesomeIcon icon={faGlobe} className="text-blue-400 text-[10px]" />
                        <span className="text-[10px] font-black uppercase tracking-tighter w-4 text-center">{lang === 'nl' ? 'EN' : 'NL'}</span>
                    </button>
                </div>
            </nav>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20 max-w-2xl">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight uppercase italic leading-none px-2 text-white">
                    {lang === 'nl' ? 'Mijn' : 'My'} <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent pr-4 md:pr-10 inline-block">{t.header.title}</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl font-light italic px-4 leading-relaxed">{t.header.sub}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mb-20">
                {t.projects.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="group relative bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 hover:border-blue-500/50 transition-all duration-500 flex flex-col justify-between shadow-2xl"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${projectMeta[i].color} opacity-0 group-hover:opacity-5 blur-2xl rounded-[2rem] transition-opacity pointer-events-none`} />
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 bg-slate-800 rounded-2xl group-hover:bg-blue-600/20 transition-colors">
                                    <FontAwesomeIcon icon={faCode} className="text-2xl text-blue-400" />
                                </div>
                                <div className="relative z-50">
                                    <a href={projectMeta[i].github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white hover:scale-110 transition-all block p-1">
                                        <FontAwesomeIcon icon={faGithub} className="text-3xl" />
                                    </a>
                                </div>
                            </div>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4 group-hover:text-blue-400 transition-colors leading-tight text-white">{project.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 italic font-light">{project.description}</p>
                        </div>
                        <div className="relative z-10 flex flex-wrap gap-2">
                            {project.tech.map((techItem, idx) => (
                                <span key={idx} className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest bg-slate-800 px-3 py-1.5 rounded-full text-gray-300 border border-slate-700">
                                    <FontAwesomeIcon icon={getTechIcon(techItem)} className="text-blue-400/80" />
                                    {techItem}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-20 mb-10 text-center opacity-40">
                <p className="text-xs uppercase tracking-[0.3em] font-bold italic text-white">
                    {t.footer.crafted} <FontAwesomeIcon icon={faReact} className="mx-1 text-cyan-400" /> & <FontAwesomeIcon icon={faLaravel} className="mx-1 text-red-500" /> by 
                    <span className="text-white ml-2">Usher Missiedjan</span>
                </p>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faLinkedin, faPhp, faReact, faLaravel, faJs, faCss3Alt, faJava, faWindows, faGitAlt, faNodeJs, faLinux 
} from '@fortawesome/free-brands-svg-icons';
import { 
    faDownload, faExternalLinkAlt, faUser, faDatabase, faLeaf, faCube, 
    faHeart, faGlobe, faUsers, faSync, faShieldAlt, faGem, faLock, faInfinity 
} from '@fortawesome/free-solid-svg-icons';

// --- TRANSLATIONS OBJECT ---
const translations = {
    en: {
        nav: { home: "Home", portfolio: "Portfolio", contact: "Contact" },
        hero: {
            hi: "Hi, I'm",
            sub: "Enterprise Software Architect & High-End Digital Solutions"
        },
        proficiency: "Technical Proficiency",
        principles: "Core Principles & Workflow",
        skills: {
            solid: "SOLID / Clean Code",
            cyber: "Cyber Awareness",
            scrum: "Scrum / Agile",
            devops: "DevOps / CICD",
            team: "Team Collaboration"
        },
        bio: {
            title: "Expertise",
            text: "Full-stack Software Engineer specialized in architecting complex enterprise systems and high-performance algorithms. From developing healthcare-grade security protocols to optimizing multi-tenant matching engines, I build scalable solutions with a focus on SOLID principles and cybersecurity resilience."
        },
        portfolio: {
            title: "View Portfolio",
            link: "Explore"
        },
        footer: {
            resume: "Resume",
            crafted: "Crafted with"
        }
    },
    nl: {
        nav: { home: "Home", portfolio: "Portfolio", contact: "Contact" },
        hero: {
            hi: "Hoi, ik ben",
            sub: "Enterprise Software Architect & High-End Digitale Oplossingen"
        },
        proficiency: "Technische Vaardigheden",
        principles: "Core Principes & Workflow",
        skills: {
            solid: "SOLID / Clean Code",
            cyber: "Cyber Awareness",
            scrum: "Scrum / Agile",
            devops: "DevOps / CICD",
            team: "Team Samenwerking"
        },
        bio: {
            title: "Expertise",
            text: "Full-stack Software Engineer gespecialiseerd in complexe enterprise-architectuur en high-performance algoritmes. Van het ontwerpen van medische beveiligingsprotocollen tot het optimaliseren van schaalbare matching engines; ik bouw robuuste oplossingen met een focus op SOLID principles en cybersecurity."
        },
        portfolio: {
            title: "Bekijk Portfolio",
            link: "Ontdek"
        },
        footer: {
            resume: "CV",
            crafted: "Gemaakt met"
        }
    }
};

const CustomCursor = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
        const handleHover = (e) => {
            if (e.target.closest('button') || e.target.closest('a')) setIsHovering(true);
            else setIsHovering(false);
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleHover);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleHover);
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-2.5 h-2.5 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                animate={{ x: mousePos.x - 5, y: mousePos.y - 5, scale: isHovering ? 2.5 : 1 }}
                transition={{ type: 'spring', damping: 30, stiffness: 250, mass: 0.5 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-blue-400/50 rounded-full pointer-events-none z-[9998] hidden md:block"
                animate={{ x: mousePos.x - 16, y: mousePos.y - 16, scale: isHovering ? 2 : 1, opacity: isHovering ? 0.3 : 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 150, mass: 0.8 }}
            />
        </>
    );
};

export default function Welcome() {
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('user_lang') || 'nl';
        }
        return 'nl';
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

    const techStack = [
        { name: 'Laravel', icon: faLaravel, color: 'text-red-500' },
        { name: 'React', icon: faReact, color: 'text-cyan-400' },
        { name: 'Tailwind', icon: faCss3Alt, color: 'text-blue-400' },
        { name: 'PHP', icon: faPhp, color: 'text-indigo-400' },
        { name: 'JS', icon: faJs, color: 'text-yellow-400' },
        { name: 'MySQL', icon: faDatabase, color: 'text-blue-500' },
        { name: 'C# .NET', icon: faWindows, color: 'text-purple-500' },
        { name: 'Java', icon: faJava, color: 'text-orange-500' },
        { name: 'Linux', icon: faLinux, color: 'text-white' },
        { name: 'Git', icon: faGitAlt, color: 'text-[#F05032]' },
        { name: 'Node.js', icon: faNodeJs, color: 'text-green-500' },
        { name: 'Spring Boot', icon: faLeaf, color: 'text-green-500' },
        { name: 'Hibernate', icon: faCube, color: 'text-yellow-600' },
    ];

    const softSkills = [
        { name: t.skills.solid, icon: faGem, color: 'text-cyan-400' },
        { name: t.skills.cyber, icon: faLock, color: 'text-red-400' },
        { name: t.skills.scrum, icon: faSync, color: 'text-emerald-400' },
        { name: t.skills.devops, icon: faInfinity, color: 'text-purple-400' },
        { name: t.skills.team, icon: faUsers, color: 'text-blue-400' },
    ];

    return (
        <div className="bg-slate-950 text-white min-h-screen font-sans pb-40 selection:bg-blue-500/30 overflow-x-hidden md:cursor-none scroll-smooth">
            <CustomCursor />
            
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-lg z-[100]">
                <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 shadow-2xl flex items-center justify-between">
                    <ul className="flex gap-4 md:gap-8 items-center text-[10px] md:text-xs font-black uppercase tracking-[0.1em] italic text-white">
                        <li><Link href="/" className="text-white">{t.nav.home}</Link></li>
                        <li><Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">{t.nav.portfolio}</Link></li>
                        <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">{t.nav.contact}</Link></li>
                    </ul>
                    <button onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')} className="ml-4 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-all flex items-center gap-2 group text-white">
                        <FontAwesomeIcon icon={faGlobe} className="text-blue-400 text-[10px]" />
                        <span className="text-[10px] font-black uppercase tracking-tighter w-4 text-center">{lang === 'nl' ? 'EN' : 'NL'}</span>
                    </button>
                </motion.div>
            </nav>

            {/* HERO SECTION */}
            <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute top-[-5%] left-[-5%] w-[70%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-5%] right-[-5%] w-[70%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
                </div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="z-10 w-full">
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tight uppercase italic leading-none px-2 text-white">
                        {t.hero.hi} <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent pr-4 md:pr-10 inline-block">Usher Missiedjan</span>
                    </h1>
                    <p className="text-lg md:text-3xl text-gray-400 max-w-3xl mx-auto font-light tracking-wide leading-snug px-4 italic">{t.hero.sub}</p>
                </motion.div>
            </section>

            {/* TECHNICAL PROFICIENCY - IMPROVED GRID FOR 13 ITEMS */}
            <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-10 md:mb-16">
                    <div className="h-8 md:h-10 w-2 bg-blue-500 rounded-full" />
                    <h2 className="text-3xl md:text-5xl font-bold italic uppercase tracking-tighter text-white">{t.proficiency}</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {techStack.map((tech) => (
                        <motion.div 
                            key={tech.name} 
                            whileHover={{ y: -10, scale: 1.02 }} 
                            whileTap={{ scale: 0.95 }} 
                            className="w-[calc(50%-1rem)] sm:w-[calc(33.33%-1.5rem)] lg:w-[calc(20%-1.5rem)] p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-slate-900 border border-slate-800 flex flex-col items-center gap-3 md:gap-4 hover:border-blue-500/50 transition-all shadow-xl"
                        >
                            <FontAwesomeIcon icon={tech.icon} className={`${tech.color} text-3xl md:text-4xl`} />
                            <span className="text-[10px] md:text-xs font-black tracking-widest text-gray-500 uppercase">{tech.name}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CORE PRINCIPLES */}
            <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-10 md:mb-16">
                    <div className="h-8 md:h-10 w-2 bg-purple-500 rounded-full" />
                    <h2 className="text-3xl md:text-5xl font-bold italic uppercase tracking-tighter text-white">{t.principles}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                    {softSkills.map((skill) => (
                        <motion.div key={skill.name} whileHover={{ y: -5 }} className="p-8 rounded-[1.5rem] bg-slate-900/50 border border-slate-800 flex flex-col items-start gap-4 hover:border-purple-500/50 transition-all shadow-xl">
                            <FontAwesomeIcon icon={skill.icon} className={`${skill.color} text-3xl md:text-4xl`} />
                            <span className="text-xs md:text-sm font-black tracking-widest text-gray-300 uppercase italic leading-tight">{skill.name}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* EXPERTISE & PORTFOLIO */}
            <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-transparent to-slate-900/50">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-slate-900 border border-slate-800 shadow-2xl flex flex-col justify-center text-white">
                        <h2 className="text-2xl md:text-4xl font-bold mb-6 flex items-center gap-4 uppercase italic text-blue-500">{t.bio.title}</h2>
                        <p className="text-gray-300 leading-relaxed text-base md:text-lg italic font-light">{t.bio.text}</p>
                    </div>
                    <div className="group relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-900 border border-slate-800 h-[450px] md:h-[550px] flex flex-col transition-all duration-500 hover:border-blue-500 shadow-2xl">
                        <div className="absolute inset-0 z-0">
                            <img src="/usher1.jpg" alt="Usher Missiedjan" className="w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 z-10" />
                            <div className="absolute inset-0 bg-slate-950/10 group-hover:opacity-0 transition-opacity duration-500 z-10" />
                        </div>
                        <div className="mt-auto p-8 md:p-10 z-20 relative text-white">
                            <motion.div initial={false} whileHover={{ y: -5 }}>
                                <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter drop-shadow-2xl">{t.portfolio.title}</h3>
                                <Link href="/portfolio" className="inline-flex items-center gap-3 text-blue-400 font-black mt-3 md:mt-5 uppercase text-sm md:text-base hover:text-white transition-colors group/link">
                                    {t.portfolio.link} <FontAwesomeIcon icon={faExternalLinkAlt} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-20 mb-10 text-center opacity-40">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold italic text-white">
                    {t.footer.crafted} <FontAwesomeIcon icon={faReact} className="mx-1 text-cyan-400" /> & <FontAwesomeIcon icon={faLaravel} className="mx-1 text-red-500" /> by Usher Missiedjan
                </p>
            </div>

            <footer className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-5xl p-4 md:p-6 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-full flex justify-between items-center z-50 shadow-2xl">
                <a href="https://linkedin.com/in/ushermissiedjan" target="_blank" rel="noreferrer" className="hover:text-blue-400 flex items-center gap-2 font-black uppercase tracking-tighter transition-all px-4 text-sm md:text-base text-white">
                    <FontAwesomeIcon icon={faLinkedin} className="text-xl md:text-3xl" /> <span className="hidden sm:inline">LinkedIn</span>
                </a>
                <a href="/resume.pdf" download className="bg-white text-black px-6 md:px-12 py-3 md:py-4 rounded-full font-black uppercase tracking-tighter hover:bg-blue-500 hover:text-white transition-all shadow-xl text-xs md:text-base">
                    <FontAwesomeIcon icon={faDownload} className="mr-0 md:mr-2" /> <span className="hidden sm:inline">{t.footer.resume}</span> <span className="sm:hidden">{lang === 'nl' ? 'CV' : 'Resume'}</span>
                </a>
            </footer>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faCode, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faReact, faLaravel, faJava } from '@fortawesome/free-brands-svg-icons';

export default function Portfolio() {
    // Project data - Je kunt dit later vervangen door data uit Laravel
    const projects = [
        {
            title: "Enterprise CRM System",
            description: "A high-performance CRM built for scale, featuring real-time data tracking and automated reporting.",
            tech: ["Laravel", "React", "MySQL", "Tailwind"],
            link: "#",
            github: "#",
            color: "from-blue-600 to-cyan-500"
        },
        {
            title: "Inventory Management Tool",
            description: "Robust desktop application focused on SOLID principles and complex database architecture.",
            tech: ["Java", "Spring Boot", "Hibernate"],
            link: "#",
            github: "#",
            color: "from-orange-600 to-red-500"
        },
        {
            title: "FinTech Dashboard",
            description: "Responsive financial dashboard with deep data visualization and secure API integrations.",
            tech: ["C# .NET", "React", "Chart.js"],
            link: "#",
            github: "#",
            color: "from-purple-600 to-indigo-500"
        }
    ];

    return (
        <div className="bg-slate-950 text-white min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden flex flex-col items-center py-24 px-6 relative">
            
            {/* Achtergrond Decoratie */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
            </div>

            {/* --- NAVIGATIE --- */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-[100]">
                <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-4 shadow-2xl">
                    <ul className="flex justify-between items-center text-[10px] md:text-xs font-black uppercase tracking-[0.2em] italic">
                        <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                        <li><Link href="/portfolio" className="text-blue-400">Portfolio</Link></li>
                        <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>
            </nav>

            {/* --- HEADER --- */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20 max-w-2xl"
            >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight uppercase italic leading-none px-2">
                    My <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent pr-4 md:pr-10 inline-block">Portfolio</span>
                    </h1>
                <p className="text-gray-400 text-lg md:text-xl font-light italic">
                    A selection of enterprise-grade software and modern web applications.
                </p>
            </motion.div>

            {/* --- PROJECTS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="group relative bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 hover:border-blue-500/50 transition-all duration-500 flex flex-col justify-between"
                    >
                        {/* Project Glow Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 blur-2xl rounded-[2.5rem] transition-opacity`} />
                        
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 bg-slate-800 rounded-2xl group-hover:bg-blue-600/20 transition-colors">
                                    <FontAwesomeIcon icon={faCode} className="text-2xl text-blue-400" />
                                </div>
                                <div className="flex gap-4">
                                    <a href={project.github} className="text-gray-500 hover:text-white transition-colors"><FontAwesomeIcon icon={faGithub} className="text-xl" /></a>
                                    <a href={project.link} className="text-gray-500 hover:text-white transition-colors"><FontAwesomeIcon icon={faExternalLinkAlt} className="text-xl" /></a>
                                </div>
                            </div>
                            
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-3 group-hover:text-blue-400 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">
                                {project.description}
                            </p>
                        </div>

                        <div>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map((t, idx) => (
                                    <span key={idx} className="text-[9px] font-black uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full text-gray-300 border border-slate-700">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <a href={project.link} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest italic group-hover:gap-4 transition-all">
                                View Details <FontAwesomeIcon icon={faArrowRight} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* --- FOOTER CREDITS --- */}
            <div className="mt-32 text-center opacity-40">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold italic">
                    Crafted with React & Laravel by 
                    <span className="text-white ml-2">Usher Missiedjan</span>
                </p>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, usePage, Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCheckCircle, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faReact, faLaravel } from '@fortawesome/free-brands-svg-icons';

// --- TRANSLATIONS ---
const translations = {
    en: {
        nav: { home: "Home", portfolio: "Portfolio", contact: "Contact" },
        header: {
            title: "Get In Contact",
            sub: "Let's discuss enterprise solutions or creative collaborations."
        },
        form: {
            name: "Full Name",
            email: "Email Address",
            subject: "Subject",
            message: "Your Message",
            send: "Send Message",
            sending: "Transmitting...",
            success: "Transmission received successfully!"
        }
    },
    nl: {
        nav: { home: "Home", portfolio: "Portfolio", contact: "Contact" },
        header: {
            title: "Neem Contact Op",
            sub: "Laten we praten over enterprise oplossingen of creatieve samenwerkingen."
        },
        form: {
            name: "Volledige Naam",
            email: "E-mailadres",
            subject: "Onderwerp",
            message: "Jouw Bericht",
            send: "Bericht Verzenden",
            sending: "Verzenden...",
            success: "Bericht succesvol ontvangen!"
        }
    }
};

export default function Contact() {
    const { flash } = usePage().props;
    
    // --- PERSISTENT LANGUAGE STATE ---
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

    // --- FORM LOGIC ---
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [isSuccess, setIsSuccess] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                reset();
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 5000);
            },
            preserveScroll: true,
        });
    };

    return (
        /* HIER AANGEPAST: De 'uppercase' klasse is hier aan het einde weggelaten! */
        <div className="bg-slate-950 text-white min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden flex flex-col items-center py-24 px-6 relative">
            
            {/* Achtergrond Gradients */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
            </div>

            {/* --- NAVIGATIE --- */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-lg z-[100]">
                <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 shadow-2xl flex items-center justify-between">
                    <ul className="flex gap-8 items-center text-[10px] md:text-xs font-black uppercase tracking-[0.2em] italic">
                        <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">{t.nav.home}</Link></li>
                        <li><Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">{t.nav.portfolio}</Link></li>
                        <li><Link href="/contact" className="text-blue-400">{t.nav.contact}</Link></li>
                    </ul>
                    <button 
                        onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-all flex items-center gap-2 group uppercase"
                    >
                        <FontAwesomeIcon icon={faGlobe} className="text-blue-400 text-[10px]" />
                        <span className="text-[10px] font-black uppercase tracking-tighter w-4 text-center">
                            {lang === 'nl' ? 'EN' : 'NL'}
                        </span>
                    </button>
                </div>
            </nav>

            {/* --- HEADER --- */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12 max-w-7xl w-full px-10 overflow-visible select-none"
            >
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 uppercase italic text-white leading-[1.1] tracking-normal">
                    {t.header.title.split(' ').slice(0, -1).join(' ')} 
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent ml-4 pr-12 inline-block">
                        {t.header.title.split(' ').pop()}
                    </span>
                </h1>
                <p className="text-gray-400 font-light tracking-widest uppercase text-xs md:text-sm italic max-w-xl mx-auto opacity-80">
                    {t.header.sub}
                </p>
            </motion.div>

            {/* --- CONTACT FORMULIER --- */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-4xl z-10"
            >
                <div className="relative p-[1px] rounded-[3rem] bg-gradient-to-br from-blue-600 via-cyan-400 to-purple-600 shadow-2xl">
                    <div className="bg-slate-950 p-8 md:p-16 rounded-[3rem] backdrop-blur-xl">
                        
                        <form onSubmit={submit} className="grid grid-cols-1 gap-6">
                            {/* Succes Melding */}
                            <AnimatePresence>
                                {(isSuccess || flash?.success) && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-green-500/10 border border-green-500/50 p-4 rounded-2xl text-green-400 flex items-center gap-3 font-bold text-sm italic mb-4"
                                    >
                                        <FontAwesomeIcon icon={faCheckCircle} /> {flash?.success || t.form.success}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <input 
                                        type="text" placeholder={t.form.name} 
                                        className={`w-full bg-slate-900 border-none rounded-2xl p-5 text-white ring-1 ${errors.name ? 'ring-red-500' : 'ring-slate-800'} focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium tracking-wide placeholder:uppercase placeholder:text-[10px] placeholder:font-bold placeholder:tracking-widest`}
                                        onChange={e => setData('name', e.target.value)} value={data.name} required 
                                    />
                                    {errors.name && <p className="text-red-500 text-[10px] uppercase font-black pl-2 italic">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <input 
                                        type="email" placeholder={t.form.email} 
                                        className={`w-full bg-slate-900 border-none rounded-2xl p-5 text-white ring-1 ${errors.email ? 'ring-red-500' : 'ring-slate-800'} focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium tracking-wide placeholder:uppercase placeholder:text-[10px] placeholder:font-bold placeholder:tracking-widest`}
                                        onChange={e => setData('email', e.target.value)} value={data.email} required 
                                    />
                                    {errors.email && <p className="text-red-500 text-[10px] uppercase font-black pl-2 italic">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <input 
                                    type="text" placeholder={t.form.subject} 
                                    className={`w-full bg-slate-900 border-none rounded-2xl p-5 text-white ring-1 ${errors.subject ? 'ring-red-500' : 'ring-slate-800'} focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium tracking-wide placeholder:uppercase placeholder:text-[10px] placeholder:font-bold placeholder:tracking-widest`}
                                    onChange={e => setData('subject', e.target.value)} value={data.subject} required 
                                />
                            </div>

                            <div className="space-y-2">
                                <textarea 
                                    placeholder={t.form.message} rows="5" 
                                    className={`w-full bg-slate-900 border-none rounded-2xl p-5 text-white ring-1 ${errors.message ? 'ring-red-500' : 'ring-slate-800'} focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium tracking-wide placeholder:uppercase placeholder:text-[10px] placeholder:font-bold placeholder:tracking-widest`}
                                    onChange={e => setData('message', e.target.value)} value={data.message} required 
                                />
                            </div>

                            <button 
                                disabled={processing} 
                                className="w-full bg-white text-black py-6 rounded-2xl font-black text-xl md:text-2xl hover:bg-blue-400 hover:text-white transition-all uppercase italic tracking-tighter flex items-center justify-center gap-4"
                            >
                                {processing ? (
                                    t.form.sending
                                ) : (
                                    <>{t.form.send} <FontAwesomeIcon icon={faPaperPlane} className="text-lg md:text-xl" /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>

            {/* --- FOOTER CREDITS --- */}
            <div className="mt-20 text-center opacity-40 uppercase">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold italic">
                    Crafted with <FontAwesomeIcon icon={faReact} className="mx-1 text-cyan-400" /> & <FontAwesomeIcon icon={faLaravel} className="mx-1 text-red-500" /> by 
                    <span className="text-white ml-2">Usher Missiedjan</span>
                </p>
            </div>
        </div>
    );
}
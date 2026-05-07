import React from 'react';
import { motion } from 'framer-motion';
import { useForm, Link } from '@inertiajs/react';

export default function Contact() {
    const { data, setData, post, processing, reset } = useForm({
        name: '', email: '', subject: '', message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/contact', { onSuccess: () => reset() });
    };

    return (
        <div className="bg-slate-950 text-white min-h-screen font-sans flex flex-col items-center py-20 px-6">
            <Link href="/" className="mb-10 text-gray-500 hover:text-white transition-colors uppercase text-xs tracking-widest italic">← Back to Home</Link>
            
            <section className="w-full max-w-4xl">
                <div className="relative p-[1px] rounded-[3rem] bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                    <div className="bg-slate-950 p-8 md:p-16 rounded-[3rem] backdrop-blur-xl">
                        <h2 className="text-3xl md:text-5xl font-black mb-8 md:mb-12 tracking-tighter uppercase italic text-center">Get In Contact</h2>
                        <form onSubmit={submit} className="grid grid-cols-1 gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="text" placeholder="Full Name" className="bg-slate-900 border-none rounded-xl md:rounded-2xl p-4 md:p-6 text-white outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs" onChange={e => setData('name', e.target.value)} value={data.name} required />
                                <input type="email" placeholder="Email Address" className="bg-slate-900 border-none rounded-xl md:rounded-2xl p-4 md:p-6 text-white outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs" onChange={e => setData('email', e.target.value)} value={data.email} required />
                            </div>
                            <input type="text" placeholder="Subject" className="bg-slate-900 border-none rounded-xl md:rounded-2xl p-4 md:p-6 text-white outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs" onChange={e => setData('subject', e.target.value)} value={data.subject} required />
                            <textarea placeholder="Your Message" rows="4" className="bg-slate-900 border-none rounded-xl md:rounded-2xl p-4 md:p-6 text-white outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs" onChange={e => setData('message', e.target.value)} value={data.message} required />
                            <button disabled={processing} className="bg-white text-black py-4 md:py-6 rounded-xl md:rounded-2xl font-black text-xl hover:bg-blue-400 hover:text-white transition-all uppercase italic">
                                {processing ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
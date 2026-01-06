import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, HelpCircle, Info, Star } from 'lucide-react';

const Learning = () => {
    return (
        <div className="container section-padding">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Learning Zone</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>Expand your knowledge about the universe.</p>
            </div>

            {/* Fact of the Day */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel"
                style={{
                    padding: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',
                    maxWidth: '900px',
                    margin: '0 auto 4rem auto',
                    background: 'linear-gradient(135deg, rgba(142, 68, 173, 0.2), rgba(0, 210, 255, 0.1))'
                }}
            >
                <div style={{
                    background: 'white',
                    color: 'var(--color-primary)',
                    padding: '1rem',
                    borderRadius: '50%',
                    flexShrink: 0
                }}>
                    <Star size={32} fill="currentColor" />
                </div>
                <div>
                    <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Cosmic Fact of the Day</h3>
                    <p style={{ fontSize: '1.25rem', fontStyle: 'italic' }}>
                        "Neutron stars are so dense that a sugar-cube-sized amount of material from one would weigh about a billion tons on Earth."
                    </p>
                </div>
            </motion.div>

            {/* Modules Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {[
                    { title: 'Black Holes 101', icon: Info, color: '#f39c12', desc: 'Understanding the most mysterious objects in space.' },
                    { title: 'The Solar System', icon: BookOpen, color: '#2ecc71', desc: 'A tour of our cosmic neighborhood.' },
                    { title: 'Space Tech Quiz', icon: HelpCircle, color: '#e74c3c', desc: 'Test your knowledge on satellites and rockets.' },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-panel"
                        style={{ padding: '2rem', cursor: 'pointer', transition: 'transform 0.3s ease' }}
                        whileHover={{ y: -5 }}
                    >
                        <item.icon size={32} color={item.color} style={{ marginBottom: '1rem' }} />
                        <h3 style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                        <div style={{ marginTop: '1.5rem', fontWeight: '600', color: item.color }}>Start Module →</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Learning;

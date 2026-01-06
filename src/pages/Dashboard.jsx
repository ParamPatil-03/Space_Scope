import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, Map, CloudSun, GraduationCap, Globe, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const features = [
        { title: 'Sky Map', icon: <Map size={32} />, path: '/events', color: '#00d2ff', desc: 'Real-time visibility maps & events.' },
        { title: 'Cosmic Weather', icon: <CloudSun size={32} />, path: '/weather', color: '#ff0055', desc: 'Solar storms & aurora forecasts.' },
        { title: 'Missions', icon: <Rocket size={32} />, path: '/missions', color: '#8e44ad', desc: 'Timeline of space exploration.' },
        { title: 'Learning Zone', icon: <GraduationCap size={32} />, path: '/learning', color: '#f39c12', desc: 'Quizzes & interactive lessons.' },
        { title: 'Earth Impact', icon: <Globe size={32} />, path: '/impact', color: '#2ecc71', desc: 'Satellite data for Earth solutions.' },
    ];

    return (
        <div className="container">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', marginBottom: '6rem', marginTop: '4rem' }}
            >
                <h1 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '1rem', letterSpacing: '-2px' }}>
                    Explore the Universe
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                    Your interactive gateway to celestial events, real-time cosmic weather, and the impact of space exploration on Earth.
                </p>
            </motion.div>

            {/* Feature Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                padding: '0 1rem'
            }}>
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <Link to={feature.path} style={{ textDecoration: 'none' }}>
                            <div className="glass-panel" style={{
                                padding: '2rem',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                borderTop: `2px solid ${feature.color}`,
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = `0 10px 30px -10px ${feature.color}`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{
                                    background: `${feature.color}20`,
                                    width: 'fit-content',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    color: feature.color
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ fontSize: '1.5rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--color-text-muted)' }}>{feature.desc}</p>
                                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: feature.color, fontWeight: '600' }}>
                                    Explore <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

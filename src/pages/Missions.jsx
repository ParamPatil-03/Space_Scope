import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Rocket, Calendar } from 'lucide-react';

const missions = [
    { id: 1, title: 'Apollo 11', date: '1969', status: 'Completed', desc: 'First humans land on the Moon.', category: 'Past' },
    { id: 2, title: 'Voyager 1', date: '1977', status: 'Ongoing', desc: 'First human-made object to enter interstellar space.', category: 'Past' },
    { id: 3, title: 'James Webb Telescope', date: '2021', status: 'Active', desc: 'Observing the universe in infrared.', category: 'Current' },
    { id: 4, title: 'Artemis II', date: '2025', status: 'Scheduled', desc: 'Crewed flyby of the Moon.', category: 'Future' },
    { id: 5, title: 'Mars Sample Return', date: '2030', status: 'Planned', desc: 'Bringing Martian soil samples to Earth.', category: 'Future' },
];

const Missions = () => {
    return (
        <div className="container section-padding">
            <h1 className="gradient-text" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '4rem' }}>Mission Timeline</h1>

            <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
                {/* Central Line */}
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '2px',
                    height: '100%',
                    background: 'linear-gradient(to bottom, transparent, var(--color-primary), transparent)'
                }} />

                {missions.map((mission, index) => (
                    <motion.div
                        key={mission.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        style={{
                            display: 'flex',
                            justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                            marginBottom: '4rem',
                            position: 'relative'
                        }}
                    >
                        {/* Timeline Dot */}
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: '0',
                            transform: 'translate(-50%, 0)',
                            width: '20px',
                            height: '20px',
                            background: 'var(--color-bg)',
                            border: '4px solid var(--color-secondary)',
                            borderRadius: '50%',
                            zIndex: 2
                        }} />

                        {/* Content Card */}
                        <div className="glass-panel" style={{
                            width: '45%',
                            padding: '1.5rem',
                            position: 'relative',
                            marginTop: '-10px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{
                                    background: mission.status === 'Completed' ? 'rgba(46, 204, 113, 0.2)' :
                                        mission.status === 'Active' ? 'rgba(0, 210, 255, 0.2)' : 'rgba(243, 156, 18, 0.2)',
                                    color: mission.status === 'Completed' ? '#2ecc71' :
                                        mission.status === 'Active' ? '#00d2ff' : '#f39c12',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600'
                                }}>
                                    {mission.status}
                                </span>
                                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Calendar size={14} /> {mission.date}
                                </span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{mission.title}</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>{mission.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Missions;

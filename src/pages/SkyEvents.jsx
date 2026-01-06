import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Clock, Calendar, MapPin } from 'lucide-react';
import earthMapImg from '../assets/night_earth.png';

const events = [
    {
        id: 1,
        name: 'Perseid Meteor Shower',
        date: 'Aug 12, 2026',
        time: '02:00 AM UTC',
        visibility: 'Northern Hemisphere',
        intensity: 'High',
        description: 'One of the brightest meteor showers of the year, visible across the northern sky.',
        coordinates: { cx: 50, cy: 30, r: 40 } // SVG coords %
    },
    {
        id: 2,
        name: 'Total Solar Eclipse',
        date: 'Aug 12, 2026',
        time: '17:45 UTC',
        visibility: 'Europe, North Africa',
        intensity: 'Extreme',
        description: 'A spectacular total solar eclipse passing through Spain and Iceland.',
        coordinates: { cx: 52, cy: 25, r: 15 }
    },
    {
        id: 3,
        name: 'Jupiter Opposition',
        date: 'Sep 26, 2026',
        time: 'All Night',
        visibility: 'Global',
        intensity: 'Medium',
        description: 'Jupiter will be at its closest approach to Earth and its face will be fully illuminated by the Sun.',
        coordinates: { cx: 50, cy: 50, r: 100 }
    }
];

const SkyEvents = () => {
    const [selectedEvent, setSelectedEvent] = useState(events[0]);

    return (
        <div className="container section-padding">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="gradient-text"
                style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}
            >
                Celestial Events & Visibility
            </motion.h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>

                {/* Event List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {events.map((event) => (
                        <motion.div
                            key={event.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedEvent(event)}
                            className="glass-panel"
                            style={{
                                padding: '1.5rem',
                                cursor: 'pointer',
                                border: selectedEvent.id === event.id ? '1px solid var(--color-secondary)' : '1px solid transparent',
                                background: selectedEvent.id === event.id ? 'rgba(0, 210, 255, 0.1)' : 'var(--glass-bg)'
                            }}
                        >
                            <h3 style={{ marginBottom: '0.5rem' }}>{event.name}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                <Calendar size={14} /> {event.date}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Visibility Map */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-panel"
                    style={{
                        padding: '2rem',
                        position: 'relative',
                        minHeight: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem' }}>{selectedEvent.name}</h2>
                            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', maxWidth: '400px' }}>{selectedEvent.description}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', color: '#00d2ff' }}>
                                <Eye size={16} /> Visibility
                            </div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{selectedEvent.visibility}</div>
                        </div>
                    </div>

                    {/* Map Representation with Realistic Image */}
                    <div style={{ flex: 1, position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                        <img
                            src={earthMapImg}
                            alt="World Map Night View"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                        />

                        {/* Visibility Overlay Context - Relative to image */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                            <svg width="100%" height="100%" viewBox="0 0 100 60" preserveAspectRatio="none">
                                {/* Visibility Highlight */}
                                <circle
                                    cx={selectedEvent.coordinates.cx}
                                    cy={selectedEvent.coordinates.cy}
                                    r={selectedEvent.coordinates.r}
                                    fill="url(#visibilityGradient)"
                                    opacity="0.6"
                                >
                                    <animate attributeName="r" values={`${selectedEvent.coordinates.r};${selectedEvent.coordinates.r + 2};${selectedEvent.coordinates.r}`} dur="3s" repeatCount="indefinite" />
                                </circle>

                                <defs>
                                    <radialGradient id="visibilityGradient">
                                        <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.6" />
                                        <stop offset="100%" stopColor="#00d2ff" stopOpacity="0" />
                                    </radialGradient>
                                </defs>
                            </svg>
                        </div>

                        {/* Pins for mock locations */}
                        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', display: 'flex', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: '4px' }}>
                                <Clock size={14} /> {selectedEvent.time}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SkyEvents;

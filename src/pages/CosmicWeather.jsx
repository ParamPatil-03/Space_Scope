import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Wind, Zap, Activity } from 'lucide-react';

const WeatherCard = ({ title, value, unit, status, icon: Icon, delay }) => {
    const getStatusColor = (s) => {
        switch (s) {
            case 'Normal': return '#2ecc71';
            case 'Moderate': return '#f39c12';
            case 'High': return '#ff0055';
            default: return 'white';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay, duration: 0.5 }}
            className="glass-panel"
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
        >
            <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: '50%',
                marginBottom: '1.5rem'
            }}>
                <Icon size={40} color={getStatusColor(status)} />
            </div>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</h3>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
                {value} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>{unit}</span>
            </div>
            <div style={{
                color: getStatusColor(status),
                border: `1px solid ${getStatusColor(status)}`,
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem'
            }}>
                {status} Activity
            </div>
        </motion.div>
    );
};

const CosmicWeather = () => {
    return (
        <div className="container section-padding">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Cosmic Weather Station</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>Real-time monitoring of solar and geomagnetic conditions.</p>
                <div style={{ marginTop: '1rem', display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71', borderRadius: '8px' }}>
                    System Status: Online • Live Data Stream
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem'
            }}>
                <WeatherCard
                    title="Solar Wind Speed"
                    value="450"
                    unit="km/s"
                    status="Normal"
                    icon={Wind}
                    delay={0.1}
                />
                <WeatherCard
                    title="Geomagnetic Kp"
                    value="3.2"
                    unit="Index"
                    status="Moderate"
                    icon={Activity}
                    delay={0.2}
                />
                <WeatherCard
                    title="X-Ray Flux"
                    value="B4.5"
                    unit="Class"
                    status="Normal"
                    icon={Sun}
                    delay={0.3}
                />
                <WeatherCard
                    title="Aurora Probability"
                    value="65"
                    unit="%"
                    status="High"
                    icon={Zap}
                    delay={0.4}
                />
            </div>

            {/* Aurora Forecast Map Placeholder */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-panel"
                style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center' }}
            >
                <h2 style={{ marginBottom: '1rem' }}>Aurora Borealis Forecast</h2>
                <div style={{
                    height: '300px',
                    background: 'linear-gradient(45deg, #0b0d17, #1b2735)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed var(--glass-border)'
                }}>
                    <p style={{ color: 'var(--color-text-muted)' }}>Aurora Visualization Map Region</p>
                </div>
            </motion.div>
        </div>
    );
};

export default CosmicWeather;

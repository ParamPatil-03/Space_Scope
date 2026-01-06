import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Map, CloudSun, GraduationCap, Globe, Menu, X, Home } from 'lucide-react';
import '../index.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Sky Map', path: '/events', icon: <Map size={20} /> },
    { name: 'Cosmic Weather', path: '/weather', icon: <CloudSun size={20} /> },
    { name: 'Missions', path: '/missions', icon: <Rocket size={20} /> },
    { name: 'Learning', path: '/learning', icon: <GraduationCap size={20} /> },
    { name: 'Earth Impact', path: '/impact', icon: <Globe size={20} /> },
  ];

  return (
    <nav className="glass-panel" style={{
      position: 'fixed',
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '95%',
      maxWidth: '1200px',
      zIndex: 1000,
      padding: '0.8rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          padding: '8px',
          borderRadius: '8px',
          display: 'flex'
        }}>
          <Rocket color="white" size={24} />
        </div>
        <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>SpaceScope</span>
      </div>

      {/* Desktop Menu */}
      <div className="desktop-menu" style={{ display: 'flex', gap: '2rem' }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: location.pathname === item.path ? 'var(--color-secondary)' : 'var(--color-text-muted)',
              fontWeight: location.pathname === item.path ? '600' : '400',
              position: 'relative'
            }}
          >
            {item.icon}
            <span>{item.name}</span>
            {location.pathname === item.path && (
              <span style={{
                position: 'absolute',
                bottom: '-5px',
                left: '0',
                width: '100%',
                height: '2px',
                background: 'var(--color-secondary)',
                boxShadow: '0 0 10px var(--color-secondary)'
              }} />
            )}
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 968px) {
          .desktop-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

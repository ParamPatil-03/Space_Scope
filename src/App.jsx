import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SkyEvents from './pages/SkyEvents';
import CosmicWeather from './pages/CosmicWeather';
import Missions from './pages/Missions';
import Learning from './pages/Learning';
import Impact from './pages/Impact';

// Placeholder components for pages not yet implemented
const Placeholder = ({ title }) => (
  <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
    <h1 className="gradient-text">{title}</h1>
    <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem' }}>Coming Soon...</p>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        {/* We will implement these pages next, using Placeholders relative to import if file doesn't exist? 
            Actually, I'll create the files next. For now, let's assume they exist or use Inline placeholders if imports fail?
            No, imports will fail build if files don't exist.
            So I MUST create all files mentioned in imports or comment them out.
            I will create simple versions of all pages in this turn or next.
            To be safe, I will create them ALL now with simple content.
        */}
        <Route path="events" element={<SkyEvents />} />
        <Route path="weather" element={<CosmicWeather />} />
        <Route path="missions" element={<Missions />} />
        <Route path="learning" element={<Learning />} />
        <Route path="impact" element={<Impact />} />
      </Route>
    </Routes>
  );
}

export default App;

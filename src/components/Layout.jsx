import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import StarBackground from './StarBackground';

const Layout = () => {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
            <StarBackground />
            <Navbar />
            <main style={{
                paddingTop: '8rem',
                paddingBottom: '4rem',
                position: 'relative',
                zIndex: 1
            }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;

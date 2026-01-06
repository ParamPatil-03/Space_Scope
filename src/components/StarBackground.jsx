import React, { useEffect, useState } from 'react';

const StarBackground = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const generateStars = () => {
            const newStars = [];
            for (let i = 0; i < 150; i++) {
                newStars.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random(),
                    animationDuration: Math.random() * 3 + 2,
                });
            }
            setStars(newStars);
        };

        generateStars();
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)',
            overflow: 'hidden'
        }}>
            {stars.map((star) => (
                <div
                    key={star.id}
                    style={{
                        position: 'absolute',
                        top: `${star.y}%`,
                        left: `${star.x}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        opacity: star.opacity,
                        animation: `twinkle ${star.animationDuration}s infinite ease-in-out`
                    }}
                />
            ))}
            <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
        </div>
    );
};

export default StarBackground;

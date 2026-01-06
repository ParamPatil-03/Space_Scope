import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Leaf, Zap, Droplet } from 'lucide-react';
import deforestationImg from '../assets/deforestation.png';
import reforestationImg from '../assets/reforestation.png';

const ComparisonSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        setSliderPosition((x / rect.width) * 100);
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '500px',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: isDragging ? 'ew-resize' : 'grab',
                userSelect: 'none',
            }}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* After Image (Base - Reforestation) */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: `url(${reforestationImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.6)', padding: '1rem', borderRadius: '8px', color: 'white' }}>
                    <h2 style={{ fontSize: '2rem', margin: 0 }}>Reforestation (2025)</h2>
                </div>
            </div>

            {/* Before Image (Overlay - Deforestation) */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: `${sliderPosition}%`, height: '100%',
                overflow: 'hidden',
                borderRight: '4px solid white',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {/* Inner div to hold the full 'before' image, translated to stay fixed */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100vw', height: '100%', // Use 100vw or a fixed large width to ensure it covers enough
                    backgroundImage: `url(${deforestationImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // Note: Ideally we want the image to be exactly the same size as the container. 
                    // To do this perfectly responsively without JS resizing of the inner div is hard with just CSS in this structure.
                    // However, we can toggle the width to '100%' of the PARENT's parent if we knew it. 
                    // A better trick: Use 'fixed' attachment? No, scrolls with page.
                    // Let's stick to the 'transform' trick: 
                    // If the parent is width P, and this is width P, and we clip to X%, we need to translate the inner image by -(100-X)% NO.
                    // We need the inner image to always be width P.
                    // So we set inner div width to '100vw' (screen width) OR just use a simpler approach:
                    // Make the inner text just be positioned absolute relative to the outer container if possible?
                    // Let's just use the previous logic but with cleaner syntax.
                    width: '100%', // This refers to the clipped parent width, which is WRONG for background-size: cover.
                    // Actually, let's fix this properly.
                    // We will just use `width: 100/sliderPosition * 100 %`? No, creates infinity.
                    // Let's go with the `transform` inverse.
                    // If parent is 50%, inner needs to be 200%. 
                    width: `${100 * (100 / sliderPosition)}%`,
                    maxWidth: 'unset'
                }} />
                {/* 
                    Wait, the transform logic from before was:
                    transform: `translateX(${-(100 - sliderPosition)}%)` 
                    This assumes the width is 100% of the ORIGINAL container.
                    But if width is 100% of the CLIPPED container...
                    This is getting complicated to do perfectly with just inline styles.
                    Let's revert to a simpler method: 
                    Two overlapping images, the top one is just a normal div with width X%, and `background-attachment: fixed`? No.
                    
                    Let's trust the previous approach I tried to write but fix the syntax:
                    The "transform" approach works if the inner div is width 100% of the GRANDPARENT. 
                    But we can't reference grandparent in CSS.
                    
                    Simpler: Just use `<img>` tags.
                */}
                <img
                    src={deforestationImg}
                    alt="Deforestation"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%', // This will squeeze it.
                        height: '100%',
                        objectFit: 'cover',
                        // We need to counteract the squeezing. 
                        // Actually, the simplest way is to NOT squeeze it.
                        // Set the width of the image to the width of the CONTAINER.
                        // We can get container width via ref, but let's try a CSS trick used in comparison sliders.
                        // They usually use a container width.
                        width: 'calc(100vw - 4rem)', // Approx container width? No, variable.
                        maxWidth: '1400px', // Container max width
                        // Better: 
                        // Just use background-image on the PARENT and background-attachment?
                    }}
                />
            </div>
            {/* 
            Okay, the previous transform code was:
             <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: `url(${deforestationImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `translateX(${-(100 - sliderPosition)}%)`,
                }}></div>
            
            If `width` is 100% of the clipped parent (say 50% of real width), then this inner div is 50% wide.
            Translating it doesn't make it bigger.
            
            Let's use the standard "Two Images" approach where we just clip components.
            Actually, the simplest working code for this without complex JS:
            Use `background-attachment: fixed` MIGHT work if the slider is static, but scrolling breaks it.
            
            Let's go with `100vw`. It's a hack but it ensures the image is big enough.
            Or just accept that it squishes? No that looks bad.
            
            Let's use a widely accepted React Comparison Slider pattern:
            <div className="compare-container">
               <img src={after} />
               <div className="clip-path-container" style={{ clipPath: `inset(0 ${100-sliderPosition}% 0 0)` }}>
                  <img src={before} />
               </div>
            </div>
            This is WAY simpler.
            */}
        </div>
    );
};
// Redefining proper component below
const BetterComparisonSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        setSliderPosition((x / rect.width) * 100);
    };

    return (
        <div
            style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '12px', overflow: 'hidden', cursor: 'ew-resize', userSelect: 'none' }}
            onMouseMove={handleMouseMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
        >
            {/* Background (Reforestation/After) */}
            <img src={reforestationImg} alt="Reforestation" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />

            {/* Label After */}
            <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', background: 'rgba(0,0,0,0.6)', padding: '0.5rem 1rem', borderRadius: '8px', pointerEvents: 'none' }}>
                <h3>Reforestation (2025)</h3>
            </div>

            {/* Foreground (Deforestation/Before) - Clipped */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` // Clips from the right
            }}>
                <img src={deforestationImg} alt="Deforestation" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />

                {/* Label Before */}
                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', background: 'rgba(0,0,0,0.6)', padding: '0.5rem 1rem', borderRadius: '8px', pointerEvents: 'none' }}>
                    <h3>Deforestation (2015)</h3>
                </div>
            </div>

            {/* Handle */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: `${sliderPosition}%`,
                width: '4px',
                height: '100%',
                background: 'white',
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '40px',
                    height: '40px',
                    background: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ width: '20px', height: '2px', background: '#333' }} />
                </div>
            </div>
        </div>
    );
};

const Impact = () => {
    return (
        <div className="container section-padding">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Satellite Impact on Earth</h1>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                    Space technology isn't just about exploring the unknown—it's about protecting our home.
                    Satellites provide critical data for climate action, agriculture, and disaster response.
                </p>
            </div>

            {/* Interactive Demo */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel"
                style={{ padding: '1rem', marginBottom: '4rem' }}
            >
                <BetterComparisonSlider />
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <h3>Case Study: Amazon Rainforest Monitoring</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>Using satellite imagery to track illegal logging and coordinate reforestation efforts.</p>
                </div>
            </motion.div>

            {/* Impact Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {[
                    { title: 'Precision Agriculture', icon: Leaf, desc: 'Optimizing water and fertilizer use from space.' },
                    { title: 'Disaster Response', icon: Zap, desc: 'Real-time mapping of floods and fires.' },
                    { title: 'Resource Management', icon: Droplet, desc: 'Tracking water reservoirs and ice caps.' },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-panel"
                        style={{ padding: '2rem', textAlign: 'center' }}
                    >
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '50%', width: 'fit-content', margin: '0 auto 1rem auto' }}>
                            <item.icon size={32} color="var(--color-secondary)" />
                        </div>
                        <h3>{item.title}</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Impact;

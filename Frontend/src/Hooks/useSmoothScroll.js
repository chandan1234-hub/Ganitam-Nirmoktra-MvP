import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

export const useSmoothScroll = () => {
    useEffect(() => {
        // Initialize Lenis with optimal smooth scrolling settings
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Sync Lenis's requestAnimationFrame with GSAP's Ticker
        // This ensures animations and scrolling are perfectly synced on the same frame cycle
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            // Cleanup on unmount
            lenis.destroy();
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
        };
    }, []);
};

import { useState, useEffect, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);
    const [isPointer, setIsPointer] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        // Check if touch device
        const isTouchDevice = 'ontouchstart' in window;
        if (isTouchDevice) {
            setIsHidden(true);
            return;
        }

        document.body.classList.add('custom-cursor-active');

        let animationFrameId;
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        const moveCursor = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        // Smooth cursor following using requestAnimationFrame
        const animate = () => {
            // Lerp for smooth movement
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            }
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('clickable') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsPointer(isClickable);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsHidden(true);
        const handleMouseEnter = () => setIsHidden(false);

        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            document.body.classList.remove('custom-cursor-active');
            document.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    if (isHidden) return null;

    return (
        <>
            {/* Main cursor ring */}
            <div
                ref={cursorRef}
                className={`cursor-ring ${isPointer ? 'pointer' : ''} ${isClicking ? 'clicking' : ''}`}
            />

            {/* Center dot */}
            <div
                ref={cursorDotRef}
                className={`cursor-dot ${isPointer ? 'pointer' : ''} ${isClicking ? 'clicking' : ''}`}
            />
        </>
    );
}

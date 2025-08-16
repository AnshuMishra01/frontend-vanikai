import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Counter({ count, max = 1000 }) {
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (circleRef.current) {
      gsap.fromTo(
        circleRef.current,
        { opacity: 0.5, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out', yoyo: true, repeat: 1 }
      );
    }
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0.5 },
        { opacity: 1, duration: 0.7, ease: 'power2.out', yoyo: true, repeat: 1 }
      );
    }
  }, [count]);

  return (
    <div
      ref={circleRef}
      style={{
        width: 70,
        height: 70,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px #b3c0d81a',
        margin: '0 12px',
        position: 'relative',
        animation: 'fadeInOut 2s infinite',
      }}
    >
      <span
        ref={textRef}
        style={{
          color: '#222',
          fontWeight: 700,
          fontSize: '1.05rem',
          textAlign: 'center',
          lineHeight: 1.2,
        }}
      >
        {count}/{max}
      </span>
    </div>
  );
}

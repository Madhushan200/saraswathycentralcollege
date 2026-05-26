import React, { useState, useEffect, useRef } from 'react';

const AchievementCounter = ({ endValue, suffix = '', label, icon: Icon }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          // Parse numerical part only
          const parsedEnd = parseInt(endValue, 10) || 100;
          const duration = 1500; // 1.5 seconds total animation
          const framesPerSecond = 60;
          const totalFrames = Math.round((duration / 1000) * framesPerSecond);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out quad formula for smooth decelerating animation
            const easeProgress = progress * (2 - progress);
            const currentCount = Math.round(easeProgress * parsedEnd);

            if (frame >= totalFrames) {
              if (isMounted) setCount(parsedEnd);
              clearInterval(timer);
            } else {
              if (isMounted) setCount(currentCount);
            }
          }, 1000 / framesPerSecond);

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [endValue]);

  return (
    <div 
      ref={counterRef} 
      className="flex flex-col items-center p-6 text-center bg-slate-900/60 border border-slate-800 rounded-2xl glass-panel transform hover:scale-105 transition-transform duration-300"
    >
      {Icon && (
        <div className="w-12 h-12 flex items-center justify-center bg-school-gold/10 text-school-gold rounded-xl mb-4">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
        <span>{count}</span>
        <span className="text-school-gold font-bold">{suffix}</span>
      </div>
      <p className="text-slate-300 font-semibold text-xs md:text-sm uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
};

export default AchievementCounter;

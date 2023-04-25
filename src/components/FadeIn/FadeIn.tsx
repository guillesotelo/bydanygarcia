import React, { useRef, useEffect, useState } from 'react';

const FadeInSection: React.FC = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    });

    observer.observe(domRef.current as HTMLDivElement);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fade-in ${isVisible ? 'visible' : ''}`}
      ref={domRef}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
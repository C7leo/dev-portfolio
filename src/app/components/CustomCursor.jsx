import { useEffect, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const elRef = useRef(null);
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafRef = useRef(null);
  const size = 32; // matches CSS size

  useEffect(() => {
    function onPointerMove(e) {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    function loop() {
      // smooth follow
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.18;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.18;
      if (elRef.current) {
        // center the element by subtracting half size
        const tx = Math.round(posRef.current.x - size / 2);
        const ty = Math.round(posRef.current.y - size / 2);
        elRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={elRef}>
      <div className="cursor-dot" />
    </div>
  );
}
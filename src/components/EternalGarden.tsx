import React, { useRef, useEffect, useState } from 'react';

export function EternalGarden({ isBackground, onBloomComplete }: { isBackground: boolean, onBloomComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Game state
    const particles: any[] = [];
    let isDrawing = false;
    let lastPos = { x: 0, y: 0 };
    
    // Core loop
    const render = (time: number) => {
      ctx.fillStyle = isBackground ? 'rgba(5, 1, 10, 0.2)' : 'rgba(5, 1, 10, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update & Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        p.alpha = Math.max(0, p.life / p.maxLife);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
        // Bloom effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 1)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (p.life <= 0) particles.splice(i, 1);
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    // Interaction
    const addParticle = (x: number, y: number, isNode = false) => {
      particles.push({
        x, y,
        vx: (isNode ? 0 : (Math.random() - 0.5) * 4),
        vy: (isNode ? 0 : (Math.random() - 0.5) * 4),
        size: isNode ? (8 + Math.random() * 5) : (Math.random() * 3 + 1),
        life: isNode ? 300 : (100 + Math.random() * 50),
        maxLife: isNode ? 300 : 150,
        color: isNode ? { r: 255, g: 200, b: 255 } : {
          r: 200 + Math.random() * 55,
          g: 100 + Math.random() * 100,
          b: 255
        }
      });
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (isBackground) return;
      isDrawing = true;
      lastPos = { x: e.clientX, y: e.clientY };
      addParticle(e.clientX, e.clientY, true);
      // Haptic feedback if available
      if (navigator.vibrate) navigator.vibrate(10);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDrawing || isBackground) return;
      const dx = e.clientX - lastPos.x;
      const dy = e.clientY - lastPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 5) {
         addParticle(e.clientX, e.clientY, Math.random() > 0.9); // occasionally drop a node
         lastPos = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = () => {
      isDrawing = false;
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isBackground]);

  return (
    <>
        <canvas 
          ref={canvasRef}
          className={`w-full h-full touch-none ${isBackground ? 'opacity-50 blur-sm pointer-events-none' : ''}`}
        />
        {!isBackground && (
            <div className="absolute top-6 right-6 pointer-events-auto">
                <button 
                  onClick={onBloomComplete}
                  className="px-6 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 backdrop-blur-md text-pink-200 uppercase tracking-widest text-xs hover:bg-pink-500/20 transition-colors"
                >
                    Record Masterpiece
                </button>
            </div>
        )}
    </>
  );
}

import { useEffect, useRef } from 'react';

export default function ConfettiBlast() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Make canvas full viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle design matching Burgundy/Rose/Ivory branding
    const colors = ['#8B2E4A', '#C0607A', '#D0B8C4', '#FDF9FB', '#EDE0E5', '#5C1A30'];

    class PaperParticle {
      constructor(isInitialBurst, side = 'center') {
        const wWidth = canvas.width;
        const wHeight = canvas.height;

        // Positioning
        if (side === 'left') {
          this.x = 0;
          this.y = wHeight * 0.7;
        } else if (side === 'right') {
          this.x = wWidth;
          this.y = wHeight * 0.7;
        } else {
          this.x = wWidth / 2 + (Math.random() - 0.5) * 100;
          this.y = wHeight * 0.65;
        }

        // Speed/physics
        let angle, speed;
        if (side === 'left') {
          angle = (Math.random() * 45 + 15) * Math.PI / 180; // shoot rightwards up
          speed = Math.random() * 16 + 10;
        } else if (side === 'right') {
          angle = (Math.random() * 45 + 120) * Math.PI / 180; // shoot leftwards up
          speed = Math.random() * 16 + 10;
        } else {
          angle = (Math.random() * 360) * Math.PI / 180;
          speed = isInitialBurst ? Math.random() * 14 + 6 : Math.random() * 5 + 2;
        }

        this.vx = Math.cos(angle) * speed;
        this.vy = -Math.sin(Math.abs(angle)) * speed - (side === 'center' ? 4 : 0);

        this.gravity = 0.22;
        this.drag = 0.975;

        // Paper dimensions
        this.w = Math.random() * 7 + 5;
        this.h = Math.random() * 11 + 7;

        this.color = colors[Math.floor(Math.random() * colors.length)];

        // Rotation
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 8;

        // 3D rotation flip
        this.scaleY = 1;
        this.flipSpeed = (Math.random() + 0.5) * 0.08;
      }

      update() {
        this.vy += this.gravity;
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.x += this.vx;
        this.y += this.vy;

        this.rotation += this.rotationSpeed;
        this.scaleY = Math.sin(Date.now() * 0.005 * this.flipSpeed);
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.scale(1, this.scaleY);

        ctx.fillStyle = this.color;
        // Draw standard rectangular cut-out paper
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();
      }
    }

    const particles = [];

    // 1. Initial central blast
    for (let i = 0; i < 150; i++) {
      particles.push(new PaperParticle(true, 'center'));
    }

    // 2. Left side burst
    setTimeout(() => {
      if (!canvas) return;
      for (let i = 0; i < 80; i++) {
        particles.push(new PaperParticle(true, 'left'));
      }
    }, 200);

    // 3. Right side burst
    setTimeout(() => {
      if (!canvas) return;
      for (let i = 0; i < 80; i++) {
        particles.push(new PaperParticle(true, 'right'));
      }
    }, 400);

    // 4. Continuous sprinkles
    const sprinkleInterval = setInterval(() => {
      if (particles.length < 350) {
        particles.push(new PaperParticle(false, 'center'));
      }
    }, 150);

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();

        // Remove if off screen bottom or sides
        if (p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(sprinkleInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}

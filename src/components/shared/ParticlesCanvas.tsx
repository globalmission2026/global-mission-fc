"use client";

import { useEffect, useRef } from "react";

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const shapes = ["circle", "cross", "diamond"];

    class Particle {
      x!: number;
      y!: number;
      size!: number;
      speed!: number;
      opacity!: number;
      shape!: string;
      angle!: number;
      swing!: number;

      constructor() {
        this.reset();
        this.y = Math.random() * canvas!.height;
      }

      reset() {
        this.x = Math.random() * canvas!.width;
        this.y = canvas!.height + 50;
        this.size = Math.random() * 4 + 2;
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.swing = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.y -= this.speed;
        this.x += Math.sin(this.angle) * this.swing;
        this.angle += 0.02;
        if (this.y < -50) {
          this.reset();
        }
      }

      draw() {
        ctx!.save();
        ctx!.translate(this.x, this.y);
        ctx!.rotate(this.angle * 0.2);
        ctx!.globalAlpha = this.opacity;
        ctx!.fillStyle = "#D9A857";

        if (this.shape === "circle") {
          ctx!.beginPath();
          ctx!.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx!.fill();
        } else if (this.shape === "diamond") {
          ctx!.beginPath();
          ctx!.moveTo(0, -this.size);
          ctx!.lineTo(this.size, 0);
          ctx!.lineTo(0, this.size);
          ctx!.lineTo(-this.size, 0);
          ctx!.closePath();
          ctx!.fill();
        } else if (this.shape === "cross") {
          ctx!.beginPath();
          ctx!.rect(-this.size / 4, -this.size, this.size / 2, this.size * 2);
          ctx!.rect(-this.size, -this.size / 4, this.size * 2, this.size / 2);
          ctx!.fill();
        }

        ctx!.restore();
      }
    }

    const particleCount = Math.min(Math.floor(canvas.width / 15), 100);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="gmfci-particles-canvas"></canvas>;
}

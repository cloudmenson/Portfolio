"use client";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  spin: number;
  life: number;
}

const PALETTE = [
  "#10b981",
  "#34d399",
  "#6ee7b7",
  "#fbbf24",
  "#f472b6",
  "#60a5fa",
  "#ffffff",
];

const GRAVITY = 0.32;
const DRAG = 0.988;

/**
 * Dependency-free confetti burst. Draws to a throwaway full-screen canvas that
 * removes itself once every particle has fallen out of view, so nothing stays
 * mounted between bursts.
 *
 * @param origin normalised launch point, `{ x: 0.5, y: 0.5 }` = screen centre
 */
export const fireConfetti = (
  origin: { x: number; y: number } = { x: 0.5, y: 0.4 },
  count = 120
) => {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.cssText = `position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:200`;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }
  ctx.scale(dpr, dpr);

  const originX = origin.x * width;
  const originY = origin.y * height;

  const particles: Particle[] = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 6 + Math.random() * 11;

    return {
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      size: 5 + Math.random() * 7,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.3,
      life: 1,
    };
  });

  let frame = 0;

  const tick = () => {
    ctx.clearRect(0, 0, width, height);

    let alive = false;

    for (const p of particles) {
      p.vx *= DRAG;
      p.vy = p.vy * DRAG + GRAVITY;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      p.life -= 0.006;

      if (p.life <= 0 || p.y > height + 40) continue;
      alive = true;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      // Squashed rect reads as a tumbling paper flake rather than a dot.
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    }

    if (alive) {
      frame = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(frame);
      canvas.remove();
    }
  };

  frame = requestAnimationFrame(tick);
};

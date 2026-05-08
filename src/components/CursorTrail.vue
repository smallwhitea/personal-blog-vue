<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isMobile = ref(false);
const particles = ref([]);

let animationFrameId = null;
let lastMouseX = 0;
let lastMouseY = 0;
let lastSpawnTime = 0;

const MAX_PARTICLES = 80;
const PARTICLE_LIFE_TIME = 650;

const colors = [
  "rgba(0, 245, 255, 0.95)",
  "rgba(76, 201, 255, 0.9)",
  "rgba(168, 85, 247, 0.9)",
  "rgba(255, 79, 216, 0.85)",
  "rgba(255, 230, 109, 0.85)",
  "rgba(255, 255, 255, 0.95)",
];

const shapes = ["circle", "diamond", "star", "line", "square"];

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const random = (min, max) => Math.random() * (max - min) + min;

const clearParticles = () => {
  particles.value = [];
};

const spawnParticle = (x, y, big = false) => {
  if (particles.value.length >= MAX_PARTICLES) {
    particles.value.shift();
  }

  const shape = shapes[Math.floor(Math.random() * shapes.length)];

  particles.value.push({
    id: Date.now() + Math.random(),
    createdAt: performance.now(),

    x,
    y,

    vx: random(-1.8, 1.8),
    vy: random(-1.8, 1.8),

    size: big ? random(10, 16) : random(3, 8),

    color: colors[Math.floor(Math.random() * colors.length)],

    opacity: 1,
    life: 1,

    shape,

    rotate: random(0, 360),
    rotateSpeed: random(-5, 5),

    scale: random(0.8, 1.4),
  });
};

const handleMouseMove = (e) => {
  if (isMobile.value) return;

  const now = Date.now();
  const x = e.clientX;
  const y = e.clientY;

  if (now - lastSpawnTime > 30) {
    const distance = Math.sqrt(
      Math.pow(x - lastMouseX, 2) + Math.pow(y - lastMouseY, 2),
    );

    // 限制快速甩鼠标时一次性生成太多粒子
    const steps = Math.min(4, Math.max(1, Math.floor(distance / 28)));

    for (let i = 1; i <= steps; i++) {
      const t = i / steps;

      const px = lastMouseX + (x - lastMouseX) * t;
      const py = lastMouseY + (y - lastMouseY) * t;

      spawnParticle(px, py);

      if (Math.random() < 0.08) {
        spawnParticle(px, py, true);
      }
    }

    lastSpawnTime = now;
  }

  lastMouseX = x;
  lastMouseY = y;
};

const animate = () => {
  const now = performance.now();

  particles.value = particles.value
    .map((p) => {
      const age = now - p.createdAt;
      const life = Math.max(0, 1 - age / PARTICLE_LIFE_TIME);

      return {
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        rotate: p.rotate + p.rotateSpeed,
        life,
        opacity: life,
        scale: p.scale + 0.002,
      };
    })
    .filter((p) => p.life > 0.02);

  animationFrameId = requestAnimationFrame(animate);
};

onMounted(() => {
  checkMobile();

  window.addEventListener("resize", checkMobile);
  window.addEventListener("mousemove", handleMouseMove, { passive: true });

  // 页面失焦 / 鼠标离开窗口时强制清理，避免残留
  window.addEventListener("mouseleave", clearParticles);
  window.addEventListener("blur", clearParticles);

  animate();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mouseleave", clearParticles);
  window.removeEventListener("blur", clearParticles);

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<template>
  <div v-if="!isMobile" class="cursor-trail">
    <div
      v-for="particle in particles"
      :key="particle.id"
      :class="['particle', `particle-${particle.shape}`]"
      :style="{
        left: particle.x + 'px',
        top: particle.y + 'px',
        width: particle.size + 'px',
        height: particle.size + 'px',
        opacity: particle.opacity,
        background: particle.shape === 'star' ? 'transparent' : particle.color,
        color: particle.color,
        boxShadow: `0 0 ${particle.size}px ${particle.color}`,
        transform: `
          translate(-50%, -50%)
          rotate(${particle.rotate}deg)
          scale(${particle.scale})
        `,
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.cursor-trail {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99999;
  overflow: hidden;
}

.particle {
  position: absolute;
  pointer-events: none;
  mix-blend-mode: screen;
  transition:
    opacity 0.12s linear,
    transform 0.12s linear;
}

.particle-circle {
  border-radius: 50%;
}

.particle-square {
  border-radius: 2px;
}

.particle-diamond {
  border-radius: 2px;
}

.particle-line {
  width: 10px !important;
  height: 2px !important;
  border-radius: 999px;
}

.particle-star {
  background: transparent !important;
}

.particle-star::before,
.particle-star::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 6px currentColor;
}

.particle-star::after {
  transform: translate(-50%, -50%) rotate(90deg);
}
</style>

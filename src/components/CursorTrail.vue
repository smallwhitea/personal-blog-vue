<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isMobile = ref(false);
const particles = ref([]);

let animationFrameId = null;
let lastMouseX = 0;
let lastMouseY = 0;
let lastSpawnTime = 0;
let isPaused = false; // 新增：暂停状态标识
let hasMousePosition = false;

const MAX_PARTICLES = 30;
const PARTICLE_LIFE_TIME = 450;
const SPAWN_INTERVAL = 80;

const colors = [
  "rgba(0, 245, 255, 0.85)",
  "rgba(76, 201, 255, 0.8)",
  "rgba(168, 85, 247, 0.8)",
  "rgba(255, 79, 216, 0.75)",
  "rgba(255, 230, 109, 0.75)",
  "rgba(255, 255, 255, 0.85)",
];

const shapes = ["circle", "diamond", "star", "line"]; // 恢复更多形状但简化

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const random = (min, max) => Math.random() * (max - min) + min;

const clearParticles = () => {
  particles.value = [];
};

const spawnParticle = (x, y) => {
  if (particles.value.length >= MAX_PARTICLES || isPaused) {
    return; // 如果暂停或达到上限，不生成
  }

  const shape = shapes[Math.floor(Math.random() * shapes.length)];

  particles.value.push({
    id: Date.now() + Math.random(),
    createdAt: performance.now(),

    x,
    y,

    vx: random(-0.8, 0.8), // 降低速度
    vy: random(-0.8, 0.8),

    size: random(2, 5), // 减小粒子尺寸

    color: colors[Math.floor(Math.random() * colors.length)],

    opacity: 1,
    life: 1,

    shape,

    rotate: random(0, 360),
    rotateSpeed: random(-2, 2), // 降低旋转速度

    scale: random(0.9, 1.1), // 缩小缩放范围
  });
};

const handleMouseMove = (e) => {
  if (isMobile.value || isPaused) return;

  // 按住鼠标拖动时不生成粒子，避免拖动滚动条卡顿
  if (e.buttons === 1) return;

  // 鼠标在右侧滚动条区域时不生成粒子
  if (e.clientX > window.innerWidth - 24) return;

  const now = Date.now();
  const x = e.clientX;
  const y = e.clientY;

  // 第一次移动只记录位置，避免从 0,0 生成一串粒子
  if (!hasMousePosition) {
    lastMouseX = x;
    lastMouseY = y;
    hasMousePosition = true;
    return;
  }

  if (now - lastSpawnTime > SPAWN_INTERVAL) {
    const distance = Math.sqrt(
      Math.pow(x - lastMouseX, 2) + Math.pow(y - lastMouseY, 2),
    );

    const steps = Math.min(1, Math.max(1, Math.floor(distance / 60)));

    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const px = lastMouseX + (x - lastMouseX) * t;
      const py = lastMouseY + (y - lastMouseY) * t;
      spawnParticle(px, py);
    }

    lastSpawnTime = now;
  }

  lastMouseX = x;
  lastMouseY = y;
};

const animate = () => {
  if (isPaused) {
    return;
  }

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
        scale: p.scale + 0.001,
      };
    })
    .filter((p) => p.life > 0.05);

  animationFrameId = requestAnimationFrame(animate);
};

const pause = () => {
  isPaused = true;
  clearParticles();

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

const resume = () => {
  if (isMobile.value) return;

  isPaused = false;
  hasMousePosition = false;

  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(animate);
  }
};

onMounted(() => {
  checkMobile();

  window.addEventListener("resize", checkMobile);
  window.addEventListener("mousemove", handleMouseMove, { passive: true });

  // 页面失焦 / 鼠标离开窗口时强制清理，避免残留
  window.addEventListener("mouseleave", pause);
  window.addEventListener("blur", pause);
  window.addEventListener("mouseenter", resume);
  window.addEventListener("focus", resume);

  animate();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mouseleave", pause);
  window.removeEventListener("blur", pause);
  window.removeEventListener("mouseenter", resume);
  window.removeEventListener("focus", resume);

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  clearParticles();
});
</script>

<template>
  <div v-if="!isMobile" class="cursor-trail">
    <div
      v-for="particle in particles"
      :key="particle.id"
      :class="['particle', `particle-${particle.shape}`]"
      :style="{
        width: particle.size + 'px',
        height: particle.size + 'px',
        opacity: particle.opacity,
        background: particle.shape === 'star' ? 'transparent' : particle.color,
        color: particle.color,
        transform: `
          translate3d(${particle.x}px, ${particle.y}px, 0)
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

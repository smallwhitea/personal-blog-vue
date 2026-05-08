<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isMobile = ref(false);
const particles = ref([]);

let animationFrameId = null;
let lastMouseX = 0;
let lastMouseY = 0;
let lastSpawnTime = 0;

const MAX_PARTICLES = 80;

const colors = [
  "rgba(0, 245, 255, 0.95)", // 青蓝
  "rgba(76, 201, 255, 0.9)", // 蓝
  "rgba(168, 85, 247, 0.9)", // 紫
  "rgba(255, 79, 216, 0.85)", // 粉
  "rgba(255, 230, 109, 0.85)", // 黄
  "rgba(255, 255, 255, 0.95)", // 白
];

const shapes = ["circle", "diamond", "star", "line", "square"];

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const random = (min, max) => Math.random() * (max - min) + min;

const spawnParticle = (x, y, big = false) => {
  if (particles.value.length >= MAX_PARTICLES) {
    particles.value.shift();
  }

  const shape = shapes[Math.floor(Math.random() * shapes.length)];

  particles.value.push({
    id: Date.now() + Math.random(),

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

  // 提高生成频率
  if (now - lastSpawnTime > 30) {
    const distance = Math.sqrt(
      Math.pow(x - lastMouseX, 2) + Math.pow(y - lastMouseY, 2),
    );

    // 鼠标移动越快，补点越多
    const steps = Math.max(1, Math.floor(distance / 22));

    for (let i = 1; i <= steps; i++) {
      const t = i / steps;

      const px = lastMouseX + (x - lastMouseX) * t;
      const py = lastMouseY + (y - lastMouseY) * t;

      spawnParticle(px, py);

      // 小概率生成大星芒
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
  particles.value = particles.value
    .map((p) => ({
      ...p,

      x: p.x + p.vx,
      y: p.y + p.vy,

      rotate: p.rotate + p.rotateSpeed,

      life: p.life - 0.018,

      opacity: p.life,

      scale: p.scale + 0.003,
    }))
    .filter((p) => p.life > 0);

  animationFrameId = requestAnimationFrame(animate);
};

onMounted(() => {
  checkMobile();

  window.addEventListener("resize", checkMobile);

  window.addEventListener("mousemove", handleMouseMove, { passive: true });

  animate();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);

  window.removeEventListener("mousemove", handleMouseMove);

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

        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,

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

/* 圆形 */
.particle-circle {
  border-radius: 50%;
}

/* 方块 */
.particle-square {
  border-radius: 2px;
}

/* 菱形 */
.particle-diamond {
  border-radius: 2px;
}

/* 光线 */
.particle-line {
  width: 10px !important;
  height: 2px !important;

  border-radius: 999px;
}

/* 星芒 */
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

  box-shadow: 0 0 12px currentColor;
}

.particle-star::after {
  transform: translate(-50%, -50%) rotate(90deg);
}
</style>

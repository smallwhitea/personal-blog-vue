<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isMobile = ref(false);
const effects = ref([]);

const texts = [
  "怎么隐藏",
  "我的悲伤",
  "失去你的地方",
  "你的发香",
  "散的匆忙",
  "我已经跟不上",
];

const colors = [
  "#00f5ff",
  "#4cc9ff",
  "#a855f7",
  "#ff4fd8",
  "#ffe66d",
  "#ffffff",
];

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const random = (min, max) => Math.random() * (max - min) + min;

const createEffect = (x, y) => {
  const id = Date.now() + Math.random();
  const text = texts[Math.floor(Math.random() * texts.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const rotate = random(-15, 15);
  const scale = random(0.8, 1.2);

  effects.value.push({ id, x, y, text, color, rotate, scale });

  setTimeout(() => {
    effects.value = effects.value.filter((e) => e.id !== id);
  }, 1500);
};

const handleClick = (e) => {
  if (isMobile.value) return;
  createEffect(e.clientX, e.clientY);
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
  window.addEventListener("click", handleClick, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
  window.removeEventListener("click", handleClick);
});
</script>

<template>
  <div v-if="!isMobile" class="click-effect">
    <div
      v-for="effect in effects"
      :key="effect.id"
      class="effect-item"
      :style="{
        left: effect.x + 'px',
        top: effect.y + 'px',
        color: effect.color,
        transform: `translate(-50%, -50%) rotate(${effect.rotate}deg) scale(${effect.scale})`,
      }"
    >
      {{ effect.text }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.click-effect {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99999;
  overflow: hidden;
}

.effect-item {
  position: absolute;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 0 0 10px currentColor;
  pointer-events: none;
  animation: clickEffect 1.5s ease-out forwards;
  mix-blend-mode: screen;
}

@keyframes clickEffect {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.5) translateY(0);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2) translateY(-20px);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1) translateY(-60px);
  }
}
</style>

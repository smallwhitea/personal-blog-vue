<script setup>
// 无需 JS，纯 CSS 实现
</script>

<template>
  <div class="cyber-background">
    <!-- 渐变光斑层 -->
    <div class="glow-layer">
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
      <div class="glow glow-3"></div>
      <div class="glow glow-4"></div>
    </div>
    <!-- 网格纹理层 -->
    <div class="grid-layer"></div>
    <!-- 轻微扫描线 -->
    <div class="scan-line-layer"></div>
  </div>
</template>

<style scoped lang="scss">
.cyber-background {
  position: fixed;
  inset: 0;
  pointer-events: none; // 不影响点击和滚动
  z-index: 0; // 层级低于内容层
  overflow: hidden;
  display: none; // 默认 Light 模式下隐藏

  // Dark 模式下显示（使用 :deep() 来穿透 scoped）
  html.dark & {
    display: block;
  }
}

// 渐变光斑层
.glow-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px); // 降低模糊让光斑更实
  opacity: 0.6; // 提高透明度
  mix-blend-mode: screen;
  will-change: transform; // 性能优化
  animation: float 12s ease-in-out infinite; // 加快动画
}

.glow-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(76, 201, 255, 0.7), transparent 70%);
  top: -200px;
  left: -100px;
  animation-delay: 0s;
}

.glow-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.6), transparent 70%);
  top: 30%;
  right: -150px;
  animation-delay: -3s;
  animation-direction: reverse;
}

.glow-3 {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(255, 79, 216, 0.5), transparent 70%);
  bottom: -100px;
  left: 20%;
  animation-delay: -6s;
}

.glow-4 {
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(34, 247, 210, 0.45),
    transparent 70%
  );
  bottom: 20%;
  right: 30%;
  animation-delay: -9s;
  animation-direction: reverse;
}

// 网格纹理层
.grid-layer {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(76, 201, 255, 0.12) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(168, 85, 247, 0.08) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.7; // 提高透明度
  mask-image: radial-gradient(
    circle at center,
    black,
    transparent 90%
  ); // 减弱 mask 让可见范围更大
  -webkit-mask-image: radial-gradient(circle at center, black, transparent 90%);
  animation: gridMove 20s linear infinite; // 加快动画
}

// 轻微扫描线
.scan-line-layer {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.06),
    transparent 4px
  );
  background-size: 100% 8px;
  opacity: 0.5; // 提高透明度
  animation: scanMove 6s linear infinite; // 加快动画
}

// 动画：光斑浮动
@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(50px, -60px) scale(1.1); // 增加移动幅度
  }
  50% {
    transform: translate(-40px, 30px) scale(0.9);
  }
  75% {
    transform: translate(60px, 50px) scale(1.05);
  }
}

// 动画：网格缓慢移动
@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

// 动画：扫描线缓慢滚动
@keyframes scanMove {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(8px);
  }
}

// 移动端优化：降低动画强度和模糊以提升性能
@media (max-width: 768px) {
  .glow {
    filter: blur(50px);
    opacity: 0.5;
    animation-duration: 18s;
  }

  .glow-1 {
    width: 400px;
    height: 400px;
  }
  .glow-2 {
    width: 350px;
    height: 350px;
  }
  .glow-3 {
    width: 300px;
    height: 300px;
  }
  .glow-4 {
    width: 250px;
    height: 250px;
  }

  .grid-layer {
    background-size: 40px 40px;
    opacity: 0.6;
  }
}
</style>

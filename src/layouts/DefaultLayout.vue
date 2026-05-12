<script setup>
import { computed, ref } from "vue";

import AppHeader from "@/layouts/components/AppHeader.vue";
import AppSidebar from "@/layouts/components/AppSidebar.vue";
import AppFooter from "@/layouts/components/AppFooter.vue";
import CyberBackground from "@/components/CyberBackground.vue";
import CursorTrail from "@/components/CursorTrail.vue";
import ClickEffect from "@/components/ClickEffect.vue";

const drawerOpen = ref(false);
const isMobile = computed(
  () => window.matchMedia && window.matchMedia("(max-width: 768px)").matches,
);

function openDrawer() {
  drawerOpen.value = true;
}
</script>

<template>
  <el-container class="layout">
    <CyberBackground />
    <CursorTrail />
    <ClickEffect />
    <el-header class="layout-header">
      <AppHeader :show-mobile-menu="true" @toggle-sidebar="openDrawer" />
    </el-header>

    <el-container class="layout-body">
      <el-aside class="layout-aside">
        <el-scrollbar class="aside-scroll">
          <AppSidebar />
        </el-scrollbar>
      </el-aside>

      <el-main class="layout-main">
        <el-scrollbar class="main-scroll">
          <div class="main-inner">
            <router-view />
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>

    <el-footer class="layout-footer">
      <AppFooter />
    </el-footer>

    <el-drawer
      v-model="drawerOpen"
      :with-header="false"
      direction="ltr"
      size="78%"
      class="mobile-drawer"
    >
      <AppSidebar :compact="true" />
    </el-drawer>
  </el-container>
</template>

<style scoped lang="scss">
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-base);
  position: relative;
  z-index: 1; // 明确在最上面的内容层
  overflow: hidden; // 新增：避免页面整体滚动
}

// 暗黑模式：用全局主题里的多层渐变作底（避免整屏死黑），正文仍在 layout-body 之上
:global(.dark) .layout {
  background-color: #050712;
  background-image: var(--bg-gradient);
  background-repeat: no-repeat;
  background-size: cover;
}

// 保证 router-view 的容器（main-inner）明确有层级，不会被任何伪元素盖
.main-inner {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
  min-height: 100%;
  position: relative;
  z-index: 10; // 强制把路由内容提起来
}

.layout-header {
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border-lighter);
  background-color: var(--bg-card);
  padding: 0;
  height: 64px;
}

.layout-body {
  flex: 1;
  min-height: 0; // flex 子项可收缩，避免主区高度为 0 只剩背景动画
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: var(--spacing-base);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  column-gap: var(--spacing-base);
  overflow: hidden; // 新增：只让主内容区滚动
  position: relative;
  z-index: 1; // 始终在 CyberBackground 之上（背景同为 0 时按层叠易出问题）
}

.layout-aside {
  width: 100%;
}
.aside-scroll {
  height: 100%;
  min-height: 0;
}

.aside-scroll :deep(.el-scrollbar__wrap) {
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  margin-right: 8px;
}

.aside-scroll :deep(.el-scrollbar__wrap::-webkit-scrollbar) {
  display: none;
}

.aside-scroll :deep(.el-scrollbar__bar.is-vertical) {
  right: 2px;
  width: 6px;
}

.aside-scroll :deep(.el-scrollbar__thumb) {
  background: linear-gradient(
    180deg,
    rgba(76, 201, 255, 0.7),
    rgba(168, 85, 247, 0.6),
    rgba(255, 79, 216, 0.55)
  );
  border-radius: 999px;
  box-shadow: 0 0 10px rgba(76, 201, 255, 0.3);
}

.dark .aside-scroll :deep(.el-scrollbar__thumb:hover) {
  background: linear-gradient(
    180deg,
    rgba(76, 201, 255, 0.85),
    rgba(168, 85, 247, 0.75),
    rgba(255, 79, 216, 0.7)
  );
  box-shadow: 0 0 14px rgba(168, 85, 247, 0.4);
}

.layout-main {
  padding: 0;
  min-width: 0;
  min-height: 0;
  height: 100%;
  position: relative;
  z-index: 1;
}

.main-scroll {
  height: 100%;
  min-height: 0;
}

.main-scroll :deep(.el-scrollbar__wrap) {
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  margin-right: 8px;
}

.main-scroll :deep(.el-scrollbar__wrap::-webkit-scrollbar) {
  display: none;
}

.main-scroll :deep(.el-scrollbar__bar.is-vertical) {
  right: 2px;
  width: 6px;
}

.main-scroll :deep(.el-scrollbar__thumb) {
  background: linear-gradient(
    180deg,
    rgba(76, 201, 255, 0.7),
    rgba(168, 85, 247, 0.6),
    rgba(255, 79, 216, 0.55)
  );
  border-radius: 999px;
  box-shadow: 0 0 10px rgba(76, 201, 255, 0.3);
}

.dark .main-scroll :deep(.el-scrollbar__thumb:hover) {
  background: linear-gradient(
    180deg,
    rgba(76, 201, 255, 0.85),
    rgba(168, 85, 247, 0.75),
    rgba(255, 79, 216, 0.7)
  );
  box-shadow: 0 0 14px rgba(168, 85, 247, 0.4);
}

.main-inner {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
  min-height: 100%;
}

.layout-footer {
  border-top: 1px solid var(--border-lighter);
  background-color: var(--bg-card);
  padding: 0;
  height: 64px;
  overflow: hidden;
}

// Dark 下的布局头部和底部：渐变 + 毛玻璃 + 底边流光线
// 注意：不要覆盖 .layout-header 的 position: sticky / z-index: 100，否则层叠错乱、内容像被背景盖住
.dark .layout-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(
    180deg,
    rgba(10, 12, 24, 0.78),
    rgba(10, 12, 24, 0.55)
  );
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));

  &::before {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--neon-blue) 20%,
      var(--neon-purple) 50%,
      var(--neon-pink) 80%,
      transparent 100%
    );
    background-size: 200% 100%;
    background-repeat: no-repeat;
    animation: neon-flow-bottom 8s linear infinite;
    opacity: 0.75;
    pointer-events: none;
  }
}

.dark .layout-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(
    0deg,
    rgba(10, 12, 24, 0.78),
    rgba(10, 12, 24, 0.55)
  );
  backdrop-filter: blur(calc(var(--glass-blur) - 4px));
  -webkit-backdrop-filter: blur(calc(var(--glass-blur) - 4px));
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--neon-pink) 20%,
      var(--neon-purple) 50%,
      var(--neon-blue) 80%,
      transparent 100%
    );
    background-size: 200% 100%;
    background-repeat: no-repeat;
    animation: neon-flow-bottom 6s linear infinite reverse;
    opacity: 0.65;
    pointer-events: none;
  }
}

@keyframes neon-flow-bottom {
  0% {
    background-position: 0% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dark .layout-header::before,
  .dark .layout-footer::before {
    animation: none !important;
  }
}

@media (max-width: 900px) {
  .layout-body {
    padding: var(--spacing-sm);
  }

  .layout-header,
  .layout-footer {
    height: 56px;
  }
}

@media (max-width: 768px) {
  .layout-aside {
    display: none;
  }

  .layout-body {
    // 侧栏隐藏后必须改成单列，否则仍会保留 280px 空轨，正文只占右侧「一半」
    grid-template-columns: minmax(0, 1fr);
    gap: var(--spacing-sm);
  }
}
</style>

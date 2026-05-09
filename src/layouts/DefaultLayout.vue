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
        <div class="main-inner">
          <router-view />
        </div>
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
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: var(--spacing-base);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  column-gap: var(--spacing-base);
  overflow: hidden;
  position: relative;
  z-index: 0;
}

.layout-aside {
  width: 100%;
}
.aside-scroll {
  padding-right: 4px;
  height: 100%;
  overflow-y: auto;
}

.layout-main {
  padding: 0;
  min-width: 0;
  overflow-y: auto;
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
.dark .layout-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(
    180deg,
    rgba(10, 12, 24, 0.78),
    rgba(10, 12, 24, 0.55)
  );
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  position: relative;
  z-index: 1;

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
    gap: var(--spacing-sm);
  }
}
</style>

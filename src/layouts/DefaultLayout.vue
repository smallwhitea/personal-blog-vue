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
}

// Dark 下的布局头部和底部：渐变 + 毛玻璃
.dark .layout-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(
    180deg,
    rgba(10, 12, 24, 0.78),
    rgba(10, 12, 24, 0.55)
  );
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
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

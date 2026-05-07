<script setup>
import { computed, ref } from 'vue'

import AppHeader from '@/layouts/components/AppHeader.vue'
import AppSidebar from '@/layouts/components/AppSidebar.vue'
import AppFooter from '@/layouts/components/AppFooter.vue'

const drawerOpen = ref(false)
const isMobile = computed(() => window.matchMedia && window.matchMedia('(max-width: 768px)').matches)

function openDrawer() {
  drawerOpen.value = true
}
</script>

<template>
  <el-container class="layout">
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
  min-height: 100svh;
  background: var(--bg);
}

.layout-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(12px);
}

.layout-body {
  width: min(1200px, 100%);
  margin: 0 auto;
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;
}

.layout-aside {
  width: 280px;
  border-right: 1px solid transparent;
}

.aside-scroll {
  padding-right: 4px;
}

.layout-main {
  padding: 0;
}

.main-inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.layout-footer {
  border-top: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
}

@media (max-width: 768px) {
  .layout-body {
    padding: 12px;
  }

  .layout-aside {
    display: none;
  }
}
</style>


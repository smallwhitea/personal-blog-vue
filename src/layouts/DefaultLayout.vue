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
  height: 100vh;                  // 占满视口高度
  display: flex;
  flex-direction: column;
  background-color: var(--bg-base);
}

.layout-header {
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border-lighter);
  background-color: var(--bg-card);
  backdrop-filter: blur(16px);
  padding: 0;
  height: 64px;
}

.layout-body {
  flex: 1;                         // 占满 header/footer 之间的剩余空间
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: var(--spacing-base);
  box-sizing: border-box;
  display: grid;                   // 两列布局：左侧 sidebar + 右侧 main
  grid-template-columns: 280px minmax(0, 1fr);
  column-gap: var(--spacing-base);
  overflow: hidden;                // 让右侧内部滚动，不让内容溢出

}

.layout-aside {
  width: 100%;
}
.aside-scroll {
  padding-right: 4px;
  height: 100%;             // 填满左侧这一列
  overflow-y: auto;         // 侧栏内部如果过长，可以单独滚动
}

.layout-main {
  padding: 0;
  min-width: 0;
  overflow-y: auto;             // 右侧主内容在这里滚动

}

.main-inner {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
  min-height: 100%;             // 使得内容至少占满可视高度，滚动更自然
}

.layout-footer {
  border-top: 1px solid var(--border-lighter);
  background-color: var(--bg-card);
  backdrop-filter: blur(10px);
  padding: 0;
  height: 64px;
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

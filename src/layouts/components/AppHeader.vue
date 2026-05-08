<script setup>
import { useThemeStore } from "@/stores/theme";
import { siteConfig } from "@/config/site";
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  showMobileMenu: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["toggleSidebar"]);
const themeStore = useThemeStore();
const route = useRoute();
const active = computed(() => route.path);

const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>

<template>
  <div class="header">
    <div class="left">
      <el-button
        v-if="showMobileMenu"
        class="menu-btn"
        text
        aria-label="Open menu"
        @click="emit('toggleSidebar')"
      >
        <el-icon><Menu /></el-icon>
      </el-button>
      <div class="brand">{{ siteConfig.name }}</div>
    </div>

        <el-menu
          class="nav"
          mode="horizontal"
          :default-active="active"
          :ellipsis="false"
          router
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/posts">记录</el-menu-item>
          <el-menu-item index="/category">分类</el-menu-item>
          <el-menu-item index="/tags">标签</el-menu-item>
          <el-menu-item index="/archive">归档</el-menu-item>
          <el-menu-item index="/about">关于</el-menu-item>
        </el-menu>

    <div class="right">
      <el-button
        class="theme-btn"
        circle
        text
        @click="toggleTheme"
        aria-label="Toggle theme"
      >
        <el-icon v-if="themeStore.isDark" size="20"><Sunny /></el-icon>
        <el-icon v-else size="20"><Moon /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-base);
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 0 var(--spacing-base);
  box-sizing: border-box;
}

.left {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  min-width: 200px;
}

.menu-btn {
  display: none;
}

.brand {
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--text-primary);
  font-size: 20px;
  white-space: nowrap;
}

.nav {
  flex: 1;
  justify-content: center;
  background-color: transparent;
  border-bottom: none;
  height: 100%;
}

.nav :deep(.el-menu-item) {
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

.right {
  min-width: 280px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-sm);
}

.theme-btn {
  font-size: 20px;
  padding: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--border-lighter);
  background-color: var(--bg-card);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--bg-hover);
    border-color: var(--primary-color);
  }
}

// Dark 下的头部样式
.dark .brand {
  text-shadow: 0 0 18px rgba(76, 201, 255, 0.12);
}

.dark .nav :deep(.el-menu-item) {
  color: rgba(229, 234, 243, 0.82);
}

.dark .nav :deep(.el-menu-item:hover) {
  color: rgba(245, 247, 255, 0.92);
  text-shadow: 0 0 18px rgba(168, 85, 247, 0.18);
}

.dark .nav :deep(.el-menu-item.is-active) {
  color: rgba(245, 247, 255, 0.92);
  text-shadow: 0 0 22px rgba(76, 201, 255, 0.22);
}

.dark .theme-btn {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background-color: rgba(16, 18, 34, 0.55);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));

  &:hover {
    background-color: var(--bg-hover);
    border-color: rgba(76, 201, 255, 0.35);
    box-shadow: var(--neon-glow);
  }
}

@media (max-width: 900px) {
  .left {
    min-width: 0;
  }

  .right {
    min-width: 0;
  }
}

@media (max-width: 768px) {
  .menu-btn {
    display: inline-flex;
  }

  .nav {
    display: none;
  }

  .brand {
    font-size: 18px;
  }
}
</style>

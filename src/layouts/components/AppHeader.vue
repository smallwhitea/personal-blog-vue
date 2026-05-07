<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { siteConfig } from '@/config/site'

const props = defineProps({
  showMobileMenu: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['toggleSidebar'])
const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()
const searchInput = ref('')

// 当路由变化时，同步搜索框的值
watch(() => route.query.q, (newVal) => {
  if (newVal !== undefined) {
    searchInput.value = newVal
  }
}, { immediate: true })

const active = computed(() => route.path)

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const handleSearch = () => {
  if (searchInput.value.trim()) {
    router.push({ name: 'search', query: { q: searchInput.value.trim() } })
  }
}

const handleClear = () => {
  searchInput.value = ''
}
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

    <el-menu class="nav" mode="horizontal" :default-active="active" :ellipsis="false" router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/posts">文章</el-menu-item>
      <el-menu-item index="/category">分类</el-menu-item>
      <el-menu-item index="/tags">标签</el-menu-item>
      <el-menu-item index="/archive">归档</el-menu-item>
      <el-menu-item index="/about">关于</el-menu-item>
    </el-menu>

    <div class="right">
      <el-input
        v-model="searchInput"
        class="search"
        placeholder="搜索文章..."
        size="small"
        clearable
        @keyup.enter="handleSearch"
        @clear="handleClear"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-button type="primary" size="small" class="search-btn" @click="handleSearch">
        <el-icon><Search /></el-icon>
      </el-button>
      <el-button class="theme-btn" circle text @click="toggleTheme" aria-label="Toggle theme">
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

.right {
  min-width: 280px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-sm);
}

.search {
  width: 200px;
}

.search-btn {
  width: 32px;
  padding: 0;
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

@media (max-width: 1100px) {
  .search {
    width: 160px;
  }
}

@media (max-width: 900px) {
  .left {
    min-width: 0;
  }

  .right {
    min-width: 0;
  }

  .search {
    width: 120px;
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

  .search {
    width: 140px;
  }
}
</style>

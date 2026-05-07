<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  showMobileMenu: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['toggleSidebar'])
const route = useRoute()
const active = computed(() => route.path)
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
      <div class="brand">Personal Blog</div>
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
      <el-input class="search" placeholder="搜索（后续接入）" size="small" clearable />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
}

.menu-btn {
  display: none;
}

.brand {
  font-weight: 650;
  letter-spacing: 0.2px;
  color: var(--text-h);
  white-space: nowrap;
}

.nav {
  flex: 1 1 auto;
  justify-content: center;
  background: transparent;
  border-bottom: none;
}

.right {
  min-width: 220px;
  display: flex;
  justify-content: flex-end;
}

.search {
  width: 220px;
}

@media (max-width: 900px) {
  .left {
    min-width: 0;
  }
  .right {
    min-width: 0;
  }
  .search {
    width: 160px;
  }
}

@media (max-width: 768px) {
  .menu-btn {
    display: inline-flex;
  }
  .nav {
    display: none;
  }
}
</style>


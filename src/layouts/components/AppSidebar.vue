<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const size = computed(() => (props.compact ? 40 : 56))
const active = computed(() => route.path)
</script>

<template>
  <div class="sidebar">
    <el-card class="profile" shadow="never">
      <div class="profile-top">
        <el-avatar :size="size" class="avatar">L</el-avatar>
        <div class="meta">
          <div class="name">你的名字</div>
          <div class="desc">前端 / Vue / 工程化</div>
        </div>
      </div>

      <div class="badges">
        <el-tag size="small" effect="light">Vue3</el-tag>
        <el-tag size="small" effect="light" type="success">TypeScript</el-tag>
        <el-tag size="small" effect="light" type="info">Vite</el-tag>
      </div>

      <div class="links">
        <el-link :underline="false" href="https://github.com/" target="_blank">
          <el-icon><Link /></el-icon> GitHub
        </el-link>
        <el-link :underline="false" href="https://x.com/" target="_blank">
          <el-icon><Link /></el-icon> X
        </el-link>
        <el-link :underline="false" href="mailto:you@example.com">
          <el-icon><Message /></el-icon> Email
        </el-link>
      </div>
    </el-card>

    <el-card class="menu" shadow="never">
      <el-menu :default-active="active" class="menu-inner" router>
        <el-menu-item index="/">
          <el-icon><House /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/posts">
          <el-icon><Document /></el-icon>
          <span>文章</span>
        </el-menu-item>
        <el-menu-item index="/category">
          <el-icon><FolderOpened /></el-icon>
          <span>分类</span>
        </el-menu-item>
        <el-menu-item index="/tags">
          <el-icon><PriceTag /></el-icon>
          <span>标签</span>
        </el-menu-item>
        <el-menu-item index="/archive">
          <el-icon><Clock /></el-icon>
          <span>归档</span>
        </el-menu-item>
        <el-menu-item index="/about">
          <el-icon><User /></el-icon>
          <span>关于</span>
        </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.profile-top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.meta {
  min-width: 0;
}

.name {
  font-weight: 650;
  color: var(--text-h);
  line-height: 1.1;
}

.desc {
  margin-top: 6px;
  font-size: 13px;
  color: var(--text);
  opacity: 0.9;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}

.menu-inner {
  border-right: none;
}
</style>


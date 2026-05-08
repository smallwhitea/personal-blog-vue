<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { siteConfig } from "@/config/site";

const props = defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const size = computed(() => (props.compact ? 40 : 56));
const active = computed(() => route.path);
</script>

<template>
  <div class="sidebar">
    <el-card class="profile" shadow="never">
      <div class="profile-top">
        <el-avatar :size="size" :src="siteConfig.profile.avatar" class="avatar">
          {{ siteConfig.profile.name?.slice(0, 1) }}
        </el-avatar>
        <div class="meta">
          <div class="name">{{ siteConfig.profile.name }}</div>
          <div class="desc">{{ siteConfig.profile.tagline }}</div>
        </div>
      </div>

      <div class="badges">
        <el-tag
          v-for="badge in siteConfig.sidebarBadges"
          :key="badge.name"
          size="small"
          effect="light"
          :type="badge.type"
        >
          {{ badge.name }}
        </el-tag>
      </div>

      <div class="links">
        <div class="link-item">🎵 抖音：142586569</div>

        <div class="link-item">🐧 QQ：1727059598</div>

        <div class="link-item">💬 微信：ArC1liu</div>
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
          <span>记录</span>
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
.avatar {
  flex-shrink: 0;
  border: 2px solid #fff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

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
  color: var(--text-primary);
  line-height: 1.1;
}

.desc {
  margin-top: 6px;
  font-size: 13px;
  color: var(--text-secondary);
  opacity: 0.9;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.links {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}

.menu-inner {
  border-right: none;
}

.menu-inner :deep(.el-menu-item) {
  border-radius: 10px;
  margin: 4px 6px;
}

// Dark 下的侧边栏样式
.dark .avatar {
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    0 0 0 1px rgba(76, 201, 255, 0.18),
    0 12px 26px rgba(0, 0, 0, 0.35);
}

.dark .menu-inner :deep(.el-menu-item) {
  color: rgba(229, 234, 243, 0.8);
}

.dark .menu-inner :deep(.el-menu-item:hover) {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(245, 247, 255, 0.92);
  text-shadow: 0 0 18px rgba(168, 85, 247, 0.18);
}

.dark .menu-inner :deep(.el-menu-item.is-active) {
  background: linear-gradient(
    135deg,
    rgba(76, 201, 255, 0.16),
    rgba(255, 79, 216, 0.1)
  );
  box-shadow:
    0 0 0 1px rgba(76, 201, 255, 0.18),
    0 0 26px rgba(76, 201, 255, 0.1);
  color: rgba(245, 247, 255, 0.94);
}
</style>

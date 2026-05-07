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

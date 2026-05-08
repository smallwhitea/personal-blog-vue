<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { articles, types } from "@/mock/articles";
import { siteConfig } from "@/config/site";

const router = useRouter();

// 获取类型信息
const getTypeInfo = (typeValue) => {
  return types.find(t => t.value === typeValue) || types[0]
}

// 最新文章（前4篇，置顶优先）
const recentPosts = computed(() => {
  const sorted = [...articles].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return new Date(b.createTime) - new Date(a.createTime)
  })
  return sorted.slice(0, 4).map((a) => ({
    ...a,
    excerpt: a.summary,
    date: a.createTime,
  }));
});

// 统计标签
const tagMap = computed(() => {
  const map = {};
  articles.forEach((a) => {
    a.tags.forEach((t) => {
      if (!map[t]) map[t] = 0;
      map[t]++;
    });
  });
  return map;
});

const hotTags = computed(() => {
  return Object.entries(tagMap.value)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
});

// 推荐文章（后4篇）
const recommendPosts = computed(() => {
  return articles.slice(-4).map((a) => ({
    id: a.id,
    title: a.title,
    date: a.createTime,
  }));
});

// 跳转方法
const goToArticle = (id) => {
  router.push({ name: "article-detail", params: { id } });
};

const goToPosts = () => {
  router.push({ name: "posts" });
};
</script>

<template>
  <div class="home-page">
    <!-- 1. 欢迎 Banner -->
    <el-card class="banner-card">
      <div class="banner-inner">
        <div class="banner-left">
          <div class="banner-title">{{ siteConfig.hero.title }}</div>
          <div class="banner-sub">
            {{ siteConfig.hero.subtitle }}
          </div>
          <div class="banner-actions">
            <el-button type="primary" @click="goToPosts"> 浏览记录 </el-button>
            <el-button @click="router.push({ name: 'about' })"
              >关于我</el-button
            >
          </div>
        </div>
        <div class="banner-right">
          <el-avatar
            :size="120"
            :src="siteConfig.profile.avatar"
            class="banner-avatar"
          >
            {{ siteConfig.profile.name?.slice(0, 1) }}
          </el-avatar>
        </div>
      </div>
    </el-card>

    <div class="content-row">
      <!-- 主要内容 -->
      <div class="content-left">
        <!-- 2. 最新记录 -->
        <el-card class="section-card">
          <template #header>
            <div class="section-header">
              <div class="section-title">
                <el-icon><Document /></el-icon>
                最新记录
              </div>
              <el-link type="primary" :underline="false" @click="goToPosts">
                查看全部
              </el-link>
            </div>
          </template>

          <div class="post-list">
            <el-card
              v-for="post in recentPosts"
              :key="post.id"
              class="post-item"
              @click="goToArticle(post.id)"
            >
              <div class="post-top">
                <div class="post-title">
                  <span v-if="post.pinned" class="pinned-badge">📌</span>
                  {{ post.title }}
                </div>
                <div class="post-meta">
                  <span class="mood-emoji">{{ post.mood || '😊' }}</span>
                  <el-tag 
                    size="small" 
                    effect="light" 
                    :color="getTypeInfo(post.type).color"
                    style="background-color: rgba(76, 201, 255, 0.1); border: none;"
                  >
                    {{ getTypeInfo(post.type).label }}
                  </el-tag>
                  <el-tag size="small" type="info" effect="light">{{
                    post.date
                  }}</el-tag>
                </div>
              </div>
              <div class="post-excerpt">{{ post.excerpt }}</div>
              <div class="post-tags">
                <el-tag
                  v-for="tag in post.tags"
                  :key="tag"
                  size="small"
                  effect="plain"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </el-card>
          </div>
        </el-card>
      </div>

      <!-- 右侧 -->
      <div class="content-right">
        <!-- 3. 热门标签 -->
        <el-card class="section-card">
          <template #header>
            <div class="section-header">
              <div class="section-title">
                <el-icon><PriceTag /></el-icon>
                热门标签
              </div>
            </div>
          </template>

          <div class="tags-cloud">
            <el-tag
              v-for="tag in hotTags"
              :key="tag.name"
              class="tag-item"
              effect="light"
              :type="
                ['', 'primary', 'success', 'info', 'warning', 'danger'][
                  Math.floor(Math.random() * 6)
                ]
              "
            >
              {{ tag.name }}
              <span class="tag-count">({{ tag.count }})</span>
            </el-tag>
          </div>
        </el-card>

        <!-- 4. 推荐记录 -->
        <el-card class="section-card">
          <template #header>
            <div class="section-header">
              <div class="section-title">
                <el-icon><Star /></el-icon>
                推荐记录
              </div>
            </div>
          </template>

          <div class="recommend-list">
            <div
              v-for="item in recommendPosts"
              :key="item.id"
              class="recommend-item"
              @click="goToArticle(item.id)"
            >
              <div class="recommend-title">{{ item.title }}</div>
              <div class="recommend-date">{{ item.date }}</div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

/* Banner */
.banner-card {
  .banner-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-lg);
  }

  .banner-left {
    flex: 1;
    min-width: 0;
  }

  .banner-title {
    font-size: 32px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
  }

  .banner-sub {
    font-size: 16px;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-base);
  }

  .banner-actions {
    display: flex;
    gap: var(--spacing-sm);
  }

  .banner-right {
    flex-shrink: 0;
  }

  .banner-avatar {
    box-shadow: var(--shadow-hover);
  }
}

// Dark 下的 Banner：霓虹光晕
.dark .banner-card {
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: -1px;
    pointer-events: none;
    border-radius: inherit;
    background:
      radial-gradient(620px circle at 18% 12%, rgba(76, 201, 255, 0.16), transparent 60%),
      radial-gradient(520px circle at 82% 36%, rgba(255, 79, 216, 0.10), transparent 62%),
      radial-gradient(420px circle at 55% 92%, rgba(168, 85, 247, 0.10), transparent 64%);
    opacity: 0.95;
  }

  .banner-inner {
    position: relative;
    z-index: 1;
  }

  .banner-title {
    text-shadow: 0 0 24px rgba(76, 201, 255, 0.16);
  }

  .banner-avatar {
    border: 1px solid rgba(255, 255, 255, 0.16);
  }
}

/* 内容行布局 */
.content-row {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--spacing-base);
  align-items: flex-start;
}

.content-left {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.content-right {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.section-card {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .section-title {
    font-weight: 650;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: 18px;
  }
}

/* 最新文章 */
.post-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.post-item {
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
  }
}

.post-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  flex-wrap: wrap;
}

.post-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
}

.pinned-badge {
  font-size: 16px;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.mood-emoji {
  font-size: 20px;
}

.post-excerpt {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

/* 热门标签 */
.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tag-item {
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-2px);
  }
}

.tag-count {
  opacity: 0.8;
  margin-left: 4px;
}

/* 推荐文章 */
.recommend-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.recommend-item {
  cursor: pointer;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-lighter);
  transition: all var(--transition-base);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    .recommend-title {
      color: var(--primary-color);
    }
  }
}

.recommend-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recommend-date {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 4px;
}

/* 响应式 */
@media (max-width: 900px) {
  .content-row {
    grid-template-columns: 1fr;
  }

  .banner-title {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  .banner-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .banner-right {
    display: none;
  }

  .banner-title {
    font-size: 24px;
  }
}
</style>

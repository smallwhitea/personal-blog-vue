<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Mock 数据
const mockRecentPosts = ref([
  {
    id: '1',
    title: 'Vue3 Composition API 最佳实践',
    excerpt: '深入了解 Vue3 Composition API，构建更加清晰、可复用的逻辑代码。',
    date: '2026-05-06',
    tags: ['Vue3', '前端', '最佳实践'],
    cover: '',
  },
  {
    id: '2',
    title: 'Vite 构建优化指南',
    excerpt: '如何让你的 Vite 项目构建更快？从配置到插件的完整优化方案。',
    date: '2026-05-05',
    tags: ['Vite', '性能优化', '构建'],
    cover: '',
  },
  {
    id: '3',
    title: 'Element Plus 主题定制与开发技巧',
    excerpt: '从 CSS 变量到自定义主题，一步步教你定制属于自己的 Element Plus。',
    date: '2026-05-04',
    tags: ['Element Plus', 'Vue3', 'UI'],
    cover: '',
  },
  {
    id: '4',
    title: '前端工程化体系搭建',
    excerpt: '从项目初始化到 CI/CD，完整梳理一套现代前端工程化方案。',
    date: '2026-05-03',
    tags: ['工程化', 'CI/CD', '前端'],
    cover: '',
  },
])

const mockHotTags = ref([
  { name: 'Vue3', count: 42 },
  { name: 'Vite', count: 28 },
  { name: '前端', count: 35 },
  { name: 'TypeScript', count: 22 },
  { name: 'Element Plus', count: 18 },
  { name: '工程化', count: 15 },
  { name: '性能优化', count: 12 },
  { name: '组件库', count: 10 },
])

const mockRecommendPosts = ref([
  { id: '5', title: 'Pinia 状态管理入门与进阶', date: '2026-04-28' },
  { id: '6', title: 'Vue Router 4 完整入门', date: '2026-04-22' },
  { id: '7', title: '现代 CSS 布局技巧', date: '2026-04-15' },
  { id: '8', title: '响应式设计最佳实践', date: '2026-04-10' },
])

// 跳转方法
const goToArticle = (id) => {
  router.push({ name: 'article-detail', params: { id } })
}

const goToPosts = () => {
  router.push({ name: 'posts' })
}
</script>

<template>
  <div class="home-page">
    <!-- 1. 欢迎 Banner -->
    <el-card class="banner-card" shadow="hover">
      <div class="banner-inner">
        <div class="banner-left">
          <div class="banner-title">欢迎来到我的技术博客</div>
          <div class="banner-sub">
            分享前端技术、工程化实践、Vue3 生态开发经验
          </div>
          <div class="banner-actions">
            <el-button type="primary" size="default" @click="goToPosts">
              浏览文章
            </el-button>
            <el-button size="default">关于我</el-button>
          </div>
        </div>
        <div class="banner-right">
          <el-avatar :size="120" class="banner-avatar">L</el-avatar>
        </div>
      </div>
    </el-card>

    <div class="content-row">
      <!-- 主要内容 -->
      <div class="content-left">
        <!-- 2. 最新文章列表 -->
        <el-card class="section-card" shadow="never">
          <template #header>
            <div class="section-header">
              <div class="section-title">
                <el-icon><Document /></el-icon>
                最新文章
              </div>
              <el-link type="primary" :underline="false" @click="goToPosts">
                查看全部
              </el-link>
            </div>
          </template>

          <div class="post-list">
            <el-card
              v-for="post in mockRecentPosts"
              :key="post.id"
              class="post-item"
              shadow="hover"
              @click="goToArticle(post.id)"
            >
              <div class="post-top">
                <div class="post-title">{{ post.title }}</div>
                <el-tag size="small" type="info" effect="light">{{ post.date }}</el-tag>
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
        <el-card class="section-card" shadow="never">
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
              v-for="tag in mockHotTags"
              :key="tag.name"
              class="tag-item"
              effect="light"
              :type="['','primary','success','info','warning','danger'][Math.floor(Math.random() * 6)]"
            >
              {{ tag.name }}
              <span class="tag-count">({{ tag.count }})</span>
            </el-tag>
          </div>
        </el-card>

        <!-- 4. 推荐文章 -->
        <el-card class="section-card" shadow="never">
          <template #header>
            <div class="section-header">
              <div class="section-title">
                <el-icon><Star /></el-icon>
                推荐文章
              </div>
            </div>
          </template>

          <div class="recommend-list">
            <div
              v-for="item in mockRecommendPosts"
              :key="item.id"
              class="recommend-item"
              @click="goToArticle(item.id)"
            >
              <div class="recommend-title">{{ item.title }}</div>
              <div class="recommend-date">{{ item.date }}</div>
            </div>
          </div>
        </el-card>

        <!-- 5. 右侧个人简介卡片 -->
        <el-card class="section-card profile-card" shadow="never">
          <template #header>
            <div class="section-header">
              <div class="section-title">
                <el-icon><User /></el-icon>
                关于我
              </div>
            </div>
          </template>

          <div class="profile-inner">
            <el-avatar :size="80" class="profile-avatar">L</el-avatar>
            <div class="profile-name">你的名字</div>
            <div class="profile-desc">前端开发工程师，热爱 Vue3 生态，专注工程化与最佳实践。</div>
            <el-divider style="margin: 12px 0;" />
            <div class="profile-links">
              <el-button type="primary" link>
                <el-icon><Link /></el-icon>
                GitHub
              </el-button>
              <el-button type="primary" link>
                <el-icon><Message /></el-icon>
                邮箱
              </el-button>
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
  gap: 16px;
}

/* Banner */
.banner-card {
  border-radius: 12px;
}
.banner-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.banner-left {
  flex: 1 1 auto;
  min-width: 0;
}
.banner-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-h);
  margin-bottom: 8px;
}
.banner-sub {
  font-size: 14px;
  color: var(--text);
  opacity: 0.9;
  margin-bottom: 16px;
}
.banner-actions {
  display: flex;
  gap: 12px;
}
.banner-right {
  flex: 0 0 auto;
}
.banner-avatar {
  box-shadow: var(--shadow);
}

/* 内容行布局 */
.content-row {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 16px;
  align-items: flex-start;
}
.content-left {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.content-right {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 72px;
}

.section-card {
  border-radius: 12px;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.section-title {
  font-weight: 650;
  color: var(--text-h);
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 最新文章 */
.post-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.post-item {
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-2px);
  }
}
.post-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.post-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-h);
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.post-excerpt {
  font-size: 14px;
  color: var(--text);
  opacity: 0.9;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* 热门标签 */
.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.tag-item {
  cursor: pointer;
  transition: transform 0.2s ease;
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
  gap: 10px;
}
.recommend-item {
  cursor: pointer;
  padding: 6px 0;
  border-bottom: 1px solid var(--border);
  &:last-child {
    border-bottom: none;
  }
}
.recommend-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-h);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.recommend-date {
  font-size: 12px;
  color: var(--text);
  opacity: 0.7;
  margin-top: 4px;
}

/* 个人简介卡片 */
.profile-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.profile-avatar {
  margin-bottom: 12px;
  box-shadow: var(--shadow);
}
.profile-name {
  font-weight: 650;
  color: var(--text-h);
  font-size: 16px;
  margin-bottom: 6px;
}
.profile-desc {
  font-size: 13px;
  color: var(--text);
  opacity: 0.9;
}
.profile-links {
  display: flex;
  gap: 12px;
}

/* 移动端适配 */
@media (max-width: 900px) {
  .content-row {
    grid-template-columns: 1fr;
  }
  .content-right {
    position: static;
  }
  .banner-title {
    font-size: 24px;
  }
}
@media (max-width: 600px) {
  .banner-inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .banner-right {
    display: none;
  }
  .banner-title {
    font-size: 22px;
  }
}
</style>

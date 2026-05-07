<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Mock 文章数据
const mockArticleMap = ref({
  '1': {
    id: '1',
    title: 'Vue3 Composition API 最佳实践',
    author: '你的名字',
    date: '2026-05-06',
    category: 'Vue3',
    tags: ['Vue3', '前端', '最佳实践'],
    toc: [
      { id: 'intro', title: '1. 引言', level: 1 },
      { id: 'setup', title: '2. setup 函数', level: 1 },
      { id: 'ref-reactive', title: '3. ref 与 reactive', level: 1 },
      { id: 'computed-watch', title: '4. computed 与 watch', level: 2 },
      { id: 'lifecycle', title: '5. 生命周期钩子', level: 2 },
      { id: 'summary', title: '6. 总结', level: 1 },
    ],
    content: `
# Vue3 Composition API 最佳实践

## 1. 引言

Vue3 Composition API 为我们提供了一种全新的代码组织方式。相比 Options API，它可以更好地复用逻辑代码，同时让相关逻辑更加紧凑。

## 2. setup 函数

setup 是 Composition API 的入口，它在组件实例创建之前执行。

\`\`\`javascript
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  }
}
\`\`\`

## 3. ref 与 reactive

- \`ref\` 用于基本类型数据
- \`reactive\` 用于对象类型数据

## 4. computed 与 watch

### computed
计算属性可以根据依赖自动缓存结果。

### watch
监听器可以监听数据变化并执行副作用。

## 5. 生命周期钩子

Composition API 提供了 onMounted、onUpdated、onUnmounted 等生命周期钩子。

## 6. 总结

Composition API 是 Vue3 带来的最重要改进之一，建议新项目优先使用。
    `,
  },
  '2': {
    id: '2',
    title: 'Vite 构建优化指南',
    author: '你的名字',
    date: '2026-05-05',
    category: '工程化',
    tags: ['Vite', '性能优化', '构建'],
    toc: [
      { id: 'intro', title: '1. 引言', level: 1 },
      { id: 'config', title: '2. 配置优化', level: 1 },
      { id: 'plugins', title: '3. 插件推荐', level: 1 },
    ],
    content: `
# Vite 构建优化指南

## 1. 引言

Vite 是新一代的前端构建工具，利用浏览器原生 ES 模块实现极速的开发体验。

## 2. 配置优化

合理配置 build.rollupOptions、build.chunkSizeWarningLimit 等可以显著优化构建结果。

## 3. 插件推荐

使用合适的 Vite 插件可以大幅提升开发与构建效率。
    `,
  },
  '3': {
    id: '3',
    title: 'Element Plus 主题定制与开发技巧',
    author: '你的名字',
    date: '2026-05-04',
    category: 'UI',
    tags: ['Element Plus', 'Vue3', 'UI'],
    toc: [
      { id: 'intro', title: '1. 引言', level: 1 },
      { id: 'theme', title: '2. 主题定制', level: 1 },
    ],
    content: `
# Element Plus 主题定制与开发技巧

## 1. 引言

Element Plus 提供了完善的主题定制能力，支持 CSS 变量覆盖与 SCSS 变量定制。

## 2. 主题定制

你可以通过在项目中覆盖 Element Plus 的 CSS 变量来实现主题定制。
    `,
  },
})

const mockAllIds = Object.keys(mockArticleMap.value)

// 当前文章
const articleId = computed(() => route.params.id)
const article = computed(() => mockArticleMap.value[articleId.value] || null)

// 上一篇 / 下一篇
const prevArticle = computed(() => {
  const idx = mockAllIds.indexOf(articleId.value)
  if (idx > 0) {
    const prevId = mockAllIds[idx - 1]
    return mockArticleMap.value[prevId]
  }
  return null
})

const nextArticle = computed(() => {
  const idx = mockAllIds.indexOf(articleId.value)
  if (idx !== -1 && idx < mockAllIds.length - 1) {
    const nextId = mockAllIds[idx + 1]
    return mockArticleMap.value[nextId]
  }
  return null
})

// 跳转方法
const goToArticle = (id) => {
  router.push({ name: 'article-detail', params: { id } })
}

const goBackToList = () => {
  router.push({ name: 'posts' })
}
</script>

<template>
  <div class="article-detail-page" v-if="article">
    <!-- 文章主体 -->
    <div class="article-main">
      <!-- 文章头部信息 -->
      <el-card class="header-card" shadow="never">
        <div class="article-header">
          <el-button type="primary" link @click="goBackToList" class="back-btn">
            <el-icon><ArrowLeft /></el-icon>
            返回列表
          </el-button>

          <h1 class="article-title">{{ article.title }}</h1>

          <div class="article-meta">
            <span class="meta-item">
              <el-icon><User /></el-icon>
              {{ article.author }}
            </span>
            <span class="meta-item">
              <el-icon><Calendar /></el-icon>
              {{ article.date }}
            </span>
            <el-tag class="meta-tag" size="small" effect="light" type="info">
              {{ article.category }}
            </el-tag>
            <div class="meta-tags">
              <el-tag v-for="tag in article.tags" :key="tag" size="small" effect="plain">
                {{ tag }}
              </el-tag>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 文章内容 -->
      <el-card class="content-card" shadow="never">
        <div class="article-content">
          <pre>{{ article.content }}</pre>
        </div>

        <!-- 上一篇 / 下一篇 -->
        <el-divider style="margin: 24px 0;" />
        <div class="article-footer-nav">
          <div class="nav-item">
            <span class="nav-label">上一篇</span>
            <el-link
              v-if="prevArticle"
              type="primary"
              :underline="false"
              @click="goToArticle(prevArticle.id)"
            >
              {{ prevArticle.title }}
            </el-link>
            <span v-else class="nav-empty">没有上一篇了</span>
          </div>
          <div class="nav-item nav-right">
            <span class="nav-label">下一篇</span>
            <el-link
              v-if="nextArticle"
              type="primary"
              :underline="false"
              @click="goToArticle(nextArticle.id)"
            >
              {{ nextArticle.title }}
            </el-link>
            <span v-else class="nav-empty">没有下一篇了</span>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 右侧目录 TOC -->
    <div class="article-aside">
      <el-card class="toc-card" shadow="never">
        <template #header>
          <div class="toc-header">
            <el-icon><List /></el-icon>
            目录
          </div>
        </template>
        <div class="toc-list">
          <div
            v-for="item in article.toc"
            :key="item.id"
            class="toc-item"
            :class="{ [`toc-level-${item.level}`]: true }"
          >
            {{ item.title }}
          </div>
        </div>
      </el-card>
    </div>
  </div>

  <el-empty v-else description="文章不存在" />
</template>

<style scoped lang="scss">
.article-detail-page {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 16px;
  align-items: flex-start;
}

.article-main {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header-card,
.content-card,
.toc-card {
  border-radius: 12px;
}

.article-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.back-btn {
  width: fit-content;
  padding: 0;
}

.article-title {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color: var(--text-h);
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.meta-item {
  font-size: 14px;
  color: var(--text);
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.article-content {
  line-height: 1.8;
  font-size: 16px;
  color: var(--text);
  pre {
    white-space: pre-wrap;
    word-break: break-word;
    font-family: var(--mono);
    font-size: 14px;
    background: var(--code-bg);
    padding: 16px;
    border-radius: 8px;
  }
}

.article-footer-nav {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.nav-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 48%;
  min-width: 0;
  &.nav-right {
    align-items: flex-end;
  }
}

.nav-label {
  font-size: 12px;
  color: var(--text);
  opacity: 0.7;
}

.nav-empty {
  font-size: 14px;
  color: var(--text);
  opacity: 0.6;
}

/* 目录 */
.article-aside {
  position: sticky;
  top: 72px;
}

.toc-header {
  font-weight: 650;
  color: var(--text-h);
  display: flex;
  align-items: center;
  gap: 6px;
}

.toc-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toc-item {
  font-size: 14px;
  color: var(--text);
  opacity: 0.9;
  cursor: pointer;
  &.toc-level-2 {
    padding-left: 16px;
    font-size: 13px;
    opacity: 0.8;
  }
  &:hover {
    color: var(--accent);
  }
}

/* 移动端适配 */
@media (max-width: 900px) {
  .article-detail-page {
    grid-template-columns: 1fr;
  }
  .article-aside {
    position: static;
  }
}
@media (max-width: 600px) {
  .article-title {
    font-size: 22px;
  }
  .article-footer-nav {
    flex-direction: column;
    .nav-item {
      max-width: 100%;
      &.nav-right {
        align-items: flex-start;
      }
    }
  }
}
</style>

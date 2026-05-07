<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 复用文章数据
const mockPosts = ref([
  {
    id: '1',
    title: 'Vue3 Composition API 最佳实践',
    excerpt: '深入了解 Vue3 Composition API，构建更加清晰、可复用的逻辑代码。',
    date: '2026-05-06',
    category: 'Vue3',
    tags: ['Vue3', '前端', '最佳实践'],
    views: 1234,
  },
  {
    id: '2',
    title: 'Vite 构建优化指南',
    excerpt: '如何让你的 Vite 项目构建更快？从配置到插件的完整优化方案。',
    date: '2026-05-05',
    category: '工程化',
    tags: ['Vite', '性能优化', '构建'],
    views: 892,
  },
  {
    id: '3',
    title: 'Element Plus 主题定制与开发技巧',
    excerpt: '从 CSS 变量到自定义主题，一步步教你定制属于自己的 Element Plus。',
    date: '2026-05-04',
    category: 'UI',
    tags: ['Element Plus', 'Vue3', 'UI'],
    views: 756,
  },
  {
    id: '4',
    title: '前端工程化体系搭建',
    excerpt: '从项目初始化到 CI/CD，完整梳理一套现代前端工程化方案。',
    date: '2026-05-03',
    category: '工程化',
    tags: ['工程化', 'CI/CD', '前端'],
    views: 1089,
  },
  {
    id: '5',
    title: 'Pinia 状态管理入门与进阶',
    excerpt: '从基础概念到复杂场景，完整掌握 Pinia 状态管理。',
    date: '2026-04-28',
    category: 'Vue3',
    tags: ['Pinia', 'Vue3', '状态管理'],
    views: 987,
  },
  {
    id: '6',
    title: 'Vue Router 4 完整入门',
    excerpt: '路由配置、导航守卫、动态路由，一文带你掌握 Vue Router 4。',
    date: '2026-04-22',
    category: 'Vue3',
    tags: ['Vue Router', 'Vue3', '路由'],
    views: 654,
  },
  {
    id: '7',
    title: '现代 CSS 布局技巧',
    excerpt: 'Flexbox、Grid 以及 Container Query 等现代 CSS 布局技术的应用。',
    date: '2026-04-15',
    category: 'CSS',
    tags: ['CSS', '布局', '响应式'],
    views: 732,
  },
  {
    id: '8',
    title: '响应式设计最佳实践',
    excerpt: '从移动端优先到设计系统，完整的响应式设计方法论。',
    date: '2026-04-10',
    category: '前端',
    tags: ['响应式', '设计', '前端'],
    views: 567,
  },
])

// 统计分类
const categoryMap = computed(() => {
  const map = {}
  mockPosts.value.forEach((post) => {
    const c = post.category
    if (!map[c]) map[c] = []
    map[c].push(post)
  })
  return map
})

const categories = computed(() => {
  return Object.keys(categoryMap.value).map((name) => ({
    name,
    count: categoryMap.value[name].length,
  }))
})

const selectedCategory = ref('')
const filteredPosts = computed(() => {
  if (!selectedCategory.value) return []
  return categoryMap.value[selectedCategory.value] || []
})

// 跳转
const goToArticle = (id) => {
  router.push({ name: 'article-detail', params: { id } })
}
</script>

<template>
  <div class="category-page">
    <!-- 分类导航 -->
    <el-card class="nav-card" shadow="never">
      <template #header>
        <div class="card-header">
          <div class="h">
            <el-icon><FolderOpened /></el-icon>
            分类
          </div>
          <div v-if="selectedCategory" class="clear-btn">
            <el-link type="primary" :underline="false" @click="selectedCategory = ''">
              清除筛选
            </el-link>
          </div>
        </div>
      </template>

      <div class="category-grid">
        <div
          v-for="cat in categories"
          :key="cat.name"
          class="category-item"
          :class="{ active: selectedCategory === cat.name }"
          @click="selectedCategory = cat.name"
        >
          <div class="cat-name">{{ cat.name }}</div>
          <el-tag size="small" effect="light" type="info">
            {{ cat.count }} 篇文章
          </el-tag>
        </div>
      </div>
    </el-card>

    <!-- 文章列表 -->
    <el-card v-if="filteredPosts.length > 0" class="list-card" shadow="never">
      <template #header>
        <div class="card-header">
          <div class="h">
            「{{ selectedCategory }}」分类下的文章
          </div>
        </div>
      </template>

      <div class="post-list">
        <el-card
          v-for="post in filteredPosts"
          :key="post.id"
          class="post-item"
          shadow="hover"
          @click="goToArticle(post.id)"
        >
          <div class="post-top">
            <div class="post-title">{{ post.title }}</div>
            <div class="post-meta">
              <span class="meta-item">
                <el-icon><View /></el-icon>
                {{ post.views }}
              </span>
              <span class="meta-item">
                <el-icon><Calendar /></el-icon>
                {{ post.date }}
              </span>
            </div>
          </div>
          <div class="post-excerpt">{{ post.excerpt }}</div>
          <div class="post-tags">
            <el-tag v-for="tag in post.tags" :key="tag" size="small" effect="plain">
              {{ tag }}
            </el-tag>
          </div>
        </el-card>
      </div>
    </el-card>

    <el-empty v-else-if="selectedCategory" description="该分类下暂无文章" />
    <el-empty v-else description="点击上方分类查看文章" />
  </div>
</template>

<style scoped lang="scss">
.category-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.nav-card,
.list-card {
  border-radius: 12px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.h {
  font-weight: 650;
  color: var(--text-h);
  display: flex;
  align-items: center;
  gap: 6px;
}
.category-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.category-item {
  flex: 0 0 calc(33.333% - 8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }
  &.active {
    border-color: var(--accent);
    background: var(--accent-bg);
  }
}
.cat-name {
  font-weight: 600;
  color: var(--text-h);
}
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
}
.post-excerpt {
  font-size: 14px;
  color: var(--text);
  opacity: 0.9;
  margin-bottom: 10px;
}
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.post-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}
.meta-item {
  font-size: 13px;
  color: var(--text);
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 4px;
}
@media (max-width: 900px) {
  .category-item {
    flex-basis: calc(50% - 6px);
  }
}
@media (max-width: 600px) {
  .category-item {
    flex-basis: 100%;
  }
}
</style>

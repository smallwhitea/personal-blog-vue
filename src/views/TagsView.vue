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

// 统计标签
const tagMap = computed(() => {
  const map = {}
  mockPosts.value.forEach((post) => {
    post.tags.forEach((t) => {
      if (!map[t]) map[t] = []
      map[t].push(post)
    })
  })
  return map
})

const tags = computed(() => {
  return Object.keys(tagMap.value).map((name) => ({
    name,
    count: tagMap.value[name].length,
  }))
})

const selectedTag = ref('')
const filteredPosts = computed(() => {
  if (!selectedTag.value) return []
  return tagMap.value[selectedTag.value] || []
})

// 跳转
const goToArticle = (id) => {
  router.push({ name: 'article-detail', params: { id } })
}
</script>

<template>
  <div class="tags-page">
    <!-- 标签云 -->
    <el-card class="nav-card" shadow="never">
      <template #header>
        <div class="card-header">
          <div class="h">
            <el-icon><PriceTag /></el-icon>
            标签
          </div>
          <div v-if="selectedTag" class="clear-btn">
            <el-link type="primary" :underline="false" @click="selectedTag = ''">
              清除筛选
            </el-link>
          </div>
        </div>
      </template>

      <div class="tags-cloud">
        <el-tag
          v-for="tag in tags"
          :key="tag.name"
          class="tag-item"
          :class="{ active: selectedTag === tag.name }"
          effect="light"
          :type="['primary', 'success', 'info', 'warning', 'danger'][Math.floor(Math.random() * 5)]"
          @click="selectedTag = tag.name"
        >
          {{ tag.name }} ({{ tag.count }})
        </el-tag>
      </div>
    </el-card>

    <!-- 文章列表 -->
    <el-card v-if="filteredPosts.length > 0" class="list-card" shadow="never">
      <template #header>
        <div class="card-header">
          <div class="h">
            「{{ selectedTag }}」标签下的文章
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

    <el-empty v-else-if="selectedTag" description="该标签下暂无文章" />
    <el-empty v-else description="点击上方标签查看文章" />
  </div>
</template>

<style scoped lang="scss">
.tags-page {
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
.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.tag-item {
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-2px);
  }
  &.active {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
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
</style>

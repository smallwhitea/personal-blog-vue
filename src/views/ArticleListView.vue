<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Mock 数据
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

const mockCategories = ref([
  { value: '', label: '全部分类' },
  { value: 'Vue3', label: 'Vue3' },
  { value: '工程化', label: '工程化' },
  { value: 'UI', label: 'UI' },
  { value: 'CSS', label: 'CSS' },
  { value: '前端', label: '前端' },
])

// 筛选条件
const searchKeyword = ref('')
const selectedCategory = ref('')

// 分页
const currentPage = ref(1)
const pageSize = ref(4)

// 过滤后的文章
const filteredPosts = computed(() => {
  let result = [...mockPosts.value]

  // 按分类筛选
  if (selectedCategory.value) {
    result = result.filter((p) => p.category === selectedCategory.value)
  }

  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.trim().toLowerCase()
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(keyword) ||
        p.excerpt.toLowerCase().includes(keyword) ||
        p.tags.some((t) => t.toLowerCase().includes(keyword)),
    )
  }

  return result
})

// 当前页文章
const pagePosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredPosts.value.slice(start, start + pageSize.value)
})

// 总页数
const total = computed(() => filteredPosts.value.length)

// 跳转详情
const goToArticle = (id) => {
  router.push({ name: 'article-detail', params: { id } })
}

// 重置
const handleSearch = () => {
  currentPage.value = 1
}

const handleCategoryChange = () => {
  currentPage.value = 1
}
</script>

<template>
  <div class="article-list-page">
    <!-- 搜索与筛选栏 -->
    <el-card class="filter-card" shadow="never">
      <div class="filter-row">
        <el-input
          v-model="searchKeyword"
          class="search-input"
          placeholder="搜索文章标题/摘要/标签..."
          clearable
          @clear="handleSearch"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>

        <el-select
          v-model="selectedCategory"
          class="category-select"
          placeholder="选择分类"
          clearable
          @change="handleCategoryChange"
        >
          <el-option
            v-for="cat in mockCategories"
            :key="cat.value"
            :label="cat.label"
            :value="cat.value"
          />
        </el-select>

        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
    </el-card>

    <!-- 文章列表 -->
    <el-card class="list-card" shadow="never">
      <template #header>
        <div class="list-header">
          <div class="header-title">
            <el-icon><Document /></el-icon>
            文章列表
          </div>
          <div class="header-count">共 {{ total }} 篇文章</div>
        </div>
      </template>

      <div v-if="pagePosts.length > 0" class="post-list">
        <el-card
          v-for="post in pagePosts"
          :key="post.id"
          class="post-item"
          shadow="hover"
          @click="goToArticle(post.id)"
        >
          <div class="post-top">
            <div class="post-title">{{ post.title }}</div>
            <div class="post-meta">
              <el-tag size="small" type="info" effect="light" class="meta-tag">
                {{ post.category }}
              </el-tag>
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

          <div class="post-bottom">
            <div class="post-tags">
              <el-tag v-for="tag in post.tags" :key="tag" size="small" effect="plain">
                {{ tag }}
              </el-tag>
            </div>
            <el-link type="primary" :underline="false"> 阅读全文 → </el-link>
          </div>
        </el-card>
      </div>

      <el-empty v-else description="暂无符合条件的文章" />

      <!-- 分页 -->
      <div v-if="total > 0" class="pagination-wrap">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[4, 8, 16]"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.article-list-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-card {
  border-radius: 12px;
}
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
.search-input {
  flex: 1 1 240px;
  min-width: 0;
}
.category-select {
  width: 180px;
}

.list-card {
  border-radius: 12px;
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.header-title {
  font-weight: 650;
  color: var(--text-h);
  display: flex;
  align-items: center;
  gap: 6px;
}
.header-count {
  font-size: 13px;
  color: var(--text);
  opacity: 0.9;
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
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.post-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-h);
  flex: 1 1 auto;
  min-width: 0;
}
.post-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.meta-tag {
  cursor: default;
}
.meta-item {
  font-size: 13px;
  color: var(--text);
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 4px;
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
.post-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pagination-wrap {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
    align-items: stretch;
  }
  .category-select {
    width: 100%;
  }
  .post-top {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

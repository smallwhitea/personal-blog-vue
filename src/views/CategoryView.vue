<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { posts, types } from '@/content/posts'

const router = useRouter()

// 统计分类（现在用类型作为分类）
const categoryMap = computed(() => {
  const map = {}
  posts.forEach((a) => {
    const typeInfo = types.find(t => t.value === a.type)
    const c = typeInfo ? typeInfo.label : '其他'
    if (!map[c]) map[c] = []
    map[c].push(a)
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
            {{ cat.count }} 条记录
          </el-tag>
        </div>
      </div>
    </el-card>

    <!-- 文章列表 -->
    <el-card v-if="filteredPosts.length > 0" class="list-card" shadow="never">
      <template #header>
        <div class="card-header">
          <div class="h">
            「{{ selectedCategory }}」分类下的记录
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
                {{ post.createTime }}
              </span>
            </div>
          </div>
          <div class="post-excerpt">{{ post.summary }}</div>
          <div class="post-tags">
            <el-tag v-for="tag in post.tags" :key="tag" size="small" effect="plain">
              {{ tag }}
            </el-tag>
          </div>
        </el-card>
      </div>
    </el-card>

    <el-empty v-else-if="selectedCategory" description="该分类下暂无记录" />
    <el-empty v-else description="点击上方分类查看记录" />
  </div>
</template>

<style scoped lang="scss">
// 流光边框动画
@keyframes neon-flow-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.category-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.nav-card,
.list-card {
  border-radius: var(--border-radius-lg);
}

// Dark 下的分类项：先去掉所有装饰确保内容可见
:global(.dark) .category-item {
  > * {
    position: relative;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-sm);
}

.h {
  font-weight: 650;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.category-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-base);
}

.category-item {
  flex: 0 0 calc(33.333% - 16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-base);
  border: 1px solid var(--border-lighter);
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
  }

  &.active {
    border-color: var(--primary-color);
    background: var(--primary-light);
  }
}

.cat-name {
  font-weight: 600;
  color: var(--text-primary);
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.post-item {
  cursor: pointer;
  transition: transform var(--transition-base);

  &:hover {
    transform: translateY(-2px);
  }
}

.post-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.post-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.post-excerpt {
  font-size: 14px;
  color: var(--text-secondary);
  opacity: 0.9;
  margin-bottom: var(--spacing-sm);
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.post-meta {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.meta-item {
  font-size: 13px;
  color: var(--text-secondary);
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 4px;
}

@media (max-width: 900px) {
  .category-item {
    flex-basis: calc(50% - 8px);
  }
}

@media (max-width: 600px) {
  .category-item {
    flex-basis: 100%;
  }
}
</style>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { posts, types } from '@/content/posts'

const route = useRoute()
const router = useRouter()
const searchKeyword = ref('')

// 获取分类标签
const getCategoryLabel = (type) => {
  const typeInfo = types.find(t => t.value === type)
  return typeInfo ? typeInfo.label : '其他'
}

// 从路由参数中获取搜索关键词
const getSearchKeywordFromRoute = () => {
  return route.query.q || ''
}

// 监听路由参数变化
watch(() => route.query.q, (newVal) => {
  if (newVal !== undefined) {
    searchKeyword.value = newVal
  }
}, { immediate: true })

// 搜索结果
const searchResults = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase()
  if (!keyword) {
    return []
  }

  return posts.filter((article) => {
    const titleMatch = article.title.toLowerCase().includes(keyword)
    const summaryMatch = article.summary.toLowerCase().includes(keyword)
    const tagMatch = article.tags.some((tag) => tag.toLowerCase().includes(keyword))
    return titleMatch || summaryMatch || tagMatch
  })
})

// 进入文章详情
const goToArticleDetail = (id) => {
  router.push({ name: 'article-detail', params: { id } })
}

// 高亮搜索关键词
const highlightText = (text, keyword) => {
  if (!keyword) return text
  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<mark class="highlight">$1</mark>')
}
</script>

<template>
  <div class="search-page">
    <el-card class="search-header-card" shadow="never">
      <div class="search-header">
        <div class="search-title">
          <el-icon><Search /></el-icon>
          搜索：{{ searchKeyword }}
        </div>
        <div class="search-count" v-if="searchKeyword">
          找到 {{ searchResults.length }} 篇文章
        </div>
      </div>
    </el-card>

    <div v-if="searchKeyword">
      <el-empty v-if="searchResults.length === 0" description="未找到相关文章，请尝试其他关键词" />
      
      <div v-else class="search-results">
        <el-card
          v-for="article in searchResults"
          :key="article.id"
          class="search-result-item"
          shadow="hover"
          @click="goToArticleDetail(article.id)"
        >
          <div class="result-header">
            <div class="result-title" v-html="highlightText(article.title, searchKeyword)"></div>
            <div class="result-meta">
              <el-tag size="small" effect="plain">{{ getCategoryLabel(article.type) }}</el-tag>
              <span class="meta-item">
                <el-icon><View /></el-icon>
                {{ article.views }}
              </span>
              <span class="meta-item">
                <el-icon><Calendar /></el-icon>
                {{ article.createTime }}
              </span>
            </div>
          </div>
          <div class="result-summary" v-html="highlightText(article.summary, searchKeyword)"></div>
          <div class="result-tags">
            <el-tag
              v-for="tag in article.tags"
              :key="tag"
              size="small"
              effect="light"
            >
              {{ tag }}
            </el-tag>
          </div>
        </el-card>
      </div>
    </div>

    <el-empty v-else description="请在上方输入关键词进行搜索" />
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

.search-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

// Dark 下的卡片流光由全局样式统一处理

.search-header-card {
  .search-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-sm);
  }

  .search-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .search-count {
    font-size: 14px;
    color: var(--text-secondary);
  }
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.search-result-item {
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-2px);
  }

  .result-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
  }

  .result-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .result-meta {
    display: flex;
    gap: var(--spacing-sm);
    align-items: center;
    flex-wrap: wrap;
  }

  .meta-item {
    font-size: 13px;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .result-summary {
    font-size: 14px;
    color: var(--text-regular);
    line-height: 1.6;
    margin-bottom: var(--spacing-sm);
  }

  .result-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }
}

// 高亮样式
:deep(.highlight) {
  background-color: var(--warning-light);
  color: var(--warning-color);
  padding: 1px 4px;
  border-radius: 4px;
  font-weight: 500;
}
</style>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { posts, types } from '@/content/posts'

const router = useRouter()

// 获取类型信息
const getTypeInfo = (typeValue) => {
  return types.find(t => t.value === typeValue) || types[0]
}

// 筛选条件
const searchKeyword = ref('')
const selectedType = ref('')

// 分页
const currentPage = ref(1)
const pageSize = ref(4)

// 过滤后的文章
const filteredPosts = computed(() => {
  let result = [...posts]

  // 按类型筛选
  if (selectedType.value) {
    result = result.filter((a) => a.type === selectedType.value)
  }

  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.trim().toLowerCase()
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(keyword) ||
        a.summary.toLowerCase().includes(keyword) ||
        a.tags.some((t) => t.toLowerCase().includes(keyword))
    )
  }

  // 置顶优先，然后按时间排序
  result.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return new Date(b.createTime) - new Date(a.createTime)
  })

  return result
})

// 当前页文章
const pagePosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredPosts.value.slice(start, start + pageSize.value)
})

// 总页数
const total = computed(() => filteredPosts.value.length)

// 根据类型获取分类标签
const getCategoryLabel = (type) => {
  const typeInfo = types.find(t => t.value === type)
  return typeInfo ? typeInfo.label : '其他'
}

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

const handleTypeChange = () => {
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
          placeholder="搜索记录标题/摘要/标签..."
          clearable
          @clear="handleSearch"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>

        <el-select
          v-model="selectedType"
          class="type-select"
          placeholder="选择类型"
          clearable
          @change="handleTypeChange"
        >
          <el-option
            v-for="t in types"
            :key="t.value"
            :label="t.label"
            :value="t.value"
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
            记录列表
          </div>
          <div class="header-count">共 {{ total }} 条记录</div>
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

      <el-empty v-else description="暂无符合条件的记录" />

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
  flex: 1 1 auto;
  min-width: 240px;
}
.type-select,
.category-select {
  width: 150px;
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
  display: flex;
  align-items: center;
  gap: 6px;
}
.pinned-badge {
  font-size: 16px;
}
.mood-emoji {
  font-size: 20px;
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

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { articles } from '@/mock/articles'

const router = useRouter()

// 按年份和月份分组
const groupedPosts = computed(() => {
  const map = {}
  articles.forEach((a) => {
    const [year, month] = a.createTime.split('-')
    const key = `${year}-${month}`
    if (!map[key]) {
      map[key] = {
        year,
        month,
        posts: [],
      }
    }
    map[key].posts.push(a)
  })
  return Object.values(map).sort((a, b) => {
    const aKey = `${a.year}-${a.month}`
    const bKey = `${b.year}-${b.month}`
    return bKey.localeCompare(aKey)
  })
})

// 跳转
const goToArticle = (id) => {
  router.push({ name: 'article-detail', params: { id } })
}
</script>

<template>
  <div class="archive-page">
    <el-card class="archive-card" shadow="never">
      <template #header>
        <div class="card-header">
          <div class="h">
            <el-icon><Clock /></el-icon>
            归档
          </div>
          <div class="count">
            共 {{ articles.length }} 篇文章
          </div>
        </div>
      </template>

      <div class="archive-content">
        <div v-for="group in groupedPosts" :key="`${group.year}-${group.month}`" class="year-group">
          <div class="group-title">
            <span class="year">{{ group.year }}年</span>
            <span class="month">{{ parseInt(group.month, 10) }}月</span>
            <el-tag size="small" effect="light" type="info">
              {{ group.posts.length }} 篇
            </el-tag>
          </div>

          <el-timeline class="timeline">
            <el-timeline-item
              v-for="post in group.posts"
              :key="post.id"
              :timestamp="post.createTime"
              placement="top"
            >
              <div class="post-item" @click="goToArticle(post.id)">
                <div class="post-title">{{ post.title }}</div>
                <div class="post-meta">
                  <el-tag size="small" effect="plain">
                    {{ post.category }}
                  </el-tag>
                  <span class="meta-views">
                    <el-icon><View /></el-icon>
                    {{ post.views }}
                  </span>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.archive-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.archive-card {
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
.count {
  font-size: 13px;
  color: var(--text);
  opacity: 0.9;
}
.archive-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.year-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.group-title {
  display: flex;
  align-items: center;
  gap: 10px;
}
.year {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-h);
}
.month {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  opacity: 0.9;
}
.timeline {
  padding-left: 12px;
}
.post-item {
  cursor: pointer;
  padding: 6px 0;
  transition: all 0.2s ease;
  &:hover {
    .post-title {
      color: var(--accent);
    }
  }
}
.post-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-h);
  margin-bottom: 6px;
}
.post-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}
.meta-views {
  font-size: 13px;
  color: var(--text);
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>

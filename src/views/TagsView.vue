<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { posts } from '@/content/posts'

const router = useRouter()

// 统计标签
const tagMap = computed(() => {
  const map = {}
  posts.forEach((a) => {
    a.tags.forEach((t) => {
      if (!map[t]) map[t] = []
      map[t].push(a)
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
          :type="['primary','success','info','warning','danger'][Math.floor(Math.random() * 5)]"
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
            「{{ selectedTag }}」标签下的记录
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

    <el-empty v-else-if="selectedTag" description="该标签下暂无记录" />
    <el-empty v-else description="点击上方标签查看记录" />
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

.tags-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.nav-card,
.list-card {
  border-radius: var(--border-radius-lg);
}

// Dark 下的流光效果 (临时注释掉，确保先能看到内容)
// :global(.dark) .nav-card,
// :global(.dark) .list-card,
// :global(.dark) .post-item {
//   position: relative;
//   overflow: hidden;

//   &::before {
//     content: "";
//     position: absolute;
//     inset: 0;
//     z-index: 2;
//     border-radius: inherit;
//     padding: 2px;
//     background: conic-gradient(
//       from 0deg,
//       transparent 0deg,
//       rgba(76, 201, 255, 0.3) 45deg,
//       rgba(168, 85, 247, 0.2) 120deg,
//       rgba(255, 79, 216, 0.15) 190deg,
//       transparent 240deg,
//       transparent 300deg,
//       rgba(34, 247, 210, 0.18) 340deg,
//       rgba(76, 201, 255, 0.25) 360deg
//     );
//     -webkit-mask:
//       linear-gradient(#000 0 0) content-box,
//       linear-gradient(#000 0 0);
//     -webkit-mask-composite: xor;
//     mask-composite: exclude;
//     opacity: 0.75;
//     animation: neon-flow-slow 25s linear infinite;
//     pointer-events: none;
//   }

//   &::after {
//     content: "";
//     position: absolute;
//     inset: 0;
//     z-index: 1;
//     pointer-events: none;
//     border-radius: inherit;
//     background:
//       radial-gradient(
//         620px circle at 18% 12%,
//         rgba(76, 201, 255, 0.14),
//         transparent 60%
//       ),
//       radial-gradient(
//         520px circle at 82% 36%,
//         rgba(255, 79, 216, 0.09),
//         transparent 62%
//       ),
//       radial-gradient(
//         420px circle at 55% 92%,
//         rgba(168, 85, 247, 0.09),
//         transparent 64%
//       );
//     opacity: 0.9;
//   }

//   :deep(.el-card__header),
//   :deep(.el-card__body) {
//     position: relative;
//     z-index: 3;
//   }
// }

// @media (prefers-reduced-motion: reduce) {
//   :global(.dark) .nav-card::before,
//   :global(.dark) .list-card::before,
//   :global(.dark) .post-item::before {
//     animation: none !important;
//     opacity: 0.5;
//   }
//   :global(.dark) .nav-card::after,
//   :global(.dark) .list-card::after,
//   :global(.dark) .post-item::after {
//     opacity: 0.6;
//   }
// }

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

  &.active {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
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
</style>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { posts, types } from "@/content/posts";
import MarkdownRenderer from "@/components/MarkdownRenderer.vue";

const route = useRoute();
const router = useRouter();

// 获取类型信息
const getTypeInfo = (typeValue) => {
  return types.find((t) => t.value === typeValue) || types[0];
};

// 当前文章
const articleId = computed(() => route.params.id);
const article = computed(
  () => posts.find((a) => a.id === articleId.value) || null,
);

// 所有文章 id 列表
const allIds = computed(() => posts.map((a) => a.id));

// 上一篇 / 下一篇
const prevArticle = computed(() => {
  const idx = allIds.value.indexOf(articleId.value);
  if (idx > 0) {
    const prevId = allIds.value[idx - 1];
    return posts.find((a) => a.id === prevId);
  }
  return null;
});

const nextArticle = computed(() => {
  const idx = allIds.value.indexOf(articleId.value);
  if (idx !== -1 && idx < allIds.value.length - 1) {
    const nextId = allIds.value[idx + 1];
    return posts.find((a) => a.id === nextId);
  }
  return null;
});

// 获取作者信息（兼容）
const getAuthor = () => {
  return "ArCl";
};

// 获取分类信息（兼容）
const getCategory = (type) => {
  const typeInfo = types.find((t) => t.value === type);
  return typeInfo ? typeInfo.label : "其他";
};

// 跳转方法
const goToArticle = (id) => {
  router.push({ name: "article-detail", params: { id } });
};

const goBackToList = () => {
  router.push({ name: "posts" });
};
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

          <h1 class="article-title">
            <span v-if="article.pinned" class="pinned-badge">📌</span>
            {{ article.title }}
          </h1>

          <div class="article-meta">
            <span class="mood-emoji">{{ article.mood || "😊" }}</span>
            <el-tag
              size="small"
              effect="light"
              :color="getTypeInfo(article.type).color"
              style="background-color: rgba(76, 201, 255, 0.1); border: none"
            >
              {{ getTypeInfo(article.type).label }}
            </el-tag>
            <span class="meta-item">
              <el-icon><User /></el-icon>
              {{ getAuthor() }}
            </span>
            <span class="meta-item">
              <el-icon><Calendar /></el-icon>
              {{ article.createTime }}
            </span>
            <el-tag class="meta-tag" size="small" effect="light" type="info">
              {{ getCategory(article.type) }}
            </el-tag>
            <div class="meta-tags">
              <el-tag
                v-for="tag in article.tags"
                :key="tag"
                size="small"
                effect="plain"
              >
                {{ tag }}
              </el-tag>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 文章内容 -->
      <el-card class="content-card" shadow="never">
        <div class="article-content">
          <MarkdownRenderer :content="article.content" />
        </div>

        <!-- 上一篇 / 下一篇 -->
        <el-divider style="margin: 24px 0" />
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

    <!-- 右侧目录（简单版） -->
    <div class="article-aside">
      <el-card class="toc-card" shadow="never">
        <template #header>
          <div class="toc-header">
            <el-icon><List /></el-icon>
            相关信息
          </div>
        </template>
        <div class="toc-list">
          <div class="toc-item">
            <span class="toc-label">浏览量</span>
            <span class="toc-value">{{ article.views }}</span>
          </div>
          <div class="toc-item">
            <span class="toc-label">分类</span>
            <span class="toc-value">{{ getCategory(article.type) }}</span>
          </div>
          <div class="toc-item">
            <span class="toc-label">发布时间</span>
            <span class="toc-value">{{ article.createTime }}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>

  <el-empty v-else description="文章不存在" />
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

.article-detail-page {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 16px;
  align-items: flex-start;
}

// Dark 下的卡片流光由全局样式统一处理

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
  padding: 6px 10px; // 关键：给文字/边框呼吸空间
  padding-left: 3px;
  border-radius: 8px; // 更符合你当前卡片圆角风格
  line-height: 1; // 避免高度被行高撑得怪
}

.article-title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-h);
  display: flex;
  align-items: center;
  gap: 8px;
}

.pinned-badge {
  font-size: 24px;
}

.mood-emoji {
  font-size: 24px;
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
  // MarkdownRenderer 组件会处理所有样式
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

/* 右侧 */
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
  gap: 12px;
}

.toc-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
  color: var(--text);
  opacity: 0.9;
}

.toc-label {
  opacity: 0.8;
}

.toc-value {
  font-weight: 500;
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

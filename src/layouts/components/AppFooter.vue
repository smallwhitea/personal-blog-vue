<script setup>
import { siteConfig } from '@/config/site'

const year = new Date().getFullYear()
</script>

<template>
  <div class="footer">
    <div class="left">© {{ year }} {{ siteConfig.profile.name }}</div>
    <div class="right">
      <el-link :underline="false" href="https://vite.dev" target="_blank">Vite</el-link>
      <span class="dot">·</span>
      <el-link :underline="false" href="https://vuejs.org" target="_blank">Vue</el-link>
      <span class="dot">·</span>
      <el-link :underline="false" href="https://element-plus.org" target="_blank">
        Element Plus
      </el-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  font-size: 14px;
  color: var(--text-secondary);
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 0 var(--spacing-base);
  box-sizing: border-box;
}

.right {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.dot {
  opacity: 0.6;
}

@media (max-width: 768px) {
  .footer {
    font-size: 13px;
  }
}
</style>

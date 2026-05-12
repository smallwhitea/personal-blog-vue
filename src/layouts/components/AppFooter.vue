<script setup>
import { siteConfig } from '@/config/site'

const year = new Date().getFullYear()
</script>

<template>
  <div class="footer">
    <div class="center">© {{ year }} {{ siteConfig.profile.name }}</div>
  </div>
</template>

<style scoped lang="scss">
.footer {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-size: 14px;
  color: var(--text-secondary);
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 0 var(--spacing-base);
  box-sizing: border-box;
}

.center {
  text-align: center;
}

// Dark 下的 Footer 样式
.dark .footer {
  color: rgba(203, 210, 224, 0.62);
}

@media (max-width: 768px) {
  .footer {
    font-size: 13px;
  }
}
</style>

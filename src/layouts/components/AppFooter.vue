<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <div class="footer">
    <div class="left">© {{ year }} Your Name</div>
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
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
  color: var(--text);
  opacity: 0.9;
}

.right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  opacity: 0.6;
}
</style>


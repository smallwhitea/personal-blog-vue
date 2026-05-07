<script setup>
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <div class="h">归档</div>
      </div>
    </template>

    <el-empty description="归档页（后续接入数据）" />
  </el-card>
</template>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.h {
  font-weight: 650;
  color: var(--text-h);
}
</style>

<template>
  <div class="welcome-container">
    <p>{{ $t("content") }}</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.welcome-container {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  height: 50vh; /* 使容器的高度占满整个视口 */
}

p {
  font-size: 50px;
  text-align: center; /* 确保文本内容水平居中对齐 */
}
</style>

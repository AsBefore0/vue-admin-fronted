<template>
  <div class="welcome-text-container">
    <p class="welcome-text line1">Welcome to the</p>
    <p class="welcome-text line2">Management System</p>
  </div>
</template>

<style scoped>
/* 引入 Google Fonts 中的 Lobster 字体 */
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

.welcome-text-container {
  margin-top: 25vh; /* 调整文字在页面中的垂直位置 */
}

.welcome-text {
  font-size: 72px; /* 增大文字大小 */
  font-family: 'Lobster', cursive; /* 应用 Lobster 字体 */
  font-weight: bold;
  letter-spacing: 10px; /* 增加字母间距，使效果更舒展 */
  line-height: 1.2; /* 设置行间距 */
  margin: 40px 100px; /* 移除上下默认的段落间距 */
}

/* 第一行文字靠左对齐，颜色变化较快 */
.line1 {
  text-align: left;
  color: #ff0066;
  animation: color-change-1 4s ease infinite, text-glow-1 2s ease infinite alternate;
}

/* 第二行文字靠右对齐，颜色变化较慢 */
.line2 {
  text-align: right;
  color: #0099ff;
  animation: color-change-2 6s ease infinite, text-glow-2 3s ease infinite alternate;
}

/* 第一行的颜色变化动画 */
@keyframes color-change-1 {
  0% {
    color: #ff0066;
  }
  25% {
    color: #ffcc00;
  }
  50% {
    color: #33cc33;
  }
  75% {
    color: #0099ff;
  }
  100% {
    color: #ff0066;
  }
}

/* 第二行的颜色变化动画 */
@keyframes color-change-2 {
  0% {
    color: #0099ff;
  }
  25% {
    color: #9933ff;
  }
  50% {
    color: #ff0066;
  }
  75% {
    color: #ffcc00;
  }
  100% {
    color: #0099ff;
  }
}

/* 第一行的发光效果 */
@keyframes text-glow-1 {
  from {
    text-shadow: 1px 1px 2px rgba(255, 0, 102, 0.3),
                 0 0 2px rgba(255, 204, 0, 0.3),
                 0 0 4px rgba(51, 204, 51, 0.2);
  }
  to {
    text-shadow: 1px 1px 4px rgba(255, 204, 0, 0.5),
                 0 0 6px rgba(33, 204, 51, 0.4),
                 0 0 8px rgba(255, 0, 102, 0.3);
  }
}

/* 第二行的发光效果 */
@keyframes text-glow-2 {
  from {
    text-shadow: 1px 1px 2px rgba(0, 153, 255, 0.3),
                 0 0 2px rgba(153, 51, 255, 0.3),
                 0 0 4px rgba(255, 0, 102, 0.2);
  }
  to {
    text-shadow: 1px 1px 4px rgba(153, 51, 255, 0.5),
                 0 0 6px rgba(0, 153, 255, 0.4),
                 0 0 8px rgba(255, 0, 102, 0.3);
  }
}
</style>

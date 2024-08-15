<template>
  <div class="common-layout">
    <el-container>
      <Menu />
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <Show />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import Menu from '@/components/home/Menu.vue'
import Header from '@/components/home/Header.vue'
import Show from '@/views/Show.vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.push('/dashboard')
})
</script>
<style scoped>
.el-header, .el-main{
  padding: 0;
}
.el-main{
  margin-left: 20px;
}
</style>
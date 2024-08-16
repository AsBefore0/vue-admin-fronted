<template>
<div>
    <LoginForm v-if="isLoginForm" @toggleForm="toggleForm" />
    <RegisterForm v-else @toggleForm="toggleForm" />
  </div>
</template>
  
<script setup>
import { ref , onMounted} from 'vue'
import LoginForm from '../components/login/LoginForm.vue'
import RegisterForm from '../components/login/RegisterForm.vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const isLoginForm = ref(true)
const userStore = useUserStore()
const router = useRouter()
const toggleForm = () => {
  isLoginForm.value = !isLoginForm.value
}

onMounted(() => {
    userStore.logout()
})
</script>

<style>

</style>
  
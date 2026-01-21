<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { PhNotePencil, PhEye, PhEyeSlash } from '@phosphor-icons/vue'

const router = useRouter()
const showPassword = ref(false)

const handleLogin = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-primary flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Animated Shapes -->
    <div class="absolute top-[10%] left-[10%] w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
    <div class="absolute bottom-[20%] right-[10%] w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" style="animation-delay: -2s"></div>
    
    <div class="bg-white/90 backdrop-blur-xl w-full max-w-sm rounded-[2rem] p-8 shadow-2xl animate-fade-in-up">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-purple rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg mb-4">
          <PhNotePencil :size="32" weight="fill" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900">欢迎回来</h1>
        <p class="text-sm text-gray-500">登录您的 NexSign Pro 账户</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">账号</label>
          <input type="text" placeholder="手机号 / 邮箱" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" placeholder="请输入密码" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all">
            <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors">
              <PhEye v-if="!showPassword" :size="20" weight="bold" />
              <PhEyeSlash v-else :size="20" weight="bold" />
            </button>
          </div>
        </div>

        <button class="w-full bg-gradient-purple text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200 mt-2">
          登录
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-sm text-gray-400">还没有账号？ <span class="text-primary-600 font-medium cursor-pointer">立即注册</span></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>

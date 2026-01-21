<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { PhNotePencil, PhEye, PhEyeSlash, PhSparkle } from '@phosphor-icons/vue'

const router = useRouter()
const showPassword = ref(false)
const isLoading = ref(false)

const handleLogin = () => {
  isLoading.value = true
  setTimeout(() => {
    router.push('/')
  }, 800)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Animated gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-warning-400"></div>
    
    <!-- Mesh gradient overlay -->
    <div class="absolute inset-0 opacity-60" 
         style="background: radial-gradient(at 20% 30%, rgba(255,255,255,0.3) 0px, transparent 50%), 
                radial-gradient(at 80% 70%, rgba(255,237,213,0.4) 0px, transparent 50%);"></div>
    
    <!-- Animated Shapes -->
    <div class="absolute top-[10%] left-[10%] w-24 h-24 bg-white/15 rounded-3xl blur-xl animate-float rotate-12"></div>
    <div class="absolute bottom-[15%] right-[8%] w-36 h-36 bg-white/10 rounded-full blur-xl animate-float-slow"></div>
    <div class="absolute top-[50%] right-[20%] w-16 h-16 bg-warning-300/20 rounded-2xl blur-lg animate-float" style="animation-delay: -3s"></div>
    <div class="absolute bottom-[30%] left-[15%] w-20 h-20 bg-white/10 rounded-full blur-lg animate-float-slow" style="animation-delay: -2s"></div>
    
    <!-- Pattern dots -->
    <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
    
    <!-- Login Card -->
    <div class="relative bg-white/95 backdrop-blur-2xl w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-scale-in border border-white/50">
      <!-- Glow effect behind card -->
      <div class="absolute -inset-1 bg-gradient-to-br from-white/50 to-primary-200/30 rounded-[2.75rem] blur-xl -z-10"></div>
      
      <div class="text-center mb-8">
        <!-- Logo container -->
        <div class="relative w-20 h-20 mx-auto mb-5">
          <div class="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl blur-lg opacity-40 animate-pulse"></div>
          <div class="relative w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary-500/30 transform hover:scale-105 transition-transform">
            <PhNotePencil :size="36" weight="fill" />
          </div>
        </div>
        
        <h1 class="text-2xl font-bold text-gray-900 font-display">欢迎回来</h1>
        <p class="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1">
          登录您的 
          <span class="text-gradient-warm font-semibold inline-flex items-center gap-0.5">
            <PhSparkle :size="12" weight="fill" />
            橘猫签
          </span> 
          账户
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div class="space-y-1.5">
          <label class="block text-sm font-semibold text-gray-700">账号</label>
          <input type="text" placeholder="手机号 / 邮箱" 
                 class="w-full bg-gray-50/80 border border-gray-200/80 rounded-xl px-4 py-3.5 text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-300 focus:bg-white placeholder:text-gray-400">
        </div>
        
        <div class="space-y-1.5">
          <label class="block text-sm font-semibold text-gray-700">密码</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" placeholder="请输入密码" 
                   class="w-full bg-gray-50/80 border border-gray-200/80 rounded-xl px-4 py-3.5 text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-300 focus:bg-white placeholder:text-gray-400">
            <button type="button" @click="showPassword = !showPassword" 
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors p-1">
              <PhEye v-if="!showPassword" :size="20" weight="bold" />
              <PhEyeSlash v-else :size="20" weight="bold" />
            </button>
          </div>
        </div>

        <button 
          class="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 mt-3 flex items-center justify-center gap-2"
          :class="isLoading ? 'opacity-80 pointer-events-none' : ''"
        >
          <svg v-if="isLoading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ isLoading ? '登录中...' : '登录' }}</span>
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-sm text-gray-400">
          还没有账号？ 
          <span class="text-primary-600 font-semibold cursor-pointer hover:text-primary-700 transition-colors">立即注册</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-slow {
  animation: float 8s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(12deg); }
  50% { transform: translateY(-20px) rotate(12deg); }
}

.animate-scale-in {
  animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>

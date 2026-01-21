<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['finish'])
const isExiting = ref(false)
const showLogo = ref(false)
const showText = ref(false)

onMounted(() => {
  // Stagger animations
  setTimeout(() => showLogo.value = true, 300)
  setTimeout(() => showText.value = true, 800)
  
  setTimeout(() => {
    isExiting.value = true
    setTimeout(() => {
      emit('finish')
    }, 800)
  }, 2500)
})
</script>

<template>
  <div class="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 bg-white" 
       :class="isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'">
    
    <!-- Animated Background Blobs -->
    <div class="absolute inset-0 overflow-hidden opacity-30">
        <div class="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-float-slow"></div>
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-yellow-200 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-float-medium"></div>
    </div>

    <!-- Logo -->
    <div 
      class="relative z-10 transition-all duration-700 ease-out flex flex-col items-center"
      :class="showLogo ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
    >
      <div class="w-32 h-32 mb-6 relative">
          <!-- Glow effect -->
          <div class="absolute inset-0 bg-orange-400 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
          <img src="/logo.png" alt="Logo" class="w-full h-full object-contain relative z-10 drop-shadow-xl rounded-3xl" />
      </div>
    </div>
    
    <!-- Text -->
    <div 
      class="relative z-10 text-center transition-all duration-700 ease-out"
      :class="showText ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
    >
      <h1 class="text-4xl font-bold mb-2 tracking-wide flex items-center gap-2 justify-center">
        <span class="text-orange-500">橘猫</span>
        <span class="text-gray-900">签</span>
      </h1>
      <p class="text-gray-400 text-sm tracking-widest uppercase mb-8">快乐签署 · 轻松管理</p>
      
      <!-- Fun loading dots -->
      <div class="flex justify-center gap-2">
        <span class="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce-dot"></span>
        <span class="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce-dot" style="animation-delay: 0.15s"></span>
        <span class="w-2.5 h-2.5 bg-orange-300 rounded-full animate-bounce-dot" style="animation-delay: 0.3s"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Floating shapes */
.animate-float-slow {
  animation: float 8s ease-in-out infinite;
}
.animate-float-medium {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(50%, -50%) scale(1); }
  50% { transform: translate(55%, -45%) scale(1.1); }
}

/* Loading dots */
.animate-bounce-dot {
  animation: bounceDot 0.6s ease-in-out infinite alternate;
}

@keyframes bounceDot {
  from { transform: translateY(0); }
  to { transform: translateY(-6px); }
}
</style>

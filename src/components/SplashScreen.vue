<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['finish'])
const isExiting = ref(false)
const showLogo = ref(false)
const showText = ref(false)
const showLoading = ref(false)

onMounted(() => {
  // Stagger animations
  setTimeout(() => showLogo.value = true, 300)
  setTimeout(() => showText.value = true, 800)
  setTimeout(() => showLoading.value = true, 1200)
  
  setTimeout(() => {
    isExiting.value = true
    setTimeout(() => {
      emit('finish')
    }, 800)
  }, 2800)
})
</script>

<template>
  <div class="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-700" 
       :class="isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'">
    
    <!-- Gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-warning-50"></div>
    
    <!-- Animated mesh gradient -->
    <div class="absolute inset-0 opacity-60"
         style="background: radial-gradient(at 30% 20%, rgba(249,115,22,0.15) 0px, transparent 50%), 
                radial-gradient(at 70% 80%, rgba(251,191,36,0.12) 0px, transparent 50%);"></div>
    
    <!-- Animated Background Blobs -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 animate-blob opacity-40"></div>
      <div class="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-warning-200 to-warning-300 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 animate-blob opacity-40" style="animation-delay: 2s;"></div>
      <div class="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-br from-primary-100 to-warning-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-blob opacity-30" style="animation-delay: 4s;"></div>
    </div>

    <!-- Logo -->
    <div 
      class="relative z-10 transition-all duration-700 ease-out flex flex-col items-center"
      :class="showLogo ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
    >
      <div class="relative w-32 h-32 mb-6">
        <!-- Glow rings -->
        <div class="absolute inset-0 bg-primary-400 rounded-3xl blur-2xl opacity-20 animate-pulse scale-110"></div>
        <div class="absolute inset-2 bg-primary-300 rounded-2xl blur-xl opacity-30 animate-pulse" style="animation-delay: 0.5s;"></div>
        
        <!-- Logo image -->
        <div class="relative w-full h-full bg-white rounded-3xl shadow-2xl shadow-primary-500/20 p-3 overflow-hidden">
          <img src="/logo.png" alt="Logo" class="w-full h-full object-contain relative z-10" />
        </div>
      </div>
    </div>
    
    <!-- Text -->
    <div 
      class="relative z-10 text-center transition-all duration-700 ease-out"
      :class="showText ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
    >
      <h1 class="text-4xl font-bold mb-3 tracking-wide flex items-center gap-1 justify-center font-display">
        <span class="text-gradient-warm">橘猫</span>
        <span class="text-gray-800">签</span>
      </h1>
      <p class="text-gray-400 text-sm tracking-widest mb-8">快乐签署 · 轻松管理</p>
    </div>
    
    <!-- Loading indicator -->
    <div 
      class="relative z-10 transition-all duration-500 ease-out"
      :class="showLoading ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
    >
      <div class="flex justify-center gap-2">
        <span class="w-2.5 h-2.5 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full animate-bounce-dot shadow-md shadow-primary-500/30"></span>
        <span class="w-2.5 h-2.5 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full animate-bounce-dot shadow-md shadow-primary-500/20" style="animation-delay: 0.15s"></span>
        <span class="w-2.5 h-2.5 bg-gradient-to-br from-warning-400 to-warning-500 rounded-full animate-bounce-dot shadow-md shadow-warning-500/20" style="animation-delay: 0.3s"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Blob animation */
.animate-blob {
  animation: blob 8s ease-in-out infinite;
}

@keyframes blob {
  0%, 100% { transform: translate(33%, -33%) scale(1); }
  33% { transform: translate(35%, -30%) scale(1.05); }
  66% { transform: translate(30%, -35%) scale(0.95); }
}

/* Loading dots */
.animate-bounce-dot {
  animation: bounceDot 0.6s ease-in-out infinite alternate;
}

@keyframes bounceDot {
  from { transform: translateY(0) scale(1); }
  to { transform: translateY(-8px) scale(1.1); }
}

/* Gradient text */
.text-gradient-warm {
  background: linear-gradient(135deg, #EA580C 0%, #F97316 50%, #FB923C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { PhHouseLine, PhFolderOpen, PhPlusCircle, PhChartLine, PhUserCircle } from '@phosphor-icons/vue'

const route = useRoute()

const isActive = (path) => route.path === path
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 h-[75px] z-50 flex justify-around items-center px-2 glass border-t-0 shadow-nav">
    <!-- Gradient accent line at top -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent rounded-full opacity-60"></div>
    
    <RouterLink to="/" class="nav-item group" :class="{ 'active': isActive('/') }">
      <div class="nav-icon-wrap" :class="isActive('/') ? 'bg-primary-100 text-primary-600' : ''">
        <PhHouseLine :size="24" :weight="isActive('/') ? 'fill' : 'regular'" />
      </div>
      <span class="nav-label">首页</span>
      <div v-if="isActive('/')" class="nav-indicator"></div>
    </RouterLink>
    
    <RouterLink to="/contracts" class="nav-item group" :class="{ 'active': isActive('/contracts') }">
      <div class="nav-icon-wrap" :class="isActive('/contracts') ? 'bg-primary-100 text-primary-600' : ''">
        <PhFolderOpen :size="24" :weight="isActive('/contracts') ? 'fill' : 'regular'" />
      </div>
      <span class="nav-label">合同库</span>
      <div v-if="isActive('/contracts')" class="nav-indicator"></div>
    </RouterLink>
    
    <!-- Center action button -->
    <RouterLink to="/create" class="nav-item -mt-7">
      <div class="relative">
        <!-- Glow effect -->
        <div class="absolute inset-0 bg-primary-500 rounded-full blur-lg opacity-40 animate-pulse-soft"></div>
        <!-- Main button -->
        <div class="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-xl shadow-primary-500/40 transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary-500/50 active:scale-95 ring-4 ring-white/80">
          <PhPlusCircle :size="32" weight="fill" />
        </div>
      </div>
      <span class="text-xs font-semibold mt-1.5 text-primary-600">发起</span>
    </RouterLink>
    
    <RouterLink to="/statistics" class="nav-item group" :class="{ 'active': isActive('/statistics') }">
      <div class="nav-icon-wrap" :class="isActive('/statistics') ? 'bg-primary-100 text-primary-600' : ''">
        <PhChartLine :size="24" :weight="isActive('/statistics') ? 'fill' : 'regular'" />
      </div>
      <span class="nav-label">统计</span>
      <div v-if="isActive('/statistics')" class="nav-indicator"></div>
    </RouterLink>
    
    <RouterLink to="/profile" class="nav-item group" :class="{ 'active': isActive('/profile') }">
      <div class="nav-icon-wrap" :class="isActive('/profile') ? 'bg-primary-100 text-primary-600' : ''">
        <PhUserCircle :size="24" :weight="isActive('/profile') ? 'fill' : 'regular'" />
      </div>
      <span class="nav-label">我的</span>
      <div v-if="isActive('/profile')" class="nav-indicator"></div>
    </RouterLink>
  </nav>
</template>

<style scoped>
.nav-item {
  @apply flex flex-col items-center justify-center text-gray-400 transition-all duration-300 min-w-[60px] relative;
}

.nav-item.active {
  @apply text-primary-600;
}

.nav-icon-wrap {
  @apply w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300;
}

.nav-item:not(.active):hover .nav-icon-wrap {
  @apply bg-gray-100 text-gray-600;
}

.nav-label {
  @apply text-[11px] font-medium mt-0.5 transition-colors duration-300;
}

.nav-indicator {
  @apply absolute -bottom-1 w-5 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

.animate-pulse-soft {
  animation: pulseSoft 3s ease-in-out infinite;
}

@keyframes pulseSoft {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}
</style>

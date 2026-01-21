<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { PhHouseLine, PhFolderOpen, PhPlusCircle, PhChartLine, PhUserCircle } from '@phosphor-icons/vue'

const route = useRoute()

const isActive = (path) => route.path === path
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 h-[70px] glass z-50 flex justify-around items-center px-2">
    <RouterLink to="/" class="nav-item" :class="{ 'text-[#0e7490]': isActive('/') }">
      <PhHouseLine :size="26" :weight="isActive('/') ? 'fill' : 'regular'" class="mb-0.5" />
      <span class="text-xs font-medium">首页</span>
    </RouterLink>
    
    <RouterLink to="/contracts" class="nav-item" :class="{ 'text-[#0e7490]': isActive('/contracts') }">
      <PhFolderOpen :size="26" :weight="isActive('/contracts') ? 'fill' : 'regular'" class="mb-0.5" />
      <span class="text-xs font-medium">合同库</span>
    </RouterLink>
    
    <RouterLink to="/create" class="nav-item -mt-8">
      <div class="w-14 h-14 rounded-full bg-[#0e7490] flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 active:scale-95 text-white ring-4 ring-gray-50/50">
        <PhPlusCircle :size="36" weight="fill" />
      </div>
      <span class="text-xs font-medium mt-1 text-center block">快速发起</span>
    </RouterLink>
    
    <RouterLink to="/statistics" class="nav-item" :class="{ 'text-[#0e7490]': isActive('/statistics') }">
      <PhChartLine :size="26" :weight="isActive('/statistics') ? 'fill' : 'regular'" class="mb-0.5" />
      <span class="text-xs font-medium">统计</span>
    </RouterLink>
    
    <RouterLink to="/profile" class="nav-item" :class="{ 'text-[#0e7490]': isActive('/profile') }">
      <PhUserCircle :size="26" :weight="isActive('/profile') ? 'fill' : 'regular'" class="mb-0.5" />
      <span class="text-xs font-medium">我的</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.nav-item {
  @apply flex flex-col items-center justify-center text-gray-400 transition-colors duration-200 min-w-[64px];
}
</style>

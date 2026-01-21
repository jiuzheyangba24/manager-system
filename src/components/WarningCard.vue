<script setup>
import { PhWarning, PhCaretRight } from '@phosphor-icons/vue'

defineProps({
  count: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <section class="relative overflow-hidden rounded-3xl p-5 cursor-pointer group">
    <!-- Gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 transition-all duration-500 group-hover:scale-105"></div>
    
    <!-- Decorative elements -->
    <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"></div>
    <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-lg"></div>
    
    <!-- Pattern overlay -->
    <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 20px 20px;"></div>
    
    <div class="relative z-10">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner">
            <PhWarning :size="22" weight="fill" />
          </div>
          <div>
            <h2 class="text-white font-bold text-lg tracking-wide">即将到期</h2>
            <p class="text-primary-100 text-xs">需要您尽快处理</p>
          </div>
        </div>
        <div class="flex items-center gap-1 text-white/80 group-hover:text-white transition-colors">
          <span class="text-sm font-medium">{{ count }} 份</span>
          <PhCaretRight :size="16" weight="bold" class="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
      
      <!-- Content slot -->
      <div class="space-y-3">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<style scoped>
.warning-item {
  @apply flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl p-3.5 text-white transition-all duration-300 hover:bg-white/25 border border-white/10;
}

.warning-badge {
  @apply w-10 h-6 rounded-lg text-[10px] font-bold flex items-center justify-center shrink-0 shadow-lg;
}
</style>

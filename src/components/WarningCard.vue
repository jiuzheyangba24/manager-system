<script setup>
import { PhWarning } from '@phosphor-icons/vue'

defineProps({
  count: Number
})
</script>

<template>
  <div class="bg-gradient-purple rounded-3xl p-5 text-white shadow-lg relative overflow-hidden group">
    <!-- Decorative circles -->
    <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
    <div class="absolute top-10 -left-10 w-24 h-24 bg-black/10 rounded-full blur-2xl"></div>
    
    <div class="flex justify-between items-center mb-4 relative z-10">
      <div class="flex items-center gap-2">
        <PhWarning :size="22" weight="fill" class="text-white/90" />
        <h2 class="text-lg font-semibold">合同到期预警</h2>
      </div>
      <span class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/10">{{ count }}条</span>
    </div>
    
    <div class="flex flex-col gap-3 relative z-10">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
:deep(.warning-item) {
  @apply flex items-center gap-3 py-2 border-b border-white/10 last:border-0;
}
:deep(.warning-badge) {
  @apply min-w-[32px] h-6 flex items-center justify-center rounded text-xs font-bold shadow-sm;
}
</style>

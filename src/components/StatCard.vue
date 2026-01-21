<script setup>
import { PhFire } from '@phosphor-icons/vue'
defineProps({
  icon: Object, // Expecting a Vue Component
  label: String,
  value: String,
  trend: String,
  isUrgent: Boolean,
  type: {
    type: String, // primary, warning, success
    default: 'primary'
  }
})

const colorClasses = {
  primary: 'bg-primary-50 text-primary-600',
  warning: 'bg-warning-50 text-warning-600',
  success: 'bg-success-50 text-success-600'
}
</script>

<template>
  <div class="bg-white rounded-2xl p-4 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-transparent hover:border-primary-100">
    <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors duration-300" :class="colorClasses[type]">
      <component :is="icon" :size="24" weight="duotone" />
    </div>
    <div class="text-xs font-medium text-gray-500 mb-1 tracking-wide">{{ label }}</div>
    <div class="flex items-center gap-2">
      <span class="text-2xl font-bold text-gray-900 tracking-tight">{{ value }}</span>
      <div v-if="isUrgent" class="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-500 animate-pulse">
        <PhFire weight="fill" :size="12" />
      </div>
      <span v-if="trend" class="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-50 text-gray-600 font-medium border border-gray-100">{{ trend }}</span>
    </div>
  </div>
</template>

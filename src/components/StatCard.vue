<script setup>
import { PhFire } from '@phosphor-icons/vue'
defineProps({
  icon: Object,
  label: String,
  value: String,
  trend: String,
  isUrgent: Boolean,
  type: {
    type: String,
    default: 'primary'
  }
})

const iconBgClasses = {
  primary: 'bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg shadow-primary-500/30',
  warning: 'bg-gradient-to-br from-warning-400 to-warning-600 text-white shadow-lg shadow-warning-500/30',
  success: 'bg-gradient-to-br from-success-400 to-success-600 text-white shadow-lg shadow-success-500/30',
  danger: 'bg-gradient-to-br from-danger-400 to-danger-600 text-white shadow-lg shadow-danger-500/30'
}

const valueBgClasses = {
  primary: 'text-primary-600',
  warning: 'text-warning-600',
  success: 'text-success-600',
  danger: 'text-danger-600'
}
</script>

<template>
  <div class="group card-premium p-4 cursor-pointer relative overflow-hidden">
    <!-- Subtle gradient overlay on hover -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-primary-100/0 group-hover:from-primary-50/50 group-hover:to-primary-100/30 transition-all duration-500 rounded-3xl"></div>
    
    <div class="relative z-10">
      <!-- Icon with gradient background -->
      <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" 
           :class="iconBgClasses[type]">
        <component :is="icon" :size="22" weight="duotone" />
      </div>
      
      <!-- Label -->
      <div class="text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">{{ label }}</div>
      
      <!-- Value row -->
      <div class="flex items-center gap-2">
        <span class="text-2xl font-bold tracking-tight transition-colors duration-300" 
              :class="valueBgClasses[type]">{{ value }}</span>
        
        <!-- Urgent indicator -->
        <div v-if="isUrgent" 
             class="w-6 h-6 rounded-full bg-gradient-to-br from-danger-400 to-danger-600 flex items-center justify-center text-white animate-pulse shadow-md shadow-danger-500/40">
          <PhFire weight="fill" :size="12" />
        </div>
        
        <!-- Trend badge -->
        <span v-if="trend" 
              class="text-[10px] px-2 py-1 rounded-full bg-gray-100/80 text-gray-600 font-semibold border border-gray-200/50 backdrop-blur-sm">
          {{ trend }}
        </span>
      </div>
    </div>
  </div>
</template>

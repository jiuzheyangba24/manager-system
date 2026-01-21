<script setup>
import { PhShoppingCart, PhShieldCheck, PhHandshake, PhCurrencyDollar, PhFile } from '@phosphor-icons/vue'

const props = defineProps({
  title: String,
  meta: String,
  status: String,
  type: String
})

const iconColors = {
  purchase: 'bg-primary-50 text-primary-600',
  nda: 'bg-success-50 text-success-600',
  service: 'bg-warning-50 text-warning-600',
  sales: 'bg-danger-50 text-danger-600',
  other: 'bg-gray-50 text-gray-600'
}

const icons = {
  purchase: PhShoppingCart,
  nda: PhShieldCheck,
  service: PhHandshake,
  sales: PhCurrencyDollar,
  other: PhFile
}

const statusColors = {
  pending: 'bg-warning-50 text-warning-700 border-warning-100',
  completed: 'bg-success-50 text-success-700 border-success-100',
  rejected: 'bg-danger-50 text-danger-700 border-danger-100',
  draft: 'bg-gray-100 text-gray-600 border-gray-200'
}

const statusLabels = {
  pending: '待签署',
  completed: '已完成',
  rejected: '已拒绝',
  draft: '草稿'
}
</script>

<template>
  <div class="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-200 cursor-pointer group">
    <div class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform" :class="iconColors[type] || iconColors.other">
      <component :is="icons[type] || icons.other" :size="24" weight="fill" />
    </div>
    
    <div class="flex-1 min-w-0">
      <div class="text-sm font-medium text-gray-900 truncate mb-0.5 group-hover:text-primary-600 transition-colors">{{ title }}</div>
      <div class="text-xs text-gray-500 truncate">{{ meta }}</div>
    </div>
    
    <div v-if="status === 'completed'" class="flex items-center gap-2">
      <button 
        @click.stop="$emit('evaluate')"
        class="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-600 border border-primary-100 hover:bg-primary-100 active:bg-primary-200 transition-colors"
      >
        评价
      </button>
      <div class="px-2.5 py-1 rounded-full text-xs border whitespace-nowrap flex items-center gap-1 bg-success-50 text-success-700 border-success-100">
        {{ statusLabels[status] }}
      </div>
    </div>
    
    <div v-else class="px-2.5 py-1 rounded-full text-xs border whitespace-nowrap flex items-center gap-1" :class="statusColors[status]">
      <span v-if="status === 'pending'" class="w-1.5 h-1.5 rounded-full bg-warning-500 animate-pulse"></span>
      {{ statusLabels[status] }}
    </div>
  </div>
</template>

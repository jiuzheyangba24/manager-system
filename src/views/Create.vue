<script setup>
import BottomNav from '@/components/layout/BottomNav.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { PhShoppingCart, PhShieldCheck, PhHandshake, PhCurrencyDollar, PhArrowLeft } from '@phosphor-icons/vue'

const router = useRouter()
const selectedType = ref('purchase')

const contractTypes = [
  { id: 'purchase', icon: PhShoppingCart, name: '采购合同', color: 'bg-primary-50 text-primary-600' },
  { id: 'sales', icon: PhCurrencyDollar, name: '销售合同', color: 'bg-success-50 text-success-600' },
  { id: 'nda', icon: PhShieldCheck, name: '保密协议', color: 'bg-warning-50 text-warning-600' },
  { id: 'service', icon: PhHandshake, name: '服务合同', color: 'bg-danger-50 text-danger-600' }
]
</script>

<template>
  <div class="h-full pb-[80px]">
    <header class="flex items-center gap-3 px-4 py-4 bg-white/50 backdrop-blur-md sticky top-0 z-30">
      <button @click="router.back()" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
        <PhArrowLeft :size="20" class="text-gray-600" weight="bold" />
      </button>
      <h1 class="text-xl font-bold text-gray-900">快速发起合同</h1>
    </header>

    <div class="px-4 py-4">
      <h2 class="text-base font-semibold text-gray-800 mb-4">选择合同类型</h2>
      <div class="grid grid-cols-2 gap-3 mb-6">
        <div 
          v-for="type in contractTypes" 
          :key="type.id"
          @click="selectedType = type.id"
          class="bg-white rounded-2xl p-5 text-center cursor-pointer border-2 transition-all duration-200 shadow-sm hover:shadow-md"
          :class="selectedType === type.id ? 'border-primary-500 bg-primary-50' : 'border-transparent hover:-translate-y-1'"
        >
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" :class="type.color">
            <component :is="type.icon" :size="32" weight="fill" />
          </div>
          <div class="text-sm font-semibold text-gray-900">{{ type.name }}</div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-5 shadow-card mb-4 animate-fade-in-up">
        <h3 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">📝 基本信息</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">合同名称 <span class="text-danger-500">*</span></label>
            <input type="text" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all" placeholder="请输入合同名称">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">对方公司 <span class="text-danger-500">*</span></label>
            <input type="text" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all" placeholder="请输入对方名称">
          </div>
        </div>
      </div>

      <div class="p-4 mb-[70px]">
        <button class="w-full bg-gradient-purple text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200">
          发起签署
        </button>
      </div>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { PhCaretLeft, PhStar } from '@phosphor-icons/vue'

const router = useRouter()

const goBack = () => {
  router.back()
}

const reviews = [
  {
    id: 1,
    target: '王明',
    contract: '核心技术人员NDA保密协议',
    rating: 5,
    comment: '合作非常愉快，沟通顺畅，交付及时！',
    date: '2024-01-20',
    avatarColor: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    target: '中智人力',
    contract: '临时劳务派遣合同',
    rating: 4,
    comment: '服务态度不错，但响应速度有待提高。',
    date: '2024-01-15',
    avatarColor: 'bg-orange-100 text-orange-600'
  },
  {
    id: 3,
    target: '华润置地',
    contract: '仓库租赁续约合同',
    rating: 5,
    comment: '场地设施完善，物业服务专业。',
    date: '2023-12-20',
    avatarColor: 'bg-green-100 text-green-600'
  },
  {
    id: 4,
    target: '张教授',
    contract: '专家顾问咨询协议',
    rating: 5,
    comment: '专业性极强，提出的建议非常有价值。',
    date: '2023-11-15',
    avatarColor: 'bg-purple-100 text-purple-600'
  }
]
</script>

<template>
  <div class="h-full bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-30 bg-white px-4 py-3 flex items-center gap-4 border-b border-gray-100 shadow-sm">
      <button @click="goBack" class="w-10 h-10 rounded-full hover:bg-gray-50 flex items-center justify-center transition-colors">
        <PhCaretLeft :size="24" class="text-gray-900" weight="bold" />
      </button>
      <h1 class="text-lg font-bold text-gray-900">评价记录</h1>
    </header>

    <div class="flex-1 p-4 overflow-y-auto">
      <div class="flex flex-col gap-4">
        <!-- Review Card -->
        <div v-for="review in reviews" :key="review.id" class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 animate-slide-up">
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" :class="review.avatarColor">
                {{ review.target.slice(0, 1) }}
              </div>
              <div>
                <div class="font-bold text-gray-900">{{ review.target }}</div>
                <div class="text-xs text-gray-500">{{ review.date }}</div>
              </div>
            </div>
            <div class="flex gap-0.5">
              <PhStar 
                v-for="i in 5" 
                :key="i" 
                :weight="i <= review.rating ? 'fill' : 'regular'" 
                :size="14" 
                :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-200'" 
              />
            </div>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-2.5 mb-3">
            <div class="text-xs text-gray-400 mb-1">关联合同</div>
            <div class="text-xs font-medium text-gray-700 truncate">{{ review.contract }}</div>
          </div>
          
          <div class="text-sm text-gray-600 leading-relaxed">
            {{ review.comment }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.5s ease-out backwards;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

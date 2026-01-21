<script setup>
import { useRouter } from 'vue-router'
import { PhCaretLeft, PhBell, PhFileText, PhShieldCheck } from '@phosphor-icons/vue'

const router = useRouter()

const goBack = () => {
  router.back()
}

const notifications = [
  {
    id: 1,
    title: '合同待签署提醒',
    content: '您有一份《市场推广采购协议 - 2024Q3》需要签署，请尽快处理。',
    time: '10分钟前',
    type: 'contract',
    read: false,
    icon: PhFileText,
    iconColor: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    title: '审批通过通知',
    content: '您的《云服务器租赁合同》审批流程已完成，目前状态：待签署。',
    time: '1小时前',
    type: 'system',
    read: false,
    icon: PhShieldCheck,
    iconColor: 'bg-green-100 text-green-600'
  },
  {
    id: 3,
    title: '系统维护公告',
    content: '系统将于本周日凌晨 02:00 进行例行维护，预计时长 2 小时。',
    time: '昨天',
    type: 'system',
    read: true,
    icon: PhBell,
    iconColor: 'bg-orange-100 text-orange-600'
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
      <h1 class="text-lg font-bold text-gray-900">消息通知</h1>
      <button class="ml-auto text-sm text-gray-500 font-medium">全部已读</button>
    </header>

    <div class="flex-1 p-4 overflow-y-auto">
      <div class="flex flex-col gap-3">
        <div 
          v-for="item in notifications" 
          :key="item.id" 
          class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 animate-fade-in-up"
          :class="{'opacity-75': item.read}"
        >
          <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0" :class="item.iconColor">
            <component :is="item.icon" :size="20" weight="fill" />
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-start mb-1">
              <h3 class="font-bold text-gray-900 text-sm">{{ item.title }}</h3>
              <span class="text-xs text-gray-400 whitespace-nowrap">{{ item.time }}</span>
            </div>
            <p class="text-sm text-gray-500 leading-relaxed line-clamp-2">
              {{ item.content }}
            </p>
          </div>
          
          <div v-if="!item.read" class="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

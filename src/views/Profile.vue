<script setup>
import BottomNav from '@/components/layout/BottomNav.vue'
import { useUserStore } from '@/stores/user'
import { PhBell, PhQuestion, PhChatCircle, PhInfo, PhCaretRight, PhStar, PhUser } from '@phosphor-icons/vue'
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref, nextTick } from 'vue'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const messageRef = ref(null)

const menuGroups = [
  {
    title: '功能设置',
    items: [
      { icon: PhUser, label: '我的资料', color: 'bg-cyan-50 text-cyan-700', to: '/profile/info' },
      { id: 'messages', icon: PhBell, label: '消息通知', badge: '3', color: 'bg-cyan-50 text-cyan-700', to: '/messages' },
      { icon: PhStar, label: '星级评价', color: 'bg-cyan-50 text-cyan-700', to: '/profile/evaluations' }
    ]
  },
  {
    title: '其他',
    items: [
      { icon: PhQuestion, label: '帮助中心', color: 'bg-cyan-50 text-cyan-700' },
      { icon: PhChatCircle, label: '意见反馈', color: 'bg-cyan-50 text-cyan-700' },
      { icon: PhInfo, label: '关于我们', desc: 'v2.0.1', color: 'bg-cyan-50 text-cyan-700' }
    ]
  }
]

// Carousel Data
const carouselImages = [
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
]
const currentSlide = ref(0)
const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % carouselImages.length
}
onMounted(() => {
    setInterval(nextSlide, 3000)
    
    if (route.query.focus === 'messages') {
        nextTick(() => {
            messageRef.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            // Optional: Add highlight effect logic here if needed
            messageRef.value?.classList.add('bg-primary-50')
            setTimeout(() => {
                 messageRef.value?.classList.remove('bg-primary-50')
            }, 2000)
        })
    }
})
</script>

<template>
  <div class="h-full pb-[80px]">
    <!-- Header -->
    <div class="bg-[#0e7490] pt-12 pb-16 px-6 text-center text-white relative overflow-hidden">
      <!-- Decor -->
      <div class="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div class="relative z-10 w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-3xl font-bold text-primary-600 shadow-xl mb-3 border-4 border-white/20 backdrop-blur-sm overflow-hidden">
        <img v-if="userStore.user.avatarUrl" :src="userStore.user.avatarUrl" alt="Avatar" class="w-full h-full object-cover">
        <span v-else>{{ userStore.user.avatar }}</span>
      </div>
      <h1 class="relative z-10 text-xl font-bold mb-1">{{ userStore.user.name }}</h1>
      <p class="relative z-10 text-white/80 text-sm">{{ userStore.user.role }}</p>
      
      <div class="relative z-10 flex justify-center gap-8 mt-6">
        <div class="text-center">
          <div class="text-xl font-bold">128</div>
          <div class="text-xs text-white/70">本月签署</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-bold">99%</div>
          <div class="text-xs text-white/70">签署率</div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="px-4 -mt-6 relative z-20">
      <div v-for="(group, idx) in menuGroups" :key="idx" class="bg-white rounded-2xl shadow-card mb-4 overflow-hidden animate-fade-in-up" :style="{animationDelay: `${idx * 100}ms`}">
        <div class="px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider bg-gray-50/50">{{ group.title }}</div>
        <div>
          <div 
            v-for="(item, i) in group.items" 
            :key="i"
            :ref="item.id === 'messages' ?  (el) => { messageRef = el } : null"
            class="flex items-center gap-3 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
            @click="item.to && router.push(item.to)"
          >
            <div class="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm" :class="item.color">
              <component :is="item.icon" :size="20" weight="fill" />
            </div>
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-900">{{ item.label }}</div>
              <div v-if="item.desc" class="text-xs text-gray-500">{{ item.desc }}</div>
            </div>
            <span v-if="item.badge" class="bg-danger-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{{ item.badge }}</span>
            <PhCaretRight :size="16" class="text-gray-300" weight="bold" />
          </div>
        </div>
      </div>

       <!-- Carousel -->
       <div class="mb-6 rounded-2xl overflow-hidden shadow-card h-32 relative">
            <div class="absolute inset-0 flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                <img v-for="(img, index) in carouselImages" :key="index" :src="img" class="w-full h-full object-cover flex-shrink-0" />
            </div>
            <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                <span v-for="(_, index) in carouselImages" :key="index" class="w-1.5 h-1.5 rounded-full transition-colors" :class="currentSlide === index ? 'bg-white' : 'bg-white/50'"></span>
            </div>
       </div>

      <button class="w-full py-4 rounded-2xl bg-danger-50 text-danger-600 font-semibold mb-6 hover:bg-danger-100 active:scale-95 transition-all text-sm">
        退出登录
      </button>
    </div>

    <BottomNav />
  </div>
</template>

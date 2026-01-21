<script setup>
import TopHeader from '@/components/layout/TopHeader.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { PhCaretLeft, PhCamera } from '@phosphor-icons/vue'

const userStore = useUserStore()
const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="h-full pb-[80px] bg-white">
    <!-- Header -->
    <header class="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-4">
      <button @click="goBack" class="w-10 h-10 rounded-full hover:bg-gray-50 flex items-center justify-center transition-colors">
        <PhCaretLeft :size="24" class="text-gray-900" weight="bold" />
      </button>
      <h1 class="text-lg font-bold text-gray-900">我的资料</h1>
    </header>

    <div class="p-6 flex flex-col items-center">
      <!-- Avatar -->
      <div class="relative mb-8 group cursor-pointer">
        <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 shadow-lg">
          <img v-if="userStore.user.avatarUrl" :src="userStore.user.avatarUrl" alt="Avatar" class="w-full h-full object-cover">
          <div v-else class="w-full h-full bg-gradient-purple flex items-center justify-center text-white text-3xl font-bold">
            {{ userStore.user.avatar }}
          </div>
        </div>
        <div class="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full border-2 border-white flex items-center justify-center text-white shadow-md">
          <PhCamera :size="16" weight="fill" />
        </div>
      </div>

      <!-- Form -->
      <div class="w-full space-y-5">
        <div class="space-y-1">
          <label class="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">姓名</label>
          <input type="text" :value="userStore.user.name" readonly class="w-full bg-gray-50 rounded-xl px-4 py-3 text-gray-900 border border-transparent focus:bg-white focus:border-primary-500 outline-none transition-all font-medium">
        </div>
        
        <div class="space-y-1">
          <label class="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">职位</label>
          <input type="text" :value="userStore.user.role" readonly class="w-full bg-gray-50 rounded-xl px-4 py-3 text-gray-900 border border-transparent focus:bg-white focus:border-primary-500 outline-none transition-all font-medium">
        </div>
        
        <div class="space-y-1">
          <label class="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">部门</label>
          <input type="text" value="市场拓展部" readonly class="w-full bg-gray-50 rounded-xl px-4 py-3 text-gray-900 border border-transparent focus:bg-white focus:border-primary-500 outline-none transition-all font-medium">
        </div>
        
        <div class="space-y-1">
          <label class="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">手机号</label>
          <input type="tel" value="138 0013 8000" class="w-full bg-gray-50 rounded-xl px-4 py-3 text-gray-900 border border-transparent focus:bg-white focus:border-primary-500 outline-none transition-all font-medium">
        </div>
        
        <div class="space-y-1">
          <label class="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">邮箱</label>
          <input type="email" value="zhang.manager@nexsign.com" class="w-full bg-gray-50 rounded-xl px-4 py-3 text-gray-900 border border-transparent focus:bg-white focus:border-primary-500 outline-none transition-all font-medium">
        </div>
      </div>

      <button class="w-full mt-10 py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-200 active:scale-95 transition-all text-lg flex items-center justify-center gap-2">
        保存修改
      </button>
    </div>
  </div>
</template>

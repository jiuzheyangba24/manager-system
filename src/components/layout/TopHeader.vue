<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { PhBellRinging, PhNotePencil } from '@phosphor-icons/vue'

const userStore = useUserStore()
const router = useRouter()
</script>

<template>
  <header class="sticky top-0 z-40 bg-gray-50/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <div class="w-9 h-9 rounded-lg bg-gradient-purple flex items-center justify-center text-white shadow-md">
        <PhNotePencil :size="20" weight="fill" />
      </div>
      <div class="font-bold text-lg text-gray-900">
        <span class="text-orange-500">橘猫</span>签
      </div>
    </div>
    
    <div class="flex items-center gap-3">
      <button @click="router.push('/profile?focus=messages')" class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 shadow-sm hover:text-primary-600 transition-colors relative btn-click border border-gray-100/50">
        <PhBellRinging :size="22" weight="fill" />
        <span v-if="userStore.notifications > 0" class="absolute top-2.5 right-2.5 w-2 h-2 bg-danger-500 rounded-full border border-white"></span>
      </button>
      
      <div @click="router.push('/profile')" class="w-10 h-10 rounded-full bg-gradient-purple flex items-center justify-center text-white font-semibold text-sm cursor-pointer shadow-sm border-2 border-white hover:opacity-90 transition-opacity overflow-hidden">
         <img v-if="userStore.user.avatarUrl" :src="userStore.user.avatarUrl" alt="Avatar" class="w-full h-full object-cover">
         <span v-else>{{ userStore.user.avatar }}</span>
      </div>
    </div>
  </header>
</template>

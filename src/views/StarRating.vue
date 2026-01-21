<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PhCaretLeft, PhStar } from '@phosphor-icons/vue'

const router = useRouter()
const route = useRoute()
const rating = ref(0)
const comment = ref('')
const submitted = ref(false)

// Dynamic content based on route query
const pageTitle = ref('评价体验')
const questionTitle = ref('您对 橘猫签 满意吗？')
const questionSubtitle = ref('您的评价对我们非常重要，将帮助我们做得更好。')

onMounted(() => {
  if (route.query.target) {
    pageTitle.value = '合同评价'
    questionTitle.value = `评价与 ${route.query.target} 的合作`
    questionSubtitle.value = '请对本次合作体验进行打分（双方互评）'
  }
})

const goBack = () => {
  router.back()
}

const setRating = (star) => {
  rating.value = star
}

const submitRating = () => {
  if (rating.value === 0) return
  submitted.value = true
  setTimeout(() => {
    // router.back() // Optional: auto go back
  }, 2000)
}
</script>

<template>
  <div class="h-full bg-white flex flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-30 bg-white px-4 py-3 flex items-center gap-4">
      <button @click="goBack" class="w-10 h-10 rounded-full hover:bg-gray-50 flex items-center justify-center transition-colors">
        <PhCaretLeft :size="24" class="text-gray-900" weight="bold" />
      </button>
      <h1 class="text-lg font-bold text-gray-900">{{ pageTitle }}</h1>
    </header>

    <div class="flex-1 p-6 flex flex-col items-center justify-center text-center max-w-sm mx-auto w-full" v-if="!submitted">
      <div class="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500 mb-6 animate-bounce-slow">
        <PhStar weight="fill" :size="40" />
      </div>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ questionTitle }}</h2>
      <p class="text-gray-500 mb-8">{{ questionSubtitle }}</p>
      
      <!-- Stars -->
      <div class="flex gap-3 mb-10">
        <button 
          v-for="i in 5" 
          :key="i"
          @click="setRating(i)"
          class="transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <PhStar 
            :weight="i <= rating ? 'fill' : 'regular'" 
            :size="42" 
            :class="i <= rating ? 'text-yellow-400 drop-shadow-md' : 'text-gray-300'" 
            class="transition-colors"
          />
        </button>
      </div>
      
      <!-- Comment -->
      <div class="w-full mb-6">
        <textarea 
          v-model="comment"
          placeholder="说说您的使用感受... (选填)" 
          class="w-full h-32 bg-gray-50 rounded-2xl p-4 text-gray-900 border-2 border-transparent focus:bg-white focus:border-yellow-400 outline-none transition-all resize-none font-medium placeholder:text-gray-400/80"
        ></textarea>
      </div>
      
      <button 
        @click="submitRating"
        :disabled="rating === 0"
        class="w-full py-4 rounded-2xl font-bold shadow-lg transition-all text-lg flex items-center justify-center"
        :class="rating > 0 ? 'bg-gray-900 text-white shadow-gray-200 active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
      >
        提交评价
      </button>
    </div>

    <!-- Success State -->
    <div v-else class="flex-1 p-6 flex flex-col items-center justify-center text-center animate-fade-in-up">
      <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256"><path fill="currentColor" d="M173.66 98.34a8 8 0 0 1 0 11.32l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 0M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88"/></svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">感谢您的评价！</h2>
      <p class="text-gray-500 mb-10">我们会继续努力，为您提供更好的服务。</p>
      
      <button 
        @click="goBack"
        class="bg-gray-100 text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
      >
        返回
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce-slow {
  animation: bounce-slow 3s infinite ease-in-out;
}
</style>

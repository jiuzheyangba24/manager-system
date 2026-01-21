<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import SplashScreen from './components/SplashScreen.vue'

const showSplash = ref(true)

const handleSplashFinish = () => {
  showSplash.value = false
}
</script>

<template>
  <SplashScreen v-if="showSplash" @finish="handleSplashFinish" />
  
  <div v-else class="app-content">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
/* Global background */
body {
  background: #f3f4f6;
  min-height: 100vh;
}

.app-content {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
</style>

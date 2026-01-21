<script setup>
import TopHeader from '@/components/layout/TopHeader.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
import StatCard from '@/components/StatCard.vue'
import WarningCard from '@/components/WarningCard.vue'
import ContractItem from '@/components/ContractItem.vue'
import { useUserStore } from '@/stores/user'
import { ref, onMounted } from 'vue'
import { PhPencilLine, PhUsersThree, PhSealCheck, PhMagnifyingGlass, PhFire, PhSparkle } from '@phosphor-icons/vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const greeting = ref('下午好')

onMounted(() => {
  const hour = new Date().getHours()
  if (hour < 6) greeting.value = '凌晨好'
  else if (hour < 9) greeting.value = '早上好'
  else if (hour < 12) greeting.value = '上午好'
  else if (hour < 14) greeting.value = '中午好'
  else if (hour < 18) greeting.value = '下午好'
  else if (hour < 22) greeting.value = '晚上好'
  else greeting.value = '夜深了'
})

const stats = [
  { icon: PhFire, label: '待我签署', value: '04', isUrgent: true, type: 'danger', route: '/contracts?filter=waiting_me' },
  { icon: PhUsersThree, label: '等待他人', value: '12', trend: '进行中', type: 'warning', route: '/contracts?filter=waiting_others' },
  { icon: PhSealCheck, label: '本月完成', value: '128', trend: '+12%', type: 'success' }
]

const recentContracts = [
  { id: 1, title: '市场推广采购协议 - 2024Q3', meta: '更新于 2 小时前 · 投资平节能出品公司', type: 'purchase', status: 'pending' },
  { id: 2, title: '核心技术人员NDA保密协议', meta: '更新于 5 小时前 · 王明', type: 'nda', status: 'completed' },
  { id: 3, title: '年度IT运维服务合同', meta: '更新于 1 天前 · 华为技术有限公司', type: 'service', status: 'pending' }
]

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="min-h-screen pb-[85px] relative">
    <!-- Decorative floating elements -->
    <div class="fixed top-20 right-4 w-20 h-20 bg-primary-200/30 rounded-full blur-2xl pointer-events-none animate-float"></div>
    <div class="fixed top-40 left-4 w-16 h-16 bg-accent-200/30 rounded-full blur-2xl pointer-events-none animate-float-slow"></div>
    
    <TopHeader />
    
    <div class="px-4 py-3">
      <!-- Search -->
      <div class="relative mb-6 animate-fade-in-up">
        <PhMagnifyingGlass :size="18" weight="bold" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
        <input type="text" placeholder="搜索合同名称、对方公司..." 
          class="w-full glass rounded-2xl py-3.5 pl-12 pr-4 text-sm border-0 focus:ring-4 focus:ring-primary-100 transition-all duration-300 outline-none placeholder:text-gray-400 hover:shadow-lg"
        >
        <!-- Glow effect on focus -->
        <div class="absolute inset-0 rounded-2xl bg-primary-400/0 transition-all duration-300 pointer-events-none peer-focus:bg-primary-400/5"></div>
      </div>
      
      <!-- Greeting -->
      <section class="mb-6 animate-fade-in-up delay-100">
        <h1 class="text-2xl font-bold text-gray-900 mb-1.5 flex items-center gap-2 font-display">
          <span class="text-gradient-warm">{{ greeting }}</span>
          <span>，{{ userStore.user.name }}</span>
          <img src="/cat_icon_v2.png" alt="Hi" class="w-9 h-9 inline-block animate-wave origin-[70%_70%]" />
        </h1>
        <p class="text-sm text-gray-500 flex items-center gap-1">
          今天有 
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-bold text-xs">
            <PhSparkle :size="12" weight="fill" />
            4
          </span> 
          份合同需要您签署
        </p>
      </section>
      
      <!-- Stats -->
      <section class="grid grid-cols-3 gap-3 mb-6">
        <StatCard 
          v-for="(stat, index) in stats" 
          :key="index"
          v-bind="stat"
          class="animate-fade-in-up"
          :style="{ animationDelay: `${index * 100 + 200}ms` }"
          @click="stat.route && navigateTo(stat.route)"
        />
      </section>
      
      <div class="space-y-5">
        <!-- Warning -->
        <WarningCard :count="3" class="animate-fade-in-up delay-300" @click="navigateTo('/contracts?filter=expiring')">
          <div class="warning-item">
            <span class="bg-white text-danger-600 warning-badge">3d</span>
            <div>
              <div class="text-sm font-semibold">2024年度设备租赁协议</div>
              <div class="text-xs text-white/70">对方：顺丰速运有限公司</div>
            </div>
          </div>
          <div class="warning-item">
            <span class="bg-white/90 text-warning-600 warning-badge">7d</span>
            <div>
              <div class="text-sm font-semibold">高级云服务框架合同</div>
              <div class="text-xs text-white/70">对方：阿里云计算有限公司</div>
            </div>
          </div>
        </WarningCard>
        
        <!-- Recent Contracts -->
        <section class="card-premium p-5 animate-fade-in-up delay-400">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold text-gray-900 cursor-pointer hover:text-primary-600 transition-colors flex items-center gap-2" @click="navigateTo('/contracts?filter=recent_7')">
              <span class="w-1 h-5 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full"></span>
              最近合同
            </h2>
            <router-link to="/contracts?filter=recent_7" class="text-sm text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-1 group">
              查看全部 
              <span class="transition-transform group-hover:translate-x-1">→</span>
            </router-link>
          </div>
          
          <div class="flex flex-col gap-3">
            <ContractItem 
              v-for="(contract, index) in recentContracts"
              :key="contract.id"
              v-bind="contract"
              class="animate-slide-in-right"
              :style="{ animationDelay: `${index * 80 + 500}ms` }"
            />
          </div>
        </section>
      </div>
    </div>
    
    <BottomNav />
  </div>
</template>

<style>
@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  75% { transform: rotate(-10deg); }
}

.animate-wave {
  animation: wave 2s infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-slow {
  animation: float 8s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
</style>

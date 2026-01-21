<script setup>
import TopHeader from '@/components/layout/TopHeader.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
import StatCard from '@/components/StatCard.vue'
import WarningCard from '@/components/WarningCard.vue'
import ContractItem from '@/components/ContractItem.vue'
import { useUserStore } from '@/stores/user'
import { ref, onMounted } from 'vue'
import { PhPencilLine, PhUsersThree, PhSealCheck, PhMagnifyingGlass, PhFire } from '@phosphor-icons/vue'
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
  <div class="h-full pb-[80px]">
    <TopHeader />
    
    <div class="px-4 py-2">
      <!-- Search -->
      <div class="relative mb-6">
        <PhMagnifyingGlass :size="18" weight="bold" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="搜索合同名称、对方公司..." 
          class="w-full bg-white rounded-2xl py-3 pl-11 pr-4 text-sm border border-transparent focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all duration-200 outline-none shadow-sm hover:shadow-md"
        >
      </div>
      
      <!-- Greeting -->
      <section class="mb-6 animate-fade-in-up">
        <h1 class="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
          {{ greeting }}，{{ userStore.user.name }} 
          <img src="/cat_icon_v2.png" alt="Hi" class="w-8 h-8 inline-block animate-wave origin-[70%_70%]" />
        </h1>
        <p class="text-sm text-gray-500">
          今天有 <span class="text-primary-600 font-bold">4</span> 份合同需要您签署，整体进度良好。
        </p>
      </section>
      
      <!-- Stats -->
      <section class="grid grid-cols-3 gap-3 mb-6">
        <StatCard 
          v-for="(stat, index) in stats" 
          :key="index"
          v-bind="stat"
          class="animate-fade-in-up cursor-pointer transition-transform hover:scale-105"
          :style="{ animationDelay: `${index * 100 + 100}ms` }"
          @click="stat.route && navigateTo(stat.route)"
        />
      </section>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Warning -->
        <WarningCard :count="3" class="animate-fade-in-up delay-300 cursor-pointer" @click="navigateTo('/contracts?filter=expiring')">
          <div class="warning-item">
            <span class="bg-danger-500 text-white warning-badge shadow-red-200">3d</span>
            <div>
              <div class="text-sm font-medium">2024年度设备租赁协议</div>
              <div class="text-xs opacity-80">对方：顺丰速运有限公司</div>
            </div>
          </div>
          <div class="warning-item">
            <span class="bg-warning-500 text-white warning-badge shadow-orange-200">7d</span>
            <div>
              <div class="text-sm font-medium">高级云服务框架合同</div>
              <div class="text-xs opacity-80">对方：阿里云计算有限公司</div>
            </div>
          </div>
        </WarningCard>
        
        <!-- Recent Contracts -->
        <section class="bg-white/60 backdrop-blur-sm rounded-3xl p-5 shadow-card animate-fade-in-up delay-400">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-900 cursor-pointer hover:text-primary-600" @click="navigateTo('/contracts?filter=recent_7')">最近合同</h2>
            <router-link to="/contracts?filter=recent_7" class="text-sm text-primary-600 font-medium hover:text-primary-700">查看全部 →</router-link>
          </div>
          
          <div class="flex flex-col gap-3">
            <ContractItem 
              v-for="contract in recentContracts"
              :key="contract.id"
              v-bind="contract"
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

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out backwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
</style>

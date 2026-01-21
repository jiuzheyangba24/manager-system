<script setup>
import BottomNav from '@/components/layout/BottomNav.vue'
import ContractItem from '@/components/ContractItem.vue'
import { ref, computed, onMounted, watch } from 'vue'
import { PhMagnifyingGlass, PhFaders, PhCaretDown } from '@phosphor-icons/vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeFilter = ref('all')
const currentGroup = ref('today')

const handleEvaluate = (contract) => {
  // Extract company name from meta (simple heuristic: splitting by '·')
  const companyName = contract.meta.split('·')[0].trim()
  router.push({
    path: '/profile/rating',
    query: { target: companyName, id: contract.id }
  })
}

const filters = [
  { id: 'all', label: '全部' }
]

// Category navigation structure
const categories = [
  {
    id: 'time',
    title: '时间',
    items: [
      { id: 'recent_7', label: '最近7天' },
      { id: 'recent_30', label: '最近30天' },
      { id: 'recent_180', label: '最近半年' }
    ]
  },
  {
    id: 'type',
    title: '合同类别',
    items: [
      { id: 'type_loan', label: '借款' },
      { id: 'type_lease', label: '租赁' },
      { id: 'type_labor', label: '劳务' },
      { id: 'type_sale', label: '买卖' },
      { id: 'type_other', label: '其他' }
    ]
  },
  {
    id: 'status',
    title: '合同状态',
    items: [
      { id: 'expiring', label: '即将到期' },
      { id: 'waiting_me', label: '待我签署' },
      { id: 'waiting_others', label: '待对方签署' },
      { id: 'completed', label: '已完成' },
      { id: 'overdue', label: '已逾期' },
      { id: 'expired', label: '已失效' }
    ]
  }
]

const contracts = [
  // Today / Recent
  { id: 1, title: '市场推广采购协议 - 2024Q3', meta: '腾讯科技 · 280k', type: 'purchase', status: 'pending', group: 'today', date: '2024-01-20', dueDate: '2024-01-22' },
  { id: 2, title: '核心技术人员NDA保密协议', meta: '王明 · 个人', type: 'nda', status: 'completed', group: 'today', date: '2024-01-20', dueDate: '2025-01-20' },
  { id: 3, title: '云服务器租赁合同', meta: '阿里云 · 156k/年', type: 'service', status: 'pending', group: 'today', date: '2024-01-19', dueDate: '2024-02-19' },
  
  // Week
  { id: 4, title: '年度办公设备采购合同', meta: '联想集团 · 89k', type: 'purchase', status: 'draft', group: 'week', date: '2024-01-18', dueDate: '2024-01-25' },
  { id: 5, title: '软件定制开发协议', meta: '某科技公司 · 500k', type: 'service', status: 'rejected', group: 'week', date: '2024-01-17', dueDate: '2024-01-30' },
  { id: 6, title: '2024年度设备租赁协议', meta: '顺丰速运 · 120k', type: 'service', status: 'pending', group: 'week', date: '2024-01-16', dueDate: '2024-01-23' },
  { id: 7, title: '临时劳务派遣合同', meta: '中智人力 · 30人/天', type: 'other', status: 'completed', group: 'week', date: '2024-01-15', dueDate: '2024-01-15' },

  // Loans (借款)
  { id: 101, title: '短期流动资金借款合同', meta: '招商银行 · 500w', type: 'type_loan', status: 'processing', group: 'month', date: '2023-12-10', dueDate: '2024-12-10' },
  { id: 102, title: '企业信用贷款协议', meta: '建设银行 · 200w', type: 'type_loan', status: 'completed', group: 'month', date: '2023-11-05', dueDate: '2024-11-05' },
  
  // Lease (租赁)
  { id: 201, title: '总部大楼办公室租赁合同', meta: '华润置地 · 350k/月', type: 'type_lease', status: 'processing', group: 'month', date: '2023-10-01', dueDate: '2026-10-01' },
  { id: 202, title: '车辆长期租赁协议', meta: '神州租车 · 10台', type: 'type_lease', status: 'expiring', group: 'month', date: '2023-01-25', dueDate: '2024-01-25' },
  { id: 203, title: '仓库租赁续约合同', meta: '普洛斯物流 · 2000平', type: 'type_lease', status: 'completed', group: 'month', date: '2023-12-20', dueDate: '2024-12-20' },

  // Labor (劳务)
  { id: 301, title: '兼职人员劳务协议 - 设计', meta: '李思思 · 个人', type: 'type_labor', status: 'pending', group: 'month', date: '2024-01-10', dueDate: '2024-02-10' },
  { id: 302, title: '外包清洁服务合同', meta: '洁亮保洁 · 15k/月', type: 'type_labor', status: 'processing', group: 'month', date: '2023-12-01', dueDate: '2024-12-01' },
  { id: 303, title: '专家顾问咨询协议', meta: '张教授 · 50k', type: 'type_labor', status: 'completed', group: 'month', date: '2023-11-15', dueDate: '2023-12-15' },

  // Sales (买卖)
  { id: 401, title: 'Q1产品销售框架合同', meta: '京东商城 · 2000w', type: 'type_sale', status: 'processing', group: 'month', date: '2024-01-01', dueDate: '2024-03-31' },
  { id: 402, title: '设备采购订单 #2024001', meta: '西门子中国 · 50w', type: 'type_sale', status: 'waiting_others', group: 'month', date: '2024-01-12', dueDate: '2024-01-22' },
  { id: 403, title: '原材料由于采购合同', meta: '宝钢股份 · 500吨', type: 'type_sale', status: 'completed', group: 'month', date: '2023-12-05', dueDate: '2023-12-25' },

  // Other (其他)
  { id: 501, title: '战略合作备忘录', meta: '字节跳动', type: 'type_other', status: 'completed', group: 'month', date: '2023-11-20', dueDate: '2024-11-20' },
  { id: 502, title: '知识产权授权书', meta: 'Adobe Systems', type: 'type_other', status: 'expired', group: 'month', date: '2022-01-01', dueDate: '2023-01-01' },
  
  // Status check items
  { id: 601, title: '即将到期测试合同 A', meta: '测试公司 A', type: 'type_other', status: 'expiring', group: 'month', date: '2023-01-22', dueDate: '2024-01-22' },
  { id: 602, title: '已逾期测试合同 B', meta: '测试公司 B', type: 'type_other', status: 'overdue', group: 'month', date: '2023-01-01', dueDate: '2024-01-01' },
  { id: 603, title: '待我签署测试合同 C', meta: '测试公司 C', type: 'type_other', status: 'waiting_me', group: 'month', date: '2024-01-18', dueDate: '2024-01-25' }
]

const filteredContracts = computed(() => {
  const filter = activeFilter.value
  if (filter === 'all') return contracts
  
  // Status Filters
  if (filter === 'waiting_me') return contracts.filter(c => c.status === 'pending' || c.status === 'waiting_me')
  if (filter === 'waiting_others') return contracts.filter(c => c.status === 'processing' || c.status === 'waiting_others')
  if (filter === 'expiring') {
    const today = new Date().toISOString().split('T')[0]
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    return contracts.filter(c => c.dueDate >= today && c.dueDate <= nextWeek)
  }
  
  // Time Filters
  if (filter.startsWith('recent_')) {
    const days = parseInt(filter.split('_')[1])
    const thresholdDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    return contracts.filter(c => c.date >= thresholdDate)
  }
  
  // Type Filters
  if (filter.startsWith('type_')) {
    return contracts.filter(c => c.type === filter)
  }
  
  // Default Status Filter
  return contracts.filter(c => c.status === filter)
})

const groupedContracts = computed(() => {
  // Simple grouping for demo, show all in "today" if filtered, unless it's the default view
  if (activeFilter.value !== 'all') {
    return { today: filteredContracts.value, week: [] }
  }
  
  return {
    today: filteredContracts.value.filter(c => c.group === 'today'),
    week: filteredContracts.value.filter(c => c.group === 'week' || c.group === 'month') 
  }
})

onMounted(() => {
  if (route.query.filter) {
    activeFilter.value = route.query.filter
  }
})

watch(() => route.query.filter, (newVal) => {
  if (newVal) {
    activeFilter.value = newVal
  }
})
</script>

<template>
  <div class="h-full pb-[80px]">
    <!-- Header -->
    <header class="sticky top-0 z-30 bg-gray-50/90 backdrop-blur-md px-4 py-4">
      <h1 class="text-2xl font-bold text-gray-900 mb-1">合同库</h1>
      <p class="text-sm text-gray-500">共 {{ contracts.length }} 份合同</p>
    </header>

    <!-- Search & Filter -->
    <div class="px-4 mb-4">
      <div class="flex gap-2 mb-4">
        <div class="flex-1 relative">
          <PhMagnifyingGlass :size="18" weight="bold" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="搜索合同..." class="w-full bg-white rounded-2xl py-3 pl-11 pr-4 text-sm shadow-sm border border-transparent focus:border-primary-300 outline-none">
        </div>
        <button class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-600 shadow-sm border border-transparent hover:border-primary-300 hover:text-primary-600">
          <PhFaders :size="20" weight="bold" />
        </button>
      </div>
      
      <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-4">
        <button 
          v-for="tab in filters" 
          :key="tab.id"
          @click="activeFilter = tab.id"
          class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border"
          :class="activeFilter === tab.id ? 'bg-primary-500 text-white border-primary-500 shadow-md transform scale-105' : 'bg-white text-gray-500 border-gray-200 hover:border-primary-300'"
        >
          {{ tab.label }}
        </button>
      </div>
      
      <!-- Category Navigation -->
      <div class="flex flex-col gap-4 mb-4">
        <div v-for="category in categories" :key="category.id" class="animate-fade-in-up">
          <div class="px-4 text-xs font-semibold text-gray-400 mb-2">{{ category.title }}</div>
          <div class="flex gap-2 px-4 overflow-x-auto pb-2 scrollbar-none">
            <button
              v-for="item in category.items"
              :key="item.id"
              @click="activeFilter = item.id"
              class="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border whitespace-nowrap"
              :class="activeFilter === item.id ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-white text-gray-600 border-gray-100 hover:border-orange-200'"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Lists -->
    <div class="px-4 flex flex-col gap-6">
      <div v-if="groupedContracts.today.length > 0" class="animate-slide-up">
        <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ml-1">今天</h3>
        <div class="flex flex-col gap-3">
          <ContractItem v-for="c in groupedContracts.today" :key="c.id" v-bind="c" @evaluate="handleEvaluate(c)" />
        </div>
      </div>
      
      <div v-if="groupedContracts.week.length > 0" class="animate-slide-up" style="animation-delay: 100ms">
        <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ml-1">本周</h3>
        <div class="flex flex-col gap-3">
          <ContractItem v-for="c in groupedContracts.week" :key="c.id" v-bind="c" @evaluate="handleEvaluate(c)" />
        </div>
      </div>
    </div>

    <BottomNav />
  </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.animate-slide-up {
  animation: slideUp 0.4s ease-out backwards;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

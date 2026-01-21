<script setup>
import BottomNav from '@/components/layout/BottomNav.vue'
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { PhCalendarBlank, PhChartLineUp, PhTrophy } from '@phosphor-icons/vue'

const chartRef = ref(null)
const lineChartRef = ref(null)
const activeTimeRange = ref('7d')

const timeRanges = [
  { id: '7d', label: '最近7天' },
  { id: '30d', label: '最近30天' },
  { id: '6m', label: '最近半年' }
]

const lineChartData = {
  '7d': { xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'], data: [65, 82, 91, 104, 112, 128] }, // Mock data for 7d (using existing view for simplicity or update as needed)
  '30d': { xAxis: ['W1', 'W2', 'W3', 'W4'], data: [120, 150, 180, 210] },
  '6m': { xAxis: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], data: [400, 450, 500, 600, 700, 800] }
}

let pieChartInstance = null
let lineChartInstance = null

const initCharts = () => {
    // Pie Chart
  if (chartRef.value) {
      pieChartInstance = echarts.init(chartRef.value)
      pieChartInstance.setOption({
        tooltip: { trigger: 'item' },
        legend: { bottom: '5%', left: 'center', textStyle: { fontSize: 12 } },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
          label: { show: false },
          emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
          labelLine: { show: false },
          data: [
            { value: 48, name: '采购', itemStyle: { color: '#14B8A6' } },
            { value: 32, name: '销售', itemStyle: { color: '#0891B2' } },
            { value: 15, name: '保密', itemStyle: { color: '#F59E0B' } },
            { value: 5, name: '服务', itemStyle: { color: '#10B981' } }
          ]
        }]
      })
  }

  // Line Chart
  if (lineChartRef.value) {
      lineChartInstance = echarts.init(lineChartRef.value)
      updateLineChart('7d')
  }
}

const updateLineChart = (range) => {
    if (!lineChartInstance) return
    const data = lineChartData[range] || lineChartData['7d']
    
    lineChartInstance.setOption({
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', boundaryGap: false, data: data.xAxis },
    yAxis: { type: 'value' },
    series: [{
      name: '签署量',
      type: 'line',
      smooth: true,
      areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(20, 184, 166, 0.3)' },
        { offset: 1, color: 'rgba(20, 184, 166, 0.05)' }
      ])},
      lineStyle: { color: '#14B8A6', width: 3 },
      itemStyle: { color: '#14B8A6' },
      data: data.data
    }]
  })
}

onMounted(() => {
  initCharts()

  window.addEventListener('resize', () => {
    pieChartInstance?.resize()
    lineChartInstance?.resize()
  })
})

watch(activeTimeRange, (newRange) => {
    updateLineChart(newRange)
})

const quickStats = [
  { icon: PhCalendarBlank, label: '本月新增', value: '32', color: 'bg-primary-50 text-primary-600' },
  { icon: PhChartLineUp, label: '签署趋势', value: '+15%', color: 'bg-success-50 text-success-600' },
  { icon: PhTrophy, label: '部门排行', value: '#1', color: 'bg-warning-50 text-warning-600' }
]
</script>

<template>
  <div class="h-full pb-[80px]">
    <header class="sticky top-0 z-30 bg-gray-50/90 backdrop-blur-md px-4 py-4">
      <h1 class="text-2xl font-bold text-gray-900 mb-1">数据统计</h1>
      <p class="text-sm text-gray-500">实时掌握合同动态</p>
    </header>

    <div class="px-4">
      
      <!-- Time Filters -->
      <div class="flex justify-center mb-6">
        <div class="bg-white p-1 rounded-xl shadow-sm inline-flex">
            <button 
                v-for="range in timeRanges" 
                :key="range.id"
                @click="activeTimeRange = range.id"
                class="px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                :class="activeTimeRange === range.id ? 'bg-primary-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'"
            >
                {{ range.label }}
            </button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-3 gap-3 mb-6">
        <div v-for="(stat, i) in quickStats" :key="i" class="bg-white rounded-2xl p-4 shadow-card text-center">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2" :class="stat.color">
            <component :is="stat.icon" :size="22" weight="fill" />
          </div>
          <div class="text-lg font-bold text-gray-900">{{ stat.value }}</div>
          <div class="text-xs text-gray-500">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Pie Chart -->
      <section class="bg-white rounded-2xl p-5 shadow-card mb-6 animate-fade-in-up">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">合同类型分布</h2>
        <div ref="chartRef" class="w-full h-64"></div>
      </section>

      <!-- Line Chart -->
      <section class="bg-white rounded-2xl p-5 shadow-card animate-fade-in-up">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">签署趋势</h2>
        <div ref="lineChartRef" class="w-full h-64"></div>
      </section>
    </div>

    <BottomNav />
  </div>
</template>

---
name: vue-development
description: Vue.js 3 开发最佳实践和项目规范，适用于本经理系统项目的前端开发
---

# Vue.js 3 开发技能

本技能为经理系统项目提供 Vue.js 3 开发的最佳实践和规范指导。

## 项目技术栈

- **框架**: Vue.js 3 (Composition API)
- **构建工具**: Vite
- **路由**: Vue Router 4
- **样式**: TailwindCSS
- **图标**: Material Design Icons

## 组件开发规范

### 文件组织结构
```
src/
├── components/          # 可复用组件
│   ├── layout/          # 布局组件 (BottomNav, Header等)
│   └── common/          # 通用组件 (Button, Card等)
├── views/               # 页面视图
├── router/              # 路由配置
├── assets/              # 静态资源
└── stores/              # 状态管理 (如需Pinia)
```

### 组件命名规范
- **页面组件**: PascalCase，如 `Dashboard.vue`, `Profile.vue`
- **通用组件**: PascalCase，如 `BottomNav.vue`, `WarningCard.vue`
- **组件文件名应与组件name保持一致**

### Composition API 最佳实践

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'

// Props 定义
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

// Emits 定义
const emit = defineEmits(['update', 'delete'])

// 响应式数据
const count = ref(0)

// 计算属性
const doubled = computed(() => count.value * 2)

// 方法
const handleClick = () => {
  count.value++
  emit('update', count.value)
}

// 生命周期
onMounted(() => {
  console.log('组件已挂载')
})
</script>
```

## TailwindCSS 使用规范

### 响应式设计
- 使用移动优先策略
- 断点: `sm:`, `md:`, `lg:`, `xl:`

### 常用样式类
```html
<!-- 卡片容器 -->
<div class="bg-white rounded-xl shadow-lg p-4">

<!-- 渐变背景 -->
<div class="bg-gradient-to-r from-blue-500 to-purple-500">

<!-- Flex 布局 -->
<div class="flex items-center justify-between gap-4">

<!-- 过渡动画 -->
<button class="transition-all duration-300 hover:scale-105">
```

## 路由配置规范

```javascript
// 路由元信息
{
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/views/Dashboard.vue'),
  meta: {
    title: '仪表盘',
    requiresAuth: true,
    showNav: true
  }
}
```

## 代码质量检查清单

- [ ] 组件是否有明确的单一职责
- [ ] Props 是否有类型定义和验证
- [ ] 事件是否使用 emit 正确触发
- [ ] 是否避免了直接修改 props
- [ ] 是否正确清理了副作用 (onUnmounted)
- [ ] 是否使用了语义化 HTML 标签
- [ ] 是否有适当的加载状态处理
- [ ] 是否有错误边界处理

## 性能优化建议

1. **懒加载路由**: 使用 `() => import()` 动态导入
2. **图片优化**: 使用 WebP 格式，添加懒加载
3. **组件缓存**: 使用 `<KeepAlive>` 缓存频繁切换的组件
4. **虚拟滚动**: 大列表使用虚拟滚动
5. **防抖/节流**: 搜索、滚动等事件使用防抖

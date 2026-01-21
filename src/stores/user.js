import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = ref({
        name: '张经理',
        avatar: '张',
        role: '高级合同管理员'
    })

    // 模拟未读消息
    const notifications = ref(3)

    return { user, notifications }
})

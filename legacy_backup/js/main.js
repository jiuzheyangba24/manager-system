/* ========================================
   经理系统 - 主 JavaScript 文件
   ======================================== */

// 模拟数据
const mockData = {
  user: {
    name: '张经理',
    avatar: null
  },
  stats: {
    pendingSign: 4,
    waitingOthers: 12,
    completed: 128,
    trend: '+12%'
  },
  warnings: [
    {
      id: 1,
      days: 3,
      name: '2024年度设备租赁协议',
      company: '顺丰速运有限公司',
      urgent: true
    },
    {
      id: 2,
      days: 7,
      name: '高级云服务框架合同',
      company: '阿里云计算有限公司',
      urgent: false
    },
    {
      id: 3,
      days: 7,
      name: '办公场地续租协议',
      company: '万科物业管理公司',
      urgent: false
    }
  ],
  recentContracts: [
    {
      id: 1,
      title: '市场推广采购协议 - 2024Q3',
      meta: '更新于 2 小时前 · 投资平节能出品公司',
      type: 'purchase',
      status: 'pending'
    },
    {
      id: 2,
      title: '核心技术人员NDA保密协议',
      meta: '更新于 5 小时前 · 王明',
      type: 'nda',
      status: 'completed'
    },
    {
      id: 3,
      title: '年度IT运维服务合同',
      meta: '更新于 1 天前 · 华为技术有限公司',
      type: 'service',
      status: 'pending'
    }
  ]
};

// 工具函数
const utils = {
  // 获取问候语
  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 6) return '凌晨好';
    if (hour < 9) return '早上好';
    if (hour < 12) return '上午好';
    if (hour < 14) return '中午好';
    if (hour < 18) return '下午好';
    if (hour < 22) return '晚上好';
    return '夜深了';
  },

  // 格式化数字（补零）
  formatNumber(num, digits = 2) {
    return String(num).padStart(digits, '0');
  },

  // 防抖函数
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // 节流函数
  throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
};

// 页面初始化
class App {
  constructor() {
    this.init();
  }

  init() {
    this.updateGreeting();
    this.bindEvents();
    this.initAnimations();
    this.updateActiveNav();
  }

  // 更新问候语
  updateGreeting() {
    const greetingEl = document.getElementById('greeting-text');
    if (greetingEl) {
      greetingEl.textContent = utils.getGreeting();
    }
  }

  // 绑定事件
  bindEvents() {
    // 搜索框事件
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', utils.debounce((e) => {
        this.handleSearch(e.target.value);
      }, 300));

      searchInput.addEventListener('focus', () => {
        searchInput.parentElement.style.transform = 'scale(1.02)';
      });

      searchInput.addEventListener('blur', () => {
        searchInput.parentElement.style.transform = 'scale(1)';
      });
    }

    // 统计卡片点击事件
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        this.handleStatCardClick(index);
      });
    });

    // 合同项点击事件
    const contractItems = document.querySelectorAll('.contract-item');
    contractItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.handleContractClick(index);
      });
    });

    // 预警项点击事件
    const warningItems = document.querySelectorAll('.warning-item');
    warningItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.handleWarningClick(index);
      });
    });

    // 通知按钮点击事件
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
      notificationBtn.addEventListener('click', () => {
        this.showNotifications();
      });
    }

    // 用户头像点击事件
    const userAvatar = document.getElementById('userAvatar');
    if (userAvatar) {
      userAvatar.addEventListener('click', () => {
        window.location.href = 'profile.html';
      });
    }
  }

  // 初始化动画
  initAnimations() {
    // 使用 Intersection Observer 实现滚动动画
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // 观察需要动画的元素
    document.querySelectorAll('.stat-card, .contract-item, .warning-item').forEach((el) => {
      observer.observe(el);
    });
  }

  // 更新活跃导航项
  updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach((item) => {
      const href = item.getAttribute('href');
      if (href === currentPage) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // 处理搜索
  handleSearch(query) {
    console.log('搜索:', query);
    // 这里可以实现搜索逻辑
    if (query.length > 0) {
      // 显示搜索结果
      this.showToast(`正在搜索: ${query}`);
    }
  }

  // 处理统计卡片点击
  handleStatCardClick(index) {
    const types = ['pending', 'waiting', 'completed'];
    const messages = ['查看待签署合同', '查看等待处理的合同', '查看已完成的合同'];
    
    // 添加点击动画
    const card = document.querySelectorAll('.stat-card')[index];
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
      card.style.transform = '';
    }, 150);

    this.showToast(messages[index]);
    
    // 可以跳转到对应筛选的合同列表
    // window.location.href = `contracts.html?filter=${types[index]}`;
  }

  // 处理合同点击
  handleContractClick(index) {
    const contract = mockData.recentContracts[index];
    if (contract) {
      this.showToast(`打开合同: ${contract.title}`);
      // window.location.href = `contract-detail.html?id=${contract.id}`;
    }
  }

  // 处理预警点击
  handleWarningClick(index) {
    const warning = mockData.warnings[index];
    if (warning) {
      this.showToast(`查看预警: ${warning.name}`);
      // window.location.href = `contract-detail.html?id=${warning.id}`;
    }
  }

  // 显示通知
  showNotifications() {
    this.showToast('暂无新通知');
  }

  // 显示 Toast 提示
  showToast(message, duration = 2000) {
    // 移除已存在的 toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    // 创建新的 toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 24px;
      border-radius: 25px;
      font-size: 14px;
      z-index: 1000;
      opacity: 0;
      transition: all 0.3s ease;
    `;

    document.body.appendChild(toast);

    // 显示动画
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    // 自动消失
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

// 当 DOM 加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});

// 导出工具函数和模拟数据供其他页面使用
window.utils = utils;
window.mockData = mockData;

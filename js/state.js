/**
 * 状态管理模块
 * 负责管理应用的核心状态数据
 */
const AppState = (function() {
    // 默认状态数据
    const DEFAULT_STATE = {
        themeColor: '#2563eb',
        template: 'minimalist',
        basics: {
            name: '陈美灵',
            title: '高级前端开发工程师',
            phone: '139-8888-6666',
            email: 'meiling.chen@example.com',
            location: '上海·徐汇',
            website: 'github.com/meiling',
            avatar: ''
        },
        education: [
            { institution: '同济大学', area: '软件工程', studyType: '本科', startDate: '2016.09', endDate: '2020.06' }
        ],
        work: [
            { company: '某大厂技术中心', position: '前端负责人', startDate: '2021.03', endDate: '至今', summary: '1. 主导了核心业务平台的重构，将首屏渲染速度提升了 60%；\n2. 负责设计并实现了企业级低代码平台，支撑了内部 50+ 项目的快速上线；\n3. 制定了团队前端规范与 CI/CD 流程，提升开发效率 30%。' }
        ],
        projects: [
            { name: '个人简历编辑器', role: '独立开发者', startDate: '2023.10', endDate: '至今', description: '使用原生 JS + html2pdf 开发的高性能简历编辑工具，支持自适应布局与高清 PDF 导出。' }
        ],
        skills: ['React', 'Vue', 'TypeScript', 'Node.js', 'Vite', 'Three.js'],
        summary: '5 年互联网从业经验，深耕前端工程化与性能优化。擅长处理复杂交互与跨端开发，具备良好的架构思维。'
    };

    // 当前状态
    let state = JSON.parse(JSON.stringify(DEFAULT_STATE));

    // 状态变更监听器
    const listeners = [];

    /**
     * 获取当前状态
     * @returns {Object} 当前状态的深拷贝
     */
    function getState() {
        return JSON.parse(JSON.stringify(state));
    }

    /**
     * 设置状态（部分更新）
     * @param {Object} newState - 要更新的状态部分
     */
    function setState(newState) {
        state = { ...state, ...newState };
        notifyListeners();
    }

    /**
     * 根据路径设置状态值
     * @param {string} path - 路径，如 'basics.name' 或 'education.0.institution'
     * @param {*} value - 要设置的值
     */
    function setByPath(path, value) {
        const keys = path.split('.');
        let current = state;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            // 处理数组索引
            if (/^\d+$/.test(key)) {
                const index = parseInt(key, 10);
                if (!current[index]) {
                    current[index] = {};
                }
                current = current[index];
            } else {
                if (!current[key]) {
                    current[key] = {};
                }
                current = current[key];
            }
        }
        
        current[keys[keys.length - 1]] = value;
        notifyListeners();
    }

    /**
     * 根据路径获取状态值
     * @param {string} path - 路径，如 'basics.name'
     * @returns {*} 状态值
     */
    function getByPath(path) {
        const keys = path.split('.');
        let current = state;
        
        for (const key of keys) {
            if (current === undefined || current === null) {
                return undefined;
            }
            // 处理数组索引
            if (/^\d+$/.test(key)) {
                current = current[parseInt(key, 10)];
            } else {
                current = current[key];
            }
        }
        
        return current;
    }

    /**
     * 添加数组项
     * @param {string} key - 数组键名（如 'education', 'work', 'projects', 'skills'）
     * @param {*} item - 要添加的项
     */
    function addItem(key, item) {
        if (!Array.isArray(state[key])) {
            state[key] = [];
        }
        state[key].push(item);
        notifyListeners();
    }

    /**
     * 移除数组项
     * @param {string} key - 数组键名
     * @param {number} index - 要移除的索引
     */
    function removeItem(key, index) {
        if (Array.isArray(state[key]) && index >= 0 && index < state[key].length) {
            state[key].splice(index, 1);
            notifyListeners();
        }
    }

    /**
     * 更新数组项
     * @param {string} key - 数组键名
     * @param {number} index - 数组索引
     * @param {string} field - 字段名
     * @param {*} value - 新值
     */
    function updateItem(key, index, field, value) {
        if (Array.isArray(state[key]) && index >= 0 && index < state[key].length) {
            state[key][index][field] = value;
            notifyListeners();
        }
    }

    /**
     * 添加技能标签
     * @param {string} skill - 技能名称
     */
    function addSkill(skill) {
        const trimmedSkill = skill.trim();
        if (trimmedSkill && !state.skills.includes(trimmedSkill)) {
            state.skills.push(trimmedSkill);
            notifyListeners();
        }
    }

    /**
     * 移除技能标签
     * @param {number} index - 索引
     */
    function removeSkill(index) {
        if (index >= 0 && index < state.skills.length) {
            state.skills.splice(index, 1);
            notifyListeners();
        }
    }

    /**
     * 重置为默认状态
     */
    function reset() {
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        notifyListeners();
    }

    /**
     * 直接替换整个状态（用于从存储加载）
     * @param {Object} newState - 新状态
     */
    function replace(newState) {
        state = { ...DEFAULT_STATE, ...newState };
        notifyListeners();
    }

    /**
     * 添加状态变更监听器
     * @param {Function} listener - 回调函数
     * @returns {Function} 移除监听器的函数
     */
    function subscribe(listener) {
        listeners.push(listener);
        return () => {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }

    /**
     * 通知所有监听器状态已变更
     */
    function notifyListeners() {
        listeners.forEach(listener => {
            try {
                listener(getState());
            } catch (error) {
                console.error('状态监听器执行错误:', error);
            }
        });
    }

    // 暴露公共API
    return {
        getState,
        setState,
        setByPath,
        getByPath,
        addItem,
        removeItem,
        updateItem,
        addSkill,
        removeSkill,
        reset,
        replace,
        subscribe
    };
})();

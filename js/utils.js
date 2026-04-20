/**
 * 工具函数模块
 * 包含通用的辅助函数
 */
const Utils = (function() {
    /**
     * 创建DOM元素
     * @param {string} tagName - 标签名
     * @param {Object} attributes - 属性对象
     * @param {Array|string|Node} children - 子元素
     * @returns {HTMLElement} 创建的DOM元素
     */
    function createElement(tagName, attributes = {}, children = []) {
        const element = document.createElement(tagName);
        
        // 设置属性
        for (const [key, value] of Object.entries(attributes)) {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'style' && typeof value === 'object') {
                Object.assign(element.style, value);
            } else if (key.startsWith('data-')) {
                element.setAttribute(key, value);
            } else if (key.startsWith('on') && typeof value === 'function') {
                const eventName = key.slice(2).toLowerCase();
                element.addEventListener(eventName, value);
            } else if (value !== undefined && value !== null) {
                element.setAttribute(key, value);
            }
        }
        
        // 添加子元素
        const childArray = Array.isArray(children) ? children : [children];
        for (const child of childArray) {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                element.appendChild(child);
            }
        }
        
        return element;
    }

    /**
     * 清空元素的所有子元素
     * @param {HTMLElement} element - DOM元素
     */
    function clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    /**
     * 生成时间文本
     * @param {string} start - 开始时间
     * @param {string} end - 结束时间
     * @returns {string} 格式化的时间文本
     */
    function getTimeText(start, end) {
        if (!start && !end) return '';
        return `${start || ''}${(start && end) ? ' - ' : ''}${end || ''}`;
    }

    /**
     * 安全的文本转义（用于防止XSS）
     * @param {string} text - 原始文本
     * @returns {string} 转义后的文本
     */
    function escapeHtml(text) {
        if (text === undefined || text === null) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * 防抖函数
     * @param {Function} func - 要执行的函数
     * @param {number} wait - 等待时间（毫秒）
     * @returns {Function} 防抖后的函数
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * 节流函数
     * @param {Function} func - 要执行的函数
     * @param {number} limit - 时间限制（毫秒）
     * @returns {Function} 节流后的函数
     */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * 从本地存储加载数据
     * @param {string} key - 存储键名
     * @returns {Object|null} 解析后的数据或null
     */
    function loadFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('从本地存储加载数据失败:', error);
            return null;
        }
    }

    /**
     * 保存数据到本地存储
     * @param {string} key - 存储键名
     * @param {Object} data - 要存储的数据
     */
    function saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('保存数据到本地存储失败:', error);
        }
    }

    /**
     * 从本地存储移除数据
     * @param {string} key - 存储键名
     */
    function removeFromStorage(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('从本地存储移除数据失败:', error);
        }
    }

    // 暴露公共API
    return {
        createElement,
        clearElement,
        getTimeText,
        escapeHtml,
        debounce,
        throttle,
        loadFromStorage,
        saveToStorage,
        removeFromStorage
    };
})();

/**
 * 本地存储模块
 * 负责管理简历数据的本地存储
 */
const StorageModule = (function() {
    const STORAGE_KEY = 'resume_data_v3';

    /**
     * 保存状态到本地存储
     */
    function save() {
        const state = AppState.getState();
        Utils.saveToStorage(STORAGE_KEY, state);
    }

    /**
     * 从本地存储加载状态
     * @returns {Object|null} 加载的状态或null
     */
    function load() {
        return Utils.loadFromStorage(STORAGE_KEY);
    }

    /**
     * 清除本地存储
     */
    function clear() {
        Utils.removeFromStorage(STORAGE_KEY);
    }

    /**
     * 初始化存储模块
     * 订阅状态变更，自动保存
     */
    function init() {
        // 从存储加载初始数据
        const savedState = load();
        if (savedState) {
            AppState.replace(savedState);
        }
        
        // 订阅状态变更，自动保存
        AppState.subscribe(() => {
            save();
        });
    }

    // 暴露公共API
    return {
        save,
        load,
        clear,
        init
    };
})();

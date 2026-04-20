/**
 * 应用主入口
 * 整合所有模块并初始化应用
 */
const ResumeEditorApp = (function() {
    /**
     * 切换视图（编辑/预览）
     * @param {string} view - 视图名称 ('edit' 或 'preview')
     */
    function switchView(view) {
        document.body.classList.remove('view-edit', 'view-preview');
        document.body.classList.add(`view-${view}`);
        
        // 更新导航按钮状态
        document.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.remove('active'));
        const activeNavBtn = document.getElementById(`nav-${view}`);
        if (activeNavBtn) {
            activeNavBtn.classList.add('active');
        }
        
        // 如果切换到预览视图，自动调整缩放
        if (view === 'preview') {
            autoScalePreview();
        }
    }

    /**
     * 自动调整预览区域缩放
     */
    function autoScalePreview() {
        const container = document.querySelector('.preview-container');
        const paper = document.getElementById('resume-content');
        if (!container || !paper) return;

        const padding = window.innerWidth < 768 ? 20 : 80;
        const containerWidth = container.offsetWidth - padding;
        const paperWidth = 794; 
        
        if (containerWidth < paperWidth) {
            const scale = containerWidth / paperWidth;
            paper.style.transform = `scale(${scale})`;
            paper.parentElement.style.height = (paper.offsetHeight * scale) + 'px';
        } else {
            paper.style.transform = 'none';
            paper.parentElement.style.height = 'auto';
        }
    }

    /**
     * 关闭润色模态框
     */
    function closePolishModal() {
        const modal = document.getElementById('polish-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    /**
     * 初始化视图切换事件
     */
    function initViewEvents() {
        // 编辑视图按钮
        const editBtn = document.getElementById('nav-edit');
        if (editBtn) {
            editBtn.addEventListener('click', () => switchView('edit'));
        }
        
        // 预览视图按钮
        const previewBtn = document.getElementById('nav-preview');
        if (previewBtn) {
            previewBtn.addEventListener('click', () => switchView('preview'));
        }
    }

    /**
     * 初始化模态框事件
     */
    function initModalEvents() {
        // 关闭按钮
        const closeBtn = document.getElementById('btn-close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closePolishModal);
        }
        
        // 取消按钮
        const cancelBtn = document.getElementById('btn-cancel-modal');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closePolishModal);
        }
    }

    /**
     * 渲染所有内容
     */
    function renderAll() {
        const state = AppState.getState();
        
        // 应用主题颜色
        TemplateModule.applyTheme(state.themeColor);
        
        // 渲染表单
        FormComponent.render(state);
        
        // 渲染预览
        PreviewComponent.render(state);
        
        // 调整预览缩放
        autoScalePreview();
    }

    /**
     * 初始化应用
     */
    function init() {
        // 初始化存储模块（从本地存储加载数据）
        StorageModule.init();
        
        // 初始化事件绑定
        FormComponent.initEvents();
        TemplateModule.initEvents();
        ExportModule.initEvents();
        initViewEvents();
        initModalEvents();
        
        // 订阅状态变更，自动重新渲染
        AppState.subscribe((newState) => {
            renderAll();
        });
        
        // 初始渲染
        renderAll();
        
        // 初始化Lucide图标
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
        
        // 窗口大小改变时调整预览缩放
        window.addEventListener('resize', Utils.throttle(autoScalePreview, 100));
        
        // 设置颜色选择器初始值
        const colorPicker = document.getElementById('theme-color-picker');
        if (colorPicker) {
            const state = AppState.getState();
            colorPicker.value = state.themeColor;
        }
    }

    // 页面加载完成后初始化
    window.addEventListener('DOMContentLoaded', init);

    // 暴露公共API
    return {
        init,
        switchView,
        autoScalePreview,
        closePolishModal,
        renderAll
    };
})();

/**
 * 模板切换模块
 * 负责管理简历模板的切换逻辑
 */
const TemplateModule = (function() {
    /**
     * 切换模板
     * @param {string} templateName - 模板名称 ('minimalist' 或 'professional')
     */
    function switchTemplate(templateName) {
        // 更新状态
        AppState.setState({ template: templateName });
        
        // 更新按钮状态
        const templateButtons = document.querySelectorAll('.toolbar .btn-outline');
        templateButtons.forEach(btn => btn.classList.remove('btn-active'));
        
        const activeButton = document.getElementById(`btn-tpl-${templateName}`);
        if (activeButton) {
            activeButton.classList.add('btn-active');
        }
    }

    /**
     * 应用主题颜色
     * @param {string} color - 主题颜色值
     */
    function applyTheme(color) {
        document.documentElement.style.setProperty('--primary-color', color);
    }

    /**
     * 初始化模板切换事件
     */
    function initEvents() {
        // 简约模板按钮
        const minimalistBtn = document.getElementById('btn-tpl-minimalist');
        if (minimalistBtn) {
            minimalistBtn.addEventListener('click', () => switchTemplate('minimalist'));
        }
        
        // 商务模板按钮
        const professionalBtn = document.getElementById('btn-tpl-professional');
        if (professionalBtn) {
            professionalBtn.addEventListener('click', () => switchTemplate('professional'));
        }
    }

    // 暴露公共API
    return {
        switchTemplate,
        applyTheme,
        initEvents
    };
})();

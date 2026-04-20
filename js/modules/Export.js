/**
 * PDF导出模块
 * 负责处理简历PDF导出功能
 */
const ExportModule = (function() {
    /**
     * 导出PDF
     */
    function exportPDF() {
        const element = document.getElementById('resume-content');
        if (!element) {
            alert('未找到简历内容，请刷新页面重试！');
            return;
        }
        
        const state = AppState.getState();
        
        const opt = {
            margin: 0,
            filename: `${state.basics.name || '我的简历'}-${state.basics.title || '简历'}.pdf`,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['css', 'legacy'] }
        };
        
        // 保存原始样式
        const originalTransform = element.style.transform;
        
        // 移除缩放变换以确保导出质量
        element.style.transform = 'none';

        // 检查html2pdf是否可用
        if (typeof html2pdf === 'undefined') {
            alert('PDF导出库加载失败，请刷新页面重试！');
            element.style.transform = originalTransform;
            return;
        }

        html2pdf().set(opt).from(element).save().then(() => {
            element.style.transform = originalTransform;
            alert('PDF导出成功！');
        }).catch(err => {
            element.style.transform = originalTransform;
            alert('PDF导出失败，请重试！');
            console.error('导出失败:', err);
        });
    }

    /**
     * 初始化导出事件
     */
    function initEvents() {
        // 桌面端导出按钮
        const exportBtn = document.getElementById('btn-export-pdf');
        if (exportBtn) {
            exportBtn.addEventListener('click', exportPDF);
        }
        
        // 移动端导出按钮
        const mobileExportBtn = document.getElementById('btn-export-mobile');
        if (mobileExportBtn) {
            mobileExportBtn.addEventListener('click', exportPDF);
        }
    }

    // 暴露公共API
    return {
        exportPDF,
        initEvents
    };
})();

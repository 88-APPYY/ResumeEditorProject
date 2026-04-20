/**
 * 预览渲染组件
 * 负责渲染简历预览内容，消除innerHTML字符串拼接
 */
const PreviewComponent = (function() {
    const { createElement, clearElement, getTimeText, escapeHtml } = Utils;

    /**
     * 创建简约模板的简历内容
     * @param {Object} state - 当前状态
     * @returns {HTMLElement} 简历内容DOM元素
     */
    function createMinimalistTemplate(state) {
        const { basics, education, work, projects, skills, summary } = state;
        
        // 头像HTML
        const avatarHtml = basics.avatar ? 
            createElement('img', { 
                src: basics.avatar, 
                style: { 
                    width: '85px', 
                    height: '105px', 
                    objectFit: 'cover', 
                    borderRadius: '4px', 
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
                } 
            }) : null;

        // 头部区域
        const header = createElement('header', { 
            style: { 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                marginBottom: '1rem' 
            } 
        }, [
            createElement('div', {}, [
                createElement('h1', { className: 'res-name' }, escapeHtml(basics.name || '未填写姓名')),
                createElement('p', { className: 'res-title' }, escapeHtml(basics.title || '未填写求职意向')),
                createElement('div', { className: 'res-contact' }, [
                    createElement('span', {}, [
                        createElement('i', { 'data-lucide': 'phone', size: '10' }),
                        ` ${escapeHtml(basics.phone || '未填写电话')}`
                    ]),
                    createElement('span', {}, [
                        createElement('i', { 'data-lucide': 'mail', size: '10' }),
                        ` ${escapeHtml(basics.email || '未填写邮箱')}`
                    ]),
                    createElement('span', {}, [
                        createElement('i', { 'data-lucide': 'map-pin', size: '10' }),
                        ` ${escapeHtml(basics.location || '未填写所在地')}`
                    ])
                ])
            ]),
            avatarHtml
        ]);

        // 自我评价区域
        const summarySection = createElement('section', { style: { pageBreakInside: 'avoid' } }, [
            createElement('h2', { className: 'section-title' }, [
                createElement('i', { 'data-lucide': 'user', size: '14' }),
                ' 自我评价'
            ]),
            createElement('div', { className: 'item-content' }, escapeHtml(summary || '未填写自我评价'))
        ]);

        // 教育背景区域
        const educationSection = createElement('section', { style: { pageBreakInside: 'avoid' } }, [
            createElement('h2', { className: 'section-title' }, [
                createElement('i', { 'data-lucide': 'graduation-cap', size: '14' }),
                ' 教育背景'
            ]),
            ...(education.length > 0 ? education.map(ed => {
                const timeText = getTimeText(ed.startDate, ed.endDate);
                const majorText = ed.area || '未填写专业';
                const degreeText = ed.studyType ? `${ed.studyType}` : '';
                const subText = [majorText, degreeText].filter(Boolean).join(' | ');
                
                const educationItem = createElement('div', { className: 'education-item', style: { marginBottom: '0.5rem' } }, [
                    createElement('div', { className: 'item-header' }, [
                        createElement('span', {}, escapeHtml(ed.institution || '未填写学校')),
                        timeText ? createElement('span', {}, timeText) : null
                    ])
                ]);
                
                if (subText) {
                    educationItem.appendChild(
                        createElement('div', { className: 'item-sub' }, [
                            createElement('span', {}, subText)
                        ])
                    );
                }
                
                return educationItem;
            }) : [createElement('div', { className: 'item-content' }, '未添加教育背景')])
        ]);

        // 工作经历区域
        const workSection = createElement('section', { style: { pageBreakInside: 'avoid' } }, [
            createElement('h2', { className: 'section-title' }, [
                createElement('i', { 'data-lucide': 'briefcase', size: '14' }),
                ' 工作经历'
            ]),
            ...(work.length > 0 ? work.map(w => {
                const timeText = getTimeText(w.startDate, w.endDate);
                
                return createElement('div', { className: 'experience-item', style: { marginBottom: '0.8rem' } }, [
                    createElement('div', { className: 'item-header' }, [
                        createElement('span', {}, escapeHtml(w.company || '未填写公司')),
                        timeText ? createElement('span', {}, timeText) : null
                    ]),
                    createElement('div', { className: 'item-sub' }, [
                        createElement('span', {}, escapeHtml(w.position || '未填写职位'))
                    ]),
                    createElement('div', { className: 'item-content' }, escapeHtml(w.summary || '未填写工作内容'))
                ]);
            }) : [createElement('div', { className: 'item-content' }, '未添加工作经历')])
        ]);

        // 项目经验区域
        const projectsSection = createElement('section', { style: { pageBreakInside: 'avoid' } }, [
            createElement('h2', { className: 'section-title' }, [
                createElement('i', { 'data-lucide': 'layers', size: '14' }),
                ' 项目经验'
            ]),
            ...(projects.length > 0 ? projects.map(p => {
                const timeText = getTimeText(p.startDate, p.endDate);
                
                return createElement('div', { className: 'project-item', style: { marginBottom: '0.8rem' } }, [
                    createElement('div', { className: 'item-header' }, [
                        createElement('span', {}, escapeHtml(p.name || '未填写项目名称')),
                        timeText ? createElement('span', {}, timeText) : null
                    ]),
                    createElement('div', { className: 'item-sub' }, [
                        createElement('span', {}, escapeHtml(p.role || '未填写角色'))
                    ]),
                    createElement('div', { className: 'item-content' }, escapeHtml(p.description || '未填写项目描述'))
                ]);
            }) : [createElement('div', { className: 'item-content' }, '未添加项目经验')])
        ]);

        // 核心技能区域
        const skillsSection = createElement('section', { style: { pageBreakInside: 'avoid' } }, [
            createElement('h2', { className: 'section-title' }, [
                createElement('i', { 'data-lucide': 'code', size: '14' }),
                ' 核心技能'
            ]),
            createElement('div', {}, 
                skills.length > 0 
                    ? skills.map(s => createElement('span', { className: 'skill-tag' }, escapeHtml(s)))
                    : '未添加技能标签'
            )
        ]);

        // 组合所有部分
        const content = createElement('div', {});
        content.appendChild(header);
        content.appendChild(summarySection);
        content.appendChild(educationSection);
        content.appendChild(workSection);
        content.appendChild(projectsSection);
        content.appendChild(skillsSection);

        return content;
    }

    /**
     * 创建商务模板的简历内容
     * @param {Object} state - 当前状态
     * @returns {HTMLElement} 简历内容DOM元素
     */
    function createProfessionalTemplate(state) {
        const { basics, education, work, projects, skills, summary } = state;
        
        // 侧边栏
        const sideCol = createElement('aside', { className: 'side-col' }, [
            // 头像
            createElement('div', { style: { textAlign: 'center', marginBottom: '1.5rem' } }, [
                basics.avatar ? createElement('img', { 
                    src: basics.avatar, 
                    style: { 
                        width: '100px', 
                        height: '100px', 
                        borderRadius: '50%', 
                        objectFit: 'cover', 
                        border: '3px solid rgba(255,255,255,0.1)' 
                    } 
                }) : null
            ]),
            
            // 联系信息
            createElement('div', { className: 'side-section' }, [
                createElement('h3', { className: 'side-title' }, '联系信息'),
                createElement('div', { className: 'side-text' }, escapeHtml(basics.phone || '未填写电话')),
                createElement('div', { className: 'side-text' }, escapeHtml(basics.email || '未填写邮箱')),
                createElement('div', { className: 'side-text' }, escapeHtml(basics.location || '未填写所在地'))
            ]),
            
            // 技能专长
            createElement('div', { className: 'side-section' }, [
                createElement('h3', { className: 'side-title' }, '技能专长'),
                createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '4px' } }, 
                    skills.length > 0 
                        ? skills.map(s => createElement('span', { 
                            style: { 
                                fontSize: '0.7rem', 
                                background: 'rgba(255,255,255,0.1)', 
                                padding: '2px 5px', 
                                borderRadius: '3px' 
                            } 
                        }, escapeHtml(s)))
                        : '未添加技能'
                )
            ]),
            
            // 教育背景
            createElement('div', { className: 'side-section' }, [
                createElement('h3', { className: 'side-title' }, '教育背景'),
                ...(education.length > 0 ? education.map(ed => {
                    const timeText = getTimeText(ed.startDate, ed.endDate);
                    const majorText = ed.area || '';
                    const degreeText = ed.studyType || '';
                    
                    const detailParts = [majorText];
                    if (timeText) detailParts.push(`(${timeText})`);
                    if (degreeText) detailParts.push(`[${degreeText}]`);
                    const detailText = detailParts.filter(Boolean).join(' ');
                    
                    const educationItem = createElement('div', { style: { marginBottom: '0.8rem', fontSize: '0.75rem' } }, [
                        createElement('div', { style: { fontWeight: '700' } }, escapeHtml(ed.institution || '未填写学校'))
                    ]);
                    
                    if (detailText) {
                        educationItem.appendChild(
                            createElement('div', { style: { opacity: '0.8' } }, detailText)
                        );
                    }
                    
                    return educationItem;
                }) : [createElement('div', { className: 'side-text' }, '未添加教育背景')])
            ])
        ]);

        // 主内容区
        const mainCol = createElement('main', { className: 'main-col' }, [
            // 姓名和职位
            createElement('h1', { className: 'res-name' }, escapeHtml(basics.name || '未填写姓名')),
            createElement('p', { 
                style: { 
                    color: 'var(--primary-color)', 
                    fontWeight: '600', 
                    fontSize: '1rem', 
                    marginBottom: '1.5rem' 
                } 
            }, escapeHtml(basics.title || '未填写求职意向')),
            
            // 自我评价
            createElement('section', { style: { pageBreakInside: 'avoid' } }, [
                createElement('h2', { className: 'section-title' }, '自我评价'),
                createElement('div', { className: 'item-content' }, escapeHtml(summary || '未填写自我评价'))
            ]),
            
            // 工作实战
            createElement('section', { style: { pageBreakInside: 'avoid' } }, [
                createElement('h2', { className: 'section-title' }, '工作实战'),
                ...(work.length > 0 ? work.map(w => {
                    const timeText = getTimeText(w.startDate, w.endDate);
                    
                    return createElement('div', { className: 'experience-item', style: { marginBottom: '1rem' } }, [
                        createElement('div', { className: 'item-header' }, [
                            createElement('span', {}, escapeHtml(w.company || '未填写公司')),
                            timeText ? createElement('span', { style: { fontWeight: 'normal', fontSize: '0.75rem' } }, timeText) : null
                        ]),
                        createElement('div', { 
                            style: { 
                                color: 'var(--primary-color)', 
                                fontSize: '0.8rem', 
                                fontWeight: '600', 
                                marginBottom: '0.2rem' 
                            } 
                        }, escapeHtml(w.position || '未填写职位')),
                        createElement('div', { className: 'item-content' }, escapeHtml(w.summary || '未填写工作内容'))
                    ]);
                }) : [createElement('div', { className: 'item-content' }, '未添加工作经历')])
            ]),
            
            // 项目成果
            createElement('section', { style: { pageBreakInside: 'avoid' } }, [
                createElement('h2', { className: 'section-title' }, '项目成果'),
                ...(projects.length > 0 ? projects.map(p => {
                    const timeText = getTimeText(p.startDate, p.endDate);
                    
                    return createElement('div', { className: 'project-item', style: { marginBottom: '1rem' } }, [
                        createElement('div', { className: 'item-header' }, [
                            createElement('span', {}, escapeHtml(p.name || '未填写项目名称')),
                            timeText ? createElement('span', { style: { fontWeight: 'normal', fontSize: '0.75rem' } }, timeText) : null
                        ]),
                        createElement('div', { style: { fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '0.2rem' } }, 
                            escapeHtml(p.role || '未填写角色')
                        ),
                        createElement('div', { className: 'item-content' }, escapeHtml(p.description || '未填写项目描述'))
                    ]);
                }) : [createElement('div', { className: 'item-content' }, '未添加项目经验')])
            ])
        ]);

        // 组合模板
        const template = createElement('div', { className: 'tpl-professional' }, [
            sideCol,
            mainCol
        ]);

        return template;
    }

    /**
     * 渲染简历预览
     * @param {Object} state - 当前状态
     */
    function render(state) {
        const paper = document.getElementById('resume-content');
        if (!paper) return;
        
        // 清空内容
        clearElement(paper);
        
        // 设置模板类名
        paper.className = `resume-paper tpl-${state.template}`;
        
        // 根据模板类型创建内容
        let content;
        if (state.template === 'minimalist') {
            content = createMinimalistTemplate(state);
        } else {
            content = createProfessionalTemplate(state);
        }
        
        // 添加内容
        paper.appendChild(content);
        
        // 重新初始化Lucide图标
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    }

    // 暴露公共API
    return {
        render
    };
})();

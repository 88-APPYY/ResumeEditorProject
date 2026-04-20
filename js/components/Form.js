/**
 * 表单渲染组件
 * 负责动态渲染表单元素，消除innerHTML字符串拼接
 */
const FormComponent = (function() {
    const { createElement, clearElement, escapeHtml } = Utils;

    /**
     * 创建教育经历表单项
     * @param {Object} item - 教育经历数据
     * @param {number} index - 索引
     * @returns {HTMLElement} 表单项DOM元素
     */
    function createEducationItem(item, index) {
        const itemEntry = createElement('div', { className: 'item-entry' }, [
            // 删除按钮
            createElement('div', { 
                className: 'btn-delete',
                onclick: () => AppState.removeItem('education', index)
            }, '✕'),
            
            // 第一行：学校和专业
            createElement('div', { className: 'row' }, [
                createElement('input', {
                    className: 'form-control',
                    placeholder: '学校',
                    value: escapeHtml(item.institution || ''),
                    oninput: (e) => AppState.updateItem('education', index, 'institution', e.target.value)
                }),
                createElement('input', {
                    className: 'form-control',
                    placeholder: '专业',
                    value: escapeHtml(item.area || ''),
                    oninput: (e) => AppState.updateItem('education', index, 'area', e.target.value)
                })
            ]),
            
            // 第二行：学历
            createElement('div', { className: 'row' }, [
                createElement('input', {
                    className: 'form-control',
                    placeholder: '学历 (如：本科/硕士)',
                    value: escapeHtml(item.studyType || ''),
                    oninput: (e) => AppState.updateItem('education', index, 'studyType', e.target.value)
                })
            ]),
            
            // 时间编辑行
            createElement('div', { className: 'row-time' }, [
                createElement('input', {
                    className: 'form-control',
                    placeholder: '开始时间 (如：2016.09)',
                    value: escapeHtml(item.startDate || ''),
                    oninput: (e) => AppState.updateItem('education', index, 'startDate', e.target.value)
                }),
                createElement('div', { className: 'divider' }, '-'),
                createElement('input', {
                    className: 'form-control',
                    placeholder: '结束时间 (如：2020.06)',
                    value: escapeHtml(item.endDate || ''),
                    oninput: (e) => AppState.updateItem('education', index, 'endDate', e.target.value)
                })
            ])
        ]);
        
        return itemEntry;
    }

    /**
     * 创建工作经历表单项
     * @param {Object} item - 工作经历数据
     * @param {number} index - 索引
     * @returns {HTMLElement} 表单项DOM元素
     */
    function createWorkItem(item, index) {
        const itemEntry = createElement('div', { className: 'item-entry' }, [
            // 删除按钮
            createElement('div', { 
                className: 'btn-delete',
                onclick: () => AppState.removeItem('work', index)
            }, '✕'),
            
            // 第一行：公司和职位
            createElement('div', { className: 'row' }, [
                createElement('input', {
                    className: 'form-control',
                    placeholder: '公司',
                    value: escapeHtml(item.company || ''),
                    oninput: (e) => AppState.updateItem('work', index, 'company', e.target.value)
                }),
                createElement('input', {
                    className: 'form-control',
                    placeholder: '职位',
                    value: escapeHtml(item.position || ''),
                    oninput: (e) => AppState.updateItem('work', index, 'position', e.target.value)
                })
            ]),
            
            // 时间编辑行
            createElement('div', { className: 'row-time' }, [
                createElement('input', {
                    className: 'form-control',
                    placeholder: '开始时间 (如：2021.03)',
                    value: escapeHtml(item.startDate || ''),
                    oninput: (e) => AppState.updateItem('work', index, 'startDate', e.target.value)
                }),
                createElement('div', { className: 'divider' }, '-'),
                createElement('input', {
                    className: 'form-control',
                    placeholder: '结束时间 (如：至今)',
                    value: escapeHtml(item.endDate || ''),
                    oninput: (e) => AppState.updateItem('work', index, 'endDate', e.target.value)
                })
            ]),
            
            // 工作内容
            createElement('textarea', {
                className: 'form-control',
                placeholder: '工作内容',
                rows: '3',
                style: { marginTop: '0.5rem' },
                value: item.summary || '',
                oninput: (e) => AppState.updateItem('work', index, 'summary', e.target.value)
            })
        ]);
        
        return itemEntry;
    }

    /**
     * 创建项目经验表单项
     * @param {Object} item - 项目经验数据
     * @param {number} index - 索引
     * @returns {HTMLElement} 表单项DOM元素
     */
    function createProjectItem(item, index) {
        const itemEntry = createElement('div', { className: 'item-entry' }, [
            // 删除按钮
            createElement('div', { 
                className: 'btn-delete',
                onclick: () => AppState.removeItem('projects', index)
            }, '✕'),
            
            // 第一行：项目名称和角色
            createElement('div', { className: 'row' }, [
                createElement('input', {
                    className: 'form-control',
                    placeholder: '项目名称',
                    value: escapeHtml(item.name || ''),
                    oninput: (e) => AppState.updateItem('projects', index, 'name', e.target.value)
                }),
                createElement('input', {
                    className: 'form-control',
                    placeholder: '担任角色',
                    value: escapeHtml(item.role || ''),
                    oninput: (e) => AppState.updateItem('projects', index, 'role', e.target.value)
                })
            ]),
            
            // 时间编辑行
            createElement('div', { className: 'row-time' }, [
                createElement('input', {
                    className: 'form-control',
                    placeholder: '开始时间 (如：2023.10)',
                    value: escapeHtml(item.startDate || ''),
                    oninput: (e) => AppState.updateItem('projects', index, 'startDate', e.target.value)
                }),
                createElement('div', { className: 'divider' }, '-'),
                createElement('input', {
                    className: 'form-control',
                    placeholder: '结束时间 (如：至今)',
                    value: escapeHtml(item.endDate || ''),
                    oninput: (e) => AppState.updateItem('projects', index, 'endDate', e.target.value)
                })
            ]),
            
            // 项目描述
            createElement('textarea', {
                className: 'form-control',
                placeholder: '项目描述',
                rows: '3',
                style: { marginTop: '0.5rem' },
                value: item.description || '',
                oninput: (e) => AppState.updateItem('projects', index, 'description', e.target.value)
            })
        ]);
        
        return itemEntry;
    }

    /**
     * 创建技能标签
     * @param {string} skill - 技能名称
     * @param {number} index - 索引
     * @returns {HTMLElement} 技能标签DOM元素
     */
    function createSkillTag(skill, index) {
        return createElement('div', {
            className: 'skill-tag',
            style: { cursor: 'pointer' },
            onclick: () => AppState.removeSkill(index)
        }, `${escapeHtml(skill)} ×`);
    }

    /**
     * 渲染教育经历列表
     * @param {Array} educationList - 教育经历数组
     */
    function renderEducationList(educationList) {
        const container = document.getElementById('list-education');
        if (!container) return;
        
        clearElement(container);
        
        educationList.forEach((item, index) => {
            container.appendChild(createEducationItem(item, index));
        });
    }

    /**
     * 渲染工作经历列表
     * @param {Array} workList - 工作经历数组
     */
    function renderWorkList(workList) {
        const container = document.getElementById('list-work');
        if (!container) return;
        
        clearElement(container);
        
        workList.forEach((item, index) => {
            container.appendChild(createWorkItem(item, index));
        });
    }

    /**
     * 渲染项目经验列表
     * @param {Array} projectsList - 项目经验数组
     */
    function renderProjectsList(projectsList) {
        const container = document.getElementById('list-projects');
        if (!container) return;
        
        clearElement(container);
        
        projectsList.forEach((item, index) => {
            container.appendChild(createProjectItem(item, index));
        });
    }

    /**
     * 渲染技能标签列表
     * @param {Array} skillsList - 技能数组
     */
    function renderSkillsList(skillsList) {
        const container = document.getElementById('list-skills');
        if (!container) return;
        
        clearElement(container);
        
        skillsList.forEach((skill, index) => {
            container.appendChild(createSkillTag(skill, index));
        });
    }

    /**
     * 填充基础字段
     * @param {Object} state - 当前状态
     */
    function populateBasicFields(state) {
        // 填充 bind-field 输入框
        document.querySelectorAll('.bind-field').forEach(input => {
            const path = input.dataset.path;
            const value = AppState.getByPath(path);
            input.value = value || '';
        });
        
        // 填充头像
        const avatarPreview = document.getElementById('avatar-preview');
        if (avatarPreview && state.basics.avatar) {
            avatarPreview.src = state.basics.avatar;
        }
        
        // 激活当前模板按钮
        const templateButtons = document.querySelectorAll('.toolbar .btn-outline');
        templateButtons.forEach(btn => btn.classList.remove('btn-active'));
        
        const activeTemplateBtn = document.getElementById(`btn-tpl-${state.template}`);
        if (activeTemplateBtn) {
            activeTemplateBtn.classList.add('btn-active');
        }
    }

    /**
     * 渲染整个表单
     * @param {Object} state - 当前状态
     */
    function render(state) {
        populateBasicFields(state);
        renderEducationList(state.education);
        renderWorkList(state.work);
        renderProjectsList(state.projects);
        renderSkillsList(state.skills);
        
        // 重新初始化Lucide图标
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    }

    /**
     * 初始化表单事件绑定
     */
    function initEvents() {
        // 绑定基础字段输入事件
        document.querySelectorAll('.bind-field').forEach(input => {
            input.addEventListener('input', (e) => {
                const path = e.target.dataset.path;
                AppState.setByPath(path, e.target.value);
            });
        });
        
        // 切换区域展开/折叠
        const toggleButtons = [
            { id: 'toggle-basics', body: 'toggle-basics' },
            { id: 'toggle-education', body: 'toggle-education' },
            { id: 'toggle-work', body: 'toggle-work' },
            { id: 'toggle-projects', body: 'toggle-projects' },
            { id: 'toggle-skills', body: 'toggle-skills' },
            { id: 'toggle-summary', body: 'toggle-summary' }
        ];
        
        toggleButtons.forEach(({ id }) => {
            const button = document.getElementById(id);
            if (button) {
                button.addEventListener('click', () => {
                    const body = button.nextElementSibling;
                    if (body) {
                        body.classList.toggle('hidden');
                    }
                });
            }
        });
        
        // 添加按钮事件
        const addButtons = [
            { id: 'btn-add-education', type: 'education', model: { institution: '', area: '', studyType: '', startDate: '', endDate: '' } },
            { id: 'btn-add-work', type: 'work', model: { company: '', position: '', startDate: '', endDate: '', summary: '' } },
            { id: 'btn-add-projects', type: 'projects', model: { name: '', role: '', startDate: '', endDate: '', description: '' } }
        ];
        
        addButtons.forEach(({ id, type, model }) => {
            const button = document.getElementById(id);
            if (button) {
                button.addEventListener('click', () => {
                    AppState.addItem(type, { ...model });
                });
            }
        });
        
        // 技能输入框回车事件
        const skillInput = document.getElementById('skill-input');
        if (skillInput) {
            skillInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    AppState.addSkill(e.target.value);
                    e.target.value = '';
                }
            });
        }
        
        // 头像上传事件
        const avatarInput = document.getElementById('input-avatar');
        if (avatarInput) {
            avatarInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                        AppState.setByPath('basics.avatar', evt.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        // 主题颜色选择器
        const colorPicker = document.getElementById('theme-color-picker');
        if (colorPicker) {
            colorPicker.addEventListener('input', (e) => {
                AppState.setState({ themeColor: e.target.value });
            });
        }
        
        // 重置按钮
        const resetBtn = document.getElementById('btn-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('确定清空并恢复默认示例数据吗？')) {
                    StorageModule.clear();
                    AppState.reset();
                }
            });
        }
    }

    // 暴露公共API
    return {
        render,
        initEvents
    };
})();

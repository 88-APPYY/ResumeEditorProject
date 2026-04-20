# 极简简历 - 专业在线编辑器

一个纯前端、零依赖安装的简历编辑器，直接在浏览器中打开即可使用，支持实时预览、多模板切换、AI 内容润色和高清 PDF 导出。

## 功能特性

- 实时编辑预览：左侧编辑，右侧即时渲染简历效果
- 双模板切换：简约模板 / 商务双栏模板
- 自定义主题色：一键切换简历主色调
- AI 内容润色：对工作经历、项目经历进行 AI 流式润色，可预览后选择应用
- 高清 PDF 导出：基于 html2pdf.js，导出 A4 尺寸高质量 PDF
- 数据本地持久化：编辑内容自动保存至 localStorage
- 响应式布局：支持移动端，底部导航栏切换编辑/预览视图
- 头像上传：支持本地图片上传并嵌入简历

## 编辑模块

| 模块 | 说明 |
|------|------|
| 基础信息 | 姓名、求职岗位、电话、邮箱、所在地、个人主页、头像 |
| 教育背景 | 学校、专业、学历、起止时间 |
| 工作经历 | 公司、职位、起止时间、工作内容（支持 AI 润色） |
| 项目经验 | 项目名称、角色、起止时间、项目描述（支持 AI 润色） |
| 技能标签 | 回车快速添加，点击删除 |
| 自我评价 | 自由文本 |

## 使用方式

无需安装任何依赖，直接用浏览器打开 HTML 文件即可。

```
直接双击打开 ResumeEditorProjectv4-timeQ.html
```

> 需要联网加载 html2pdf.js 和 Lucide 图标库。AI 润色功能需配置对应的 API Key（见下方说明）。

## AI 润色配置

在工作经历或项目经历条目下点击「✨ AI润色」按钮，编辑器会调用 AI 接口对内容进行流式润色并弹窗预览。

使用前需在代码中配置你的 API Key 和接口地址：

```js
// 在 openPolishModal / streamPolish 函数中配置
const API_KEY = 'your-api-key-here';
const API_URL = 'https://your-api-endpoint/v1/chat/completions';
```

## 技术栈

- 原生 HTML / CSS / JavaScript（无框架）
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) — PDF 导出
- [Lucide Icons](https://lucide.dev) — 图标库

## 文件结构

```
ResumeEditorProjectv4-timeQ.html   # 主文件，全部功能集成在单个 HTML 中
README.md
```

## License

MIT

# personal-blog-vue

基于 **Vue 3**、**Vite**、**Element Plus** 的个人博客前端：暗黑霓虹主题、响应式布局（窄屏抽屉侧栏）、Markdown 文章展示与本地数据驱动。

## 功能概览

- **页面**：首页、记录列表、文章详情、分类、标签、归档、关于、搜索  
- **主题**：亮色 / 暗黑切换（Pinia + `html.dark`，持久化到 `localStorage`）  
- **布局**：顶栏 + 侧栏 + 主内容 + 页脚；`≤768px` 侧栏收入抽屉，主区单列铺满  
- **动效**：可选赛博背景（`CyberBackground`）、光标轨迹、点击效果（均 `pointer-events: none`，不挡交互）  
- **路由**：Hash 模式（`createWebHashHistory`），便于部署在任意静态路径（如 GitHub Pages）

## 技术栈

| 类别     | 技术 |
| -------- | ---- |
| 框架     | Vue 3（`<script setup>`） |
| 构建     | Vite 8 |
| UI       | Element Plus 2 |
| 状态     | Pinia |
| 路由     | Vue Router 4 |
| 样式     | SCSS（`src/styles/index.scss`） |
| Markdown | markdown-it |

## 快速开始

环境要求：**Node.js** 建议 18+（与 Vite 8 兼容即可）。

```bash
npm install
npm run dev
```

本地开发默认打开 Vite 提示的地址（若端口被占用会自动换端口）。

### 脚本说明

| 命令 | 说明 |
| ---- | ---- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建，输出到 `dist/` |
| `npm run preview` | 本地预览构建结果 |
| `npm run deploy` | 使用 `gh-pages` 将 `dist/` 发布到当前仓库的 `gh-pages` 分支（需已配置 Git 远程） |

## 部署与 `base` 路径

当前 [vite.config.js](vite.config.js) 中：

```js
base: "/personal-blog-vue/",
```

表示站点挂在域名子路径 **`/personal-blog-vue/`** 下（常见于 GitHub Pages 项目页：`https://<user>.github.io/personal-blog-vue/`）。

若你改为根路径部署（例如自定义域名根站），请把 `base` 改成 `'/'`，并检查 [index.html](index.html) 里自定义光标等资源路径是否与 `base` 一致。

路由已使用 `createWebHashHistory(import.meta.env.BASE_URL)`，与 Vite 的 `base` 对齐。

## 自定义站点信息

全局文案与侧栏展示集中在 [src/config/site.js](src/config/site.js)：

- 站点名、首页 Hero、个人简介、技术栈、侧栏徽章、社交链接等  

修改头像等资源时，可替换 [src/assets](src/assets) 下文件并在 `site.js` 中调整引用。

## 文章与数据

列表、详情、分类、标签、归档等页面使用的文章数据在：

- [src/content/posts.js](src/content/posts.js)

按该文件导出结构增删改即可（具体字段以现有文章对象为准）。

## 目录结构（简要）

```
src/
  App.vue
  main.js
  router/index.js          # 路由
  stores/theme.js          # 主题
  config/site.js           # 站点配置
  content/posts.js         # 文章数据
  layouts/                 # 默认布局、Header / Sidebar / Footer
  views/                   # 各页面
  components/              # CyberBackground、MarkdownRenderer 等
  styles/index.scss        # 全局样式与暗黑下 Element 覆盖
```

## 许可证

私有项目或未声明许可证时，默认保留所有权利；若需开源可自行添加 `LICENSE` 并更新本段说明。

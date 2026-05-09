// 心情选项
export const moods = [
  "😊",
  "😎",
  "🤔",
  "😤",
  "🎉",
  "🥱",
  "😱",
  "🤩",
  "🙄",
  "💪",
];

// 类型选项
export const types = [
  { value: "tech", label: "技术折腾", color: "#4cc9ff" },
  { value: "game", label: "游戏日常", color: "#ff4fd8" },
  { value: "life", label: "生活碎碎念", color: "#ffe66d" },
  { value: "ai", label: "AI发疯记录", color: "#a855f7" },
];

export const articles = [
  // 置顶文章
  {
    id: "1",
    title: "欢迎来到我的赛博日记本！🎉",
    summary:
      "从技术博客转型到碎碎念记录，这里会记录我折腾代码、玩游戏、以及跟AI发疯的日常~",
    content: `# 欢迎来到我的赛博日记本！

这是一个转型声明：从传统的技术博客，变成了一个记录各种碎碎念的地方。

以后这里会有：
- 技术折腾（当然还是会有的）
- 游戏日常
- 生活碎碎念
- AI发疯记录（这是重点！）`,
    category: "公告",
    tags: ["碎碎念", "公告", "博客"],
    author: "ArCl",
    createTime: "2026-05-08",
    views: 2345,
    cover: "",
    mood: "🎉",
    type: "life",
    pinned: true,
  },
  // AI发疯系列
  {
    id: "2",
    title: "今天又被AI气死了😤",
    summary: "让GPT-4写个正则，它给我写了20行还带bug，最后还是自己写的...",
    content: `# 今天又被AI气死了

## 事情经过

让GPT-4帮我写一个验证邮箱的正则表达式：

1. 第一次给了一个超长的，根本看不懂
2. 第二次简化了，但是不支持中文域名
3. 第三次终于对了，但是性能极差
4. 最后我自己写了个5行的解决方案

## 总结

AI还是要人工审核的...`,
    category: "AI",
    tags: ["AI", "GPT-4", "吐槽", "正则"],
    author: "ArCl",
    createTime: "2026-05-07",
    views: 1567,
    cover: "",
    mood: "😤",
    type: "ai",
    pinned: false,
  },
  {
    id: "3",
    title: "Midjourney 居然画出了这种图！🤩",
    summary: "用AI生成了一组赛博朋克风格的图片，效果比预期的还要好！",
    content: `# Midjourney 作品分享

今天用Midjourney生成了一组赛博朋克风格的图片，效果太震撼了！

Prompt分享：
\`\`\`
cyberpunk city, neon lights, rain, reflections, 8k, ultra detailed
\`\`\``,
    category: "AI",
    tags: ["AI", "Midjourney", "绘画", "赛博朋克"],
    author: "ArCl",
    createTime: "2026-05-06",
    views: 1890,
    cover: "",
    mood: "🤩",
    type: "ai",
    pinned: false,
  },
  // 技术折腾
  {
    id: "4",
    title: "终于把博客改成赛博朋克风格了！💪",
    summary: "折腾了三天，从配色到特效，终于把博客改成了想要的赛博朋克风格~",
    content: `# 博客改造记录

## 改造内容

1. 暗色主题 + 霓虹配色
2. 鼠标跟随特效
3. 点击特效
4. 渐变背景

技术栈还是Vue3 + Vite + Element Plus，只是调整了样式和添加了组件。`,
    category: "Vue3",
    tags: ["Vue3", "前端", "赛博朋克", "CSS"],
    author: "ArCl",
    createTime: "2026-05-06",
    views: 1234,
    cover: "",
    mood: "💪",
    type: "tech",
    pinned: false,
  },
  {
    id: "5",
    title: "Vite 构建优化指南",
    summary: "如何让你的 Vite 项目构建更快？从配置到插件的完整优化方案。",
    content: `# Vite 构建优化指南

## 1. 引言

Vite 是新一代的前端构建工具，利用浏览器原生 ES 模块实现极速的开发体验。

## 2. 配置优化

合理配置 build.rollupOptions、build.chunkSizeWarningLimit 等可以显著优化构建结果。`,
    category: "工程化",
    tags: ["Vite", "性能优化", "构建"],
    author: "ArCl",
    createTime: "2026-05-05",
    views: 892,
    cover: "",
    mood: "🤔",
    type: "tech",
    pinned: false,
  },
  // 游戏日常
  {
    id: "6",
    title: "《艾尔登法环》DLC 终于通关了！🎉",
    summary: "打了整整一周，死了无数次，终于把黄金树幽影打通了！",
    content: `# 黄金树幽影 通关感想

## 最难忘的Boss

1. 梅瑟莫 - 打了17次！
2. 米凯拉 - 真的太难了
3. 龙飨女巫 - 场面太震撼

## 总结

FromSoftware 永远的神！`,
    category: "游戏",
    tags: ["艾尔登法环", "魂系", "DLC", "通关"],
    author: "ArCl",
    createTime: "2026-05-04",
    views: 2100,
    cover: "",
    mood: "🎉",
    type: "game",
    pinned: false,
  },
  {
    id: "7",
    title: "今天在《黑神话：悟空》里被虐了🥱",
    summary: "打了一下午，还在第一章打转...这个游戏真的太难了！",
    content: `# 黑神话：悟空 游玩记录

## 今日战绩

- 死亡次数：47次
- 进度：还是第一章
- 手柄：差点砸了

## 吐槽

这个游戏的难度真的是...但画面是真的好！`,
    category: "游戏",
    tags: ["黑神话", "国产游戏", "动作游戏"],
    author: "ArCl",
    createTime: "2026-05-03",
    views: 1567,
    cover: "",
    mood: "🥱",
    type: "game",
    pinned: false,
  },
  // 生活碎碎念
  {
    id: "8",
    title: "周一上班真的好困啊🙄",
    summary: "周日晚上睡不着，周一早上起不来，这就是当代年轻人的日常吗？",
    content: `# 周一上班综合征

## 今日时间线

- 00:30 还在刷手机
- 07:30 闹钟响了，按下继续睡
- 07:50 惊醒，急急忙忙起床
- 08:30 冲进公司，差点迟到
- 09:00 坐在工位上，困得要死

## 总结

今晚一定要早睡！（flag）`,
    category: "生活",
    tags: ["生活", "上班", "周一", "吐槽"],
    author: "ArCl",
    createTime: "2026-05-05",
    views: 987,
    cover: "",
    mood: "🙄",
    type: "life",
    pinned: false,
  },
  {
    id: "9",
    title: "Element Plus 主题定制与开发技巧",
    summary: "从 CSS 变量到自定义主题，一步步教你定制属于自己的 Element Plus。",
    content: `# Element Plus 主题定制与开发技巧

## 1. 引言

Element Plus 提供了完善的主题定制能力，支持 CSS 变量覆盖与 SCSS 变量定制。`,
    category: "UI",
    tags: ["Element Plus", "Vue3", "UI"],
    author: "你的名字",
    createTime: "2026-05-04",
    views: 756,
    cover: "",
    mood: "😎",
    type: "tech",
    pinned: false,
  },
  {
    id: "10",
    title: "前端工程化体系搭建",
    summary: "从项目初始化到 CI/CD，完整梳理一套现代前端工程化方案。",
    content: `# 前端工程化体系搭建

## 1. 引言

现代前端开发离不开工程化支持，本文将介绍一套完整的工程化方案。`,
    category: "工程化",
    tags: ["工程化", "CI/CD", "前端"],
    author: "你的名字",
    createTime: "2026-05-03",
    views: 1089,
    cover: "",
    mood: "🤔",
    type: "tech",
    pinned: false,
  },
  {
    id: "11",
    title: "突然发现自己好久没看书了😱",
    summary: "整理书架时发现，买的很多书都只看了一半，今年一定要多读点书！",
    content: `# 读书计划

## 已买未读清单

1. 《人月神话》 - 读了30%
2. 《代码整洁之道》 - 读了50%
3. 《设计模式》 - 读了20%

## 今年目标

至少读完5本技术书！`,
    category: "生活",
    tags: ["读书", "计划", "自我提升"],
    author: "ArCl",
    createTime: "2026-04-28",
    views: 654,
    cover: "",
    mood: "😱",
    type: "life",
    pinned: false,
  },
  {
    id: "12",
    title: "Pinia 状态管理入门与进阶",
    summary: "从基础概念到复杂场景，完整掌握 Pinia 状态管理。",
    content: `# Pinia 状态管理入门与进阶

## 1. 引言

Pinia 是 Vue3 官方推荐的状态管理库，提供了简洁的 API 和完整的 TypeScript 支持。`,
    category: "Vue3",
    tags: ["Pinia", "Vue3", "状态管理"],
    author: "你的名字",
    createTime: "2026-04-28",
    views: 987,
    cover: "",
    mood: "😊",
    type: "tech",
    pinned: false,
  },
];

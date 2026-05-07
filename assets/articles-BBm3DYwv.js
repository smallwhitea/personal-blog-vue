var e=[{id:`1`,title:`Vue3 Composition API 最佳实践`,summary:`深入了解 Vue3 Composition API，构建更加清晰、可复用的逻辑代码。`,content:`# Vue3 Composition API 最佳实践

## 1. 引言

Vue3 Composition API 为我们提供了一种全新的代码组织方式。相比 Options API，它可以更好地复用逻辑代码，同时让相关逻辑更加紧凑。

## 2. setup 函数

setup 是 Composition API 的入口，它在组件实例创建之前执行。

\`\`\`javascript
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  }
}
\`\`\`

## 3. ref 与 reactive

- \`ref\` 用于基本类型数据
- \`reactive\` 用于对象类型数据

## 4. computed 与 watch

### computed

计算属性可以根据依赖自动缓存结果。

### watch

监听器可以监听数据变化并执行副作用。

## 5. 生命周期钩子

Composition API 提供了 onMounted、onUpdated、onUnmounted 等生命周期钩子。

## 6. 总结

Composition API 是 Vue3 带来的最重要改进之一，建议新项目优先使用。`,category:`Vue3`,tags:[`Vue3`,`前端`,`最佳实践`],author:`ArCl`,createTime:`2026-05-06`,views:1234,cover:``},{id:`2`,title:`Vite 构建优化指南`,summary:`如何让你的 Vite 项目构建更快？从配置到插件的完整优化方案。`,content:`# Vite 构建优化指南

## 1. 引言

Vite 是新一代的前端构建工具，利用浏览器原生 ES 模块实现极速的开发体验。

## 2. 配置优化

合理配置 build.rollupOptions、build.chunkSizeWarningLimit 等可以显著优化构建结果。

## 3. 插件推荐

使用合适的 Vite 插件可以大幅提升开发与构建效率。`,category:`工程化`,tags:[`Vite`,`性能优化`,`构建`],author:`ArCl`,createTime:`2026-05-05`,views:892,cover:``},{id:`3`,title:`Element Plus 主题定制与开发技巧`,summary:`从 CSS 变量到自定义主题，一步步教你定制属于自己的 Element Plus。`,content:`# Element Plus 主题定制与开发技巧

## 1. 引言

Element Plus 提供了完善的主题定制能力，支持 CSS 变量覆盖与 SCSS 变量定制。

## 2. 主题定制

你可以通过在项目中覆盖 Element Plus 的 CSS 变量来实现主题定制。`,category:`UI`,tags:[`Element Plus`,`Vue3`,`UI`],author:`你的名字`,createTime:`2026-05-04`,views:756,cover:``},{id:`4`,title:`前端工程化体系搭建`,summary:`从项目初始化到 CI/CD，完整梳理一套现代前端工程化方案。`,content:`# 前端工程化体系搭建

## 1. 引言

现代前端开发离不开工程化支持，本文将介绍一套完整的工程化方案。

## 2. 项目初始化

使用 Vite 创建项目，并配置基础的工具链。

## 3. 代码规范

配置 ESLint、Prettier、Husky 等工具保障代码质量。`,category:`工程化`,tags:[`工程化`,`CI/CD`,`前端`],author:`你的名字`,createTime:`2026-05-03`,views:1089,cover:``},{id:`5`,title:`Pinia 状态管理入门与进阶`,summary:`从基础概念到复杂场景，完整掌握 Pinia 状态管理。`,content:`# Pinia 状态管理入门与进阶

## 1. 引言

Pinia 是 Vue3 官方推荐的状态管理库，提供了简洁的 API 和完整的 TypeScript 支持。

## 2. 基础概念

了解 Store、State、Getters、Actions 等基础概念。`,category:`Vue3`,tags:[`Pinia`,`Vue3`,`状态管理`],author:`你的名字`,createTime:`2026-04-28`,views:987,cover:``},{id:`6`,title:`Vue Router 4 完整入门`,summary:`路由配置、导航守卫、动态路由，一文带你掌握 Vue Router 4。`,content:`# Vue Router 4 完整入门

## 1. 引言

Vue Router 4 是 Vue3 的官方路由库，带来了很多新特性和改进。

## 2. 路由配置

配置基础路由、动态路由、嵌套路由。`,category:`Vue3`,tags:[`Vue Router`,`Vue3`,`路由`],author:`你的名字`,createTime:`2026-04-22`,views:654,cover:``},{id:`7`,title:`现代 CSS 布局技巧`,summary:`Flexbox、Grid 以及 Container Query 等现代 CSS 布局技术的应用。`,content:`# 现代 CSS 布局技巧

## 1. 引言

现代 CSS 提供了强大的布局能力，本文介绍常用的布局技巧。`,category:`CSS`,tags:[`CSS`,`布局`,`响应式`],author:`你的名字`,createTime:`2026-04-15`,views:732,cover:``},{id:`8`,title:`响应式设计最佳实践`,summary:`从移动端优先到设计系统，完整的响应式设计方法论。`,content:`# 响应式设计最佳实践

## 1. 引言

响应式设计让网站在各种设备上都能获得良好体验。`,category:`前端`,tags:[`响应式`,`设计`,`前端`],author:`你的名字`,createTime:`2026-04-10`,views:567,cover:``}];export{e as t};
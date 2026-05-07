import { createRouter, createWebHashHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "posts",
          name: "posts",
          component: () => import("@/views/ArticleListView.vue"),
        },
        {
          path: "article/:id",
          name: "article-detail",
          component: () => import("@/views/ArticleDetailView.vue"),
        },
        {
          path: "category",
          name: "category",
          component: () => import("@/views/CategoryView.vue"),
        },
        {
          path: "tags",
          name: "tags",
          component: () => import("@/views/TagsView.vue"),
        },
        {
          path: "about",
          name: "about",
          component: () => import("@/views/AboutView.vue"),
        },
        {
          path: "archive",
          name: "archive",
          component: () => import("@/views/ArchiveView.vue"),
        },
        {
          path: "search",
          name: "search",
          component: () => import("@/views/Search.vue"),
        },
      ],
    },
  ],
});

export default router;

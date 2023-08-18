import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/home/index.vue"
import NotFound from "@/pages/error/404.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home
    },
    { 
      path: '/:pathMatch(.*)*',
      name: 'NotFound', 
      component: NotFound 
    },
  ]
})

export default router
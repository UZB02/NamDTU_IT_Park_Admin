import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios'
import AppLayout from '.././layouts/AppLayout.vue'
import AuthLayout from '.././layouts/AuthLayouts/AuthLayout.vue'
axios.defaults.baseURL = "https://namdtu-backend.onrender.com";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/admins",
      name: "Admins",
      component: () => import("../views/AdminsView.vue"),
    },
    {
      path: "/admins/add",
      name: "Add Admin",
      component: () => import("../views/AddAdminView.vue"),
    },
    {
      path: "/login",
      name: "LoginView",
      meta:{
        layout: AuthLayout,
      },
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

export default router

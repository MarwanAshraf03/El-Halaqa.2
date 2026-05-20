import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isUserLoggedIn } from '@/main'
// import printMsg from '../main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: { path: '/students' },
    },
    {
      path: '/add-student',
      name: 'addStudent',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddStudentView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/update-student/:id',
      name: 'updateStudent',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UpdateStudentView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/students',
      name: 'students',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/StudentsListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/students/:id',
      name: 'student',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/StudentView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/add-log/:id',
      name: 'addLog',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddLogView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/attendance',
      name: 'attendance',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AttendanceView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LogInView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  // Check if the target route requires authentication
  if (to.meta.requiresAuth) {
    if (!isUserLoggedIn.value) {
      console.log('user is not logged in')
      // User is not logged in, redirect to login page
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    // Route doesn't require auth, always allow access
    next()
  }
})
export default router

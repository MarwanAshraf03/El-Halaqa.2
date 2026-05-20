<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { isUserLoggedIn, loggedTeacher, logOut } from './main'
const route = useRoute()
</script>

<template>
  <header v-if="isUserLoggedIn">
    <div class="navbar bg-base-100 shadow-sm">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabindex="-1"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li :class="route.path === '/students' ? 'bg-white text-black rounded-[15px]' : ''">
              <RouterLink to="/students">الرئيسية</RouterLink>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <RouterLink to="/students" class="btn btn-ghost text-xl">El Halaqa</RouterLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li :class="route.path === '/students' ? 'bg-white text-black rounded-[15px]' : ''">
            <RouterLink to="/students">الرئيسية</RouterLink>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <RouterLink v-if="loggedTeacher.type === 'admin'" to="/add-student"
          ><button class="btn btn-primary mr-1 hidden sm:block">اضافة طالب</button>
        </RouterLink>
        <button class="btn btn-warning" @click="logOut()">تسجيل خروج</button>
      </div>
    </div>
  </header>
  <RouterView />
</template>

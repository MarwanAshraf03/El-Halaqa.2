<script setup>
import { logIn } from '@/main'
import { ref } from 'vue'
const userName = ref('')
const password = ref('')
</script>
<template>
  <div class="isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
        تسجيل الدخول
      </h2>
    </div>
    <form v-on:submit.prevent="logIn(userName, password)" class="mx-auto mt-16 max-w-xl sm:mt-20">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="userName" class="block text-end text-sm/6 font-semibold text-white"
            >اسم المستخدم</label
          >
          <div class="mt-2.5">
            <input
              type="text"
              name="userName"
              id="userName"
              v-model="userName"
              class="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
            />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="password" class="block text-sm/6 font-semibold text-white text-end"
            >كلمة المرور</label
          >
          <div class="mt-2.5">
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
              class="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
            />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <button
          type="submit"
          class="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          تسجيل
        </button>
      </div>
    </form>
  </div>
</template>

<script setup></script>

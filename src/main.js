import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
const host = window.location.hostname
export const loggedTeacher = ref({})
export const teacherTypes = ['admin', 'Mem', 'Rev', 'Mem-Rev']
export const isUserLoggedIn = ref(!!localStorage.getItem('teacher'))
export const logIn = async (userName, password) => {
  const response = await fetch(`http://${host}:3000/teachers?userName=${userName}`)
  const teachers = await response.json()
  const teacher = teachers.find((teacher) => password === teacher.password)
  //   console.log({ userName, password, teachers, teacher })
  if (teacher) {
    localStorage.setItem('teacher', JSON.stringify(teacher))
    isUserLoggedIn.value = true
    loggedTeacher.value = teacher
    router.push('/')
  }
}
if (isUserLoggedIn.value && !Object.keys(loggedTeacher.value).length) {
  loggedTeacher.value = JSON.parse(localStorage.getItem('teacher'))
}
export const logOut = () => {
  localStorage.removeItem('teacher')
  isUserLoggedIn.value = false
  router.push('/login')
}
const app = createApp(App)

app.use(router)

app.mount('#app')

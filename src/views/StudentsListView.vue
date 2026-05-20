<script setup>
import { ref, onMounted, computed, useHost } from 'vue'
const students = ref([])
const host = window.location.hostname
const loadStudents = async (params) => {
  try {
    const response = await fetch(`http://${host}:3000/students`)
    students.value = await response.json()
  } catch (error) {
    console.error('Failed to load students:', error)
  }
}
onMounted(loadStudents)
</script>

<template>
  <div class="w-full md:w-3/4 mx-auto p-4">
    <div class="justify-self-center mb-2"></div>
    <ul
      class="border-base-content/25 divide-base-content/25 *:last:rounded-b-md divide-y rounded-md border *:p-3 *:first:rounded-t-md"
      v-for="student in students"
    >
      <li class="flex items-start sm:items-center">
        <div class="flex grow flex-col items-start justify-between sm:flex-row">
          <div>
            <h6 class="text-lg font-bold text-base-content">{{ student.name_arb }}</h6>
            <div class="w-full">
              <small>{{ student.overAllMem }}</small>
            </div>
          </div>
          <div class="action max-sm:mt-1">
            <RouterLink :to="'/add-log/' + student.id">
              <button class="btn btn-active btn-primary mr-1">اضافة سجل</button>
            </RouterLink>
            <RouterLink :to="'/students/' + student.id">
              <button class="btn btn-info">عرض الطالب</button>
            </RouterLink>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

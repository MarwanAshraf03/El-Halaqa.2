<script setup>
import { onMounted, ref } from 'vue'
import { v4 } from 'uuid'
import { useRoute, useRouter } from 'vue-router'
import { loggedTeacher } from '@/main'
const router = useRouter()
const route = useRoute()
const host = window.location.hostname
const id = route.params.id ?? null
const student = ref({})
const student_logs = ref({ id: '', logs: [] })
const teacherId = loggedTeacher.value.id
const teacherUserName = loggedTeacher.value.userName
const memDone = ref()
const memGrade = ref()
const revDone = ref()
const revGrade = ref()
const notes = ref()
const overAllMem = ref()
const newMem = ref()

onMounted(async () => {
  try {
    const response = await fetch(`http://${host}:3000/students/${id}`)
    student.value = await response.json()
  } catch (error) {
    console.error('Failed to load students:', error)
  }
  try {
    const response = await fetch(`http://${host}:3000/student_logs/${id}`)
    student_logs.value = await response.json()
    student_logs.value.logs = student_logs.value.logs.sort(
      (a, b) => new Date(b.time) - new Date(a.time),
    )
  } catch (error) {
    console.error('Failed to load students:', error)
  }
})
const reset = () => {
  memDone.value = ''
  memGrade.value = ''
  revDone.value = ''
  revGrade.value = ''
  notes.value = ''
  overAllMem.value = ''
  newMem.value = ''
}

const cleanObject = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined),
  )
}

const addLog = async () => {
  var log = cleanObject({
    id: v4(),
    time: new Date().toISOString(),
    teacherId,
    teacherUserName,
    memDone: memDone.value ?? null,
    memGrade: memGrade.value ?? null,
    revDone: revDone.value ?? null,
    revGrade: revGrade.value ?? null,
    notes: notes.value ?? 'null',
  })
  student_logs.value.logs.push(log)

  console.log({ log, student_logs: student_logs.value.logs })
  const response = await fetch(`http://${host}:3000/student_logs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ logs: student_logs.value.logs }),
  })

  router.push(`/students/${id}`)
}
</script>

<template>
  <form class="p-4" v-on:submit.prevent="addLog()">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12 dark:border-white/10">
        <div class="text-end">
          {{ `اضافة سجل للطالب: ${student.name_arb}` }}
        </div>
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div v-if="['Mem', 'Mem-Rev'].includes(loggedTeacher.type)" class="sm:col-span-4">
            <label for="memDone" class="block text-sm/6 font-medium">تم التحفيظ</label>
            <div class="mt-2">
              <input
                type="text"
                name="memDone"
                id="memDone"
                placeholder="سورة الزلزلة"
                v-model="memDone"
                class="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:/5 dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </div>

          <div v-if="['Mem', 'Mem-Rev'].includes(loggedTeacher.type)" class="sm:col-span-2">
            <label for="memGrade" class="block text-sm/6 font-medium">درجة التحفيظ</label>
            <div class="mt-2">
              <input
                type="number"
                name="memGrade"
                id="memGrade"
                min="0"
                max="10"
                v-model="memGrade"
                placeholder="5"
                class="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:/5 dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </div>

          <div v-if="['Rev', 'Mem-Rev'].includes(loggedTeacher.type)" class="sm:col-span-4">
            <label for="revDone" class="block text-sm/6 font-medium">تم المراجعة</label>
            <div class="mt-2">
              <input
                type="text"
                name="revDone"
                id="revDone"
                placeholder="سورة الزلزلة"
                v-model="revDone"
                class="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:/5 dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </div>

          <div v-if="['Rev', 'Mem-Rev'].includes(loggedTeacher.type)" class="sm:col-span-2">
            <label for="revGrade" class="block text-sm/6 font-medium">درجة المراجعة</label>
            <div class="mt-2">
              <input
                type="number"
                name="revGrade"
                id="revGrade"
                min="0"
                max="10"
                v-model="revGrade"
                placeholder="5"
                class="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:/5 dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </div>

          <div class="sm:col-span-3 sm:col-start-1">
            <label for="overAllMem" class="block text-sm/6 font-medium">اجمالي المحفوظ</label>
            <div class="mt-2">
              <input
                type="text"
                name="overAllMem"
                id="overAllMem"
                v-model="overAllMem"
                class="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:/5 dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </div>

          <div v-if="['Mem', 'Mem-Rev'].includes(loggedTeacher.type)" class="sm:col-span-3">
            <label for="newMem" class="block text-sm/6 font-medium">الحفظ الجديد</label>
            <div class="mt-2">
              <input
                type="text"
                name="newMem"
                id="newMem"
                v-model="newMem"
                class="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:/5 dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </div>

          <div class="col-span-full">
            <label for="about" class="block text-sm/6 font-medium">ملاحظات</label>
            <div class="mt-2">
              <textarea
                name="about"
                id="about"
                rows="3"
                v-model="notes"
                class="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:/5 dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" @click="reset()" class="text-sm/6 font-semibold">Cancel</button>
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500"
      >
        Save
      </button>
    </div>
  </form>
</template>

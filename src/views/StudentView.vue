<script setup>
import { loggedTeacher } from '@/main'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id ?? null
const host = window.location.hostname
const student = ref({})
const student_logs = ref({ id: '', logs: [] })
const loadStudentLogs = async () => {
  try {
    const response = await fetch(`http://${host}:3000/student_logs/${id}`)
    student_logs.value = await response.json()
    student_logs.value.logs = student_logs.value.logs.sort(
      (a, b) => new Date(b.time) - new Date(a.time),
    )
  } catch (error) {
    console.error('Failed to load students:', error)
  }
}
const loadStudentData = async () => {
  try {
    const response = await fetch(`http://${host}:3000/students/${id}`)
    student.value = await response.json()
  } catch (error) {
    console.error('Failed to load students:', error)
  }
}
onMounted(loadStudentLogs)
onMounted(loadStudentData)
const deleteLog = async (logId) => {
  const student_logs_new = student_logs.value.logs.filter((log) => log.id !== logId)
  const response = await fetch(`http://${host}:3000/student_logs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ logs: student_logs_new }),
  })
}
</script>
<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="md:col-span-full">
      <div
        class="rounded-2xl border border-slate-200 shadow-xl overflow-hidden group transition-all duration-300 hover:shadow-2xl"
      >
        <div class="p-6 text-center relative">
          <h2 class="text-xl font-bold tracking-tight">
            {{ student?.name_arb || 'Loading...' }}
          </h2>
          <p class="text-xs font-semibold uppercase tracking-wider mt-0.5">
            {{ student?.name_eng }}
          </p>

          <div class="w-full h-px my-4"></div>

          <div class="space-y-2.5 text-left">
            <div
              class="flex items-center justify-between px-3 py-2 rounded-xl border border-slate-100"
            >
              <span class="text-[11px] font-bold uppercase tracking-wider">المدرسة</span>
              <span class="text-xs font-semibold flex items-center gap-1">
                {{ student?.school || '—' }}
              </span>
            </div>

            <div
              class="flex items-center justify-between px-3 py-2 rounded-xl border border-slate-100"
            >
              <span class="text-[11px] font-bold uppercase tracking-wider">تاريخ الميلاد</span>
              <span class="text-xs font-semibold">{{ student?.bDate || '—' }}</span>
            </div>

            <div
              class="flex items-center justify-between px-3 py-2 rounded-xl border border-slate-100"
            >
              <span class="text-[11px] font-bold uppercase tracking-wider">جميع المحفوظ</span>
              <span
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-100"
              >
                {{ student.overAllMem }}
              </span>
            </div>
            <div
              class="flex items-center justify-between px-3 py-2 rounded-xl border border-slate-100"
            >
              <span class="text-[11px] font-bold uppercase tracking-wider">الحفظ الجديد</span>
              <span
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-100"
              >
                {{ student.newMem }}
              </span>
            </div>
          </div>

          <div class="mt-5 gap-2">
            <RouterLink :to="'/add-log/' + id" class="w-full">
              <button
                class="w-full py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl cursor-pointer transition-all shadow-xs"
              >
                اضافة سجل
              </button>
            </RouterLink>
            <RouterLink
              v-if="loggedTeacher.type === 'admin'"
              :to="'/update-student/' + id"
              class="w-full"
            >
              <button
                class="w-full py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl cursor-pointer transition-all shadow-xs"
              >
                تعديل بيانات الطالب
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full xl:w-3/4 mx-auto p-4">
    <p class="text-center mb-4 rounded-sm dark:bg-white dark:text-black">السجلات</p>
    <ul
      class="border-base-content/25 divide-base-content/25 *:last:rounded-b-md divide-y rounded-md border *:p-3 *:first:rounded-t-md"
      v-for="log in student_logs.logs"
    >
      <li class="flex items-start sm:items-center">
        <div class="flex grow flex-col items-start justify-between sm:flex-row">
          <div class="w-full">
            <h6 class="text-lg font-bold text-base-content">{{ log.teacherUserName }}</h6>
            <div class="w-full mb-2">
              <small>{{
                new Date(log.time).toLocaleDateString('ar-EG', {
                  hour: '2-digit',
                  minute: '2-digit',
                  month: 'numeric',
                  day: 'numeric',
                  year: 'numeric',
                })
              }}</small>
            </div>
            <div class="flex w-full flex-col md:flex-row mr-2">
              <details
                v-if="log.memDone"
                class="collapse bg-primary border border-base-300"
                name="my-accordion-det-1"
              >
                <summary class="collapse-title font-semibold">اضغط لرؤية الحفظ</summary>
                <div class="collapse-content text-sm">
                  <div class="flex flex-row space-x-2">
                    <span class="bg-base-200 p-1 rounded-sm text-center">{{ log.memDone }}</span
                    ><span class="bg-base-200 p-1 rounded-sm text-center">{{ log.memGrade }}</span>
                  </div>
                </div>
              </details>

              <details
                v-if="log.revDone"
                class="collapse bg-secondary border border-base-300"
                name="my-accordion-det-1"
              >
                <summary class="collapse-title font-semibold">اضغط لرؤية المراجعة</summary>
                <div class="collapse-content text-sm">
                  <div class="flex flex-row space-x-2">
                    <span class="bg-base-200 p-1 rounded-sm text-center">{{ log.revDone }}</span
                    ><span class="bg-base-200 p-1 rounded-sm text-center">{{ log.revGrade }}</span>
                  </div>
                </div>
              </details>
            </div>
            <details
              v-if="log.notes && log.notes !== 'null'"
              class="collapse border border-base-300"
              name="my-accordion-det-1"
            >
              <summary class="collapse-title font-semibold">اضغط لرؤية الملاحظات</summary>
              <div class="collapse-content text-sm">
                <div class="flex flex-row space-x-2">
                  <span class="bg-base-200 p-1 rounded-sm text-center">{{ log.notes }}</span>
                </div>
              </div>
            </details>
          </div>
          <div v-if="loggedTeacher.type === 'admin'" class="max-sm:mt-1 my-auto">
            <button type="button" @click.prevent="deleteLog(log.id)" class="btn btn-warning">
              حذف السجل
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Inline direction utility specifically needed for readable Arabic string flows inside elements */
.dir-rtl {
  direction: rtl;
  text-align: right;
}
</style>

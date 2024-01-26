<script setup lang="ts">

import PieChart from "~/components/chart/pie-chart.vue";

definePageMeta({
  layout: "sidebar-admin",
  middleware: "auth"
})

import TotalNeederSupport from "~/pages/admin/statistics/total-needer-support.vue";
import TotalVolunteer from "~/pages/admin/statistics/total-volunteer.vue";


const client = useSupabaseClient()
const totalUsers = ref(0)
const isDialogDashboard1Visible = ref(false);
const isDialogDashboard2Visible = ref(false);

async function fetchTotalUsers() {
  const {data, error, count} = await client
      .from('accounts')
      .select('*', {count: 'exact'})
      .eq('status', 'TRUE',)
      .eq('role', 'Tình nguyện viên')

  if (error) {
    console.error(error)
    return
  }

  if (count) {
    totalUsers.value = count
    console.log(count)
  }
}
async function handleCount1() {
  isDialogDashboard1Visible.value = true
}
async function handleCount2() {
  isDialogDashboard2Visible.value = true
}
fetchTotalUsers()

</script>

<template>
  <div class="rounded-lg bg-gray-50 p-8  w-full sm:mt-12 mt-10">
    <h1 class="text-gray-800 sm:text-xl text-md font-medium pb-5">Thống kê báo cáo</h1>
    <div class="grid lg:grid-cols-2 grid-cols-1 gap-12">
      <div class=" rounded bg-white  p-3 shadow-md hover:cursor-pointer hover:scale-105 transition duration-200 ease-in-out" @click="handleCount1" >
        <div class="flex justify-between items-center">
          <p class="font-medium text-gray-800">Thống kê số lượng tình nguyện viên</p>
          <Icon name="mdi:account-multiple-plus" class="text-green-500 w-12 h-12"/>
        </div>
        <span class="w-full">
        <hr>
      </span>
        <div class="py-2">
          <p class="text-gray-600 text-sm">Chức năng cho phép quản trị viên thống kê số lượng tình nguyện viên theo
            tháng.</p>
        </div>
      </div>

      <div class=" rounded  bg-white p-3 shadow-md hover:cursor-pointer hover:scale-105 transition duration-200 ease-in-out" @click="handleCount2">
        <div class="flex justify-between items-center">
          <p class="font-medium text-gray-800">Thống kê số lượng người cần hỗ trợ</p>
          <Icon name="mdi:account-multiple-plus" class="text-yellow-500 w-12 h-12"/>
        </div>
        <span class="w-full">
        <hr>
      </span>
        <div class="py-2">
          <p class="text-gray-600 text-sm">Chức năng cho phép quản trị viên thống kê số lượng người cần hỗ trợ theo
            tháng.</p>
        </div>
      </div>

    </div>
    <div class="grid lg:grid-cols-2 grid-cols-1 gap-12 my-10 ">
      <div class="rounded bg-white  p-3 shadow-md">
        <div>
           <ChartLineChart/>
        </div>
      </div>
      <div class="rounded bg-white  p-3 shadow-md">
        <chart-cricel/>
      </div>
    </div>
    <div class="rounded  p-3 shadow-md bg-white">
      <p class="py-5 text-gray-500 text-md font-bold">Danh sách người dùng</p>
      <table-user-data-table/>
    </div>
  </div>
    <total-volunteer v-model="isDialogDashboard1Visible"
                     @ok="handleCount1"
    />
    <total-needer-support v-model="isDialogDashboard2Visible"
                          @ok="handleCount2"
    />
</template>

<style scoped>

</style>

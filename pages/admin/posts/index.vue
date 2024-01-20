<script setup lang="ts">
definePageMeta({
  layout:"sidebar-admin",
  middleware:"auth"
})

import { computed, ref } from 'vue'

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}
const loading = ref(false);
const client = useSupabaseClient();
const search = ref('');
const selectedUser = ref(null);
const users = ref<User[]>([]);
const pageSize = 20;
const currentPage = ref(1);


const tableData = computed(() =>

    users.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())

    )
);

async function fetchUserData() {
  const { data: usersData, error } = await client
      .from('profiles')
      .select('*')
      .order('id', { ascending: true });
  if (error) {
    console.log(error)
  } else {
    users.value = usersData;
  }
}

fetchUserData();

async function handleApprove(id:number){

    loading.value = true;
    const { error } = await client
        .from('profiles')
        .update({ status: 'TRUE' })
        .eq('id',id)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loading.value = false;
    ElNotification.success({
      title: 'Thành công',
      message: 'Duyệt tin đăng thành công.',
      offset: 100,
    })
    // Fetch updated user data
    await fetchUserData();

};

function handlePageChange(newPage: number) {
  currentPage.value = newPage;
  fetchUserData();
}

const currentPageData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return tableData.value.slice(startIndex, endIndex);
})
</script>

<template>
  <div class=" w-full z-1 bg-white p-10 my-10 rounded-lg sm:mt-20" :loading="loading">
    <h1 class="text-gray-600 sm:text-xl text-md font-medium">Duyệt tin đăng</h1>
    <div class="flex justify-between py-2 w-full">
      <input  class="rounded text-sm w-1/4 py-2 px-2 outline-none border hover:border-blue-200 transition duration-200 ease-in-out" v-model="search" placeholder="Nhập thông tin tin đăng..." />
    </div>
    <el-table v-if="tableData.length > 0" :data="currentPageData" style="width: 100%" :pagination="{
      pageSize: 10,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: tableData.length
    }">
      <el-table-column label="ID" prop="id" />
      <el-table-column label="ID người dùng" prop="id_user" />
      <el-table-column label="Ngày tạo" prop="created_at" />
      <el-table-column label="Loại hồ sơ" prop="type" />
      <el-table-column label="Ngày đăng tin" prop="start_date" />
      <el-table-column label="Ngày hết hạn" prop="end_date" />
      <el-table-column label="Trạng thái" prop="status" />
      <el-table-column align="right">
        <template #default="scope">
          <el-button type="danger" v-if="scope.row.status === 'TRUE'">Đã duyệt</el-button>
          <el-button type="primary" v-else @click="handleApprove(scope.row.id)">Duyệt</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="text-center" v-else>
      <p>Không tìm thấy dữ liệu người dùng</p>
    </div>
    <el-pagination class="mt-10" layout="prev, pager, next" :total="tableData.length" @current-change="handlePageChange"></el-pagination>

  </div>
</template>

<style scoped>

</style>

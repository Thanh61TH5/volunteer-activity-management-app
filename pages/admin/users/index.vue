<script setup lang="ts">


import ModifyUser from "~/pages/admin/users/modify-user.vue";
import AddUser from "~/pages/admin/users/add-user.vue";

definePageMeta({
  layout:"dashboard-admin",
  middleware:"auth"
})

import { computed, ref } from 'vue'


definePageMeta({
  layout: 'dashboard-admin',
  middleware: 'auth'
});

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}
const loading = ref(false);
const isOpenModifyForm = ref(false);
const isOpenAddForm = ref(false);
const client = useSupabaseClient();
const search = ref('');
const selectedUser = ref(null);
const users = ref<User[]>([]);
const pageSize = 10;
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
      .from('accounts')
      .select('*')
      .eq('status','TRUE')
      .order('id', { ascending: true });
  if (error) {
    console.log(error)
  } else {
    users.value = usersData;
  }
}

fetchUserData();


const handleEdit = (id: number) => {
  selectedUser.value = tableData.value.find(user => user.id === id);
  isOpenModifyForm.value = true;
};

const handleAdd = () => {
  isOpenAddForm.value = true;
};
const handleSaveEdit = async () => {
  isOpenModifyForm.value = false;
};

const handleSaveAdd = async () => {


};

async function handleDelete(id:number){
  const confirmResult = await ElMessageBox.confirm('Bạn có chắc chắn muốn xóa người dùng này?', 'Xác nhận', {
    confirmButtonText: 'Có',
    cancelButtonText: 'Không',
    type: 'warning'
  });

  if (confirmResult === 'confirm') {
    loading.value = true;
    const { error } = await client
        .from('accounts')
        .update({ status: 'FALSE' })
        .eq('id',id)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loading.value = false;
    ElNotification.success({
      title: 'Thành công',
      message: 'Xóa người dùng thành công.',
      offset: 100,
    })
    // Fetch updated user data
    await fetchUserData();
  }
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
  <div class="relative w-full z-1" :loading="loading">
    <h1 class="text-gray-600 sm:text-xl text-md font-medium">Quản lý người dùng</h1>
    <div class="flex justify-between py-2 w-full">
      <input  class="rounded text-sm w-1/4 py-2 px-2 outline-none border hover:border-blue-200 transition duration-200 ease-in-out" v-model="search" placeholder="Nhập thông tin người dùng..." />
      <button @click="handleAdd()" class="bg-green-500 rounded text-white hover:bg-green-400 py-2 px-4 mr-2 text-sm">Thêm tài khoản</button>
    </div>
    <el-table v-if="tableData.length > 0" :data="currentPageData" style="width: 100%" :pagination="{
      pageSize: 10, // Số lượng dữ liệu hiển thị trên mỗi trang
      layout: 'total, sizes, prev, pager, next, jumper', // Cấu trúc phân trang
      total: tableData.length // Tổng số lượng dữ liệu
    }">      <el-table-column label="ID" prop="id" />
      <el-table-column label="Họ tên" prop="name" />
      <el-table-column label="Email" prop="email" />
      <el-table-column label="Mật khẩu" prop="password" />
      <el-table-column label="Loại tài khoản" prop="role" />
      <el-table-column align="right">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row.id)">Sửa</el-button>
          <el-button type="danger" @click="handleDelete(scope.row.id)">Xóa</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="text-center" v-else>
      <p>Không tìm thấy dữ liệu người dùng</p>
    </div>
    <el-pagination class="mt-10" layout="prev, pager, next" :total="tableData.length" @current-change="handlePageChange"></el-pagination>

    <modify-user class="absolute top-8 w-full z-10" v-if="isOpenModifyForm"
                 :user="selectedUser"
                 :fetchUserData="fetchUserData"
                 @close="isOpenModifyForm = false"
                 @save="handleSaveEdit"/>
    <AddUser class="absolute top-8 w-full z-10" v-if="isOpenAddForm"
                 :fetchUserData="fetchUserData"
                 @close="isOpenAddForm = false"
                 @add="handleSaveAdd"/>
  </div>
</template>

<style scoped>

</style>

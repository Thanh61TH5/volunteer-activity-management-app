<script setup lang="ts">
definePageMeta({
  layout:"sidebar-admin",
  middleware:"auth"
})


import ModifyUser from "~/pages/admin/users/modify-user.vue";
import AddUser from "~/pages/admin/users/add-user.vue";

import { computed, ref } from 'vue'


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
const isAddUserDialogVisible = ref(false);
const isModifyUserDialogVisible = ref(false);


const tableData = computed(() =>

    users.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())

    )
);


async function fetchUserData() {
  const { data: usersData, error } = await client
      .from('get_user_info')
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
  isModifyUserDialogVisible.value = true
};

const handleAdd = () => {
  isAddUserDialogVisible.value = true;

};
const handleSaveEdit = async () => {
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
  <div class=" rounded-lg bg-white p-8  w-full sm:mt-12 mt-10" :loading="loading">
    <h1 class="text-gray-600 sm:text-xl text-md font-medium">Quản lý người dùng</h1>
    <div class="flex justify-between py-2 w-full">
      <input  class="rounded text-sm w-1/4 py-2 px-2 outline-none border hover:border-blue-200 transition duration-200 ease-in-out" v-model="search" placeholder="Nhập thông tin người dùng..." />
      <button @click="handleAdd" class="bg-green-500 rounded text-white hover:bg-green-400 py-2 px-2 mr-2.5 text-sm">Thêm người dùng</button>
    </div>
    <el-table
        v-if="tableData.length > 0"
        :data="currentPageData"
        style="width: 100%"
        :pagination="{
    pageSize: pageSize,
    layout: 'total, sizes, prev, pager, next, jumper',
    total: tableData.length // Update this line to use the length of the filtered data
  }"
    >
      <el-table-column label="ID" prop="id" />
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
    <el-pagination
        class="mt-10"
        layout="prev, pager, next"
        :total="tableData.length"
    :page-size="pageSize"
    @current-change="handlePageChange"
    ></el-pagination>
      <modify-user v-model="isModifyUserDialogVisible"
                   v-loading ="loading"
                   :user="selectedUser"
                   :fetchUserData="fetchUserData"
                   @close="isModifyUserDialogVisible = false"
                   @save="handleSaveEdit"
      />

    <AddUser v-model="isAddUserDialogVisible"
        :fetchUserData="fetchUserData"
        @close="isAddUserDialogVisible = false"
        @add="handleSaveAdd" @updateUserList="fetchUserData"
    />
  </div>
</template>

<style scoped>

</style>

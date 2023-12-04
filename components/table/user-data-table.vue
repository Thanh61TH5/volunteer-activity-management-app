<script setup lang="ts">


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
    <el-table v-if="tableData.length > 0" :data="currentPageData" style="width: 100%" :pagination="{
      pageSize: 10, // Số lượng dữ liệu hiển thị trên mỗi trang
      layout: 'total, sizes, prev, pager, next, jumper', // Cấu trúc phân trang
      total: tableData.length // Tổng số lượng dữ liệu
    }">      <el-table-column label="ID" prop="id" />
      <el-table-column label="Họ tên" prop="name" />
      <el-table-column label="Email" prop="email" />
      <el-table-column label="Mật khẩu" prop="password" />
      <el-table-column label="Loại tài khoản" prop="role" />
    </el-table>

    <div class="text-center" v-else>
      <p>Không tìm thấy dữ liệu người dùng</p>
    </div>
    <el-pagination class="mt-10" layout="prev, pager, next" :total="tableData.length" @current-change="handlePageChange"></el-pagination>
  </div>
</template>

<style scoped>

</style>

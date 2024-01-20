<script setup lang="ts">

import { formatTime, formatDate } from '~/assets/utils/format';
interface Request {
  id: number;
  index: number;
  name_sender: string;
  approval_date: string;
  message: string;
  cancel_date: string;
  cancel_reason: string;
  sent_date: string;
}

const loading = ref(false);
const client = useSupabaseClient();
const search = ref('');
const user = useSupabaseUser();
const requests = ref<Request[]>([]);
const pageSize = 10;
const currentPage = ref(1);

const tableData = computed(() =>
    requests.value.filter((data) => {
      const senderNameMatch = !search.value ||
          data.name_sender.toLowerCase().includes(search.value.toLowerCase());

      const sentDateMatch = !search.value ||
          data.sent_date.toLowerCase().includes(search.value.toLowerCase());

      const approvalDateMatch = !search.value ||
          (data.approval_date && data.approval_date.toLowerCase().includes(search.value.toLowerCase()));

      return senderNameMatch || sentDateMatch || approvalDateMatch;
    })
);

async function selectedRequest(id: number) {
  try {
    await client.from('requests').update({ status: 'Đã duyệt', approval_date: new Date() }).eq('id', id);
    // Refresh data after updating the status
    fetchUserData();
  } catch (error) {
    console.error(error);
  }
}

async function fetchUserData() {
  try {
    const { data: usersData, error } = await client
        .from('accounts')
        .select('*')
        .eq('email', user.value.email);
    if (usersData && usersData.length > 0) {
      const userId = usersData[0].id;
      const { data: requestData, error } = await client
          .from('get_request_info')
          .select('*')
          .eq('id_receiver', userId);
      if (requestData) {
        // Add index property to each request
        requests.value = requestData.map((request, index) => ({
          ...request,
          index: index + 1,
        }));
      }
    }
  } catch (error) {
    console.error(error);
  }
}


fetchUserData();

function handlePageChange(newPage: number) {
  fetchUserData();
  currentPage.value = newPage;
}

const currentPageData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return tableData.value.slice(startIndex, endIndex);
});
</script>

<template>
  <div class="relative w-full z-1 p-10 bg-white" :loading="loading">
    <h1 class="text-gray-600 sm:text-2xl text-xl font-medium pb-10">Quản lý yêu cầu tham gia thiện nguyện</h1>
    <div class="flex justify-between py-2 w-full">
      <input  class="rounded text-sm w-1/4 py-2 px-2 outline-none border hover:border-blue-200 transition duration-200 ease-in-out" v-model="search" placeholder="Nhập thông tin cần tìm..." />
    </div>
    <el-table v-if="tableData.length > 0" :data="currentPageData" style="width: 100%" :pagination="{
      pageSize: 10,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: tableData.length
    }">
      <el-table-column label="STT" align="center">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="Tên người gửi" prop="name_sender" />
      <el-table-column label="Lời nhắn" prop="message" />
      <el-table-column label="Ngày gửi" prop="sent_date">
        <template #default="scope">
          {{ scope.row.sent_date ? formatDate(new Date(scope.row.sent_date)) : '' }}
        </template>
      </el-table-column>
      <el-table-column label="Ngày phê duyệt" prop="approval_date" >
        <template #default="scope">
          {{ scope.row.approval_date ? formatDate(new Date(scope.row.approval_date)) : '' }}
        </template>
      </el-table-column>
      <el-table-column label="Ngày hủy" prop="cancel_date">
        <template #default="scope">
          {{ scope.row.cancel_date ? formatDate(new Date(scope.row.cancel_date)) : '' }}
        </template>
      </el-table-column>
      <el-table-column label="Lý do hủy" prop="cancel_reason" />
      <el-table-column label="Trạng thái" prop="status" />

      <!-- Other el-table-column definitions remain unchanged -->
      <el-table-column align="right">
        <template #default="scope">
          <el-button
              v-if="scope.row.status == 'Đang chờ duyệt' && scope.row.status !== 'Đã hủy'"
              type="primary"
              class="w-32"
              @click="selectedRequest(scope.row.id)"
          >
            Duyệt
          </el-button>

          <el-button
              v-else-if="scope.row.status == 'Đã hủy'"
              type="danger"
              disabled
              class="w-32"
              @click="selectedRequest(scope.row.id)"
          >
            Đã hủy
          </el-button>
          <el-button class="w-32" v-else type="success">Đánh giá</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="text-center" v-else>
      <p>Không tìm thấy dữ liệu</p>
    </div>
    <el-pagination
        class="mt-10"
        layout="prev, pager, next"
        :total="tableData.length"
        @current-change="handlePageChange"
    ></el-pagination>
  </div>
</template>

<style scoped>
/* Add your styles here if needed */
</style>

<script setup lang="ts">

import { formatTime, formatDate } from '~/assets/utils/format';
import Review from "~/components/form/review.vue";
interface Request {
  id: number;
  index: number;
  name_sender: string;
  approval_date: string;
  message: string;
  cancel_date: string;
  cancel_reason: string;
  sent_date: string;
  is_done_volunteer:boolean;
  is_done_sp:boolean;
  status: string;
}

const loading = ref(false);
const client = useSupabaseClient();
const search = ref('');
const user = useSupabaseUser();
const requests = ref<Request[]>([]);
const pageSize = 10;
const currentPage = ref(1);
const openReviewForm = ref(false);
const isReviewSent = ref(false);

const tableData = computed(() =>
    requests.value.filter((data) => {
      const senderNameMatch = !search.value ||
          data.name_sender.toLowerCase().includes(search.value.toLowerCase());

      const statusMatch = !search.value ||
          data.status.toLowerCase().includes(search.value.toLowerCase());

      return senderNameMatch || statusMatch;
    })
);
const selectedRequestData = ref(null);
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
const reviewProfile = (id: number) => {
  selectedRequestData.value = tableData.value.find(request => request.id === id);
  fetchUserData()
  openReviewForm.value = true;
};
function closeForm() {
  fetchUserData()
  openReviewForm.value = false;
}
function saveReviewForm() {
  openReviewForm.value = false;
  isReviewSent.value = true
}

</script>
<template>
  <div class="relative w-full z-1 p-10 bg-white" :loading="loading">
    <h1 class="text-gray-600 sm:text-2xl text-xl font-medium pb-10">Quản lý yêu cầu tham gia thiện nguyện</h1>
    <div class="flex justify-between py-2 w-full">
      <input  class="rounded text-sm w-1/4 py-2 px-2 outline-none border hover:border-blue-200 transition duration-200 ease-in-out" v-model="search" placeholder="Nhập thông tin người gửi..." />
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
      <el-table-column label="Ngày duyệt" prop="approval_date" >
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
              style="width: 100px"
              @click="selectedRequest(scope.row.id)"
          >
            Duyệt
          </el-button>

          <el-button
              v-else-if="scope.row.status == 'Đã hủy'"
              type="danger"
              disabled
              style="width: 100px"
              @click="selectedRequest(scope.row.id)"
          >
            Đã hủy
          </el-button>
          <el-button
              style="width: 100px"
              type="success"
              v-if="scope.row.status=='Đã duyệt' && scope.row.is_done_sp ==false"
              @click="reviewProfile(scope.row.id)"
          >
            Đánh giá
          </el-button>
          <el-button
              style="width: 100px"
              type="warning"
              v-if="scope.row.status=='Đã duyệt' && scope.row.is_done_sp ==true"
              disabled
          >
            Đã hoàn thành
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <review v-if="openReviewForm" :request="selectedRequestData" @close="closeForm" @save="saveReviewForm" :fetchUserData="fetchUserData"/>
<!--    <div class="text-center" v-else>-->
<!--      <p>Không tìm thấy dữ liệu</p>-->
<!--    </div>-->
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

<script setup lang="ts">



import CancelPrativeVolunteer from "~/components/form/cancel-prative-volunteer.vue";

interface Request {
  id: number;
  index: number;
  id_profile: string;
  name_receiver: string;
  approval_date: string;
  cancel_date: string;
  cancel_reason: string;
  sent_date: string;
  status: string;
}

const loading = ref(false);
const client = useSupabaseClient();
const search = ref('');
const user = useSupabaseUser();
const requests = ref<Request[]>([]);
const pageSize = 10;
const currentPage = ref(1);
const openCancelForm = ref(false)


const tableData = computed(() =>
    requests.value.filter((data) => {
      const senderNameMatch = !search.value ||
          data.name_receiver.toLowerCase().includes(search.value.toLowerCase());

      const senderCancelReasonMatch = !search.value ||
          data.cancel_reason.toLowerCase().includes(search.value.toLowerCase());

      const senderIdProfileMatch = !search.value ||
          (data.id_profile.toLowerCase().includes(search.value.toLowerCase()));

      const sentDateMatch = !search.value ||
          data.sent_date.toLowerCase().includes(search.value.toLowerCase());

      const approvalDateMatch = !search.value ||
          (data.approval_date && data.approval_date.toLowerCase().includes(search.value.toLowerCase()));

      return senderNameMatch || sentDateMatch || approvalDateMatch || senderCancelReasonMatch || senderIdProfileMatch;
    })
);

async function cancelRequest(id: number) {
  try {
    openCancelForm.value = true
    // const { data: checkData, error } = await client.from('profiles').select('end_date_post').eq('id', id).single();
    //
    // if (error) {
    //   console.error(error);
    //   return;
    // }
    //
    // if (checkData && new Date(checkData.end_date_post) < new Date()) {
    //   ElNotification.info({
    //     title: 'Thông báo',
    //     message: 'Đã hết hạn hủy tham gia. Hãy liên hệ với người cần hỗ trợ hoặc quản trị viên nếu bạn cần.',
    //   });
    // } else {
    //   await client.from('requests').update({ status: 'Đã hủy', cancel_date: new Date() }).eq('id', id);
    //   fetchUserData();
    //   ElNotification.success({
    //     title: 'Thành công',
    //     message: 'Hủy tham gia thành công.',
    //   });
    // }

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
          .from('get_request_info_receiver')
          .select('*')
          .eq('id_sender', userId);
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
    <h1 class="text-gray-600 sm:text-2xl text-xl font-medium pb-10">Quản lý tin tham gia thiện nguyện</h1>
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
      <el-table-column label="Mã hồ sơ" prop="id_profile" />
      <el-table-column label="Tên người nhận" prop="name_receiver" />
      <el-table-column label="Ngày gửi" prop="sent_date" />
      <el-table-column label="Ngày phê duyệt" prop="approval_date" />
      <el-table-column label="Ngày hủy" prop="cancel_date" />
      <el-table-column label="Lý do hủy" prop="cancel_reason" />
      <el-table-column label="Trạng thái" prop="status" />
      <!-- Other el-table-column definitions remain unchanged -->
      <el-table-column align="right">
        <template #default="scope">
          <el-button v-if="scope.row.status === 'Đang chờ duyệt'"
              type="warning"
              @click="cancelRequest(scope.row.id)"
          >
            Hủy tham gia
          </el-button>
          <el-button v-if="scope.row.status === 'Đã hủy'"
                     disabled
              type="danger"

          >
            Đã hủy
          </el-button>
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
  <cancel-prative-volunteer v-if="openCancelForm"/>
</template>

<style scoped>
/* Add your styles here if needed */
</style>

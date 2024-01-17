<script setup lang="ts">



import CancelPrativeVolunteer from "~/components/form/cancel-prative-volunteer.vue";
import Review from "~/components/form/review.vue";

interface Request {
  id: number;
  index: number;
  id_profile: string;
  is_done_volunteer: boolean,
  is_done_sp_seeker: boolean,
  message: string;
  id_sender: number;
  id_receiver:number;
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
const openCancelForm = ref(false);
const openReviewForm = ref(false);
const isReviewSent = ref(false);


const isBeforeToday = (dateString: string | number | Date) => {
  const currentDate = new Date();
  const sentDate = new Date(dateString);

  const currentDateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  const sentDateString = `${sentDate.getFullYear()}-${sentDate.getMonth() + 1}-${sentDate.getDate()}`;

  return sentDateString < currentDateString;
};

const tableData = computed(() =>
    requests.value.filter((data) => {
      const senderNameMatch = !search.value ||
          data.name_receiver.toLowerCase().includes(search.value.toLowerCase());

      const senderCancelReasonMatch = !search.value ||
          data.cancel_reason.toLowerCase().includes(search.value.toLowerCase());

      const statusMatch = !search.value ||
          data.status.toLowerCase().includes(search.value.toLowerCase());

      const sentDateMatch = !search.value ||
          data.sent_date && data.sent_date.toLowerCase().includes(search.value.toLowerCase());

      const cancelDateMatch = !search.value ||
          data.cancel_date && data.cancel_date.toLowerCase().includes(search.value.toLowerCase());

      const approvalDateMatch = !search.value ||
          (data.approval_date && data.approval_date.toLowerCase().includes(search.value.toLowerCase()));


      const idProfileMatch = !search.value ||
          (data.id_profile && data.id_profile.toString().toLowerCase().includes(search.value.toLowerCase()));


      return senderNameMatch || sentDateMatch || approvalDateMatch || senderCancelReasonMatch || idProfileMatch || statusMatch || cancelDateMatch;
    })
);

const selectedRequestData = ref(null);
async function fetchUserData() {
  loading.value = true
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
          .eq('id_sender', userId);
      if (requestData) {
        // Add index property to each request
        requests.value = requestData.map((request, index) => ({
          ...request,
          index: index + 1,
        }));
      }
    }
    loading.value = false
  } catch (error) {
    console.error(error);
  }
}

const cancelRequest = (id: number) => {
  selectedRequestData.value = tableData.value.find(request => request.id === id);
  openCancelForm.value = true;
};
const reviewProfile = (id: number) => {
  selectedRequestData.value = tableData.value.find(request => request.id === id);
  openReviewForm.value = true;
};
function closeForm() {
  fetchUserData()
  openCancelForm.value = false;
  openReviewForm.value = false;
}

function saveForm() {
  fetchUserData()
  openCancelForm.value = false;

}

function saveReviewForm() {
  openReviewForm.value = false;
  isReviewSent.value = true
}

async function doneProfile(requestId: number) {
  ElMessageBox({
    title: 'Xác nhận',
    message: h('p', null, [
      h('span', null, 'Bạn có chắc đã hoàn thành yêu cầu thiện nguyện không '),
    ]),
    showCancelButton: true,
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Hủy',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = 'Đang xác nhận...'
        setTimeout(() => {
          done()
          setTimeout(() => {
            instance.confirmButtonLoading = false
          }, 300)
        }, 3000)
      } else {
        done()
      }
    },
    // ... (code xác nhận trước)
  }).then(async (action) => {
    if (action === 'confirm') {
      // Gọi hàm cập nhật giá trị is_done_volunteer
      await updateIsDoneVolunteer(requestId);
      fetchUserData();
    }

  });
}

async function updateIsDoneVolunteer(requestId: number) {
  try {
    // Gửi yêu cầu cập nhật giá trị is_done_volunteer = true
    await client
        .from('requests')
        .update({ is_done_volunteer: true })
        .eq('id', requestId);

    ElNotification.success({
      title: 'Thông báo',
      message: 'Xác nhận hoàn thành công.',
    });
  } catch (error) {
    console.error('Lỗi cập nhật trạng thái:', error);
    ElNotification.error({
      title: 'Lỗi',
      message: 'Có lỗi xảy ra khi cập nhật trạng thái. Vui lòng thử lại.',
    });
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
  <div class="relative w-full">
  <div class=" w-full z-1 p-10 bg-white">
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
      <el-table-column label="Mã hồ sơ yêu cầu" prop="id_profile" />
      <el-table-column label="Lời nhắn" prop="message" />
      <el-table-column label="Ngày gửi" prop="sent_date" />
      <el-table-column label="Ngày phê duyệt" prop="approval_date" />
      <el-table-column label="Ngày hủy" prop="cancel_date" />
      <el-table-column label="Lý do hủy" prop="cancel_reason" />
      <el-table-column label="Trạng thái" prop="status" />
      <!-- Other el-table-column definitions remain unchanged -->
      <el-table-column>
        <template #default="scope">
          <div class="flex flex-col space-y-2">
            <div>
              <el-button v-if="scope.row.status === 'Đang chờ duyệt'"

                         class="w-32 border-2 border-red-500"
                         @click="cancelRequest(scope.row.id)">
                Hủy tham gia
              </el-button>
              <el-button v-if="scope.row.status === 'Đã hủy'"
                         disabled
                         class="w-32"
                         type="danger">
                Đã hủy
              </el-button>
            </div>
            <el-button  v-if="scope.row.status === 'Đã duyệt' && !isReviewSent && scope.row.is_done_volunteer === 'FALSE'"
                       type="warning"
                       class="w-32"
                        @click="doneProfile(scope.row.id)">

              Hoàn thành
            </el-button>
            <el-button  v-if="scope.row.is_done_volunteer === 'TRUE'"
                        type="success"
                        class="w-32">
              Đánh giá
            </el-button>
          </div>
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
  <cancel-prative-volunteer v-if="openCancelForm" :request="selectedRequestData" @close="closeForm" @save="saveForm" :fetchUserData="fetchUserData"/>
    <review v-if="openReviewForm" :request="selectedRequestData" @close="closeForm" @save="saveReviewForm" :fetchUserData="fetchUserData"/>
    <div v-if="loading" class=" loading right-0 left-0 bottom-0 top-0 flex justify-center items-center  absolute">
      <p class="text-white">Đang tải dữ liệu...</p>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here if needed */
</style>

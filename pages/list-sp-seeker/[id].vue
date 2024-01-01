<template>
  <div class="min-h-screen mx-3 lg:mx-32 sm:pt-24 mt-10 pb-10 space-y-3">
    <div class="sm:flex w-full ">

      <div class="border border-gray-100 shadow-md rounded-lg bg-white p-5 sm:w-2/5  m-3">
        <div class="w-full flex justify-center items-center py-5">
          <img :src="spSeekerData.avt" alt="avatar"
               class=" flex justify-center rounded-full w-32 h-32 border-2 border-gray-300">
        </div>
        <h1 class="text-gray-600 font-bold text-lg py-5">Thông tin chung:</h1>
        <div class="space-y-5">
          <div class="flex flex-wrap">
            <label class="font-medium text-gray-600" for="name_job">Họ và tên: </label>
            <p class=" text-gray-600"> {{ spSeekerData.name }}</p>
          </div>
          <div class="flex flex-wrap">
            <label class="font-medium text-gray-600" for="name_job">Ngày sinh: </label>
            <p class=" text-gray-600"> {{ formatDate(spSeekerData.birthday) }}</p>
          </div>
          <div class="flex flex-wrap">
            <label class="font-medium text-gray-600" for="name_job">Giới tính: </label>
            <p class=" text-gray-600"> {{ spSeekerData.gender }}</p>
          </div>
          <div class="flex flex-wrap">
            <label class="font-medium text-gray-600" for="name_job">Địa chỉ: </label>
            <p class=" text-gray-600"> {{ spSeekerData.address }}</p>
          </div>
          <div class="flex flex-wrap">
            <label class="font-medium text-gray-600" for="name_job">Số điện thoại: </label>
            <p class=" text-gray-600"> {{ spSeekerData.phone }}</p>
          </div>
          <div class="flex flex-wrap">
            <label class="font-medium text-gray-600" for="name_job">Người thân: </label>
            <p class=" text-gray-600"> {{ spSeekerData.contact_family_info }}</p>
          </div>
        </div>
      </div>

      <div class=" sm:w-3/5  m-3 space-y-5">
        <div class="border border-gray-100 shadow-md rounded-lg bg-white p-5">
          <div class=" text-gray-600 font-bold text-lg py-5 flex space-x-5">
            <p>Công việc cần hỗ trợ: </p>
            <p> {{ spSeekerData.support_job_name }}</p>
          </div>
          <div class="grid lg:grid-cols-2 gap-4">
            <div>
              <label class="font-medium text-gray-600" for="name_job">Thời gian cần hỗ trợ: </label>
              <p>Giờ:{{ spSeekerData.support_time_start }} - {{spSeekerData.support_time_end }}</p>
              <p>Ngày:{{ spSeekerData.support_day_start }} - {{spSeekerData.support_day_end }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Hạn hồ sơ: </label>
              <p class=" text-gray-600"> {{ formatDate(spSeekerData.end_date_post) }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Khu vực: </label>
              <p class=" text-gray-600"> {{spSeekerData.area}}</p>
            </div>
          </div>
          <div class="py-5 flex justify-between items-center space-x-10">
            <button
                class="w-2/3 px-3 bg-green-500 rounded-lg text-white text-center py-3 hover:opacity-80 transition duration-200 ease-in-out"
                @click="notifyJoin = true"> Tham gia
            </button>
            <button
                class="w-1/3 py-2 px-3 border-2 border-green-300 rounded-lg text-center hover:bg-gray-100 transition duration-200 ease-in-out"
                @click="notifySave = true "> Lưu tin
            </button>
          </div>
        </div>

        <div class="border border-gray-100 shadow-md rounded-lg bg-white p-5">
          <h1 class="text-gray-600 font-bold text-lg py-5">Thông tin khác:</h1>
          <div class="space-y-3">
            <div>
              <label class="font-medium text-gray-600" for="name_job">Sở thích: </label>
              <p class=" text-gray-600"> {{ spSeekerData.hobbies }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Mô tả sức khỏe: </label>
              <p class=" text-gray-600"> {{ spSeekerData.helth_description }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Mô tả bản thân: </label>
              <p class=" text-gray-600"> {{ spSeekerData.self_description }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Thời gian cần hỗ trợ: </label>
              <p class="text-gray-600">Giờ: {{ spSeekerData.support_time_start }} đến {{spSeekerData.support_time_end }}</p>
              <p class="text-gray-600">Ngày: {{ formatDate(spSeekerData.support_day_start) }} đến {{formatDate(spSeekerData.support_day_end) }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Công việc cần hỗ trợ: </label>
              <p class=" text-gray-600"> {{ spSeekerData.support_job_name }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Hạn hồ sơ: </label>
              <p class=" text-gray-600"> {{ formatDate(spSeekerData.end_date_post) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="m-3">
      <div class="bg-white border border-gray-100 shadow-md rounded-lg p-5 ">
        <div class="">
          <div class="flex flex-wrap  items-center">
            <label class="font-medium text-gray-600 pr-1" for="name_job">Tổng sao đánh giá: </label>
            <el-rate
                v-model="totalScore.avg_score"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value} sao"
            />
          </div>
          <div class=" text-gray-600 font-bold text-lg py-5 flex space-x-5">
            <p>Chi tiết đánh giá: </p>
          </div>
          <div>
            <div class="flex space-x-5 my-5"  v-for="(feedback, index) in feedbackData" :key="index">
              <div class="w-full rounded-lg border border-gray-200 space-y-5 p-5">
                <div class="flex flex-wrap items-center">
                  <p class="text-gray-500 pr-3">Số sao:</p>
                  <el-rate
                      v-model="feedback.score"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value} sao"

                  />
                </div>
                <div class="flex flex-wrap">
                  <p class="text-gray-500 pr-3">Tên người đánh giá:</p>
                  <p>{{feedback.name_reviewer}}</p>
                </div>
                <div class="flex flex-wrap">
                  <p class="text-gray-500 pr-3">Ngày đánh giá:</p>
                  <p>{{formatCreateDate(feedback.created_at)}}</p>
                </div>
                <div class="">
                  <p class="text-gray-500 pr-3">Nội dung:</p>
                  <p>{{feedback.content}}</p>
                </div>
              </div>
              </div>

          </div>
        </div>
      </div>
      </div>
    </div>
    <el-dialog v-model="notifySave" center class="rounded-lg ">
    <span class="text-center">
      Để lưu tin, bạn cần phải đăng nhập. Bạn có muốn tiếp tục?
    </span>
      <template #footer>
      <span class="dialog-footer  flex justify-center items-center space-x-3">
        <el-button @click="notifySaveCancel">Hủy bỏ</el-button>
        <el-button type="primary" @click="notifySaveOk">
          Tiếp tục
        </el-button>
      </span>
      </template>
    </el-dialog>

    <el-dialog v-model="notifyJoin" center class="rounded-lg">
    <span class="text-center">
      Để tham gia thiện nguyện, bạn cần phải có tài khoản. Bạn có muốn tiếp tục?
    </span>
      <template #footer>
      <span class="dialog-footer flex justify-center items-center space-x-3">
        <el-button @click="notifyJoinCancel">Hủy bỏ</el-button>
        <el-button type="primary" @click="notifyJoinOk">
          Tiếp tục
        </el-button>
      </span>
      </template>
    </el-dialog>
</template>

<script setup>
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();
const postId = route.params.id;
console.log("Post ID:", postId);
const spSeekerData = ref([]);
const feedbackData = ref([]);
const totalScore = ref([]);
const notifySave = ref(false);
const notifyJoin = ref(false)
onMounted(async () => {
  const {data} = await supabase.from('get_profile_sp').select('*').eq('id', postId).single();
  spSeekerData.value = data;
});

onMounted(async () => {
  const {data} = await supabase.from('get_info_feedbacks').select('*').eq('id_profile', postId);
  feedbackData.value = data;
});

onMounted(async () => {
  const { data } = await supabase.from('get_id_profile_and_total_score').select().eq('id_profile', postId);;
  if (data.length > 0) {
    totalScore.value = data[0];
    console.log(totalScore.value.avg_score);
  } else {
    console.error('No data found');
  }
});

const formatCreateDate = (timestamp) => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const notifySaveOk = () => {
  notifySave.value = false;
  router.push('/login');
};

const notifySaveCancel = () => {
  notifySave.value = false;
};

const notifyJoinOk = () => {
  notifyJoin.value = false;
  router.push('/login');
};

const notifyJoinCancel = () => {
  notifyJoin.value = false;
};

</script>

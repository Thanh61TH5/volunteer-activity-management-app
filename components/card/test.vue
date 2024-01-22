

<template>
  <div class="flex justify-center sm:mx-32 sm:mt-32">
    <div class="min-h-screen pb-10 space-y-3 mx-auto relative">
      <div class="sm:flex">
        <div class="border border-gray-100 shadow-md rounded-lg bg-white sm:px-20 px-5 py-10 m-3">
          <h1 class="text-gray-600 sm:text-2xl text-xl font-medium py-2">Quản lý hồ sơ</h1>
          <div class=" flex justify-center py-5">
            <img :src="spSeekerData.avt" alt="avatar"
                 class=" flex justify-center rounded-full w-32 h-32 border-2 border-gray-300">
          </div>
          <div class="py-5 flex justify-center items-center space-x-10">
            <button
                class=" px-5 bg-blue-500 rounded-lg text-white text-center py-2 hover:opacity-80 transition duration-200 ease-in-out"
                @click="editProfile"
            >Sửa hồ sơ
            </button>
            <div v-if="isPost">
              <!-- Nút đăng tin -->
              <button class="cancel-post-button px-5 bg-green-500 rounded-lg text-white text-center py-2 hover:opacity-80 transition duration-200 ease-in-out" @click="postProfile">
                Đăng tin
              </button>
            </div>
            <div v-else>
              <!-- Nút hủy đăng tin -->
              <button class="post-button px-5 bg-red-500 rounded-lg text-white text-center py-2 hover:opacity-80 transition duration-200 ease-in-out" @click="cancelPostProfile">
                Hủy đăng tin
              </button>
            </div>
          </div>
          <h1 class="text-gray-600 font-bold text-lg py-5">Thông tin chung:</h1>
          <div class="space-y-5">
            <div class="flex flex-wrap">
              <label class="font-medium text-gray-600 px-1" for="name_job">Họ và tên: </label>
              <p class=" text-gray-600 px-1"> {{ spSeekerData.name }}</p>
            </div>
            <div class="flex flex-wrap">
              <label class="font-medium text-gray-600 px-1" for="name_job">Ngày sinh: </label>
              <p class=" text-gray-600 px-1"> {{ formatDate(spSeekerData.birthday) }}</p>
            </div>
            <div class="flex flex-wrap">
              <label class="font-medium text-gray-600 px-1" for="name_job">Giới tính: </label>
              <p class=" text-gray-600 px-1"> {{ spSeekerData.gender }}</p>
            </div>
            <div class="flex flex-wrap">
              <label class="font-medium text-gray-600 px-1" for="name_job">Địa chỉ: </label>
              <p class=" text-gray-600 px-1"> {{ spSeekerData.address }}</p>
            </div>
            <div class="flex flex-wrap">
              <label class="font-medium text-gray-600 px-1" for="name_job">Khu vực: </label>
              <p class=" text-gray-600 px-1"> {{ spSeekerData.area }}</p>
            </div>
            <div class="flex flex-wrap">
              <label class="font-medium text-gray-600 px-1" for="name_job">Số điện thoại: </label>
              <p class=" text-gray-600 px-1"> {{ spSeekerData.phone }}</p>
            </div>
            <div class="flex flex-wrap">
              <label class="font-medium text-gray-600 px-1" for="name_job">Mô tả bản thân: </label>
              <p class=" text-gray-600 px-1"> {{ spSeekerData.self_description }}</p>
            </div>
            <div class="flex flex-wrap">
              <label class="font-medium text-gray-600 px-1" for="name_job">Sở thích: </label>
              <p class=" text-gray-600 px-1"> {{ spSeekerData.hobbies }}</p>
            </div>
            <div class="flex flex-wrap">
              <label class="font-medium text-gray-600 px-1" for="name_job">Xếp loại sức khỏe: </label>
              <p class=" text-gray-600 px-1"> {{ spSeekerData.health_level }}</p>
            </div>
            <div class="flex flex-wrap">
              <label class="font-medium text-gray-600 px-1" for="name_job">Mô tả sức khỏe: </label>
              <p class=" text-gray-600 px-1"> {{ spSeekerData.helth_description }}</p>
            </div>
          </div>
          <span class="py-5">
          <hr>
        </span>
          <div class="">
            <h1 class="text-gray-600 font-bold text-lg pb-5">Thông tin thiện nguyện:</h1>
            <div class="space-y-5">
              <div class="flex flex-wrap">
                <label class="font-medium text-gray-600 px-1" for="name_job">Hoàn cảnh cá nhân: </label>
                <p class=" text-gray-600 px-1"> {{ spSeekerData.personal_situation }}</p>
              </div>
              <div class="flex flex-wrap">
                <label class="font-medium text-gray-600 px-1" for="name_job">Công việc cần hỗ trợ: </label>
                <p class=" text-gray-600 px-1"> {{ spSeekerData.support_job_name }}</p>
              </div>
              <div >
                <label class="font-medium text-gray-600 px-1" for="name_job">Thời gian cần hỗ trợ: </label>
                <div class=" font-600 px-1">
                  <p class="text-gray-600 flex"><p class="pr-2 ">Giờ:</p> <p class="font-medium">{{ formatTime(spSeekerData.support_time_start) }}</p> <p class="mx-2">đến</p> <p class="font-medium">{{formatTime(spSeekerData.support_time_end) }}</p></p>
                  <p class="text-gray-600 flex"><p class="pr-2 ">Các thứ trong tuần:</p> <p class="font-medium">{{ (spSeekerData.support_weekday) }}</p></p>
                </div>
              </div>
              <div class="flex flex-wrap">
                <label class="font-medium text-gray-600 px-1" for="name_job">Liên hệ gia đình: </label>
                <p class=" text-gray-600"> {{ spSeekerData.contact_family_info }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="m-3 ">
        <div class="bg-white border border-gray-100 shadow-md rounded-lg sm:px-20 p-10 ">
          <div class="">
            <div class="flex flex-wrap  items-center">
              <label class="font-medium text-gray-600 pr-1" for="name_job">Tổng sao đánh giá: </label>
              <el-rate
                  v-model="totalScore.avg_stars"
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
    <modify-profile class="absolute top-0 right-0 left-0" v-if="openEditForm" @save="editProfile" @close="cancelEditForm" :profile="spSeekerData"/>
    <form-post class="absolute top-0 right-0 left-0" v-if="openPostForm"  @post="postProfile" @close="cancelPostForm" :profile="spSeekerData" @hideParentButton="hideParentButton"/>
  </div>

</template>

<script setup>
import ModifyProfile from "~/components/form/modify-profile.vue";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};


const formatTime = (timeString) => {
  // Check if timeString is defined
  if (!timeString) {
    return '';
  }

  const [hours, minutes] = timeString.split(':').map(Number);

  let period = '';
  if (hours >= 0 && hours < 12) {
    period = 'sáng';
  } else if (hours >= 12 && hours < 18) {
    period = 'chiều';
  } else {
    period = 'tối';
  }

  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  return formattedTime;
};

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const spSeekerData = ref([]);
const feedbackData = ref([]);
const totalScore = ref([]);
const notifySave = ref(false);
const notifyJoin = ref(false);
const openEditForm = ref(false);
const openPostForm = ref(false)
const isPost = ref(false)

const hideParentButton = () => {
  isPost.value = false
}
function editProfile() {
  openEditForm.value = true
}

function cancelEditForm() {
  openEditForm.value = false
}

function postProfile() {
  openPostForm.value = true
}

function cancelPostForm() {
  openPostForm.value = false
}
async function getUserDataByEmail(email) {
  const { data, error } = await supabase
      .from('accounts')
      .select('id')
      .eq('email', email)
      .single();

  if (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
  return data;
}

onMounted(async () => {
  if (user.value && user.value.email) {
    const userData = await getUserDataByEmail(user.value.email);

    if (userData && userData.id) {
      const { data } = await supabase
          .from('get_profile_sp')
          .select()
          .eq('id_user', userData.id)
          .single();

      spSeekerData.value = data;
      if(spSeekerData.value.status === false) {
        isPost.value = true
      }
      else{
        isPost.value = false
      }
      console.log('spSeekerData:', spSeekerData.value);

      if (spSeekerData.value) {
        const feedbackQuery = await supabase
            .from('get_info_feedbacks')
            .select('*')
            .eq('id_profile', spSeekerData.value.id);

        if (feedbackQuery.data) {
          feedbackData.value = feedbackQuery.data;
          console.log('Feedback Data:', feedbackData.value);
        }
        const {data} = await supabase
            .from('total_stars_per_profile')
            .select('*')
            .eq('id_profile', spSeekerData.value.id);

        if (data.length > 0) {
          totalScore.value = data[0];
          console.log('totalScore Data:', totalScore.value);
        }
      }
    } else {
      console.error('No user data or user ID found');
    }
  }

});

async function cancelPostProfile() {
  const confirmed = await ElMessageBox.confirm(
      'Bạn chắc chắn muốn hủy đăng tin?',
      {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning',
      }
  );

  if (confirmed) {
    const { error } = await supabase
        .from('profiles')
        .update({ status: false })
        .eq('id', spSeekerData.value.id);

    if (!error) {
      isPost.value = true
      ElMessage({
        type: 'success',
        message: 'Hủy đăng tin thành công',
      });
    }
  }
}
// Gọi fetchData khi component được mounted
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

<template>
  <div class="relative min-h-screen lg:mx-32 mx-5 sm:pt-24">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
      ><a href="/">Trang chủ</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/list-volunteer' }">Tình nguyện viên</el-breadcrumb-item>
      <el-breadcrumb-item >Chi tiết tin</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="sm:flex w-full  ">

      <div class=" border border-gray-100 shadow-md rounded-lg bg-white p-5 sm:w-2/5  m-3">
        <div class="w-full flex justify-center items-center py-5">
          <img :src="volunteerData.avt" alt="avatar"
               class=" flex justify-center rounded-full w-32 h-32 border-2 border-gray-300">
        </div>
        <h1 class="text-gray-600 font-bold text-lg py-5">Thông tin chung:</h1>
        <div class="space-y-5">
          <div class="flex flex-wrap">
            <label class="font-medium text-gray-600" for="name_job">Họ và tên: </label>
            <p class=" text-gray-600"> {{ volunteerData.name }}</p>
          </div>
          <div class="flex flex-wrap">
            <label class="font-medium text-gray-600" for="name_job">Ngày sinh: </label>
            <p class=" text-gray-600"> {{ formatDate(volunteerData.birthday) }}</p>
          </div>
          <div class="flex flex-wrap">
            <label class="font-medium text-gray-600" for="name_job">Giới tính: </label>
            <p class=" text-gray-600"> {{ volunteerData.gender }}</p>
          </div>
          <div class="flex flex-wrap">
            <label class="font-medium text-gray-600" for="name_job">Địa chỉ: </label>
            <p class=" text-gray-600"> {{ volunteerData.address }}</p>
          </div>
          <div class="flex flex-wrap">
            <label class="font-medium text-gray-600" for="name_job">Số điện thoại: </label>
            <p class=" text-gray-600"> {{ volunteerData.phone }}</p>
          </div>
          <div class="flex flex-wrap">
            <label class="font-medium text-gray-600" for="name_job">Công việc hiện tại: </label>
            <p class=" text-gray-600"> {{ volunteerData.job }}</p>
          </div>
        </div>
      </div>

      <div class=" sm:w-3/5  m-3 space-y-5">
        <div class="border border-gray-100 shadow-md rounded-lg bg-white p-5">
          <div class=" text-gray-600 font-bold text-lg py-5 flex space-x-5">
            <p>Công việc có thể hỗ trợ: </p>
            <p> {{ volunteerData.support_job_name }}</p>
          </div>
          <div class="grid lg:grid-cols-2 gap-4">
            <div>
              <label class="font-medium text-gray-600" for="name_job">Thời gian có thể hỗ trợ: </label>
              <p class="text-gray-600">Giờ: {{ volunteerData.free_time_start }} đến {{volunteerData.free_time_end }}</p>
              <p class="text-gray-600">Thứ trong tuần: {{ volunteerData.free_weekday }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Hạn hồ sơ: </label>
              <p class=" text-gray-600"> {{ formatDate(volunteerData.end_date_post) }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Khu vực: </label>
              <p class=" text-gray-600"> {{volunteerData.area}}</p>
            </div>
            <div class="flex flex-wrap  items-center">
              <label class="font-medium text-gray-600 pr-1" for="name_job">Đánh giá: </label>
              <el-rate
                  v-model="roundedNumber"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value} điểm"
              />
            </div>
          </div>
          <div class="py-5 flex justify-between items-center space-x-10">
            <button
                class="w-1/3 py-2 px-3 border-2 border-green-300 rounded-lg text-center hover:bg-gray-100 transition duration-200 ease-in-out"
               @click="save"> Lưu tin
            </button>
          </div>
        </div>

        <div class="border border-gray-100 shadow-md rounded-lg bg-white p-5">
          <h1 class="text-gray-600 font-bold text-lg py-5">Thông tin khác:</h1>
          <div class="space-y-5">
            <div>
              <label class="font-medium text-gray-600" for="name_job">Kinh nghiệm thiện nguyện: </label>
              <p class=" text-gray-600"> {{ volunteerData.volunteer_exp_description }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Mô tả bản thân: </label>
              <p class=" text-gray-600"> {{ volunteerData.self_description }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Thời gian có thể hỗ trợ: </label>
              <p class="text-gray-600">Giờ: {{ volunteerData.free_time_start }} đến {{volunteerData.free_time_end }}</p>
              <p class="text-gray-600">Thứ trong tuần: {{volunteerData.free_weekday}} </p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Công việc có thể hỗ trợ: </label>
              <p class=" text-gray-600"> {{ volunteerData.support_job_name }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Hạn hồ sơ: </label>
              <p class=" text-gray-600"> {{ formatDate(volunteerData.end_date_post) }}</p>
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
                v-model="roundedNumber"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value} điểm"
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
                  <p class="text-gray-500">Tên người đánh giá:</p>
                  <p>{{feedback.name_reviewer}}</p>
                </div>
                <div class="flex flex-wrap">
                  <p class="text-gray-500">Ngày đánh giá:</p>
                  <p>{{formatCreateDate(feedback.created_at)}}</p>
                </div>
                <div class="">
                  <p class="text-gray-500">Nội dung:</p>
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
import {useCartStore} from "~/store/index.ts";

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
const user = useSupabaseUser();
const postId = route.params.id;
console.log("Post ID:", postId);
const notifyData = ref([]);
const volunteerData = ref([]);
const feedbackData = ref([]);
const totalScore = ref({ avg_score: 0 });
let roundedNumber = 0;

onMounted(async () => {
  try {
    const { data } = await supabase.from('volunteer_statistics_view').select('*').eq('id', postId).single();
    notifyData.value = data;

    const createdAtDate = new Date(notifyData.value.profile_created_at);

    const timeDifference = Date.now() - createdAtDate.getTime();

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const notificationMessage = h('div', { style: 'display: flex; flex-direction: column;' }, [
      h('p', { style: 'margin-bottom: 5px; display: flex; align-items: center;' }, [
        'Hồ sơ được tạo ',
        h('span', { style: 'color: blue; margin-left: 5px;' }, `${daysDifference ?? 0} ngày trước`),
      ]),
      h('p', { style: 'margin-bottom: 5px; display: flex; align-items: center;' }, [
        'Số lượng yêu cầu gửi đi: ',
        h('span', { style: 'color: blue; margin-left: 5px;' }, `${notifyData.value.request_count ?? 0}`),
      ]),
      h('p', { style: 'display: flex; align-items: center;' }, [
        'Số lượng yêu cầu đã được duyệt: ',
        h('span', { style: 'color: blue; margin-left: 5px;' }, `${notifyData.value.request_count_done ?? 0}`),
      ]),
      h('p', { style: 'display: flex; align-items: center;' }, [
        'Số lượt đánh giá: ',
        h('span', { style: 'color: blue; margin-left: 5px;' }, `${notifyData.value.feedback_count ?? 0}`),
      ]),
    ]);

    ElNotification.info({
      title: 'Thông báo',
      message: notificationMessage,
      duration: 0,
      onClose: () => {
        console.log('Notification closed');
      },
      closeOnClick: false,
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
});


onMounted(async () => {
  const {data} = await supabase.from('get_profile_volunteer').select('*').eq('id', postId).single();
  volunteerData.value = data;
});

onMounted(async () => {
  const {data} = await supabase.from('get_info_feedbacks').select('*').eq('id_profile', postId);
  feedbackData.value = data;
});

onMounted(async () => {
  const { data } = await supabase.from('get_id_profile_and_total_score').select().eq('id_profile', postId);;
  if (data.length > 0) {
    totalScore.value = data[0];
    const roundedNumberString = totalScore.value.avg_score.toFixed(2);
    roundedNumber = parseFloat(roundedNumberString);
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

const save = async () => {
  if (user.value) {
    const email = user.value.email;
    const { data: accountsData, error: accountsError } = await supabase
        .from('accounts')
        .select('id')
        .eq('email', email)
        .single();

    if (accountsError) {
      console.error(accountsError);
      return;
    }

    const idAccounts = accountsData.id;
    const { data: cartData, error: cartError } = await supabase
        .from('cart')
        .select('id')
        .eq('id_user', idAccounts)
        .single();

    if (cartError) {
      console.error(cartError);
      return;
    }

    const idCart = cartData.id;

    const { data: existingCartDetails, error: existingCartDetailsError } = await supabase
        .from('cart_details')
        .select()
        .eq('id_cart', idCart)
        .eq('id_profile', volunteerData.value.id)
        .single();

    if (existingCartDetails) {
      ElNotification.info({
        title: 'Thông báo',
        message: 'Tin đã được thêm vào giỏ hàng trước đó.',
      });
    } else {

      const { error: insertError } = await supabase
          .from('cart_details')
          .insert([
            {
              id_cart: idCart,
              id_profile: volunteerData.value.id,
            },
          ]);

      if (insertError) {
        console.error(insertError);
        return;
      }

      ElNotification.success({
        title: 'Thông báo',
        message: 'Đã lưu tin thành công vào giỏ hàng.',
      });
      useCartStore().incrementCartCount();
    }
  } else {

    ElNotification.info({
      title: 'Thông báo',
      message: 'Hãy đăng nhập để lưu tin bạn nhé!',
    });
  }
};
</script>

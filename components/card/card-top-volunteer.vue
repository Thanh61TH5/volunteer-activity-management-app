<template>
  <h1 class="text-gray-700 text-xl font-bold">TOP TÌNH NGUYỆN VIÊN</h1>
  <div class="">
    <div class="grid grid-cols-1 xl:grid-cols-4 xl:gap-4 sm:grid-cols-2 gap-2">
      <div class="h-auto rounded-lg shadow-lg border border-gray-100 bg-white px-5"
           v-for="(volunteer, index) in volunteerData"
           :key="index">

        <NuxtLink :to = '"/list-volunteer/" + volunteer.id' class=" mb-5 p-2">
          <div class="flex flex-col justify-center items-center">
            <img :src="volunteer.avt" class="w-24 h-24 rounded-full" alt="avatar"/>
            <div>
              <div class="py-2" >
                <p class="font-bold text-gray-700">{{volunteer.support_job_name}}</p>
                <span class="">{{ volunteer.name }} {{ calculateAge(new Date(), volunteer.birthday) }} tuổi </span>
              </div>
              <div class="py-2 ">
                <p class="text-gray-400">Thời gian rảnh rỗi:</p>
                <p class="text-gray-600">Giờ: {{ volunteer.free_time_start }} đến {{volunteer.free_time_end }}</p>
                <p class="text-gray-600">Ngày: {{ formatDate(volunteer.free_day_start) }} đến {{formatDate(volunteer.free_day_end) }}</p>
              </div>
              <div class="py-2">
                <p class="text-gray-400">Địa chỉ:</p>
                <p>{{ volunteer.address }}</p>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between py-5 sm:flex">
            <div class="flex text-gray-400 items-center">
              <Icon name="material-symbols:location-on-outline"/>
              <p> {{volunteer.area}}</p>
            </div>
            <div class="flex items-center text-gray-400">
              <Icon name="material-symbols:av-timer" class="w-5 h-5"/>
              <p class="days ml-2">Còn {{ calculateDays(volunteer.start_date_post, volunteer.end_date_post) }} ngày</p>
            </div>
          </div>
          <span class="w-full text-gray-400">
          <hr>
        </span>
          <div class="flex flex-col items-center justify-center space-y-5 sm:flex  pt-5 text-white">
            <NuxtLink to="/login" class="bg-green-500 rounded-full  w-24 text-center py-2 hover:opacity-80" @click="notifySave">Lưu tin</NuxtLink>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
span {
  display: block;
  margin: 10px 0;
}

button, input {
  display: block;
}
</style>
<script setup>



const client = useSupabaseClient();
const volunteerData = ref([]);
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


function notifySave() {
  ElNotification.info({
    title: 'Thông báo',
    message: 'Hãy đăng nhập để lưu tin bạn nhé!',
  });
}


function notifyJoin() {
  ElNotification.info({
    title: 'Thông báo',
    message: 'Hãy đăng nhập để tham gia thiện nguyện bạn nhé!',
  });
}
const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end.getTime() - start.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return Math.floor(daysDifference);
};

const calculateAge = (currentDay, birthday) => {
  const start = new Date(currentDay);
  const end = new Date(birthday);
  const timeDifference = end.getFullYear() - start.getFullYear();
  return Math.floor(timeDifference);
};

onMounted(async () => {
  const { data, error } = await client.from('get_volunteer_5_score').select();
  if (error) {
    console.error(error);
  } else {
    volunteerData.value = data;
    console.log(volunteerData.value)
  }
});

function notifyLogin() {
  ElNotification.info({
    title: 'Thông báo',
    message: 'Hãy đăng nhập để lưu tin bạn nhé!',
  });
}

import { useRouter } from 'vue-router';

const router = useRouter();

const viewPostDetail = (postId) => {
  router.push(`/list-volunteer/${postId}`);
};
</script>

<template>
  <div class="relative min-h-screen lg:mx-32 mx-5 sm:pt-24">
    <div class="grid grid-cols-1 xl:grid-cols-4 xl:gap-4 sm:grid-cols-2 gap-2">
      <div class="h-auto rounded-lg shadow-lg border border-gray-100 bg-white"
           v-for="(spSeeker, index) in spSeekerData"
           :key="index">
        <NuxtLink :to = '"/list-sp-seeker/" + spSeeker.id' class=" mb-5 p-2">
          <div class="flex flex-col justify-center items-center">
            <img :src="spSeeker.avt" class="w-24 h-24 rounded-full" alt="avatar"/>
            <div>
              <div class="py-2" >
                <p class="font-bold text-gray-700">{{spSeeker.support_job_name}}</p>
                <span class="">{{ spSeeker.name }} {{ calculateAge(new Date(), spSeeker.birthday) }} tuổi </span>
              </div>
              <div class="py-2 ">
                <p class="text-gray-400">Thời gian rảnh rỗi:</p>
                <p>{{ spSeeker.support_time }}</p>
              </div>
              <div class="py-2">
                <p class="text-gray-400">Địa chỉ:</p>
                <p>{{ spSeeker.address }}</p>
              </div>
            </div>
          </div>
          <span class="w-full text-gray-400">
          <hr>
        </span>
          <div class="flex flex-col items-center justify-center space-y-5 sm:flex  pt-5">
            <div class="flex items-center">
              <Icon name="material-symbols:av-timer" class="w-5 h-5"/>
              <p class="days ml-2">Còn {{ calculateDays(spSeeker.start_date, spSeeker.end_date) }} ngày</p>
            </div>
            <div class="text-white flex space-x-2">
              <NuxtLink to="/login" class="bg-green-500 rounded-full  w-24 text-center py-2 hover:opacity-80" @click="notifySave">Lưu tin</NuxtLink>
              <NuxtLink to="/login" class="bg-blue-500 rounded-full  w-24 text-center py-2 hover:opacity-80" @click="notifyJoin">Tham gia</NuxtLink>
            </div>
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



definePageMeta({
  middleware:"no-auth"
});



const client = useSupabaseClient();
const spSeekerData = ref([]);
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
  const { data, error } = await client.from('support_seeker_profile').select();
  if (error) {
    console.error(error);
  } else {
    spSeekerData.value = data;
    console.log(spSeekerData.value)
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
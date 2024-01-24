<template >
  <div class="flex space-x-3 items-center">
    <Icon name="gridicons:fire" class="text-orange-500 w-8 h-8"/>
    <h1 class="text-gray-700 text-xl font-bold">TOP TÌNH NGUYỆN VIÊN</h1>
    <Icon name="gridicons:fire" class="text-orange-500 w-8 h-8"/>
  </div>
  <div class="grid grid-cols-1 xl:grid-cols-4 xl:gap-4 sm:grid-cols-2 gap-2">
    <NuxtLink :to="'/list-volunteer/' + volunteer.id"
        class="h-auto rounded-lg shadow-lg border border-gray-100 bg-white hover:scale-105 duration-200 ease-in-out relative"
        v-for="(volunteer, index) in volunteerData"
        :key="index">
      <div class="mb-5">
        <div>
          <div class="flex flex-col justify-center items-center pt-10">
            <img :src="volunteer.avt" class="w-24 h-24 rounded-full" alt="avatar" />
            <div>
              <div class="py-2">
                <span>{{ volunteer.name }} | {{ calculateAge(new Date(), volunteer.birthday) }} tuổi </span>
              </div>
            </div>
            <!-- Ribbon for score -->
          </div>
        </div>
      </div>
    </NuxtLink>
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


const calculateAge = (currentDay, birthday) => {
  const start = new Date(currentDay);
  const end = new Date(birthday);
  const timeDifference = start.getFullYear() - end.getFullYear();
  return Math.floor(timeDifference);
};

onMounted(async () => {
  const { data, error } = await client.from('get_volunteer_by_score').select().eq('status', true).order('score', { ascending: true }).limit(4);
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

<script setup>
const client = useSupabaseClient();
const router = useRouter();
const volunteerData = ref([]);
const notifySave = ref(false);
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  let timeDifference;

  if (today > start && today <= end) {
    timeDifference = end.getTime() - today.getTime();
  } else if (today < start) {
    timeDifference = end.getTime() - start.getTime();
  } else {
    timeDifference = 0;
  }

  const daysDifference = timeDifference / (1000 * 3600 * 24);
  if(daysDifference === 0 ) {
    return ('Hết hạn')
  }
  return ('Còn' + Math.floor(daysDifference) + 'ngày');
};

const calculateAge = (currentDay, birthday) => {
  const start = new Date(currentDay);
  const end = new Date(birthday);
  const timeDifference = end.getFullYear() - start.getFullYear();
  return Math.floor(timeDifference);
};

onMounted(async () => {
  let { data, error } = await client.from('view_get_volunteer_profile_score_5').select()
  if (error) console.error(error)
  else {
    volunteerData.value = data;
    console.log(data)
  }
});

const notifySaveOk = () => {
  notifySave.value = false;
  router.push('/login');
};

const notifySaveCancel = () => {
  notifySave.value = false;
};

</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-4 xl:gap-4 sm:grid-cols-2 gap-2">
    <div class="h-auto rounded-lg shadow-lg border border-gray-100 bg-white"
         v-for="(volunteer, index) in volunteerData"
         :key="index">
      <div class=" mb-5 p-2">
        <div class="flex flex-col justify-center items-center">
          <img :src="volunteer.avatar" class="w-24 h-24 rounded-full" alt="avatar"/>
          <div>
            <div class="py-2" >
              <p class="font-bold text-gray-700">{{volunteer.support_job_name}}</p>
              <span class="">{{ volunteer.name }} {{ calculateAge(new Date(), volunteer.birthday) }} tuổi </span>
            </div>
            <div class="py-2 ">
              <p class="text-gray-400">Thời gian rảnh rỗi:</p>
              <p>{{ volunteer.free_time }}</p>
            </div>
            <div class="py-2">
              <p class="text-gray-400">Địa chỉ:</p>
              <p>{{ volunteer.address }}</p>
            </div>
          </div>
        </div>
        <span class="w-full text-gray-400">
          <hr>
        </span>
        <div class="flex  pt-5 space-x-5 justify-between">
          <div class="flex items-center">
            <Icon name="material-symbols:av-timer" class="w-5 h-5"/>
            <p class="days ml-2">{{ calculateDays(volunteer.start_date, volunteer.end_date) }}</p>
          </div>
          <div class="text-white">
            <NuxtLink to="/login" class="bg-green-500 rounded-full px-4 py-1 hover:opacity-80" @click="notifyLogin">Lưu tin</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

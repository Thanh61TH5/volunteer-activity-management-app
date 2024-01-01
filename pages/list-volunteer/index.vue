<template>
    <div class="relative min-h-screen lg:mx-32 mx-5 sm:pt-24">
      <div class="grid grid-cols-1 xl:grid-cols-4 xl:gap-4 sm:grid-cols-2 gap-2">
        <div class="h-auto rounded-lg shadow-lg border border-gray-100 bg-white"
             v-for="(volunteer, index) in volunteerData"
             :key="index">
          <div class=" mb-5 p-2">
            <NuxtLink :to = '"/list-volunteer/" + volunteer.id'>
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
              <span class="w-full text-gray-400">
          <hr>
        </span>
            </NuxtLink>
            <div class="flex flex-col justify-center  pt-5 sm:justify-between sm:flex space-y-5">
              <div class="flex items-center justify-center mx-10">
                <Icon name="material-symbols:av-timer" class="w-5 h-5"/>
                <p class="days ml-2">Còn {{ calculateDays(volunteer.start_date_post, volunteer.end_date_post) }} ngày</p>
              </div>
              <div class="flex items-center justify-center text-white mx-10">
                <button  class="bg-green-500 rounded-full sm:px-5 px-24 py-2 hover:opacity-80" @click="notifySaveAction ">Lưu tin</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <el-dialog v-model="notifySave" center class="rounded-lg " >
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
const user = useSupabaseUser();
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
  const { data, error } = await client.from('get_profile_volunteer').select();
  if (error) {
    console.error(error);
  } else {
    volunteerData.value = data;
    console.log(volunteerData.value)
  }
});


const router = useRouter();
const notifySaveAction = () => {
  if(user.value) {
    alert('Ok')
  }
  else{
    notifySave.value = true;
  }
}
const notifySaveOk = () => {
  notifySave.value = false;
  router.push('/login');
};

const notifySaveCancel = () => {
  notifySave.value = false;
};

</script>

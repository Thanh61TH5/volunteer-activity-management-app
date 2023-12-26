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
  <div>
    <p class="font-bold text-gray-700 py-5 text-xl">TOP TÌNH NGUYỆN VIÊN</p>
  </div>
  <div class="grid grid-cols-1 xl:grid-cols-4 xl:gap-4 sm:grid-cols-2 gap-2">
    <div class="h-auto rounded-lg shadow-lg border border-gray-100 bg-white"
         v-for="(volunteer, index) in volunteerData"
         :key="index">
      <div class=" mb-5 p-10">
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
            <p class="days ml-2">Còn {{ calculateDays(volunteer.start_date, volunteer.end_date) }} ngày</p>
          </div>
          <div class="text-white">
            <button class="py-2 px-5 bg-green-500 rounded-full text-center hover:opacity-80" @click="notifySave = true "> Lưu tin</button>
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
</template>

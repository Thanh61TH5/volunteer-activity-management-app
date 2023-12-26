<template>
  <div class="relative min-h-screen lg:mx-32 mx-5 sm:pt-24 mt-10 pb-10">
      <div class="grid sm:grid-cols-4 grid-1 gap-4 min-h-96">
        <div class="border border-gray-100 shadow-md rounded-lg bg-white px-10 py-5 col-start-2 col-span-2">
          <div class="w-full flex justify-center items-center py-5">
            <img :src="volunteerData.avatar"  alt="avatar" class=" flex justify-center rounded-full w-32 h-32 border-2 border-gray-300">
          </div>
          <h1 class="font-medium text-gray-600 text-lg py-5">Thông tin cá nhân:</h1>
          <div class="space-y-5">
            <div class="flex space-x-3">
              <label class="font-medium text-gray-600" for="name_job">Họ và tên: </label>
              <p class=" text-gray-600"> {{volunteerData.name}}</p>
            </div>
            <div class="flex space-x-3">
              <label class="font-medium text-gray-600" for="name_job">Ngày sinh: </label>
              <p class=" text-gray-600"> {{formatDate(volunteerData.birthday)}}</p>
            </div>
            <div class="flex space-x-3">
              <label class="font-medium text-gray-600" for="name_job">Giới tính: </label>
              <p class=" text-gray-600"> {{volunteerData.gender}}</p>
            </div>
            <div class="flex space-x-3">
              <label class="font-medium text-gray-600" for="name_job">Địa chỉ: </label>
              <p class=" text-gray-600"> {{volunteerData.address}}</p>
            </div>
            <div class="flex space-x-3">
              <label class="font-medium text-gray-600" for="name_job">Số điện thoại: </label>
              <p class=" text-gray-600"> {{volunteerData.phone}}</p>
            </div>
            <div class="flex space-x-3">
              <label class="font-medium text-gray-600" for="name_job">Công việc hiện tại: </label>
              <p class=" text-gray-600"> {{volunteerData.job}}</p>
            </div>
            <div class="flex space-x-3">
              <label class="font-medium text-gray-600" for="name_job">Hạn hồ sơ: </label>
              <p class=" text-gray-600"> {{formatDate(volunteerData.end_date)}}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Kinh nghiệm thiện nguyện: </label>
              <p class=" text-gray-600"> {{volunteerData.volunteer_exp}}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Thời gian rảnh rỗi: </label>
              <p class=" text-gray-600"> {{volunteerData.free_time}}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Tên công việc có thể hỗ trợ: </label>
              <p class=" text-gray-600"> {{volunteerData.support_job_name}}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600" for="name_job">Hạn hồ sơ: </label>
              <p class=" text-gray-600"> {{formatDate(volunteerData.end_date)}}</p>
            </div>
            <div class="py-5">
              <NuxtLink to="/" class="py-2 px-5 bg-green-500 rounded-lg text-white hover:opacity-80"> Lưu tin</NuxtLink>
            </div>
          </div>
        </div>

      </div>

  </div>
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
const postId = route.params.id;
console.log("Post ID:", postId);
const volunteerData = ref([]);

onMounted(async () => {
  const { data } = await supabase.from('volunteer_profile').select('*').eq('id', postId).single();
  volunteerData.value = data;
});



</script>

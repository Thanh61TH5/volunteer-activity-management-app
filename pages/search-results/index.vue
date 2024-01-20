<!-- SearchResults.vue -->
<template>
  <div class="sm:mt-32">
    <div>
      <h1>Search Results for "{{ searchKeyword }}"</h1>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-4 xl:gap-4 sm:grid-cols-2 gap-2">
      <div
          class="h-auto rounded-lg shadow-lg border border-gray-100 bg-white"
          v-for="(volunteer, index) in searchData"
          :key="index"
      >
        <!-- Display volunteer information here -->
        <div class=" mb-5 p-2">
          <div class="flex flex-col justify-center items-center">
            <img :src="volunteer.avt" class="w-24 h-24 rounded-full" alt="avatar" />
            <div>
              <div class="py-2">
                <p class="font-bold text-gray-700">{{ volunteer.support_job_name }}</p>
                <span class="">{{ volunteer.name }} {{ calculateAge(new Date(), volunteer.birthday) }} tuổi </span>
              </div>
              <div class="py-2">
                <p class="text-gray-400">Thời gian rảnh rỗi:</p>
                <!-- Display other information as needed -->
              </div>
              <div class="py-2">
                <p class="text-gray-400">Địa chỉ:</p>
                <p>{{ volunteer.address }}</p>
              </div>
            </div>
          </div>
          <span class="w-full text-gray-400">
            <hr />
          </span>
          <div class="flex pt-5 space-x-5 justify-between">
            <div class="flex items-center">
              <Icon name="material-symbols:av-timer" class="w-5 h-5" />
            </div>
            <div class="text-white">
              <NuxtLink to="/login" class="bg-green-500 rounded-full px-4 py-1 hover:opacity-80">Lưu tin</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


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

const client = useSupabaseClient();
const router = useRouter();
const searchKeyword = ref('');
import { useRouter } from 'vue-router';
const searchData = ref([]);

// ... (your utility functions) ...

onMounted(async () => {
  searchKeyword.value = router.currentRoute.value.query.keyword || '';

  const { data, error } = await client
      .from('get_search_profile_info')
      .select()
      .ilike('name', `%${searchKeyword.value}%`)
      .or()
      .ilike('type', `%${searchKeyword.value}%`)
      .or()
      .ilike('avt', `%${searchKeyword.value}%`);

  if (error) {
    console.error('Error fetching search results:', error);
    // Handle the error (e.g., display an error message)
  } else {
    console.log('Search results:', data);
    searchData.value = data || [];
    // Handle the retrieved data as needed
  }
});








</script>


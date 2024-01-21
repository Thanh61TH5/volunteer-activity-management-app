<!-- SearchResults.vue -->
<template>
  <div class="lg:mx-32 sm:mt-32">
    <div class="flex items-center my-10">
      <h1 class="mr-2">Kết quả hiển thị cho từ khóa tìm kiếm: </h1>
      <p class="text-blue-800">"{{ searchKeyword }}"</p>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-4 xl:gap-4 sm:grid-cols-2 gap-2">
      <NuxtLink :to="getProfileRoute(profile)"
          class="h-auto rounded-lg shadow-lg border border-gray-100 bg-white"
          v-for="(profile, index) in searchData"
          :key="index"
      >
        <div class=" mb-5 p-2">
          <div class="flex flex-col justify-center items-center">
            <img :src="profile.avt" class="w-24 h-24 rounded-full" alt="avatar" />
            <div>
              <div class="py-2">
                <p class="font-bold text-gray-700">{{ profile.support_job_name }}</p>
                <span class="">{{ profile.name }} | {{ calculateAge(new Date(), profile.birthday) }} tuổi </span>
              </div>
              <div class="py-2">
                <p class="text-gray-500 font-medium">Địa chỉ:</p>
                <p>{{ profile.address }}</p>
              </div>
            </div>
          </div>
          <span class="w-full text-gray-400">
            <hr />
          </span>
          <div class="flex pt-5 space-x-5 justify-center">
            <div class="flex items-center justify-center">
              <Icon name="material-symbols:av-timer" class="w-5 h-5 text-gray-500" />
              <p>{{formatDate(profile.end_date_post)}}</p>
            </div>
          </div>
        </div>
      </NuxtLink>
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

const calculateAge = (currentDay, birthday) => {
  const start = new Date(currentDay);
  const end = new Date(birthday);
  const timeDifference = start.getFullYear() - end.getFullYear();
  return Math.floor(timeDifference);
};

const client = useSupabaseClient();
const router = useRouter();
const searchKeyword = ref('');
import { useRouter } from 'vue-router';
const searchData = ref([]);

const { currentRoute } = useRouter();
onMounted(() => {
  fetchData();
});

watchEffect(() => {

  fetchData();
});

async function fetchData() {
  searchKeyword.value = currentRoute.value.query.keyword || '';

  try {

    const [nameQueryResult, typeQueryResult, addressQueryResult, jobQueryResult] = await Promise.all([
      client
          .from('get_search_profile_info')
          .select()
          .or(`name.ilike.%${searchKeyword.value}%`),
      client
          .from('get_search_profile_info')
          .select()
          .or(`type.ilike.%${searchKeyword.value}%`),
      client
          .from('get_search_profile_info')
          .select()
          .or(`address.ilike.%${searchKeyword.value}%`),
      client
          .from('get_search_profile_info')
          .select()
          .or(`support_job_name.ilike.%${searchKeyword.value}%`),
    ]);


    if (nameQueryResult.error || typeQueryResult.error || addressQueryResult.error ||jobQueryResult.error) {
      console.error('Error fetching search results:', nameQueryResult.error, typeQueryResult.error, addressQueryResult.error, jobQueryResult.error);

    } else {

      const combinedResults = [...nameQueryResult.data, ...typeQueryResult.data, ...addressQueryResult.data, ...jobQueryResult.data];

      console.log('Search results:', combinedResults);
      searchData.value = combinedResults || [];

    }
  } catch (error) {
    console.error('Error fetching search results:', error);

  }
}

const getProfileRoute = (profile: { type: string; }) => {
  return profile.type === 'Tình nguyện viên' ? '/list-volunteer/'+profile.id : '/list-sp-seeker/'+profile.id;
};
</script>


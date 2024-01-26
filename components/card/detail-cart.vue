<template>
  <el-drawer
      title="Danh sách tin đã lưu"
      :append-to-body="true"
      :before-close="handleClose"
      ref="myDrawer"
      class="relative"
  >
    <ul v-if="savedItems.length > 0">
      <li v-for="(item, index) in savedItems" :key="index">
        <div class="">
          <div class=" flex flex-wrap gap-3  items-center">
            <div style="font-size: 13px" class="flex bg-gray-200 text-base rounded-lg px-2 py-1"><Icon name="material-symbols:location-on-outline" class="w-5 h-5 text-gray-500 mr-2"/><p>{{item.area}}</p></div>
            <div style="font-size: 13px" class="flex bg-gray-200 text-base rounded-lg px-2 py-1">
              <Icon name="material-symbols:av-timer" class="w-5 h-5 text-gray-500 mr-2 my-1" />
              <p>{{ formatDatePost(item.end_date_post) }}</p>
              <p v-if="isExpired(item.end_date_post)" class="text-red-500 ml-2">Đã hết hạn</p>
            </div>            <div style="font-size: 13px" class="flex bg-gray-200 text-base rounded-lg px-2 py-1"><Icon name="material-symbols:person-outline" class="w-5 h-5 text-gray-500 mr-2"/><p>{{item.type}}</p></div>
          </div>
          <div class="flex flex-wrap items-center gap-5">
            <el-avatar :size="60" :src="item.avt" @error="errorHandler">
              <img v-if="item.avt" :src="item.avt" />
              <img v-else src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </el-avatar>

            <div>
              <p class="font-medium">{{item.support_job_name}}</p>
              <p class="text-gray-400">{{item.profile_name}}</p>
            </div>
              <div class="flex gap-3">
                <NuxtLink :to="'/list-volunteer/' + item.id_profile" v-if="item.type==='Tình nguyện viên'" class="bg-green-500 rounded-lg text-white px-4 py-1 shadow-md hover:opacity-80 duration-200 ease-in-out" @click="viewProfile(item)">Xem</NuxtLink>
                <NuxtLink :to="'/list-sp-seeker/' + item.id_profile" v-if="item.type==='Người cần hỗ trợ'" class="bg-green-500 rounded-lg text-white px-4 py-1 shadow-md hover:opacity-80 duration-200 ease-in-out"  @click="viewProfile(item)">Xem</NuxtLink>

                <button class="bg-red-500 rounded-lg text-white px-4 py-1 shadow-md hover:opacity-80 duration-200 ease-in-out" @click="deleteItem(item)">Xóa</button>
              </div>
          </div>
        </div>
        <span><hr></span>
      </li>
    </ul>
    <div v-else class="flex flex-col justify-center items-center space-y-2">
      <img src="/empty-cart.png" class="w-20 h-20" alt="empty-cart">
      <p class="text-gray-400 text-sm">Bạn chưa có tin nào được lưu.</p>
    </div>
    <div v-if="loading" class=" loading right-0 left-0 bottom-0 top-0 flex justify-center items-center  absolute">
      <p class="text-white">Đang xử lý...</p>
    </div>
  </el-drawer>
</template>


<script lang="ts" setup>
import {formatTime, formatDate } from '~/assets/utils/format'
import {useCartStore} from "~/store";
const client = useSupabaseClient();
const user = useSupabaseUser();
const savedItems = ref([]);
const router = useRouter;
const myDrawer = ref(null);
const loading = ref(false);

const formatDatePost = (end_date_post) => {
  return formatDate(new Date(end_date_post));
};
const isExpired = (end_date_post) => {
  const currentDate = new Date();
  const endDate = new Date(end_date_post);
  return endDate < currentDate;
};
const errorHandler = () => true
const handleClose = (done: () => void) => {
  done();
};

function viewProfile() {
  myDrawer.value.close();
}
const savedItemsWithIndex = computed(() => {
  return savedItems.value.map((item, index) => {
    return { ...item, stt: index + 1 };
  });
});
async function deleteItem(item) {
  try {
    loading.value= true;
    // Assuming there is an API endpoint to delete items from the cart_details table
    await client
        .from('cart_details')
        .delete()
        .eq('id_profile', item.id_profile)
        .eq('id_cart', item.id_cart);

    // Refresh or fetch the updated list of saved items after deletion
    // This assumes that you have a function to fetch the updated data
    await fetchSavedItems();
    useCartStore().reduceCartCount();
    loading.value = false;
    ElNotification.success({
      title: 'Thành công',
      message: 'Xóa tin thành công.',
    });
  } catch (error) {
    console.error('Error deleting item:', error);
    ElNotification.error({
      title: 'Lỗi',
      message: 'Có lỗi xảy ra. Vui lòng thử lại.',
    });
  }
}

// Function to fetch the updated list of saved items
async function fetchSavedItems() {
  try {
    // Fetch the updated data after deletion
    const accountsQuery = await client.from('accounts').select('id').eq('email', user.value.email);
    const accountId = accountsQuery.data?.[0]?.id;

    if (accountId) {
      const { data: profilesData, error } = await client.from('combined_info').select().eq('id_user', accountId);

      savedItems.value = profilesData;
    }
  } catch (error) {
    console.error('Error fetching saved items:', error);
  }
}

onMounted(async() => {
  fetchSavedItems();
})




</script>

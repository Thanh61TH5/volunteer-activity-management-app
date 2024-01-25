<template>
  <h1 class="text-gray-700 text-xl font-bold">VIỆC CẦN HỖ TRỢ GẦN ĐÂY</h1>
  <div class="relative min-h-screen">
    <div class="grid grid-cols-1 xl:grid-cols-4 xl:gap-8 lg:grid-cols-3 lg:gap-6  sm:grid-cols-2 gap-4">
      <div class="h-auto rounded-lg shadow-lg border border-gray-100 bg-white"
           v-for="(spSeeker, index) in spSeekerData"
           :key="index">
        <div class=" pt-5 mb-5">
          <NuxtLink  :to = '"/list-sp-seeker/" + spSeeker.id'>
            <div class="flex flex-col justify-center items-center">
              <img :src="spSeeker.avt" class="w-24 h-24 rounded-full" alt="avatar"/>
              <div>
                <div class="py-2" >
                  <p class="font-bold text-gray-700">{{spSeeker.support_job_name}}</p>
                  <span class="">{{ spSeeker.name }} | {{ calculateAge(new Date(), spSeeker.birthday) }} tuổi </span>
                </div>
                <div class="py-2 ">
                  <p class="text-gray-400">Thời gian cần hỗ trợ:</p>
                  <p class="text-gray-600">Giờ: {{spSeeker.support_time_start}} đến {{spSeeker.support_time_end }}</p>
                  <p class="text-gray-600">Thứ trong tuần: {{spSeeker.support_weekday}}</p>
                </div>
                <div class="py-2">
                  <p class="text-gray-400">Địa chỉ:</p>
                  <p>{{ spSeeker.address }}</p>
                </div>
              </div>
            </div>
          </NuxtLink>
          <span class="w-full text-gray-400">
          <hr>
        </span>
          <div class="flex flex-col items-center justify-center space-y-5 sm:flex  pt-5">
            <div class="flex items-center justify-center mx-10">
              <Icon name="material-symbols:av-timer" class="w-5 h-5" />
              <p class="days ml-2">Đến hạn: {{formatDate(spSeeker.end_date_post)}}</p>
            </div>
            <div class="text-white flex space-x-2">
              <NuxtLink class="bg-green-500 rounded-full w-24 text-center py-2 hover:opacity-80 hover:cursor-pointer" @click="() => Save(spSeeker)">Lưu tin</NuxtLink>
              <button class="bg-blue-500 rounded-full w-24 text-center py-2 hover:opacity-80" @click="requestVolunteer(spSeeker)">Tham gia</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <prative-volunteer class="absolute top-0 right-0 left-0" v-if="openJoinForm"  @send="send" @close="cancelRequestForm" :profile="selectedProfile"/>
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
import {formatTime} from "assets/utils/format.ts";
import { useCartStore } from '~/store/index.ts';
import PrativeVolunteer from "~/components/form/prative-volunteer.vue";


const client = useSupabaseClient();
const user = useSupabaseUser();
const spSeekerData = ref([]);
const openJoinForm = ref(false);
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

let spSeeker;
onMounted(async () => {
  const { data, error } = await client.from('get_profile_sp').select().eq('status', true);
  if (error) {
    console.error(error);
  } else {
    spSeekerData.value = data || [];
  }
});
let selectedProfile = ref(null);



async function fetchUserRole() {
  try {
    const { data, error } = await client
        .from('accounts')
        .select('role')
        .eq('email', user.value.email);

    if (error) {
      console.error('Error fetching user role:', error);
      return null;
    }

    return data[0]?.role || null;
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
}

async function requestVolunteer(profile) {
  if (user.value) {
    const accRole = await fetchUserRole();

    if (accRole) {
      handleUserRole(accRole, profile);  // Pass the profile parameter
    } else {
      ElNotification.warning({
        title: 'Thông báo',
        message: 'Không thể xác định vai trò của người dùng',
      });
    }
  } else {
    ElNotification.info({
      title: 'Thông báo',
      message: 'Hãy đăng nhập để tham gia bạn nhé!',
    });
  }
}

function handleUserRole(role, profile) {
  if (role === 'Tình nguyện viên') {
    openJoinForm.value = true;
    selectedProfile.value = profile;
  } else {
    ElNotification.warning({
      title: 'Thông báo',
      message: 'Chức năng này chỉ dành cho tình nguyện viên',
    });
  }
}





const Save = async (spSeeker) => {
  if (user.value) {
    // User is authenticated

    // Step 1: Get id_accounts
    const email = user.value.email; // Assuming user email is used as a reference
    const { data: accountsData, error: accountsError } = await client
        .from('accounts')
        .select('id')
        .eq('email', email)
        .single();

    if (accountsError) {
      console.error(accountsError);
      return;
    }

    const idAccounts = accountsData.id;

    // Step 2: Get id_cart
    const { data: cartData, error: cartError } = await client
        .from('cart')
        .select('id')
        .eq('id_user', idAccounts)
        .single();

    if (cartError) {
      console.error(cartError);
      return;
    }

    const idCart = cartData.id;

    // Step 3: Check if the entry already exists in cart_details
    const { data: existingCartDetails, error: existingCartDetailsError } = await client
        .from('cart_details')
        .select()
        .eq('id_cart', idCart)
        .eq('id_profile', spSeeker.id)
        .single();

    if (existingCartDetails) {
      // Entry already exists
      ElNotification.info({
        title: 'Thông báo',
        message: 'Tin đã được thêm vào giỏ hàng trước đó.',
      });
    } else {
      // Step 4: Insert data into cart_details
      const { error: insertError } = await client
          .from('cart_details')
          .insert([
            {
              id_cart: idCart,
              id_profile: spSeeker.id,
            },
          ]);

      if (insertError) {
        console.error(insertError);
        return;
      }

      // Notify success
      ElNotification.success({
        title: 'Thông báo',
        message: 'Đã lưu tin thành công vào giỏ hàng.',
      });
      useCartStore().incrementCartCount();
    }
  } else {
    // User is not authenticated
    ElNotification.info({
      title: 'Thông báo',
      message: 'Hãy đăng nhập để lưu tin bạn nhé!',
    });
  }
};

const calculateAge = (currentDay, birthday) => {
  const start = new Date(currentDay);
  const end = new Date(birthday);
  const timeDifference = start.getFullYear() - end.getFullYear();
  return Math.floor(timeDifference);
};


function send() {
  openJoinForm.value = false;
}

function cancelRequestForm() {
  openJoinForm.value = false;
}
</script>

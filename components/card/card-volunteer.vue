<template>
  <h1 class="text-gray-700 text-xl font-bold">TÌNH NGUYỆN VIÊN MỚI THAM GIA</h1>
  <div class="grid grid-cols-1 xl:grid-cols-4 xl:gap-8 lg:grid-cols-3 lg:gap-6  sm:grid-cols-2 gap-4">
    <div
        class="h-auto rounded-lg shadow-lg border border-gray-100 bg-white"
        v-for="(volunteer, index) in volunteerData"
        :key="index"
    >
      <div class="mb-5 pt-5">
        <NuxtLink :to="'/list-volunteer/' + volunteer.id">
          <div class="flex flex-col justify-center items-center">
            <img :src="volunteer.avt" class="w-24 h-24 rounded-full" alt="avatar" />
            <div>
              <div class="py-2">
                <p class="font-bold text-gray-700">{{ volunteer.support_job_name }}</p>
                <span class="">{{ volunteer.name }} | {{ calculateAge(new Date(), volunteer.birthday) }} tuổi </span>
              </div>
              <div class="py-2 ">
                <p class="text-gray-400">Thời gian có thể hỗ trợ:</p>
                <p class="text-gray-600">Giờ: {{ volunteer.free_time_start }} đến {{volunteer.free_time_end }}</p>
                <p class="text-gray-600">Thứ trong tuần: {{volunteer.free_weekday}}</p>
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
        </NuxtLink>
        <div class="flex flex-col justify-center pt-5 sm:justify-between sm:flex space-y-5">
          <div class="flex items-center justify-center mx-10">
            <Icon name="material-symbols:av-timer" class="w-5 h-5" />
            <p class="days ml-2">Đến hạn: {{formatDate(volunteer.end_date_post)}}</p>
          </div>
          <div class="flex items-center justify-center text-white mx-10">
            <button
                class="bg-green-500 rounded-full w-24 text-center py-2 hover:opacity-80"
                @click="() => Save(volunteer)">
              Lưu tin
            </button>
          </div>
        </div>
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
import {formatTime} from "assets/utils/format.ts";
import { useCartStore } from '~/store/index.ts';
import PrativeVolunteer from "~/components/form/prative-volunteer.vue";


const client = useSupabaseClient();
const user = useSupabaseUser();
const volunteerData = ref([]);
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
  const { data, error } = await client.from('get_profile_volunteer').select().eq('status', true).order('created_at', { ascending: true }).limit(4);
  if (error) {
    console.error(error);
  } else {
    volunteerData.value = data || [];
  }
});
let selectedProfile = ref(null);

const Save = async (spSeeker) => {
  if (user.value) {
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

    const { data: existingCartDetails, error: existingCartDetailsError } = await client
        .from('cart_details')
        .select()
        .eq('id_cart', idCart)
        .eq('id_profile', spSeeker.id)
        .single();

    if (existingCartDetails) {
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

      ElNotification.success({
        title: 'Thông báo',
        message: 'Đã lưu tin thành công vào giỏ hàng.',
      });
      useCartStore().incrementCartCount();
    }
  } else {
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

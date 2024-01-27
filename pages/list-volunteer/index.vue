<template>
  <div class="relative min-h-screen lg:mx-32 mx-5 sm:pt-24">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
      ><a href="/">Trang chủ</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/list-volunteer' }">Tình nguyện viên</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="grid grid-cols-1 xl:grid-cols-4 xl:gap-4 sm:grid-cols-2 gap-2">
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
import { useCartStore } from '~/store/index.ts';

const keywords = ['tình nguyện', 'thiện nguyện', 'người già', 'người già neo đơn'];

const head = () => ({
  title: 'Hệ thống quản lý hoạt động thiện nguyện hỗ trợ người già neo đơn',
  meta: [
    {
      hid: 'title',
      name: 'title',
      content: 'Hỗ trợ người già neo đơn',
    },
    {
      hid: 'description',
      name: 'description',
      content: 'Hệ thống quản lý hoạt động thiện nguyện hỗ trợ người già neo đơn',
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: keywords.join(', '),
    },
  ],
});

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

const calculateAge = (currentDay, birthday) => {
  const start = new Date(currentDay);
  const end = new Date(birthday);
  const timeDifference = start.getFullYear() - end.getFullYear();
  return Math.floor(timeDifference);
};

let volunteer;
onMounted(async () => {
  const { data, error } = await client.from('get_profile_volunteer').select().eq('status', true);
  if (error) {
    console.error(error);
  } else {
    volunteerData.value = data || [];
  }
});

const Save = async (volunteer) => {
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
        .eq('id_profile', volunteer.id)
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
              id_profile: volunteer.id,
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

</script>

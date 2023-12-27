<template>
  <div
      class="flex justify-center items-center sm:w-full  max-w-md  mx-auto  sm:bg-white/60 px-6 pt-10 pb-8 sm:shadow-xl sm:ring-1 ring-gray-900/5 sm:rounded-xl">
    <div class="w-full">
      <NuxtLink class="relative" to="/">
        <div class="bg-gray-100 p-5 rounded-full w-5 h-5  hover:cursor-pointer btn-back-home">
          <Icon name="ic:baseline-arrow-back" class="text-gray-400  w-5 h-5 absolute top-2.5 left-2.5"/>
          <span class="hidden absolute bg-gray-100 text-gray-500 text-xs h-8 p-2 rounded left-1 top-8 ">Quay về trang chủ</span>
        </div>
      </NuxtLink>

      <div class="text-center text-gray-400">
        <h1 class="sm:text-3xl text-xl font-bold text-gray-600  shadow-blue-50">Đăng nhập</h1>
      </div>
      <div class="mt-5 ">
        <Form @submit="signIn">
          <div class="relative mt-6">
            <label
                for="email"
                class="py-2 text-gray-800 focus:text-gray-600">Email
            </label>
            <Field
                type="email"
                name="email"
                id="email"
                placeholder="Mời nhập email"
                class="peer mt-1 w-full p-2 rounded border outline-none placeholder:text-sm"
                autocomplete="NA"
                v-model="email"
                rules="required|email"
            />

          </div>
          <ErrorMessage class="error" name="email" />
          <div class="relative mt-6">
            <label
                for="password"
                class="py-2 text-gray-800 focus:text-gray-600">Mật khẩu
            </label>
            <Field
                :type="showPassword? 'text':'password'"
                name="password"
                id="password"
                placeholder="Mời nhập mật khẩu"
                class="relative peer mt-1 w-full p-2 rounded border  outline-none placeholder:text-sm"
                autocomplete="NA"
                v-model="password"
                rules="required|password"
            />
            <span @click="toggleShowPass" class="hover:cursor-pointer">
                      <Icon v-if="showPassword" name="material-symbols:visibility-off-outline-rounded" class=" absolute right-5 text-gray-400 top-10 w-5 h-5"/>
                       <Icon v-else  name="material-symbols:visibility-outline-rounded" class=" absolute right-5 text-gray-400 top-10 w-5 h-5"/>
                    </span>
          </div>
          <ErrorMessage class="error" name="password" />

          <div class="my-6">
            <button
                type="submit"
                class="w-full rounded-md bg-black p-3 text-white bg-gradient-to-r from-cyan-400 to-blue-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-bold  text-md text-center me-2 mb-2"
            >
              Đăng nhập
            </button>
          </div>
          <p class="text-center text-sm text-gray-500 mb-6">
            Bạn chưa có tài khoản?
            <NuxtLink
                to="/register"
                class="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
            >Đăng ký tại đây.</NuxtLink
            >
          </p>

        </Form>
      </div>
    </div>

  </div>
  <!--  <div class="sm:block circle-big-right absolute rounded-full backdrop-blur-sm bg-white/10 z-1"></div>-->
  <!--  <div class="sm:block circle-big-left w-96 h-96 absolute rounded-full backdrop-blur-sm bg-white/20 z-1"></div>-->
</template>

<script setup>
definePageMeta({
  layout: "auth",
  middleware:"no-auth"
});
import { Form, Field, ErrorMessage } from 'vee-validate';
import {useLoadingStore} from '~/store'


const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();
const email = ref("");
const password = ref("");
const errorMsg = ref(null);
const showPassword = ref(false);
const loadingStore = useLoadingStore();
const loading = computed(() => {
  loadingStore.isLoading
})


const toggleShowPass= () => {
  showPassword.value = !showPassword.value
}

//auth


const signIn = async () => {
  loadingStore.setLoading(true);

  async function getUserDataByEmail(email) {
    if (user.value) {
      const { data, error } = await client
          .from('accounts')
          .select('*')
          .eq('email', email)
          .single();

      if (error) {
        console.error('Error fetching user data:', error);
        return null;
      }

      return data;
    }
    return null;
  }

  let userData = null;
  if (user.value) {
    userData = await getUserDataByEmail(user.value.email);
  }

  // signIn
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (user.value && userData) {
    if (userData.role === 'Admin') {
      await router.push("/admin/");
      loadingStore.setLoading(false);
      ElNotification.success({
        title: 'Thành công',
        message: 'Đăng nhập thành công',
      });
    } else if (userData.role === 'Tình nguyện viên') {
      await router.push("/");
      loadingStore.setLoading(false);
      ElNotification.success({
        title: 'Thành công',
        message: 'Đăng nhập thành công',
      });
    }
    else if (userData.role === 'Người cần hỗ trợ') {
      await router.push("/volunteer/");
      loadingStore.setLoading(false);
      ElNotification.success({
        title: 'Thành công',
        message: 'Đăng nhập thành công',
      });
    }
  } else {
    if (error && error.message) {
      errorMsg.value = error.message;
      ElNotification.error({
        title: 'Thất bại',
        message: 'Thông tin đăng nhập không chính xác. Mời nhập lại',
      });
    } else {
      errorMsg.value = 'Đã xảy ra lỗi trong quá trình đăng nhập.';
    }

    loadingStore.setLoading(false);
  }
};


</script>

<script>
export default {
  name: "login"
}
</script>
<style scoped>
.btn-back-home:hover span {
  display: block;
}

</style>


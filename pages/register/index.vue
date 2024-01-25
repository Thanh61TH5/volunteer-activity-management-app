<template>
  <div
      class="sm:w-full  max-w-md  mx-auto  sm:bg-white/60 px-6 pt-10  sm:shadow-xl sm:ring-1 ring-gray-900/5 sm:rounded-xl pb-8 sm:mt-10">
    <div class="w-full">
      <NuxtLink class="relative" to="/">
        <div class="bg-gray-100 p-5 rounded-full w-5 h-5  hover:cursor-pointer btn-back-home">
          <Icon name="ic:baseline-arrow-back" class="text-gray-400  w-5 h-5 absolute top-2.5 left-2.5"/>
          <span class="hidden absolute bg-gray-100 text-gray-500 text-xs h-8 p-2 rounded left-1 top-8 ">Quay về trang chủ</span>
        </div>
      </NuxtLink>
      <div class="text-center text-gray-400">
        <h1 class="sm:text-3xl text-xl font-bold text-gray-600  shadow-blue-50">Đăng ký</h1>
      </div>
      <div class="mt-5">
        <Form @submit="signUp">
          <div class="relative mt-6">
            <label
                for="username"
                class="py-2 text-gray-800 focus:text-gray-600">Họ tên
            </label>
            <Field
                type="text"
                name="username"
                id="username"
                placeholder="Mời nhập họ tên đầy đủ"
                class="peer mt-1 w-full p-2 rounded border outline-none placeholder:text-sm"
                v-model="username"
                rules="required"
            />
          </div>
          <ErrorMessage class="error" name="username" />
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
                v-model="password"
                rules="required|password"
            />
            <span @click="toggleShowPass" class="hover:cursor-pointer">
                      <Icon v-if="showPassword" name="material-symbols:visibility-off-outline-rounded" class=" absolute right-5 text-gray-400 top-10 w-5 h-5"/>
                       <Icon v-else  name="material-symbols:visibility-outline-rounded" class=" absolute right-5 text-gray-400 top-10 w-5 h-5"/>
                    </span>
          </div>
          <ErrorMessage class="error" name="password" />

          <div class="relative mt-6">
            <label
                for="confirmPassword"
                class="py-2 text-gray-800 focus:text-gray-600">Xác nhận mật khẩu
            </label>
            <Field
                :type="showConfirmPassword? 'text':'password'"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Mời nhập lại mật khẩu"
                class="relative peer mt-1 w-full p-2 rounded border  outline-none placeholder:text-sm"
                v-model="confirmPassword"
                rules="required|confirmPassword"
            />
            <span @click="toggleShowConfirmPass" class="hover:cursor-pointer">
                      <Icon v-if="showConfirmPassword" name="material-symbols:visibility-off-outline-rounded" class=" absolute right-5 text-gray-400 top-10 w-5 h-5"/>
                       <Icon v-else  name="material-symbols:visibility-outline-rounded" class=" absolute right-5 text-gray-400 top-10 w-5 h-5"/>
                    </span>
          </div>
          <ErrorMessage class="error" name="confirmPassword" />

          <div class="relative mt-6">
            <label
                for=""
                class="py-2 text-gray-800 focus:text-gray-600">Bạn là
            </label>
            <ul  class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg flex peer mt-2">
              <li class="w-full border-r border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3 border-r">
                  <Field v-model="selectedRole" value= "Người cần hỗ trợ" type="radio" name="list-radio" rules="required" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                  <label for="horizontal-list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Người cần hỗ trợ </label>
                </div>
              </li>
              <li class="w-full">
                <div class="flex items-center ps-3">
                  <Field v-model="selectedRole" value="Tình nguyện viên" type="radio" rules="required"  name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                  <label for="horizontal-list-radio-id" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tình nguyện viện</label>
                </div>
              </li>
            </ul>
          </div>
          <ErrorMessage class="error" name="list-radio" />

          <div class="my-6">
            <button
                type="submit"
                class="w-full rounded-md bg-black p-3 text-white bg-gradient-to-r from-cyan-400 to-blue-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-bold  text-md text-center me-2 mb-2">Đăng ký
            </button>
          </div>
          <p class="text-center text-sm text-gray-500 mb-2">
            Bạn đã có tài khoản?
            <NuxtLink
                to="/login"
                class="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Đăng nhập tại đây.
            </NuxtLink>
          </p>

        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  middleware:"no-auth"

});
import { ref } from "vue";
import {ErrorMessage, Field, Form} from "vee-validate";
import { useLoadingStore } from '~/store';


const loadingStore = useLoadingStore();
const loading = computed(() => loadingStore.isLoading);
const router = useRouter();
const client = useSupabaseClient();
const username = ref("");
const email = ref("");
const password = ref("");
const showPassword = ref("");
const confirmPassword = ref("");
const showConfirmPassword = ref(false);
const selectedRole = ref("");


const toggleShowPass= () => {
  showPassword.value = !showPassword.value
};
const toggleShowConfirmPass= () => {
  showConfirmPassword.value = !showConfirmPassword.value
};
const signUp = async () => {
  loadingStore.setLoading(true);
  const { error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) {
    ElNotification.error({
      title: 'Thất bại',
      message: 'Tài khoản này đã tồn tại. Vui lòng đăng ký bằng tài khoản khác.',
    });  }
  else {
    const {} = await client
        .from('accounts')
        .insert({name: username.value, email: email.value, password: password.value, role: selectedRole.value})

    const { data, error: errorAcc } = await client.from('accounts').select('id').eq('email', email.value);
    if (errorAcc) {
      console.error('Error fetching user data:', errorAcc);
    } else {
      const accData = data[0];
      if (accData) {
          const { error: Error } = await client
              .from('cart')
              .insert({
                id_user: accData.id
              });
          if (Error) {
            console.error('Error inserting data into support_seeker_profile:', Error);
          }
      const { error: ErrorPr } = await client
          .from('profiles')
          .insert({
            id_user: accData.id
          });
      if (ErrorPr) {
        console.error('Error inserting data into support_seeker_profile:', Error);
      }
    }
    }
    ElNotification.success({
      title: 'Thành công',
      message: 'Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.',
    });
    loadingStore.setLoading(false);
  }

};
</script>
<style scoped>
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>

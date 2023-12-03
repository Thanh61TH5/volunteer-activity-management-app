<script setup lang="ts">
import {ErrorMessage, Field, Form} from "vee-validate";
import { useLoadingStore } from '~/store';
import {ref} from "vue";

definePageMeta({
  layout:"dashboard-admin",
  middleware:"auth"
})

const client = useSupabaseClient();
const name = ref("");
const email = ref("");
const password = ref("");
const selectedRole = ref("");
const isOpenAddForm = ref(true);
const addingUser = ref(false);
const emit = defineEmits(['close', 'add']);


async function addUser() {
  const {data: accData, error: accError} = await client
      .from('accounts')
      .select('email')
      .eq('email', email.value);

  if (accError) {
    console.error("Oopsie-doodle, there was an error checking 'TaiKhoan' table:", accError);
  } else if (accData.length > 0) {
    // Email already exists in 'TaiKhoan' table
    ElNotification.error({
      title: 'Lỗi',
      message: 'Tài khoản đã tồn tại. Vui lòng đăng ký bằng tài khoản khác.',
    })
    return;
  }
  const {data: authData, error: authError} = await client
      .from('auth.users')
      .select('email')
      .eq('email', email.value);

  if (authError) {
    console.error("Oopsie-doodle, there was an error checking Supabase auth:", authError);
  } else if (authData.length > 0) {
    // Email already exists in Supabase auth
    ElNotification.error({
      title: 'Lỗi',
      message: 'Tài khoản đã tồn tại. Vui lòng đăng ký bằng tài khoản khác.',
    })
    return;
    addingUser.value = false;
  }

  const {error} = await client
      .from('accounts')
      .insert({name: name.value, email: email.value, password: password.value, role: selectedRole.value})
  if (error) {
    console.error('Error fetching user data:', error);
    return;
  } else {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    ElNotification.success({
      title: 'Thành công',
      message: 'Thêm người dùng thành công',
    })
    emit('add')

  }
}

const closeForm = () => {
  emit('close');
  isOpenAddForm.value = false
};


</script>

<template>
  <div
      class="rounded shadow-md rounded-lg bg-white p-6" v-if="isOpenAddForm">
    <h1 class="text-gray-600 sm:text-xl text-md font-medium">Thêm tài khoản</h1>
    <span>
      <hr class="w-full">
    </span>
    <Form >
      <div class="relative  mt-6">
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
            v-model="name"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="username" />
      <div class="relative mt-6">
        <label
            for="email"
            class="py-2 text-gray-800 focus:text-gray-600">Email
        </label>
        <input
            type="email"
            name="email"
            id="email"
            placeholder="Mời nhập email"
            class="peer mt-1 w-full p-2 rounded border outline-none   placeholder:text-sm"
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
        <input
            type="password"
            name="password"
            id="password"
            placeholder="Mời nhập mật khẩu"
            class="relative peer mt-1 w-full p-2 rounded border  outline-none placeholder:text-sm"
            v-model="password"
            rules="required|password"
        />
      </div>
      <ErrorMessage class="error" name="password" />



      <div class="relative mt-6">
        <label
            for=""
            class="py-2 text-gray-800 focus:text-gray-600">Loại tài khoản
        </label>
        <ul  class="items-center  text-sm font-medium text-gray-900 bg-white rounded-lg flex peer mt-2">
          <li class="">
            <div class="flex items-center ps-3">
              <Field v-model="selectedRole" value= "Người cần hỗ trợ" type="radio" name="list-radio" rules="required" class="w-4 h-4 text-blue-600 bg-gray-100"/>
              <label for="horizontal-list-radio-license" class=" py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Người cần hỗ trợ </label>
            </div>
          </li>
          <li class="">
            <div class="flex items-center ps-3">
              <Field v-model="selectedRole" value="Tình nguyện viên" type="radio" rules="required"  name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
              <label for="horizontal-list-radio-id" class=" py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tình nguyện viện</label>
            </div>
          </li>
        </ul>
      </div>
      <ErrorMessage class="error" name="list-radio" />

      <!--Submit button-->
      <div class="flex justify-center space-x-5 py-5">
        <button @click.prevent="addUser" type="submit" class="bg-blue-500 text-white rounded py-2 px-5 hover:bg-blue-400 transition duration-200 ease-in-out">
          Lưu
        </button>
        <button @click="closeForm" type="button" class="bg-red-500 text-white rounded py-2 px-5 hover:bg-red-400 transition duration-200 ease-in-out">
          Hủy
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped>

</style>

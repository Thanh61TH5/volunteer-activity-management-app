<script setup lang="ts">
import {ErrorMessage, Field, Form} from "vee-validate";
import { useLoadingStore } from '~/store';


definePageMeta({
  middleware:"auth"
})

const user = useSupabaseUser();
const client = useSupabaseClient();
const email = ref("");
const isOpenModifyForm = ref(false);
const isOpenChangePassWordForm = ref(false);
const loadingStore = useLoadingStore();

async function getUserDataByEmail(email: string) {
  if (user.value) {
    const { data:userData, error } = await client
        .from('accounts')
        .select('*')
        .eq('email', email)
        .single();

    if (error) {
      console.error('Error fetching user data:', error);
      return null;
    }

    return userData;
  }
  return null;
}

let userData = null;
  if (user.value) {
    userData = await getUserDataByEmail(user.value.email);
  }

function editAccount() {
  isOpenModifyForm.value = true;
}

function changePassword() {
  isOpenChangePassWordForm.value = true;
}
function  cancel() {
  isOpenModifyForm.value = false;
  isOpenChangePassWordForm.value = false;
}

</script>

<template>
  <div
      class="lg:mx-32 sm:mt-32 rounded-lg bg-white p-10">
    <div class="flex justify-between items-center">
      <h1 class="text-gray-600 sm:text-2xl text-lg font-medium">Quản lý tài khoản</h1>
      <div class="flex space-x-3">
        <button class="w-40 px-2 py-2 bg-blue-500 rounded-lg hover:bg-blue-400 transition duration-200 ease-in-out text-white " @click="editAccount">Sửa thông tin</button>
        <button class="w-40 px-2 py-2 bg-blue-500 rounded-lg hover:bg-blue-400 transition duration-200 ease-in-out text-white " @click="changePassword">Đổi mật khẩu</button>
      </div>
    </div>
    <Form>
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
            v-model="userData.name"
            rules="required"
            readonly
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
            class="peer mt-1 w-full p-2 rounded border outline-none  placeholder:text-sm "
            v-model="userData.email"
            readonly
        />
      </div>

      <div class="relative mt-6">
        <label
            for="password"
            class="py-2 text-gray-800 focus:text-gray-600">Mật khẩu
        </label>
        <input
            class="relative peer mt-1 w-full p-2 rounded border   outline-none placeholder:text-sm"
            v-model="userData.password"
            readonly
        />
      </div>


      <div class="relative mt-6">
        <label
            for=""
            class="py-2 text-gray-800 focus:text-gray-600">Loại tài khoản
        </label>
        <input
            name="role"
            id="role"
            class="relative peer mt-1 w-full p-2 rounded border  outline-none placeholder:text-sm"
            v-model="userData.role"
            readonly
        />
      </div>
    </Form>
    <form-change-password  v-if="isOpenChangePassWordForm" :user="userData"  @close="cancel" @save="changePassword"/>
    <form-modify-account v-if="isOpenModifyForm" :user="userData"  @close="cancel" @save="editAccount"/>
  </div>
</template>

<style scoped>

</style>

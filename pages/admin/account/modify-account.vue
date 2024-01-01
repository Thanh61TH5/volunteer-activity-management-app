<script setup lang="ts">
import {ErrorMessage, Field, Form} from "vee-validate";
import { useLoadingStore } from '~/store';
import {ref} from "vue";

definePageMeta({
  layout:"sidebar-admin",
  middleware:"auth"
})

const user = useSupabaseUser();
const client = useSupabaseClient();
const email = ref("");
const isOpenModifyForm = ref(true)
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

async function editUser() {
  const {error}  = await client
      .from('accounts')
      .update({name: userData.name })
      .eq('id',userData.id)
  if (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

function  cancel() {
  isOpenModifyForm.value = false
}

</script>

<template>
  <div v-if="isOpenModifyForm"
      class="w-full rounded-lg bg-white p-6 bg-white">
    <h1 class="text-gray-600 sm:text-xl text-md font-medium">Sửa tài khoản</h1>
    <span>
      <hr class="w-full">
    </span>
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
            class="peer mt-1 w-full p-2 rounded border outline-none  text-gray-400 placeholder:text-sm bg-gray-100"
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
            class="relative peer mt-1 w-full p-2 rounded border text-gray-400  outline-none placeholder:text-sm bg-gray-100"
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
            class="relative peer mt-1 w-full p-2 rounded border text-gray-400 outline-none placeholder:text-sm bg-gray-100"
            v-model="userData.role"
            readonly
        />
      </div>

      <!--Submit button-->
      <div class="flex justify-center space-x-5 py-5">
        <button @click="editUser" type="submit" class="bg-blue-500 text-white rounded py-2 px-5 hover:bg-blue-400 transition duration-200 ease-in-out">
          Lưu
        </button>
        <button @click="cancel" type="button" class="bg-red-500 text-white rounded py-2 px-5 hover:bg-red-400 transition duration-200 ease-in-out">
          Hủy
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped>

</style>

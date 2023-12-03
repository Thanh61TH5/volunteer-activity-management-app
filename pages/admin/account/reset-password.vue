<script setup lang="ts">
import {ErrorMessage, Field, Form} from "vee-validate";
import { useLoadingStore } from '~/store';
import {ref} from "vue";

definePageMeta({
  layout:"dashboard-admin",
  middleware:"auth"
})

const user = useSupabaseUser();
const client = useSupabaseClient();
const password = ref("");
const oldPassword = ref("");
const confirmNewPassword = ref("");
const isOpenForm = ref(true);


const loadingStore = useLoadingStore();
const loading = computed(() => loadingStore.isLoading);

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

async function resetPassword() {
  loadingStore.setLoading(true);
  if (userData.password === oldPassword.value) {
    try {
      await client.auth.updateUser({ password: password.value })

      const { error } = await client
          .from('accounts')
          .upsert({ id: userData.id, password: password.value })
          .select();
      loadingStore.setLoading(false);
      useNuxtApp().$toast.success("Đặt mật khẩu thành công.");

    } catch (error) {
      console.log(error);
    }
  }
  else if(password.value === oldPassword.value) {
    loadingStore.setLoading(false);
    useNuxtApp().$toast.error("Mật khẩu mới trùng với mật khẩu cũ. Vui lòng thử lại.");
    console.log(password);
    return;
  }
  else {
    loadingStore.setLoading(false);
    useNuxtApp().$toast.error("Mật khẩu cũ không đúng. Vui lòng thử lại.");
    console.log(password);
    return;
  }
}

function close() {
  isOpenForm.value = false
}


</script>

<template>
  <div
      class="w-full rounded-lg bg-white p-6" v-if="isOpenForm">
    <h1 class="text-gray-600 sm:text-xl text-md font-medium">Đặt lại mật khẩu</h1>
    <span>
      <hr class="w-full">
    </span>
    <Form @submit.prevent="resetPassword">
      <div class="relative mt-6">
        <label
            for="oldPassword"
            class="py-2 text-gray-800 focus:text-gray-600">Mật khẩu cũ
        </label>
        <Field
            name="oldPassword"
            id="oldPassword"
            placeholder="Mời nhập mật khẩu cũ"
            class="relative peer mt-1 w-full p-2 rounded border  outline-none placeholder:text-sm"
            v-model="oldPassword"
            rules="required|password"
        />
      </div>
      <ErrorMessage class="error" name="oldPassword" />

      <div class="relative mt-6">
        <label
            for="password"
            class="py-2 text-gray-800 focus:text-gray-600">Mật khẩu mới
        </label>
        <Field
            name="password"
            id="password"
            placeholder="Mời nhập mật khẩu mới"
            class="relative peer mt-1 w-full p-2 rounded border  outline-none placeholder:text-sm"
            v-model="password"
            rules="required|password"
        />
      </div>
      <ErrorMessage class="error" name="password" />

      <div class="relative mt-6">
        <label
            for="confirmPassword"
            class="py-2 text-gray-800 focus:text-gray-600">Xác nhận mật khẩu
        </label>
        <Field
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Mời nhập lại mật khẩu mới"
            class="relative peer mt-1 w-full p-2 rounded border  outline-none placeholder:text-sm"
            v-model="confirmNewPassword"
            rules="required|confirmPassword"
        />

      </div>
      <ErrorMessage class="error" name="confirmPassword" />

      <!--Submit button-->
      <div class="flex justify-center space-x-5 py-5">
        <button @click="resetPassword" type="submit" class="bg-blue-500 text-white rounded py-2 px-5 hover:bg-blue-400 transition duration-200 ease-in-out">
          Lưu
        </button>
        <button type="button" @click="close" class="bg-red-500 text-white rounded py-2 px-5 hover:bg-red-400 transition duration-200 ease-in-out">
          Hủy
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped>

</style>

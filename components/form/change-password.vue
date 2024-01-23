<script setup lang="ts">
import {ErrorMessage, Field, Form} from "vee-validate";
definePageMeta({
  middleware:"auth"
})
const emit = defineEmits(['close','save','updatePassword'])
const user = useSupabaseUser();
const client = useSupabaseClient();
const password = ref("");
const oldPassword = ref("");
const confirmNewPassword = ref("");
const isOpenForm = ref(true);
const loading = ref(false)

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
  emit('save')
  loading.value = true;if (userData.password === oldPassword.value) {
    try {
      await client.auth.updateUser({ password: password.value })

      const { error } = await client
          .from('accounts')
          .update({password: password.value })
          .eq('id',userData.id)
      if(userData.password === password.value) {
        loading.value = false;
        ElNotification.error({
          title: 'Lỗi',
          message: 'Mật khẩu mới trùng với mật khẩu cũ. Vui lòng thử lại.',
        })
        console.log(password);
        return;
      }
      loading.value = false;
      ElNotification.success({
        title: 'Thành công',
        message: 'Đặt mật khẩu thành công.',
      })
      emit('updatePassword', password.value);
      emit('close');
    } catch (error) {
      console.log(error);
    }
  }
  else {
    loading.value = false;
    ElNotification.error({
      title: 'Lỗi',
      message: 'Mật khẩu cũ không đúng. Vui lòng thử lại.',
    })
    return;
  }
}
function close() {
  isOpenForm.value = false
}
const handleClose = (done: () => void) => {
  emit('close');
  done()
}
</script>

<template>
  <el-dialog :before-close="handleClose" :v-loading ="loading"
             class="p-5" v-model="isOpenForm">
    <h1 class="text-gray-600 sm:text-xl text-md font-medium">Đổi mật khẩu</h1>
    <span>
      <hr class="w-full">
    </span>
    <Form>
      <div class="relative  mt-6">
        <label
            for="username"
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
        <button @click.prevent="resetPassword" type="submit" class="bg-blue-500 text-white rounded w-20 py-2 px-2 hover:bg-blue-400 transition duration-200 ease-in-out">
          Lưu
        </button>
        <button @click.prevent="handleClose" class="bg-red-500 text-white rounded w-20 py-2 px-2 hover:bg-red-400 transition duration-200 ease-in-out">
          Hủy
        </button>
      </div>
      <div v-if="loading" class=" loading right-0 left-0 bottom-0 top-0 flex justify-center items-center  absolute">
        <p class="text-white">Đang xử lý...</p>
      </div>
    </Form>
  </el-dialog>
</template>

<style scoped>

</style>

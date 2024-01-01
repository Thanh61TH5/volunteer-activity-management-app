<script setup lang="ts">
import {ErrorMessage, Field, Form} from "vee-validate";
const client = useSupabaseClient();
const name = ref("");
const isModifyUserDialogVisible = ref(true)
const loading = ref(false)
const props = defineProps({
  user: Object
});
const emit = defineEmits(['close', 'save']);

const user = ref(props.user);
const originalUser = ref({ ...user.value });

async function saveUser() {
  emit('save');
  try {
    loading.value = true;
    if (user.value.name === "" || user.value.password === "") {
      ElNotification.error({
        title: 'Thất bại',
        message: 'Vui lòng điền thông tin đầy đủ.',
      });
      return;
    } else if (
        user.value.name === originalUser.name &&
        user.value.password === originalUser.password
    ) {
      ElNotification.warning({
        title: 'Thông báo',
        message: 'Thông tin người dùng không thay đổi.',
      });
      return false;
    } else {
      const { error } = await client
          .from('accounts')
          .update({ name: user.value.name, password: user.value.password })
          .eq('id', user.value.id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      ElNotification.success({
        title: 'Thành công',
        message: 'Sửa thông tin người dùng thành công',
      });
      return true;
    }
  } catch (error) {
    console.error('Error modify user:', error);
  } finally {
    loading.value = false;
  }

}



const handleClose = (done: () => void) => {
  user.value = { ...originalUser.value };
  emit('close');
  done()
}


watch(() => props.user, (newValue) => {
  user.value = { ...newValue };
  originalUser.value = { ...newValue };
});


</script>

<template>
  <el-dialog :before-close="handleClose" :v-loading ="loading"
             class="p-5" v-model="isModifyUserDialogVisible">
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
            v-model="user.name"
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
            v-model="user.email"
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
            v-model="user.password"
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
            v-model="user.role"
            readonly
        />
      </div>

      <!--Submit button-->
      <div class="flex justify-center space-x-5 py-5">
        <button @click.prevent="saveUser" type="submit" class="bg-blue-500 text-white rounded w-20 py-2 px-2 hover:bg-blue-400 transition duration-200 ease-in-out">
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

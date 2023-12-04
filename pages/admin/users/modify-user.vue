<script setup lang="ts">
import {ErrorMessage, Field, Form} from "vee-validate";
import { useLoadingStore } from '~/store';
import {ref} from "vue";

definePageMeta({
  layout:"sidebar-admin",
  middleware:"auth"
})

const client = useSupabaseClient();
const name = ref("");
const isOpenModifyForm = ref(true)
const loadingStore = useLoadingStore();
const loading = computed(() => loadingStore.isLoading);
const isModifyUserDialogVisible = ref(true)



const props = defineProps({
  user: Object,
  fetchUserData: {}
});
const emit = defineEmits(['close', 'save']);

const user = ref(props.user);

async function saveUser() {
  emit('save');
  if(user.value.name === user.value.name || user.value.password === user.value.password) {
    ElNotification.info({
      title: 'Thông báo',
      message: 'Không có thông tin nào thay đổi.',
    });
    return ;
  }
  const { error } = await client
      .from('accounts')
      .update({ name: user.value.name,  password: user.value.password})
      .eq('id',user.value.id)
  if (error) {
    console.error('Error fetching user data:', error);
    ElNotification.error({
      title: 'Thất bại',
      message: 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
    });
    return ;
  } else {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    ElNotification.success({
      title: 'Thành công',
      message: 'Sửa thông tin người dùng thành công',
    });
    await fetchUserData();
    return true;
  }
}

const closeForm = () => {
  emit('close');
};


</script>

<template>
  <div
      class="" v-if="isModifyUserDialogVisible">
    <h1 class="text-gray-600 sm:text-xl text-md font-medium">Sửa người dùng</h1>
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
            class="relative peer mt-1 w-full p-2 rounded border text-gray-800  outline-none placeholder:text-sm"
            v-model="user.password"
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
        <button @click="saveUser" type="submit" class="bg-blue-500 text-white rounded py-2 px-5 hover:bg-blue-400 transition duration-200 ease-in-out">
          Lưu
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped>

</style>

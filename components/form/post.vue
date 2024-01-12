<script setup lang="ts">
import {ErrorMessage, Field, Form} from "vee-validate";
const client = useSupabaseClient();
const name = ref("");
const isDialogVisible = ref(true)
const loading = ref(false)
const props = defineProps({
  profile: Object
});
const emit = defineEmits(['close', 'post']);
const postSuccess = ref(false);
const profile = ref(props.profile);
const originalProfile = ref({ ...profile.value });
const start_date_post = ref(profile.value.start_date_post);
const end_date_post = ref(profile.value.end_date_post);
console.log(new Date())
async function postProfile() {
  try {
    loading.value = true;
    const enteredStartDate = new Date(start_date_post.value);
    const enteredEndDate = new Date(end_date_post.value);

    if (enteredStartDate > enteredEndDate || enteredStartDate < new Date() || enteredEndDate < new Date()) {
      ElNotification.error({
        title: 'Lỗi',
        message: 'Thời gian nhập vào không hợp lệ. Hãy thử lại.',
      });
    } else {
      const { error } = await client
          .from('profiles')
          .update({ start_date_post: enteredStartDate, end_date_post: enteredEndDate, status: true })
          .eq('id', profile.value.id);

      if (!error) {
        emit('post')

        ElNotification.success({
          title: 'Thành công',
          message: 'Đăng tin thành công',
        });
        postSuccess.value = true;

        // Emit the 'post' event to inform the parent component
        emit('post', postSuccess.value);
    }}
  } catch (error) {
    console.error('Error post profile:', error);
    ElNotification.error({
      title: 'Lỗi',
      message: 'Lỗi đăng tin. Hãy liên hệ với quản trị viên.',
    });
  } finally {
    loading.value = false;
  }
}

const handleClose = (done: () => void) => {
  profile.value = { ...originalProfile.value };
  emit('close');
  done()
}


watch(() => props.profile, (newValue) => {
  profile.value = { ...newValue };
  originalProfile.value = { ...newValue };
});


</script>

<template class="">
  <el-dialog  class="p-5" :before-close="handleClose" :v-loading ="loading" :style="{ width: '65%' }"
             v-model="isDialogVisible">
    <h1 class="text-gray-600 sm:text-xl text-md font-medium">Nhập thời hạn đăng tin:</h1>
    <span>
      <hr class="w-full">
    </span>
    <Form>
      <div class="sm:flex sm:justify-center sm:items-center flex-col">
        <el-date-picker
            v-model="start_date_post"
            type="date"
            placeholder="Chọn ngày bắt đầu"
            class="m-3"
            format="DD/MM/YYYY"
        />
        <el-date-picker
            v-model="end_date_post"
            type="date"
            placeholder="Chọn ngày hết hạn"
            class="m-3"
            format="DD/MM/YYYY"
        />
      </div>

      <!--Submit button-->
      <div class="flex justify-center space-x-5 py-5">
        <button @click.prevent="postProfile" type="submit" class="bg-blue-500 text-white rounded w-20 py-2 px-2 hover:bg-blue-400 transition duration-200 ease-in-out">
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
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

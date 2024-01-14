<script setup lang="ts">
import {ErrorMessage, Field, Form} from "vee-validate";
const client = useSupabaseClient();
const name = ref("");
const isDialogVisible = ref(true)
const loading = ref(false)
const postSuccess = ref(false);
const reason = ref('');
const props = defineProps({
  profile: Object,
});
const emit = defineEmits(['close', 'post','hideParentButton']);
const profile = ref(props.profile);
const originalProfile = ref({ ...profile.value });
const reasons = [
  {
    reason: 'Bận việc cá nhân',
    label: 'Bận việc cá nhân',
  },
  {
    reason: 'Bị ốm',
    label: 'Bị ốm',
  },
  {
    reason: 'Thời gian duyệt quá lâu',
    label: 'Thời gian duyệt quá lâu',
  },
  {
    reason: 'Thay đổi kế hoạch thiện nguyện',
    label: 'Thay đổi kế hoạch thiện nguyện',
  }
]

console.log(new Date())
async function postProfile() {
  try {
    loading.value = true;

    }
   catch (error) {
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
    <Form class="flex flex-col items-center">
      <div class="relative mt-6 flex items-center space-x-3 ">
          <label
              for="health_level"
              class="py-2 mr-2 text-gray-800 focus:text-gray-600">Lý do hủy tham gia thiện nguyện:
          </label>
        <el-select v-model="reason" placeholder="Lựa chọn lý do">
          <el-option
              v-for="item in reasons"
              :key="item.reason"
              :label="item.label"
              :value="item.reason"
          />
        </el-select>
      </div>
      <ErrorMessage class="error" name="health_level" />

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

<script setup lang="ts">
import { ElNotification, ElSelect, ElOption } from "element-plus";
import { ErrorMessage, Field, Form } from "vee-validate";
const client = useSupabaseClient();
const isDialogVisible = ref(true);
const loading = ref(false);
const reason = ref('');
const props = defineProps({
  request: Object,
});
const emit = defineEmits(['close', 'save']);
const request = ref(props.request);
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

async function postProfile() {
  emit('save');
  try {
    loading.value = true;

    // Check if the request object has the "id" property
    if (request.value.id) {
      console.log(request.value.id)
      // Check if id_profile is defined
      if (request.value.id_profile !== undefined) {
        const { data: checkData, error } = await client.from('profiles').select('end_date_post').eq('id', request.value.id_profile).single();

        if (error) {
          console.error(error);
          return;
        }

        if (checkData && new Date(checkData.end_date_post) < new Date()) {
          ElNotification.info({
            title: 'Thông báo',
            message: 'Đã hết hạn hủy tham gia. Hãy liên hệ với người cần hỗ trợ hoặc quản trị viên nếu bạn cần.',
          });
        } else {
          await client.from('requests').update({ status: 'Đã hủy', cancel_date: new Date(), cancel_reason: reason.value }).eq('id', request.value.id);
          ElNotification.success({
            title: 'Thành công',
            message: 'Hủy tham gia thành công.',
          });
        }
      } else {
        console.error('id_profile is undefined. Cannot make the API call.');
      }
    } else {
      console.error('Request object does not have an "id" property or it is undefined.');
    }
  } catch (error) {
    console.error('Error post profile:', error);
    ElNotification.error({
      title: 'Lỗi',
      message: 'Đã có lỗi xảy ra. Vui lòng thử lại',
    });
  } finally {
    loading.value = false;
  }
}


const handleClose = (done: () => void) => {
  emit('close');
  done();
}
</script>

<template>
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

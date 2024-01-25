<script setup lang="ts">
import {ErrorMessage, Field, Form} from "vee-validate";
const client = useSupabaseClient();
const user = useSupabaseUser();
const message = ref("");
const isDialogVisible = ref(true)
const loading = ref(false)
const props = defineProps(['profile']);
const profile = props.profile
const emit = defineEmits(['close', 'send']);


async function postProfile() {
  try {
    loading.value = true;

    const accountsQuery = await client.from('accounts').select('id').eq('email', user.value.email);
    const accountId = accountsQuery.data?.[0]?.id;

    if (accountId) {
      const idSender = accountId; // Lấy id của người đăng nhập
      const idReceiver = profile.id_user; // Lấy id của người nhận từ profile
      const idProfile = profile.id; // Lấy id của profile được chọn
      const sentDate = new Date();


      // Gửi request POST đến server
      const {data, error} = await client
          .from('requests')
          .insert([
            {
              id_receiver: idReceiver,
              id_sender: idSender,
              id_profile: idProfile,
              sent_date: sentDate,
              status: 'Đang chờ duyệt',
              message: message.value, // Thêm lời nhắn vào dữ liệu
            },
          ]);

      if (error) {
        console.error('Error post profile:', error);
        throw new Error('Lỗi gửi yêu cầu. Hãy liên hệ với quản trị viên.');
      }

      ElNotification.success({
        title: 'Thành công',
        message: 'Yêu cầu đã được gửi thành công.',
      });
      emit('send')
    }
  }
  catch
    (error)
    {
      console.error('Error post profile:', error);
      ElNotification.error({
        title: 'Lỗi',
        message: error.message || 'Lỗi gửi yêu cầu. Hãy liên hệ với quản trị viên.',
      });
    }
  finally
    {
      loading.value = false;
    }

  }
const handleClose = (done: () => void) => {
  emit('close');
  done()
}
</script>

<template class="">
  <el-dialog  class="p-2" :before-close="handleClose" :v-loading ="loading" :style="{ width: '50%' }"
              v-model="isDialogVisible">
    <div class="flex flex-wrap text-gray-500 text-lg font-medium space-x-2">
      <p class="">Yêu cầu tham gia thiện nguyện được gửi tới</p>
      <p class="text-blue-500">{{profile.name}}</p>
      <p>| Mã hồ sơ: #{{profile.id}}</p>
    </div>
    <span>
      <hr class="w-full">
    </span>
    <Form>
      <div class="sm:flex sm:justify-center sm:items-center flex-col">
        <textarea class="border border-gray-300 rounded-lg p-2 outline-none w-full" v-model="message" name="description" id="description" placeholder="Mời nhập lời nhắn..."></textarea>
      </div>
      <!--Submit button-->
      <div class="flex justify-center space-x-5 py-5">
        <button @click.prevent="postProfile" type="submit" class="bg-blue-500 text-white rounded w-20 py-2 px-2 hover:bg-blue-400 transition duration-200 ease-in-out">
          Gửi
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

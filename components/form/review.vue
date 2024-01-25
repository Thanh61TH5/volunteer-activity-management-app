<script setup lang="ts">
import { ElNotification, ElSelect, ElOption } from "element-plus";
import { ErrorMessage, Field, Form } from "vee-validate";
const client = useSupabaseClient();
const user = useSupabaseUser();
const isDialogVisible = ref(true);
const loading = ref(false);
const props = defineProps(['request', 'fetchUserData']);
const emit = defineEmits(['close', 'save']);
const request = props.request;
const id_sender = request.id_sender;
const score = ref(0);
const review = ref("")
console.log(request)

const computedScore = computed(() => {
  if (score.value === 1) {
    return 'Quá tệ';
  } else if (score.value === 2) {
    return 'Không tốt';
  } else if (score.value === 3) {
    return 'Bình thường';
  } else if (score.value === 4) {
    return 'Tốt';
  } else if (score.value === 5) {
    return 'Rất tốt';
  } else {
    return '';
  }
});

async function sendReview() {
  try {
    loading.value = true;

    const accountsQuery = await client.from('accounts').select('id').eq('email', user.value.email);
    const accountsQueryType = await client.from('accounts').select('role').eq('email', user.value.email);
    const profileQueryIdSender = await client.from('profiles').select('id').eq('id_user', id_sender);
    const profileIdSender = profileQueryIdSender.data?.[0]?.id;
    console.log('profileIdSender')
    const accountId = accountsQuery.data?.[0]?.id;
    const accountsType = accountsQueryType.data?.[0]?.role;
    console.log('accountsType:', accountsType);

    if (accountId && accountsType === 'Tình nguyện viên') {
      const idReviewer = accountId;
      const idProfile = request.id_profile;
      const idRequest = request.id;
      const createDate = new Date();

      const content = computedScore.value;

      const { data, error } = await client
          .from('feedbacks')
          .insert([
            {
              id_reviewer: idReviewer,
              id_profile: idProfile,
              score: score.value,
              created_at: createDate,
              content: review.value,
              id_request: idRequest
            },
          ]);

      if (error) {
        console.error('Error post profile:', error);
        throw new Error('Lỗi gửi yêu cầu. Hãy liên hệ với quản trị viên.');
      }
        const updateResult = await client
            .from('requests')
            .update({ is_done_volunteer: true })
            .eq('id', idRequest);

        if (updateResult.error) {
          console.error('Error updating is_done_volunteer:', updateResult.error);
          throw new Error('Lỗi cập nhật thông tin đánh giá.');
        }


      ElNotification.success({
        title: 'Thành công',
        message: 'Đánh giá đã được gửi thành công.',
      });
      await fetchUserData();
      emit('save');
    }else {
      const idReviewer = accountId;
      const idProfile = profileIdSender;
      const idRequest = request.id;
      const createDate = new Date();

      const content = computedScore.value;

      const { data, error } = await client
          .from('feedbacks')
          .insert([
            {
              id_reviewer: idReviewer,
              id_profile: idProfile,
              score: score.value,
              created_at: createDate,
              content: review.value,
              id_request: idRequest
            },
          ]);

      if (error) {
        console.error('Error post profile:', error);
        throw new Error('Lỗi gửi yêu cầu. Hãy liên hệ với quản trị viên.');
      }
        const updateResult = await client
            .from('requests')
            .update({ is_done_sp: true })
            .eq('id', idRequest);

        if (updateResult.error) {
          console.error('Error updating is_done_sp:', updateResult.error);
          throw new Error('Lỗi cập nhật thông tin đánh giá.');
        }

      ElNotification.success({
        title: 'Thành công',
        message: 'Đánh giá đã được gửi thành công.',
      });
      await fetchUserData();
      emit('save');
    }
  } catch (error) {
    console.error('Error post profile:', error);
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
    <h1 class="text-gray-600 sm:text-xl text-md font-medium">Đánh giá mã hồ sơ #{{request.id_profile}}</h1>
    <span>
      <hr class="w-full">
    </span>
    <Form class="flex flex-col items-center">
      <div class="mt-6 items-center ">
        <label
            for="score"
            class="py-2 text-gray-800 focus:text-gray-600">Mời đánh giá sao:
        </label>
        <el-rate
            class="space-x-2 hover:none block"
            name="score"
            v-model="score"
        />
        <p>{{ computedScore }}</p>
      </div>

      <div class="relative  mt-6">
        <label
            for="review"
            class="py-2 text-gray-800 focus:text-gray-600">Mời nhập đánh giá (giới hạn tối đa 1000 ký tự):
        </label>
        <Field
            as ="textarea"
            name="review"
            id="review"
            placeholder="Mời nhập đánh giá ..."
            class="peer mt-1 w-full p-2 rounded border outline-none placeholder:text-sm"
            v-model="review"
            rules="required"
            :maxlength="1000"
        />
      </div>
      <ErrorMessage class="error" name="review" />


      <!--Submit button-->
      <div class="flex justify-center space-x-5 py-5">
        <button @click.prevent="sendReview" type="submit" class="bg-blue-500 text-white rounded w-20 py-2 px-2 hover:bg-blue-400 transition duration-200 ease-in-out">
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
.custom-rate .el-rate__icon.is-focus {
  color: red; /* Màu sắc khi được focus */
}

.custom-rate .el-rate__text.is-focus {
  color: red; /* Màu sắc của văn bản khi được focus */
}

.custom-rate .el-rate__text {
  margin-left: 8px; /* Khoảng cách giữa mỗi sao và văn bản */
}
</style>

<script setup lang="ts">
import {ErrorMessage, Field, Form} from "vee-validate";
const client = useSupabaseClient();
const name = ref("");
const isModifyDialogVisible = ref(true)
const loading = ref(false)
const props = defineProps({
  profile: Object
});
const emit = defineEmits(['close', 'save']);

const profile = ref(props.profile);
const originalProfile = ref({ ...profile.value });

async function saveUser() {
  // emit('save');
  // try {
  //   loading.value = true;
  //   if (profile.value.name === "" || profile.value.password === "") {
  //     ElNotification.error({
  //       title: 'Thất bại',
  //       message: 'Vui lòng điền thông tin đầy đủ.',
  //     });
  //     return;
  //   } else if (
  //       postProfile.value.name === originalUser.name &&
  //       user.value.password === originalUser.password
  //   ) {
  //     ElNotification.warning({
  //       title: 'Thông báo',
  //       message: 'Thông tin người dùng không thay đổi.',
  //     });
  //     return false;
  //   } else {
  //     const { error } = await client
  //         .from('accounts')
  //         .update({ name: user.value.name, password: user.value.password })
  //         .eq('id', user.value.id);
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     ElNotification.success({
  //       title: 'Thành công',
  //       message: 'Sửa thông tin người dùng thành công',
  //     });
  //     return true;
  //   }
  // } catch (error) {
  //   console.error('Error modify user:', error);
  // } finally {
  //   loading.value = false;
  // }

}


const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const prop = {
  label: 'name',
  value: 'id',
}
const value = ref([])
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  id: `Option ${idx + 1}`,
  name: `${initials[idx % 10]}${idx}`,
}))
const level = ref(profile.value.health_level)

const levels = [
  {
    level: '1',
    label: '1',
  },
  {
    level: '2',
    label: '2',
  },
  {
    level: '3',
    label: '3',
  },
  {
    level: '4',
    label: '4',
  }
]
const situation = ref(profile.value.personal_situation)


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

<template>
  <el-dialog :before-close="handleClose" :v-loading ="loading"
             class="p-5" v-model="isModifyDialogVisible">
    <h1 class="text-gray-600 sm:text-xl text-md font-medium">Sửa hồ sơ</h1>
    <span>
      <hr class="w-full">
    </span>
    <Form>
      <h1 class="text-gray-600 font-bold text-lg pt-5">Thông tin chung:</h1>
      <div class="relative  mt-6">
        <label
            for="name"
            class="py-2 text-gray-800 focus:text-gray-600">Họ và tên:
        </label>
        <Field
            type="text"
            name="name"
            id="username"
            placeholder="Mời nhập họ tên đầy đủ"
            class="peer mt-1 w-full p-2 rounded border outline-none placeholder:text-sm"
            v-model="profile.name"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="name" />
      <div class="relative mt-6">
        <label
            for="birthday"
            class="py-2 text-gray-800 focus:text-gray-600">Ngày sinh
        </label>
        <input
            type="text"
            name="birthday"
            id="birthday"
            class="peer mt-1 w-full p-2 rounded border outline-none  placeholder:text-sm"
            v-model="profile.birthday"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="birthday" />

      <div class="relative mt-6">
        <label
            for="gender"
            class="py-2 text-gray-800 focus:text-gray-600">Giới tính:
        </label>
        <ul  class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg flex peer mt-2 space-x-5">
          <li class="">
            <div class="flex items-center">
              <Field v-model="profile.gender" value= "Nam" type="radio" name="gender" rules="required" class="w-4 h-4 text-blue-600"/>
              <label for="horizontal-list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam </label>
            </div>
          </li>
          <li class="">
            <div class="flex items-center">
              <Field v-model="profile.gender" value="Nữ" type="radio" rules="required"  name="gender" class="w-4 h-4 text-blue-600"/>
              <label for="horizontal-list-radio-id" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nữ</label>
            </div>
          </li>
        </ul>
      </div>
      <ErrorMessage class="error" name="gender" />

      <div class="relative mt-6">
        <label
            for="address"
            class="py-2 text-gray-800 focus:text-gray-600">Địa chỉ
        </label>
        <Field
            type="text"
            name="address"
            id="address"
            class="peer mt-1 w-full p-2 rounded border outline-none  placeholder:text-sm"
            v-model="profile.address"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="address" />

      <div class="relative mt-6">
        <label
            for="area"
            class="py-2 text-gray-800 focus:text-gray-600">Khu vực
        </label>
        <Field
            type="text"
            name="area"
            id="area"
            class="peer mt-1 w-full p-2 rounded border outline-none  placeholder:text-sm"
            v-model="profile.area"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="area" />
      <div class="relative mt-6">
        <label
            for="phone"
            class="py-2 text-gray-800 focus:text-gray-600">Số điện thoại
        </label>
        <Field
            type="text"
            name="phone"
            id="phone"
            class="peer mt-1 w-full p-2 rounded border outline-none  placeholder:text-sm"
            v-model="profile.phone"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="phone" />

      <div class="relative mt-6">
        <label
            for="self_description"
            class="py-2 text-gray-800 focus:text-gray-600">Mô tả bản thân
        </label>
        <Field
            as="textarea"
            name="self_description"
            id="self_description"
            class="peer mt-1 w-full p-2 rounded border outline-none  placeholder:text-sm"
            v-model="profile.self_description"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="self_description" />

      <div class="relative mt-6">
        <label
            for="hobbies"
            class="py-2 text-gray-800 focus:text-gray-600">Sở thích
        </label>
        <div class="flex space-x-3">
          <Field
              type="text"
              name="hobbies"
              id="hobbies"
              class="peer mt-1 p-2 w-full rounded border outline-none  placeholder:text-sm"
              v-model="profile.hobbies"
              rules="required"/>
        </div>
        </div>



      <ErrorMessage class="error" name="hobbies" />

      <div class="relative mt-6 flex items-center space-x-3">
        <div class=" flex flex-col">
          <label
              for="health_level"
              class="py-2 mr-2 text-gray-800 focus:text-gray-600">Xếp loại sức khỏe:
          </label>
          <a class="text-blue-500 hover:text-blue-300 underline" href="">Chi tiết cách xếp loại sức khỏe</a>
        </div>
        <el-select v-model="level" placeholder="Lựa chọn mức">
          <el-option
              v-for="item in levels"
              :key="item.level"
              :label="item.label"
              :level="item.level"
          />
        </el-select>
      </div>
      <ErrorMessage class="error" name="health_level" />

      <div class="relative mt-6">
        <label
            for="helth_description"
            class="py-2 text-gray-800 focus:text-gray-600">
          Mô tả tình trạng sức khỏe:
        </label>
        <Field
            as="textarea"
            name="helth_description"
            id="helth_description"
            class="peer mt-1 w-full p-2 rounded border outline-none  placeholder:text-sm"
            v-model="profile.helth_description"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="helth_description" />

      <h1 class="text-gray-600 font-bold text-lg pt-5">Thông tin thiện nguyện:</h1>
      <div class="relative mt-6">
        <label
            for="helth_description"
            class="py-2 text-gray-800 focus:text-gray-600">Hoàn cảnh cá nhân:
        </label>
        <ul  class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg flex peer mt-2 space-x-5">
          <li class="">
            <div class="flex items-center">
              <Field v-model="profile.personal_situation" value= "Sống một mình" type="radio" name="personal_situation" rules="required" class="w-4 h-4 text-blue-600"/>
              <label for="horizontal-list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sống một mình </label>
            </div>
          </li>
          <li class="">
            <div class="flex items-center">
              <Field v-model="profile.personal_situation" value="Sống cùng gia đình" type="radio" rules="required"  name="personal_situation" class="w-4 h-4 text-blue-600"/>
              <label for="horizontal-list-radio-id" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sống cùng gia đình</label>
            </div>
          </li>
        </ul>
      </div>
      <ErrorMessage class="error" name="personal_situation" />


      <div class="relative mt-6">
        <label
            for="support_job_name"
            class="py-2 text-gray-800 focus:text-gray-600"> Tên việc cần hỗ trợ:
        </label>
        <Field
            type="text"
            name="support_job_name"
            id="support_job_name"
            class="peer mt-1 w-full p-2 rounded border outline-none  placeholder:text-sm"
            v-model="profile.support_job_name"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="support_job_name" />

      <div class="relative mt-6">
        <label
            for="support_job_name"
            class="py-2 text-gray-800 focus:text-gray-600"> Giờ kết thúc:
        </label>
        <Field
            type="text"
            name="support_job_name"
            id="support_job_name"
            class="peer mt-1 w-full p-2 rounded border outline-none  placeholder:text-sm"
            v-model="profile.support_job_name"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="support_job_name" />

      <div class="relative mt-6">
        <label
            for="support_weekday"
            class="py-2 text-gray-800 focus:text-gray-600"> Thứ trong tuần cần hỗ trợ
        </label>
        <Field
            type="text"
            name="support_weekday"
            id="support_weekday"
            class="peer mt-1 w-full p-2 rounded border outline-none  placeholder:text-sm"
            v-model="profile.support_weekday"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="support_weekday" />

      <div class="relative mt-6">
        <label
            for="contact_family_info"
            class="py-2 text-gray-800 focus:text-gray-600"> Thông tin liên hệ người thân:
        </label>
        <Field
            type="text"
            name="contact_family_info"
            id="contact_family_info"
            class="peer mt-1 w-full p-2 rounded border outline-none  placeholder:text-sm"
            v-model="profile.contact_family_info"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="contact_family_info" />

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

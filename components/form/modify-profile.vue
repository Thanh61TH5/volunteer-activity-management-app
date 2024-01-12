<script setup lang="ts">
import {ErrorMessage, Field, Form} from "vee-validate";
import dataCity from '~/static/cities.json';
import data from '~/static/days.json';

const client = useSupabaseClient();
const isModifyDialogVisible = ref(true)
const loading = ref(false)
const props = defineProps({
  profile: Object
});
const emit = defineEmits(['close', 'save']);
const profile = ref(props.profile);
const avt = ref(profile.value.avt);
const name = ref(profile.value.name);
const birthday = ref(profile.value.birthday);
const gender = ref(profile.value.gender);
const address = ref(profile.value.address);
const level = ref(profile.value.health_level)
const phone = ref(profile.value.phone);
const weekday = ref(profile.value.support_weekday);
const self_description = ref(profile.value.self_description);
const hobbies = ref(profile.value.hobbies);
const helth_description = ref(profile.value.helth_description);
const personal_situation = ref(profile.value.personal_situation);
const support_job_name = ref(profile.value.support_job_name);
const contact_family_info = ref(profile.value.contact_family_info);
const support_time_start = ref(profile.value.support_time_start);
const support_time_end = ref(profile.value.support_time_end);
const originalProfile = ref({ ...profile.value });
const avatar = ref(null)
const avatarFile = ref("");
const storeURL = 'https://swldzquurwqdqhceugzs.supabase.co/storage/v1/object/public/avatars/avatars/';
const day = ref([])
const area = ref(profile.value.area)
const days = ref(data.days);
const cities = ref(dataCity.cities);

const onFileChange = (event: { target: { files: string | any[]; }; }) => {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    avt.value = URL.createObjectURL(file)
  }

  const {name:fileName} =  event.target.files[0];
  const names = fileName.split('.');
  console.log(names)
  const extension = names.pop();
  const imgName = names.join('');
  console.log(`${imgName}-${Date.now().toString()}.${extension}`)
  avatarFile.value = {
    file:event.target.files[0],
    name:`${imgName}-${Date.now().toString()}.${extension}`
  }
};

function formatTime(timeString: { split: (arg0: string) => { (): any; new(): any; slice: { (arg0: number, arg1: number): [any, any]; new(): any; }; }; }) {
  // Assuming timeString is in the format 'HH:mm:ss'
  const [hours, minutes] = timeString.split(':').slice(0, 2); // Extract hours and minutes
  return `${hours}:${minutes}`;
}

const options = ref(
    days.value.map(day => ({
      value: day.name,
      label: day.name,
    }))
);

watch(day, (newVal) => {
  weekday.value = newVal.join(' | ');
});

console.log(days);
console.log(cities);
async function saveProfile() {
  emit('save');
  try {
    loading.value = true;

    if (avatarFile.value.file) {
      const { data: dataImg, error: errorImg } = await client.storage
          .from('avatars')
          .upload(`avatars/${avatarFile.value.name}`, avatarFile.value.file);
      const { error: profileError } = await client
          .from('profiles')
          .update({
            avt: storeURL + avatarFile.value.name,
          })
          .eq('id', profile.value.id);

      if (errorImg) {
        console.error('Error uploading avatar image:', errorImg);
      }
    }

    const { error: profileSpError } = await client
        .from('support_seeker_profile')
        .update({
          personal_situation: personal_situation.value,
          support_job_name: support_job_name.value,
          support_weekday: weekday.value,
          support_time_end: support_time_end.value,
          support_time_start: support_time_start.value,
          contact_family_info: contact_family_info.value
        })
        .eq('id', profile.value.id);

    const { error: profileError } = await client
        .from('profiles')
        .update({
          name: name.value,
          birthday: birthday.value,
          gender: gender.value,
          address: address.value,
          health_level: level.value,
          area: area.value,
          phone: phone.value,
          self_description: self_description.value,
          hobbies: hobbies.value,
          helth_description: helth_description.value
        })
        .eq('id', profile.value.id);


    if (profileSpError) {
      console.error('Error modifying user in support_seeker_profile:', profileSpError);
    }

    if (profileError) {
      console.error('Error modifying user in profiles:', profileError);
    }

  } catch (error) {
    console.error('Error modifying user:', error);
  } finally {
    loading.value = false;
  }
}


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

const handleClose = (done: () => void) => {
  profile.value = { ...originalProfile.value };
  emit('close');
  done()
}

watch(() => props.profile, (newValue) => {
  profile.value = { ...newValue };
  originalProfile.value = { ...newValue };
  weekday.value = newValue.weekday;
});

</script>

<template>
  <el-dialog :before-close="handleClose" :v-loading ="loading"
             class="p-5" v-model="isModifyDialogVisible">
    <h1 class="text-gray-600 sm:text-2xl text-xl font-medium">Sửa hồ sơ</h1>
    <span>
      <hr class="w-full">
    </span>
    <Form>
      <h1 class="text-gray-600 font-medium text-lg pt-5">Thông tin chung:</h1>
      <div class="p-1 flex justify-center items-center">
        <img class="rounded-full w-32 h-32 border-2 border-gray-200 p-1 bg-white" :src="avt" alt="avatar">
      </div>

      <div class="flex justify-center items-center mb-5">
        <label for="getFile" class="py-1 px-2 rounded bg-blue-500 hover:bg-blue-400 text-white text-sm">Chọn ảnh đại
          diện</label>
        <input type="file" id="getFile"
               class="hidden flex-1 py-2 focus:border-green-400
                      text-gray-600 placeholder-gray-400
                      outline-none" @change="onFileChange" aria-label="Hãy chọn một ảnh">
      </div>

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
            v-model="name"
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
            v-model="birthday"
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
              <Field v-model="gender" value= "Nam" type="radio" name="gender" rules="required" class="w-4 h-4 text-blue-600"/>
              <label for="horizontal-list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam </label>
            </div>
          </li>
          <li class="">
            <div class="flex items-center">
              <Field v-model="gender" value="Nữ" type="radio" rules="required"  name="gender" class="w-4 h-4 text-blue-600"/>
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
            v-model="address"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="address" />

      <div class="relative mt-6">
        <label for="area" class="py-2 text-gray-800 focus:text-gray-600">Tỉnh thành:</label>
        <div class="relative mt-6 flex items-center space-x-3">
          <div class="">
            <label
                for="health_level"
                class="py-2 mr-2 text-gray-800 focus:text-gray-600">Chọn tỉnh thành:
            </label>
          </div>
          <el-select v-model="area" placeholder="Select a city">
            <el-option
                v-for="city in cities"
                :key="city.id"
                :label="city.name"
                :value="city.name"
            ></el-option>
          </el-select>


        </div>


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
            v-model="phone"
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
            v-model="self_description"
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
              v-model="hobbies"
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
              :value="item.level"
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
            v-model="helth_description"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="helth_description" />

      <h1 class="text-gray-600 font-medium text-lg pt-5">Thông tin thiện nguyện:</h1>
      <div class="relative mt-6">
        <label
            for="helth_description"
            class="py-2 text-gray-800 focus:text-gray-600">Hoàn cảnh cá nhân:
        </label>
        <ul  class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg flex peer mt-2 space-x-5">
          <li class="">
            <div class="flex items-center">
              <Field v-model="personal_situation" value= "Sống một mình" type="radio" name="personal_situation" rules="required" class="w-4 h-4 text-blue-600"/>
              <label for="horizontal-list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sống một mình </label>
            </div>
          </li>
          <li class="">
            <div class="flex items-center">
              <Field v-model="personal_situation" value="Sống cùng gia đình" type="radio" rules="required"  name="personal_situation" class="w-4 h-4 text-blue-600"/>
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
            v-model="support_job_name"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="support_job_name" />

      <div class="relative mt-6">
        <label
            for="support_job_name"
            class="py-2 text-gray-800 focus:text-gray-600"> Thời gian cần hỗ trợ:
        </label>
        <div class="demo-time-range">
          <el-time-select
              v-model="support_time_start"
              :max-time="support_time_end"
              class=""
              placeholder="Thời gian bắt đầu"
              start="08:30"
              step="00:15"
              end="18:30"
          />
          <el-time-select
              v-model="support_time_end"
              :min-time="support_time_start"
              placeholder="Thời gian kết thúc"
              start="08:30"
              step="00:15"
              end="18:30"
          />
        </div>
      </div>
      <ErrorMessage class="error" name="support_job_name" />

      <div class="relative mt-6 space-x-3 flex flex-col">
          <label for="health_level" class="py-2 mr-2 text-gray-800 focus:text-gray-600">
            Chọn thứ trong trong tuần:
          </label>
          <el-select-v2
              v-model="day"
              :options="options"
              placeholder="Chọn ít nhất một thứ trong tuần"

              multiple
          />
        <input type="text" v-model="weekday" readonly  class="p-2 border border-gray-200 rounded-lg m-2"/>
      </div>

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
            v-model="contact_family_info"
            rules="required"
        />
      </div>
      <ErrorMessage class="error" name="contact_family_info" />

      <!--Submit button-->
      <div class="flex justify-center space-x-5 py-5">
        <button @click.prevent="saveProfile" type="submit" class="bg-blue-500 text-white rounded w-20 py-2 px-2 hover:bg-blue-400 transition duration-200 ease-in-out">
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
.demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
}
</style>

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
const email = ref("");
const password = ref("");
const selectedRole = ref("");
const isAddUserDialogVisible = ref(true);
const loading = ref(false);
const emit = defineEmits(['close','open']);
const value = ref(8)


async function addUser() {
  emit('add')
  try {
    loading.value= true;
    if(name.value==="" || email.value ==="" || password.value ==="" || selectedRole.value === "") {
      ElNotification.error({
        title: 'Lỗi',
        message: 'Vui lòng điền đầy đủ các trường thông tin còn thiếu.',
      })
      return;
    }
    const {data: accData, error: accError} = await client
        .from('accounts')
        .select('email')
        .eq('email', email.value);

    if (accError) {
      console.error("Oopsie-doodle, there was an error checking 'TaiKhoan' table:", accError);
    } else if (accData.length > 0) {
      // Email already exists in 'TaiKhoan' table
      ElNotification.error({
        title: 'Lỗi',
        message: 'Tài khoản đã tồn tại. Vui lòng đăng ký bằng tài khoản khác.',
      })
      return;
    }
    const {data: authData, error: authError} = await client
        .from('auth.users')
        .select('email')
        .eq('email', email.value);

    if (authError) {
      console.error("Oopsie-doodle, there was an error checking Supabase auth:", authError);
    } else if (authData.length > 0) {
      // Email already exists in Supabase auth
      ElNotification.error({
        title: 'Lỗi',
        message: 'Tài khoản đã tồn tại. Vui lòng đăng ký bằng tài khoản khác.',
      })
      return;
    }

    const {error} = await client
        .from('accounts')
        .insert({name: name.value, email: email.value, password: password.value, role: selectedRole.value})
    if (error) {
      console.error('Error fetching user data:', error);
      return;
    } else {

      ElNotification.success({
        title: 'Thành công',
        message: 'Thêm người dùng thành công',
      })
      await fetchUserData();
      return true;
    }
  }catch (error) {
    console.error('Error adding user:', error);
  } finally {
    loading.value = false;
  }

}

const handleClose = (done: () => void) => {
  name.value ="";
  email.value ="";
  password.value ="";
  selectedRole.value =""

  emit('close');
  done()
}



</script>

<template>
  <el-dialog :before-close="handleClose"
             class="p-5" v-model="isAddUserDialogVisible">
    <h1 class="text-gray-600 sm:text-xl text-md font-medium">Đánh giá tình nguyện viên</h1>
    <span>
      <hr class="w-full">
     <template>
</template>
    </span>
    <Form >


    </Form>
  </el-dialog>
</template>

<style scoped>

</style>

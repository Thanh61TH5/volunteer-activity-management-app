<template>
  <div class="sm:mx-32 mx-5 sm:mt-32">
    <div class="">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
        ><a href="/">Trang chủ</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/sp-seeker/profile' }">Hồ sơ</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <component :is="displayComponent" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware:"auth"
})
import Test from "~/components/card/card-profile.vue";
import AddProfile from "~/components/card/add-profile.vue";
const keywords = ['tình nguyện', 'thiện nguyện', 'người già', 'người già neo đơn'];

const head = () => ({
  title: 'Hệ thống quản lý hoạt động thiện nguyện hỗ trợ người già neo đơn',
  meta: [
    {
      hid: 'title',
      name: 'title',
      content: 'Hỗ trợ người già neo đơn',
    },
    {
      hid: 'description',
      name: 'description',
      content: 'Hệ thống quản lý hoạt động thiện nguyện hỗ trợ người già neo đơn',
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: keywords.join(', '),
    },
  ],
});

const user = useSupabaseUser()
const client = useSupabaseClient()
const userData = ref([])
const profileData = ref([])

onMounted(async () => {
  try {
    if (user.value) {
      const {data, error} = await client
          .from('accounts')
          .select('*')
          .eq('email', user.value.email)
          .single();

      userData.value = data;
      if (userData.value) {
        getIdProfile();
      }
    }
  } catch (error) {
    console.log(error)
  }
})

async function getIdProfile() {
  try {
    if (user.value && userData.value) {
      const {data, error} = await client
          .from('profiles')
          .select('*')
          .eq('id_user', userData.value.id)
          .single();

      profileData.value = data;
    }
  } catch (error) {
    console.log(error)
  }
}

const displayComponent = computed(() => {
  if (profileData.value && profileData.value.name) {
    return Test;
  } else {
    return AddProfile;
  }
});
</script>

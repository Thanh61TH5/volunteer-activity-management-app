<template>
  <div class="lg:block lg:fixed bg-white hidden border-b border-neutral-200 top-0 right-0 left-0 fixed z-50">
    <nav class=" w-full bg-white flex justify-between items-center lg:px-32 py-3 space-x-32 z-50">
      <div class="flex space-x-6 w-2/5 flex-start" v-if="user">
        <NuxtLink to="/volunteer/list-sp-seeker/" class="text-gray-500 hover:text-blue-400 transition duration-300 ease-linear">Việc cần hỗ trợ</NuxtLink>
        <NuxtLink to="/list-volunteer/" class="text-gray-500 hover:text-blue-400 transition duration-300 ease-linear">Tình nguyện viên</NuxtLink>
        <NuxtLink to="/" class="text-gray-500 hover:text-blue-400 transition duration-300 ease-linear">Về chúng tôi</NuxtLink>
      </div>
      <div class="flex space-x-6 w-2/5 flex-start" v-else>
          <NuxtLink to="/list-sp-seeker/" class="text-gray-500 hover:text-blue-400 transition duration-300 ease-linear">Việc cần hỗ trợ</NuxtLink>
          <NuxtLink to="/list-volunteer/" class="text-gray-500 hover:text-blue-400 transition duration-300 ease-linear">Tình nguyện viên</NuxtLink>
          <NuxtLink to="/" class="text-gray-500 hover:text-blue-400 transition duration-300 ease-linear">Về chúng tôi</NuxtLink>
      </div>
      <div class="flex space-x-6 w-3/5 justify-between">
        <div></div>
        <div class="relative flex items-center space-x-6 ">
          <div class=" ">
            <div class="absolute left-2">
              <Icon name="ic:twotone-search" class="w-10 h-10 text-gray-500 px-2"/>
            </div>
            <input
                type="search"
                class="border-gray-200 border rounded-full p-3 text-sm max-w-96 indent-8 transition duration-100 ease-in outline-none focus:border-blue-300"
                placeholder="Tìm kiếm tình nguyện viên hoặc người cần hỗ trợ ..."
            />
          </div>
            <el-menu v-if="user"
                :default-active="activeIndex"
                mode="horizontal"
                :ellipsis="false"
                @select="handleSelect"
            >
              <el-menu-item index="0">
              </el-menu-item>
              <el-sub-menu index="2">
                <template #title>{{userData.email}}</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                  <template #title>item four</template>
                  <el-menu-item index="2-4-1">item one</el-menu-item>
                  <el-menu-item index="2-4-2">item two</el-menu-item>
                  <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
            </el-menu>

          <nuxt-link to="/login" class="py-2  rounded-full text-gray-500 transition duration-300 ease-linear hover:text-blue-400" v-else>
            Đăng nhập
          </nuxt-link>

          <NuxtLink to="/register" class="bg-gradient-to-r from-cyan-400 to-blue-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-cyan-100 px-5 py-2 rounded-full text-white transition duration-500 ease-linear" v-else>
            Đăng ký
          </NuxtLink>
        </div>
        </div>
    </nav>
  </div>
  <nav class="flex items-center justify-between py-5 px-5 border-b-2 border-gray-200 lg:hidden block bg-white">
    <div class="hover: cursor-pointer lg:hidden block" @click="navToggle">
      <Icon name="tabler:align-justified"  class="w-6 h-6 text-gray-400"/>
    </div>

    <div class="flex space-x-3">
      <div class=" max-w-lg relative flex items-center lg:hidden block">
        <div class="absolute left-2">
          <Icon name="ic:twotone-search" class="w-10 h-10 text-gray-500 px-2"/>
        </div>

        <input
            type="search"
            class="lg:hidden block border-gray-200 border rounded-full p-2 text-sm w-full indent-8 transition duration-100 ease-in outline-none focus:border-blue-300"
            placeholder="Tìm kiếm tình nguyện viên hoặc người cần hỗ trợ ..."
        />
      </div>
      <NuxtLink
          to="/register"
          class="lg:hidden block bg-gradient-to-r from-cyan-400 to-blue-400 hover:bg-gradient-to-l focus:outline-none px-6 p-2 text-center rounded-full text-white transition duration-500 ease-linear">
        Đăng ký
      </NuxtLink>
    </div>

  </nav>
  <div class=" lg:hidden block flex-col space-y-6 w-full pl-5 py-5" v-if="openNav">
    <NuxtLink to="/list-sp-seeker/" class="block text-gray-600 hover:text-blue-400 transition duration-300 ease-linear">Việc cần hỗ trợ</NuxtLink>
    <NuxtLink to="/list-volunteer/" class="block text-gray-600 hover:text-blue-400 transition duration-300 ease-linear">Tình nguyện viên</NuxtLink>
    <NuxtLink to="/" class="block text-gray-600 hover:text-blue-400 transition duration-300 ease-linear">Về chúng tôi</NuxtLink>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();
const openNav = ref(false)
const userData = ref([]);
console.log(user.value.email)
function navToggle() {
  openNav.value = !openNav.value
}

onMounted(async () => {
  try{
    if (user.value) {
      const { data, error } = await client
          .from('accounts')
          .select('*')
          .eq('email', user.value.email)
          .single();

      userData.value = data
    console.log(userData.value)
  }}catch (error) {
    console.log(error)
  }
})
</script>

<style scoped>

</style>
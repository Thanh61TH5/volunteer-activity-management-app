<template>
  <div class="sm:block bg-white hidden border-b border-neutral-200 top-0 right-0 left-0 fixed z-50">
    <nav class=" w-full bg-white flex justify-between items-center lg:px-32 py-3 space-x-32 z-50">
      <div class="flex space-x-6">
          <NuxtLink to="/home/sp-seeker/" class="text-gray-500 hover:text-blue-400 transition duration-300 ease-linear">Việc cần hỗ trợ</NuxtLink>
          <NuxtLink to="/home/volunteer/" class="text-gray-500 hover:text-blue-400 transition duration-300 ease-linear">Tình nguyện viên</NuxtLink>
          <NuxtLink to="/home/about/" class="text-gray-500 hover:text-blue-400 transition duration-300 ease-linear">Về chúng tôi</NuxtLink>
      </div>

      <div class="w-full max-w-lg relative flex items-center">
        <div class="absolute left-2">
          <Icon name="ic:twotone-search" class="w-10 h-10 text-gray-500 px-2"/>
        </div>

        <input
            type="search"
            class="border-gray-200 border rounded-full p-3 text-sm w-full indent-8 transition duration-100 ease-in outline-none focus:border-blue-300"
            placeholder="Tìm kiếm tình nguyện viên hoặc người cần hỗ trợ ..."
        />
      </div>
      <div class="flex space-x-6">

        <nuxt-link to="/login"
                   class="py-2  rounded-full text-gray-500 transition duration-300 ease-linear hover:text-blue-400">
          Đăng nhập
        </nuxt-link>

        <NuxtLink
            to="/register"
            class="bg-gradient-to-r from-cyan-400 to-blue-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-cyan-100 px-5 py-2 rounded-full text-white transition duration-500 ease-linear">
          Đăng ký
        </NuxtLink>
      </div>
    </nav>
  </div>
  <nav class="flex items-center justify-between py-5 px-5 border-b-2 border-gray-200 sm:hidden block bg-white">
    <div class="hover: cursor-pointer sm:hidden block" @click="navToggle">
      <Icon name="tabler:align-justified"  class="w-6 h-6 text-gray-400"/>
    </div>

    <div class="flex space-x-3">
      <div class=" max-w-lg relative flex items-center sm:hidden block">
        <div class="absolute left-2">
          <Icon name="ic:twotone-search" class="w-10 h-10 text-gray-500 px-2"/>
        </div>

        <input
            type="search"
            class="sm:hidden block border-gray-200 border rounded-full p-2 text-sm w-full indent-8 transition duration-100 ease-in outline-none focus:border-blue-300"
            placeholder="Tìm kiếm tình nguyện viên hoặc người cần hỗ trợ ..."
        />
      </div>
      <NuxtLink
          to="/register"
          class="sm:hidden block bg-gradient-to-r from-cyan-400 to-blue-400 hover:bg-gradient-to-l focus:outline-none px-6 p-2 text-center rounded-full text-white transition duration-500 ease-linear">
        Đăng ký
      </NuxtLink>
    </div>

  </nav>
  <div class=" sm:hidden block flex-col space-y-6 w-full pl-5 py-5" v-if="openNav">
    <NuxtLink to="/home/sp-seeker/" class="block text-gray-600 hover:text-blue-400 transition duration-300 ease-linear">Việc cần hỗ trợ</NuxtLink>
    <NuxtLink to="/home/volunteer/" class="block text-gray-600 hover:text-blue-400 transition duration-300 ease-linear">Tình nguyện viên</NuxtLink>
    <NuxtLink to="/home/about/" class="block text-gray-600 hover:text-blue-400 transition duration-300 ease-linear">Về chúng tôi</NuxtLink>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const openNav = ref(false)

function navToggle() {
  openNav.value = !openNav.value
}
</script>

<style scoped>
.nav-links {
  display: flex;
  justify-content: flex-end;
  list-style: none;
}

.nav-links li {
  margin-left: 1rem;
}
</style>
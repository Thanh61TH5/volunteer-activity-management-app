<template>
  <nav class="bg-white border-b border-neutral-200 flex justify-center items-center p-3 space-x-32">

    <div class="flex space-x-6">
      <div v-for="link in links" :key="link.name">
        <a class="text-gray-500 hover:text-blue-400 transition duration-300 ease-linear" :href="link.link">{{ link.name }}</a>
      </div>
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
</template>

<script setup>

const links = [
  { name: "Tình nguyện viên", link: "/shop" },
  { name: "Người cần hỗ trợ", link: "/" },
  { name: "Giới thiệu", link: "/" },
];
const user = useSupabaseUser();
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

<template>
  <div class="lg:block lg:fixed bg-white hidden border-b border-neutral-200 top-0 right-0 left-0 fixed z-50 relative">
    <nav class="bg-white border-b border-neutral-200 flex justify-center items-center space-x-64 relative p-3">

      <div class="flex space-x-6">
        <div v-for="link in links" :key="link.name">
          <a class="text-gray-500 hover:text-blue-400 transition duration-300 ease-linear"
             :href="link.link">{{ link.name }}</a>
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
        <div class="flex justify-center items-center hover:cursor-pointer" @click="drawer = true" >
          <el-badge :value="1" class="item" type="primary">
            <Icon name="icons8:shopping-cart" class="w-8 h-8 text-gray-500"/>
          </el-badge>
        </div>
        <el-dropdown trigger="click" v-if="user" class="">
        <span class="el-dropdown-link text-base py-3 px-5 rounded-full border border-gray-100 shadow-md">
         {{userData.name}}
           <Icon name="gravity-ui:chevron-down"/>
        </span>
          <template #dropdown>
            <el-dropdown-menu >
              <el-dropdown-item class="clearfix">
                <p class="text-base">Tài khoản cá nhân</p>
              </el-dropdown-item>
              <el-dropdown-item class="clearfix">
                <p class="text-base">Hồ sơ cá nhân</p>
              </el-dropdown-item>
              <el-dropdown-item class="clearfix">
                <p class="text-base" v-if="userData.role==='Tình nguyện viên'">Tham gia thiện nguyện</p>
                <p class="text-base" v-else >Yêu cầu tham gia thiện nguyện</p>
              </el-dropdown-item>
              <span>
                <hr>
              </span>
              <el-dropdown-item class="clearfix" @click="signOut =true">
                <p class="text-base">Đăng xuất</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <nuxt-link to="/login" v-else
                   class="py-2  rounded-full text-gray-500 transition duration-300 ease-linear hover:text-blue-400">
          Đăng nhập
        </nuxt-link>

        <NuxtLink
            to="/register" v-else
            class="bg-gradient-to-r from-cyan-400 to-blue-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-cyan-100 px-5 py-2 rounded-full text-white transition duration-500 ease-linear">
          Đăng ký
        </NuxtLink>
      </div>
    </nav>
    <card-detail-cart v-model="drawer"/>
  </div>
  <nav class="flex items-center justify-between py-5 px-5 border-b-2 border-gray-200 lg:hidden block bg-white">
    <div class="hover: cursor-pointer lg:hidden block" @click="navToggle">
      <Icon name="tabler:align-justified" class="w-6 h-6 text-gray-400"/>
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
          to="/login"
          class="lg:hidden block px-6 p-2 text-center rounded-full text-white transition duration-500 ease-linear">
        Đăng nhập
      </NuxtLink>
      <NuxtLink
          to="/register"
          class="lg:hidden block bg-gradient-to-r from-cyan-400 to-blue-400 hover:bg-gradient-to-l focus:outline-none px-6 p-2 text-center rounded-full text-white transition duration-500 ease-linear">
        Đăng ký
      </NuxtLink>
    </div>
  </nav>
  <div class=" lg:hidden block flex-col space-y-6 w-full pl-5 py-5" v-if="openNav">
    <NuxtLink to="/list-sp-seeker/" class="block text-gray-600 hover:text-blue-400 transition duration-300 ease-linear">
      Việc cần hỗ trợ
    </NuxtLink>
    <NuxtLink to="/list-volunteer/" class="block text-gray-600 hover:text-blue-400 transition duration-300 ease-linear">
      Tình nguyện viên
    </NuxtLink>
    <NuxtLink to="/" class="block text-gray-600 hover:text-blue-400 transition duration-300 ease-linear">Về chúng tôi
    </NuxtLink>
  </div>
  <el-dialog v-model="signOut" center class="rounded-lg " >
    <span class="text-center">
      Bạn có chắc muốn đăng xuất không?
    </span>
    <template #footer>
      <span class="dialog-footer  flex justify-center items-center space-x-3">
        <el-button @click="cancelSignOut">Hủy bỏ</el-button>
        <el-button type="primary" @click="confirmSignOut">
          Đăng xuất
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
const links = [
  {name: "Việc cần hỗ trợ", link: "/list-sp-seeker/"},
  {name: "Tình nguyện viên", link: "/list-volunteer"},
  {name: "Về chúng tôi", link: "/about"},
];
const user = useSupabaseUser();
const client = useSupabaseClient();
const openNav = ref(false)
const userData = ref([]);
const router = useRouter();
const drawer = ref(false);
const openDetail = ref(false);
const signOut = ref(false)

async function confirmSignOut() {
  try {
    const {error} = await client.auth.signOut()
    signOut.value = false;
    await router.push('/login')

  } catch (error) {
    console.log(error)
  }

}


const cancelSignOut = () => {
  signOut.value = false;
};
function navToggle() {
  openNav.value = !openNav.value
}

onMounted(async () => {
  try {
    if (user.value) {
      const {data, error} = await client
          .from('accounts')
          .select('*')
          .eq('email', user.value.email)
          .single();

      userData.value = data
      console.log(userData.value)
    }
  } catch (error) {
    console.log(error)
  }
})

function openDetailCart() {
  openDetail.value = !openDetail.value
}
</script>

<style scoped>

</style>
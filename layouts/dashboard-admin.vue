<script setup lang="ts">



const client = useSupabaseClient();
const isOpenUserMenu = ref(false);
const isOpenSideBar = ref(false);
const router = useRouter();
const user = useSupabaseUser();

async function getUserDataByEmail(email: string) {
  if (user.value) {
    const { data, error } = await client
        .from('accounts')
        .select('*')
        .eq('email', email)
        .single();

    if (error) {
      console.error('Error fetching user data:', error);
      return null;
    }

    return data;
  }
  return null;
}

let userData = null;
if (user.value) {
  userData = await getUserDataByEmail(user.value.email);
}

function openUserMenu() {
  isOpenUserMenu.value = !isOpenUserMenu.value
}

function openSideBar() {
  isOpenSideBar.value = !isOpenSideBar.value

}

async function signOut() {
  try{
    const {error} = await client.auth.signOut()
    await router.push('/login')

  }catch (error){
    console.log(error)
  }

}
</script>

<template>
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button @click="openSideBar" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
          <a href="https://flowbite.com" class="flex ms-2 md:me-24">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" />
            <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span>
          </a>
        </div>
        <div class="flex items-center">
          <div class="flex relative items-center ms-3">
            <div>
              <button type="button" @click="openUserMenu" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
              </button>
            </div>
            <div v-if="isOpenUserMenu" class="absolute w-60 top-9 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
              <div class="px-4 py-3" role="none">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  {{userData.name}}
                </p>
              </div>
              <button class="w-full text-left border-none px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="admin">Sửa thông tin tài khoản</button>
              <button class="w-full text-left border-none  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Đặt lại mật khẩu</button>
              <button class="w-full text-left   px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Đăng xuất</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon class="text-gray-800 w-5 h-5 ml-5" name="heroicons-outline:chart-bar"/>
            <span class="ms-3">Thống kê</span>
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon class="text-gray-800 w-5 h-5 ml-5" name="heroicons-outline:chat-alt-2"/>
            <span class="flex-1 ms-3 whitespace-nowrap">Tin nhắn</span>
            <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
          </a>
        </li>
        <li>
          <NuxtLink to="/admin/users/" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon name="mdi:account-group-outline" class="text-gray-800 w-5 h-5 ml-5"/>

            <span class="flex-1 ms-3 whitespace-nowrap">Người dùng</span>
          </NuxtLink>
        </li>
        <li>
          <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon class="text-gray-800 w-5 h-5 ml-5" name="heroicons-outline:clipboard-document-list"/>
            <span class="flex-1 ms-3 whitespace-nowrap">Tin đăng</span>
          </a>
        </li>
        <li>
          <button @click="signOut" class="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon name="ic:baseline-logout" class="text-gray-800 w-5 h-5 ml-5"/>
            <span class=" px-3 whitespace-nowrap">Đăng xuất</span>
          </button>
        </li>
        <li>
        </li>
      </ul>
    </div>
  </aside>

  <aside v-if= "isOpenSideBar" class="  fixed top-0 left-0 z-40 w-64 h-screen pt-20  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon class="text-gray-800 w-5 h-5 ml-5" name="heroicons-outline:chart-bar"/>
            <span class="ms-3">Thống kê</span>
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon class="text-gray-800 w-5 h-5 ml-5" name="heroicons-outline:chat-alt-2"/>
            <span class="flex-1 ms-3 whitespace-nowrap">Tin nhắn</span>
            <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
          </a>
        </li>
        <li>
          <NuxtLink href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon name="mdi:account-group-outline" class="text-gray-800 w-5 h-5 ml-5"/>

            <span class="flex-1 ms-3 whitespace-nowrap">Người dùng</span>
          </NuxtLink>
        </li>
        <li>
          <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon class="text-gray-800 w-5 h-5 ml-5" name="heroicons-outline:clipboard-document-list"/>
            <span class="flex-1 ms-3 whitespace-nowrap">Tin đăng</span>
          </a>
        </li>
        <li>
          <button @click="signOut" class="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon name="ic:baseline-logout" class="text-gray-800 w-5 h-5 ml-5"/>
            <span class=" px-3 whitespace-nowrap">Đăng xuất</span>
          </button>
        </li>
        <li>
        </li>
      </ul>
    </div>
  </aside>

  <div class="p-4 sm:ml-64">
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 min-h-screen">
      <slot/>
      <Footer/>
    </div>
  </div>

</template>

<style scoped>

</style>

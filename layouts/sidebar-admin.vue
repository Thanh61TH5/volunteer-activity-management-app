<script setup lang="ts">

import {UserFilled} from "@element-plus/icons-vue";

const client = useSupabaseClient();
const isOpenUserMenu = ref(false);
const isOpenSideBar = ref(false);
const router = useRouter();
const user = useSupabaseUser();
const signOut = ref(false)

async function getUserDataByEmail(email: string) {
  if (user.value) {
    const {data, error} = await client
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

function closeSideBar() {
  isOpenSideBar.value = false;
}
</script>

<template>


  <aside id="logo-sidebar"

         class="fixed shadow-md top-0 left-0 z-60 w-64 h-screen pt-10 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
         aria-label="Sidebar">

    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium py-5">
        <li>
          <NuxtLink to="/admin/statistics/"
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon class="text-gray-800 w-5 h-5 ml-5" name="heroicons-outline:chart-bar"/>
            <span class="ms-3">Thống kê</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/users/"
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon name="mdi:account-group-outline" class="text-gray-800 w-5 h-5 ml-5"/>

            <span class="flex-1 ms-3 whitespace-nowrap">Người dùng</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/posts/"
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon class="text-gray-800 w-5 h-5 ml-5" name="heroicons-outline:clipboard-document-list"/>
            <span class="flex-1 ms-3 whitespace-nowrap">Tin đăng</span>
          </NuxtLink>
        </li>
        <span><hr></span>
        <li>
          <NuxtLink to="/admin/account/"
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon name="material-symbols:person-edit-outline" class="text-gray-800 w-5 h-5 ml-5"/>

            <span class="flex-1 ms-3 whitespace-nowrap">Tài khoản cá nhân</span>
          </NuxtLink>
        </li>
        <li>
          <button @click="signOut =true"
                  class="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon name="ic:baseline-logout" class="text-gray-800 w-5 h-5 ml-5"/>
            <span class=" px-3 whitespace-nowrap" >Đăng xuất</span>
          </button>
        </li>
        <li>
        </li>
      </ul>
    </div>
  </aside>

  <aside v-if="isOpenSideBar"
         class="  fixed top-0 left-0 z-40 w-64 h-screen pt-20  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
         aria-label="Sidebar">
    <div class="min-h-screen px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <NuxtLink  to="/admin/statistics/"
             class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon class="text-gray-800 w-5 h-5 ml-5" name="heroicons-outline:chart-bar"/>
            <span class="ms-3">Thống kê</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/users/"
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon name="mdi:account-group-outline" class="text-gray-800 w-5 h-5 ml-5"/>

            <span class="flex-1 ms-3 whitespace-nowrap">Người dùng</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink  to="/admin/posts/"
             class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon class="text-gray-800 w-5 h-5 ml-5" name="heroicons-outline:clipboard-document-list"/>
            <span class="flex-1 ms-3 whitespace-nowrap">Tin đăng</span>
          </NuxtLink>
        </li>
        <li>
          <button @click="signOut =true"
                  class="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon name="ic:baseline-logout" class="text-gray-800 w-5 h-5 ml-5"/>
            <span class=" px-3 whitespace-nowrap">Đăng xuất</span>
          </button>
        </li>
        <span><hr></span>
        <li>
          <NuxtLink to="/admin/account/"
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon name="material-symbols:person-edit-outline" class="text-gray-800 w-5 h-5 ml-5"/>

            <span class="flex-1 ms-3 whitespace-nowrap">Tài khoản cá nhân</span>
          </NuxtLink>
        </li>
        <li>
          <button @click="signOut =true"
                  class="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon name="ic:baseline-logout" class="text-gray-800 w-5 h-5 ml-5"/>
            <span class=" px-3 whitespace-nowrap">Đăng xuất</span>
          </button>
        </li>
        <li>
        </li>
      </ul>
    </div>
  </aside>


  <nav class="fixed top-0 sm:left-32 left-0 z-50 right-0 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-2 shadow-md">
    <div class="px-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button @click="openSideBar"
                  class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <Icon name="tabler:align-justified" class="w-5 h-5"/>
          </button>
                    <a href="#" class="flex ml-32">
                      <img src="/logo.png" class="h-12 w-12 mr-3" alt="logo"/>
                      <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Hỗ trợ người già neo đơn</span>
                    </a>
        </div>
        <div class="flex items-center justify-between lg:block hidden">
          <div class="flex relative items-center ms-3">
            <el-dropdown trigger="click" v-if="user" class="">
        <span class="el-dropdown-link text-base py-3 px-5 rounded-full border border-gray-100 shadow-md">
         {{ userData.name }}
           <Icon name="gravity-ui:chevron-down"/>
        </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <NuxtLink to="/admin/account/">
                    <el-dropdown-item class="clearfix">
                      <p class="text-base">Tài khoản cá nhân</p>
                    </el-dropdown-item>
                  </NuxtLink>
                  <span>
                <hr>
              </span>
                  <el-dropdown-item class="clearfix" @click="signOut =true">
                    <p class="text-base">Đăng xuất</p>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="mt-10 p-4 sm:ml-64">
    <div class=" min-h-screen">
      <div class="flex justify-center items-center"  @click="closeSideBar">
          <slot />
      </div>
    </div>
    <Footer/>
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

<style scoped>
#logo-sidebar,
[v-show="isOpenSideBar"] {
  z-index: 100; /* Adjust the value as needed */
}

/* Styling for the overlay */

</style>

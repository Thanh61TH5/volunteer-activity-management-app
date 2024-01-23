<template>
  <div class="lg:block lg:fixed bg-white hidden border-b border-neutral-200 top-0 right-0 left-0 fixed z-50 relative">
    <nav class="bg-white border-b border-neutral-200 flex justify-center items-center 2xl:space-x-40 lg:space-x-10 md:space-x-8  space-x-20 relative p-3 w-full">

      <div class="flex space-x-6">
        <div v-for="link in links" :key="link.name">
          <NuxtLink
              class="text-gray-500 block"
              :class="{
        'text-blue-700 font-medium': activeLink === link.name,
        'active': activeLink === link.name
      }"
              @click="updateActiveLink(link.name)"
              :href="link.link"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>

      <div class=" relative flex items-center w-1/4 py-2 ">
        <div class="absolute right-2">
          <Icon name="ic:twotone-search" class="w-10 h-10 text-gray-500 px-2 hover:cursor-pointer hover:text-blue-400 duration-200 ease-in-out" @click="performSearch"/>
        </div>
        <input
            v-model="searchKeyword"
            type="text"
            class="border-gray-200 border rounded-full w-full p-3 text-sm transition duration-100 ease-in outline-none focus:border-blue-300"
            placeholder="Nhập vào thông tin tìm kiếm..."
            @keydown="handleKeyPress"
        />
      </div>
      <div class="flex space-x-6 ">
        <div class="flex justify-center items-center hover:cursor-pointer" @click="drawer = true">
          <el-badge :value="cartCount" class="item" type="primary">
            <Icon name="icons8:shopping-cart" class="w-8 h-8 text-gray-500"/>
          </el-badge>
        </div>
        <el-dropdown trigger="click" v-if="user" class="">
        <span class="el-dropdown-link text-base py-3 px-5 rounded-full border border-gray-100 shadow-md">
         {{userData.name}}
           <Icon name="gravity-ui:chevron-down"/>
        </span>
          <span class="el-dropdown-link text-base py-3 px-5 rounded-full border border-gray-100 shadow-md ">
           <Icon name="material-symbols:person-outline-rounded" class="w-5 h-5"/>
        </span>
          <template #dropdown>
            <el-dropdown-menu >
              <NuxtLink to="/sp-seeker/account/" v-if="userData.role==='Người cần hỗ trợ'">
                <el-dropdown-item class="clearfix">
                  <p class="text-base">Tài khoản cá nhân</p>
                </el-dropdown-item>
              </NuxtLink>
              <NuxtLink to="/volunteer/account/" v-if="userData.role==='Tình nguyện viên'">
                <el-dropdown-item class="clearfix">
                  <p class="text-base">Tài khoản cá nhân</p>
                </el-dropdown-item>
              </NuxtLink>
              <NuxtLink to="/sp-seeker/profile/" v-if="userData.role==='Người cần hỗ trợ'">
                <el-dropdown-item class="clearfix">
                  <p class="text-base">Hồ sơ cá nhân</p>
                </el-dropdown-item>
              </NuxtLink>
              <NuxtLink to="/volunteer/profile/" v-if="userData.role==='Tình nguyện viên'">
                <el-dropdown-item class="clearfix">
                  <p class="text-base">Hồ sơ cá nhân</p>
                </el-dropdown-item>
              </NuxtLink>
              <NuxtLink to="/sp-seeker/request/" v-if="userData.role==='Người cần hỗ trợ'">
                <el-dropdown-item class="clearfix">
                  <p class="text-base" >Yêu cầu tham gia thiện nguyện</p>
                </el-dropdown-item>
              </NuxtLink>
                <NuxtLink to="/volunteer/request/" v-if="userData.role==='Tình nguyện viên'">
                  <el-dropdown-item class="clearfix">
                    <p class="text-base" >Tin tham gia thiện nguyện</p>
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
        <div v-else class="space-x-5">
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

      </div>
    </nav>
    <card-detail-cart v-model="drawer"/>
  </div>
  <nav class="flex items-center justify-between py-2 px-5 border-b-2 border-gray-200 lg:hidden block bg-white">
    <div class="hover: cursor-pointer lg:hidden block" @click="navToggle">
      <Icon name="tabler:align-justified" class="w-6 h-6 text-gray-400"/>
    </div>

    <div class=" relative flex items-center  border-gray-200 border w-2/4 rounded-full py-2  text-sm  duration-100 ease-in outline-none focus:border-blue-300">
      <div class="absolute right-2 " @click="performSearch">
        <Icon name="ic:twotone-search" class="w-10 h-10 text-gray-500 px-2" />
      </div>

      <input
          type="text"
          class="lg:hidden block px-3 outline-none"
          placeholder="Nhập vào thông tin..."
      />
    </div>

    <div class="flex space-x-8">
      <div class="flex justify-center items-center hover:cursor-pointer" @click="drawer = true">
        <el-badge :value="cartCount" class="item" type="primary">
          <Icon name="icons8:shopping-cart" class="w-8 h-8 text-gray-500"/>
        </el-badge>
      </div>

      <el-dropdown trigger="click" v-if="user" class="">
        <span class="el-dropdown-link border border-gray-200 focus:ring-2  p-2 rounded-full border border-gray-100 shadow-md hover:cursor-pointer">
           <Icon name="material-symbols:person-outline-rounded" class="w-5 h-5"/>
        </span>
        <template #dropdown>
          <el-dropdown-menu >
            <NuxtLink to="/sp-seeker/account/" v-if="userData.role==='Người cần hỗ trợ'">
              <el-dropdown-item class="clearfix">
                <p class="text-base">Tài khoản cá nhân</p>
              </el-dropdown-item>
            </NuxtLink>
            <NuxtLink to="/volunteer/account/" v-if="userData.role==='Tình nguyện viên'">
              <el-dropdown-item class="clearfix">
                <p class="text-base">Tài khoản cá nhân</p>
              </el-dropdown-item>
            </NuxtLink>
            <NuxtLink to="/sp-seeker/profile/" v-if="userData.role==='Người cần hỗ trợ'">
              <el-dropdown-item class="clearfix">
                <p class="text-base">Hồ sơ cá nhân</p>
              </el-dropdown-item>
            </NuxtLink>
            <NuxtLink to="/volunteer/profile/" v-if="userData.role==='Tình nguyện viên'">
              <el-dropdown-item class="clearfix">
                <p class="text-base">Hồ sơ cá nhân</p>
              </el-dropdown-item>
            </NuxtLink>
            <NuxtLink to="/sp-seeker/request/" v-if="userData.role==='Người cần hỗ trợ'">
              <el-dropdown-item class="clearfix">
                <p class="text-base" >Yêu cầu tham gia thiện nguyện</p>
              </el-dropdown-item>
            </NuxtLink>
            <NuxtLink to="/volunteer/request/" v-if="userData.role==='Tình nguyện viên'">
              <el-dropdown-item class="clearfix">
                <p class="text-base" >Tin tham gia thiện nguyện</p>
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

      <el-dropdown trigger="click" class="" v-else>
        <span class="el-dropdown-link border border-gray-200 focus:ring-2  p-2 rounded-full border border-gray-100 shadow-md hover:cursor-pointer">
           <Icon name="material-symbols:person-outline-rounded" class="w-5 h-5"/>
        </span>
        <template #dropdown>
          <el-dropdown-menu >
            <NuxtLink to="/register/">
              <el-dropdown-item class="clearfix">
                <p class="text-base">Đăng ký</p>
              </el-dropdown-item>
            </NuxtLink>
            <NuxtLink to="/login/">
              <el-dropdown-item class="clearfix">
                <p class="text-base">Đăng nhập</p>
              </el-dropdown-item>
            </NuxtLink>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </nav>
  <div class="lg:hidden block flex-col bg-white space-y-6 w-full pl-5 py-5 z-0" v-show="openNav" :class="openNav ? 'nav-slide-down-enter-active' : 'nav-slide-down-leave-active'">
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
  { name: "Trang chủ", link: "/" },
  { name: "Việc cần hỗ trợ", link: "/list-sp-seeker/" },
  { name: "Tình nguyện viên", link: "/list-volunteer" },
  { name: "Về chúng tôi", link: "/about" },
];
const activeLink = ref(null);

const searchKeyword = ref('')


function updateActiveLink(linkName) {
  activeLink.value = linkName;
}
const user = useSupabaseUser();
const client = useSupabaseClient();
const openNav = ref(false)
const userData = ref([]);
const router = useRouter();
const drawer = ref(false);
const openDetail = ref(false);
const signOut = ref(false)

import { useCartStore } from '~/store/index.ts';

function performSearch() {
  if (searchKeyword.value.trim() !== '') {
    router.push({ name: 'search-results', query: { keyword: searchKeyword.value } });
  }
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {

    if (searchKeyword.value.trim() !== '') {
      router.push({ name: 'search-results', query: { keyword: searchKeyword.value } });
    }
  }
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
    }
  } catch (error) {
    console.log(error)
  }
})



const { cartCount } = toRefs(useCartStore());


watchEffect(async () => {
  // Check if user is authenticated
  if (user.value && userData.value.id) {
    // Fetch total_profile from the get_count_profile_cart table
    const { data: cartData, error: cartError } = await client
        .from('get_count_profile_cart')
        .select('total_profile')
        .eq('id_user', userData.value.id)
        .single();

    if (cartError) {
      console.error('Error fetching total_profile:', cartError);
      cartCount.value = 0; // Set 0 in case of an error
    } else {
      const totalProfile = cartData ? cartData.total_profile : 0;
      console.log('Total Profile:', totalProfile);
      cartCount.value = totalProfile;
      cartCount.value = useCartStore().cartCount;
    }
  } else {
    cartCount.value = 0;
  }
}, [user, userData, cartCount]);

function openDetailCart() {
  openDetail.value = !openDetail.value
}
</script>

<style scoped>
.nav-slide-down-enter-active {
  animation: navSlideDown 1s ease; /* Adjust duration as needed */
}

.nav-slide-down-leave-active {
  animation: navSlideUp 1s ease;
}

@keyframes navSlideDown {
  from {
    opacity: 0;
    transform: translateY(-100%); /* Slide down from the top */
  }
  to {
    opacity: 0.8;
    transform: translateY(0);
  }
}

@keyframes navSlideUp {
  from {
    opacity: 1;
    transform: translateY(0); /* Slide down from the top */
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
}
.active {
  color: #3498db; /* or any other color you want for active links */
}
</style>

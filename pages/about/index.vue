<template>
  <div class="relative min-h-screen lg:mx-32 mx-5 sm:pt-24">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
      ><a href="/">Trang chủ</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/about' }">Về chúng tôi</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="relative pt-12 bg-blue-50 rounded-lg">
      <div class="items-center flex flex-wrap">
        <div class="w-full md:w-4/12 ml-auto mr-auto px-4">
          <img alt="..." class="max-w-full rounded-lg shadow-lg" src="/banner_3.png">
        </div>
        <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
          <div class="md:pr-12 mt-5">
            <h3 class="text-2xl font-semibold">Hỗ trợ người già neo đơn</h3>
            <p class="mt-4 text-md leading-relaxed text-blueGray-500">
              Hệ thống quản lý hoạt động thiện nguyện hỗ trợ người già neo đơn là một cầu nối giữa tình nguyện viên và các cụ già neo đơn. Mọi thông tin trên hệ thống đều minh bạch và rõ ràng giúp cho người dùng có thể đưa ra các quyết định kết nối yêu cầu hỗ trợ tốt hơn. Hệ thống hỗ trợ trao đổi giữa "người trao" và người nhận" dễ dàng hơn. Đồng thời, chúng tôi cũng đưa ra các gợi ý cần thiết để bạn có thể kết nối với những người dùng mới.
            </p>
            <ul class="list-none mt-6">
              <li class="py-2">
                <div class="flex items-center">
                  <div>
                    <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"><i class="fas fa-fingerprint"></i></span>
                  </div>
                  <div>
                    <h4 class="text-blueGray-500">
                      Tìm kiếm nhanh
                    </h4>
                  </div>
                </div>
              </li>
              <li class="py-2">
                <div class="flex items-center">
                  <div>
                    <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"><i class="fab fa-html5"></i></span>
                  </div>
                  <div>
                    <h4 class="text-blueGray-500">Kết nối an toàn</h4>
                  </div>
                </div>
              </li>
              <li class="py-2">
                <div class="flex items-center">
                  <div>
                    <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"><i class="far fa-paper-plane"></i></span>
                  </div>
                  <div>
                    <h4 class="text-blueGray-500">Hoàn toàn miễn phí</h4>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer class="relative  pt-8 pb-6 mt-8">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap items-center md:justify-between justify-center">
            <div class="w-full md:w-6/12 px-4 mx-auto text-center">
            </div>
          </div>
        </div>
      </footer>
    </section>

  </div>
</template>

<script setup lang="ts">
</script>

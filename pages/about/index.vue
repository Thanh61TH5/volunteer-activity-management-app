<template>
  <div class="relative min-h-screen lg:mx-32 mx-5 sm:pt-24">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
      ><a href="/">Trang chủ</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/about' }">Về chúng tôi</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="grid grid-cols-1 xl:grid-cols-4 xl:gap-4 sm:grid-cols-2 gap-2">
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

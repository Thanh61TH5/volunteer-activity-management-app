<script setup lang="ts">

import RequestDataTable from "~/components/table/request-data-table.vue";
</script>

<template>
  <div class="relative min-h-screen lg:mx-32 sm:mt-32">
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
          ><a href="/">Trang chủ</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/sp-seeker/request'}">Yêu cầu tham gia thiện nguyện</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    <request-data-table/>
  </div>
</template>

<style scoped>

</style>

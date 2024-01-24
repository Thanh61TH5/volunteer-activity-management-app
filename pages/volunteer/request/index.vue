<script setup lang="ts">


import RequestDataVolunteerTable from "~/components/table/request-data-volunteer-table.vue";
</script>

<template>
  <div class="relative min-h-screen lg:mx-32 sm:mt-32">
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
          ><a href="/">Trang chủ</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/volunteer/request'}">Tin tham gia thiện nguyện</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    <request-data-volunteer-table/>
  </div>
</template>

<style scoped>

</style>

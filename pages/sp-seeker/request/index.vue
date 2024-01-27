<script setup lang="ts">

import RequestDataTable from "~/components/table/request-data-table.vue";
const keywords = ['tình nguyện', 'thiện nguyện', 'người già', 'người già neo đơn'];

const head = () => ({
  title: 'Hệ thống quản lý hoạt động thiện nguyện hỗ trợ người già neo đơn',
  meta: [
    {
      hid: 'title',
      name: 'title',
      content: 'Hỗ trợ người già neo đơn',
    },
    {
      hid: 'description',
      name: 'description',
      content: 'Hệ thống quản lý hoạt động thiện nguyện hỗ trợ người già neo đơn',
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: keywords.join(', '),
    },
  ],
});
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

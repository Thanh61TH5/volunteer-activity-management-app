<script setup lang="ts">
const isOpen = ref(false);
function addProfile() {
  isOpen.value = true
}
</script>

<template>
  <form-add-profile v-if="isOpen"/>
  <div v-else class="flex justify-center items-center sm:mt-32">
    <div class=" flex flex-col items-center p-10 bg-white space-y-3  rounded-lg ">
      <p>Bạn chưa có hồ sơ. Bạn có muốn tạo hồ sơ không?</p>
      <button class="bg-green-500 py-2 px-5 rounded-lg hover:opacity-80 duration-200 ease-in-out text-white" @click="addProfile">Tạo hồ sơ</button>
    </div>
  </div>
</template>

<style scoped>

</style>

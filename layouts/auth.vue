<template>

  <div  element-loading-background="rgba(122, 122, 122, 0.3)" v-loading="loading" class="relative sm:grid place-items-center min-h-screen bg-auth">
    <slot class=""/>
    <div class="w-full h-20"></div>
    <Footer class="absolute bottom-5"/>
  </div>
</template>

<style scoped>
.bg-auth {
  background: rgb(255,255,255);
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 0%, rgba(163,206,255,1) 100%);
}
.example-showcase .el-loading-mask {
  z-index: 1;
}

</style>

<script setup lang="ts">
import { useLoadingStore } from '~/store';

const loadingStore = useLoadingStore();
const loading = computed(() => loadingStore.isLoading);
</script>


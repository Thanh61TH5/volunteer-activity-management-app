<template>
  <div class="relative min-h-screen">
   <NuxtPage/>
  </div>
</template>

<style>
span {
  display: block;
  margin: 10px 0;
}

button, input {
  display: block;
}
</style>
<script setup>



definePageMeta({
  middleware:"no-auth"
});
</script>

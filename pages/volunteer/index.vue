<template>
  <div class="relative min-h-screen lg:mx-32 p-5 sm:pt-24">
    <h1>hi</h1>
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
  middleware:"auth"
});
</script>
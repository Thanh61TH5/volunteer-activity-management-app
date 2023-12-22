<template>
  <div class="relative min-h-screen lg:mx-32 mx-5 sm:pt-24">
    <card-volunteer class="pb-10"/>
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
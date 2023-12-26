<template>
    <div class="relative min-h-screen lg:mx-32 p-5 sm:pt-24">
      <carousel/>
      <card-sp class="py-10"/>
      <card-top-volunteer class="pb-10"/>
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

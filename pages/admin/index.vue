<template>
<NuxtPage/>
</template>
<script setup>
definePageMeta({
  layout:"sidebar-admin",
  middleware:"auth"
})
const user = useSupabaseUser()
const client = useSupabaseClient()
</script>
<style scoped>

</style>


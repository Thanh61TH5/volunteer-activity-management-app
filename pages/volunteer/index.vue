<script setup lang="ts">

const supabase = useSupabaseClient()
async function signOut() {

  const { error } = await supabase.auth.signOut()
}
</script>

<template>
<h1>Hello Volunteer</h1>
  <button @click="signOut">Thoát</button>
</template>

<style scoped>

</style>
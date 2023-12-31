<script setup>
const client = useSupabaseClient();
const spSeekerData = ref([]);

onMounted(async () => {
  const { data, error } = await client.from('support_seeker_profile').select();
  if (error) {
    console.error(error);
  } else{
    spSeekerData.value = data;
  }
});
</script>

<template>
  <div>

  </div>
</template>

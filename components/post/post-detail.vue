<script setup lang="ts">
const props = defineProps(['id']);
const supabase = useSupabaseClient();
const volunteerData = ref({});


onMounted(async () => {
  try {
    const { data } = await supabase
        .from('volunteer_profile')
        .select('*')
        .eq('id', props.id)
        .single();

    volunteerData.value = data;
    console.log(volunteerData.value)
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle the error, show a message, etc.
  }
});
</script>

<template>
  <div class="grid sm:grid-cols-2 grid-1 gap-4">
    <div class="flex-col">
      <div class="border border-gray-100 shadow-md rounded-lg bg-white">
        <label class="font-bold text-gray-600" for="name_job">Tên công việc: </label>
        <p class="font-medium text-gray-600"> {{volunteerData.support_job_name}}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Add any necessary scoped styles */
</style>

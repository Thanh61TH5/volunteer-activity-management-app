<template>
  <div class="relative min-h-screen lg:mx-32 mx-5 sm:pt-24 mt-10">
    <post-detail :id="volunteerData.id"/>
  </div>
</template>

<script setup>

const supabase = useSupabaseClient();
const route = useRoute();
const postId = route.params.id;
console.log("Post ID:", postId);
const volunteerData = ref({});

onMounted(async () => {
  const { data } = await supabase.from('volunteer_profile').select('*').eq('id', postId).single();
  volunteerData.value = data;
});

</script>
y
<template>
  <div class="relative min-h-screen lg:mx-32 sm:mt-32">
    <component :is="displayComponent" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware:"auth"
})
import VolunteerP from "~/components/form/volunteer-prfofile.vue";
import AddProfile from "~/components/card/add-profile.vue";
const user = useSupabaseUser()
const client = useSupabaseClient()
const userData = ref([])
const profileData = ref([])

onMounted(async () => {
  try {
    if (user.value) {
      const {data, error} = await client
          .from('accounts')
          .select('*')
          .eq('email', user.value.email)
          .single();

      userData.value = data;
      if (userData.value) {
        getIdProfile();
      }
    }
  } catch (error) {
    console.log(error)
  }
})

async function getIdProfile() {
  try {
    if (user.value && userData.value) {
      const {data, error} = await client
          .from('profiles')
          .select('*')
          .eq('id_user', userData.value.id)
          .single();

      profileData.value = data;
    }
  } catch (error) {
    console.log(error)
  }
}

const displayComponent = computed(() => {
  if (profileData.value && profileData.value.id) {
    return VolunteerP;
  } else {
    return AddProfile;
  }
});
</script>

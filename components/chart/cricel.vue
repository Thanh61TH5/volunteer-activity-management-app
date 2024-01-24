<template>
  <div>
    <canvas ref="pieChart"></canvas>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto';
const client = useSupabaseClient();
const totalUsersVolunteer = ref(0);
const totalUsersSupport = ref(0);

async function fetchTotalUsers() {
  const { data: volunteerData, error: volunteerError, count: volunteerCount } = await client
      .from('accounts')
      .select('*', { count: 'exact' })
      .eq('status', 'TRUE')
      .eq('role', 'Tình nguyện viên');

  const { data: supportData, error: supportError, count: supportCount } = await client
      .from('accounts')
      .select('*', { count: 'exact' })
      .eq('status', 'TRUE')
      .eq('role', 'Người cần hỗ trợ');

  if (volunteerError) {
    console.error(volunteerError);
    return;
  }

  if (supportError) {
    console.error(supportError);
    return;
  }

  if (volunteerCount) {
    totalUsersVolunteer.value = volunteerCount;
  }

  if (supportCount) {
    totalUsersSupport.value = supportCount;
  }
}

const pieChart = ref(null);

const updateChart = () => {
  const ctx = pieChart.value.getContext('2d');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Người cần hỗ trợ', 'Tình nguyện viên'],
      datasets: [
        {
          data: [totalUsersSupport.value, totalUsersVolunteer.value],
          backgroundColor: ['#FFB6C1','#87CEFA',],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

onMounted(async () => {
  await fetchTotalUsers();
  updateChart();
});
watch([totalUsersVolunteer, totalUsersSupport], updateChart);

</script>

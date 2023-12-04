<template>
  <div>
    <canvas ref="lineChart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const client = useSupabaseClient();
const dataByMonth = ref([]);
const currentYear = new Date().getFullYear(); // Get the current year

async function fetchUserDataByMonth() {
  // Tạo một mảng chứa số lượng người dùng cho từng tháng trong năm
  const userDataByMonth = new Array(12).fill(0);

  // Truy vấn cơ sở dữ liệu để lấy dữ liệu theo tháng
  const { data, error } = await client
      .from('accounts')
      .select('create_at')
      .eq('status', 'TRUE')
      .gte('create_at', `${currentYear}-01-01`)
      .lte('create_at', `${currentYear}-12-31`);

  if (error) {
    console.error(error);
    return;
  }

  // Đếm số lượng người dùng cho từng tháng
  data.forEach((user) => {
    const createAt = new Date(user.create_at);
    const month = createAt.getMonth();
    userDataByMonth[month]++;
  });

  dataByMonth.value = userDataByMonth;
}

const lineChart = ref(null);

const updateChart = () => {
  const ctx = lineChart.value.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
        'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
        'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
      ],
      datasets: [
        {
          label: `Số lượng người dùng năm ${currentYear}`,
          data: dataByMonth.value,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
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
  await fetchUserDataByMonth();
  updateChart();
});
</script>

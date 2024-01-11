// composable/useCities.js
import { ref, onMounted } from 'vue';

export default function useCities() {
    const cities = ref([]);

    onMounted(async () => {
        try {
            const response = await fetch('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1');
            const data = await response.json();
            cities.value = data; // Assuming the data is an array of cities
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

    return { cities };
}

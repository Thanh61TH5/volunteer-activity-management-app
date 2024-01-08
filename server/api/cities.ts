// cities.ts
import { defineAsyncComponent } from 'vue';
import data from './cities.json';

// @ts-ignore
export default defineAsyncComponent(() => {
    return {
        data,
    };
});

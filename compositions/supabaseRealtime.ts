// ~/compositions/supabaseRealtime.ts
import { RealtimeChannel } from '@supabase/realtime-js';
import {ref, onMounted, onUnmounted} from 'vue';

export function useRealtimeAccounts() {
    const client = useSupabaseClient();
    const accounts = ref([]);
    let realtimeChannel: RealtimeChannel;

    const refreshAccounts = async () => {
        const { data } = await client.from('accounts').select('name');
        // @ts-ignore
        accounts.value = data;
    };

    onMounted(() => {
        realtimeChannel = client.channel('public:accounts').on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'accounts' },
            refreshAccounts
        );

        realtimeChannel.subscribe();
    });

    onUnmounted(() => {
        client.removeChannel(realtimeChannel);
    });

    return { accounts, refreshAccounts };
}

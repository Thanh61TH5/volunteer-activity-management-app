export const useLoadingStore = defineStore('loading', {
    state: () => ({
        isLoading: false,
    }),
    actions: {
        setLoading(loading: boolean) {
            this.isLoading = loading;
        },
    },
});


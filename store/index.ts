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


export const useOpenForm = defineStore('form', {
    state: () => ({
        isOpen: false,
    }),
    actions: {
        setOpen(open: boolean) {
            this.isOpen = open;
        },
    },
});

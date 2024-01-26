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

// @ts-ignore
export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        cartCount: 0,
    }),
    actions: {
        incrementCartCount() {
            this.cartCount += 1;
        },
        reduceCartCount() {
            this.cartCount -= 1;
        },
    },
});



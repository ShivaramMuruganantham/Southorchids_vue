import { defineStore } from "pinia";

export const useStore = defineStore('Orders', {

    state: () => ({
        count : 0,
        orders : [],
        api_url: 'http://localhost:8000/api',
    }),

    actions: {
        StoreItems(items) {
            this.orders = items;
        }
    }
});
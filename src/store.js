import { defineStore } from "pinia";

export const useStore = defineStore('Orders', {

    state: () => ({
        count : 0,
        orders : [],
    }),

    actions: {
        StoreItems(items) {
            this.orders = items;
        }
    }
});
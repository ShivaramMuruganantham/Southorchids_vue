<template>
    <div class="max-w-[600px] h-full p-10 overflow-y-scroll">
        <div v-for="items in cartItems" :key="items.id" class="flex justify-between p-2 mb-2 border-black">
            <div class="flex items-center gap-5">
                <div>
                    <img :src="items.product.product_image" alt="" class="h-32 border">
                </div>
                <div>
                    <p class="pt-1 text-lg font-medium">{{ items.product.name }} ({{ items.product.quantity }} {{ items.product.quantity > 20 ? 'ML' : 'Kg' }})</p>
                    <p class="pb-2 text-sm">{{ items.product.brand }}</p>
                    <div class="flex items-center px-5 my-2 text-2xl border gap-7 rounded-xl w-fit">
                        <button @click="ItemRemove(items.product_id)" class="text-3xl font-medium">-</button>
                        <p class="text-xl">{{ items.quantity }}</p>
                        <button @click="ItemAdd(items.product_id)"  class="font-medium">+</button>
                    </div>
                </div>
            </div>
            <div class="pr-5">
                <div class="py-2">
                    <p class="text-2xl font-bold text-end"><span>&#8377;</span>{{ items.total_price }}</p>
                    <p class="font-normal line-through text-end"><span>&#8377;</span>{{ items.total_mrp_price }}</p>
                </div>
                <div class="pt-1">
                    <button @click="deleteCart(items.product_id)" class="px-3 py-0.5 border rounded shadow">
                        <i class="text-2xl text-red-600 icon ion-ios-trash"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="flex justify-center py-5">
            <button @click="PlaceOrder()" class="px-3 py-0.5 text-xl border bg-[#f8a32e] rounded text-white font-medium">Check Out</button>
        </div>
    </div>
</template>

<script>
import { useStore } from '@/store';

export default {
    name: 'Cart',
    data() {
        return {
            cartItems: [],
        }
    },

    methods: {
        getCartItems(){
            const token = localStorage.getItem('api_token');
            
            fetch("http://127.0.0.1:8000/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let datas = data.data;
                this.cartItems = this.groupCartItems(datas);
            })
        },
        
        groupCartItems(data) {
            const grouped = {};

            data.forEach((item) => {
                const { product_id, quantity, product } = item;
                
                if(!grouped[product_id]) {
                    grouped[product_id] = {
                        product: product,
                        quantity: 0,
                        total_price: 0,
                        total_mrp_price: 0,
                    };
                }
                
                grouped[product_id].quantity += quantity; 
                grouped[product_id].total_price += quantity * product.price;
                grouped[product_id].total_mrp_price += quantity * product.mrp_price;
            });

            return Object.keys(grouped).map((key) => ({
                product_id: key,
                ...grouped[key],
            }));
        },

        ItemRemove(pid) {
            const product = this.cartItems.find(p => p.product_id === pid);
            if(product && product.quantity > 0){
                product.quantity--;
                
                product.total_price = product.quantity * product.product.price;
                product.total_mrp_price = product.quantity * product.product.mrp_price;
            }
        },
        
        ItemAdd(pid) {
            const product = this.cartItems.find(p => p.product_id === pid);
            if(product){
                product.quantity++;
                
                product.total_price = product.quantity * product.product.price;
                product.total_mrp_price = product.quantity * product.product.mrp_price;
            }
        },

        deleteCart(pid) {
            const token = localStorage.getItem("api_token");
            
            fetch(`http://127.0.0.1:8000/api/cart/remove/${pid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                if(data.message){
                    this.cartItems = this.cartItems.filter(item => item.product_id !== pid);
                }
                else {
                    console.log(data.error);
                }
            })
        },

        PlaceOrder() {
            if(this.cartItems.length > 0) {
                const store = useStore();
                store.StoreItems(this.cartItems);
                this.$router.push({name: 'order'});
            }
            else {
                alert('Cart Is empty')
            }
        },
        
        
    },

    mounted() {
        document.addEventListener('DOMContentLoaded', this.getCartItems);
    },
}
</script>
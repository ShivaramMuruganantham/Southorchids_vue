<template>
    <div class="max-w-[600px] h-full p-10 overflow-y-scroll max-sm:w-full max-sm:p-5" v-if="cartItems.length > 0">
        <div v-for="items in cartItems" :key="items.id" class="flex justify-between p-2 mb-2 border border-black">
            <div class="flex items-center gap-5">
                <div>
                    <img src="/public/images/product/honeyOwn.jpg" alt="hi" class="h-32 border max-sm:h-24 max-sm:w-full">
                </div>
                <div>
                    <p class="pt-1 text-lg font-medium max-sm:text-xs">{{ items.product.name }} ({{ items.product.quantity }} {{ items.product.quantity > 20 ? 'ML' : 'Kg' }})</p>
                    <p class="pb-2 text-sm max-sm:text-xs">{{ items.product.brand }}</p>
                    <div class="flex items-center px-5 my-2 text-2xl border gap-7 rounded-xl w-fit max-sm:gap-5 max-sm:px-2">
                        <button @click="ItemRemove(items.product_id)" class="text-3xl font-medium max-sm:text-xl">-</button>
                        <p class="text-xl max-sm:text-lg">{{ items.quantity }}</p>
                        <button @click="ItemAdd(items.product_id)"  class="font-medium max-sm:text-xl">+</button>
                    </div>
                </div>
            </div>
            <div class="pr-5">
                <div class="py-2">
                    <p class="text-2xl font-bold text-end max-sm:text-lg"><span>&#8377;</span>{{ items.total_price }}</p>
                    <p class="font-normal line-through text-end max-sm:text-xs"><span>&#8377;</span>{{ items.total_mrp_price }}</p>
                </div>
                <div class="pt-1">
                    <button @click="deleteCart(items.product_id)" class="px-3 py-0.5 border rounded shadow">
                        <i class="text-2xl text-red-600 icon ion-ios-trash max-sm:text-xl"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="flex justify-center py-5">
            <button @click="PlaceOrder()" class="px-3 py-0.5 text-xl border bg-[#f8a32e] rounded text-white font-medium">Check Out</button>
        </div>
    </div>
    <div v-else class="flex items-center justify-center h-64">
        <div v-if="loginUser" class="flex flex-col items-center justify-center gap-y-3 h-full">
            <p class=""><i class="icon ion-md-cart text-5xl "></i></p>
            <p class="w-3/4 text-center">Your Cart is empty, choose a product to add to your Cart</p>
            <p class="text-white cursor-pointer border px-4 py-1 bg-yellow-500 mt-4" @click="$router.push({name: 'products'})">Product</p>
        </div>
        <div v-else class="flex flex-col items-center justify-center gap-y-3 h-full">
            <p class="text-red-600"><i class="icon ion-ios-alert text-5xl"></i></p>
            <p class="w-3/4 text-center">Please Login to view your Cart</p>
            <p class="mt-4"><a class="text-white cursor-pointer border px-4 py-1 bg-yellow-500" @click="$router.push({name: 'login'})">Login</a></p>
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

    computed: {
        loginUser() {
            return localStorage.getItem('api_token') != null;
        },
    },

    methods: {
        cartCount() {
            this.$emit('CartCount', this.cartItems.length); // Emit the cart count to the parent
        },

        getCartItems(){
            const token = localStorage.getItem('api_token');
            
            fetch("http://127.0.0.1:8000/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                let datas = data.data;
                this.cartItems = this.groupCartItems(datas);
                this.cartCount();
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
                    this.cartCount();
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
        this.getCartItems(); // Fetch cart items on component mount
    },

    beforeRouteEnter(to, from, next) {
        next(vm => vm.getCartItems()); // Fetch cart items before route entry
    },

    beforeRouteUpdate(to, from, next) {
        this.getCartItems(); // Fetch cart items when the route is updated
        next();
    },
}
</script>
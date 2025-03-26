<template>
    <div>
        <Navbar></Navbar>
        <div class="bg-yellow-600 h-[500px] flex justify-center items-center ">
            <p class="text-white w-[70%] max-sm:w-full text-center max-sm:p-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, esse alias temporibus, perspiciatis obcaecati veniam sit facere, tenetur corporis voluptatem nisi suscipit optio assumenda beatae quia exercitationem ad quo unde? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore obcaecati animi consequuntur tenetur quaerat veniam expedita facere officia, iste ex esse earum repudiandae! Rerum, quam nobis necessitatibus facere facilis similique.</p>
        </div>

        <div class="px-5 ">
            <div class="flex flex-wrap gap-10 p-5 max-sm:p-0 max-sm:py-5 max-sm:gap-3 max-sm:justify-center">
                <div class="relative  rounded-xl h-[550px] max-sm:h-full max-sm:w-40" v-for="product in products" :key="product.id">
                    <div class="h-56 rounded-t-xl min-w-full max-sm:h-full">
                        <!-- <img :src="product.product_image" :alt="product.name" v-if="product.product_image" class="w-full h-full rounded-t-xl max-sm:w-full max-sm:h-32"> -->
                        <img src="/public/images/product/20272-9-honey-jar.png" :alt="product.name" v-if="product.product_image" class="w-full h-full rounded-t-xl max-sm:w-full max-sm:h-32">
                    </div>
                    <div class="p-3 text-center max-sm:p-3 max-sm:h-[270px]">
                        <p class="pt-2 font-bold text-md max-sm:text-xs max-sm:py-1">{{product.name}} ({{ product.quantity }} {{ product.quantity > 20 ? 'ML' : 'Kg' }})</p>
                        <p class="py-2 font-semibold max-sm:text-xs max-sm:py-1">{{product.brand}}</p>
                        <!-- <p class="w-56 py-2 text-[13px] my-1 max-sm:text-xs max-sm:w-full max-sm:py-1">{{product.description}}</p> -->
                        <p class="w-60 py-2 text-[13px] my-1 max-sm:text-xs max-sm:w-full max-sm:py-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, tempora.</p>
                        
                        <div class="">
                            <div class="flex justify-center items-baseline gap-3 py-3 max-sm:py-1 max-sm:block max-sm:items-center">
                                <p class="text-sm font-light max-sm:text-xs">MRP: <span class="line-through">{{product.mrp_price}}</span></p>
                                <p class="text-sm  max-sm:text-xs"> Our price : <span class="font-bold text-md">{{product.price}}</span> Rs</p>
                            </div>
                            <!-- <div class="flex items-center px-5 my-2 text-2xl border gap-7 rounded-xl w-fit max-sm:gap-5 max-sm:justify-center max-sm:mx-auto">
                                <button @click="ItemRemove(product.id)" class="text-3xl font-medium max-sm:text-xl">-</button>
                                <p class="text-xl max-sm:text-lg">{{ product.cart_quantity }}</p>
                                <button @click="ItemAdd(product.id)"  class="font-medium max-sm:text-xl">+</button>
                            </div> -->
                            <div class="py-2 text-center max-sm:text-center">
                                <button class="px-8 py-2 text-center bg-yellow-400 border rounded-full max-sm:px-2 max-sm:py-1 max-sm:rounded" @click="$router.push({name: 'product_details', params: {id: product.id}})">View Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<!-- AddCart(product.id, product.cart_quantity) -->
<script>
import { useStore } from '@/store';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import router from '@/router';

export default {
    name: 'products',
    components: { Navbar, Footer },
    data() {
        return {
            products : []
        }
    },

    methods: {
        ItemRemove(pid){
            const product = this.products.find(p => p.id === pid);
            if(product && product.cart_quantity > 0) {
                product.cart_quantity--;
            }
        },
        
        ItemAdd(pid){
            const product = this.products.find(p => p.id === pid);
            if(product) {
                product.cart_quantity++;
            }
        },

        AddCart(productId, quantity) {
            const store = useStore();
            const token = localStorage.getItem('api_token');

            if(quantity <= 0){
                alert('Please add at least one quantity to add the cart.');
                return;
            }


            if(!token){
                alert("Please login to add items in the cart.");
                return;
            }

            fetch(`${store.api_url}/cart/add`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`,
                },
                body: JSON.stringify({
                    product_id : productId,
                    quantity : quantity,
                }),
            })
            .then(response => response.json())  // Make sure to parse the response
            .then(data => {
                if (!data.success) { // Check if the response contains success or error message
                    alert(data.message || "Failed to add item to cart");
                    return;
                }
                alert("Product added to the cart successfully!");
                console.log(data);
            })
            .catch(error => {
                console.error("Error adding product to cart:", error);
            });
        },

    },
    
    created() {
        const store = useStore();
        fetch(`${store.api_url}/products`)
        .then(resp => resp.json())
        .then(data => {
            this.products = data.map(product => ({
                ...product,
                cart_quantity: 0,
            }));
            console.log(this.products);
        })
        .catch((error)=>{
            console.error("Error fetching products:", error);
        });
    },
}
</script>
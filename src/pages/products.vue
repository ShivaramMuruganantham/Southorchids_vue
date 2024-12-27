<template>
    <div>
        <Navbar></Navbar>
        <div class="px-5">
            
            <div class="bg-yellow-600 h-[500px] flex justify-center items-center rounded-xl">
                <p class="text-white w-[70%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, esse alias temporibus, perspiciatis obcaecati veniam sit facere, tenetur corporis voluptatem nisi suscipit optio assumenda beatae quia exercitationem ad quo unde? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore obcaecati animi consequuntur tenetur quaerat veniam expedita facere officia, iste ex esse earum repudiandae! Rerum, quam nobis necessitatibus facere facilis similique.</p>
            </div>
            
            <div class="flex flex-wrap justify-between gap-5 p-5">
                <div class="relative border rounded-xl h-[550px]" v-for="product in products" :key="product.id">
                    <div class="h-56 px-5 border shadow rounded-t-xl min-w-56">
                        <img :src="product.product_image" alt="" class="w-full h-full">
                    </div>
                    <div class="p-3">
                        <p class="pt-2 font-bold text-md">{{product.name}} ({{ product.quantity }} {{ product.quantity > 20 ? 'ML' : 'Kg' }})</p>
                        <p class="py-2 font-semibold">{{product.brand}}</p>
                        <p class="w-56 py-2 text-[13px] my-1">{{product.description}}</p>
                        
                        <div class="absolute bottom-0">
                            <div class="flex items-baseline gap-3 py-3">
                                <p class="text-sm font-light">MRP: <span class="line-through">{{product.mrp_price}}</span></p>
                                <p class="text-sm"> Our price : <span class="font-bold text-md">{{product.price}}</span> Rs</p>
                            </div>
                            <div class="flex items-center px-5 my-2 text-2xl border gap-7 rounded-xl w-fit">
                                <button @click="ItemRemove(product.id)" class="text-3xl font-medium">-</button>
                                <p class="text-xl">{{ product.cart_quantity }}</p>
                                <button @click="ItemAdd(product.id)"  class="font-medium">+</button>
                            </div>
                            <div class="bottom-0 py-2">
                                <button class="px-8 py-2 text-center bg-yellow-400 border" @click="AddCart(product.id, product.cart_quantity)">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a href=""></a>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

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

            if(quantity <= 0){
                alert('Please add at least one quantity to add the cart.');
                return;
            }

            const token = localStorage.getItem('api_token');

            if(!token){
                alert("Please login to add items in the cart.");
                return;
            }

            fetch('http://127.0.0.1:8000/api/cart/add',{
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
        fetch("http://127.0.0.1:8000/api/products")
        .then(resp => resp.json())
        .then(data => {
            this.products = data.map(product => ({
                ...product,
                cart_quantity: 0,
            }));
        })
        .catch((error)=>{
            console.error("Error fetching products:", error);
        });
    },
}
</script>
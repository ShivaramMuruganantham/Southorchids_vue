<template>
  <div class="p-7">
    <div class="relative flex justify-between">
        <p class="text-3xl " @click="$router.go(-1)"><i class="icon ion-md-arrow-back"></i></p>
        <p class="text-2xl text-center underline">Order History</p>
        <p></p>
    </div>
    <div v-for="order in userOrder" :key="order.id" class="my-14">
        <div v-if="order.payment_status == 'Completed'" class="p-3 border w-[550px] m-10 max-md:w-full max-md:m-0 max-sm:w-full max-sm:m-0">
            <div class="flex items-center justify-between">
                <div>
                    <p class="max-sm:text-xs">Order ID : <span class="max-sm:font-bold">#{{ order.id }}</span></p>
                    <p class="max-sm:text-xs">Order Date : <span class="max-sm:font-bold">{{ order.order_date }}</span></p>
                </div>
                <div>
                    <p class="max-sm:text-xs">Payment : <span class="max-sm:font-bold">{{ order.payment_status }}</span> </p>
                    <p class="max-sm:text-xs">Delivery status : <span class="max-sm:font-bold">{{ order.delivery_status }}</span> </p>
                    
                </div>
            </div>
            <div v-for="item in order.items" :key="item.product_name" class="flex items-center p-4 my-4 border max-sm:p-2 max-sm:my-2">
                <img :src="item.product_image" alt="" class="h-16 ">
                <div class="flex items-center justify-between w-full p-2">
                    <div>
                        <p class="max-sm:text-sm">{{ item.product_name }}</p>
                        <p class="max-sm:text-sm">{{ item.product_brand }}</p>
                        <p class="max-sm:text-sm">x {{ item.quantity }}</p>
                    </div>
                    <div class="text-end">
                        <p class="max-sm:text-sm"><span>&#8377;</span> {{ (item.product_price * item.quantity).toFixed(2) }}</p>
                    </div>
                </div>
            </div>
            <div class="flex justify-between px-5 py-3 text-xl font-bold text-white bg-yellow-400 max-sm:text-lg">
                <p>Total price :</p>
                <p><span>&#8377;</span> {{ order.total_amount.toFixed(2) }}</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'OrderHistory',
    data() {
        return {
            userOrder : [],
        }
    },
    
    methods: {
        showOrderHistroy(){
            const token = localStorage.getItem('api_token');
            fetch("http://127.0.0.1:8000/api/order-history", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                this.userOrder = data.data;
            })
        },
    },

    computed: {

    },
    
    created() {
        this.showOrderHistroy();
    },
}
    
</script>

<style>

</style>
<template>
  <div class="p-7">
    <div class="relative flex justify-center">
        <p class="absolute text-3xl left-[50px]" @click="$router.go(-1)"><i class="icon ion-md-arrow-back"></i></p>
        <p class="text-2xl text-center underline">Order History</p>
    </div>
    <div v-for="order in userOrder" :key="order.id" class="p-3 border w-[550px] m-10">
        <div class="flex items-center justify-between">
            <div>
                <p>Order ID : <span>#{{ order.id }}</span></p>
                <p>Order Date : <span>{{ order.order_date }}</span></p>
            </div>
            <div>
                <p>Payment : <span>{{ order.payment_status }}</span> </p>
                <p>Delivery status : <span>{{ order.delivery_status }}</span> </p>
                
            </div>
        </div>
        <div v-for="item in order.items" :key="item.product_name" class="flex items-center p-4 my-4 border">
            <img :src="item.product_image" alt="" class="h-16">
            <div class="flex items-center justify-between w-full p-2">
                <div>
                    <p>{{ item.product_name }}</p>
                    <p>{{ item.product_brand }}</p>
                    <p>x {{ item.quantity }}</p>
                </div>
                <div class="text-end">
                    <p class=""><span>&#8377;</span> {{ (item.product_price * item.quantity).toFixed(2) }}</p>
                </div>
            </div>
        </div>
        <div class="flex justify-between px-5 py-3 text-xl font-bold text-white bg-yellow-400">
            <p>Total price :</p>
            <p><span>&#8377;</span> {{ order.total_amount.toFixed(2) }}</p>
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
                console.log(data);
                this.userOrder = data.data;
            })
        },
    },
    
    created() {
        this.showOrderHistroy();
    },
}
    
</script>

<style>

</style>
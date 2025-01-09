<template>
    <div>
        <div class="flex items-center justify-between px-16 border">
            <img src="../../public/Logo/logo so.png" alt="" class="h-24">
            <p class="text-3xl text-center ">Checkout Page</p>        
            <h1 class="text-2xl font-bold">{{userInfo.name}}</h1>
        </div>
        <div class="flex justify-around px-10 py-10">
            <div>
                <div class="p-10 px-20 overflow-y-scroll border border-l-2 rounded-lg shadow-lg border-l-green-400 max-h-[515px]">
                    <p class="text-2xl underline">Your Orders</p>
                    <div v-for="items in ordersItems" :key="items.id" class="flex gap-10 p-5 my-5 border rounded shadow-md">
                        <div>
                            <img :src="items.product.product_image" alt="" class="w-32 h-36">
                        </div>
                        <div class="flex items-center gap-24">
                            <div class="w-68">
                                <p class="py-1 text-xl font-medium">{{items.product.name}} ({{ items.product.quantity }})</p>
                                <p class="pb-2 text-lg ">{{ items.product.brand }}</p>
                                <p class="py-2 text-lg text-yellow-400">Quantity x <span>{{ items.quantity }}</span></p>
                            </div>
                            <div class="flex pr-4 w-36">
                                <div>
                                    <p class="py-2 text-xl font-medium text-green-400"><span class="text-sm">Our price</span> {{ items.product.price }}</p>
                                    <p class="py-2 text-gray-400 line-through"><span>MRP:</span> {{ items.product.mrp_price }}</p>
                                    <p class="py-2 text-lg font-medium text-yellow-400"><span class="text-sm">Total price</span> {{ items.total_price }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pt-5 my-4 border rounded-lg shadow-lg">
                    <p class="px-10 text-xl underline">Total Bill :</p>
                    <div>
                        <div class="flex items-center justify-between p-2 px-10 mt-2">
                            <p class="text-xl">Items </p>
                            <p class="text-xl font-medium text-green-400">{{ itemsprice }} <span>&#8377;</span></p>
                        </div>
                        <div class="flex items-center justify-between p-2 px-10">
                            <p class="text-xl">Discount price </p>
                            <p class="text-lg font-medium text-red-400">-{{ discountprice }} <span>&#8377;</span></p>
                        </div>
                        <div class="flex items-center justify-between p-2 px-10">
                            <p class="text-xl">Shipping Fee</p>
                            <p class="text-xl font-medium text-green-400">+{{ shipping_fee }} <span>&#8377;</span></p>
                        </div>
                        <div class="flex items-center justify-between p-2 px-10 mt-4 font-bold text-white bg-yellow-400 rounded-b-lg">
                            <p class="text-2xl">Total Bill Amount</p>
                            <p class="text-2xl font-medium">{{ total_bill }} <span>&#8377;</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <form action="" class="border shadow-lg ">
                    <p class="p-3 my-1 text-xl text-center underline">Your Info</p>
                    <div class="px-10 py-5">
                        <div class="p-1">
                            <p>Name :</p>
                            <input type="text" name="" id="" class="p-0.5 px-1.5 my-1 border w-48" v-model="userInfo.name">
                        </div>
                        <div class="p-1">
                            <p>Phone :</p>
                            <input type="number" name="" id="" class="p-0.5 px-1.5 my-1 border w-48" v-model="userInfo.phone_no">
                        </div>
                        <div class="p-1">
                            <p>Email :</p>
                            <input type="email" name="" id="" class="p-0.5 px-1.5 my-1 border w-48" v-model="userInfo.email">
                        </div>
                        <div class="p-1">
                            <p>Address :</p>
                            <textarea name="" class="p-0.5 px-1.5 my-1 border w-48" v-model="userInfo.address"></textarea>
                        </div>
                        <div class="p-1">
                            <p>City :</p>
                            <input type="text" name="" id="" class="p-0.5 px-1.5 my-1 border w-48" v-model="userInfo.city">
                        </div>
                        <div class="p-1">
                            <p>Pincode :</p>
                            <input type="number" name="" id="" class="p-0.5 px-1.5 my-1 border w-48" v-model="userInfo.pincode">
                        </div>
                        <div class="p-1 my-2 text-center">
                            <button class="border">Change Address</button>
                        </div>
                    </div>
                </form>
                <div class="p-2 mt-32 text-2xl text-center border rounded shadow-xl">
                    <button @click="initiatePayment()">Place Order</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from '@/store';
import router from '@/router';

export default {
    name: 'order page',
    data() {
        return {
            userInfo : [],
            shipping_fee: 60,
        }
    },
    methods: {
        GetUserData() {
            const token = localStorage.getItem("api_token");
            
            fetch("http://127.0.0.1:8000/api/user-info", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                this.userInfo = data;
                // console.log(this.userInfo);
            })
        },
        
        initiatePayment() {
            const token = localStorage.getItem("api_token");
            const orderItems = this.ordersItems.map(item => ({
                product_id : item.product_id,
                quantity : item.quantity,
            }));
            
            const amount = this.total_bill * 100; // Convert to paise (Razorpay uses smallest currency unit)
            
            fetch("http://127.0.0.1:8000/api/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ 
                        amount, 
                        items: orderItems,

                    }),
                })
                .then((response) => response.json())
                .then((order) => {
                    // Razorpay options
                    console.log("Order Created:", order.order_items); // Debug log
                    console.log("Razorpay Order ID:", order.razorpay_order_id);
                    console.log("Backend Order ID:", order.order_id);
                    
                    const options = {
                        key: "rzp_test_iykvKQhyb4LTCM", // Replace with your Razorpay key ID
                        amount: order.amount,
                        currency: "INR",
                        name: "Southorchids", // Replace with your business name
                        description: "Test Transaction",
                        image: "https://example.com/your_logo",
                        order_id: order.razorpay_order_id, // Razorpay order ID
                        handler: (response) => {
                            // Handle payment success
                            console.log("Payment Successful Response:", response);
                            this.handlePaymentSuccess(order.order_id, response);
                        },
                        prefill: {
                            name: this.userInfo.name,
                            email: this.userInfo.email,
                            contact: this.userInfo.phone_no,
                        },
                        notes: {
                            address: this.userInfo.address,
                        },
                        theme: {
                            color: "#3399cc",
                        },
                    };

                    const rzp1 = new Razorpay(options);

                    // Handle payment failure
                    rzp1.on("payment.failed", (response) => {
                        this.handlePaymentFailure(order.order.id, response);
                    });

                    rzp1.open();
                });
        },
        
        handlePaymentSuccess(orderId, paymentResponse) {
            const token = localStorage.getItem("api_token");

            fetch("http://127.0.0.1:8000/api/payment-success", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    razorpay_payment_id: paymentResponse.razorpay_payment_id,
                    razorpay_order_id: paymentResponse.razorpay_order_id,
                    razorpay_signature: paymentResponse.razorpay_signature,
                    order_id: orderId,
                    phone_no: this.userInfo.phone_no,
                    items: this.ordersItems.map(item => ({
                        product_id : item.product_id,
                        quantity : item.quantity,
                    })),
                }),
            })
                .then(response => response.json())
                .then(data => {
                    alert("Payment successful!");
                    this.$router.push({name: "products"});
                })
                .catch(error => console.error("Error handling payment success:", error));
        },

        handlePaymentFailure(orderId, errorResponse) {
            const token = localStorage.getItem("api_token");

            fetch("http://127.0.0.1:8000/api/payment-failure", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    order_id: orderId,
                    razorpay_payment_id: errorResponse.error.metadata.payment_id,
                    amount: this.total_bill,
                    phone_no: this.userInfo.phone_no,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    alert("Payment failed!");
                    console.log("Payment Failure Data:", data);
                })
                .catch(error => console.error("Error handling payment failure:", error));
        },
    },
    
    computed: {
        ordersItems(){
            const store = useStore();
            return store.orders;
        }, 
        
        itemsprice() {
            return this.ordersItems.reduce((sum, item) => {
                return sum + item.product.price * item.quantity;
            }, 0);
        },

        discountprice() {
            return this.ordersItems.reduce((sum, item) => {
                return sum + (item.product.mrp_price - item.product.price) * item.quantity;
            }, 0);
        },
        total_bill() {
            return this.itemsprice + this.shipping_fee;
        },
    },

    created() {
        this.GetUserData();
    },
    
}
</script>

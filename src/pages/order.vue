<template>
    <div class="flex items-center justify-between p-4 px-16 border shadow max-sm:px-8">
        <a @click="$router.go(-1)" class="text-3xl"><i class="icon ion-md-arrow-back"></i></a>
        <h1 class="text-2xl font-bold max-sm:text-lg">{{userInfo.name}}</h1>
    </div>
    <div class="p-5 max-sm:p-2">
        <p class="text-2xl text-center font-medium max-sm:py-3">Checkout Page</p>        
        <div class="p-5 max-sm:p-2">
            <div class="border p-5 my-2 shadow-md max-sm:p-2">
                <p class="px-3 text-2xl underline max-sm:text-xl">Orders :</p>
                <div v-for="items in ordersItems" :key="items.id" class="flex gap-3 w-full border-b-2 p-4 pt-5 max-sm:p-1 max-sm:pt-3 max-sm:gap-1">
                    <img src="/public/images/product/ChocolateOwn.jpg" alt="" class="h-24 border max-sm:h-20 max-sm:w-20">
                    <div class="flex justify-between w-full items-center">
                        <div>
                            <p class="font-medium max-sm:text-xs">{{ items.product.name }} <span>({{ items.product.quantity }})</span></p>
                            <p class="text-sm font-medium max-sm:text-xs">{{ items.product.brand }}</p>
                            <p class="w-56 text-xs max-sm:w-20">{{items.product.description}}</p>
                        </div>
                        <p class="max-sm:text-xs"><span class="text-red-400 mr-1 max-sm:mr-0">&#8377; {{ items.product.price }}</span> <span class="line-through text-gray-500"> &#8377;{{ items.product.mrp_price }}</span></p>
                        <p class="items-center max-sm:text-xs"><i class="icon ion-md-close"></i> {{ items.quantity }}</p>
                        <p class="text-lg font-medium max-sm:text-sm">{{ items.total_price }}</p>
                    </div>
                </div>
            </div>
            <!-- Customer Details show div -->
            <div class="border p-5 my-4 shadow-md max-sm:p-2">
                <p class="text-2xl px-3 underline max-sm:text-xl">Address :</p>
                <div class="flex justify-between items-center p-3">
                    <div class="">
                        <p class="text-lg font-medium py-1 max-sm:text-md">{{ userInfo.name }}</p>
                        <p class="py-1 text-lg max-sm:text-sm">{{ userInfo.phone_no }}</p>
                        <p class="py-1 text-lg max-sm:text-sm">{{ userInfo.address }} {{ userInfo.city }} - {{ userInfo.pincode }}</p>
                    </div>
                    <div class="mr-5 max-sm:mr-0">
                        <button @click="showPopup = true" class="text-xl text-blue-500 underline p-2 max-sm:text-sm">Change address</button>
                    </div>
                </div>
            </div>
            <!-- Change Address Popup show here -->
            <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white p-6 rounded-lg shadow-lg w-96 max-sm:w-full">
                    <h2 class="text-xl font-bold mb-4">Change Address</h2>
                    <form @submit.prevent="updateAddress">
                        <div class="mb-4">
                            <label for="address" class="block font-medium">Address</label>
                            <textarea id="address" v-model="address" class="w-full p-2 border rounded" rows="3" required></textarea>
                        </div>
                        <div class="mb-4">
                            <label for="city" class="block font-medium">City</label>
                            <input type="text" id="city" v-model="city"  class="w-full p-2 border rounded" required/>
                        </div>
                        <div class="mb-4">
                            <label for="pincode" class="block font-medium">Pincode</label>
                            <input type="text" id="pincode" v-model="pincode" class="w-full p-2 border rounded" required />
                        </div>
                        <div class="flex justify-end gap-4">
                            <button type="button" @click="showPopup = false" class="px-4 py-2 bg-gray-200 text-gray-700 rounded" >
                                Cancel
                            </button>
                            <button type="submit" @click="updateAddress" class="px-4 py-2 bg-blue-500 text-white rounded" >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- total bill showing div -->
            <div class="border p-5 my-4 shadow-md max-sm:p-5 max-sm:my-2">
                <p class="text-2xl px-3 underline max-sm:text-xl">Bill :</p>
                <div class="p-3">
                    <div class="flex items-center justify-between py-1">
                        <p class="text-lg max-sm:text-md">Items </p>
                        <p class="text-lg font-medium text-green-400 max-sm:text-md">{{ itemsprice }} <span>&#8377;</span></p>
                    </div>
                    <div class="flex items-center justify-between py-1">
                        <p class="text-lg max-sm:text-md">Discount price </p>
                        <p class="text-lg font-medium text-red-400 max-sm:text-md">- {{ discountprice }} <span>&#8377;</span></p>
                    </div>
                    <div class="flex items-center justify-between py-1">
                        <p class="text-lg max-sm:text-md">Shipping Fee</p>
                        <p class="text-lg font-medium text-green-400 max-sm:text-md">+{{ shipping_fee }} <span>&#8377;</span></p>
                    </div>
                    <div class="flex items-center justify-between px-2 mt-4 text-black bg-green-300">
                        <p class="text-xl max-sm:text-md">Total Amount</p>
                        <p class="text-2xl max-sm:text-xl">{{ total_bill }} <span>&#8377;</span></p>
                    </div>
                </div>
                <div class="text-center mt-4 max-sm:mt-2">
                    <button @click="initiatePayment()" class="px-4 py-2 text-xl bg-yellow-400 text-white font-medium rounded max-sm:text-md max-sm:px-3 max-sm:py-1">Place Order</button>
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
            showPopup: false,
            address: '',
            city: '',
            pincode: '',
        }
    },
    methods: {
        GetUserData() {
            const store = useStore();
            const token = localStorage.getItem("api_token");
            
            fetch(`${store.api_url}/user-info`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                this.userInfo = data;
            })
        },
        updateAddress() {
            const store = useStore();
            const token = localStorage.getItem("api_token");
            fetch(`${store.api_url}/edit-address`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    address: this.address,
                    city: this.city,
                    pincode: this.pincode,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.showPopup = false;
            })
            .catch(error => console.error(error));
        },
        
        initiatePayment() {
            const store = useStore();
            const token = localStorage.getItem("api_token");
            const orderItems = this.ordersItems.map(item => ({
                product_id : item.product_id,
                quantity : item.quantity,
            }));
            
            const amount = this.total_bill * 100; // Convert to paise (Razorpay uses smallest currency unit)
            
            fetch(`${store.api_url}/create-order`, {
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
            const store = useStore();
            const token = localStorage.getItem("api_token");

            fetch(`${store.api_url}/payment-success`, {
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
            const store = useStore();
            const token = localStorage.getItem("api_token");

            fetch(`${store.api_url}/payment-failure`, {
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

    mounted() {
        this.GetUserData();
    },
    
}
</script>

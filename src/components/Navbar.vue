<template>
    <div class="">
        <div class="fixed inset-x-0 z-10 flex justify-between p-1 bg-white border px-14" :class="isTop ? 'bg-transparent' : 'bg-white'">
            <div>
                <img src="../../public/Logo/logo so.png" alt="Southorchids" class="w-20 h-20">
            </div>
            <div class="flex items-center gap-10 cursor-pointer">
                <p @click="$router.push({name: 'home'})" class="hover:font-bold">Home</p>
                <p @click="$router.push({name: 'about'})" class="hover:font-bold">About Us</p>
                <p @click="$router.push({name: 'products'})" class="hover:font-bold">Shop</p>
                <p @click="$router.push({name: 'contact'})" class="hover:font-bold">Contact</p>
                <p @click="showCart" class="hover:font-bold"><i class="text-xl icon ion-md-cart"></i> cart</p>
                <div class="relative">
                    <button v-if="!isLoggedIn" @click="$router.push({name: 'login'})" class="px-4 py-1 font-bold text-white bg-black border rounded">SignUp</button>
                    <button v-else>
                        <span class="px-4 py-1 font-bold text-white bg-black border rounded " @click="showMenu">{{ name }} <i class="icon ion-md-arrow-dropdown"></i></span>
                    </button>
                    <div v-if="isClick == true" class="absolute top-[54px] -left-3 border w-32 shadow z-10 bg-white cursor-pointer">
                        <p class="p-2 hover:bg-gray-200">Edit Profile</p>
                        <p class="p-2 hover:bg-gray-200" @click="$router.push({name: 'order_history'})">Your Orders</p>
                        <p class="p-2 hover:bg-gray-200" @click="logOut">Log Out</p>
                    </div>
                </div>
            </div>
        </div>
        <div ref="cart_div" :class="[
            'fixed top-0 h-full w-[550px] bg-white shadow transition duration-600',
            isCartVisible ? 'right-0' : '-right-[550px]']" class="z-10 border">
            <p @click="showCart" class="px-5 py-1 text-2xl"><i class="icon ion-md-close"></i></p>
            <Cart class=""></Cart>
        </div>
    </div>
</template>

<script>
import LoggedIn from '@/mixins/LoggedIn';
import Cart from '@/components/Cart.vue';

export default {
    name: 'Navbar',
    components: { Cart },
    mixins: [LoggedIn],
    data() {
        return {
            isTop: true,
            isClick : false,
            isCartVisible: false,
        }
    },

    methods: { 
        showCart() {
            this.isCartVisible = !this.isCartVisible;
        },
        
        showMenu() {
            this.isClick = !this.isClick;
        },
        
        handleScroll() {
            console.log('ScrollY:', window.scrollY);
            this.isTop = window.scrollY === 0;
            console.log('isTop:', this.isTop);
        },
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },

    beforeMount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
}
</script>
<style scoped>
.cart {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
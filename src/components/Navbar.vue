<template>
    <div class="">
        <div class="fixed inset-x-0 z-20 flex justify-between items-center p-1 bg-white border px-14 max-md:px-5 max-sm:px-5" ref="navbarStyle" :class="isTop ? 'bg-transparent' : 'bg-white'">
            <div>
                <img src="../../public/Logo/logo so.png" alt="Southorchids" class="w-20 h-20 max-md:w-16 max-md:h-[72px] max-sm:w-16 max-sm:h-16">
            </div>
            <div class="flex items-center gap-10 cursor-pointer max-md:gap-5 max-md:text-sm max-sm:hidden">
                <p @click="$router.push({name: 'home'})" class="hover:font-bold">Home</p>
                <p @click="$router.push({name: 'about'})" class="hover:font-bold">About Us</p>
                <p @click="$router.push({name: 'products'})" class="hover:font-bold">Shop</p>
                <p @click="$router.push({name: 'contact'})" class="hover:font-bold">Contact</p>
                <p @click="showCart" class="relative hover:font-bold"><i class="text-xl icon ion-md-cart"></i> 
                    <span class="">cart</span> 
                    <span v-if="cartcount > 0" class="absolute top-0 -right-3 px-1 bg-red-400 rounded-full text-xs">{{ cartcount }}</span></p>
                <div class="relative">
                    <button v-if="!isLoggedIn" @click="$router.push({name: 'login'})" class="px-4 py-1 font-bold text-white bg-black border rounded">SignUp</button>
                    <button v-else>
                        <span class="px-4 py-1 font-bold text-white bg-black border rounded " @click="showDropdown">{{ name }} <i class="icon ion-md-arrow-dropdown"></i></span>
                    </button>
                    <div v-if="isClick == true" class="absolute top-[54px] -left-3 border w-32 shadow z-10 bg-white cursor-pointer">
                        <p class="p-2 hover:bg-gray-200" @click="$router.push({name: 'profile'})">Profile</p>
                        <p class="p-2 hover:bg-gray-200" @click="$router.push({name: 'order_history'})">Your Orders</p>
                        <p class="p-2 hover:bg-gray-200" @click="logOut">Log Out</p>
                    </div>
                </div>
            </div>

            <div class="max:sm:block sm:hidden cursor-pointer">
                <div class="max-sm:flex max-sm:items-center max-sm:gap-8">
                    <div>
                        <div class="relative">
                    <button v-if="!isLoggedIn" @click="$router.push({name: 'login'})" class="px-4 py-1 font-bold text-white bg-black border rounded max-md:text-xs max-md:px-2 max-md:py-1 max-md:font-medium">SignUp</button>
                    <button v-else>
                        <span class="px-4 py-1 font-bold text-white bg-black border rounded max-sm:text-xs max-sm:px-2 max-sm:py-1" @click="showDropdown">{{ name }} <i class="icon ion-md-arrow-dropdown"></i></span>
                    </button>
                    <div v-if="isClick == true" class="absolute top-[54px] -left-3 border w-32 shadow z-10 bg-white cursor-pointer max-sm:w-28 max-sm:top-12 max-sm:-left-5">
                        <p class="p-2 hover:bg-gray-200 max-sm:text-sm" @click="$router.push({name: 'profile'})">Edit Profile</p>
                        <p class="p-2 hover:bg-gray-200 max-sm:text-sm" @click="$router.push({name: 'order_history'})">Your Orders</p>
                        <p class="p-2 hover:bg-gray-200 max-sm:text-sm" @click="logOut">Log Out</p>
                    </div>
                </div>
                    </div>
                    <div>
                        <p @click="showCart" class="relative">
                            <i class="icon ion-md-cart text-xl"></i> 
                            <span v-if="cartcount > 0" class="absolute top-0 -right-3 px-1 bg-red-400 rounded-full text-xs">{{ cartcount }}</span>
                        </p>
                        
                    </div>
                    <p @click="showMenu()"><i class="icon ion-md-menu text-2xl"></i></p>
                    <div class="absolute top-0 -right-52 border w-52 h-screen shadow z-10 bg-white transation duration-500" ref="menuIcon">
                        <p @click="closeMenu()" class="px-5 py-2"><i class="icon ion-md-close text-2xl"></i></p>
                        <div class="text-center">
                            <p @click="$router.push({name: 'home'})" class="hover:font-bold py-2">Home</p>
                            <p @click="$router.push({name: 'about'})" class="hover:font-bold py-2">About Us</p>
                            <p @click="$router.push({name: 'products'})" class="hover:font-bold py-2">Shop</p>
                            <p @click="$router.push({name: 'contact'})" class="hover:font-bold py-2">Contact</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div ref="cart_div" :class="[
            'fixed top-0 h-full w-[550px] bg-white shadow .cart-transition max-sm:w-full',
            isCartVisible ? 'right-0' : '-right-[600px]']" class="z-30 border ">
            <p @click="showCart" class="px-5 py-1 text-2xl max-sm:text-3xl max-sm:pt-5 max-sm:px-7"><i class="icon ion-md-close"></i></p>
            <Cart @CartCount="reciveEmit"  class="transition duration-700"></Cart>
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
            isMenuClick: false,
            cartcount: 0,
        }
    },

    methods: { 
        reciveEmit(count) {
            this.cartcount = count; // Update the cart count
        },
        showMenu() {
            this.isMenuClick = !this.isMenuClick;
            if (this.isMenuClick == true) {
                this.$refs.menuIcon.style.right = "0px";
            }
        },
        closeMenu() {
            this.isMenuClick = !this.isMenuClick;
            if (this.isMenuClick == false) {
                this.$refs.menuIcon.style.right = "-208px";
            }
        },
        
        showCart() {
            this.isCartVisible = !this.isCartVisible;
            
        },
        
        showDropdown() {
            console.log('Dropdown clicked');
            this.isClick = !this.isClick;
        },
        
        handleScroll() {
            this.isTop = window.scrollY == 0;
        },
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },

    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
    },
}
</script>
<style >
.cart {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-transition {
    transition: right 0.3s ease-in-out;
}

.cart-transition {
    transition: right 0.7s ease-in-out;
}
</style>
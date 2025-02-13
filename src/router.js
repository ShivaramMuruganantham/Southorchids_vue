import { createRouter, createWebHashHistory } from "vue-router";

import login from "./pages/login.vue";
import register from "./pages/register.vue";
import home from "./pages/home.vue";
import products from "./pages/products.vue";
import showpage from "./pages/showpage.vue";
import about from "./pages/about.vue";
import contact from "./pages/contact.vue";
import cart from "./pages/order.vue";
import Order from "./pages/order.vue";
import profile from "./pages/editprofile.vue";
import OrderHistory from "./pages/orderHistory.vue";


export default createRouter ({
    history: createWebHashHistory(),

    routes: [
        {path: '/', name: 'home', component: home},
        {path: '/login', name: 'login', component: login}, 
        {path: '/register', name: 'register', component: register}, 
        {path: '/product', name: 'products', component: products},
        {path: '/about', name: 'about', component: about},
        {path: '/contact', name: 'contact', component: contact},
        {path: '/product/{id}', name: 'showpage', component: showpage},
        {path: '/cart', name: 'cart', component: cart},
        {path: '/order', name: 'order', component: Order},
        {path: '/profile', name: 'profile', component: profile},
        {path: '/order-history', name: 'order_history', component: OrderHistory},
    ],
    scrollBehavior() {
        return { top: 0 }
    }
})
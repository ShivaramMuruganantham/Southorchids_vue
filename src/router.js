import { createRouter, createWebHashHistory } from "vue-router";

import login from "./pages/login.vue";
import register from "./pages/register.vue";
import home from "./pages/home.vue";
import products from "./pages/products.vue";
import product_details from "./pages/showpage.vue";
import about from "./pages/about.vue";
import contact from "./pages/contact.vue";
import cart from "./pages/order.vue";
import Order from "./pages/order.vue";
import profile from "./pages/editprofile.vue";
import OrderHistory from "./pages/orderHistory.vue";


const router = createRouter ({
    history: createWebHashHistory(),

    routes: [
        {path: '/', name: 'home', component: home, meta: {title: 'Home - Southorchids'}},
        {path: '/login', name: 'login', component: login, meta: {title: 'Login - Southorchids'}}, 
        {path: '/register', name: 'register', component: register, meta: {title: 'Register - Southorchids'}}, 
        {path: '/product', name: 'products', component: products, meta: {title: 'Product - Southorchids'}},
        {path: '/about', name: 'about', component: about, meta: {title: 'About - Southorchids'}},
        {path: '/contact', name: 'contact', component: contact, meta: {title: 'Contact - Southorchids'}},
        {path: '/product/:id', name: 'product_details', component: product_details, meta: {title: 'Product - Southorchids'}},
        {path: '/cart', name: 'cart', component: cart, meta: {title: 'Cart - Southorchids'}},
        {path: '/order', name: 'order', component: Order, meta: {title: 'Order - Southorchids'}},
        {path: '/profile', name: 'profile', component: profile, meta: {title: 'Profile - Southorchids'}},
        {path: '/order-history', name: 'order_history', component: OrderHistory, meta: {title: 'Order History - Southorchids'}},
    ],
    scrollBehavior() {
        return { top: 0 }
    }
});

router.afterEach((to, from) => {
    document.title = to.meta.title;
});

export default router;
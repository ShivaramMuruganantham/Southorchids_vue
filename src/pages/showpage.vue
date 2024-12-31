<template>
    <div>
        <Navbar></Navbar>
        <div class="p-5 pt-[98px]">
            <div class="flex items-center justify-center gap-20 pt-10">
                <div class="">
                    <img src="/public/images/product/honeyOwn.jpg" alt="" class="rounded-xl h-96">
                </div>
                <div class="">
                    <p class="p-2 text-3xl font-medium">Product Name</p>
                    <p class="px-2 text-xl ">Brand Name</p>
                    <div class="flex items-center gap-3 px-2 py-5">
                        <p class="text-2xl font-bold"><span>&#8377;</span>110</p>
                        <p class="line-through">150 <span class="text-sm">MRP</span></p>
                    </div>
                    <p class="w-[600px] px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eum cum libero in excepturi ad a at ex, quod sequi repellat voluptatum doloremque eligendi ipsa, ea suscipit earum id nam.</p>
                    <button class="px-10 py-1.5 mt-7 text-white bg-black border rounded-lg">Add to Cart</button>
                </div>
            </div>
            
            <div class="grid grid-flow-col grid-rows-2 gap-5 p-5">
                <div class="border border-black w-72">
                    <div>
                        <img src="/public/images/product/badamOwn.webp" alt="" class="w-72 h-60">
                    </div>
                    <div class="p-1 w-60">
                        <p class="p-1 text-lg">Subheading</p>
                        <p class="p-1 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias mollitia ullam harum sed ratione earum laboriosam.</p>
                    </div>
                </div>
                <div class="border border-black w-72">
                    <div>
                        <img src="/public/images/product/badamOwn.webp" alt="" class="w-72 h-60">
                    </div>
                    <div class="p-1 w-60">
                        <p class="p-1 text-lg">Subheading</p>
                        <p class="p-1 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias mollitia ullam harum sed ratione earum laboriosam.</p>
                    </div>
                </div>
                <div class="border border-black w-72">
                    <div>
                        <img src="/public/images/product/badamOwn.webp" alt="" class="w-72 h-60">
                    </div>
                    <div class="p-1 w-60">
                        <p class="p-1 text-lg">Subheading</p>
                        <p class="p-1 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias mollitia ullam harum sed ratione earum laboriosam.</p>
                    </div>
                </div>
                <div class="border border-black w-72">
                    <div>
                        <img src="/public/images/product/badamOwn.webp" alt="" class="w-72 h-60">
                    </div>
                    <div class="p-1 w-60">
                        <p class="p-1 text-lg">Subheading</p>
                        <p class="p-1 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias mollitia ullam harum sed ratione earum laboriosam.</p>
                    </div>
                </div>
                <div class="border border-black w-72">
                    <div>
                        <img src="/public/images/product/badamOwn.webp" alt="" class="w-72 h-60">
                    </div>
                    <div class="p-1 w-60">
                        <p class="p-1 text-lg">Subheading</p>
                        <p class="p-1 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias mollitia ullam harum sed ratione earum laboriosam.</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
export default {
    name: 'showpage',
    components: { Navbar, Footer }
}
</script>

<style>

</style>
<template>
    <div>
        <Navbar></Navbar>
        
        <div class="pt-[98px] p-5">
            <p class="pt-10 text-3xl text-center">Get in touch</p>
            <div class="flex justify-around pt-24 pb-14">
                <div>
                    <div class="p-5 bg-gray-200 border rounded-xl">
                        <p class="text-2xl font-medium"><i class="text-3xl text-green-600 icon ion-md-pin"></i> Address</p>
                        <p class="p-2 pt-4 text-xl font-bold">Southorchids Agro Products Pvt Ltd.</p>
                        <p class="px-2 pt-2 text-lg text-gray-700">#47/2, Pilliyar Kovil street, Vittalapuram,</p>
                        <p class="px-2 pt-1 text-lg text-gray-700">Kalpakkam,</p>
                        <p class="px-2 pt-1 text-lg text-gray-700">Kanchipuram,</p>
                        <p class="px-2 pt-1 text-lg text-gray-700">Tamil Nadu, India</p>
                        <p class="px-2 pt-1 text-lg text-gray-700">PIN - 603102</p>
                    </div>
                    <div class="p-5">
                        <p class="text-2xl font-medium">Contacts</p>
                        <div class="flex items-center gap-3 py-5 font-semibold">
                            <p><i class="text-xl icon ion-ios-mail"></i></p>
                            <p class="text-lg">southorchids@gmail.com</p>
                        </div>
                        <div class="flex items-center gap-3 font-semibold">
                            <p><i class="text-xl icon ion-ios-call"></i></p>
                            <p class="text-lg "> +91 91760 89254</p>
                        </div>
                        <div class="flex gap-10 pt-5 text-4xl">
                            <p><i class="icon ion-logo-whatsapp"></i></p>
                            <p><i class="icon ion-logo-instagram"></i></p>
                            <p><i class="icon ion-logo-facebook"></i></p>
                        </div>
                    </div>
                </div>
                
                <div>
                    <p class="pb-3 text-xl font-medium">Southorchids on the Map</p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d751.8540127427202!2d80.1292699694813!3d12.520568708446117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDMxJzE0LjAiTiA4MMKwMDcnNDcuNyJF!5e1!3m2!1sen!2sin!4v1735209008027!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';

export default {
    name: 'contact',
    components: { Navbar, Footer },
}
</script>

<style>

</style>
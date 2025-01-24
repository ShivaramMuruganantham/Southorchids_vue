<template>
    <div>
        <Navbar></Navbar>
        
        <div class="pt-[98px] p-5 max-md:p-2 max-md:pt-20 max-sm:p-2 max-sm:pt-20">
            <p class="pt-10 text-3xl text-center max-sm:text-3xl">Get in touch</p>
            <div class="flex justify-around pt-24 pb-14 max-md:pt-10 max-md:pb-10 max-sm:flex-col max-sm:mx-3 max-sm:pt-10">
                <div class="">
                    <div class="p-5 bg-gray-200 border rounded-xl max-md:p-2">
                        <p class="text-2xl font-medium max-md:text-xl max-sm:text-xl"><i class="text-3xl text-green-600 icon ion-md-pin max-md:text-2xl max-sm:text-2xl"></i> Address</p>
                        <p class="p-2 pt-4 text-xl font-bold max-md:text-lg max-sm:text-lg">Southorchids Agro Products Pvt Ltd.</p>
                        <p class="px-2 pt-2 text-lg text-gray-700 max-md:text-sm max-sm:text-sm">#47/2, Pilliyar Kovil street, Vittalapuram,</p>
                        <p class="px-2 pt-1 text-lg text-gray-700 max-md:text-sm max-sm:text-sm">Kalpakkam,</p>
                        <p class="px-2 pt-1 text-lg text-gray-700 max-md:text-sm max-sm:text-sm">Kanchipuram,</p>
                        <p class="px-2 pt-1 text-lg text-gray-700 max-md:text-sm max-sm:text-sm">Tamil Nadu, India</p>
                        <p class="px-2 pt-1 text-lg text-gray-700 max-md:text-sm max-sm:text-sm">PIN - 603102</p>
                    </div>
                    <div class="p-5 mt-5 max-md:p-2 max-sm:p-2">
                        <p class="text-2xl font-bold max-md:text-xl">Contacts</p>
                        <div class="flex items-center gap-3 py-5 font-semibold max-md:gap-2 max-md:py-3">
                            <p><i class="text-2xl icon ion-ios-mail"></i></p>
                            <p class="text-lg text-blue-700 max-md:text-md">southorchids@gmail.com</p>
                        </div>
                        <div class="flex items-center gap-3 font-semibold">
                            <p><i class="text-2xl icon ion-ios-call"></i></p>
                            <p class="text-lg max-md:text-md"> +91 91760 89254</p>
                        </div>
                        <div class="flex gap-10 pt-5 text-4xl">
                            <p><a href=""><i class="icon ion-logo-whatsapp"></i></a></p>
                            <p><a href=""><i class="icon ion-logo-instagram"></i></a></p>
                            <p><a href=""><i class="icon ion-logo-facebook"></i></a></p>
                        </div>
                    </div>
                </div>
                
                <div class="max-sm:mt-5 max-sm:pt-5">
                    <p class="pb-3 text-xl font-medium max-sm:pb-7">Southorchids on the Map</p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d751.8540127427202!2d80.1292699694813!3d12.520568708446117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDMxJzE0LjAiTiA4MMKwMDcnNDcuNyJF!5e1!3m2!1sen!2sin!4v1735209008027!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="max-md:w-[350px] max-md:h-96 max-sm:w-full"></iframe>
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
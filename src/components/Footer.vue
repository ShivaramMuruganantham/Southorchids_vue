<template>
    <div class="">
        <div class="flex justify-around p-10 text-white bg-black max-md:grid max-md:grid-cols-2 max-md:gap-5 max-md:p-5 max-md:py-7 max-sm:flex max-sm:flex-col max-sm:p-5">
            <div class="">
                <h1 class="text-2xl font-medium max-md:text-2xl">About Us</h1>
                <p class="pt-3 text-sm leading-6 text-gray-400 w-52 max-sm:w-full max-sm:text-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nam vero cumque nostrum! Fugit doloribus, reiciendis voluptatibus nihil cum ipsa sunt necessitatibus voluptatum cumque hic</p>
            </div>
            <div class="max-sm:mt-5 max-sm:pt-3">
                <h1 class="text-2xl font-medium max-md:text-2xl max-sm:pb-1">Policies</h1>
                <p class="pt-3 hover:underline max-md:w-full"><a href="">Privacy Policy</a></p>
                <p class="pt-2 hover:underline"><a href="">Refund Policy</a></p>
                <p class="pt-2 hover:underline"><a href="">Shipping Policy</a></p>
                <p class="pt-2 hover:underline"><a href="">Terms of Service</a></p>
            </div>
            <div class="max-sm:mt-5 max-sm:pt-5 max-sm:text-md">
                <h1 class="text-2xl font-medium ">Contact</h1>
                <p class="pt-3">Phone no: <span class="hover:underline">+91 91760 89254</span></p>
                <p class="pt-2">Email: <a href="mailto: writetosouthorchids@gmail.com" class="text-blue-500 hover:underline">writetosouthorchids@gmail.com</a></p>
                <p class="w-64 pt-2 text-gray-300">Address: No: 47/2, Pilliyar Kovil street, Vittalapuram, Kalpakkam, Kanchipuram - 603102, Tamil Nadu, India</p>
            </div>
            <div class="max-sm:mt-5 max-sm:pt-5">
                <h1 class="text-2xl font-medium">Social Media</h1>
                <div class="flex justify-around py-5 text-3xl max-md:justify-start max-md:gap-10 max-sm:gap-10 max-sm:justify-start">
                    <p class="cursor-pointer"><i class="icon ion-logo-whatsapp"></i></p>
                    <p class="cursor-pointer"><i class="icon ion-logo-instagram"></i></p>
                    <p class="cursor-pointer"><i class="icon ion-logo-facebook"></i></p>
                </div>
            </div>
        </div>
        <div class="bg-[#1b1a1ae5] text-white text-center p-2">
            <p class="text-sm text-[#f6f2f2b1] max-sm:text-xs"> &copy; 2024, Southorchids Powered By Shivaram</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "footer",
}
</script>

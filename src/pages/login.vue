<template>
    <div class="p-5">
        <div class="relative flex justify-between mx-10 max-sm:justify-between max-sm:mx-3 max-sm:items-center">
            <p class="text-3xl max-sm:text-2xl" @click="$router.go(-1)"><i class="icon ion-md-arrow-back"></i></p>
            <p class="text-4xl max-sm:text-2xl max-sm:font-bold">Log in</p>
            <p class="max-sm:w-5"></p>
        </div>
        <div class="max-sm:flex max-sm:justify-center max-sm:items-center max-sm:h-[700px]">
            <form action="" class="flex justify-center w-[500px] mx-auto border-2 border-l-yellow-400 shadow p-5 mt-10 max-sm:w-full ">
                <div class="py-5">
                    <div class="my-5 mb-2">
                        <p class="pt-1 text-xl">Email :</p>
                        <input type="email" name="email" v-model="login.email" class="w-64 p-1 border-b border-black outline-none"><br>
                    </div>
                    <div class="mt-3 mb-5">
                        <p class="pt-5 text-xl">Password :</p>
                        <input type="password" name="password" v-model="login.password" class="w-64 p-1 border-b border-black outline-none"><br>
                    </div>
                    <div class="flex justify-center py-5">
                        <button @click.prevent="comfirmLogin" :disabled="loading" class="px-5 py-1.5 bg-yellow-500 text-white font-bold shadow-lg rounded ">Login</button>
                    </div>
                    <div class="py-3 text-center">
                        <p>Don't you have a account yet ?</p>
                        <p class="text-blue-800 cursor-pointer hover:underline"><a @click="$router.push({name: 'register'})">Create a Account</a></p>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { useStore } from '@/store';
import ValidationForm from '@/mixins/forms/ValidationForm';
import LoggedIn from '@/mixins/LoggedIn';

export default {
    name: 'login',
    data() {
        return {
            loading: false,
            login: {
                email: '',
                password: '',
            }
        }
    },

    methods: {
        async comfirmLogin() {
            const store = useStore();
            
            if((this.login.email != '') && (this.login.password != '')) {
                this.loading = true;
                try {

                    const response = await fetch(`${store.api_url}/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: this.login.email,
                            password: this.login.password,
                        }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        alert(errorData.message || 'Login failed');
                        return;
                    }

                    const data = await response.json();
                    localStorage.setItem('api_token', data.user.api_token);
                    localStorage.setItem('name', data.user.name);
                    alert('Login successful');
                    this.$router.push({name: 'home'})
                    
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                }
                finally{
                    this.loading = false;
                }
            }
            else {
                alert('Please fill the required fields');
            }
        },
    },
}
</script>

<style>

</style>
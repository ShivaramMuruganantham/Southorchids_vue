<template>
    <div class="p-5">
        <div class="relative flex justify-center">
            <p class="absolute text-3xl left-96" @click="$router.go(-1)"><i class="icon ion-md-arrow-back"></i></p>
            <p class="text-4xl ">Log in</p>
        </div>
        <form action="" class="flex justify-center w-[500px] mx-auto border-2 border-l-yellow-400 shadow p-5 mt-10">
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
                    <button @click.prevent="comfirmLogin" :disabled="loading" class="border border-black px-5 py-1.5">Login</button>
                </div>
                <div class="py-3 text-center">
                    <p>Don't you have a account yet ?</p>
                    <p class="text-blue-800 cursor-pointer hover:underline"><a @click="$router.push({name: 'register'})">Create a Account</a></p>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
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
            
            if((this.login.email != '') && (this.login.password != '')) {
                console.log(this.login);
                this.loading = true;
                try {

                    const response = await fetch("http://127.0.0.1:8000/api/login", {
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
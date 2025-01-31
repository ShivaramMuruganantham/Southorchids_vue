<template>
  <div class="p-5">
        <div class="flex items-center justify-between pb-5 px-7">
            <p @click="$router.go(-1)"><i class="icon ion-md-arrow-back text-3xl"></i></p>
            <p class="font-bold text-3xl">Profile</p>
            <p></p>
        </div>
        <div class="flex items-center justify-center mb-5">
            <form action="" class="border py-5 px-10 shadow">
                <div class="py-2">
                    <p class="text-lg py-1">Name :</p>
                    <input type="text" name="" id="" :value="user.name" disabled class="p-1 w-72 border border-black outline-none">
                </div>
                <div class="py-2">
                    <p class="text-lg py-1">Email :</p>
                    <input type="text" name="" id="" :value="user.email" disabled class="p-1 w-72 border border-black outline-none">
                </div>
                <div class="py-2">
                    <p class="text-lg py-1">Phone Number :</p>
                    <input type="number" name="" id="" :value="user.phone_no" disabled class="p-1 w-72 border border-black outline-none">
                </div>
                <div class="py-2">
                    <p class="text-lg py-1">Address :</p>
                    <textarea rows="3" name="" id="" ref="address" :value="user.address"  class="p-1 w-72 border border-black outline-none"></textarea>
                </div>
                <div class="py-2">
                    <p class="text-lg py-1">City :</p>
                    <input type="text" name="" id="" ref="city" :value="user.city"  class="p-1 w-72 border border-black outline-none">
                </div>
                <div class="py-2">
                    <p class="text-lg py-1">Pincode :</p>
                    <input type="number" name="" id="" ref="pincode" :value="user.pincode"  class="p-1 w-72 border border-black outline-none">
                </div>
                <div class="pt-5 text-center">
                    <button class="px-4 py-0.5 bg-black text-white rounded text-center" @click="editProfile()">Update</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { useStore } from '@/store';

export default {
    data() {
        return {
            user: {}    
        }
    },

    methods: {
        async editProfile() {
            const store = useStore();

            const response = await fetch(`${store.api_url}/edit-address`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${localStorage.getItem('api_token')}
                    `},
                body: JSON.stringify({
                    address: this.$refs.address.value,
                    city: this.$refs.city.value,
                    pincode: this.$refs.pincode.value
                })
            })

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || 'Login failed');
                return;
            }

            const data = await response.json();
            alert(data.message);
        }
    },

    mounted() {
        const store = useStore();
        fetch(`${store.api_url}/user-info`, {
          headers: {'Authorization': `Bearer ${localStorage.getItem('api_token')}`}
          })
          .then(res => res.json())
          .then(data => this.user = data);  
    },
}
</script>

<style>

</style>
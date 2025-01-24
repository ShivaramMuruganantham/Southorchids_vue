<template>
    <div class="p-5 max-sm:p-5">
        <div class="relative flex justify-between mx-10 max-sm:justify-between  max-sm:mx-3 max-sm:items-center">
            <p class="text-3xl max-sm:text-2xl " @click="$router.go(-1)"><i class="icon ion-md-arrow-back"></i></p>
            <p class="text-4xl max-sm:text-2xl max-sm:font-bold">Sign up</p>
            <p class="max-sm:w-5"></p>
        </div>
        <div class="flex justify-center my-8 ">
            <form class="border-2 border-l-yellow-400 shadow rounded py-4 w-[60%] max-sm:w-full max-sm:p-8">
                <div class="flex justify-around max-sm:flex-col">
                    <div>
                        <p class="py-1 max-sm:text-lg">Name :</p>
                        <input type="text" v-model="form.name" name="name" @blur="NameValidation(form.name)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500 max-sm:w-full">
                        <p class="py-1 text-xs text-red-500 w-36 max-sm:text-sm max-sm:pb-1 max-sm:w-full">{{ msg.name }}</p>
                    </div>
                    <div>
                        <p class="py-1 max-sm:text-lg">Email :</p>
                        <input type="email" v-model="form.email" name="email" @blur="MailValidation(form.email)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500 max-sm:w-full">
                        <p class="py-1 text-xs text-red-500 w-36 max-sm:text-sm max-sm:pb-1 max-sm:w-full">{{ msg.email }}</p>
                    </div>
                </div>
                <div class="flex justify-around max-sm:flex-col">
                    <div>
                        <p class="py-1 max-sm:text-lg">Password :</p>
                        <input type="password" v-model="form.password" name="password" @blur="PasswordValidation(form.password)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500 max-sm:w-full">
                        <p class="py-1 text-xs text-red-500 w-36 max-sm:text-sm max-sm:pb-1 max-sm:w-full">{{ msg.password }}</p>
                    </div>
                    <div>
                        <p class="py-1 max-sm:text-lg">Confirm :</p>
                        <input type="password" v-model="form.confirm" name="confirm" @blur="ConfirmValidation(form.confirm)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500 max-sm:w-full">
                        <p class="py-1 text-xs text-red-500 w-36 max-sm:text-sm max-sm:pb-1 max-sm:w-full">{{ msg.confirm }}</p>
                    </div>
                </div>
                <div class="flex justify-around max-sm:flex-col">
                    <div>
                        <p class="py-1 max-sm:text-lg">Address :</p>
                        <textarea v-model="form.address" name="address" rows="3" @blur="AddressValidation(form.address)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500 max-sm:w-full"></textarea>
                        <p class="py-1 text-xs text-red-500 w-36 max-sm:text-sm max-sm:pb-1 max-sm:w-full">{{ msg.address }}</p>
                    </div>
                    <div>
                        <p class="py-1 max-sm:text-lg">Phone :</p>
                        <input type="number" v-model="form.phone" name="phone" @blur="PhoneValidation(form.phone)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500 max-sm:w-full">
                        <p class="py-1 text-xs text-red-500 w-36 max-sm:text-sm max-sm:pb-1 max-sm:w-full">{{ msg.phone }}</p>
                    </div>
                </div>
                <div class="flex justify-around max-sm:flex-col">
                    <div>
                        <p class="py-1 max-sm:text-lg">City :</p>
                        <input type="text" v-model="form.city" name="city" @blur="CityValidation(form.city)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500 max-sm:w-full">
                        <p class="py-1 text-xs text-red-500 w-36 max-sm:text-sm max-sm:pb-1 max-sm:w-full">{{ msg.city }}</p>
                    </div>
                    <div>
                        <p class="py-1 max-sm:text-lg">Pincode :</p>
                        <input type="number" v-model="form.pincode" name="pincode" @blur="PincodeValidation(form.pincode)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500 max-sm:w-full">
                        <p class="py-1 text-xs text-red-500 w-36 max-sm:text-sm max-sm:pb-1 max-sm:w-full">{{ msg.pincode }}</p>
                    </div>
                </div>
                <div class="flex justify-center py-5">
                    <button @click.prevent="SubmitForm()" class="bg-yellow-500 text-white font-medium shadow-lg rounded px-5 py-1.5 focus:border-2 focus:border-green-500 outline-none max-sm:text-lg max-sm:pb-1">Submit</button>
                </div>
                <p></p>
            </form>
        </div>
    </div>
</template>

<script>
import ValidationForm from '@/mixins/forms/ValidationForm';
import router from '@/router';

export default {
    name: 'register',
    mixins: [ ValidationForm ],
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                confirm: '',
                phone: '',
                address: '',
                city: '',
                pincode: '',
            },
        }
    },

    methods: {

        SubmitForm() {
            const NameValid = this.NameValidation(this.form.name);
            const EmailValid = this.MailValidation(this.form.email);
            const PasswordValid = this.PasswordValidation(this.form.password);
            const ConfirmValid = this.ConfirmValidation(this.form.confirm)
            const PhoneValid = this.PhoneValidation(this.form.phone);
            const AddressValid = this.AddressValidation(this.form.address);
            const CityValid = this.CityValidation(this.form.city);
            const PincodeValid = this.PincodeValidation(this.form.pincode);

            if(NameValid && EmailValid && PasswordValid && ConfirmValid && PhoneValid && AddressValid && CityValid && PincodeValid) {
                
                const formData = {
                    name : this.form.name,
                    email : this.form.email,
                    password : this.form.password,
                    phone_no : this.form.phone,
                    address : this.form.address,
                    city : this.form.city,
                    pincode : this.form.pincode,
                };
                
                fetch("http://localhost:8000/api/signup",{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify(formData),
                })
                .then(response => {
                    if(!response.ok){
                        return response.json().then(errorData => {
                            alert(errorData.message || 'Login failed')
                        });
                    }  
                    alert("Successfully Register!");
                    this.$router.push({name : 'login'});
                })
            }
            else {
                alert('Please fix the errors in the form.');
            }
        },
    },
}
</script>

<style>

</style>
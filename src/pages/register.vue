<template>
    <div class="p-5">
        <div class="relative flex justify-center">
            <p class="absolute text-3xl left-64" @click="$router.go(-1)"><i class="icon ion-md-arrow-back"></i></p>
            <p class="text-4xl ">Sign up</p>
        </div>
        <div class="flex justify-center my-8">
            <form class="border-2 border-l-yellow-400 shadow rounded py-4 w-[60%]">
                <div class="flex justify-around ">
                    <div>
                        <p class="py-1 text-sm">Name :</p>
                        <input type="text" v-model="form.name" name="name" @blur="NameValidation(form.name)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500">
                        <p class="py-1 text-xs text-red-500 w-36">{{ msg.name }}</p>
                    </div>
                    <div>
                        <p class="py-1">Email :</p>
                        <input type="email" v-model="form.email" name="email" @blur="MailValidation(form.email)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500">
                        <p class="py-1 text-xs text-red-500 w-36">{{ msg.email }}</p>
                    </div>
                </div>
                <div class="flex justify-around">
                    <div>
                        <p class="py-1">Password :</p>
                        <input type="password" v-model="form.password" name="password" @blur="PasswordValidation(form.password)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500">
                        <p class="py-1 text-xs text-red-500 w-36">{{ msg.password }}</p>
                    </div>
                    <div>
                        <p class="py-1">Confirm :</p>
                        <input type="password" v-model="form.confirm" name="confirm" @blur="ConfirmValidation(form.confirm)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500">
                        <p class="py-1 text-xs text-red-500 w-36">{{ msg.confirm }}</p>
                    </div>
                </div>
                <div class="flex justify-around">
                    <div>
                        <p class="py-1">Address :</p>
                        <textarea v-model="form.address" name="address" rows="3" @blur="AddressValidation(form.address)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500"></textarea>
                        <p class="py-1 text-xs text-red-500 w-36">{{ msg.address }}</p>
                    </div>
                    <div>
                        <p class="py-1">Phone :</p>
                        <input type="number" v-model="form.phone" name="phone" @blur="PhoneValidation(form.phone)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500">
                        <p class="py-1 text-xs text-red-500 w-36">{{ msg.phone }}</p>
                    </div>
                </div>
                <div class="flex justify-around">
                    <div>
                        <p class="py-1">City :</p>
                        <input type="text" v-model="form.city" name="city" @blur="CityValidation(form.city)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500">
                        <p class="py-1 text-xs text-red-500 w-36">{{ msg.city }}</p>
                    </div>
                    <div>
                        <p class="py-1">Pincode :</p>
                        <input type="number" v-model="form.pincode" name="pincode" @blur="PincodeValidation(form.pincode)" class="p-1 text-sm border border-black rounded outline-none focus:border-2 focus:border-green-500">
                        <p class="py-1 text-xs text-red-500 w-36">{{ msg.pincode }}</p>
                    </div>
                </div>
                <div class="flex justify-center py-5">
                    <button @click.prevent="SubmitForm()" class="border border-black rounded px-5 py-1.5 focus:border-2 focus:border-green-500 outline-none">Submit</button>
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
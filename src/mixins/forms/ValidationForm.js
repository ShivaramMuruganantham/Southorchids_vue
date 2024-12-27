export default {
    data() {
        return {
            msg: {
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
        NameValidation(name) {
            const number = /[0-9]/;
            const username = number.test(name);
            if(!username) {
                this.msg['name'] = "";
                return true;
            }
            else {
                this.msg['name'] = "Please enter a name";
                return false;
            }
        },

        MailValidation(email) {
            const mailvalidate = /^[a-zA-Z0-9._%+-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,}$/;
            const isValid = mailvalidate.test(email);
            if(isValid){
                this.msg['email'] = "";
                return true;
            }
            else{
                this.msg['email'] = "Please enter a valid Email";
                return false;
            }
        },

        PasswordValidation(password) {
            const symbol = /[^a-zA-Z0-9\s]/;
            const number = /[0-9]/;
            const capital = /[A-Z]/;

            if(password.length < 8) {
                this.msg['password'] = "Password must be atleast 8 Character";
                return false;
            }
            else if (!capital.test(password)) {
                this.msg['password'] = "Password must contain 1 Capital Letter";
                return false;
            }
            else if (!symbol.test(password)) {
                this.msg['password'] = "Password must contain 1 Symbol";
                return false;
            }
            else if (!number.test(password)) {
                this.msg['password'] = "Password must contain 1 Number";
                return false;
            }
            else {
                this.msg['password'] = "";
                return true;
            }
        },

        ConfirmValidation(confirm) {
            if(this.form.password == confirm){
                this.msg['confirm'] = "";
                return true;
            }
            else {
                this.msg['confirm'] = "Password doesn't match";
                return false;
            }
        },

        PhoneValidation(phone) {
            const phonePattern = /^[6-9]\d{9}$/;
            if(!phonePattern.test(phone)){
                this.msg['phone'] = "Please enter a valid phone number";
                return false;
            }
            else{
                this.msg['phone'] = "";
                return true;
            }
        },

        AddressValidation(address) {
            if(address == '') {
                this.msg['address'] = "This field is required";
                return false;
            }
            else {
                this.msg['address'] = "";
                return true;
            }
        },

        CityValidation(city) {
            if(city == '') {
                this.msg['city'] = "This field is required";
                return false;
            }
            else {
                this.msg['city'] = "";
                return true;
            }
        },

        PincodeValidation(pincode) {
            const pinPattern = /^[6]\d{5}$/;
            if(pinPattern.test(pincode)) {
                this.msg['pincode'] = "";
                return true;
            }
            else {
                this.msg['pincode'] = "Please enter a valid Pincode";
                return false;
            }
        },

    },
}
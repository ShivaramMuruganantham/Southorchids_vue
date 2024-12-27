export default{
    data() {
        return {
            name: '',
        }
    },

    methods: {
        logOut() {
            localStorage.removeItem('api_token');
            localStorage.removeItem('name'); 
            this.$router.push({name: 'home'});
        }
    },

    computed: {
        isLoggedIn() {
            this.name = localStorage.getItem('name');
            return !!localStorage.getItem('api_token');
        }
    }
}
<template>
<div class="page-wrapper">
        <div class="page-content--bge5">
            <div class="container">
                <div class="login-wrap">
                    <div class="login-content">
                        <div class="login-logo">
                            <router-link to="/"> <img src="/images/smartgym-logo.png" alt="CoolAdmin"></router-link>
                        </div>
                            <div class="login-form"> 
                                <form @submit.prevent="formSubmit" method="post">
                                    <div class="form-group">
                                        <div v-if="er" class="alert alert-danger w-100">
                                            {{ error_message}}
                                            <br/>
                                        </div>
                                        <error-list :errors="errors.email"></error-list>
                                        <label>Dirección de correo electronico</label>
                                        <input class="au-input au-input--full" type="email" v-model="email" placeholder="Email">
                                        <br/>
                                        <br/>
                                        <label>Contraseña nueva</label>
                                        <input class="au-input au-input--full" type="password" v-model="password" placeholder="Password">
                                        <br/>
                                        <br/>
                                        <error-list :errors="errors.password"></error-list>
                                        <label>Confirmar contraseña</label>
                                        <input class="au-input au-input--full" type="password" v-model="confirm" placeholder="Confirm password">
                                    </div>
                                    <button class="au-btn au-btn--block au-btn--green m-b-20" type="submit">Enviar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
import ErrorsList from './ErrorsList.vue'
export default {

    name: 'Password',
    props: ['token'],
    components: {
        'error-list': ErrorsList
    },
    data(){
        return{
            email: '',
            password: '',
            confirm: '',
            errors: [],
            er: false,
            error_message: ''
        };
    },
    methods: {
        formSubmit(){
            axios.post('/password/reset',{
                token: this.token,
                email: this.email,
                password: this.password,
                password_confirmation: this.confirm
            })
            .then(response => {
                localStorage.setItem('token', response.data.access_token);
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                this.$router.push('/login');
            })
            .catch(error => {
                if (!error.response.data.error) {
                    this.errors = (error.response.data)
                } else {
                    this.er = true
                    this.error_message = error.response.data.error
                }
                
            })
            this.errors = []
            this.er = false
            this.error_message = ''
    }
}
};
</script>
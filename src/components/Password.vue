<template>
    <div class="page-wrapper">
        <div class="page-content--bge5">
            <div class="container">
                <div class="login-wrap">
                    <div class="login-content">
                        <div   class="login-form"> 
                            <form @submit.prevent="formSubmit" method="post" action="/password/email">
                                <div class="form-group">
                                    <label>Le enviaremos una liga para poder restablecer su contraseña</label>
                                    <div v-if="estado" class="alert alert-success w-100">
                                        <span>Se ha enviado el correo</span>
                                        <br/>
                                    </div>
                                    <div v-if="er"  class="alert alert-danger w-100">
                                        <span>{{errors.error}}</span>
                                        <br/>
                                    </div>
                                    <input class="au-input au-input--full" type="email" v-model="email" placeholder="Correo electronico">
                                    <button v-if="!cargando" type="submit" class="au-btn au-btn--block au-btn--green m-b-20 w-50">Enviar</button>
                                    <button v-else disabled class="au-btn au-btn--block au-btn--info m-b-20 w-50">Actualizando...</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ErrorsList from './ErrorsList.vue';
export default {

    name: 'Password',
    props: {
        msg: String
    },
        components: {
        'error-list': ErrorsList
    },
    data(){
        return{
            email: '',
            cargando: false,
            error: false,
            errors: [],
            er: false,
            error_message: '',
            estado: false
        };
    },
    methods: {
        formSubmit(){
            this.cargando = true
            axios.post('/password/email',{
                email: this.email
            })
            .then(response => (
                this.estado= true,
                this.er = false,
                this.errors = [],
                this.cargando = false
                ))
            .catch(error => (
                this.cargando = false,
                this.er = true,
                this.errors = (error.response.data)
                ))
            this.email = ''
            this.errors = []
            this.er = false
            this.cargando = false
        }
    }
}

</script>

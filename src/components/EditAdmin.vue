<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h4>Editar información</h4></div>
                                        <div class="card-body">
                                            <form @submit.prevent="editInfo" method="post" action="https://smartgym.infornet.mx/api/gimnasio/login" class="ml-5 mr-5">
                                                <div class="form-group">
                                                    <error-list :errors="errors.nombre"></error-list>
                                                    <label class="control-label mb-1">Nombre del gimnasio</label>                   
                                                    <input name='nombre' id='nombre' class="form-control" type="text" pattern="[a-zA-Z0-9\s]+"
                                                    minlength="4" maxlength="20" v-model="usuario.nombre" placeholder='Editar nombre'
                                                    title="Solo letras, Tamaño minimo: 4. Tamaño maximo: 20">
                                                    <br/>
                                                </div>
                                                <div class="form-group">
                                                    <error-list :errors="errors.telefono"></error-list>
                                                    <label class="control-label mb-1">Telefono       </label>
                                                    <input name='telefono' id='telefono' class="form-control" type="text"
                                                    v-model="usuario.telefono" placeholder='Editar telefono'  pattern="[0-9]+"
                                                    title="Solo números">
                                                    <br/>
                                                </div>
                                                <div class="form-group">
                                                    <error-list :errors="errors.email"></error-list>
                                                    <label class="control-label mb-1">Correo electronico</label>
                                                    <input name='correo' id='correo' class="form-control" type="email"
                                                    v-model="usuario.email" placeholder='Editar correo' required>
                                                    <br/>
                                                </div>
                                                <br/>
                                                    <button v-if="!cargando" type="submit" class="au-btn au-btn--block au-btn--green m-b-20">Editar</button>
                                                    <button v-else disabled class="au-btn au-btn--block au-btn--info m-b-20">Actualizando...</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h4>Cambiar contraseña</h4></div>
                                        <div class="card-body">
                                            <form @submit.prevent="editPass" method="post" action="/password/update" class="ml-5 mr-5">
                                                    <div class="form-group">
                                                        <br/>
                                                        <div v-if="er" class="alert alert-danger w-100">
                                                            {{ error_message }}
                                                            <br/>
                                                        </div>
                                                        <label class="control-label mb-1">Contraseña actual</label>
                                                        <input class="form-control" type="password" v-model="current_password" placeholder="Password actual" required>
                                                        <br/>
                                                    </div>
                                                    <div class="form-group">
                                                        <br/>
                                                        <error-list :errors="errors.password"></error-list>
                                                        <label class="control-label mb-1">Contraseña nueva</label>
                                                        <input class="form-control" type="password" v-model="password" placeholder="Nuevo password">
                                                        <br/>
                                                    </div>
                                                    <div class="form-group">
                                                        <br/>
                                                        <label class="control-label mb-1">Confirmar cont.</label>
                                                        <input class="form-control" type="password" v-model="confirm" placeholder="Confirmar password">
                                                        <br/>
                                                    </div>
                                                    <br/>
                                                    <button v-if="!loading" type="submit" class="au-btn au-btn--block au-btn--green m-b-20">Cambiar</button>
                                                    <button v-else disabled class="au-btn au-btn--block au-btn--info m-b-20">Actualizando...</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import HeaderMobile from './HeaderMobile'
import MenuSidebar from './MenuSidebar'
import HeaderDesktop from './HeaderDesktop'
import ErrorsList from './ErrorsList.vue'
import axios from 'axios';
import store from '../store'
import { mapState, mapActions } from 'vuex';
import SweetAlert from 'sweetalert2'

export default {
    name: 'Edit-info',
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList
    },
    data(){
        return {
            usuario: {
                nombre: '',
                telefono: '',
                email: ''
            },
            errors: [],
            cargando: false,
            current_password: '',
            password: '',
            confirm: '',
            er: false,
            error_message: '',
            loading: false
        };
    },
    mounted(){
        this.obtenerDatos()
    },
    computed : {
        ...mapState([
            'perfil'
        ])
    },
    methods:{
        ...mapActions([
            'getToken',
            'getPerfil'
        ]),
        verifyToken(){
            this.getToken()
        },
        obtenerDatos(){
            store.dispatch('getPerfil')
            this.usuario = store.state.perfil
        },
        editInfo(){
            this.cargando = true;
            axios.post('/perfil',this.usuario)
            .then( response => {
                this.cargando = false;
                this.errors = [];
                let gimnasio = JSON.stringify(this.usuario);
                var infoGym = CryptoJs.AES.encrypt(gimnasio, 'hola mundo')
                localStorage.setItem('gimnasio', infoGym) 
                SweetAlert.fire(
                'Correcto',
                'Se ha editado la información exitosamente',
                'success')
            }).catch(error=>{
                this.errors = (error.response.data.errors)
            })
            this.cargando = false;
            this.errors = [];
        },
        editPass(){
            this.loading = true;
            axios.post('/password/update', {
                current_password: this.current_password,
                password: this.password,
                password_confirmation: this.confirm
            })
            .then(response => {
                this.loading = false;
                this.errors = [];
                this.hecho = true;
                this.password = '';
                this.confirm = '';
                this.current_password = '';
                SweetAlert.fire(
                'Correcto',
                'Se ha editado la contraseña exitosamente',
                'success')
            })
            .catch( error => {
                this.loading = false; 
                if (!error.response.data.errors.current_password) {
                    this.errors = (error.response.data.errors)
                    
                } else{
                    this.er = true
                    this.error_message = error.response.data.errors.current_password
                }
            })
            this.errors = [];
            this.er = false;
            this.error_message = '';
            this.loading = false;
        }
    }
}
;
</script>
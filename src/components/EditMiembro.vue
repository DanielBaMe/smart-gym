<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div>
                    <h1 class="text-center">¿Que desea hacer con la información de {{miembro.nombre}} ?</h1>
                </div>
                <div class="row justify-content-center">
                    <div class="col-lg-4 pt-3">
                            <router-link to="/" class="pb-5">
                            <i class="btn btn-primary glyphicon glyphicon-pencil">  Editar información personal</i></router-link>
                            <br/>
                            <router-link to="/" class="pb-5">
                            <i class="btn btn-primary glyphicon glyphicon-log-in">  Agregar planes o servicios</i></router-link>
                            <br/>
                            <router-link to="/" class="pb-5">
                            <i class="btn btn-primary glyphicon glyphicon-btc"> Visualizar plan de pago</i></router-link>
                            <br/>
                            <i @click="$router.go(-1)" class="btn btn-primary glyphicon glyphicon-arrow-left">  Atrás</i>
                    </div>
                    <div class="col-lg-4">
                        <label>Nombre</label>
                        <p>{{miembro.nombre}}</p>
                        <label>Apellidos</label>
                        <p>{{miembro.apellidos}}</p>
                        <label>Telefono</label>
                        <p>{{miembro.telefono}}</p>
                        <label>Servicios</label>
                        <p>{{miembro.servicios}}</p>
                        <label></label>
                    </div>
                </div>
            </div>
                <div class="d-flex justify-content-around">
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
import { mapState, mapActions } from 'vuex';


export default {
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList
    },
    data(){
        return {
            miembro: {
                nombre: '',
                apellidos: '',
                telefono: '',
                condicion_fisica: '',
                servicios: [],
                email: '',
                tel_emerg: '',
                fecha_nacimiento: ''
            },
            confirmacion: false,
            errors: []
        };
    },
    created(){
        this.verifyToken();
        this.obtenerDatos();
    },
    methods:{
        ...mapActions([
            'getToken'
        ]),
        verifyToken(){
            this.getToken()
        },
        obtenerDatos(){
            this.ide = this.$route.params.id;
            axios.get('/miembros/' + this.ide)
            .then((response) =>
            {  
                this.miembro = response.data;
                console.log(this.miembro)
            }).catch(function (error){
                console.log('Error: ' + error);
                this.er = true
            })
        },
        editMiembro(){
            axios.post('/miembros/' + this.ide, this.miembro)
            .then(response => {
                console.log(response)
                this.errors= []
                this.loading = false;
                Swal.fire({ 
                    title: 'Se ha editado el servicio exitosamente',
                    icon: 'success',
                    timer: 2000,
                    onClose: () => {
                        this.$router.push('/servicios');
                    }
                })   
            }).catch(error => {
                console.log(error.response)
                this.errors = (error.response.data.errors)
                this.loading = false;
            })
            this.errors=[];
            this.loading = false;
        }
    }
};
</script>
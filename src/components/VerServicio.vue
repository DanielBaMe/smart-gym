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
                            <div class="col-lg-3">
                                <button @click="$router.go(-1)" class="btn btn-primary btn-sm glyphicon glyphicon-arrow-left" title="Atrás">
                                </button>
                            </div>
                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h3>{{servicio.nombre}}</h3></div>
                                        <div class="card-body">
                                            <form @submit.prevent="formSubmit" method="post" class="ml-5 mr-5">
                                                    <div v-if="er" class="alert alert-danger w-100">
                                                        {{ error_message}}
                                                        <br/>
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.nombre"></error-list>
                                                        <label class="control-label mb-1">Nombre</label> 
                                                        <input name='nombre' id='nombre' class="form-control" type="text"
                                                        pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s]+" title="Solo números y letras."
                                                        v-model="servicio.nombre" minlength="4" maxlength="20"  :disabled="validated">
                                                        <br/>  
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.precio"></error-list>
                                                        <label class="control-label mb-1">Precio</label>  
                                                        <input name='precio' id='precio' class="form-control" type="number" step="0.50"
                                                        v-model="servicio.precio"  :disabled="validated"> 
                                                        <br/>
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.descripcion"></error-list>
                                                        <label class="control-label mb-1">Descripcion</label>    
                                                        <textarea v-model="servicio.descripcion" type="text" name='descripcion'
                                                        id='descripcion' class="form-control"
                                                        rows="5" cols="50" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s]+"  :disabled="validated"></textarea>
                                                        <br/>
                                                    </div>
                                                <br/>
                                                    <span v-if="validated" @click="validated = !validated" class="btn btn-success m-b-20 w-100">Habilitar edición</span>
                                                    <button v-else type="submit" class="btn btn-primary m-b-20 w-100">Editar</button>
                                                    <br/>
                                                    <br/>
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
import { mapState, mapActions } from 'vuex';
import SweetAlert from 'sweetalert2'

export default {
name: 'Servicios',
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList
    },
    data(){
        return{
            servicio:{
                nombre: '',
                precio: '',
                descripcion: '',
                id: '',
                id_gimnasio: '',
                updated_at: ''
            },
            errors: [],
            er: false,
            hecho: false,
            er: false,
            error_message: '',
            loading: false,
            ide:'',
            validated : true
        }
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
            axios.get('/servicios/' + this.ide)
            .then((response) =>
            {  
                this.servicio = response.data;
            }).catch(function (error){
                this.er = true
            })
        },
        formSubmit(){
            axios.put('/servicios/'+ this.ide, this.servicio)
            .then(response => {
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
                console.log(error)
                this.errors = (error.response.data.errors)
                this.loading = false;
            })
            this.errors=[];
            this.loading = false;
            }
    }

}

</script>
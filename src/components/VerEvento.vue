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
                            <br/>
                            <br/>
                            <br/>
                            <div class="col-lg-6" v-if="!loading">
                            <div class="card">
                                <div class="card-header">
                                    <h3>{{evento.nombre}}</h3></div>
                                    <div class="card-body">
                                        <div class="ml-5 mr-5">
                                                    {{ error_message}}
                                                    <br/>
                                                </div>
                                                <div class="form-group">
                                                    <error-list :errors="errors.nombre"></error-list>
                                                    <label class="control-label mb-1">Nombre</label> 
                                                    <input name='nombre' id='nombre' class="form-control" type="text"
                                                    pattern="[a-zA-Z0-9\s]+" title="Solo números y letras."
                                                    v-model="evento.nombre" minlength="4" maxlength="20"  :disabled="validated">
                                                    <br/>  
                                                </div>
                                                <div class="form-group">
                                                    <error-list :errors="errors.precio"></error-list>
                                                    <label class="control-label mb-1">Tipo</label>  
                                                    <input name='tipo' id='tipo' class="form-control" type="text"
                                                    v-model="evento.tipo"  :disabled="validated"> 
                                                    <br/>
                                                </div>
                                                <div class="form-group">
                                                    <error-list :errors="errors.precio"></error-list>
                                                    <label class="control-label mb-1">Descripción</label>  
                                                    <textarea name='tipo' id='tipo' class="form-control" type="text"
                                                    v-model="evento.descripcion"  :disabled="validated"></textarea>
                                                    <br/>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label mb-1">Fechas</label>
                                                    <br/>
                                                    <div class="row justift-center">
                                                        <div class="col">
                                                            <error-list :errors="errors.fecha_inicio"></error-list>
                                                            <label class="control-label mb-1">Inicio</label>
                                                            <input type="date" name="inicio" id="inicio" class="form-control" v-model="evento.fecha_inicio">
                                                        </div>
                                                        <div class="col">
                                                            <error-list :errors="errors.fecha_fin"></error-list>
                                                            <label class="control-label mb-1">Fin</label>
                                                            <input type="date" name="fin" id="fin" class="form-control" v-model="evento.fecha_fin">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group justify-content-center">
                                                    <div>
                                                        <p class="text-center">Imagen</p>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col"></div>
                                                        <div class="col-auto"><img :src="'https://smartgym.infornet.mx/assets/images/promociones_eventos/'+ evento.imagen" alt="" v-show="verImagen" class="text-center"></div>
                                                        <div class="col"></div>
                                                    </div>
                                                </div>
                                            <br/>
                                            <div class="row">
                                                <div class="col"></div>
                                                <div class="col"></div>
                                                <div class="col">
                                                    <router-link class="mb-5" :to="'/edit-evento/' + this.ide">
                                                        <span class="btn btn-success m-b-20 w-100">Habilitar edición</span>
                                                    </router-link>
                                                </div>
                                                <div class="col"></div>
                                                <div class="col"></div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="row">
                                <div class="col"></div>
                                <div class="col">
                                    <div class="w-50 h-50">
                                        <i class="fas fa-spinner fa-spin" style="width:20; height:20;"></i>
                                    </div>
                                </div>
                                <div class="col"></div>
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
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList
    },
    data(){
        return{
            evento : [],
            validated : true,
            loading: false,
            er:false,
            errors: [],
            mostrarImagen: '',
            verImagen: true,
            error_message: ''
        }
    },
    created(){
        this.verifyToken();
        this.getDatos();
    },
    methods:{
        ...mapActions([
            'getToken'
        ]),
        verifyToken(){
            this.getToken()
        },
        getDatos(){
            this.loading= true
            this.ide = this.$route.params.id;
            axios.get('/promociones-eventos/'+ this.ide)
            .then(response => {
                this.loading = false;
                this.evento = response.data
                console.log(this.evento)
            }).catch(error => {
                this.loading = false;
                console.log(error)
            })
        },
        editEvento(){
            console.log(this.evento)
            axios.put('/promociones-eventos/'+ this.ide, this.evento)
            .then(response => {
            Swal.fire({
                title: 'Se ha editado el evento/promoción exitosamente',
                icon: 'success',
                timer: 2000,
                onClose: () => {
                        this.$router.push('/eventos');
                    }
                })
            }).catch(error => {
                console.log(error)
                this.errors = (error.response.data.errors)
                this.loading = false;
            })
            this.errors=[];
            this.loading = false;
        },
        editImagen(){
            this.evento.imagen = event.target.files[0];
            this.mostrarImagen = URL.createObjectURL(event.target.files[0])
        },
        getImage(event){
            this.evento.imagen = event.target.files[0];
            this.mostrarImagen = URL.createObjectURL(event.target.files[0])
            this.verImagen = false
        }
    }
}
</script>
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
                            <div v-if="!loading">
                                <div class="col-lg-6">
                                    <div class="card">
                                        <div class="card-header">
                                            <h3>Editar imagen del evento/promoción</h3></div>
                                        <div class="card-body">
                                            <form @submit.prevent="editImagen" method="post" class="ml-5 mr-5">
                                                <error-list :errors="errors.imagen"></error-list>
                                                <div class="row">
                                                    <div class="col"></div>
                                                    <div class="col-auto">
                                                        <img :src="'https://smartgym.infornet.mx/assets/images/promociones_eventos/'+ evento.imagen" alt="" v-show="verImagen" class="text-center">
                                                        <img :src=this.mostrarImagen alt="" v-show="!verImagen">
                                                    </div>
                                                    <div class="col"></div>
                                                </div>
                                                <br/>
                                                <input type="file" name="file" id="file" ref="file"
                                                @change="getImage($event)" accept="image/*">
                                                <br/>
                                                <button class="btn btn-primary m-b-20 w-100" v-if="!cargando" type="submit">Editar imagen</button>
                                                    <button v-else disabled class="btn btn-info m-b-20 w-100">
                                                        <i class="fas fa-circle-notch fa-spin"></i>
                                                        Editando...
                                                    </button>
                                                <br/>
                                                <br/>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="card">
                                    <div class="card-header">
                                        <h3>Editar la información de {{evento.nombre}}</h3></div>
                                        <div class="card-body">
                                            <form @submit.prevent="editEvento" method="post" class="ml-5 mr-5">
                                                    <div v-if="er" class="alert alert-danger w-100">
                                                        {{ error_message}}
                                                        <br/>
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.nombre"></error-list>
                                                        <label class="control-label mb-1">Nombre</label> 
                                                        <input name='nombre' id='nombre' class="form-control" type="text"
                                                        pattern="[a-zA-Z0-9\s]+" title="Solo números y letras."
                                                        v-model="evento.nombre" minlength="4" maxlength="20" >
                                                        <br/>  
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.descripcion"></error-list>
                                                        <label class="control-label mb-1">Descripción</label>  
                                                        <textarea name='descripcion' id='descripcion' class="form-control" type="text"
                                                        v-model="evento.descripcion" > </textarea>
                                                        <br/>
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.tipo"></error-list>
                                                        <label class="control-label mb-1">Tipo</label>  
                                                        <input name='tipo' id='tipo' class="form-control" type="text"
                                                        v-model="evento.tipo" > 
                                                        <br/>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="control-label mb-1">Fechas</label>
                                                        <br/>
                                                        <div class="row justift-center">
                                                            <div class="col w-50">
                                                                <error-list :errors="errors.fecha_inicio"></error-list>
                                                                <label class="control-label mb-1">Inicio</label>
                                                                <input type="date" name="inicio" id="inicio"
                                                                class="form-control" v-model="evento.fecha_inicio">
                                                            </div>
                                                            <div class="col w-50">
                                                                <error-list :errors="errors.fecha_fin"></error-list>
                                                                <label class="control-label mb-1">Fin</label>
                                                                <input type="date" name="fin" id="fin"
                                                                class="form-control" v-model="evento.fecha_fin">
                                                            </div>
                                                        </div>
                                                    </div>
                                                <br/>
                                                    <button v-if="!editando" type="submit" class="btn btn-success w-100">Editar</button>
                                                    <button v-else disabled class="btn btn-info w-100">
                                                        <i class="fa fa-spinner"></i>
                                                        Editando...
                                                        </button>
                                                    <br/>
                                                    <br/>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="row align-items-center">
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
            error_message: '',
            imagen: '',
            editando: false,
            cargando: false
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
            this.loading = true
            this.ide = this.$route.params.id;
            axios.get('/promociones-eventos/'+ this.ide)
            .then(response => {
                this.loading = false;
                this.evento = response.data
                //console.log(this.evento)
            }).catch(error => {
                this.loading = false;
                console.log(error)
            })
        },
        editImagen(){
            this.cargando = true
            console.log(this.imagen)
            console.log(this.evento.nombre)
            var nombreImagen = this.evento.nombre
            var formData = new FormData();
            formData.append('imagen',this.imagen);
            formData.append('nombre',nombreImagen);
            axios.post('/promociones-eventos/'+this.ide+'/imagen', formData)
            .then(response => {
                this.cargando = false;
            Swal.fire({
                title: 'Se ha editado la imagen del evento/promoción exitosamente',
                icon: 'success',
                timer: 2000,
                onClose: () => {
                        this.$router.push('/eventos');
                    }
                })
            }).catch(error => {
                this.cargando = false
            Swal.fire({
                title: 'Ha ocurrido un error',
                icon: 'error',
                timer: 2000,
            })
                console.log(error)
            })
        },
        getImage(event){
            this.imagen = event.target.files[0];
            this.mostrarImagen = URL.createObjectURL(event.target.files[0])
            this.verImagen = false
        },
        editEvento(){
            this.editando = true
            axios.put('/promociones-eventos/'+ this.ide, this.evento)
            .then(response => {
                this.editando = false
            Swal.fire({
                title: 'Se ha editado el evento/promoción exitosamente',
                icon: 'success',
                timer: 2000,
                onClose: () => {
                        this.$router.push('/eventos');
                    }
                })
            }).catch(error => {
                this.editando = false
                console.log(error)
                this.errors = (error.response.data.errors)
            })
            this.errors=[];
            this.loading = false;
        }
    }
}
</script>
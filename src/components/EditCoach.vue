<template>
<div class="page-wrapper">
    <HeaderMobile/>
    <MenuSidebar/>
    <div class="page-container">}
        <HeaderDesktop/>
        <div class="main-content">
            <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-3">
                                <button @click="$router.go(-1)" class="btn btn-primary ml-5 btn-sm glyphicon glyphicon-arrow-left" title="Atrás">
                                </button>
                            </div>
                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h3>Editar la info. de {{coach.nombre}}</h3></div>
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
                                                        pattern="[a-zA-Z0-9\s]+" title="Solo números y letras."
                                                        v-model="coach.nombre" minlength="4" maxlength="20">
                                                        <br/>  
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.precio"></error-list>
                                                        <label class="control-label mb-1">Precio</label>  
                                                        <input name='precio' id='precio' class="form-control" type="number" step="0.01"
                                                        v-model="coach.email"> 
                                                        <br/>
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.descripcion"></error-list>
                                                        <label class="control-label mb-1">Descripcion</label>    
                                                        <textarea v-model="coach.descripcion" type="text" name='descripcion'
                                                        id='descripcion' class="form-control" rows="5" cols="50" pattern="[a-zA-Z0-9\s]+"></textarea>
                                                        <br/>
                                                    </div>
                                                <br/>
                                                    <button v-if="!loading" type="submit" class="au-btn au-btn--block au-btn--green m-b-20">Editar</button>
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
import { mapState, mapActions } from 'vuex';
import SweetAlert from 'sweetalert2'

export default {
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList,
        'Swal' : SweetAlert
    },
    data(){
        return{
            coach:{
                nombre: '',
                biografia: '',
                email: '',
                password: '',
                horarios: '',
            },
            errors: [],
            er: false,
            hecho: false,
            er: false,
            error_message: '',
            loading: false,
            ide:''
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
            axios.get('/coaches/' + this.ide)
            .then((response) =>
            {  
                this.coach = response.data;
                console.log(this.coach)
            }).catch(function (error){
                this.er = true
            })
        }
    }
}
</script>
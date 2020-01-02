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
                        <div v-if="!loading" class="col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <h3>{{plan.nombre}}</h3></div>
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
                                                    v-model="plan.nombre" minlength="4" maxlength="20"  :disabled="validated">
                                                    <br/>  
                                                </div>
                                                <div class="form-group">
                                                    <error-list :errors="errors.precio"></error-list>
                                                    <label class="control-label mb-1">Precio</label>  
                                                    <input name='precio' id='precio' class="form-control" type="number" step="0.01"
                                                    v-model="plan.precio"  :disabled="validated"> 
                                                    <br/>
                                                </div>
                                                <div class="form-group">
                                                    <error-list :errors="errors.descripcion"></error-list>
                                                    <label class="control-label mb-1">Servicios</label>  
                                                    <br/>
                                                    <div v-show="!validated">
                                                        <select @change="selectServicio($event)" class="form-control h-25">
                                                            <option dselected="selected">Seleccionar</option>
                                                            <option v-for="item of getServicios" :key='item.id' :value="item.id">{{item.nombre}}  -  ${{item.precio}}</option> 
                                                        </select>
                                                        <br/>
                                                        <div class="table-responsive table--no-card m-b-30">
                                                            <table class="table table-borderless table-striped table-earning">
                                                                <thead>
                                                                    <tr>
                                                                        <td >Nombre</td>
                                                                        <td>Precio</td>
                                                                        <td>Quitar</td>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr class="tr-shadow" v-for="(item,index) of arrayServicios" :key="item.id">
                                                                        <td>{{item.nombre}}</td>
                                                                        <td>{{item.precio}}</td>
                                                                        <td>
                                                                            
                                                                            <button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" type="submit" @click.prevent="quitarServicio(index,item.id)">
                                                                                <span class="zmdi zmdi-delete"></span>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <br/>
                                                                    <label for="">&nbsp;&nbsp;&nbsp;&nbsp;Precio sugerido:</label>
                                                                    <label for="">&nbsp;&nbsp;&nbsp;&nbsp;${{this.suma}}</label>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div v-show="validated">
                                                        <table class="table table-borderless table-striped table-earning">
                                                            <thead>
                                                                <tr>
                                                                    <th>Nombre del plan</th>
                                                                    <th>Precio</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="item of arrayServicios" :key="item.id">
                                                                    <td>{{item.nombre}}</td>
                                                                    <td>$ {{item.precio}}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <br/>
                                                </div>
                                                <span v-if="validated" @click="validated = !validated" class="btn btn-success m-b-20 w-100">Habilitar edición</span>
                                                <div v-else>
                                                    <button class="btn btn-primary btn-lg w-100" v-if="!cargando" type="submit">Editar</button>
                                                    <button v-else disabled class="btn btn-info btn-lg w-100">
                                                        <i class="fas fa-circle-notch fa-spin"></i>
                                                        Editando...
                                                    </button>
                                                </div>
                                                <br/>
                                                <br/>
                                        </form>
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
            plan:{
                nombre:'',
                precio:'',
                servicios:[]
            },
            servicios:[],
            getServicios: [],
            errors: [],
            er: false,
            validated : true,
            agregar: false,
            btnagregar: false,
            cargando: false,
            suma: 0,
            arrayServicios: [],
            darServicios: [],
            numServicios: [],
            loading: false
        };
    },
    created(){
        this.verifyToken();
    },
    mounted(){
        this.obtenerDatos();
        this.obtenerServicios();
    },
    methods:{
        ...mapActions([
            'getToken'
        ]),
        verifyToken(){
            this.getToken()
        },
        obtenerServicios(){
            this.loading = true;
            axios.get('/servicios')
            .then(response => {
                this.loading = false;
                this.getServicios = response.data['data']
            }).catch(error => {
                this.loading = false;
                console.log(error)
            })
        },
        obtenerDatos(){
            this.ide = this.$route.params.id;
            axios.get('/planes-entrenamiento/' + this.ide)
            .then((response) =>
            {  
                this.plan = response.data;
                this.arrayServicios = this.plan.servicios               
                this.arrayServicios.forEach(element => {
                    let valor = element.precio
                    this.suma = this.suma + parseFloat(valor)
                    let id = element.id
                    this.darServicios.push(id)
                });   
            }).catch(function (error){
                console.log(error)
            })
        },
        formSubmit(){
            this.cargando = true;
            this.plan.servicios = this.darServicios;
            axios.put('/planes-entrenamiento/'+ this.ide, this.plan)
            .then(response => {
                this.cargando = false
                this.errors= []
                Swal.fire({ 
                    title: 'Se ha editado el servicio exitosamente',
                    icon: 'success',
                    timer: 2000,
                    onClose: () => {
                        this.$router.push('/planes');
                    }
                })           
            }).catch(error => {
                this.cargando = false
                console.log(error)
                this.errors = (error.response.data.errors)
            })
            this.errors=[];
            },
        selectServicio(e){
            var id = e.target.value
            var servicio = this.getServicios.find(element => element.id == id)
            var valor = servicio.precio
            if(this.arrayServicios.find(element => element.id == id) ){
                Swal.fire({ 
                    title: 'Este servicio ya existe dentro del plan',
                    icon: 'warning',
                })  
            }else {
                this.suma = this.suma + parseFloat(valor)
                this.arrayServicios.push(servicio)
                this.darServicios.push(parseInt(id, 10))
            }
        },
        quitarServicio(index,id){
            var serv = this.arrayServicios.find(element => element.id == id)
            var v = serv.precio
            this.suma = this.suma - parseFloat(v)
            this.darServicios.splice(index, 1)
            this.arrayServicios.splice(index, 1)
        }
    }
}
</script>
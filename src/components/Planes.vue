<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div v-show="agregar">
                        <div v-if="numServicios > 5" class="row align-items-start mr-5 ml-5">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h4>Datos del nuevo plan</h4></div>
                                        <div class="card-body card-block">
                                            <form @submit.prevent="addPlan" method="post" action="https://smartgym.infornet.mx/api/gimnasio/login" class="ml-5 mr-5">
                                                <div class="form-group">
                                                    <error-list :errors="errors.nombre"></error-list>
                                                    <label class="control-label mb-1">Nombre del plan</label>                   
                                                    <input name='nombre' id='nombre' class="form-control" type="text" pattern="[a-zA-Z0-9\s]+"
                                                    minlength="4" maxlength="20" v-model="nombre" placeholder='Nombre'
                                                    title="Solo letras, Tamaño minimo: 4. Tamaño maximo: 20">
                                                    <br/>
                                                </div>
                                                <div class="form-group">
                                                    <error-list :errors="errors.precio"></error-list>
                                                    <label class="control-label mb-1">Precio</label>
                                                    <input name='precio' id='precio' class="form-control" type="number" step="0.01" placeholder="$$$"
                                                    v-model="precio"
                                                    title="Solo números">
                                                    <br/>
                                                </div>
                                                <div class="form-group">
                                                    <error-list :errors="errors.servicios"></error-list>
                                                    <label class="control-label mb-1">Servicios</label>
                                                    <div class="row justify-content-around">
                                                        <div class="col">
                                                            <table class="table table-borderless table-data3">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="text-center">Nombre</th>
                                                                        <th class="text-center">Precio</th>
                                                                        <th class="text-center">Agregar</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr class="tr-shadow" v-for="item of serviciosUno" :key="item.id">
                                                                        <td class="text-center">
                                                                            <span>{{item.nombre}}</span>
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <span class="badge badge-pill badge-info">$ {{item.precio}}</span>
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <input type="checkbox" :value="item.id" v-model="servicios">
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div class="col">
                                                            <table class="table table-borderless table-data3">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="text-center">Nombre</th>
                                                                        <th class="text-center">Precio</th>
                                                                        <th class="text-center">Agregar</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr class="tr-shadow" v-for="item of serviciosDos" :key="item.id">
                                                                        <td class="text-center">
                                                                            <span>{{item.nombre}}</span>
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <span class="badge badge-pill badge-info">$ {{item.precio}}</span>
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <input type="checkbox" :value="item.id" v-model="servicios">
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <nav>
                                                                <ul class="pagination">
                                                                    <li v-if="paginacion.current_page > 1">
                                                                        <a href="#" @click.prevent="changePage(paginacion.current_page - 1)">
                                                                            <span>Atras</span>
                                                                        </a>
                                                                    </li>
                                                                    <li v-for="page in pageNumber" :key="page.id" :class="[ page == isActived ? 'active' : '']">
                                                                        <a href="#" @click.prevent="changePage(page)">
                                                                            {{page}}
                                                                        </a>
                                                                    </li>
                                                                    <li v-if="paginacion.current_page < paginacion.last_page">
                                                                        <a href="#" @click.prevent="changePage(paginacion.current_page - 1)">
                                                                            <span>Siguiente</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </nav>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                </div>
                                                    <br/>
                                                <div class="row">
                                                    <div class="col-auto mr-auto">
                                                        <button class="au-btn au-btn--block au-btn--green m-b-20 text-center" v-if="!cargando" type="submit">
                                                        <span>Agregar</span></button>
                                                        <button v-else disabled class="au-btn au-btn--block au-btn--info m-b-20 w-50">Agregando...</button>
                                                    </div>
                                                    <div class="col-auto">
                                                        <span v-show="agregar" title="Cancelar" @click="agregar = !agregar" @click.prevent="limpiarDatos()" class="btn btn-danger btn-lg content-aling-center">X</span>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div v-else class="row align-items-start">
                            <div class="col"></div>
                            <div class="col"></div>
                                <div class="col-lg-6">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4>Datos del nuevo plan</h4></div>
                                            <div class="card-body card-block">
                                                <form @submit.prevent="addPlan" method="post" action="https://smartgym.infornet.mx/api/gimnasio/login" class="ml-5 mr-5">
                                                    <div class="form-group">
                                                        <error-list :errors="errors.nombre"></error-list>
                                                        <label class="control-label mb-1">Nombre del plan</label>                   
                                                        <input name='nombre' id='nombre' class="form-control" type="text" pattern="[a-zA-Z0-9\s]+"
                                                        minlength="4" maxlength="20" v-model="nombre"
                                                        title="Solo letras, Tamaño minimo: 4. Tamaño maximo: 20">
                                                        <br/>
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.telefono"></error-list>
                                                        <label class="control-label mb-1">Precio</label>
                                                        <input name='precio' id='precio' class="form-control" min="0" type="number" step="0.50" placeholder="$1.50"
                                                        v-model="precio">
                                                        <br/>
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.email"></error-list>
                                                        <label class="control-label mb-1">Servicios</label>
                                                        <table class="table table-borderless table-data3">
                                                        <thead>
                                                            <tr>
                                                                <th class="text-center">Nombre</th>
                                                                <th class="text-center">Precio</th>
                                                                <th class="text-center">Agregar</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr class="tr-shadow" v-for="item of getServicios" :key="item.id">
                                                                <td class="text-center">
                                                                    <span>{{item.nombre}}</span>
                                                                </td>
                                                                <td class="text-center">
                                                                    <span class="badge badge-pill badge-info">$ {{item.precio}}</span>
                                                                </td>
                                                                <td class="text-center">
                                                                    <input type="checkbox" :value="item.id" @change="sumaPrecios($event)">
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                        </table>
                                                        <h3>Precio sugerido</h3>
                                                        <h4>$ {{this.suma}}</h4>
                                                        <br/>
                                                    </div>
                                                        <br/>
                                                    <div class="row">
                                                        <div class="col-auto mr-auto">
                                                            <button class="btn btn-success btn-md" v-if="!cargando" type="submit">Agregar</button>
                                                            <button v-else disabled class="btn btn-info btn-md">
                                                                <i class="fas fa-circle-notch fa-spin"></i>
                                                                Agregando...
                                                            </button>
                                                        </div>
                                                        <div class="col-auto">
                                                            <span v-show="agregar" title="Cancelar" @click="agregar = !agregar" @click.prevent="limpiarDatos()" class="btn btn-danger btn-md content-aling-center">X</span>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                <div class="col"></div>
                            <div class="col"></div>
                        </div>
                </div>
                <div class="col-md-12 m-3">
                    <div class="table-data__tool">
                        <div class="table-data__tool-left">
                            <button @click="$router.go(-1)" class="btn btn-primary btn-sm glyphicon glyphicon-arrow-left" title="Atrás">
                            </button>
                        </div>
                        <div class="table-data__tool-right">
                            <button class="btn btn-info btn-sm content-aling-center" @click="agregar = !agregar" v-if="agregar === false">
                                +   Nuevo plan
                            </button>
                        </div>
                    </div>
                    <div v-if="vacio">
                        <div class="row">
                            <div class="col"></div>
                            <div class="col"> 
                                <div class="alert alert-info" role="alert">
                                    <h1 class="text-center">No existen registros</h1>
                                    <h3 class="text-center">Ingresa algunos</h3>
                                </div>
                            </div>
                            <div class="col"></div>
                        </div>
                    </div>
                    <div v-else class="col-lg-12">
                        <!-- TOP CAMPAIGN-->
                        
                            <h3 class="title-3 m-b-30">Planes</h3>
                            <div class="table-responsive table-responsive-data2">
                                <table class="table table-data2">
                                    <thead>
                                        <tr>
                                            <th>Nombre del plan</th>
                                            <th>Precio</th>
                                            <th>Servicios del plan</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="tr-shadow" v-for="(item, index) of datos" :key="item.id">
                                            <td>
                                                <span>{{item.nombre}}</span>
                                            </td>
                                            <td>
                                                <span class="badge badge-pill badge-success">$ {{item.precio}}</span>
                                            </td>
                                            <td>
                                                <span v-for="name of item.servicios" :key="name.id" class="badge badge-pill badge-info">
                                                    {{name.nombre}} 
                                                </span>
                                            </td>
                                            <td>
                                                <div class="table-data-feature justify-content-around">
                                                    <router-link :to="'/ver-plan/' + item.id">
                                                        <button class="item" data-toggle="tooltip" data-placement="top" title="Ver más">
                                                            <span class="glyphicon glyphicon-zoom-in"></span> 
                                                        </button>
                                                    </router-link>

                                                    <router-link :to="'/edit-plan/' + item.id">
                                                        <button class="item" data-toggle="tooltip" data-placement="top" title="Editar plan">
                                                            <span class="zmdi zmdi-edit"></span> 
                                                        </button>
                                                    </router-link>

                                                    <button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" type="submit" @click.prevent="deletePlan(index,item.id)">
                                                        <span class="zmdi zmdi-delete"></span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                    </div>
                    <div v-if="loading" class="row">
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
            nombre:'',
            precio:'',
            servicios:[],
            getServicios:[],
            datos: [],
            errors: [],
            ide: '',
            agregar: false,
            btnagregar: false,
            cargando: false,
            er: false,
            numServicios: '',
            dividirServicios: '',
            serviciosUno: [],
            serviciosDos: [],
            loading: false,
            vacio : false,
            suma : 0,
            paginacion : {
                'total': 0,
                'current_page': 0,
                'per_page': 0,
                'last_page': 0,
                'from': 0,
                'to': 0
            }
        };
    },
    created(){
        this.verifyToken();
    },
    mounted(){
        this.obtenerDatos();
        this.obtenerServicios();
    },
    computed :{
        isActived : function (){
            return this.paginacion.current_page;
        },
        pageNumber: function (){
            if(!this.paginacion.to){
                return [];
            }

            var from = this.paginacion.current_page - 2; //pendiente
            if(from < 1){
                from = 1;
            }

            var to = from + (2 * 2);
            if(to >= this.paginacion.last_page){
                to = this.paginacion.last_page;
            }

            var pagesArray = [];
            while(from <= to){
                pagesArray.push(from);
                from++;
            }
            return pagesArray;
        }
    },
    methods:{
        ...mapActions([
            'getToken'
        ]),
        verifyToken(){
            this.getToken()
        },
        idGym(){
            axios.get('/perfil')
            .then((response) => {
                this.ide = response.data.gimnasio.id
            }).catch(function (error) {
                console.log(error);
            })
        },
        obtenerServicios(page){
            this.loading = true;
            axios.get('/servicios?page='+page)
            .then(response => {
                this.loading = false;
                this.getServicios = response.data['data']
                this.paginacion = response.data.pagination
                this.numServicios = Object.keys(this.getServicios).length
                this.dividirServicios = this.numServicios / 2
                if (this.dividirServicios % 1 == 0){
                    for (let index = 0; index < this.dividirServicios; index++) {
                        this.serviciosUno[index] = this.getServicios[index]
                    }
                    let x = 0
                    for (let i = this.dividirServicios; i < this.numServicios; i++) {
                        this.serviciosDos[i-this.dividirServicios] = this.getServicios[i]
                    }
                } else {
                    var mitad = parseInt(this.dividirServicios)
                    for (let index = 0; index < mitad; index++) {
                    this.serviciosUno[index] = this.getServicios[index]
                    }
                    let x = 0
                    for (let i = mitad; i < this.numServicios; i++) {
                        this.serviciosDos[i-mitad] = this.getServicios[i]
                    }
                }

            }).catch(error => {
                this.loading = false;
                console.log(error)
            })
        },
        obtenerDatos(){
            axios.get('/planes-entrenamiento')
            .then(response =>
            {  
                if(response.data['data'][0] == null){
                    this.loading = false;
                    console.log('vacio')
                    this.vacio = true;
                }else{
                    this.loading =false;
                    this.vacio =false;
                    this.datos = response.data['data']
                }
            }).catch(function (error){
                console.log('Error: ' + error);
            })
        },
        addPlan(){
            this.cargando = true;
            axios.post('/planes-entrenamiento', {
                nombre: this.nombre,
                precio: this.precio,
                servicios: this.servicios
            }).then(response =>{
                this.cargando = false;
                SweetAlert.fire(
                    'Correcto',
                    'Se ha agregado un servicio exitosamente',
                    'success',
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                )
                let plan = {
                    nombre: this.nombre,
                    precio: this.precio,
                    servicios: this.servicios
                }
                this.datos.unshift(plan)
                this.cargando = false;
                this.errors = [];
                this.agregar = false;
                this.nombre ='',
                this.precio ='',
                this.servicios = []
            }).catch(error => {
                this.cargando = false
                this.errors = (error.response.data.errors)
            })
            this.errors = [];
        },
        limpiarDatos(){
            this.nombre='',
            this.precio='',
            this.servicios=[],
            this.errors = [];
        },
        deletePlan(index,id){
            Swal.fire({
            title: '¿Desea eliminar este servicio?',
            text: "¡Esta acción no se podrá revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
            }).then((result) => {
            if (result.value) {
                axios.delete('/planes-entrenamiento/'+ id)
                .then(response => {
                    this.datos.splice(index, 1)
                    Swal.fire(
                    '¡Eliminado!',
                    'El servicio ha sido eliminado.',
                    'success'
                    )
                }).catch(error => {
                    alert('Ha ocurrido un error: ' + error)
                })
            }
            })
        
        },
        sumaPrecios(e){
            var ide = e.target.value
            var servicio = this.getServicios.find(element => element.id == ide)
            this.servicios.push(ide)
            console.log(servicio)
            this.suma = this.suma + parseFloat(servicio.precio)
        },
        changePage(page){
            this.paginacion.current_page = page;
            this.obtenerServicios(page);
        }
    }
    
};


</script>
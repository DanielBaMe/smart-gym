<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div v-show="agregar">
                    <div class="row align-items-start">
                        <div class="col"></div>
                        <div class="col"></div>
                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h4>Datos del nuevo servicio</h4></div>
                                        <div class="card-body card-block">
                                            <form method="post" @submit.prevent="addService" class="ml-5 mr-5">
                                                <div class="form-group">
                                                    <error-list :errors="errors.nombre"></error-list>
                                                    <div class="input-group">
                                                        <label class="control-label mb-1">Nombre</label>
                                                        <input type="text" name="servicio" id="servicio"
                                                        class="form-control" v-model="nombre"  pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s]+"
                                                        title="Solo números y letras.">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <error-list :errors="errors.precio"></error-list>
                                                    <div class="input-group">
                                                        <label class="control-label mb-1">Precio</label>
                                                        <input type="number" step="0.50" name="precio" id="precio" placeholder="$1.50"
                                                        class="form-control" min="0" v-model="precio">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <error-list :errors="errors.descripcion"></error-list>
                                                    <div class="input-group">
                                                        <label class="control-label mb-1">Descripcion</label>
                                                        <textarea type="text" max="50" name="descripcion" id="descripcion" 
                                                        class="form-control" v-model="descripcion" rows="5"  pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s]+"></textarea>
                                                    </div>
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
                                +   Nuevo servicio
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
                    <div v-else>
                        <div class="table-responsive table-responsive-data2">
                            <table class="table table-data2">
                                <thead>
                                    <tr>
                                        <th >Nombre</th>
                                        <th >Precio</th>
                                        <th >Descripcion</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="tr-shadow" v-for="(item,index) of datos" :key="item.id">
                                        <td>
                                            <span>{{item.nombre}}</span>
                                        </td>
                                        <td>
                                            <span class="badge badge-pill badge-dark">$ {{item.precio}}</span>
                                        </td>
                                        <td class="desc">
                                            <span>{{item.descripcion | delimitar}}</span>
                                        </td>
                                        <td>
                                            <div class="table-data-feature justify-content-around">
                                                <router-link :to="'/ver-servicio/' + item.id">
                                                    <button class="item" data-toggle="tooltip" data-placement="top" title="Ver más">
                                                        <span class="glyphicon glyphicon-zoom-in"></span> 
                                                    </button>
                                                </router-link>

                                                <router-link :to="'/edit-servicio/' + item.id">
                                                    <button class="item" data-toggle="tooltip" data-placement="top" title="Editar">
                                                        <span class="zmdi zmdi-edit"></span>
                                                    </button> 
                                                </router-link>
                                                
                                                <button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" type="submit" @click.prevent="deleteServicio(index,item.id)">
                                                    <span class="zmdi zmdi-delete"></span>
                                                </button>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td></td>
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
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import SweetAlert from 'sweetalert2'
// import func from '../../vue-temp/vue-editor-bridge';

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
            descripcion:'',
            datos: [],
            errors: [],
            ide: '',
            agregar: false,
            btnagregar: false,
            cargando: false,
            er: false,
            loading : false,
            vacio : false,
            paginacion : {
                'total': 0,
                'current_page': 0,
                'per_page': 0,
                'last_page': 0,
                'from': 0,
                'to': 0
            },
        };
    },
    created(){
        this.verifyToken();
    },
    mounted(){
        this.obtenerDatos();
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
    filters:{
        delimitar(valor){
            if((valor.split('').length) > 20){
                return valor.slice(0,20)
            }
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
        obtenerDatos(page){
            this.loading = true;
            axios.get('/servicios?page='+page)
            .then((response) =>
            {   
                if(response.data['data'][0] == null){
                    this.loading = false;
                    console.log('vacio')
                    this.vacio = true;
                }else{
                    //this.paginacion = response.data.rutinas['pagination']
                    this.paginacion = response.data.pagination
                    this.loading =false;
                    this.vacio =false;
                    this.datos = response.data['data'];
                    console.log(response)
                }

            }).catch(function (error){
                this.loading = false
                console.log('Error: ' + error);
            })
        },
        addService(){
            this.cargando = true
            axios.post('/servicios',
            {
                nombre: this.nombre,
                precio: this.precio,
                descripcion: this.descripcion,
                id_gimnasio: this.ide
            })
            .then( response => {
                this.cargando = false
                let servicio = {
                    nombre: this.nombre,
                    precio: this.precio,
                    descripcion: this.descripcion,
                    id_gimnasio: this.ide
                }
                this.datos.unshift(servicio)
                this.cargando = false;
                this.errors = [];
                this.agregar = false;
                this.nombre = ''
                this.precio = ''
                this.descripcion = ''
                SweetAlert.fire(
                'Correcto',
                'Se ha agregado un servicio exitosamente',
                'success',
                setTimeout(() => {
                    location.reload()
                }, 500)
            )
            })
            .catch(error=>{
                this.cargando = false
                this.errors = (error.response.data.errors)
                this.cargando = false;
            })
            this.errors= []
        },
        deleteServicio(index,id){
            Swal.fire({
            title: '¿Desea eliminar este servicio?',
            text: "Este servicio también se eliminará de los planes de entrenamiento en donde esté vinculado.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
            }).then((result) => {
            if (result.value) {
                axios.delete('/servicios/'+ id)
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
        limpiarDatos(){
            this.nombre = ''
            this.precio = ''
            this.descripcion = ''
        },
        changePage(page){
            this.paginacion.current_page = page;
            this.obtenerDatos(page);
        }
    }
}

</script>
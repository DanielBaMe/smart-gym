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
                                        <h4>Datos del evento o promoción</h4>
                                    </div>
                                    <div class="card-body card-block">
                                        <form method="post" @submit.prevent="addEvent" class="ml-5 mr-5" encType="multipart/form-data">
                                            <div class="form-group">
                                                <error-list :errors="errors.nombre"></error-list>
                                                <label class="control-label mb-1">Nombre</label>
                                                <input type="text" name="nombre" id="nombre"
                                                class="form-control" v-model="nombre" pattern="[a-zA-Z\s]+"> 
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.descripcion"></error-list>
                                                <label class="control-label mb-1">Descripcion</label>
                                                <textarea type="text" name="descripcion"
                                                id="descripcion" class="form-control" v-model="descripcion" pattern="[a-zA-Z0-9\s]+"></textarea>
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.imagen"></error-list>
                                                <label class="control-label mb-1">Imagen</label>
                                                <input type="file" name="file" id="file" ref="file"
                                                @change="getImage($event)" accept="image/*">
                                                <br/>
                                                <div class="row">
                                                    <div class="col"></div>
                                                    <div class="col-auto"><img :src=this.mostrarImagen alt="" ></div>
                                                    <div class="col"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.tipo"></error-list>
                                                <label class="control-label mb-1">Tipo</label>
                                                <select v-model="tipo" class="form-control h-25">
                                                    <option disable selected="selected">Seleccionar tipo</option>
                                                    <option v-for="item of seleccion" :key="item.id">
                                                        {{item}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label mb-1">Fechas</label>
                                                <br/>
                                                <div class="row justift-center">
                                                    <div class="col">
                                                        <error-list :errors="errors.fecha_inicio"></error-list>
                                                        <label class="control-label mb-1">Inicio</label>
                                                        <input type="date" name="inicio" id="inicio" class="form-control" v-model="inicio">
                                                    </div>
                                                    <div class="col">
                                                        <error-list :errors="errors.fecha_fin"></error-list>
                                                        <label class="control-label mb-1">Fin</label>
                                                        <input type="date" name="fin" id="fin" class="form-control" v-model="fin">
                                                    </div>
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
                                +   Nuevo evento
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
                    <div v-else class="row">
                        <div class="col-sm-6" v-for="(item,index) of eventos" :key="item.id">
                            <div class="card m-5">
                                <div class="card-header">
                                    <strong class="card-title mb-3">{{item.nombre}}</strong>
                                </div>
                                <div class="card-body">
                                    <div class="mx-auto d-block">
                                        <!-- <img class="rounded-circle mx-auto d-block" src="images/icon/avatar-01.jpg" alt="Card image cap"> -->
                                        <img class="rounded-circle mx-auto d-block w-75 h-75" alt="Card image cap" :src="'https://smartgym.infornet.mx/assets/images/promociones_eventos/'+ item.imagen">
                                        <h5 class="text-sm-center mt-2 mb-1">{{item.tipo}}</h5>
                                        <div class="location text-sm-center">
                                            <i class="fas fa-calendar-check"></i>   {{item.fecha_inicio}} <br/> <i class="fas fa-calendar-times"></i>   {{item.fecha_fin}}</div>
                                    </div>
                                    <hr>
                                    <div class="table-data-feature justify-content-around">
                                        <router-link :to="'/ver-evento/' + item.id">
                                            <button class="item" data-toggle="tooltip" data-placement="top" title="Ver más">
                                                <span class="glyphicon glyphicon-zoom-in"></span> 
                                            </button>
                                        </router-link>

                                        <router-link :to="'/edit-evento/' + item.id">
                                            <button class="item" data-toggle="tooltip" data-placement="top" title="Editar plan">
                                                <span class="zmdi zmdi-edit"></span> 
                                            </button>
                                        </router-link>

                                        <button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" type="submit" @click.prevent="deleteEvento(index,item.id)">
                                            <span class="zmdi zmdi-delete"></span>
                                        </button>
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="loading" class="row">
                        <div class="col"></div>
                        <div class="col">
                            <div class="w-50 h-50">
                                <i class="fas fa-spinner fa-spin w-50 h-50"></i>
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


export default {
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList
    },
    data(){
        return{
            nombre: '',
            imagen: '',
            descripcion: '',
            tipo: '',
            inicio: '',
            fin: '',
            errors : [],
            cargando : false,
            agregar: false,
            seleccion: [
                'Evento',
                'Promoción'
            ],
            agregar : false,
            eventos: [],
            mostrarImagen: '',
            loading:false,
            vacio: false
        };
    },
    created(){
        this.verifyToken();
    },
    mounted(){
        this.getDatos();
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
        getDatos(){
            this.loading = true
            axios.get('/promociones-eventos')
                .then(response => {

                if(response.data['data'][0] == null){
                    this.loading = false;
                    console.log('vacio')
                    this.vacio = true;
                }else{
                    this.loading =false;
                    this.vacio =false;
                    this.eventos = response.data['data']
                }

                }).catch(error => {
                    this.loading = false
                    console.log(error)
                })
        },
        addEvent(event){
            this.cargando = true;
            let formData = new FormData();

            formData.append('nombre',this.nombre)
            formData.append('descripcion',this.descripcion)
            formData.append('imagen',this.imagen)
            formData.append('tipo',this.tipo)
            formData.append('fecha_inicio',this.inicio)
            formData.append('fecha_fin',this.fin)

            axios.post('/promociones-eventos', formData)
            .then(response => {
                this.cargando = false;
                Swal.fire(
                    'Correcto',
                    'Se ha agregado un nuevo evento o promoción',
                    'success',
                    setTimeout(() => {
                        location.reload()
                    }, 500)
                )
                console.log(response.data)
            }).catch(error => {
                this.cargando = false;
                console.log(error)
                this.errors = (error.response.data.errors)
            })
            this.errors = [];
        },
        getImage(event){
            this.imagen = event.target.files[0];
            this.mostrarImagen = URL.createObjectURL(event.target.files[0])
        },
        limpiarDatos(){
            this.nombre= '',
            this.descripcion= '',
            this.imagen= '',
            this.tipo= '',
            this.inicio= '',
            this.fin = '',
            this.mostrarImagen = '',
            this.errors = []
        },
        deleteEvento(index,id){
            Swal.fire({
                title: '¿Desea eliminar este evento/promoción?',
                text: "¡Esta acción no se podrá revertir!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar'
                }).then((result) => {
                if (result.value) {
                    axios.delete('/promociones-eventos/'+ id)
                    .then(response => {
                        this.eventos.splice(index, 1)
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
        }
    }
}
</script>
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
                                <button @click="$router.go(-1)" class="btn btn-primary ml-5 btn-sm glyphicon glyphicon-arrow-left" title="Atrás">
                                </button>
                            </div>
                            <div v-if="!loading" class="col-lg-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h4>Editar el plan {{plan.nombre}}</h4>
                                    </div>
                                    <div class="card-body card-block">
                                        <form @submit.prevent="editPlan" method="post" action="https://smartgym.infornet.mx/api/gimnasio/login" class="ml-5 mr-5">
                                            <div class="form-group">
                                                <error-list :errors="errors.nombre"></error-list>
                                                <label class="control-label mb-1">Nombre del plan</label>                   
                                                <input name='nombre' id='nombre' class="form-control" type="text" pattern="[a-zA-Z0-9\s]+"
                                                minlength="4" maxlength="20" v-model="plan.nombre" placeholder='Nombre'
                                                title="Solo letras, Tamaño minimo: 4. Tamaño maximo: 20">
                                                <br/>
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.precio"></error-list>
                                                <label class="control-label mb-1">Precio</label>
                                                <input name='precio' id='precio' class="form-control" min="0"
                                                type="number" step="0.50" placeholder="$1.50"
                                                v-model="plan.precio"
                                                title="Solo números">
                                                <br/>
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.servicios"></error-list>
                                                <label class="control-label mb-1">Servicios</label>
                                                <select @change="selectServicio($event)" class="form-control h-25">
                                                    <option disabled value="">Seleccionar</option>
                                                    <option v-for="item of getServicios" :key='item.id' :value="item.id">{{item.nombre}}  -  ${{item.precio}}</option> 
                                                </select>
                                                <br/>
                                                <div class="table-responsive table--no-card m-b-30">
                                                    <table class="table table-borderless table-striped table-earning">
                                                        <thead>
                                                            <tr>
                                                                <td>Nombre</td>
                                                                <td>Precio</td>
                                                                <td>Quitar</td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr class="tr-shadow" v-for="(item,index) of numServicios" :key="item.id">
                                                                <td>{{item.nombre}}</td>
                                                                <td>{{item.precio}}</td>
                                                                <td>
                                                                    
                                                                    <button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" type="submit" @click.prevent="quitarServicio(index,item.id)">
                                                                        <span class="zmdi zmdi-delete"></span>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <br/>
                                                            <label for="">&nbsp;&nbsp;&nbsp;&nbsp; Total:</label>
                                                            <label for="">&nbsp;&nbsp;&nbsp;&nbsp; ${{this.suma}}</label>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <br/>
                                            </div>
                                            <button class="btn btn-primary btn-lg w-100" v-if="!cargando" type="submit">Editar</button>
                                            <button v-else disabled class="btn btn-info btn-lg w-100">
                                                <i class="fas fa-circle-notch fa-spin"></i>
                                                Editando...
                                            </button>
                                            <br/>
                                            <br/>
                                        </form>
                                        <br/>
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
            getServicios:[],
            errors: [],
            ide: '',
            agregar: false,
            btnagregar: false,
            loading: false,
            er: false,
            nombreServicios: [],
            numServicios: '',
            dividirServicios: '',
            serviciosUno: [],
            serviciosDos: [],
            servicios: [],
            identi: [],
            plan:{
                nombre:'',
                precio:'',
                servicios:[]
            },
            arrayServicios: [],
            ctnServicios: [],
            suma : 0,
            cargando : false
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
        idGym(){
            axios.get('/perfil')
            .then((response) => {
                this.ide = response.data.gimnasio.id
            }).catch(function (error) {
                console.log(error);
            })
        },
        obtenerServicios(){
            this.loading = true;
            axios.get('/servicios')
            .then(response =>{ 
                console.log(response)
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
                this.numServicios = this.plan.servicios;
                for(let i = 0; i < this.numServicios.length; i++){
                
                    this.identi[i] = this.numServicios[i].id
                    let p = this.numServicios[i].precio
                    this.suma = this.suma + parseInt(p)
                }    
                console.log(this.identi)
            }).catch(function (error){
                console.log(error)
            })
        },
        selectServicio(e){
            var id = e.target.value
            var servicio = this.getServicios.find(element => element.id == id)
            var valor = servicio.precio
            this.suma = this.suma + parseFloat(valor)
            if(this.numServicios.find(element => element.id == id) ){
                Swal.fire({ 
                    title: 'Este servicio ya existe dentro del plan',
                    icon: 'warning',
                })  
            }else{
                this.numServicios.push(servicio)
                this.identi.push(id)
            }
        },
        quitarServicio(index,id){
            var serv = this.numServicios.find(element => element.id == id)
            var v = serv.precio
            this.suma = this.suma - parseFloat(v)
            console.log(this.suma)
            this.identi.splice(index, 1)
            this.numServicios.splice(index, 1)
        },
        editPlan(){
            this.plan.servicios = this.identi
            this.cargando = true
            axios.put('/planes-entrenamiento/'+ this.ide, this.plan)
            .then(response => {
                console.log(response)
                this.errors= []
                this.cargando = false;
                Swal.fire({ 
                    title: 'Se ha editado el plan exitosamente',
                    icon: 'success',
                    timer: 2000,
                    onClose: () => {
                        this.$router.push('/planes');
                    }
                })           
            }).catch(error => {
                console.log(error)
                this.errors = (error.response.data.errors)
                this.cargando = false;
            })
            this.errors=[];
            this.loading = false;
        }
    }
}
</script>
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
                            <div class="col-lg-10">
                                <div class="card">
                                    <div class="card-header">
                                        <h4>Datos del miembro</h4></div>
                                        <div class="card-body card-block">
                                            <form method="post" @submit.prevent="addMiembros" class="ml-5 mr-5">
                                                <div class="row justify-content-around">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <error-list :errors="errors.nombre"></error-list>
                                                            <div class="input-group">
                                                                <label>Nombre</label>
                                                                <input type="text" name="nombre" id="nombre" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+" minlength="4"
                                                                class="form-control" v-model="nombre">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <error-list :errors="errors.apellidos"></error-list>
                                                            <div class="input-group">
                                                                <label>Apellidos</label>
                                                                <input type="text" name="apellidos" id="apellidos" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+" minlength="4"
                                                                class="form-control" v-model="apellidos">
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col">
                                                                <div class="form-group">
                                                                    <error-list :errors="errors.telefono"></error-list>
                                                                    <div class="input-group">
                                                                        <label>Telefóno</label>
                                                                        <input type="text" name="telefono" id="telefono" pattern="[0-9]+" minlength="4" maxlength="10"
                                                                        class="form-control" v-model="telefono">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col">
                                                                <div class="input-group">
                                                                    <label>Telefóno de emergencia </label>
                                                                    <input type="text" name="tel_emerg" id="tel_emerg" pattern="[0-9]+" minlength="4" maxlength="10"
                                                                    class="form-control" v-model="tel_emerg">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <error-list :errors="errors.email"></error-list>
                                                            <div class="input-group">
                                                                <label>Email</label>
                                                                <input type="text" name="email" id="email" class="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" minlength="4"
                                                                v-model="email">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <error-list :errors="errors.fecha_nacimiento"></error-list>
                                                            <div class="input-group">
                                                                <label>Fecha de nacimiento</label>
                                                                <input type="date" name="fecha_nacimiento" min="1959-01-01" max="2004-01-01"
                                                                id="fecha_nacimiento" class="form-control" v-model="fecha_nacimiento">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <error-list :errors="errors.sexo"></error-list>
                                                            <div class="input-group">
                                                                <label>Sexo</label>
                                                                <select v-model="sexo" class="form-control h-25">
                                                                    <option value="" disabled>Seleccionar sexo</option>
                                                                    <option v-for="item of seleccion" :key="item.id">
                                                                        {{item}}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <error-list :errors="errors.objetivo"></error-list>
                                                            <div class="input-group">
                                                                <label>Objetivo</label>
                                                                <select v-model="objetivo" class="form-control h-25">
                                                                    <option value="" disabled >Seleccionar objetivo</option>
                                                                    <option v-for="item of objetives" :key="item.id">
                                                                        {{item}}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <error-list :errors="errors.objetivo"></error-list>
                                                            <div class="input-group">
                                                                <label>Plan de alimentación</label>
                                                                <select v-model="planAlim_elegido" class="form-control h-25">
                                                                    <option value="" disabled >Seleccionar plan</option>
                                                                    <option v-for="item of plan_alimentacion" :key="item.id">
                                                                        {{item.nombre}}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <div class="form-group">
                                                                <div class="input-group">
                                                                    <label>Condición fisica <small>(Opcional)</small> </label>
                                                                    <textarea type="text" name="cond_fisica" id="cond_fisica" pattern="[0-9]+" minlength="4"
                                                                    class="form-control" v-model="cond_fisica"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col">
                                                                <div class="form-group">
                                                                <error-list :errors="errors.peso"></error-list>
                                                                <div class="input-group">
                                                                    <label>Peso en kilogramos <small>(Opcional)</small> </label>
                                                                    <input name="peso" id="peso" type="number" step="1" min="40" pattern="^[0-9]+"
                                                                    class="form-control" v-model="peso">
                                                                </div>
                                                            </div>
                                                            </div>
                                                            <div class="col">
                                                                <div class="form-group">
                                                                    <div class="input-group">
                                                                        <label>Estatura en metros <small>(Opcional)</small> </label>
                                                                        <input name="estatura" id="estatura" type="number" step="0.01" min="1.20"
                                                                        class="form-control" v-model="estatura">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <div class="row">
                                                                <div class="col">
                                                                    <div class="input-group">
                                                                        <label>Servicios <small>(Opcional)</small> </label>
                                                                        <select @change="selectServicio($event)" class="form-control h-25">
                                                                            <option selected="selected" >Seleccionar servicios</option>
                                                                            <option v-for="item of getServicios" :key='item.id' :value="item.id">{{item.nombre}}  -  ${{item.precio}}</option> 
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col">
                                                                    <div class="input-group">
                                                                        <label>Planes <small>(Opcional)</small> </label>
                                                                        <select @change="selectPlan($event)" class="form-control h-25">
                                                                            <option selected="selected" >Seleccionar plan</option>
                                                                            <option v-for="item of getPlanes" :key='item.id' :value="item.id">{{item.nombre}}  -  ${{item.precio}}</option> 
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
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
                                                                        <tr class="tr-shadow" v-for="(item,index) of consumo" :key="item.id">
                                                                            <td>{{item.nombre}}</td>
                                                                            <td>{{item.precio}}</td>
                                                                            <td>
                                                                                
                                                                                <button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" type="submit" @click.prevent="quitarServicio(index,item.id)">
                                                                                    <span class="zmdi zmdi-delete"></span>
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                        <br/>
                                                                        <div class="input-group">
                                                                            <error-list :errors="errors.meses"></error-list>
                                                                            <label>Meses de suscripción</label>
                                                                            <select @change="agregarMeses($event)" class="form-control h-25">
                                                                                <option selected="selected">Seleccionar meses</option>
                                                                                <option v-for="item of months" :key="item.id">{{item}}</option> 
                                                                            </select>
                                                                        </div>
                                                                        <label for="">&nbsp;&nbsp;&nbsp;&nbsp; Total por mes:</label>
                                                                        <label for="">&nbsp;&nbsp;&nbsp;&nbsp;${{this.sumaTotal}}</label>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <label>Rutinas <small>(Opcional)</small> </label>
                                                            <div class="table-responsive table--no-card m-b-30">
                                                                <table class="table table-borderless table-striped table-earning">
                                                                    <thead>
                                                                        <tr>
                                                                            <td>Nombre</td>
                                                                            <td>Descripcion</td>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <!-- <tr v-for="item of rutinas" :key="item.id"> -->
                                                                        <tr v-for="item of rutinas" :key="item.id">
                                                                            <td>{{item.nombre}}</td>
                                                                            <td>{{item.precio}}</td>
                                                                            <td class="text-center">
                                                                                <input type="checkbox" :value="item.id" v-model="postRutinas">
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
                                                    </div>
                                                </div>
                                                    <br/>
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
                                                        <span v-show="agregar" title="Cancelar" @click="agregar= !agregar" @click.prevent="limpiarDatos()" class="btn btn-danger btn-md content-aling-center">X</span>
                                                    </div>
                                                </div>
                                            </form>
                                                <br/>
                                                <br/>
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
                                +   Nuevo miembro
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
                    <div v-else class="table-responsive table-responsive-data2">
                        <table class="table table-data2">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellidos</th>
                                    <th>Telefono</th>
                                    <th>Telefono emergencia</th>
                                    <th>Fecha de registro</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="tr-shadow" v-for="(item,index) of datos" :key="item.id">
                                    <td><span>{{item.nombre}}</span></td>
                                    <td><span>{{item.apellidos}}</span></td>
                                    <td><span>{{item.telefono}}</span></td>
                                    <td><span>{{item.telefono_emergencia}}</span></td>
                                    <td><span>{{item.created_at}}</span></td>
                                    <td>
                                        <div class="table-data-feature justify-content-around">
                                            <router-link :to="'/ver-miembro/' + item.id">
                                                <button class="item" data-toggle="tooltip" data-placement="top" title="Ver más">
                                                    <span class="glyphicon glyphicon-zoom-in"></span> 
                                                </button>
                                            </router-link>

                                            <button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" type="submit" @click.prevent="deleteMiembros(index,item.id)">
                                                <span class="zmdi zmdi-delete"></span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-if="loading" class="row">
                        <div class="col"></div>
                        <div class="col">
                            <div class="w-50 h-50">
                                <i class="fas fa-spinner fa-spin" style="width:20; height:20"></i>
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

export default {
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList
    },
    data(){
        return {
            datos : [],
            agregar: false,
            cargando: false,
            errors: [],
            nombre: '',
            apellidos: '',
            telefono :'',
            fecha_nacimiento: '',
            email: '',
            cond_fisica: '',
            servicios: '',
            tel_emerg: '',
            sexo: '',
            estatura: '',
            peso: '',
            objetivo : '',
            getServicios: '',
            darServicios: [],
            darPlanes: [],
            getPlanes: [],
            arrayServicios: [],
            arrayPlanes: [],
            consumo: [],
            dinero: '',
            suma : 0,
            rutinas: [],
            postRutinas: [],
            mostrarServicios: [],
            mandarPlan: '',
            loading: false,
            seleccion: [
                'Hombre',
                'Mujer'
            ],
            months:[
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12'
            ],
            objetives: [
                'Perder peso',
                'Ganar masa muscular',
                'Incrementar fuerza'
            ],
            vacio:false,
            monto : '',
            meses: '',
            mesAnterior : 0,
            sumaAnterior : '',
            paginacion : {
                'total': 0,
                'current_page': 0,
                'per_page': 0,
                'last_page': 0,
                'from': 0,
                'to': 0
            },
            mesElegido : '',
            plan_alimentacion: [],
            planAlim_elegido: '',
            peId : '',
            sumaTotal: 0
        }
    },
    created(){
        this.verifyToken();
    },
    mounted(){
        this.obtenerDatos();
        this.obtenerServicios();
        this.obtenerPlanes();
        this.obtenerRutinas();
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
        obtenerServicios(){
            axios.get('/servicios')
            .then(response => {
                this.getServicios = response.data['data']
            }).catch(error => {
                console.log(error)
            })
        },
        obtenerRutinas(page){
            axios.get('/miembros/create?page='+page)
            .then(response => {
                console.log(response)
                this.paginacion = response.data.rutinas['pagination']
                this.plan_alimentacion = response.data.planes_alim
                this.rutinas = response.data.rutinas['data']
            }).catch(error => {
                console.log(error)
            })
        },
        obtenerPlanes(){
            axios.get('/planes-entrenamiento')
            .then(response => {
                //console.log(response)
                this.getPlanes = response.data['data']
            }).catch(error => {
                console.log(error)
            })
        },
        obtenerDatos(){
            this.loading= true
            axios.get('/miembros')
            .then((response) =>
            {      
                if(response.data['data'][0] == null){
                    this.loading = false;
                    console.log('vacio')
                    this.vacio = true;
                }else{
                    console.log(response.data)
                    this.vacio = false;
                    this.datos = response.data['data']
                    this.loading = false;
                }
            }).catch(function (error){
                console.log('Error: ' + error);
                this.loading = false
            })
        },
        addMiembros(){
            this.cargando = true
            //console.log(this.planAlim_elegido)
            console.log(this.mandarPlan)
            this.monto = this.suma  * this.meses
            //console.log(this.planAlim_elegido)
            if(this.planAlim_elegido !== ''){
                //console.log(this.planAlim_elegido)
                var pe = this.plan_alimentacion.find(element => element.nombre == this.planAlim_elegido)
                this.peId = pe.id
                //console.log(this.peId)
            }else{
                this.peId = null
            }
            axios.post('/miembros', {
                nombre: this.nombre,
                apellidos: this.apellidos,
                telefono: this.telefono,
                fecha_nacimiento : this.fecha_nacimiento,
                email : this.email,
                servicios : this.darServicios,
                condicion_fisica : this.cond_fisica,
                telefono_emergencia : this.tel_emerg,
                rutinas: this.postRutinas,
                plan_entrenamiento : this.mandarPlan,
                sexo: this.sexo,
                estatura :this.estatura,
                peso: this.peso,
                objetivo : this.objetivo,
                monto : this.suma,
                meses : this.mesElegido,
                plan_alimentacion : this.peId
            }).then(response => {
                this.cargando = false
                Swal.fire(
                    'Correcto',
                    'Se ha agregado un nuevo miembro exitosamente',
                    'success',
                    setTimeout(() => {
                        location.reload()
                    }, 2000)
                )
                let miembro = {
                    nombre: this.nombre,
                    apellidos: this.apellidos,
                    telefono: this.telefono,
                    telefono_emergencia : this.tel_emerg,
                    id_plan_entrenamiento : this.plan
                }
                this.datos.unshift(miembro)
            }).catch(error => {
                this.cargando = false
                this.errors = (error.response.data.errors)
                console.log(error)
            })
            this.errors = []
        },
        deleteMiembros(index,id){
            Swal.fire({
            title: '¿Desea eliminar a este miembro?',
            text: "¡Esta acción no se podrá revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
            }).then((result) => {
            if (result.value) {
                axios.delete('/miembros/'+ id)
                .then(response => {
                    this.datos.splice(index, 1)
                    Swal.fire(
                    '¡Eliminado!',
                    'El miembro ha sido eliminado.',
                    'success'
                    )
                }).catch(error => {
                    alert('Ha ocurrido un error: ' + error)
                })
            }
            })
        },
        selectServicio(e){
            var id = e.target.value
            var servicio = this.getServicios.find(element => element.id == id)
            var valor = servicio.precio
            if(this.arrayServicios == ''){
                this.suma = this.suma + parseFloat(valor)
                this.sumaTotal = this.suma
                this.arrayServicios.push(servicio)
                this.consumo.push(servicio)
                this.darServicios.push(parseInt(id, 10))
            }else{
                if(this.arrayServicios.find(element => element.id == id) ){
                    Swal.fire({ 
                        title: 'Este servicio ya existe dentro del plan',
                        icon: 'warning',
                    })  
                }else{
                    this.suma = this.suma + parseFloat(valor)
                    this.sumaTotal = this.suma
                    this.arrayServicios.push(servicio)
                    this.consumo.push(servicio)
                    this.darServicios.push(parseInt(id, 10))
                }
            }
        },
        selectPlan(e){
            var id = e.target.value
            var plan = this.getPlanes.find(element => element.id == id)
            var valor = plan.precio
            if(this.arrayPlanes.find(element => element.id == id) ){
                Swal.fire({ 
                    title: 'Este plan ya existe',
                    icon: 'warning',
                })  
            }else{
                this.suma = this.suma + parseFloat(valor)
                this.sumaTotal = this.suma
                var idplan = parseInt(id) + 10
                plan.id = idplan
                this.arrayPlanes.push(plan)
                this.consumo.push(plan)
                this.mandarPlan = (parseInt(id, 10))
                }
        },
        darRutinas(e){
            var id = e.target.value
            var rut = this.rutinas.find(element => element.id == id)
            this.postRutinas.push(id)
        },
        limpiarDatos(){
            this.nombre = '',
            this.apellidos = '',
            this.telefono = '',
            this.cond_fisica = '',
            this.tel_emerg = '',
            this.sexo = '',
            this.peso = '',
            this.objetivo = '',
            this.fecha_nacimiento = '',
            this.email = '',
            this.arrayServicios = [],
            this.darServicios = [],
            this.consumo = [],
            this.arrayPlanes = [],
            this.suma = 0,
            this.errors = [],
            this.mandarPlan = '',
            this.estatura = ''
        },
        quitarServicio(index,id){
            var serv = this.consumo.find(element => element.id == id)
            var v = serv.precio
            this.suma = this.suma - parseFloat(v)
            this.consumo.splice(index, 1)
            // var nombre = this.arrayServicios.find(element => element.nombre == serv.nombre)
            this.arrayServicios.forEach(element=>{
                if(element.nombre == serv.nombre){
                    this.arrayServicios.splice(serv,1)
                }
            })
            this.arrayPlanes.forEach(element => {
                if(element.nombre == serv.nombre){
                    this.arrayPlanes.splice(serv,1)
                }
            })
        },
        agregarMeses(e){
            this.mesElegido = e.target.value
            if(this.mesElegido == 1){
                this.sumaTotal = this.suma
                this.mesAnterior = this.mesElegido
            } else if(this.mesElegido > this.mesAnterior){
                this.sumaAnterior = this.sumaTotal
                this.sumaTotal = this.suma * parseFloat(this.mesElegido)
                this.mesAnterior = this.mesElegido
                // this.mesAnterior = this.mesElegido
                // this.sumaAnterior = this.suma
                // this.suma = this.suma * parseFloat(this.mesElegido)
            } else if(this.mesElegido < this.mesAnterior){
                this.sumaTotal = this.suma * parseFloat(this.mesElegido)
                this.mesAnterior = this.mesElegido
                //this.suma = this.sumaAnterior * parseFloat(this.mesAnterior)
            }
        },
        changePage(page){
            this.paginacion.current_page = page;
            this.obtenerRutinas(page);
        }
    }
};
</script>
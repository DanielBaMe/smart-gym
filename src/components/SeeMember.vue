<template>
<div class="page-wrapper">
    <HeaderMobile/>
    <MenuSidebar/>
    <div class="page-container">
        <HeaderDesktop/>
        <div class="main-content">
            <div class="col-lg-3">
                <button @click="$router.go(-1)" class="btn btn-primary btn-sm glyphicon glyphicon-arrow-left" title="Atrás">
                </button>
            </div>
            <br/>
            <div v-if="!loading" class="row w-100">
                <div class="col"></div>
                <div class="col-lg-10" v-if="pagar">
                    <div class="card">
                        <div class="card-header">
                            <h3>{{miembro.nombre}}</h3>
                        </div>
                        <div class="card-body">
                            <div class="row justify-content-around">
                                <div class="col-md-6">
                                    <div v-if="er" class="alert alert-danger w-100">
                                        {{ error_message}}
                                        <br/>
                                    </div>
                                    <div class="form-group">
                                        <error-list :errors="errors.nombre"></error-list>
                                        <label class="control-label mb-1">Nombre</label> 
                                        <input name='nombre' id='nombre' class="form-control" type="text"
                                        pattern="[a-zA-Z\s]+" title="Solo letras."
                                        v-model="miembro.nombre" minlength="4" maxlength="20"  :disabled="validated">
                                        <br/>  
                                    </div>
                                    <div class="form-group">
                                        <error-list :errors="errors.precio"></error-list>
                                        <label class="control-label mb-1">Apellidos</label>  
                                        <input name='apellidos' id='apellidos' class="form-control" type="text" step="0.01"
                                        v-model="miembro.apellidos"  :disabled="validated"> 
                                        <br/>
                                    </div>
                                    <div class="form-group">
                                        <error-list :errors="errors.precio"></error-list>
                                        <label class="control-label mb-1">Telefono</label>  
                                        <input name='telefono' id='telefono' class="form-control" type="number" step="0.01"
                                        v-model="miembro.telefono"  :disabled="validated"> 
                                        <br/>
                                    </div>
                                    <div class="form-group">
                                        <error-list :errors="errors.precio"></error-list>
                                        <label class="control-label mb-1">Tel. emergencia</label>  
                                        <input name='telefono_emergencia' id='telefono_emergencia' class="form-control" type="text"
                                        v-model="this.telefono"  :disabled="validated"> 
                                        <br/>
                                    </div>
                                    <div class="form-group">
                                        <error-list :errors="errors.precio"></error-list>
                                        <label class="control-label mb-1">Email</label>  
                                        <input name='email' id='email' class="form-control" type="text"
                                        v-model="miembro.email"  :disabled="validated"> 
                                        <br/>
                                    </div>
                                    <div class="form-group">
                                        <error-list :errors="errors.descripcion"></error-list>
                                        <label class="control-label mb-1">Condicion fisica</label>    
                                        <textarea type="text" name="condicion_fisica" id="condicion_fisica" pattern="[0-9]+" minlength="4"
                                        class="form-control" v-model="this.condicion" :disabled="validated"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <error-list :errors="errors.descripcion"></error-list>
                                        <label class="control-label mb-1">Plan de entrenamiento</label> 
                                        <input name='id_plan_entrenamiento' id='id_plan_entrenamiento' class="form-control" type="text"
                                        v-model="this.nombrePlan"  :disabled="validated">    
                                    </div>
                                    <div class="form-group">
                                        <error-list :errors="errors.descripcion"></error-list>
                                        <label class="control-label mb-1">Servicios dentro del plan</label>    
                                        <ul v-if="!pe">
                                            <li v-for="item of serviciosPlan" :key="item.id">
                                                {{item.nombre}}
                                            </li>
                                        </ul>
                                        <span v-else>
                                            <br/>NA
                                        </span>
                                    </div>
                                    <div class="form-group">
                                        <error-list :errors="errors.descripcion"></error-list>
                                        <label class="control-label mb-1">Plan de alimentación</label>  
                                        <input name='id_plan_alimentacion' id='id_plan_alimentacion' class="form-control" type="text"
                                        v-model="pa"  :disabled="validated"> 
                                    </div>
                                    <div class="form-group">
                                        <error-list :errors="errors.descripcion"></error-list>
                                        <label class="control-label mb-1">Rutinas</label>    
                                        <ul v-if="!rtns">
                                            <li v-for="item of rutinas" :key="item.id">
                                                {{item.nombre}}
                                            </li>
                                        </ul>
                                        <span v-else>
                                            <br/>NA
                                        </span>
                                    </div>
                                    <div class="form-group">
                                        <error-list :errors="errors.descripcion"></error-list>
                                        <label class="control-label mb-1">Servicios</label>    
                                        <ul v-if="!servs">
                                            <li v-for="item of servicios" :key="item.id">
                                                {{item.nombre}}         {{item.precio}}
                                            </li>
                                        </ul>
                                        <span v-else>
                                            <br/>NA
                                        </span>
                                    </div>
                                    <div class="form-group">
                                        <error-list :errors="errors.descripcion"></error-list>
                                        <label class="control-label mb-1">Fecha de nacimiento</label>    
                                        <input name='fecha_nacimiento' id='fecha_nacimiento' class="form-control" type="date"
                                        v-model="miembro.fecha_nacimiento"  :disabled="validated"> 
                                    </div>
                                </div>
                            <br/>
                            </div>
                            <br/>
                            <div class="table-responsive table--no-card m-b-30">
                                <h2 class="control-label mb-1">Pagos realizados</h2>    
                                <table class="table table-borderless table-striped table-earning">
                                    <thead>
                                        <tr>
                                            <th>Fecha inicio</th>
                                            <th>Fecha final</th>
                                            <th>Meses</th>
                                            <th>Monto</th>
                                            <th>Servicios</th>
                                            <th>Plan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item of pagos" :key="item.id">
                                            <td>{{item.fecha_inicio | delimitar}}</td>
                                            <td>{{item.fecha_fin | delimitar}}</td>
                                            <td>{{item.meses}}</td>
                                            <td>{{item.monto}}</td>
                                            <td v-if="!servs">
                                                <span v-for="item of item.servicios" :key="item.id" class="badge badge-pill badge-info">
                                                    {{item.nombre}} 
                                                </span>
                                            </td>
                                            <td v-else>
                                                NA
                                            </td>
                                            <td v-if="!pe">{{item.plan_entrenamiento['nombre']}}</td>
                                            <td v-else>
                                                NA
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button class="btn btn-info" @click="pagar = !pagar">
                                    Actualizar ultimo pago
                                </button>
                            </div>
                            <br/>
                        </div>
                    </div>
                </div>
                <div v-else class="col-lg-10">
                    <div class="card">
                        <div class="card-header">
                            <h4>Actualizar ultimo pago</h4></div>
                            <div class="card-body card-block">
                                <form method="post" @submit.prevent="updatePago" class="ml-5 mr-5">
                                    <div class="row justify-content-between">
                                        <div class="col-md-6">                                                       
                                            <div class="form-group">
                                                <error-list :errors="errors.descripcion"></error-list>
                                                <label class="control-label mb-1">Servicios</label>    
                                                <ul v-if="!servs">
                                                    <li v-for="item of servicios" :key="item.id">
                                                        {{item.nombre}}
                                                    </li>
                                                </ul>
                                                <span v-else>
                                                    <br/>NA
                                                </span>
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.descripcion"></error-list>
                                                <label class="control-label mb-1">Plan de entrenamiento</label> 
                                                <input name='id_plan_entrenamiento' id='id_plan_entrenamiento' class="form-control w-50" type="text"
                                                v-model="this.nombrePlan"  :disabled="validated">    
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.descripcion"></error-list>
                                                <label class="control-label mb-1">Servicios dentro del plan</label>    
                                                <ul v-if="!pe">
                                                    <li v-for="item of serviciosPlan" :key="item.id">
                                                        {{item.nombre}}
                                                    </li>
                                                </ul>
                                                <span v-else>
                                                    <br/>NA
                                                </span>
                                            </div>
                                            <div class="form-group" v-if="!editar">
                                                <error-list :errors="errors.meses"></error-list>
                                                <label class="control-label mb-1">Meses de suscripción</label>
                                                <select @change="agregarMeses($event)" class="form-control h-25 w-50">
                                                    <option selected="selected" >Seleccionar meses</option>
                                                    <option v-for="item of months" :key="item.id">{{item}}</option> 
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6" v-show="!editar">
                                            <input type="radio" id="uno" value="Uno" v-model="editar">
                                            <label class="h-25">Agregar/quitar servicios o planes</label>
                                        </div>
                                        <div class="col-md-6" v-show="editar">
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
                                                        <br/>
                                                        <div class="input-group">
                                                            <error-list :errors="errors.meses"></error-list>
                                                            <label>Meses de suscripción</label>
                                                            <select @change="agregarMeses($event)" class="form-control h-25">
                                                                <option selected="selected" >Seleccionar meses</option>
                                                                <option v-for="item of months" :key="item.id">{{item}}</option> 
                                                            </select>
                                                        </div>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col"></div>
                                        <div class="col-auto">
                                            <h3>Total</h3>
                                            <h1>$ {{this.suma}}</h1>
                                        </div>
                                        <div class="col"></div>
                                    </div>
                                        <br/>
                                        <br/>
                                        <br/>
                                    <div class="row">
                                        <div class="col-auto mr-auto">
                                            <button class="btn btn-success btn-md" v-if="!cargando" type="submit">Pagar</button>
                                            <button v-else disabled class="btn btn-info btn-md">
                                                <i class="fas fa-circle-notch fa-spin"></i>
                                                Enviando pago...
                                            </button>
                                        </div>
                                        <div class="col-auto">
                                            <span title="Cancelar" @click="agregar= !agregar" @click.prevent="limpiarDatos()" class="btn btn-danger btn-md content-aling-center">X</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                    </div>
                </div>
                <div class="col"></div>
            </div>
            <div v-else >
                <div class="row">
                    <div class="col"></div>
                    <div class="col align-self-center">
                        <i class="fas fa-spinner fa-spin"></i>
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
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList
    },
    data(){
        return{
            miembro: [],
            er: '',
            validated: true,
            error_message: '',
            errors: [],
            serviciosPlan: [],
            nombrePlan: '',
            servicios: [],
            rutinas : [],
            loading: false,
            pe: false,
            rtns: false,
            pa: '',
            telefono: '',
            servs: false,
            condicion : '',
            cf: '',
            pagos : [],
            pagar : true,
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
            editar : false,
            suma: 0,
            consumo : [],
            meses : '',
            cargando: false,
            agregar: false,
            lastPayment : '',
            montoActual : '',
            mesElegido : '',
            mesAnterior : 0,
            montoOriginal : 0,
            arrayServicios : [],
            sumaTotal : '',
            arrayPlanes : [],
            mandarPlan : ''
        }
    },
    created(){
        this.verifyToken();
    },
    mounted(){
        this.obtenerDatos();
        this.obtenerPagos();
        this.obtenerServicios();
        this.obtenerPlanes();
    },
    filters:{
        delimitar(valor){
            if((valor.split('').length) > 11){
                return valor.slice(0,11)
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
        obtenerServicios(){
            axios.get('/servicios')
            .then(response => {
                this.getServicios = response.data['data']
            }).catch(error => {
                console.log(error)
            })
        },
        obtenerPlanes(){
            axios.get('/planes-entrenamiento')
            .then(response => {
                this.getPlanes = response.data['data']
            }).catch(error => {
                console.log(error)
            })
        },
        obtenerDatos(){
            this.loading = true
            this.ide = this.$route.params.id;
            axios.get('/miembros/' + this.ide)
            .then((response) =>
            {  
                this.loading = false
                this.miembro = response.data;
                this.lastPayment = this.miembro.ultimo_pago['monto']
                this.montoOriginal = parseInt(this.lastPayment)
                this.suma = this.montoOriginal
                this.servicios = response.data.ultimo_pago['servicios'];
                this.cf = this.miembro.condicion_fisica;
                if(this.miembro.telefono_emergencia == null){
                    this.telefono = 'NA'
                }else {
                    this.telefono = this.miembro.telefono_emergencia;
                }

                this.rutinas = this.miembro.rutinas;
                if(this.rutinas[0] == null){
                    this.rtns = true;
                }

                if(this.cf == null){
                    this.condicion = 'NA'
                } else {
                    this.condicion = this.cf
                }

                if(this.servicios[0] == null){
                    this.servs = true;
                    this.servicios = 'NA'
                } else if(this.servicios.length > 1){
                    for (let index = 0; index < this.servicios.length; index++) {
                        this.consumo.push(this.servicios[index])
                        this.arrayServicios.push(this.servicios[index])
                    }
                    console.log(this.consumo)
                } else {
                    var serv = Array.from(this.servicios)
                    this.consumo.push(this.servicios[0])
                }

                if(this.miembro.ultimo_pago['plan_entrenamiento'] == null){
                    this.pe = true
                    this.nombrePlan = 'NA'
                    this.serviciosPlan = 'NA'
                } else {
                    var svp = this.miembro.ultimo_pago['plan_entrenamiento']
                    this.consumo.push(svp)
                    this.pe = false
                    this.serviciosPlan = svp.servicios
                    this.nombrePlan = svp.nombre
                }

                if(this.miembro.id_plan_alimentacion == null){
                    this.pa = 'NA'
                } else {
                    this.pa = this.miembro.id_plan_alimentacion
                }
            }).catch(error => {
                this.loading = false
                console.log('Error:'+  error)
            })
        },
        obtenerPagos(){
            axios.get('/miembros/' + this.ide + '/pagos')
            .then(response => {
                this.pagos = response.data
            })
        },
        limpiarDatos(){
            this.pagar = false,
            this.arrayServicios = [],
            this.darServicios = [],
            this.consumo = [],
            this.arrayPlanes = [],
            this.suma = 0,
            this.errors = [],
            this.mandarPlan = '',
            this.pagar = true
        },
        agregarMeses(e){
            this.mesElegido = e.target.value
            if(this.mesElegido == 1){
                this.suma = this.montoOriginal
                this.mesAnterior = this.mesElegido
            } else if(this.mesElegido > this.mesAnterior){
                this.sumaAnterior = this.suma
                this.suma = this.suma * parseFloat(this.mesElegido)
                this.mesAnterior = this.mesElegido
            } else if(this.mesElegido < this.mesAnterior){
                this.suma = this.suma * parseFloat(this.mesElegido)
                this.mesAnterior = this.mesElegido
            }
        },
        updatePago(){
            this.cargando = true;
            // if(this.servicios.length > 1){
            //     this.servicios.forEach(element => {
            //         this.darServicios.push(element.id)
            //     })
            // } else {
            //     var idServicio = this.servicios[0]
            //     this.darServicios = idServicio.id
            //     console.log(this.darServicios)
            // }
            axios.post('/miembros/'+ this.ide +'/pagos/' + this.miembro.ultimo_pago['id'],{
                meses : this.mesElegido,
                monto : this.suma,
                servicios : this.darServicios,
                plan_entrenamiento : this.mandarPlan
            }).then(response => {
                this.cargando = false
                this.pagar = true
                Swal.fire(
                    'Correcto',
                    'Se ha generado el pago del miembro exitosamente',
                    'success',
                )
                console.log(response)
            }).catch(error => {
                console.log(response)
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
        quitarServicio(index,id){
            var serv = this.consumo.find(element => element.id == id)
            var v = serv.precio
            this.sumaTotal = this.suma
            this.consumo.splice(index, 1)
            // var nombre = this.arrayServicios.find(element => element.nombre == serv.nombre)
            this.arrayServicios.forEach(element=>{
                if(element.nombre == serv.nombre){
                    this.suma = this.suma - parseFloat(v)
                    this.darServicios.splice(serv,1)
                }
            })
            this.arrayPlanes.forEach(element => {
                if(element.nombre == serv.nombre){
                    this.suma = this.suma - parseFloat(v)
                    //this.arrayPlanes.splice(serv,1)
                }
            })
        }
    }

}
</script>
<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div v-show="pagar">
                    <div class="row align-items-start">
                        <div class="col"></div>
                        <div class="col"></div>
                            <div class="col-lg-10">
                                <div class="card">
                                    <div class="card-header">
                                        <h4>Pagar carrito de {{this.pagoMiembro}}</h4></div>
                                        <div class="card-body card-block">
                                            <form method="post" @submit.prevent="pagarMiembro" class="ml-5 mr-5">
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
                                                                        <td>Index</td>
                                                                        <td>Nombre</td>
                                                                        <td>Precio</td>
                                                                        <td>Quitar</td>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr class="tr-shadow" v-for="(item,index) of consumo" :key="item.id">
                                                                        <td>{{index}}</td>
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="tr-shadow" v-for="(item,index) of datos" :key="item.id">
                                    <td><span>{{item.nombre}}</span></td>
                                    <td><span>{{item.apellidos}}</span></td>
                                    <td>
                                        <div class="table-data-feature justify-content-around">
                                            <button class="item" data-toggle="tooltip" data-placement="top" title="Generar cobro" type="submit" @click.prevent=crearPago(item.id) >
                                                <i class="fas fa-credit-card"></i>
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
            editar : false,
            validated : true,
            vacio : false,
            datos : [],
            loading : false,
            pagoMiembro : [],
            pagar : false,
            agregar: false,
            getPlanes : [],
            getServicios : [],
            consumo : [],
            errors : [],
            meses : '',
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
            suma : 0,
            cargando: false,
            servicios : [],
            pe : '',
            nombrePlan : '',
            serviciosPlan: [],
            pe: false,
            servs: false,
            montoActual : '',
            mesElegido : '',
            mesAnterior : 0,
            suma : 0,
            ventana : false,
            montoOriginal : 0,
            ide: '',
            darServicios: [],
            arrayServicios : [],
            monto: 0
        }
    },
    created(){
        this.verifyToken();
    },
    mounted(){
        this.obtenerDatos();
        this.obtenerServicios();
        this.obtenerPlanes();
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
                    this.vacio = false;
                    this.datos = response.data['data']
                    this.loading = false;
                }
            }).catch(function (error){
                console.log('Error: ' + error);
                this.loading = false
            })
        },
        crearPago(id){
            this.ide = id
            this.ventanaPago(true)
            axios.get('/miembros/' + id)
            .then(response => {
                this.pagoMiembro = response.data.nombre
            }).catch(error => {
                this.ventanaPago(false)
                console.log(error)
            })

            axios.get('/miembros/' + id + '/pagos')
            .then(response => {
                var Nuevoarreglo = response.data
                console.log(Nuevoarreglo)
                var arreglo = Nuevoarreglo[Nuevoarreglo.length-1]

                this.pagar = true
                this.servicios = arreglo.servicios;

                if(this.servicios[0] == null){
                    this.servs = true;
                    this.servicios = 'NA'
                }  else if(this.servicios.length > 1){
                    this.servicios.forEach(element => {
                        this.darServicios.push(element.id)
                        this.montoOriginal = this.montoOriginal + parseFloat(element.precio)
                    })
                    for (let index = 0; index < this.servicios.length; index++) {
                        this.consumo.push(this.servicios[index])
                        this.arrayServicios.push(this.servicios[index])
                    }
                    console.log(this.arrayServicios)
                }
                // else {
                //     var serv = Array.from(this.servicios)
                //     this.consumo.push(this.servicios[0])
                // }
                //else {
                //     this.servicios.forEach(element => {
                //         this.montoOriginal = this.montoOriginal + parseFloat(element.precio)
                // })
                // }
                this.suma = this.montoOriginal

                if(arreglo.plan_entrenamiento == null){
                    this.pe = true
                    this.nombrePlan = 'NA'
                    this.serviciosPlan = 'NA'
                } else {
                    this.pe = false
                    this.mandarPlan = arreglo.plan_entrenamiento["id"]
                    this.serviciosPlan = arreglo.plan_entrenamiento["servicios"]
                    this.nombrePlan = arreglo.plan_entrenamiento["nombre"]
                }
                this.ventanaPago(false)
                }).catch(error => {
                    console.log(error)
                })

        },
        agregarMeses(e){
            this.mesElegido = e.target.value
            if(this.mesElegido == 1){
                this.suma = this.montoOriginal
                this.mesAnterior = this.mesElegido
            } else if(this.mesElegido > this.mesAnterior){
                this.sumaAnterior = this.suma
                this.suma = this.montoOriginal * parseFloat(this.mesElegido)
                //this.suma = this.suma * parseFloat(this.mesElegido)
                this.mesAnterior = this.mesElegido
            } else if(this.mesElegido < this.mesAnterior){
                this.suma = this.montoOriginal * parseFloat(this.mesElegido)
                //this.suma = this.sumaAnterior * parseFloat(this.mesElegido)
                this.mesAnterior = this.mesElegido
            }
        },
        limpiarDatos(){
            this.pagar = false,
            this.arrayServicios = [],
            this.darServicios = [],
            this.consumo = [],
            this.arrayPlanes = [],
            this.suma = 0,
            this.errors = [],
            this.mandarPlan = ''
        },
        ventanaPago(ventana){
            if(ventana === true){
                Swal.fire({
                    title: 'Procesando información de pago.',
                    width: 600,
                    padding: '3em',
                    background: '#fff',
                    showConfirmButton: false
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Listo!',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        },
        pagarMiembro(){
            this.cargando = true;
            // this.servicios.forEach(element => {
            //     this.darServicios.push(element.id)
            // })
            console.log(this.darServicios)

            //Generar nuevo pago
            // axios.post('/miembros/'+ this.ide +'/pagos',{
            //     meses : this.mesElegido,
            //     monto : this.suma,
            //     servicios : this.darServicios,
            //     plan_entrenamiento : this.mandarPlan
            // }).then(response => {
            //     this.cargando = false
            //     this.pagar = false
            //     Swal.fire(
            //         'Correcto',
            //         'Se ha generado el pago del miembro exitosamente',
            //         'success',
            //     )
            //     console.log(response)
            // }).catch(error => {
            //     console.log(response)
            // })
        },
        selectServicio(e){
            var id = e.target.value
            var servicio = this.getServicios.find(element => element.id == id)
            var valor = servicio.precio
            console.log(this.arrayServicios)
            if(this.arrayServicios == ''){
                this.suma = this.suma + parseFloat(valor)
                this.montoOriginal = this.suma
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
                    this.montoOriginal = this.suma
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
                var idplan = parseInt(id) + 10
                plan.id = idplan
                this.arrayPlanes.push(plan)
                this.consumo.push(plan)
                this.mandarPlan = (parseInt(id, 10))
                }
        },
        quitarServicio(index,id){
            console.log(index)
            console.log(id)
            var serv = this.consumo.find(element => element.id == id)
            var v = serv.precio
            this.consumo.splice(index, 1)
            this.arrayServicios.forEach(element=>{
                if(element.id == serv.id){
                    this.suma = this.suma - parseFloat(v)
                    this.montoOriginal = this.suma
                    this.arrayServicios.splice(index,1)
                    this.darServicios.splice(index,1)
                    console.log(this.arrayServicios)
                    console.log(this.darServicios)
                    
                }
            })
            // this.arrayPlanes.forEach(element => {
            //     if(element.nombre == serv.nombre){
            //         this.suma = this.suma - parseFloat(v)
            //         this.arrayPlanes.splice(serv,1)
            //     }
            // })
        }
    }
};
</script>

<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div class="modal fade" id="agregarServiceModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
                  <form @submit.prevent="addService" class="ml-5 mr-5">
                    <div class="modal-dialog modal-lg" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="mediumModalLabel">Agregar un servicio</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div class="form-group">
                              <error-list :errors="errors.nombre"></error-list>
                              <div class="input-group">
                                  <label class="control-label mb-1">Nombre</label>
                                  <input type="text" name="servicio" id="servicio"
                                  class="form-control" v-model="servicio.nombre"  pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s]+"
                                  title="Solo números y letras.">
                              </div>
                          </div>
                          <div class="form-group">
                              <error-list :errors="errors.precio"></error-list>
                              <div class="input-group">
                                  <label class="control-label mb-1">Precio</label>
                                  <input type="number" step="0.50" name="precio" id="precio" placeholder="$1.50"
                                  class="form-control" min="0" v-model="servicio.precio">
                              </div>
                          </div>
                          <div class="form-group">
                              <error-list :errors="errors.descripcion"></error-list>
                              <div class="input-group">
                                  <label class="control-label mb-1">Descripcion</label>
                                  <textarea type="text" max="50" name="descripcion" id="descripcion"
                                  class="form-control" v-model="servicio.descripcion" rows="5"  pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s]+"></textarea>
                              </div>
                          </div>
                        </div>
                        <br/>
                        <div class="modal-footer">
                          <button v-if="!agregandoServicio" type="button" class="btn btn-danger" data-dismiss="modal" @click.prevent="limpiarServicio">Cancelar</button>
                          <button v-if="!agregandoServicio" type="submit" class="btn btn-primary">Agregar</button>
                          <button v-if="agregandoServicio" disabled class="btn btn-primary">Agregando...</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div class="col-md-12 m-3">
                    <div class="table-data__tool">
                        <div class="table-data__tool-left">
                            <button @click="$router.go(-1)" class="btn btn-primary btn-sm glyphicon glyphicon-arrow-left" title="Atrás">
                            </button>
                        </div>
                        <div class="table-data__tool-right">
                            <button class="btn btn-info btn-sm content-aling-center" data-toggle="modal" data-target="#agregarServiceModal">
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
                                    <tr class="tr-shadow" v-for="(item,index) of servicios" :key="item.id">
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

                                                <button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" type="submit" @click.prevent="eliminarServicio({index, id: item.id})">
                                                    <span class="zmdi zmdi-delete"></span>
                                                </button>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <NavPagination
                              v-if="servicios && servicios.length > 0"
                              :pagination="paginacionServicios"
                              action="obtenerServicios" />
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

import NavPagination from './nav-pagination'

import Service from '../models/Services'

export default {
    name: 'Servicios',
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList,
        NavPagination
    },
    data(){
        return{
            ide: '',
            er: false,
            loading : false,
            vacio : false,
        };
    },
    created(){
        this.verifyToken();
    },
    mounted(){
        this.obtenerServicios(1);
    },
    computed :{
        ...mapState([
            'servicio',
            'servicios',
            'paginacionServicios',
            'agregandoServicio',
            'errors'
        ])
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
            'getToken',
            'limpiarServicio',
            'obtenerServicios',
            'agregarServicio',
            'eliminarServicio'
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
        addService(){
            this.agregarServicio(this.servicio)
        }
    }
}

</script>

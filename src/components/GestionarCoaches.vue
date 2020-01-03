<template>
  <div class="page-wrapper">
    <HeaderMobile/>
    <MenuSidebar/>
    <div class="page-container">
      <HeaderDesktop/>
      <div class="main-content">
        <div class="modal fade" id="agregarCoachModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
          <form @submit.prevent="submitFormulario" class="ml-5 mr-5">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="mediumModalLabel">Agregar un coach</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <error-list :errors="errors.nombre"></error-list>
                    <label class="control-label mb-1">Nombre del coach </label>
                    <input type="text" name="nombre" id="nombre"
                      class="form-control" v-model="coach.nombre" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label mb-1">Biografía <small>(opcional)</small> </label>
                    <textarea type="text" name="biografia"
                    id="biografia" class="form-control" v-model="coach.biografia" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+"></textarea>
                  </div>
                  <div class="form-group">
                    <error-list :errors="errors.email"></error-list>
                    <label class="control-label mb-1">Email </label>
                    <input type="email" name="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    class="form-control" v-model="coach.email" required>
                  </div>
                  <div class="form-group">
                    <error-list :errors="errors.horarios"></error-list>
                    <label class="control-label mb-1">Horarios </label>
                    <small>El horario de servicio es de {{ horario }}</small>
                    <br/>
                    <div class="row justift-center">
                      <div class="col">
                        <label class="control-label mb-1">Entrada</label>
                        <input type="time"
                        name="entrada" id="entrada" class="form-control" v-model="horario_entrada" :min="hora_entrada" :placeholder="hora_entrada" required>
                      </div>
                      <div class="col">
                        <label class="control-label mb-1">Salida</label>
                        <input type="time"
                        name="salida" id="salida" class="form-control" v-model="horario_salida" :min="hora_salida" :placeholder="hora_salida" required>
                      </div>
                    </div>
                  </div>
                  <br/>
                </div>
                <div class="modal-footer">
                  <button v-if="!agregandoCoach" type="button" class="btn btn-danger" data-dismiss="modal" @click.prevent="limpiarCoach">Cancelar</button>
                  <button v-if="!agregandoCoach" type="submit" class="btn btn-primary">Agregar</button>
                  <button v-if="agregandoCoach" disabled class="btn btn-primary">Agregando...</button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="col-md-12 m-3">
          <div class="table-data__tool">
            <div class="table-data__tool-left">
              <button @click="$router.go(-1)" class="btn btn-primary btn-sm glyphicon glyphicon-arrow-left" title="Atrás"></button>
            </div>
            <div class="table-data__tool-right">
              <button class="btn btn-info btn-sm content-aling-center" data-toggle="modal" data-target="#agregarCoachModal">
                  +   Nuevo coach
              </button>
            </div>
          </div>
          <div class="col-md-12">
            <div v-if="obteniendoCoaches" class="col-md-12">
              <p class="text-center">
                <i class="fas fa-spinner fa-spin"></i> Obteniendo datos...
              </p>
            </div>
            <div v-else-if="coaches && coaches.length > 0" class="table-responsive table-responsive-data2">
              <table class="table table-data2">
                <thead>
                  <tr>
                    <th >Nombre</th>
                    <th >Correo</th>
                    <th >Horarios</th>
                    <th >Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="tr-shadow" v-for="(coach, index) in coaches" :key="coach.id">
                    <td>{{ coach.nombre }}</td>
                    <td>{{ coach.email }}</td>
                    <td>{{ coach.horarios }}</td>
                    <td>
                      <div class="table-data-feature justify-content-around">
                        <button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" type="submit" @click.prevent="eliminarCoach({index, id: coach.id})">
                          <span class="zmdi zmdi-delete"></span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <NavPagination
                v-if="coaches && coaches.length > 0"
                :pagination="paginacionCoaches"
                action="obtenerCoaches" />
            </div>
            <div v-else class="table-responsive table-responsive-data2">
              <p class="alert alert-info">No hay datos para mostrar</p>
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

import NavPagination from './nav-pagination'

import { mapState, mapActions } from 'vuex';

import Coach from '../models/Coach'

export default {
  components: {
    HeaderMobile,
    MenuSidebar,
    HeaderDesktop,
    'error-list': ErrorsList,
    NavPagination
  },
  computed: {
    ...mapState([
      'gimnasio',
      'coach',
      'obteniendoCoaches',
      'agregandoCoach',
      'coaches',
      'paginacionCoaches',
      'errors'
    ])
  },
  data(){
    return {
      horario_entrada: '',
      horario_salida: '',
      hora_entrada: '',
      hora_salida: '',
      horario: '',
      horas: new Array()
    }
  },
  mounted(){
    this.obtenerCoaches(1)
    this.horarios()
  },
  methods:{
    ...mapActions([
      'obtenerCoaches',
      'eliminarCoach',
      'agregarCoach',
      'limpiarCoach'
    ]),
    submitFormulario() {

      this.coach.horarios = `${this.horario_entrada}-${this.horario_salida}`
      this.agregarCoach(this.coach)
      this.horario_entrada = ''
      this.horario_salida = ''
    },
    horarios: function() {

      this.horas        = String(this.gimnasio.h_servicios).split('-')
      this.hora_entrada = this.horas[0]
      this.hora_salida  = this.horas[1]
      this.horario = `${this.formatTime(this.horas[0])} a ${this.formatTime(this.horas[1])}`

    },
    formatTime(time) {

      var horas   = new String(time).split(':')[0]
      var minutos = new String(time).split(':')[1]

      var date = new Date()
      date.setHours(horas)
      date.setMinutes(minutos)

      var hours   = date.getHours()
      var minutes = date.getMinutes()
      var ampm    = hours >= 12 ? 'pm' : 'am'

      hours   = hours % 12
      hours   = hours ? hours : 12
      minutes = minutes < 10 ? '0'+minutes : minutes

      var strTime = hours + ':' + minutes + ' ' + ampm

      return strTime
    }
  }
}
</script>

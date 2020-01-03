import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import Chart from 'chart.js';

import router from '../router/router'

import Gimnasio from '../models/Gimnasio'
import Coach from '../models/Coach'
import Pagination from '../models/Pagination'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    loggingIn: false,
    loginError: null,
    ideGym: null,
    perfil: null,
    // Gimnasio
    gimnasio: new Gimnasio(),
    // Coaches
    coach: new Coach(),
    coaches: [],
    obteniendoCoaches: false,
    agregandoCoach: false,
    paginacionCoaches: new Pagination(),
    errors: []
  },
  data(){
      _this = this
  },
  mutations: {
    loginStart: state => state.loggingIn = true,
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
    },
    updateAccessToken: (state, token) => {
      state.token = token;
    },
    logout: (state) => {
      state.token = null;
    },
    dataProfile: (state, datos) => {
      state.perfil = datos;
    },
    mutarGimnasio: (state, datos) => {
      state.gimnasio = datos
    },
    mutarCoaches: (state, datos) => {
      state.coaches = datos
    },
    mutarObteniendoCoaches: (state, datos) => {
      state.obteniendoCoaches = datos
    },
    mutarAgregandoCoach: (state, datos) => {
      state.agregandoCoach = datos
    },
    limpiarCoach: (state) => {
      state.coach = new Coach()
    },
    removerCoach: (state, index) => {
      state.coaches.splice(index, 1)
    },
    mutarPaginacionCoaches: (state, datos) => {
      state.paginacionCoaches = datos
    },
    actualizarErrores: (state, errors) => {
      state.errors = errors
    }
  },
  actions: {
    doLogin({commit}, loginData){
      commit('loginStart');

      axios.post('/login', {
        ...loginData
      })
      .then((response) => {
        localStorage.setItem('token', response.data.access_token);
        window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        commit('loginStop', null);
        commit('updateAccessToken', response.data.access_token);
        console.log(response.data)
        router.push('/');
      })
      .catch(error => {
        commit('loginStop', error.response.data.message);
        commit('updateAccessToken', null);
        console.log(error.response)
      })
    },
    fetchAccessToken({commit}) {
      commit('updateAccessToken', localStorage.getItem('token'));
    },
    logout({commit}) {
      localStorage.removeItem('token')
      localStorage.removeItem('gimnasio')
      commit('logout')
      router.push('/login');
    },
    getToken(){
      axios.get('/perfil')
      .then(response => {
        if(response.data.status){
          localStorage.removeItem('token')
          router.push('/login');
      }
      })
    },
    getId(){
      axios.get('/perfil')
      .then((response) =>
      {
        localStorage.setItem('ideGym', response.data.gimnasio.id)
      }).catch(function (error){
          console.log('Error: ' + error);
      })
    },
    getPerfil({commit}){

      var infoGym       = localStorage.getItem('gimnasio')
      var bytes         = CryptoJs.AES.decrypt(infoGym.toString(), process.env.MIX_SECRET_ENC)
      var decryptedData = JSON.parse(bytes.toString(CryptoJs.enc.Utf8))

      commit('dataProfile', decryptedData)
    },

    // Obtener información del usuario y mutar gimnasio
    obtenerInfoGimnasio({commit}) {

      var infoGym       = localStorage.getItem('gimnasio')
      var bytes         = CryptoJs.AES.decrypt(infoGym.toString(), process.env.MIX_SECRET_ENC)
      var decryptedData = JSON.parse(bytes.toString(CryptoJs.enc.Utf8))

      commit('mutarGimnasio', decryptedData)
    },

    // Coaches
    obtenerCoaches({commit}, page) {

      commit('mutarObteniendoCoaches', true)

      axios.get(`/coaches?page=${page}`)
      .then(response => {

        commit('mutarObteniendoCoaches', false)
        commit('mutarCoaches', response.data.data)
        commit('mutarPaginacionCoaches', response.data.pagination)

      })
      .catch(error => {

        commit('mutarObteniendoCoaches', false)
        console.log('Error: ' + error)

      })

    },
    agregarCoach({commit, dispatch}, coach) {

      commit('mutarAgregandoCoach', true)

      axios.post('/coaches', coach)
      .then(response => {

        commit('mutarAgregandoCoach', false)
        commit('actualizarErrores', [])
        commit('limpiarCoach')
        dispatch('obtenerCoaches', 1)

        Swal.fire({
          icon: 'success',
          title: '¡ÉXITO!',
          text: 'Se ha agregado un nuevo coach'
        })

      })
      .catch(error => {

        commit('mutarAgregandoCoach', false)

        if (error.response) {

          if (error.response.data.message === 'The given data was invalid.') {

            commit('actualizarErrores', error.response.data.errors)

          } else {

            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Algo salió mal! Intentalo más tarde'
            })

          }

        } else if (error.request) {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal! Intentalo más tarde. No hubo respuesta del servidor'
          })

        } else {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal! Intentalo más tarde'
          })

          console.log('Error', error.message);
        }

      })

    },
    eliminarCoach({commit}, { index, id }) {

      Swal.fire({
        title: '¿Desea eliminar a este coach?',
        text: "¡Esta acción no se podrá revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      })
      .then((result) => {

        if (result.value) {

          axios.delete(`/coaches/${id}`)
          .then(response => {

            commit('removerCoach', index)

            Swal.fire(
              '¡Eliminado!',
              'El coach ha sido eliminado.',
              'success'
            )

          }).catch(error => {
            Swal.fire(
              'Oops!',
              '¡Algo salió mal! Intentalo nuevamente',
              'error'
            )
          })

        }
      })
    },
    limpiarCoach: ({commit}) => {
      commit('limpiarCoach')
    }
  },
  modules: {
  }
})

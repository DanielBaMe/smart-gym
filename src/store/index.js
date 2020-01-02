import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import Chart from 'chart.js';
import router from '../router/router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    loggingIn: false,
    loginError: null,
    ideGym: null,
    perfil: null
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
    }
  },
  modules: {
  }
})

window.Vue 	  = require('vue')
window.Vuex   = require('vuex')
window.Swal   = require('sweetalert2')

window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.baseURL = process.env.MIX_API_URL

window.jwt 		  = require('jsonwebtoken');
window.CryptoJs = require("crypto-js");

if(localStorage.getItem('token') !== null)
  window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });

import router from './router/router'
import store from './store'

new Vue({
  router,
  store
}).$mount('#app')

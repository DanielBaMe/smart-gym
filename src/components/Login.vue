<template>
  <div class="page-wrapper">
    <div class="page-content--bge5">
      <div class="container">
        <div class="login-wrap">
          <div class="login-content">
            <div class="login-logo">
              <router-link to="/"> <img src="/images/smartgym-logo.png" alt="CoolAdmin"></router-link>
            </div>
            <div class="login-form">
              <p v-if="redirecting" class="alert alert-info">Redirigiendo al menú de inicio...</p>
              <form @submit.prevent="loginSubmit" method="post">
                <div class="form-group">
                  <error-list :errors="errors.email" />
                  <label>Correo electronico</label>
                  <input class="au-input au-input--full" type="email" v-model="email" placeholder="Correo electrónico" required>
                </div>
                <div class="form-group">
                  <error-list :errors="errors.password" />
                  <label>Contraseña</label>
                  <input class="au-input au-input--full" type="password" v-model="password" placeholder="Contraseña" required>
                </div>
                <button
                  v-if="!loadingRequest"
                  type="submit"
                  class="au-btn au-btn--block au-btn--green m-b-20">
                    Ingresar
                </button>
                <button
                  v-else
                  disabled
                  class="au-btn au-btn--block au-btn--blue m-b-20" >
                    Ingresando...
                </button>
              </form>
              <div class="text-center">
                <label>
                  <router-link to='/password-request'>¿Olvidaste tu contraseña?</router-link>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ErrorsList from '../components/ErrorsList'

export default {
  components: {
    'error-list': ErrorsList
  },
  data(){
    return{
      email: '',
      password: '',
      errors: [],
      loadingRequest: false,
      redirecting: false
    }
  },
  mounted() {
    this.checkAuth()
  },
  methods: {
    loginSubmit: async function(){

      if (this.email === '' || this.password === '') {

        Swal.fire({
            icon: 'error',
            title: 'Campos requeridos',
            text: 'Por favor ingresa todos los campos'
        })

      } else {

        this.loadingRequest = true

        try {

          const response = await axios.post('/login', {
            email: this.email,
            password: this.password
          })

          this.loadingRequest = false
          this.errors         = []

          var token    = response.data.access_token
          var gimnasio = JSON.stringify(response.data.usuario)

          window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

          //Crypted info
          var infoGym = CryptoJs.AES.encrypt(gimnasio, process.env.MIX_SECRET_ENC)

          localStorage.setItem('token', token)
          localStorage.setItem('gimnasio', infoGym)

          this.redirecting = true

          setTimeout(() => {
            this.$router.push('/')
          }, 4000)

        } catch (error) {

          // Error 😨

          this.loadingRequest = false

          if (error.response) {

            if (error.response.data.message === 'The given data was invalid.') {

              this.errors = error.response.data.errors

            } else if(error.response.data.message){

              let errors = {'email': [error.response.data.message] }
              this.errors = errors

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

        }
      }

    },
    checkAuth() {

      let token = localStorage.getItem('token');

      if (token !== null)
        jwt.verify(token, process.env.MIX_SECRET, (err, decoded) => {

        if (!err) {
          this.$router.push('/')
        } else {
          console.log(err)
        }

      })
    }
  }
}

</script>


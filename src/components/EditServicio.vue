<template>
  <div class="page-wrapper">
    <HeaderMobile />
    <MenuSidebar />
    <div class="page-container">
      }
      <HeaderDesktop />
      <div class="main-content">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-3">
                <button
                  @click="$router.go(-1)"
                  class="btn btn-primary ml-5 btn-sm glyphicon glyphicon-arrow-left"
                  title="Atrás"
                ></button>
              </div>
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-header">
                    <h3>Editar el servicio {{ servicioUnico.nombre }}</h3>
                  </div>
                  <div class="card-body">
                    <form
                      @submit.prevent="formSubmit"
                      method="post"
                      class="ml-5 mr-5"
                    >
                      <div v-if="er" class="alert alert-danger w-100">
                        {{ error_message }}
                        <br />
                      </div>
                      <div class="form-group">
                        <error-list :errors="errors.nombre"></error-list>
                        <label class="control-label mb-1">Nombre</label>
                        <input
                          name="nombre"
                          id="nombre"
                          class="form-control"
                          type="text"
                          pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s]+"
                          title="Solo números y letras."
                          v-model="servicioUnico.nombre"
                          minlength="4"
                          maxlength="20"
                        />
                        <br />
                      </div>
                      <div class="form-group">
                        <error-list :errors="errors.precio"></error-list>
                        <label class="control-label mb-1">Precio</label>
                        <input
                          name="precio"
                          id="precio"
                          min="0"
                          class="form-control"
                          type="number"
                          step="0.50"
                          v-model="servicioUnico.precio"
                        />
                        <br />
                      </div>
                      <div class="form-group">
                        <error-list :errors="errors.descripcion"></error-list>
                        <label class="control-label mb-1">Descripcion</label>
                        <textarea
                          v-model="servicioUnico.descripcion"
                          type="text"
                          name="descripcion"
                          id="descripcion"
                          class="form-control"
                          rows="5"
                          cols="50"
                          pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s]+"
                        ></textarea>
                        <br />
                      </div>
                      <br />
                      <button
                        v-if="!agregandoServicio"
                        type="submit"
                        class="btn btn-primary"
                      >
                        Editar
                      </button>
                      <button
                        v-if="agregandoServicio"
                        disabled
                        class="btn btn-primary"
                      >
                        Editando...
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMobile from "./HeaderMobile";
import MenuSidebar from "./MenuSidebar";
import HeaderDesktop from "./HeaderDesktop";
import ErrorsList from "./ErrorsList.vue";
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    HeaderMobile,
    MenuSidebar,
    HeaderDesktop,
    "error-list": ErrorsList
  },
  data() {
    return {
      er: false,
      hecho: false,
      er: false,
      error_message: "",
      loading: false,
      ide: ""
    };
  },
  created() {
    this.verifyToken();
  },
  mounted() {
    this.obtenerServicio();
  },
  computed: {
    ...mapState(["servicioUnico", "agregandoServicio", "errors"])
  },
  methods: {
    ...mapActions(["getToken", "obtenerServicioUnico", 'editarServicio']),
    verifyToken() {
      this.getToken();
    },
    formSubmit() {
      this.editarServicio({id: this.ide, servicio: this.servicioUnico})
    },
    obtenerServicio() {
      this.ide = this.$route.params.id;
      this.obtenerServicioUnico(this.ide);
    }
  }
};
</script>

<template>
  <div class="navbar navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand"> Formularios </router-link>
    <div class="d-flex">
      <router-link v-if="isAuth" class="btn btn-dark" to="/">
        Tareas
      </router-link>
      <router-link v-if="!isAuth" class="btn btn-dark" to="/ingreso">
        Ingreso
      </router-link>
      <router-link v-if="!isAuth" class="btn btn-dark" to="/registro">
        Registro
      </router-link>
      <button @click="cerrarSesion" class="btn btn-danger" v-if="isAuth">
        Cerrar sesion
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isAuth"]),
  },
  methods: {
    ...mapActions(["cerrarSesion"]),
  },
};
</script>


<template>
  <h1 class="my-5">Formularios con Vue.js</h1>

  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea" />
  </form>
  <hr />
  <ListaTareas />
</template>

<script>
import Input from "../components/Input.vue";
import { mapActions } from "vuex";
import shortid from "shortid";
import ListaTareas from "../components/ListaTareas.vue";

export default {
  name: "Home",
  components: {
    Input,
    ListaTareas,
  },
  data() {
    return {
      tarea: {
        id: "",
        nombre: "",
        categorias: [],
        estado: "",
        numero: 0,
      },
    };
  },
  methods: {
    ...mapActions(["setTareas", "cargarTareas"]),
    procesarFormulario() {
      console.log(this.tarea);
      if (this.tarea.nombre.trim() === "") {
        console.log("Campo vacío");
        return;
      }
      console.log("no está vacio");
      this.tarea.id = shortid.generate();
      this.setTareas(this.tarea);
      // envian los datos

      this.tarea = {
        id: "",
        nombre: "",
        categorias: [],
        estado: "",
        numero: 0,
      };
    },
  },
  created() {
    this.cargarTareas();
  },
};
</script>

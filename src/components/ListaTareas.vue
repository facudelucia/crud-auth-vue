<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Categorias</th>
        <th scope="col">Estado</th>
        <th scope="col">Numero</th>
        <th scope="col">Accion</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tareas" :key="item.id">
        <th scope="row">{{ item.id }}</th>
        <td>{{ item.nombre }}</td>
        <td>
          <div v-for="(categoria, index) in item.categorias" :key="index">
            {{ categoria }}
          </div>
        </td>
        <td>{{ item.estado }}</td>
        <td>{{ item.numero }}</td>
        <td>
          <button @click="eliminar(item)" class="btn btn-danger btn-sm m-1">
            Eliminar
          </button>
          <router-link
            :to="{ name: 'Editar', params: { id: item.id } }"
            class="btn btn-primary btn-sm m-1"
            >Editar</router-link
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["tareas"]),
  },
  methods: {
    ...mapActions(["deleteTarea"]),
    eliminar(item) {
      this.deleteTarea(item);
    },
  },
};
</script>

<style>
</style>
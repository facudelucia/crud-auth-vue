<template>
  <form @submit.prevent="actualizarTarea(tarea)">
    <Input :tarea="tarea" />
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Input from "../components/Input.vue";
import router from "../router";
export default {
  components: { Input },
  computed: {
    ...mapState(["tarea"]),
  },
  methods: {
    ...mapActions(["setTarea", "updateTarea"]),
    actualizarTarea(tarea) {
      this.updateTarea(tarea);
      router.push("/");
    },
  },
  created() {
    this.setTarea(this.$route.params.id);
  },
};
</script>

<style>
</style>
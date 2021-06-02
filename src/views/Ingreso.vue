<template>
  <h2>Ingreso de usuarios</h2>
  <div class="alert alert-danger" v-if="error">
    {{ error }}
  </div>
  <form @submit.prevent="handleSubmit">
    <input
      v-model="email"
      type="email"
      class="form-control"
      placeholder="Email"
    />
    <input
      v-model="pass1"
      type="password"
      class="form-control"
      placeholder="Password"
    />
    <button :disabled="bloquear" type="submit" class="btn btn-primary">
      Crear Usuario
    </button>
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      pass1: "",
    };
  },
  methods: {
    ...mapActions(["ingresoUsuarios"]),
    handleSubmit() {
      this.ingresoUsuarios({ email: this.email, password: this.pass1 });
    },
  },
  computed: {
    bloquear() {
      return this.email.trim() === "" || this.pass1 === "";
    },
    ...mapState(["error"]),
  },
};
</script>

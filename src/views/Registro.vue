<template>
  <h2>Registro de usuarios</h2>
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
    <input
      v-model="pass2"
      type="password"
      class="form-control"
      placeholder="Repite password"
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
      pass2: "",
    };
  },
  computed: {
    bloquear() {
      return (
        this.email.trim() === "" ||
        this.pass1 === "" ||
        this.pass1 !== this.pass2
      );
    },
    ...mapState(["error"]),
  },
  methods: {
    ...mapActions(["registrarUsuario"]),
    handleSubmit() {
      this.registrarUsuario({ email: this.email, password: this.pass1 });
      this.email = "";
      this.pass1 = "";
      this.pass2 = "";
    },
  },
};
</script>

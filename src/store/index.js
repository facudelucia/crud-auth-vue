import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: "",
      nombre: "",
      categorias: [],
      estado: "",
      numero: 0,
    },
    user: JSON.parse(localStorage.getItem('user')) || null,
    error: null
  },
  mutations: {
    setError(state, payload) {
      state.error = payload
    },
    setUser(state, payload) {
      state.user = payload
    },
    cargar(state, payload) {
      state.tareas = payload
    },
    set(state, payload) {
      state.tareas = [...state.tareas, payload]
      console.log(state.tareas)
    },
    delete(state, payload) {
      state.tareas = state.tareas.filter(tarea => tarea.id !== payload.id)
    },
    tarea(state, payload) {
      if (!state.tareas.find(tarea => tarea.id === payload)) {
        return router.push('/')
      }
      state.tarea = state.tareas.find(tarea => tarea.id === payload)
    },
    update(state, payload) {
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
    }
  },
  actions: {
    cerrarSesion({ commit }) {
      commit('setUser', null)
      router.push('/ingreso')
      localStorage.removeItem('user')
    },
    async ingresoUsuarios({ commit }, usuario) {
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHznhhgsoJftDKq9sY4ro81N3q2TULn98`, {
        method: 'POST',
        body: JSON.stringify({
          email: usuario.email,
          password: usuario.password,
          returnSecureToken: true
        })
      })
      const data = await res.json()
      if (data.error) {
        return commit('setError', data.error.message)
      }
      commit('setUser', data)
      commit('setError', null)
      localStorage.setItem('user', JSON.stringify(data))
      router.push('/')
    },
    async registrarUsuario({ commit }, usuario) {
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHznhhgsoJftDKq9sY4ro81N3q2TULn98`, {
        method: 'POST',
        body: JSON.stringify({
          email: usuario.email,
          password: usuario.password,
          returnSecureToken: true
        })
      })
      const data = await res.json()
      if (data.error) {
        return commit('setError', data.error.message)
      }
      commit('setUser', data)
      commit('setError', null)
      router.push('/ingreso')
    },
    async cargarTareas({ commit, state }) {
      const res = await fetch(`https://ingreso-egreso-app-29655-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
      const data = await res.json()
      const arrayTareas = []
      for (const id in data) {
        arrayTareas.push(data[id])
      }
      commit('cargar', arrayTareas)
    },
    async setTareas({ commit, state }, tarea) {
      await fetch(`https://ingreso-egreso-app-29655-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarea)
      })
      commit('set', tarea)
    },
    async deleteTarea({ commit, state }, tarea) {
      await fetch(`https://ingreso-egreso-app-29655-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
        method: 'DELETE'
      })
      commit('delete', tarea)
    },
    setTarea({ commit }, id) {
      commit('tarea', id)
    },
    async updateTarea({ commit, state }, tarea) {
      const res = await fetch(`https://ingreso-egreso-app-29655-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
        method: 'PATCH',
        body: JSON.stringify(tarea)
      })
      const data = res.json()
      commit('update', data)
    }
  },
  getters: {
    isAuth(state) {
      return !!state.user
    }
  },
  modules: {
  }
})

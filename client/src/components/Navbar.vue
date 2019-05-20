<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">MEVN-Auth</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">
            Home
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item"  v-if="!isLoggedIn">
          <router-link class="nav-link" to="/login">
            Login
          </router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link class="nav-link"  to="/register">
            Register
          </router-link>
        </li>
        <li class="nav-item"  v-if="isLoggedIn">
          <router-link class="nav-link"  to="/profile">
            Profile
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">
            About
          </router-link>
        </li>
        <li class="nav-item"  v-if="isLoggedIn">
          <a class="nav-link" to="/logout" @click="logoutuser">
            Logout
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters ,mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['logout']) ,
    logoutuser(){
      this.logout() ;
    }
  },
};
</script>

<style>
</style>

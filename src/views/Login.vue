<template>
  <div class="h-screen bg-purple-700 flex items-center justify-center">
    <div class="bg-gray-100 w-1/3 shadow-xl rounded-lg p-8">
      <div class="text-3xl py-4 mb-4 text-purple-800">Login {{label}}</div>
      <div class="p-1"></div>
      <div class="p-1">
        <VInput v-model="user.email" name="Email" />
      </div>
      <div class="p-1">
        <VInput v-model="user.password" type="password" name="Password" />
      </div>
      <div class="p-1"></div>
      <div class="text-right py-6">
        <button
          type="button"
          @click="onLogin()"
          class="border flex items-center text-sm p-2 px-4 rounded h-10 bg-purple-700 text-gray-100 rounded-full"
        >
          <span class>Login</span>
          <LoaderIcon v-if="isLoading" class="ml-1 w-4 spin" />
        </button>
      </div>
      <router-link
        to="login-patient"
        class="text-xs text-purple-600 block"
        v-if="isDoctor"
      >Login as Patient ?</router-link>
      <router-link to="login-doctor" class="text-xs text-purple-600 block" v-else>Login as Doctor ?</router-link>
      <div></div>
      <router-link
        to="register-doctor"
        class="text-xs text-gray-600 block"
      >Not have account ? Register</router-link>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      isLoading: false
    };
  },
  created() {
    console.log(this.$route.name);
  },
  mounted() {
    const localUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (localUser) {
      this.$router.push("home");
    }
  },
  computed: {
    isDoctor() {
      return this.$route.name === "login-doctor";
    },
    isPatient() {
      return this.$route.name === "login-patient";
    },
    label() {
      return this.isDoctor ? "Doctor" : "Patient";
    }
  },
  methods: {
    ...mapActions(["loginDoctor", "loginPatient"]),
    onLogin() {
      if (this.isDoctor) {
        this.loginDoctor(this.user).then(() => {
          this.$router.push("home");
        });
      } else if (this.isPatient) {
        this.loginPatient(this.user).then(() => {
          this.$router.push("home");
        });
      }
    }
  }
};
</script>
<style></style>

<template>
  <div class="h-screen bg-purple-700 flex items-center justify-center">
    <div class="bg-gray-100 w-1/3 shadow-xl rounded-lg p-8">
      <div class="text-3xl py-4 mb-4 text-purple-800">{{label}} Registration</div>
      <div class="p-1 flex">
        <VInput name="First Name" v-model="user.firstname" class="w-1/2 pr-2" />
        <VInput name="Last Name" v-model="user.lastname" class="w-1/2" />
      </div>
      <div class="p-1"></div>
      <div class="p-1">
        <VInput name="Email" v-model="user.email" />
      </div>
      <div class="p-1">
        <VInput type="password" name="Password" v-model="user.password" />
      </div>
      <div class="p-1">
        <VInput type="password" name="Confirm Password" v-model="user.confirmPassword" />
      </div>
      <div class="p-1">
        <p class="text-xs text-red-600" v-if="!isMatch">password and confirm password do not match</p>
        <p class="text-xs text-red-600" v-if="error">{{error}}</p>
      </div>
      <div class="text-right py-6 flex justify-end">
        <button
          type="button"
          @click="onRegister()"
          class="border flex items-center text-sm p-2 px-4 rounded h-10 bg-purple-700 text-gray-100 rounded-full"
        >
          <span class="">Register</span>
          <LoaderIcon v-if="isLoading" class="ml-1 w-4 spin" />
        </button>
      </div>
      <router-link
        to="register-patient"
        class="text-xs text-purple-800 block"
        v-if="isDoctor"
      >Register as Patient ?</router-link>
      <router-link
        to="register-doctor"
        class="text-xs text-purple-800 block"
        v-else
      >Register as Doctor ?</router-link>
      <div></div>
      <router-link
        to="login-doctor"
        class="text-xs text-gray-600 block"
      >Already have account ? Login</router-link>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        type:"",
        confirmPassword: ""
      },
      error: "",
      isLoading: false,
      isMatch: true
    };
  },
  created() {
    console.log(this.$route.name);
  },
  mounted() {},
  computed: {
    ...mapState(["test"]),
    isDoctor() {
      return this.$route.name === "register-doctor";
    },
    isPatient() {
      return this.$route.name === "register-patient";
    },
    label() {
      return this.isDoctor ? "Doctor" : "Patient";
    }
  },
  methods: {
    ...mapActions(["registerDoctor", "registerPatient"]),
    async onRegister() {
      if (this.user.password === this.user.confirmPassword) {
        this.isLoading = true;
        try {
          if(this.isDoctor) {
            this.user.type = "doctor" 
            await this.registerDoctor(this.user);
          }
          else if(this.isPatient){
            this.user.type = "patient"
            await this.registerPatient(this.user)
          }
        } catch (error) {
          // console.log(error);
          this.error = error.message;
        } finally{
          this.isLoading = false;
        }
      } else {
        this.isMatch = false;
      }
    },
    login() {
      localStorage.setItem("user", JSON.stringify(this.user));
      this.$router.push("/home");
    }
  }
};
</script>
<style></style>

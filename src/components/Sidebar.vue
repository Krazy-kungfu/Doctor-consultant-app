<template>
  <div class="bg-purple-200 h-full">
    <div class="flex flex-col" style="height:90vh">
      <div class="flex-grow">
        <div
          class="flex items-center p-2"
          v-for="(item, i) of users"
          :key="i"
          :class="[selectedUser.id==item.id ? 'bg-purple-300 font-bold text-purple-800' : '']"
          @click="onSelectUser(item)"
        >
          <div class="pr-2">
            <UserIcon />
          </div>
          <div>{{item.firstname}}</div>
        </div>
      </div>
      <div class="pl-4 flex items-center select-none" @click="onLogout()">
        <LogOutIcon />
        <span class="pl-2">LOGOUT</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { eventBus } from "./../store/helper";

export default {
  name: "Sidebar",
  computed: {
    ...mapState(["doctors", "patients", "currentUser", "selectedUser"]),
    users() {
      return this.currentUser.type == "doctor" ? this.patients : this.doctors;
    }
  },
  methods: {
    ...mapActions(["selectUser"]),
    onLogout() {
      const localUser = JSON.parse(localStorage.getItem("loggedUser"));
      localStorage.removeItem("loggedUser");
      if (localUser.type === "doctor") {
        this.$router.push("login-doctor");
      } else {
        this.$router.push("login-patient");
      }
    },
    onSelectUser(item){
      this.selectUser(item);
      eventBus.$emit('onSelectUser',item);
    }
  }
};
</script>

<style>
</style>
<template>
  <header class="bg-purple-600 shadow-lg flex items-center p-1 px-4 text-purple-100">
    <div class="rounded-full rounded-br-none rounded-tl-md px-8 text-sm py-2 bg-purple-200 text-gray-900 font-bold">eDoctor</div>
    <div class="flex-grow"></div>
    <div class="p-4">
      <div class="flex items-center">
        <UserIcon />
        <div class="px-2 font-bold">{{user.firstname}} {{user.lastname}}</div>
        <!-- <ChevronDownIcon size="24" /> -->
      </div>
    </div>
  </header>
</template>

<script>

import { mapState } from "vuex"

export default {
  name:'Header',
  data(){
    return{
      user:{},
    }
  },
  mounted(){
    const localUser = JSON.parse(localStorage.getItem('loggedUser'));
    if(localUser){
      this.user = localUser;
    }else{
      this.$router.push('login-doctor');
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  }
};
</script>

<style>
</style>
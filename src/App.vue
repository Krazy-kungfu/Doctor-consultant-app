<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name:'App',
  data(){
    return {

    }
  },
  created() {
   
  },
  mounted(){
  },
  methods: {
  }
};
</script>

<style>
@import "../app.css";
.spin {
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear; 
  /* transform: rotate(3deg); */
   /* transform: rotate(0.3rad);/ */
   /* transform: rotate(3grad); */ 
   /* transform: rotate(.03turn);  */
}

@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}

button:focus{
  outline: none;
}
</style>

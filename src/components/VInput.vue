<template>
  <div class="text-xs v-input" :class="mode">
    <label>{{name}}</label>
    <input v-bind="$attrs" v-on="inputListeners" :type="type" :value="value" />
  </div>
</template>

<script>
export default {
  name: "VInput",
  props: {
    name: { type: String, default: "Untitled" },
    type: { type: String, default: "text" },
    value: { default: '' },
    mode: { default: "light" }
  },
  computed: {
    inputListeners: function() {
      var vm = this;
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input: function(event) {
            vm.$emit("input", event.target.value);
          }
        }
      );
    }
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  display: block;
}
input {
  border: 1px solid rgb(85, 86, 143, 0.6);
  width: 100%;
}
input:active,
input:focus,
input:hover {
  outline: none;
}
input:focus {
  border: 1px solid rgb(85, 86, 143);
}

.v-input label {
  color: rgb(237, 237, 237);
  font-weight: bold;
}
.v-input input {
  color: white;
  padding: 4px 8px;
  background: rgba(48, 48, 48, 0.8);
}

.v-input.light label {
  font-weight: bold;
  color: rgb(69, 69, 69);
}

.v-input.light input {
  color: rgb(36, 36, 36);
  padding: 6px 8px;
  border: 1px solid rgb(233, 233, 233);
  background: rgba(240, 240, 240, 0.8);
}
</style>

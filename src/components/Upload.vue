<template>
  <div class="flex justify-center">
    <input
      hidden
      class="w-12"
      ref="up"
      type="file"
      name="fileToUpload"
      id="fileToUpload"
      @change="previewImage"
    />
    <PaperclipIcon v-if="uploadValue == 0 || uploadValue == 100" @click="onClick()" />
    <div v-else>{{this.uploadValue}}%</div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Upload",
  data() {
    return {
      imageData: null,
      picture: null,
      uploadValue: 0
    };
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },

    onClick() {
      this.$refs.up.click();
    },

    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploadValue = Math.round(this.uploadValue);
          this.$emit("onUploadValueChange", this.uploadValue);
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.picture = url;
            this.$emit("onUploadDone", url);
          });
        }
      );
    }
  }
};
</script>

<style>
</style>

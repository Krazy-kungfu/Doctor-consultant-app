<template>
  <div class="home h-screen grid">
    <Header class="header" />
    <div class="left">
      <Sidebar />
    </div>
    <div class="right p-2 flex flex-col">
      <div class="flex-grow flex flex-col p-4 overflow-y-scroll" ref="chatRef">
        <div
          class=" p-2 mb-4 rounded-lg rounded-br-none text-sm bg-white shadow"
          v-for="(msg,i) of currentChat"
          :key="i"
          :class="[ msg.from == currentUser.firstname ?'self-start bg-purple-800 text-white' : 'self-end']"
        >
          <div>
            <p v-if="msg.type === 'text'">{{msg.msg}}</p>
            <div  v-else-if="msg.type === 'image'" class="flex">
              <img class="w-32 object-cover" :src="msg.msg"/>
            </div>
            <div  v-else-if="msg.type === 'video'" class="flex">
              <video class="w-32 object-cover" controls :src="msg.msg"/>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div class="p-2">
        <div class="flex items-center">
          <div class="w-11/12">
            <VInput placeholder="message" name v-model="message" @keydown.enter="send()" />
          </div>
          <div class="w-1/12 text-center">
            <Upload
              class
              @onUploadValueChange="onUploadValueChange()"
              @onUploadDone="onUploadDone"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from "vuex";
import { eventBus } from "./../store/helper";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      message: "",
      scrollHeight: 0
    };
  },
  mounted() {
    this.setCurrentUser();
    this.fetchAll({
      onChat: () => {
        this.$refs.chatRef.scrollTo(0, this.$refs.chatRef.scrollHeight + 100);
        this.$refs.chatRef.scrollTo(0, this.$refs.chatRef.scrollHeight + 100);
      }
    });

    eventBus.$on("onSelectUser", () => {
      this.scrollToEnd();
    });
  },
  computed: {
    ...mapState(["currentUser", "selectedUser", "chat"]),
    currentChat() {
      return this.chat.filter(item => {
        return (
          (item.to == this.selectedUser.firstname &&
            item.from == this.currentUser.firstname) ||
          (item.to == this.currentUser.firstname &&
            item.from == this.selectedUser.firstname)
        );
      });
    }
  },
  methods: {
    ...mapActions(["sendMessage", "setCurrentUser", "fetchAll"]),
    scrollToEnd() {
      this.$refs.chatRef.scrollTo(0, this.$refs.chatRef.scrollHeight + 100);
    },
    send(event) {
      this.sendMessage({
        from: this.currentUser.firstname,
        to: this.selectedUser.firstname,
        msg: this.message,
        type: "text"
      });
      this.message = "";
      this.scrollToEnd();
    },
    isImage(url) {
      return (url.includes('.png')||url.includes('.jpeg')||url.includes('.jpg'))
    },
    isVideo(url) {
      return (url.includes('.mp4')||url.includes('.avi')||url.includes('.mov'))
    },
    downloadMedia(url) {
      const element = document.createElement("a");
      element.setAttribute("href", url);
      element.setAttribute("download", "Img");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
    }
    ,
    onUploadDone(url) {
      if(this.isImage(url)){
        this.sendMessage({
          from: this.currentUser.firstname,
          to: this.selectedUser.firstname,
          msg: url,
          type: "image"
        });
      } else if(this.isVideo(url)) {
        this.sendMessage({
          from: this.currentUser.firstname,
          to: this.selectedUser.firstname,
          msg: url,
          type: "video"
        });
      }
      this.message = "";
      this.scrollToEnd();
    },
    onUploadValueChange(val) {
      console.log(val);
    }
  }
};
</script>
<style  scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr 12fr;
}

.header {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 13;
}
.left {
  grid-row-start: 2;
  grid-row-end: 13;
  grid-column-start: 1;
  grid-column-end: 3;
}
.right {
  grid-row-start: 2;
  grid-row-end: 13;
  grid-column-start: 3;
  grid-column-end: 13;
}
</style>

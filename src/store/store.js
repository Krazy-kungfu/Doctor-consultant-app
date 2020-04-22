import Vue from 'vue';
import Vuex from 'vuex';

import { AppService } from './';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedUser: {},
    currentUser: {},
    patients: [],
    doctors: [],
    chat: []
  },
  mutations: {

  },
  actions: {
    registerDoctor({ state }, payload) {
      return new Promise((resolve, reject) => {
        AppService.register(payload).then((resp) => {
          let { firstname, lastname, email, password, type } = payload
          let user = ({ firstname, lastname, email, password, type })
          AppService.addNewDoctor(resp.user.uid, user)
          resolve();
        }).catch((error) => {
          reject(error);
        });
      })
    },
    registerPatient({ state }, payload) {
      return new Promise((resolve, reject) => {
        AppService.register(payload).then((resp) => {
          let { firstname, lastname, email, password, type } = payload
          let user = ({ firstname, lastname, email, password, type })
          AppService.addNewPatient(resp.user.uid, user)
          resolve();
        }).catch((error) => {
          reject(error);
        });
      })
    },
    loginDoctor({ state }, payload) {
      return new Promise((resolve, reject) => {
        AppService.login(payload).then((resp) => {
          state.currentUser = AppService.fetchDoctorByUID(resp.user.uid, (doc => {
            state.currentUser = {...doc.data(), id: doc.id}
            localStorage.setItem("loggedUser", JSON.stringify(state.currentUser))
            resolve()
          }))
        }).catch(error => {
          reject(error)
        })
      })
    }, loginPatient({ state }, payload) {
      return new Promise((resolve, reject) => {
        AppService.login(payload).then((resp) => {
          state.currentUser = AppService.fetchPatientByUID(resp.user.uid, (doc => {
            state.currentUser = {...doc.data(), id: doc.id};
            localStorage.setItem("loggedUser", JSON.stringify(state.currentUser))
            resolve()
          }))
        }).catch(error => {
          reject(error)
        })
      })
    },
    sendMessage({ state }, payload) {
      console.log("sending message")
      AppService.sendMessage(payload)
    },
    selectUser({ state }, payload) {
      state.selectedUser = payload;
    },
    fetchAll({ state }, { onChat }) {
      AppService.getPatientSnapshot((resp) => {
        let docs = resp.docs
        state.patients= docs.map(item => ({...item.data(),id: item.id}))
      })
      AppService.getDoctorsSnapshot((resp) => {
        let docs = resp.docs
        state.doctors = docs.map(item => ({...item.data(),id: item.id}))
      })
      AppService.messagesSnapshot((resp) => {
        let docs = resp.docs
        state.chat = docs.map(item => item.data());
        if (onChat) {
          onChat();
        }
      })
    },
    setCurrentUser({ state }) {
      const localUser = JSON.parse(localStorage.getItem("loggedUser"));
      if (localUser) {
        state.currentUser = localUser;
      }
    }

  },
  modules: {
  }
})

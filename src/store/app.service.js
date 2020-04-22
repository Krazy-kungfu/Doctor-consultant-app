import { db, app } from './../firebase.config';

import firebase from "firebase"

class AppService {
    constructor() {

    }

    register({ email, password } = credentials) {
        return app.auth().createUserWithEmailAndPassword(email, password)
    }

    login({ email, password } = credentials) {
        return app.auth().signInWithEmailAndPassword(email,password);
    }

    sendMessage(payload) {
        db.collection('chat').add({...payload, timestamp:  firebase.firestore.FieldValue.serverTimestamp() })
    }

    messagesSnapshot(callback) {
        db.collection('chat').orderBy("timestamp").onSnapshot(callback)
    }

    getPatientSnapshot(callback) {
        db.collection('patients').onSnapshot(callback) 
    }

    getDoctorsSnapshot(callback) {
        db.collection('doctors').onSnapshot(callback)
    } 

    addNewDoctor(uid,data) {
        db.collection('doctors').doc(uid).set(data)
    }

    addNewPatient(uid,data) {
        db.collection('patients').doc(uid).set(data)
    }

    fetchDoctorByUID(uid,callback) {
        db.collection('doctors').doc(uid).get().then(callback)
    }

    fetchPatientByUID(uid,callback) {
        db.collection('patients').doc(uid).get().then(callback)
    }
}


export default new AppService(); 
import firebase from 'firebase'

// firebase deploy --only hosting:covid-19-abc

const env = process.env.NODE_ENV ? process.env.NODE_ENV : null;
let firebaseConfig = null;
if (env == 'dev') {
    // ============ USE YOUR CONFIG ================= //
    firebaseConfig = {
        apiKey: "AIzaSyBd5pBGp02cTQvm7IaDx6az1iKQcVsDQZ4",
        authDomain: "edoctor-3a095.firebaseapp.com",
        databaseURL: "https://edoctor-3a095.firebaseio.com",
        projectId: "edoctor-3a095",
        storageBucket: "edoctor-3a095.appspot.com",
        messagingSenderId: "393734951992",
        appId: "1:393734951992:web:32edfa1fc99441201d82cd",
        measurementId: "G-7NF7WD1HZG"
    };
} else {
    firebaseConfig = {
        apiKey: "AIzaSyBxsq9skWzCyz5lv_Qc0Axj95Gwc9R0TpA",
        authDomain: "edoctor-covid.firebaseapp.com",
        databaseURL: "https://edoctor-covid.firebaseio.com",
        projectId: "edoctor-covid",
        storageBucket: "edoctor-covid.appspot.com",
        messagingSenderId: "888076251726",
        appId: "1:888076251726:web:99eb526250df7c7429891f",
        measurementId: "G-40CH1DKY93"

        // apiKey: "AIzaSyBd5pBGp02cTQvm7IaDx6az1iKQcVsDQZ4",
        // authDomain: "edoctor-3a095.firebaseapp.com",
        // databaseURL: "https://edoctor-3a095.firebaseio.com",
        // projectId: "edoctor-3a095",
        // storageBucket: "edoctor-3a095.appspot.com",
        // messagingSenderId: "393734951992",
        // appId: "1:393734951992:web:32edfa1fc99441201d82cd",
        // measurementId: "G-7NF7WD1HZG"

        // apiKey: "AIzaSyAtHWR8azZQ-GzhdFWnNebBnBThR67mSZc",
        // authDomain: "edoctor-online.firebaseapp.com",
        // databaseURL: "https://edoctor-online.firebaseio.com",
        // projectId: "edoctor-online",
        // storageBucket: "edoctor-online.appspot.com",
        // messagingSenderId: "612507950922",
        // appId: "1:612507950922:web:53a1ea7b1c3b5108c06bb3",
        // measurementId: "G-MEJXYHYE4D"
    };
}

export const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);

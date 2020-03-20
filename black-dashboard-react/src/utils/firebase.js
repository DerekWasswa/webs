var firebase = require("firebase/app");
// Required for side-effects
require("firebase/database");
require("firebase/storage");
require("firebase/auth");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCUC9_-B_BTftFZMtgk2UDoArDeAq3WF9E",
    authDomain: "tot-cafe.firebaseapp.com",
    databaseURL: "https://tot-cafe.firebaseio.com",
    projectId: "tot-cafe",
    storageBucket: "tot-cafe.appspot.com",
    messagingSenderId: "360106716607"
  };

firebase.initializeApp(config);
var db = firebase.database();
export default db;

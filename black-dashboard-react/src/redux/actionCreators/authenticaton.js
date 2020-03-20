import {
    USER_REGISTERED,
    LOGGED_USER,
    UPDATE_USER,
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    SHOP_LOGGED_IN,
    SHOP_REGISTERED,
    SHOP_LOGGED_OUT,
    ADMIN_LOGIN,
    ADMIN_LOGOUT,
    ERRORS,
    SUCCESS
  } from "../reducers/constants";
  import { baseURL } from "../reducers/constants";
  import axios from "axios";
  import db from '../../utils/firebase'
  //import swal from 'sweetalert';
  import firebase from 'firebase';

  require('firebase/auth')
  //var passwordHash = require('password-hash');

  axios.defaults.baseURL = baseURL;

  // function showAlert(title, message, status) {
  //   swal(title, message, status);
  // }

  export const registerUser = data => ({
    type: USER_REGISTERED,
    data
  });

  export const userLogIn = data => ({
    type: USER_LOGGED_IN,
    data
  });

  export const loggedUser = data => ({
    type: LOGGED_USER,
    data
  });

  export const updateUser = data => ({
    type: UPDATE_USER,
    data
  });

  export const userLogOut = () => ({
    type: USER_LOGGED_OUT
  });

  export const registerShop = data => ({
    type: SHOP_REGISTERED,
    data
  });

  export const shopLogin = data => ({
    type: SHOP_LOGGED_IN,
    data
  });

  export const loginAdmin = data => ({
    type: ADMIN_LOGIN,
    data
  });

  export const logoutAdmin = data => ({
    type: ADMIN_LOGOUT,
    data
  });


  export const shopLogout = () => ({
    type: SHOP_LOGGED_OUT
  });

  export const showError = data => ({
    type: ERRORS,
    data
  });

  export const showSuccess = data => ({
    type: SUCCESS,
    data
  });

  // export const signUpUser = data => dispatch =>
  //   db.collection("users").doc(JSON.parse(data)['email']).set({
  //       username: JSON.parse(data)['username'],
  //       password: passwordHash.generate(JSON.parse(data)['password'])
  //   })
  //   .then(function(docRef) {
  //     showAlert("Great!", "Registered Successfully", "success");
  //   })
  //   .catch(function(error) {
  //     showAlert("Oops!", "Registered not Successful", "error");
  //   });

  export const getLoggedUser = owner => dispatch => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var code = user.phoneNumber.substring(0, 4);
          var number = user.phoneNumber.substring(4);
          var owner = code + " " + number;
          db.ref('Tot/users/' + owner).once('value', function(snapshot) {
            if (snapshot.val() != null) {
              dispatch(loggedUser(snapshot.val()))
            } else {
              dispatch(loggedUser({}))
            }
          });
        } else {
          dispatch(loggedUser({}))
        }
      });
  };

  export const updateAccount = data => dispatch =>
  db.ref(`Tot/users/${JSON.parse(data)['owner']}`).update({
    email: JSON.parse(data)['email'],
    number: JSON.parse(data)['contact'],
    address: JSON.parse(data)['address']
  }, function(error) {
    if (error) {
      dispatch(showError(JSON.stringify({message: "Profile Update Not Completed", status_code: 401, title: "Oops!"})));
    } else {
      dispatch(showSuccess(JSON.stringify({message: "Profile Updated Successfully.", status_code: 200, title: "Great!"})));
    }
  });


  // export const loginUser = data => dispatch =>
  //   db.collection("users").doc(JSON.parse(data)['email']).get().then(function(doc) {
  //       if (doc.exists && passwordHash.verify(JSON.parse(data)['password'], doc.data().password)) {
  //         localStorage.setItem("email", JSON.parse(data)["email"]);
  //         localStorage.setItem("username", doc.data().username);
  //         dispatch(userLogIn(JSON.stringify({"username": doc.data().username, "logInStatus": true, "user_id": doc.id})));
  //         showAlert("Great!", "Logged In Successfully", "success");
  //       } else {
  //         showAlert("Oops!", "Email or Password is wrong", "error");
  //       }
  //   }).catch(function(error) {
  //     showAlert("Oops!", "Email or Password is wrong", "error");
  // });

  export const logoutUser = () => dispatch => {
    localStorage.removeItem("app-access-token");
    return dispatch(userLogOut());
  };

  export const adminLogin = data => dispatch =>
  db.ref('Tot/admins/contributor/' + data.name).once('value', function(snapshot) {
    if (snapshot.val() != null) {
      if (snapshot.val().code.toString() === data.code.toString()) {
        localStorage.setItem("admin", data.name);
        dispatch((loginAdmin({auth: {admin: data.name}})))
        dispatch(showSuccess(JSON.stringify({message: "Logged Successfully", status_code: 200, title: "Great!"})));
      } else {
        dispatch(showError(JSON.stringify({message: "Code is Incorrect.", status_code: 200, title: "Oops!"})));
      }
    } else {
      dispatch(showError(JSON.stringify({message: "Name or Code is wrong!", status_code: 200, title: "Oops!"})));
    }
  });

  export const adminLoginOut = () => dispatch =>
  {
    localStorage.setItem("admin", '');
    dispatch((logoutAdmin({auth: {admin: ''}})))
    dispatch(showSuccess(JSON.stringify({message: "Logged Out Successfully", status_code: 200, title: "Great!"})));
  };

  export const adminSession = () => dispatch =>
  {
    if (localStorage.getItem("admin") === null || localStorage.getItem("admin") === '') {
      dispatch((loginAdmin({auth: {logInStatus: false}})))
    } else {
      dispatch((loginAdmin({auth: {logInStatus: true, admin: localStorage.getItem("admin")}})))
    }
  };

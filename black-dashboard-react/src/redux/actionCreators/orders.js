import {
    GET_CART_LOADING,
    ADD_PRODUCT_TO_CART,
    EDIT_CART_ITEM,
    DELETE_CART_ITEM,
    GET_CART_ITEMS,
    GET_CART_ITEMS_COUNT,
    CHECKOUT,
    PLACE_ORDER,
    UPDATE_ORDER,
    GET_ORDERS,
    CONFIRM_ORDER,
    CANCEL_ORDER,
    GET_CUSTOMER_ORDERS,
    SERVE_ORDER,
    REJECT_ORDER,
    GET_SUBSCRIPTIONS,
    RETURNS,
    SUCCESS,
    ERRORS
  } from "../reducers/constants";
  import axios from "axios";
  import db from '../../utils/firebase';
  import firebase from 'firebase';

  require('firebase/auth')

  // Action Creators
  export const getLoadingStatus = data => ({
    type: GET_CART_LOADING,
    data
  });

  export const addCart = data => ({
    type: ADD_PRODUCT_TO_CART,
    data
  });

  export const checkout = data => ({
    type: CHECKOUT,
    data
  });

  export const editCart = data => ({
    type: EDIT_CART_ITEM,
    data
  });

  export const deleteCart = data => ({
    type: DELETE_CART_ITEM,
    data
  });

  export const getCart = data => ({
    type: GET_CART_ITEMS,
    data
  });

  export const getCartCount = data => ({
    type: GET_CART_ITEMS_COUNT,
    data
  })

  export const placeOrder = data => ({
    type: PLACE_ORDER,
    data
  });

  export const updateOrderOption = data => ({
    type: UPDATE_ORDER,
    data
  });

  export const getSubscriptions = data => ({
    type: GET_SUBSCRIPTIONS,
    data
  });

  export const cancelOrder = data => ({
    type: CANCEL_ORDER,
    data
  });

  export const confirmOrder = data => ({
    type: CONFIRM_ORDER,
    data
  });

  export const getOrders = data => ({
    type: GET_ORDERS,
    data
  });

  export const fetchReturns = data => ({
    type: RETURNS,
    data
  })

  export const getCustomerOrders = data => ({
    type: GET_CUSTOMER_ORDERS,
    data
  });

  export const serveCustomerOrder = data => ({
    type: SERVE_ORDER,
    data
  });

  export const rejectCustomerOrder = data => ({
    type: REJECT_ORDER,
    data
  });

  export const cancelCustomerOrder = data => ({
    type: CANCEL_ORDER,
    data
  });

  export const showError = data => ({
    type: ERRORS,
    data
  });

  export const showSuccess = data => ({
    type: SUCCESS,
    data
  });

  // Create Actions and Have them dispatched
  export const addCartItem = data => dispatch =>
    db.ref(`Tot/cart/${JSON.parse(data)['owner']}`).push().set({
      productName: JSON.parse(data)['name'],
      quantity: JSON.parse(data)['quantity'],
      item_type: JSON.parse(data)['type'],
      productId: JSON.parse(data)['id']
    }, function(error) {
      if (error) {
        dispatch(showError(JSON.stringify({message: "Not added!", status_code: 401, title: "Oops!"})));
      } else {
        dispatch(showSuccess(JSON.stringify({message: "Added to cart.", status_code: 201, title: JSON.parse(data)['name']})));
      }
    });

  export const updateCartItemQuantity = data => dispatch =>
    db.ref(`Tot/cart/${JSON.parse(data)['owner']}/${JSON.parse(data)['id']}`).update({
      quantity: JSON.parse(data)['quantity']
    }, function(error) {
      if (error) {
        dispatch(showError(JSON.stringify({message: "Quantity Not Changed!", status_code: 401, title: "Oops!"})));
      } else {
        dispatch(getCartItems(JSON.parse(data)['owner']));
      }
    });


  export const getCartItems = owner => dispatch => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var code = user.phoneNumber.substring(0, 4);
        var number = user.phoneNumber.substring(4);
        var owner = code + " " + number;
        db.ref('Tot/cart/' + owner).on('value', function(cartSnapshot) {
          var data = cartSnapshot.val()
          if (data != null) {
            Object.keys(data).map(key =>
              db.ref(`Tot/${data[key].item_type}`).on('value', function(productsSnapshot) {

                var pdts = productsSnapshot.val()
                Object.keys(pdts).map(id =>
                   (data[key].productName === pdts[id].itemName)
                   ?
                   dispatch(getCart({"product": pdts[id], "quantity": data[key].quantity, "type": data[key].item_type, "id": key}))
                   :
                   null
                  )
              })
            )
            dispatch(getLoadingStatus(false))
          } else {
            dispatch(getLoadingStatus(false))
          }
        });
      } else {
        dispatch(getLoadingStatus(false))
      }
    });
  };

  export const getCartItemsCount = owner => dispatch => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var code = user.phoneNumber.substring(0, 4);
        var number = user.phoneNumber.substring(4);
        var owner = code + " " + number;
        db.ref('Tot/cart/' + owner).on('value', function(snapshot) {
          if (snapshot.val() != null) {
            dispatch(getCartCount(Object.keys(snapshot.val()).length))
          } else {
            dispatch(getCartCount(0))
          }
        });
      } else {
        dispatch(getCartCount(0))
      }
    });
  };

  export const deleteCartItem = data => dispatch => {
    db.ref(`Tot/cart/${JSON.parse(data)['owner']}/${JSON.parse(data)['id']}`).set(null, function(error) {
      if (error) {
        dispatch(showError(JSON.stringify({message: "Not Removed!", status_code: 401, title: "Oops!"})));
      } else {
        dispatch(showSuccess(JSON.stringify({message: "Removed Successfully.", status_code: 201, title: JSON.parse(data)['product']})));
        dispatch(getCartItems(JSON.parse(data)['owner']));
      }
    });
  };

  export const checkOutCart = data => dispatch => {
    db.ref(`Tot/cart/${data}`).set(null, function(error) {
      if (error) {
        dispatch(showError(JSON.stringify({message: "Checkout Not Successful!", status_code: 401, title: "Oops!"})));
      } else {
        dispatch(showSuccess(JSON.stringify({message: "Checked out Successfully.", status_code: 201, title: "Great"})));
      }
    });
  };

  export const createOrder = data => dispatch =>
    db.ref(`Tot/orders/${JSON.parse(data)['owner']}`).push().set({
      timestamp: Math.floor(Date.now()) + "",
      total: JSON.parse(data)['total'],
      payment: JSON.parse(data)['payment'],
      address: JSON.parse(data)['address'],
      shipping: JSON.parse(data)['shipping'],
      contact: JSON.parse(data)['contact'],
      status: JSON.parse(data)['status'],
      products: JSON.parse(data)['products'],
    }, function(error) {
      if (error) {
        dispatch(showError(JSON.stringify({message: "Order Not Created!", status_code: 401, title: "Oops!"})));
      } else {
        //dispatch(showSuccess(JSON.stringify({message: "Order Placed Successfully.", status_code: 201, title: "Great"})));
        dispatch(checkOutCart(JSON.parse(data)['owner']))
      }
    });

  export const getAllOrders = () => dispatch => {
    db.ref('Tot/orders').on('value', function(orderSnapshot) {
      dispatch(getOrders(orderSnapshot.val()))
      dispatch(getLoadingStatus(false))
    });
  };

  export const serveUserOrder = data => dispatch =>
  db.ref(`Tot/orders/${data.owner}/${data.id}`).update({
    status: data.action
  }, function(error) {
    if (error) {
      dispatch(showError(JSON.stringify({message: "Order Not Served!", status_code: 401, title: "Oops!"})));
    } else {
      dispatch(getAllOrders());
      var notificationData = {title: "Tot Cafe", body: `Your Order ${data.id} has been served and now awaits delivery.`, action: data.action, owner: data.owner}
      dispatch(sendNotification(notificationData))
      dispatch(sendEmail(data.email))
    }
  });

  export const sendNotification = data => dispatch =>
  db.ref(`Tot/users/${data.owner}`).once('value').then(function(snapshot) {
    var userToken = (snapshot.val() && snapshot.val().totUserToken) || null;
    var message = {
        fcmToken : userToken,
        title: data.title,
        message: data.body
    };
    axios
    .post("http://localhost:3030/notification", message)
    .then(function(response) {
      dispatch(showSuccess(JSON.stringify({message: `Order has been ${data.action}.`, status_code: 201, title: "Great"})));
    })
    .catch(function(error) {
      dispatch(showError(JSON.stringify({message: "Notification Not Sent!", status_code: 401, title: "Oops!"})));
    })
  });

  export const sendEmail = data => dispatch => {
    axios
    .post("http://localhost:3030/mail", data)
    .then(function(response) {
      dispatch(showSuccess(JSON.stringify({message: `Email has been sent.`, status_code: 200, title: "Great"})));
    })
    .catch(function(error) {
      dispatch(showError(JSON.stringify({message: "Email Not Sent!", status_code: 401, title: "Oops!"})));
    })
  };

  export const getAllSubscriptions = () => dispatch => {
    db.ref('Tot/subscriptions').on('value', function(snapshot) {
      dispatch(getSubscriptions(snapshot.val()))
      dispatch(getLoadingStatus(false))
    });
  };

  export const updateSubscription = data => dispatch => {
    db.ref(`Tot/subscriptions/${JSON.parse(data)['owner']}/${JSON.parse(data)['id']}`).update({
      status: JSON.parse(data)['status']
    }, function(error) {
      if (error) {
        dispatch(showError(JSON.stringify({message: `Subscription Not ${JSON.parse(data)['status']}!`, status_code: 401, title: "Oops!"})));
      } else {
        dispatch(showSuccess(JSON.stringify({message: `Subscription ${JSON.parse(data)['status']} Successfully.`, status_code: 201, title: "Great"})));
        dispatch(getAllSubscriptions());
      }
    });
  };


  export const updateReturns = data => dispatch => {
    db.ref(`Tot/returns/${JSON.parse(data)['owner']}/${JSON.parse(data)['id']}`).update({
      status: JSON.parse(data)['status']
    }, function(error) {
      if (error) {
        dispatch(showError(JSON.stringify({message: `Return Not ${JSON.parse(data)['status']}!`, status_code: 401, title: "Oops!"})));
      } else {
        dispatch(showSuccess(JSON.stringify({message: `Return ${JSON.parse(data)['status']} Successfully.`, status_code: 201, title: "Great"})));
        dispatch(getAllReturns());
      }
    });
  };


  export const getAllReturns = () => dispatch => {
    db.ref('Tot/returns/').on('value', function(snapshot) {
      dispatch(fetchReturns(snapshot.val()))
      dispatch(getLoadingStatus(false))
    });
  };

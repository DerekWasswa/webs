import {
    ADD_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCT,
    GET_PRODUCTS,
    RATE_PRODUCT,
    GET_PRODUCT_BY_TAG,
    GET_BEST_SELLERS,
    GET_DEALS_OF_THE_WEEK,
    ADD_DEAL_OF_THE_WEEK,
    SUCCESS,
    ERRORS,
    GET_FRUITS,
    GET_JUICE,
    GET_BITES,
    GET_VEGETABLES,
    GET_FOOD,
    GET_PRODUCTS_LOADING
  } from "../reducers/constants";
  // import axios from "axios";
  import db from '../../utils/firebase';


  function handleResponseError(error, dispatch) {
    if (error.response) {
      dispatch(showError({message: error.response.data.message, status_code: error.response.status}));
    }

    if(error.request){
      dispatch(showError({message: "Internet connection or Server Temporarily down! Try again again soon.", status_code: 500}));
    }
  }


  export const addProduct = data => ({
    type: ADD_PRODUCT,
    data
  });

  export const editProduct = data => ({
    type: EDIT_PRODUCT,
    data
  });

  export const rateProduct = data => ({
    type: RATE_PRODUCT,
    data
  });

  export const deleteProduct = data => ({
    type: DELETE_PRODUCT,
    data
  });

  export const getProduct = data => ({
    type: GET_PRODUCT,
    data
  });

  export const getProducts = data => ({
    type: GET_PRODUCTS,
    data
  });

  export const getLoadingStatus = data => ({
    type: GET_PRODUCTS_LOADING,
    data
  });

  export const getFood = data => ({
    type: GET_FOOD,
    data
  });

  export const getFruits = data => ({
    type: GET_FRUITS,
    data
  });

  export const getBites = data => ({
    type: GET_BITES,
    data
  });

  export const getVegs = data => ({
    type: GET_VEGETABLES,
    data
  });

  export const getJuice = data => ({
    type: GET_JUICE,
    data
  });

  export const getBestSellers = data => ({
    type: GET_BEST_SELLERS,
    data
  });

  export const getDealsOfTheWeek = data => ({
    type: GET_DEALS_OF_THE_WEEK,
    data
  });

  export const addDealOfTheWeek = data => ({
    type: ADD_DEAL_OF_THE_WEEK,
    data
  });

  export const getProductByTag = data => ({
    type: GET_PRODUCT_BY_TAG,
    data
  });

  export const showSuccess = data => ({
    type: SUCCESS,
    data
  });

  export const showError = data => ({
    type: ERRORS,
    data
  });

  // Create Actions and Have them dispatched

  export const addProductItem = data => dispatch => {
    return db.ref(`Tot/${data.type}`).push({
      itemName: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      price: data.price,
      unit: data.unit,
      markets: data.markets,
      timestamp: Math.floor(Date.now() / 1000)
    })
    .then(function() {
      dispatch(showSuccess(JSON.stringify({message: `Product has been added Successfully.`, status_code: 201, title: "Great"})));
      dispatch(getAllProducts(data.type));
    })
    .catch(function(error) {
      handleResponseError(error, dispatch);
    });
  };

  export const updateMeal = (data, mealID) => dispatch => {
    // const headers = priviledgedHeader();
    // return axios
    //   .put(`/meals/${mealID}`, data, { headers })
    //   .then(function(response) {
    //     responseSuccess("Meal has been updated Successfully.", response.status);
    //     dispatch(editProduct(response.data));
    //     dispatch(getAllProducts());
    //   })
    //   .catch(function(error) {
    //     handleResponseError(error, dispatch);
    //   });
  };

  export const rateVendorProduct = (data, mealID) => dispatch => {
    // const headers = priviledgedHeader();
    // return axios
    //   .put(`/meals/${mealID}`, data, { headers })
    //   .then(function(response) {
    //     responseSuccess("Meal has been updated Successfully.", response.status);
    //     dispatch(rateProduct(response.data));
    //     dispatch(getAllProducts());
    //   })
    //   .catch(function(error) {
    //     handleResponseError(error, dispatch);
    //   });
  };

  export const deleteShopProduct = mealID => dispatch => {
    // const headers = priviledgedHeader();
    // return axios
    //   .delete(`/meals/${mealID}`, { headers })
    //   .then(function(response) {
    //     responseSuccess("Meal(s) have been deleted.", response.status);
    //     dispatch(deleteProduct());
    //     dispatch(getAllProducts());
    //   })
    //   .catch(function(error) {
    //     handleResponseError(error, dispatch);
    //   });
  };

  export const getAllProducts = (type) => dispatch => {
    db.ref('Tot/' + type).on('value', function(snapshot) {
      if (type === "Fruits") {
        dispatch(getFruits(snapshot.val()))
      } else if (type === "Vegetables") {
        dispatch(getVegs(snapshot.val()))
      } else if (type === "Juice") {
        dispatch(getJuice(snapshot.val()))
      } else if (type === "Food") {
        dispatch(getFood(snapshot.val()))
      } else if (type === "Bites") {
        dispatch(getBites(snapshot.val()))
        dispatch(getLoadingStatus(false))
      }
    });
  };

  export const getSingleProduct = productID => dispatch => {
    db.collection("products").doc(productID).get().then(function(doc) {
        if (doc.exists) {
          console.log(doc.data())
          dispatch(getProduct(doc.data()));
        } else {
          dispatch(getProduct(JSON.stringify({"error": "Product not found!"})));
        }
    }).catch(function(error) {
      dispatch(getProduct(JSON.stringify({"error": "Error fetching product."})));
    });
  };

  export const updateTotProduct = data => dispatch =>
  db.ref(`Tot/${data.type}/${data.id}`).update({
    description: data.description,
    itemName: data.itemName,
    imageUrl: data.imageUrl,
    price: data.price,
    unit: data.unit
  }, function(error) {
    if (error) {
      dispatch(showError(JSON.stringify({message: "Product Not Updated!", status_code: 401, title: "Oops!"})));
    } else {
      dispatch(showSuccess(JSON.stringify({message: `Product has been updated Successfully.`, status_code: 201, title: "Great"})));
      dispatch(getAllProducts(data.type));
    }
  });

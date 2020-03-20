export const USER_REGISTERED = "USER_REGISTERED";
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const LOGGED_USER = "LOGGED_USER";
export const UPDATE_USER = "UPDATE_USER";

export const SHOP_REGISTERED = "USER_REGISTERED";
export const SHOP_LOGGED_IN = "USER_LOGGED_IN";
export const SHOP_LOGGED_OUT = "USER_LOGGED_OUT";

export const ADMIN_LOGIN = "ADMIN_LOGIN";
export const ADMIN_LOGOUT = "ADMIN_LOGOUT";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const GET_FRUITS = "GET_FRUITS";
export const GET_VEGETABLES = "GET_VEGETABLES";
export const GET_FOOD = "GET_FOOD";
export const GET_BITES = "GET_BITES";
export const GET_JUICE = "GET_JUICE";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const GET_PRODUCT_BY_TAG = "GET_PRODUCT_BY_TAG";
export const RATE_PRODUCT = "RATE_PRODUCT";
export const GET_PRODUCTS_LOADING = "GET_PRODUCTS_LOADING";

export const GET_BEST_SELLERS = "GET_BEST_SELLERS";
export const GET_DEALS_OF_THE_WEEK = "GET_DEALS_OF_THE_WEEK";
export const ADD_DEAL_OF_THE_WEEK = "ADD_DEAL_OF_THE_WEEK";

export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const EDIT_CART_ITEM = "EDIT_CART_ITEM";
export const DELETE_CART_ITEM = "DELETE_CART_ITEM";
export const GET_CART_ITEMS = "GET_CART_ITEMS";
export const GET_CART_ITEMS_COUNT = "GET_CART_ITEMS_COUNT";
export const CHECKOUT = "CHECKOUT";
export const GET_CART_LOADING = "GET_CART_LOADING";

export const PLACE_ORDER = "PLACE_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const CANCEL_ORDER = "CANCEL_ORDER";
export const CONFIRM_ORDER = "CONFIRM_ORDER";
export const GET_CUSTOMER_ORDERS = "GET_CUSTOMER_ORDERS";

export const GET_ORDERS = "GET_ORDERS";
export const SERVE_ORDER = "SERVE_ORDER";
export const REJECT_ORDER = "REJECT_ORDER";

export const GET_SUBSCRIPTIONS = "GET_SUBSCRIPTIONS";
export const RETURNS = "RETURNS";

export const ADMIN_DELETE_PRODUCT = "ADMIN_DELETE_PRODUCT";
export const ADMIN_APPROVE_PRODUCT = "ADMIN_APPROVE_PRODUCT";

export const SEND_MAIL_REQUEST = "SEND_MAIL_REQUEST";
export const SEND_MAIL_SUCCESS = "SEND_MAIL_SUCCESS";
export const SEND_MAIL_FAILED = "SEND_MAIL_FAILED";

export const SUCCESS = "SUCCESS";
export const ERRORS = "ERRORS";

// Development baseURL
export const baseURLDevelopement = "http://localhost:3002/";

// Production baseURL
export const baseURLProduction = "https://";

export const baseURL = "https://";

export const kampalaLocations = [
    {name:"Bukoto", price: 5000}, {name: "Bwaise", price: 5000}, {name : "Bugoloobi", price: 5000},
    {name: "Ggaba", price: 7000},
    {name: "Kawempe", price: 5000}, {name: "Kololo", price: 5500}, {name: "Kamwokya", price: 5500}, {name: "Kisementi", price: 5500}, {name: "Kigowa", price: 5000}, {name: "Kisaasi", price: 5500}, {name: "Kulambiro", price: 6000}, {name: "Kyambogo", price: 5000}, {name: "Kyebando", price: 5000}, {name: "Kampala", price: 5000},
    {name: "Lugala", price: 5000}, {name: "Luzira", price: 5500}, {name: "Makerere", price: 5000},
    {name: "Makindye", price: 5000}, {name: "Mbuya", price: 5500}, {name: "Mengo", price: 5000}, {name: "Mulago", price: 5000}, {name: "Munyonyo", price: 6000}, {name: "Muyenga", price: 5000},
    {name: "Nakawa", price: 5000}, {name: "Namirembe", price: 5000},
    {name: "Port Bell", price: 5500}
];

export const wakisoLocations = [
    {name: "Bbanda", price: 5000}, {name: "Bukasa", price: 5000}, {name: "Bibo", price: 5000}, {name: "Bunamwaya", price: 6000}, {name: "Buwate", price: 6000}, {name: "Bwerenga", price: 6000}, {name: "Bweyogerere", price: 5500},
    {name: "Dewe", price: 6000},
    {name: "Entebbe", price: 6000},
    {name: "Gayaza", price: 7000}, {name: "Gobero", price: 7000}, {name: "Gombe", price: 7000}, {name: "Kagoge", price: 6000}, {name: "Kajansi", price: 5000}, {name: "Kasangati", price: 6000}, {name: "Katabi", price: 6000}, {name: "Katale", price: 5000},
    {name: "Kavule", price: 6000}, {name: "Kawanda", price: 6500}, {name: "Kazi", price: 6500}, {name: "Kigo", price: 6500}, {name: "Kiira", price: 6000}, {name: "Kira", price: 6500}, {name: "Kireka", price: 5000}, {name: "Kirinya", price: 5000}, {name: "Kisubi", price: 6000},
    {name: "Kitala", price: 5000}, {name: "Kiteezi", price: 6000}, {name: "Kitende", price: 6000}, {name: "Kyambogo", price: 5000}, {name: "Kyebando", price: 5000},
    {name: "Mukono", price: 7000}, {name: "Namugongo", price: 5500}, {name: "Namulonge", price: 6000}, {name: "Nangabo", price: 6000}, {name: "Nsangi", price: 8000},
    {name: "Nansana", price: 5000}, {name: "Wakiso", price: 7000}
];

export const mukonoLocations = [
    {name: "Bajo", price: 7000}, {name: "Banda", price: 5000}, {name: "Bukerere", price: 7000},
    {name: "Gobero", price: 7000}, {name: "Goma", price: 7000}, {name: "Kazinga", price: 6000},
    {name: "Mpoma", price: 7500}, {name: "Mukono", price: 7000}, {name: "Nagalama", price: 7500}, {name: "Nagojje", price: 8500}, {name: "Nakifuma", price: 8500}, {name: "Namiryango", price: 7000},
    {name: "Seeta", price: 7000}, {name: "Sonde", price: 6500}
];

export const monthMap = {
    "1" : "Jan",
    "2" : "Feb",
    "3" : "March",
    "4" : "April",
    "5" : "May",
    "6" : "June",
    "7" : "July",
    "8" : "Aug",
    "9" : "Sep",
    "10" : "Oct",
    "11" : "Nov",
    "12" : "Dec"
};

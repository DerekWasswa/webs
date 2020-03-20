import Dashboard from "views/Dashboard.jsx";
import Products from "views/Products.jsx";
import Orders from "views/Orders.jsx";
import UserProfile from "views/UserProfile.jsx";
import Subscriptions from "views/Subscriptions.jsx";
import Returns from "views/Returns.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/products",
    name: "Products",
    icon: "tim-icons icon-bullet-list-67",
    component: Products,
    layout: "/admin"
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "tim-icons icon-bag-16",
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/subscriptions",
    name: "Subscriptions",
    icon: "tim-icons icon-bell-55",
    component: Subscriptions,
    layout: "/admin"
  },
  {
    path: "/returns",
    name: "Returns",
    icon: "tim-icons icon-refresh-01",
    component: Returns,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  }
];
export default routes;

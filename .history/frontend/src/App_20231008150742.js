import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import PrivteRouter from "./PrivteRouter";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/search/:keyword" component={HomeScreen} exact />
        <Route path="/page/:pageNumber" component={HomeScreen} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={HomeScreen}
          exact
        />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivteRouter path="/profile" component={ProfileScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <PrivteRouter path="/shipping" component={ShippingScreen} />
        <PrivteRouter path="/payment" component={PaymentScreen} />
        <PrivteRouter path="/placeorder" component={PlaceOrderScreen} />
        <PrivteRouter path="/order/:id" component={OrderScreen} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;

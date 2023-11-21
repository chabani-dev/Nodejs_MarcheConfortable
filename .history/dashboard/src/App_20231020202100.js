import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
import PrivteRouter from "./PrivteRouter";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivteRouter path="/products" component={ProductScreen} />
          <PrivteRouter path="/category" component={CategoriesScreen} />
          <PrivteRouter path="/orders" component={OrderScreen} />
          <PrivteRouter path="/order" component={OrderDetailScreen} />
          <PrivteRouter path="/addproduct" component={AddProduct} />
          <PrivteRouter path="/users" component={UsersScreen} />
          <PrivteRouter
            path="/product/:id/edit"
            component={ProductEditScreen}
          />
          <Route path="/login" component={Login} />
          <PrivteRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

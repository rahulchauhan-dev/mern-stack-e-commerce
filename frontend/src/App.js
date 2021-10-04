import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreenMen from "./screens/ProductScreenMen";
import ProductListMen from "./screens/ProductListMen";
import ProductListWomen from "./screens/ProductListWomen";
import ProductScreenWomen from "./screens/ProductScreenWomen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import MenProductListScreen from "./screens/MenProductListScreen";
import WomenProductListScreen from "./screens/WomenProductListScreen";
import MenProductEditScreen from "./screens/MenProductEditScreen";
import WomenProductEditScreen from "./screens/WomenProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import SearchScreen from "./screens/SearchScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import AboutScreen from "./screens/AboutScreen";
import AdminContactScreen from "./screens/AdminContactScreen";
import WishListScreen from "./screens/WishListScreen";

function App() {
  return (
    <Router>

      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />

          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/wishlist' component={WishListScreen} />


          <Route path='/:cate?/menproduct/:id' component={ProductScreenMen} />
          <Route path='/:cate?/womenproduct/:id' component={ProductScreenWomen} />
          <Route path='/menswear/:category' component={ProductListMen} exact />
          <Route path='/womenswear/:category' component={ProductListWomen} exact />
          <Route path='/cart/:id?' component={CartScreen} exact />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/menproductslist' component={MenProductListScreen} />
          <Route path='/admin/womenproductslist' component={WomenProductListScreen} />
          <Route path='/admin/mensproduct/:category/:id/edit' component={MenProductEditScreen} />
          <Route path='/admin/womensproduct/:category/:id/edit' component={WomenProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/admin/contacts' component={AdminContactScreen} />


          <Route path='/search/:keyword' component={SearchScreen} exact />
          <Route path='/contact' component={ContactUsScreen} exact />
          <Route path='/about' component={AboutScreen} exact />




          <Route path='/' component={HomeScreen} exact />


        </Container>

      </main>
      <Footer />

    </Router>

  );
}

export default App;

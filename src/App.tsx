import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import AdminLogin from "./pages/admin-login/adminLogin"
import SignUp from "./pages/signup/SignUp"
import Verification from "./pages/verification/Verification"
import Business from "./pages/business/Business"
import BusinessRegister from "./pages/business-register/BusinessRegister"
import CustomerProfile from "./pages/customer-profile/customerProfile"
import DashBoard from "./pages/dashBoard/DashBoard"
import SellerDashBoard from "./pages/seller-dashboard/sellerDashboard"
import Products from "./pages/seller-products/sellerProduct"
import AddProduct from "./pages/add-product/AddProduct"
import AddCategory from "./pages/add-category/addCategory"
import SponsoredProduct from "./pages/sponsored-product/sponsoredProduct"
import Category from "./pages/category/category"
import CategoryProducts from "./pages/category-product/categoryProduct"
import Seller from "./pages/seller/seller"
import ProductDetails from "./pages/product-details/productDetails"
import SearchProducts from "./pages/search-products/searchProducts"
import AdminCategory from "./pages/admin-category/adminCategory"
import Message from "./pages/message/Messages"
// import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit"
import { loadUser } from "./store/user-slice/userSlice"
// import { loadSeller } from './store/user-slice/userSlice';

//------------------------------ Routes ---------------------//
export const home = "/";
export const login = "/login";
export const admin_login = "/admin-login";
export const signup = "/signup";
export const products = "/products";
export const sponsored_products = "/sponsored-product";
export const category = "/category";
export const seller = "/seller";
export const message = "/message";
export const dashBoard = "/dashboard";
export const seller_dashBoard = "/seller-dashboard";
export const base_add_product = "/add-product";
export const add_category = "/add-category";
export const add_product = "/add-product/:url";
export const category_products = "/products";
export const product_details = ":categoryName/products/:productName";
export const search_products = "/search/products";
export const search_product_details = "search/products/:productName";
export const verification = "/verification"
export const business = "/business";
export const business_register = "/business-register";
export const customer_profile = "/customer-profile";
export const admin_category = "/admin-category";

const App = () => {

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(loadUser());
    // dispatch(loadSeller());
  }, [])


  return (
    <>
      <Routes>
        <Route path={home || "/"} element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path={admin_login || "/admin-login"} element={<AdminLogin />} />
        <Route path={admin_category || "/admin-category"} element={<AdminCategory />} />
        <Route path={signup || "/signup"} element={<SignUp />} />
        <Route path={dashBoard || "/dashboard"} element={<DashBoard />} />
        <Route path={seller_dashBoard || "/seller-dashboard"} element={<SellerDashBoard />} />
        <Route path={products || "/products"} element={<Products />} />
        <Route path={add_product || "/add-product/:url"} element={<AddProduct />} />
        <Route path={search_products || "/search/products"} element={<SearchProducts />} />
      <Route path={search_product_details} element={<ProductDetails/>} />
        
      <Route path="/:categoryName/products" element={<CategoryProducts/>} />
      <Route path={product_details} element={<ProductDetails/>} />
        <Route path={add_category || "/add-category"} element={<AddCategory />} />
        <Route path={sponsored_products || "/sponsored-product"} element={<SponsoredProduct />} />
        <Route path={category || "/category"} element={<Category />} />
        <Route path={seller || "/seller"} element={<Seller />} />
        <Route path={message || "/message"} element={<Message />} />
        <Route path={verification || "/verification"} element={<Verification />} />
        <Route path={business || "/business"} element={<Business />} />
        <Route path={business_register || "/business-register"} element={<BusinessRegister />} />
        <Route path={"/customer-profile"} element={<CustomerProfile />} />
      </Routes>
    </>
  )
}

export default App
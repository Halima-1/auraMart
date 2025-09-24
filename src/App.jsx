// import { useState } from "react";
import "./styles/product.css";
import Product from "./pages/productPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./component/productDetails";
import Login from "./component/form/login";
import Register from "./component/form/register";
import Header from "./component/layout/header";
import Footer from "./component/layout/footer";
import Home from "./component/home/home";
import Cart from "./pages/cart/cart";
import Checkout from "./pages/checkout/checkout";
import Wishlist from "./pages/wishlist/wishlist";
import { Outlet } from "react-router-dom";
function App() {
  // const [count, setCount] = useState(0);
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/productPage" element={<Product />} />
          <Route path="/home" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
        </Route>
        <Route path="/register" element={<Register />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    // <>
    //   <main>
    //     <div >
    //       <Product />
    //     </div>
    //   </main>
    // </>
  );
}

export default App;

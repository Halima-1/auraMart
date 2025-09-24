// / import ReactDOM from "react-dom/client";
import "../styles/product.css";
// import { useState } from "react";
import TopRated from "../component/topRated";
import NewProducts from "../component/newProducts";
import ProductCategory from "../component/productCategory";
import { product } from "../assets/productImages";
function Product() {
  // const [cart, setCart] = useState()
  const user = JSON.parse(localStorage.getItem("user")) || [];
  // const allUsers = JSON.parse(localStorage.getItem("users"));
  // const updateUser = allUsers.find((item) => item.email == user[0].email);
  // console.log(updateUser);
  // To handle add to cart
  const handleAddToCart = (product) => {
    // const userCart = user[0].cart || [];
    const userCart = JSON.parse(localStorage.getItem("user-cart")) || [];
    const checkCart = userCart.find((item) => item.id === product.id);
    if (checkCart) {
      console.log(checkCart);
      checkCart.quantity = checkCart.quantity + 1;
      console.log(" item exist");
    } else {
      userCart.unshift({ ...product, quantity: 1 });
      // setCart([...cart, product]);
      console.log("no existing item");
      localStorage.setItem("user-cart", JSON.stringify(userCart));
      console.log(userCart);
    }

    // To update each user's cart
    console.log(userCart);
    // updateUser.cart = userCart;
  };

  // To handle add to Wishlist
  // const userWishList = user[0].wishList || [];
  const handleAddToWishlist = (product) => {
    const userWishList = localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : [];
    const checkWishList = userWishList.find((item) => item.id == product.id);
    if (checkWishList) {
      console.log("item is already in the wishlist");
    } else {
      userWishList.unshift(product);
      console.log("one item added to wish list!");
    }
    // user.wishList = userWishList;

    // updateUser.wishList = userWishList;
    // localStorage.setItem("wishlist", JSON.stringify(userWishList));

    localStorage.setItem("wishlist", JSON.stringify(userWishList));
    console.log(userWishList);
    // localStorage.setItem("user", JSON.stringify(user));
    // localStorage.setItem("users", JSON.stringify(allUsers));
  };

  return (
    <>
      <div className="category">
        <h2>Newest products </h2>
      </div>
      <div className="container">
        <NewProducts
          product={product}
          onAddToWishlist={handleAddToWishlist}
          onAddToCart={handleAddToCart}
        />
      </div>
      <div className="category">
        <h2>Top rated products </h2>
      </div>
      <div className="container">
        <TopRated
          product={product}
          onAddToWishlist={handleAddToWishlist}
          onAddToCart={handleAddToCart}
        />
      </div>
      <ProductCategory
        product={product}
        onAddToWishlist={handleAddToWishlist}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}

export default Product;

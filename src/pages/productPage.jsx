// / import ReactDOM from "react-dom/client";
import "../styles/product.css";
// import { useState } from "react";
import TopRated from "../component/topRated";
import NewProducts from "../component/newProducts";
import ProductCategory from "../component/productCategory";
import { product } from "../assets/productImages";
import { doc, setDoc,collection, getDoc, updateDoc, arrayUnion, getDocs  } from "firebase/firestore";
import {db, auth } from "../config/firebase";
import { getAuth } from "firebase/auth";
// export const saveCart = async (userId, cartItems) => {
//   await setDoc(doc(db, "carts", userId), {
//     items: cartItems,
//     updatedAt: new Date()
//   });
// };

// // Get cart
//  export const getCart = async (userId) => {
//   const docSnap = await getDoc(doc(db, "carts", userId));
//   if (docSnap.exists()) {
//     return docSnap.data().items;
//   } else {
//     return [];
//   }
// };

function Product() {
 const handleAddToCart = async (product) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("⚠️ User not logged in");
    return;
  }

  try {
    const cartItemRef = doc(db, "users", user.uid, "cart", product.id.toString());
    const cartSnap = await getDoc(cartItemRef);
    // console.error(cartItemRef);

    if (cartSnap.exists()) {
      return
      // If item already exists → increment quantity
      // const currentQty = cartSnap.data().quantity || 1;
      // await updateDoc(cartItemRef, {
      //   quantity: currentQty + 1,
      // });
      // console.log(`🔼 Increased quantity of ${product.description} to ${currentQty + 1}`);
    } else {
      // If item doesn’t exist → create new doc
      await setDoc(cartItemRef, {
        ...product,
        quantity: 1,
      });
      console.log(`✅ Added ${product.description} to cart`);
    }

    // 👀 Fetch the updated cart to display in console
    const updatedCartSnap = await getDoc(cartItemRef);
    console.log("🛒 Updated Cart Item:", updatedCartSnap.data());
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
  }
};
    const handleAddToWishlist = (product) => {
    }

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

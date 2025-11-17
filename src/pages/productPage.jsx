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
import Collections from "../component/collections/collections";
import { useState } from "react";

function Product() {
 const handleAddToCart = async (product) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("⚠️ User not logged in");
    const cart = JSON.parse(localStorage.getItem("guestCart")) || [];
    const existingItem =cart.find(item => item.id ===product.id)
    if (existingItem){
      console.log("item already in cart")
      return
    }
    product.quantity=1
    window.location.href="/productPage"
    cart.push(product);
    localStorage.setItem("guestCart", JSON.stringify(cart));
    return;
  }

  try {
    const guestCart =JSON.parse(localStorage.getItem("guestCart")) 
    const cartItemRef = doc(db, "users", user.uid, "cart", product.id.toString());
    const cartSnap = await getDoc(cartItemRef);
    console.log(guestCart);
    const userCart = {};

  cartSnap.find(item => {
    userCart[item.id] = item.data();  // map by productId
  });
   // 3. Merge guest cart into Firestore cart
   for (const item of guestCart) {
    const productId = item.id;
    if (userCart[productId]) {
      // product exists in Firestore → update qty
      await setDoc(doc(db, "users", user.uid, "cart", productId), {
        ...item,
        quantity: userCart[productId].quantity + item.quantity,
      });
    } else {
      // new product → add to Firestore
      await setDoc(cartItemRef, {
        ...product,
        quantity: 1,
      });
      // console.log(`✅ Added ${product.description} to cart`);
    }
    // lllllllll
    // if (cartSnap.exists()) {
    //   return
    // } else {
    //   // If item doesn’t exist → create new doc
    //   await setDoc(cartItemRef, {
    //     ...product,
    //     quantity: 1,
    //   });
    //   console.log(`✅ Added ${product.description} to cart`);
    // }
    // 👀 Fetch the updated cart to display in console
    // const updatedCartSnap = await getDoc(cartItemRef);
    // console.log("🛒 Updated Cart Item:", updatedCartSnap.data());
  }} catch (error) {
    console.error("❌ Error adding to cart:", error);
  }
// };
}
// to display items by category
    let [byCategory, setByCategory] =useState([]);
    let [catee, setCatee] =useState("all");
    localStorage.setItem("category", catee)
    const category = (e) => {
       let selectedCty = e.target.dataset.id
       e.target.style.backgroundColor="navy"
      localStorage.setItem("category", selectedCty)
        const catee =localStorage.getItem("category") || "all"
        setCatee(localStorage.getItem("category") || "all")
      setByCategory(product.filter(
        (product) => product.category.toLowerCase() == catee
      ))
      console.log(catee)
    };
  // catee =localStorage.getItem("category")
  const handleAddToWishlist = (product) => {
  }
  return (
    <>
    <div className="nav">
    <button onClick={category}
     data-id="all"
     style={catee =="all"? {backgroundColor:"navy", color:"white"}:null}
     >All</button>
      <button onClick={category} 
           style={catee =="fragrances"? {backgroundColor:"navy", color:"white"}:null}
      data-id="fragrances">Fragrances</button>
      <button onClick={category} 
      style={catee =="furniture"? {backgroundColor:"navy", color:"white"}:null}
      data-id="furniture">Furniture</button>
      <button onClick={category} 
      style={catee =="groceries"? {backgroundColor:"navy", color:"white"}:null}
      data-id="groceries">Groceries</button>
      <button onClick={category} 
      style={catee == "beauty"? {backgroundColor:"navy", color:"white"}:null}
      data-id="beauty">Beauty</button>
      {/* <button></button> */}
    </div>
      <ProductCategory
        product={product}
        byCategory={byCategory}
        // onAddToWishlist={handleAddToWishlist}
        onAddToCart={handleAddToCart}
      />
      <div className="category ">
        <h2>Newest products </h2>
      </div>
      <div className=" marquee">
        <NewProducts
          product={product}
        />
              </div>
              <div className="category">
        <h2>Our best collections </h2>
      </div>
        <Collections product={product}/>

    
    </>
  );
}
export default Product;

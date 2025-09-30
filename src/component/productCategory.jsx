import { FiSearch } from "react-icons/fi";
import { BiHeart } from "react-icons/bi";
import { useState } from "react";
import { product } from "../assets/productImages";
import { useNavigate } from "react-router-dom";
import "../styles/product.css";
import ProductCard from "./productCard";

function ProductCategory({product, onAddToCart, byCategory}) {
  const route =useNavigate()
  // let [searchProduct, setSearchProduct] = useState([]);
// const allProducts = product.filter(product => product.id %2 ==0)

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setSearchProduct(value);
//   };
//   const handleSubmit = () => {
//     console.log(searchProduct);
// setByCategory(product.filter(
//       (product) => product.category.toLowerCase() == searchProduct.toLowerCase()
//     ))
//   };
  return (
    <>
      {byCategory && (
        <>
          {/* <h2>{localStorage.getItem("category")} category</h2> */}
          <div className="container"
          style={localStorage.getItem("category") =="all"?{display:"none"}:null}
          >
            {byCategory.map((product) => (
                         <ProductCard product={product} onAddToCart={onAddToCart} key={product.id}/>
            ))}
            ;
          </div>
        </>
      )}
      ;
      {localStorage.getItem("category") =="all"? product && (
        <div className="container">
          {product.map((product) => (
                       <ProductCard onAddToCart={onAddToCart} product={product} key={product.id}
                       />
          ))}
        </div>
      ):null}
    </>
  );
}

export default ProductCategory;

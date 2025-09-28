import { FiSearch } from "react-icons/fi";
import { BiHeart } from "react-icons/bi";
import { useState } from "react";
import { product } from "../assets/productImages";
import { useNavigate } from "react-router-dom";
import "../styles/product.css";
import ProductCard from "./productCard";

function ProductCategory({product, onAddToCart, onAddToWishlist}) {
  const route =useNavigate()
  let [searchProduct, setSearchProduct] = useState("");
let [byCategory, setByCategory] =useState("");
const allProducts = product.filter(product => product.id %2 ==0)

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchProduct(value);
  };
  const handleSubmit = () => {
    console.log(searchProduct);
setByCategory(product.filter(
      (product) => product.category.toLowerCase() == searchProduct.toLowerCase()
    ))
  };


  return (
    <>
      <form
        action=""
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          name="search"
          onChange={handleChange}
          placeholder="search by category"
        />
        <FiSearch onClick={handleSubmit} />
        {/* <input type="submit" value="search" /> */}
      </form>
      {byCategory && (
        <>
          <h2>all category</h2>
          <div className="container">
            {byCategory.map((product) => (
                         <ProductCard onAddToCart={onAddToCart} key={product.id}/>
            ))}
            ;
          </div>
        </>
      )}
      ;
      {allProducts && (
        <div className="container">
          {allProducts.map((product) => (
                       <ProductCard onAddToCart={onAddToCart} product={product} key={product.id}
                       />
          ))}
        </div>
      )}
    </>
  );
}

export default ProductCategory;

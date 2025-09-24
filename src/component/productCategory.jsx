import { FiSearch } from "react-icons/fi";
import { BiHeart } from "react-icons/bi";
import { useState } from "react";
import { product } from "../assets/productImages";
import { useNavigate } from "react-router-dom";
import "../styles/product.css";

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
              <div
                className="product-card"
                key={product.id}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
              >
                <div
                  className="image"
                  onClick={() => {
                    route(`/productDetails/${product.id}`);
                  }}
                >
                  <BiHeart className="wish" onClick={ () =>OnAddToWishlist(product)} />

                  <img src={product.images[0]} alt={product.title} />
                </div>
                <div className="description">
                  <p className="title">{product.title}</p>
                  <p className="descr">{product.description}</p>
                  <div>
                    <p className="newP"></p>
                    <p className="discountedP"></p>
                  </div>
                  <div className="rating"></div>
                  <button
                    className="add-to-cart"
                    onClick={() => onAddToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
            ;
          </div>
        </>
      )}
      ;
      {allProducts && (
        <div className="container">
          {allProducts.map((product) => (
            <div
              className="product-card"
              onAddToCart={onAddToCart}
              key={product.id}
            >
              <div
                className="image"
                onClick={() => {
                  route(`/productDetails/${product.id}`);
                }}
              >
                <BiHeart className="wish" />

                <img src={product.images[0]} alt={""} />
              </div>
              <div className="description">
                <p className="title">{product.title}</p>
                <p className="descr">{product.description}</p>
                <div>
                  <p className="newP"></p>
                  <p className="discountedP"></p>
                </div>
                <div className="rating"></div>
                <button
                  className="add-to-cart"
                  onClick={() => onAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ProductCategory;

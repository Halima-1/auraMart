 import { BsCart3 } from "react-icons/bs";
 import { BiHeart } from "react-icons/bi";
 import { useNavigate } from "react-router-dom";
 
 function ProductCard({product, onAddToCart, onAddToWishlist}) {
  // console.log(product)
    return (
      <>
        
        <div
              key={product.id}
              className="product-card"
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
            >
              <div
                className="image"
                onClick={() => {
                  route(`/productDetails/${product.id}`);
                }}
              > 
                <BiHeart
                  className="wish"
                  onClick={() => onAddToWishlist(product)}
                />
                <img src={product.images[0]} alt={product.title} />
              </div>
              <div className="description"> 
                <b>{product.title}</b>
                <p className="descr">{product.description.slice(0,30)+"..."}</p>
                  <p className="price">${product.price}</p>
                <button
                  className="add-to-cart"
                  onClick={() => onAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
      </>
    );
  }

  export default ProductCard;

import { BsCart3, BsStar } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function NewProducts({product, onAddToCart, onAddToWishlist}) {
  const route = useNavigate()
    return (
      <>
        {product
          .sort((a, b) => a.index - b.index)
          .slice(5, 9)
          .map((product) => (
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
                <p className="descr">{product.description}</p>
                <div>
                  <p className="price">{product.price}</p>
                  <p className="title">{product.availableQuantity}</p>
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
      </>
    );
}

export default NewProducts;

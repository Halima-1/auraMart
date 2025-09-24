import { Fragment } from "react";
import { BiHappyHeartEyes, BiHeart } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function TopRated({ product, onAddToCart, onAddToWishlist }) {
  const route = useNavigate();
  // const revealProductIcon = () => ;
  return (
    <Fragment>
      {product
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4)
        .map((product) => (
          <div
            key={product.id}
            className="product-card"
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
          >
            <div className="image" onMouseOver={() => {
    const productIcon = document.getElementById(`product-icons${product.id}`);
    if (productIcon.classList.contains("hideProductIcons")) {
      productIcon.classList.remove("hideProductIcons");
      productIcon.classList.add("showProductIcons");
    } else {
      productIcon.classList.remove("showProductIcons");
      productIcon.classList.add("hideProductIcons");
    }
  }}>
              <img src={product.images[0]} alt={product.title} />
              <div
                className="productIcon hideProductIcons"
                id={`product-icons${product.id}`}
              >
                <BiHeart
                  className="wish"
                  onClick={() => onAddToWishlist(product)}
                />
                <BsEye
                  onClick={() => {
                    route(`/productDetails/${product.id}`)
                  }}
                />
              </div>{" "}
            </div>

            <div className="description">
              <p className="descr">
                {product.description.slice(0, 40) + "..."}
              </p>
              <p className="price">{product.price}</p>
              {/* <p className="title">{product.availableQuantity}</p> */}

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
    </Fragment>
  );
}

export default TopRated;

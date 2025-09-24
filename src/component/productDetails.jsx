import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiHeart } from "react-icons/bi";
import { product } from "../assets/productImages";

function ProductDetails() {
  const route =useNavigate()
  const [displayValue, setDisplayValue] = useState(0);
  const params = useParams();
  const id = params.id;
  const details = product.filter((item) => {
    return item.id == id;
  });

  // console.log(params.id);

  // console.log(details);
  const image = details[0].images;
  // console.log(image);
  const productt = details[0]

  const relatedProduct =product.filter(product => product.category == details[0].category)
  return (
    <Fragment>
      <div className="display-card">
        {details && (
          <>
            <div className="details-side">
              {details[0].images.map((item, index) => (
                <img
                  key={index}
                  src={`../${item}`}
                  alt=""
                  // style={{ width: 120, height: 120 }}
                  onClick={() => setDisplayValue(index)}
                />
              ))}
            </div>

            <div>
              <div className="full-image image">
                <BiHeart className="wish" />

                <img
                  // style={{ width: 120, height: 120, display: "block" }}
                  src={`../${image[displayValue]}`}
                  alt={details[0].description}
                />
                <p>{details[0].color[displayValue]}</p>
              </div>
            </div>
            <div className="contain">
              <b>{details[0].category}</b>
              <p>{`${details[0].color[displayValue]}/${details[0].description}`}</p>
              <p>{`${details[0].price} Yards`}</p>
              <button
                onClick={() => {
                  const cart = localStorage.getItem("cart")
                    ? JSON.parse(localStorage.getItem("cart"))
                    : [];
                  console.log(image[displayValue]);
                  const checkCart = cart.find(
                    (item) => item.id === productt.id
                  );
                  console.log(checkCart);
                  if (checkCart) {
                    if (image[displayValue] == checkCart.images[0]) {
                      checkCart.quantity = checkCart.quantity + 1;
                      console.log(" item exist");
                    } else {
                      cart.unshift({
                        ...productt,
                        quantity: 1,
                        availableQuantity: [
                          productt.availableQuantity[displayValue],
                        ],
                        color: [productt.color[displayValue]],
                        images: [image[displayValue]],
                      });
                    }
                  } else {
                    cart.unshift({
                      ...productt,
                      quantity: 1,
                      availableQuantity: [
                        productt.availableQuantity[displayValue],
                      ],
                      color: [productt.color[displayValue]],
                      images: [image[displayValue]],
                    });
                    // setCart([...cart, product]);
                    console.log("no existing item");
                    console.log(checkCart);
                  }
                  localStorage.setItem("cart", JSON.stringify(cart));
                  console.log(cart);
                }}
              >
                Add to cart
              </button>
            </div>
          </>
        )}
      </div>
      {relatedProduct && (
        <section>
          <h2>Related products</h2>

          <div className="container">
            {relatedProduct.map((item) => (
              <div
                key={item.id}
                className="product-card"
                // onAddToCart={onAddToCart}
              >
                <div
                  className="image"
                  onClick={() => {
                    // route(`/productDetails/${item.id}`);
                          window.location.href = `${item.id}`;

                  }}
                >
                  <BiHeart className="wish" />

                  <img src={`../${item.images[0]}`} alt={item.title} />
                </div>
 
                <div className="description">
                  <p className="title">{item.title}</p>
                  <p className="descr">
                    {item.description.slice(0, 40) + "..."}
                  </p>
                  <div>
                    <p className="newP"></p>
                    <p className="discountedP"></p>
                  </div>
                  <div className="rating"></div>
                  {/* <button
                      className="add-to-cart"
                      onClick={() => onAddToCart(product)}
                    >
                      Add to cart
                    </button> */}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </Fragment>
  );
}

export default ProductDetails;

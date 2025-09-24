import { useState } from "react";
import { BiHeart, BiPlus, BiUserMinus } from "react-icons/bi";
import "./cart.css";
import { BsApple, BsArrowRightShort, BsTrash3 } from "react-icons/bs";
import { product } from "../../assets/productImages";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
console.log(product);

function Cart() {
  const [errMessage, setErrMessage] = useState({});
  const navigate = useNavigate();
  const newErr = {};
  console.log(product);
  const cart = JSON.parse(localStorage.getItem("user-cart")) || [];
  // console.log(user);

  // const cart = user[0].cart || [];

  // to remove item from cart;
  // const allUsers = JSON.parse(localStorage.getItem("users"));
  // const updateUser = allUsers.find((item) => item.email == user[0].email);

  // console.log(updateUser);
  function removeCart(id) {
    const index = cart.findIndex((item) => item.id == id);
    if (index == -1) {
      console.log("your cart is empty");
      console.log(index);
    } else {
      console.log("there is something in the cart");
      console.log(index);
      cart.splice(index, 1);
      window.location.href = "cart";
      // updateUser.cart = cart;
      localStorage.setItem("user-cart", JSON.stringify(cart));
      // localStorage.setItem("users", JSON.stringify(allUsers));
    }
  }

  const subTotal = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  // total cart Item
  const totalCartItem = cart.reduce((totalItem, product) => {
    return totalItem + product.quantity;
  }, 0);
  console.log(subTotal);

  // delivery methods
  const deliver = () => {
    localStorage.removeItem("pickUp");
    localStorage.setItem("delivery", "delivery method:To be delivered");
  };

  const pickUp = () => {
    localStorage.removeItem("delivery");
    localStorage.setItem("pickUp", "delivery method: To be picked");
  };

  const deliveryMtdValidatn = () => {
    const deliveryMessage =
      localStorage.getItem("delivery") || localStorage.getItem("pickUp");

    console.log(deliveryMessage);
    if (cart.length !== 0) {
      if (deliveryMessage) {
        navigate("/checkout");
        console.log(cart);
      } else {
        newErr.deliveryErr = "select a delivery method";
        console.log(newErr);
      }
    } else {
      newErr.deliveryErr = "Your cart is empty!";
      console.log(newErr);
    }
    setErrMessage(newErr);
  };

  // to display cart item(s)
  return (
    <main>
      <div className="container">
        <div className="item">
          <p id="itemLength">
            {/* Hi{" "}
            <span style={{ color: "blue", textTransform: "capitalize" }}>
              {updateUser.username},
            </span>{" "} */}
            Your cart item is {totalCartItem}
          </p>
          <b>keep shopping</b>
        </div>
        <div id="cartContainer">
          {!cart || cart.length == 0 ? (
            <div className="empty-cart">
              <img
                style={{ width: 150, height: 150 }}
                src="src/assets/images/empty cart.jpg"
                alt="empty cart"
              />
              <h2>your cart is empty</h2>
              <p>
                Go back to <Link to="/productPage">Shop</Link>{" "}
              </p>
            </div>
          ) : (
            <>
              <div id="productDetails">
                {cart.map((item) => (
                  <div id="aboutItem" key={item.images[0]}>
                    <div className="product">
                      <img src={item.images[0]} alt="" />
                    </div>
                    <div className="about">
                      <div className="desc"></div>
                      <p>price per item: ${item.price}</p>
                      <p className="colour">colour:{item.color[0]}</p>
                      {/* <p id="variant">variant:</p> */}
                      <div className="quantity">
                        <div className="length">
                          <span className="reduce">
                            <BiUserMinus />
                          </span>
                          <span>
                            <BiPlus className="increment-btn" />
                          </span>{" "}
                          <span id="quantity-${item.id}">{item.quantity}</span>
                          <div className="icon">
                            {/* <BiSolidLogIn /> */}
                            <BsTrash3
                              product={product}
                              onClick={() => removeCart(item.id)}
                            />
                            {/* <BiSolidLogInCircle /> <BiSolidLogOut /> */}
                          </div>
                        </div>
                        <span className="list">
                          {" "}
                          <BiHeart />
                        </span>
                        <span className="list">Add note</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="toCheckout">
            <div className="toGet">
              <p>
                <b>How do you want to get your item?</b>
              </p>
              <div>
                <p id="delivery" onClick={() => deliver()}>
                  Delivery
                </p>
                <p id="pickUp" onClick={() => pickUp()}>
                  Pick up
                </p>
                {/* <span style={{color:"red"}}>{del</span> */}
                {/* <p>{deliveryMessage}</p> */}
              </div>
            </div>
            <div id="details">
              <p>
                <b>Order details</b>
                <p></p>
              </p>
              <div className="total">
                <p id="totalItem">Total item(s): {totalCartItem}</p>
                <p id="totalPrice">#{subTotal}</p>
              </div>
              {errMessage.deliveryErr && (
                <p
                  style={{
                    width: "65%",
                    color: "red",
                    fontSize: 15,
                    margin: "10 auto",
                  }}
                >
                  {errMessage.deliveryErr}
                </p>
              )}
              <button id="checkout" onClick={() => deliveryMtdValidatn()}>
                proceed to checkout
              </button>

              <div className="coupon">
                <div className="icon">
                  <BsApple />
                </div>
                <button>Apply coupon code</button>
                <BsArrowRightShort />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;

import { useEffect, useState } from "react";
import { BiHeart, BiMinus, BiPlus, BiUserMinus } from "react-icons/bi";
import "./cart.css";
import { BsApple, BsArrowRightShort, BsTrash, BsTrash3 } from "react-icons/bs";
import { product } from "../../assets/productImages";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getFirestore, doc, getDocs, deleteDoc, collection, onSnapshot, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../config/firebase";
console.log(product);

function Cart() {
  const [errMessage, setErrMessage] = useState({});
  const navigate = useNavigate();
  const newErr = {};
  console.log(product);
  // const cart = JSON.parse(localStorage.getItem("user-cart")) || [];
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const db = getFirestore();
  // const user = auth.currentUser;
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false)
    });
    return () => unsubscribeAuth();
  }, []);
  useEffect(() => {
    if (!user) {
      setCart(JSON.parse(localStorage.getItem("guestCart")))
      return
    }
    
    // return;
    setLoading(true)
    const cartRef =collection(db, "users", user.uid, "cart");
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map(docSnap => ({
        id: docSnap.id,   
        ...docSnap.data()
      }));
      setCart(items);
      setLoading(false)
    });
    return () => unsubscribe();
  }, [user]);
console.log(cart)
console.log(user)

  // if (loading) return <p>Loading cart...</p>;
  
// remove item from cart
  const removeItem = async (itemId) => {
    const itemRef = doc(db, "users", user.uid, "cart", itemId.toString());
    await deleteDoc(itemRef);
  };

  // increase item quantity
  const increaseQty = async (item) => {
    const itemRef = doc(db, "users", user.uid, "cart", item.id.toString());
    await updateDoc(itemRef, {
      quantity: item.quantity + 1
    });
    console.log(item)
  };

  // decrease item quantity
  const decreaseQty = async (item) => {
    if (item.quantity > 1) {
      const itemRef = doc(db, "users", user.uid, "cart", item.id.toString());
    await updateDoc(itemRef, {
      quantity: item.quantity - 1
    });
    console.log(item)
  }};

  // total price of items in cart
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
        {!user? <span style={{color:"red"}}>Log in to edit or delete cart items</span>: null}
        <div id="cartContainer">
          {loading? <div className="spinner"></div>
//  :!user? <div className="empty-cart"><p>login to see your cart content</p>
//  <Link to= "/login">Login page</Link>
//  </div>
 :!cart || cart.length == 0 ? (
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
                      <img src={item.images[0]} alt="cart item" />
                    </div>
                    <div className="about">
                    <p className="desc">{item.title}</p>
                      <p>price per item: #{item.price}</p>
                      <b>price : #{item.price * item.quantity}</b>
                      {/* <p className="colour">colour:{item.color[0]}</p> */}
                      <div className="quantity">
                        <div className="length">
                          <span onClick={() =>decreaseQty(item)} className="reduce">
                            <BiMinus />
                          </span>
                          <span id="itemQty">{item.quantity}</span>

                          <span>
                            <BiPlus onClick={() =>increaseQty(item)} className="increment-btn" />
                          </span>{" "}
                            <BsTrash id="icon"
                              product={product}
                              onClick={() => removeItem(item.id)}
                            />
                        </div>
                        {/* <span className="list">
                          {" "}
                          <BiHeart />
                        </span> */}
                        {/* <span className="list">Add note</span> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="toCheckout">
            {cart.length !== 0 ? <>
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
            </>:null}
           
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;

import { useNavigate } from "react-router-dom";
import "./checkout.css";

function Checkout (){
    const navigate =useNavigate()
    return(
        <>
  <main>
        <div className="checkout-container">
            <div>
                <h1>Checkout</h1>
            </div>
            <div className="payment">
                <div className="cardDetails">
                    <h3>Payment method</h3>
                    <div className="cards">
                        <div><img src="../src/assets/images/card.jpg" alt=""/></div>
                    </div>
                    <form>
                        <p>Payment details</p>
                        <input type="text" placeholder="Enter name on card" required id="name"/>
                        <input type="number" placeholder="Card number " required id="name"/>
                        <input type="datetime" placeholder="Expiration" id="expir"/>
                        <input type="number" placeholder="CVV code" required id="cvv"/>
                    <p  className="warning">By clicking confirm payment you agree to the Company's <a href="">Terms and privacy policy</a></p>
                    <div className="btn">
                        <button onClick={() =>{navigate("/cart")}}>Back</button>
                                                <button onClick={() =>{navigate("/", {
                                                  replace: true,
                                                }); }}>Confirm payment</button>

                    </div>
                    </form>
                    
                </div>
            </div>
        </div>
    </main>
        </>
    )
}

export default Checkout
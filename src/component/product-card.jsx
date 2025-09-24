// / import ReactDOM from "react-dom/client";
// import "./styles/product.css";
import { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { product } from "../assets/productImages";

// const product =
  function ProductCard() {
  // let [product, setProduct] = useState([])

  
  // setProduct(product)
  console.log(product);
   
  // useEffect(() =>{
  //   fetchProduct()
  // }, [])
  // fetchProduct()
return(
  <>


  { product.slice(1,20).map((item, index) => (
    <div key={index} id="container">
      <div id="productCard">
        <div id="image">
          <img src="" alt="" />
        </div>
                 <BsCart3 />

        <div id="description">
          <p id="title">{item.title}</p>
          <p id="descr">{item.description.slice(1,30)}</p>
          <div>
            <p id="newP"></p>
            <p id="discountedP"></p>
          </div>
          <div className="rating"></div>
        </div>
      </div>
      </div>
  ))
}
  </>
)
  }
 

export default ProductCard;

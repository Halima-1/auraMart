 import { BsCart3 } from "react-icons/bs";
//  import Product from "./pages/productPage";

 
 function ProductCard(product) {
    return (
      <>
        
        <div key={index} id="container">
          <div id="productCard">
            <div id="image">
              <img src="" alt="" />
            </div>
            <BsCart3 />

            <div id="description">
              <p id="title">{item.title}</p>
              <p id="descr">{item.description.slice(1, 30)}</p>
              <div>
                <p id="newP"></p>
                <p id="discountedP"></p>
              </div>
              <div className="rating"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default ProductCard;

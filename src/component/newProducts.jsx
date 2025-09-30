import { BsCart3, BsStar } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ProductCard from "./productCard";

function NewProducts({product,onAddToCart}) {
  const route = useNavigate()
    return (
      <>
        {product
          .sort((a, b) => a.index - b.index)
          .slice(5, 9)
          .map((product) => (

            <div
            key={product.id}
            className=" product-card newest" 
            id=""
          >
            <div
              className="image"
              onClick={() => {
                route(`/productDetails/${product.id}`);
              }}
            >
              <img src={product.images[0]} alt={product.title} />
            </div>

            <div className="description">
              <b>{product.title}</b>
              <p className="descr">{product.description.slice(0,30)+"..."}</p>
                <p className="price">${product.price}</p>
            </div>
          </div>          ))}
      </>
    );
}

export default NewProducts;

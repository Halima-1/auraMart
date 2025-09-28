import { BsCart3, BsStar } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ProductCard from "./productCard";

function NewProducts({product}) {
  const route = useNavigate()
    return (
      <>
        {product
          .sort((a, b) => a.index - b.index)
          .slice(5, 9)
          .map((product) => (
            < ProductCard  product={ product} key={product.id}/>
          ))}
      </>
    );
}

export default NewProducts;

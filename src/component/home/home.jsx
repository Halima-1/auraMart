import "./home.css";
import "../../styles/product.css"
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import Product from "../../pages/productPage";
import { product } from "../../assets/productImages";
import NewProducts from "../newProducts";
function Home() {
  return (
    <>
      <section className="banner">
        <div className="banner-text">
          <h2>
          ✨ Welcome to <span> AuraMart </span> 
 Your one-stop online shop for everything you need — from stylish furniture that makes your home cozy, to fresh groceries and luxurious fragrances that define your vibe.
          </h2>
          <p> Discover fresh groceries,
 everyday essentials, and beauty accessories that keep you glowing.</p>
          <button className="explore-btn">
            <Link to="/productPage" className="browse-btn">
              <b>
                Explore our Products <BsArrowRight className="arrow" />
              </b>{" "}
            </Link>
          </button>
        </div>
        <div className="banner-image">
          <div>
            <img
              src={product[1].images[0]}
              alt=""
            />
          </div>
          <div>
            <img 
              src={product[3].images[0]}
              alt="" />
          </div>
          <div className="img3">
            <img 
              src={product[15].images[0]}
              alt="" />
          </div>
          <div className="">
            <img 
              src={product[25].images[0]}
              alt="" />
          </div>
          <div>
            <img 
              src={product[5].images[0]}
              alt="" />
          </div>
        </div>
      </section>
      <div className="category">
        <h2>Latest products</h2>
      </div>
      <div className="container marquee">
        <NewProducts
          product={product}
        />
              </div>
      <section className="product-show">
        {/* <Link to="/product" className="browse-btn">
          Browse more fabrics
        </Link> */}
        <p>
        Shop by category, and get quality
         products delivered right to your doorstep.        </p>
        <div className="product-grid">
          <div className="grid-item grid1">
            <b>{product[7].title}</b>
            <img
                src={product[7].images[0]}
              alt=""
            />
          </div>
          <div className=" grid-item grid2">
            <b>{product[20].title}</b>
            <img
                src={product[20].images[0]}
              alt=""
            />
          </div>
          <div className=" grid-item grid3">
            <b>{product[9].title}</b>
            <img 
              src={product[9].images[0]} 
            alt="" />
          </div>
          <div className="grid-item grid4">
            <b>{product[1].title}</b>
            <img
                src={product[1].images[0]}
              alt=""
            />
          </div>
          <div className="grid-item grid5">
            <b>{product[15].title}</b>
            <img
                src={product[15].images[0]}
              alt=""
            />
          </div>
          <div className="grid-item grid6">
            <b>{product[16].title}</b>
            <img
               src={product[16].images[0]}
              alt=""
            />
          </div>
          <div className="grid-item grid7">
            <b>{product[10].title}</b>
            <img
               src={product[10].images[0]}
              alt=""
            />          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

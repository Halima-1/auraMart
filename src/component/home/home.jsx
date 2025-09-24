import "./home.css";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
function Home() {
  return (
    <main>
      <section className="banner">
        <div className="banner-text">
          <h1>
            Discover a world of premium fabrics and textiles at{" "}
            <span>Fabric city</span>, your one-stop shop for all your sewing and
            crafting needs. Explore a vast range of fabrics, including exclusive
            designs and latest trend.
          </h1>
          <p>
            We pride ourselves on offering only only the highest quality
            materials sourced from trusted suppliers.
          </p>

          <button className="explore-btn">
            <Link to="/productPage" className="browse-btn">
              <b>
                Explore our fabrics <BsArrowRight className="arrow" />
              </b>{" "}
            </Link>
          </button>
        </div>
        <div className="banner-image">
          <div>
            <img
              src="../src/assets/images/lace/big width akoba lace.png"
              alt=""
            />
          </div>
          <div>
            <img src="../src/assets/images/dutches/dutches ads.jpg" alt="" />
          </div>
          <div className="img3">
            <img src="../src/assets/images/adire/cotton adire1.png" alt="" />
          </div>
        </div>
      </section>
      <section className="product-show">
        <Link to="/product" className="browse-btn">
          Browse more fabrics
        </Link>
        <p>
          Browse our collections and let the fabrics inspire your imagination.
        </p>
        <div className="product-grid">
          <div className="grid-item grid1">
            <b>Exclusive materials for female</b>
            <img
              src="../src/assets/images/lace/exclusive naterial for women.png"
              alt=""
            />
          </div>
          <div className=" grid-item grid2">
            <b>Quality printed crepe</b>
            <img
              src="../src/assets/images/crepe/non transparent chiffon material.png"
              alt=""
            />
          </div>
          <div className=" grid-item grid3">
            <b>Duches Fabrics</b>
            <img src="../src/assets/images/dutches/velvet ads.jpg" alt="" />
          </div>
          <div className="grid-item grid4">
            <b>French crepe</b>
            <img
              src="../src/assets/images/crepe/black french crepe.jpg"
              alt=""
            />
          </div>
          <div className="grid-item grid5">
            <b>Real wax</b>
            <img
              src="../src/assets/images/ankara/high quality real wax1.png"
              alt=""
            />
          </div>
          <div className="grid-item grid6">
            <b>Embroided net</b>
            <img
              src="../src/assets/images/lace/beautiful net embroidery1.png"
              alt=""
            />
          </div>
          <div className="grid-item grid7">
            <b>Cord lace</b>
            <img src="../src/assets/images/lace/luxury cord lace2.png" alt="" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;

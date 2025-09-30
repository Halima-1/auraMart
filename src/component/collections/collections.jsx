import React, { useEffect, useState } from 'react'
import "./collections.css"
import { product } from '../../assets/productImages'
import ProductCard from '../productCard'
import { BsStarFill } from 'react-icons/bs';


function Collections() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const bestRated = product.sort((a,b) =>b.rating -a.rating).slice(0,6)
    console.log(product)
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) =>
            prevIndex === bestRated.length - 1 ? 0 : prevIndex + 1
          );
        }, 5000);
    
        return () => clearInterval(interval); // cleanup
      }, []);
    return (
        <>
        <section className='carousel'>
        <div className="carousel-img" style={{ textAlign: "center" }}>
      <img
        src={bestRated[currentIndex].images[0]}
        alt="carousel"
      />
      <div className='carousel-text'>
      <p>{bestRated[currentIndex].description}</p>
      {bestRated[currentIndex].rating >4? 
      <>
      <BsStarFill/>
      <BsStarFill/>
      <BsStarFill/>
      <BsStarFill/>
      <BsStarFill/>
      </>:
        <>
        <BsStarFill/>
        <BsStarFill/>
        <BsStarFill/>
        <BsStarFill/>
        </>
        }
        </div>     
    </div>

    <div style={{ marginTop: "10px", margin: "0 auto", width:"20%" }}>
        {bestRated.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              cursor: "pointer",
              fontSize: "20px",
              margin: "0 5px",
              color: currentIndex === index ? "black" : "lightgray",
            }}
          >
            ●
          </span>
        ))}
      </div>
        </section>
        </>
    )
}

export default Collections

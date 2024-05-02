/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const imageLinks = [
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/11cd504bbc3a1493.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/10776c51d20b1927.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/aa1b2bdcf519b468.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/f39cd50df3682fa7.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/8eb8dbbe5de6183c.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/14c90f9bad300d13.jpg?q=20",
  ];

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageLinks.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageLinks.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageLinks.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const responce = await fetch("https://fakestoreapi.com/products");
      const data = await responce.json();
      setProducts(data);
    } catch (err) {
      console.log(err, "Error While fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayProducts = showAllProducts ? products : products.slice(0, 4);

  const toggleProducts = () => {
    setShowAllProducts((prev) => !prev);
  };

  const list = displayProducts.map((ele, index) => {
    return (
      <div key={index} className="card">
        <div className="card-image">
          <img src={ele.image} width="100%" height="100%" alt="image"></img>
        </div>
        <div className="card-head">Title : {ele.title}</div>
        <div className="card-text">Description : {ele.description}</div>
      </div>
    );
  });

  return (
    <>
      <nav>
        <h1>Home Page</h1>
      </nav>
      <div className="carousel-container">
        <svg
          fill="#000000"
          height="30px"
          width="30px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 330 330"
          xml:space="preserve"
          className="svg1"
          onClick={goToPreviousImage}
        >
          <path
            id="XMLID_6_"
            d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M205.606,234.394
	c5.858,5.857,5.858,15.355,0,21.213C202.678,258.535,198.839,260,195,260s-7.678-1.464-10.606-4.394l-80-79.998
	c-2.813-2.813-4.394-6.628-4.394-10.606c0-3.978,1.58-7.794,4.394-10.607l80-80.002c5.857-5.858,15.355-5.858,21.213,0
	c5.858,5.857,5.858,15.355,0,21.213l-69.393,69.396L205.606,234.394z"
          />
        </svg>

        <div
          className="carousel-slide"
          style={{
            width: `${100 * imageLinks.length}%`,
            transform: `translateX(-${
              (100 / imageLinks.length) * currentImageIndex
            }%)`,
            transition: "transform 0.5s ease",
            height: "200px",
          }}
        >
          {imageLinks.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="image"
              style={{ width: `${100 / imageLinks.length}%` }}
            />
          ))}
        </div>

        <svg
          fill="#000000"
          height="30px"
          width="30px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 330 330"
          xml:space="preserve"
          className="svg2"
          onClick={goToNextImage}
        >
          <path
            id="XMLID_2_"
            d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M225.606,175.605
	l-80,80.002C142.678,258.535,138.839,260,135,260s-7.678-1.464-10.606-4.394c-5.858-5.857-5.858-15.355,0-21.213l69.393-69.396
	l-69.393-69.392c-5.858-5.857-5.858-15.355,0-21.213c5.857-5.858,15.355-5.858,21.213,0l80,79.998
	c2.814,2.813,4.394,6.628,4.394,10.606C230,168.976,228.42,172.792,225.606,175.605z"
          />
        </svg>
      </div>

      <div className="products-container">
        <div className="products">{list}</div>
        <div className="button">
          {showAllProducts ? (
            <button onClick={toggleProducts}>VIEW LESS</button>
          ) : (
            <button onClick={toggleProducts}>VIEW ALL</button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

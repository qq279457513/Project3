import React from "react";
import Products from "./component/products";
import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  return (
    <React.Fragment>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./imgs/Fire & Blood.jpg"
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./imgs/Mad Honey.jpg"
            alt="Second slide"
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./imgs/Bones & All.jpg"
            alt="Third slide"
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div id="features">
        <h3>Features</h3>
      </div>

      <div>
        <Products />
      </div>
    </React.Fragment>
  );
};

export default Home;

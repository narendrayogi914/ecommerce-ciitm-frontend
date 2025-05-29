import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MyCarousel = () => (
  <Carousel autoPlay infiniteLoop showThumbs={false}>
    <div>
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/008/174/590/small/fashion-advertising-web-banner-illustration-vector.jpg"
        alt="Fashion Banner"
      />
      <p className="legend">Fashion Banner 1</p>
    </div>
    <div>
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/008/174/590/small/fashion-advertising-web-banner-illustration-vector.jpg"
        alt="Fashion Banner"
      />
      <p className="legend">Fashion Banner 2</p>
    </div>
    <div>
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/008/174/590/small/fashion-advertising-web-banner-illustration-vector.jpg"
        alt="Fashion Banner"
      />
      <p className="legend">Fashion Banner 3</p>
    </div>
  </Carousel>
);

export default MyCarousel;

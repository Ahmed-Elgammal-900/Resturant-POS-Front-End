import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ReactComponent as Graphic1 } from "../Graphics/Chef-amico.svg";
import { ReactComponent as Graphic2 } from "../Graphics/Chef-bro.svg";
import { ReactComponent as Graphic3 } from "../Graphics/Hamburger-bro.svg";
import "../css/Carousel.css"

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="carousel">
      <Slider {...settings}>
        <Graphic1 />
        <Graphic2 />
        <Graphic3 />
      </Slider>
    </div>
  );
};

export default Carousel;

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const BannerSlider = ({ items }) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    // cssEase: "easeOutElastic",
    // cssEase: "ease-out",
    // cssEase: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
    // useTransform: true,
    pauseOnHover: true,
    draggable: true,
    // responsive: [
    //   {
    //     breakpoint: 1280,
    //     settings: {
    //       slidesToShow: 5,
    //     },
    //   },
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 4,
    //     },
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       slidesToShow: 3,
    //     },
    //   },
    //   {
    //     breakpoint: 640,
    //     settings: {
    //       slidesToShow: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //     },
    //   },
    // ],
  };

  return (
    <div>
      <div className="">
        <Slider {...settings}>
          {items.map((item, i) => (
            <div key={i} className="rounded-b shadow overflow-hidden">
              <img src={`/images/${item.photo}`} alt="banner" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BannerSlider;

function Arrow(props) {
  if (props.type === "prev") {
    return (
      <span
        className="absolute top-0 hidden   bg-gray-500   rounded-md cursor-pointer"
        onClick={props.onClick}
      >
        <ChevronLeftIcon className="h-5 text-white" />
      </span>
    );
  }
  return (
    <span
      className="absolute hidden top-[-11%] right-10 bg-green-500 p-[1px]  sm:p-1 rounded-md cursor-pointer"
      onClick={props.onClick}
    >
      <ChevronRightIcon className="h-5 text-white" />
    </span>
  );
}

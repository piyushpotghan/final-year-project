import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample data with images
const healthConcerns = [
  {
    title: "Skin problems or rashes?",
    subtitle: "Get expert help for acne, pimples & more",
    image: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
  },
  {
    title: "Facing intimacy concerns?",
    subtitle: "Talk to a specialist about performance issues",
    image: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
  },
  {
    title: "Common cold, cough, or fever?",
    subtitle: "Consult a general physician online now",
    image: "https://cdn-icons-png.flaticon.com/512/169/169367.png",
  },
  {
    title: "Is your child unwell?",
    subtitle: "Get quick pediatric advice from top doctors",
    image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
  },
  {
    title: "Feeling low or anxious?",
    subtitle: "Mental health experts are here to help you",
    image: "https://cdn-icons-png.flaticon.com/512/4320/4320337.png",
  },
];

// Custom arrow buttons
function CustomPrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-[-15px] top-[40%] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-700"
    >
      <ChevronLeft size={24} />
    </button>
  );
}

function CustomNextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-[-15px] top-[40%] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-700"
    >
      <ChevronRight size={24} />
    </button>
  );
}

// Main component
export default function HealthConcernCards() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="px-6 md:px-20 py-12 bg-gray-50 relative">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-10">
        Health Concerns We Can Help With
      </h2>

      <div className="relative">
        <Slider {...settings}>
          {healthConcerns.map((item, index) => (
            <div
              key={index}
              className="bg-white mx-3 p-6 shadow-lg rounded-xl text-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-24 w-24 mx-auto mb-4 object-contain"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{item.subtitle}</p>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700">
                CONSULT NOW
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

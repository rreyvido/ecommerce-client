import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, ImageCard } from "./Card";

const API_URL = "http://localhost:5000";

export const ArticleCarousel = () => {
  return (
    <div className="px-6 py-12 md:px-12 bg-gray-50 text-gray-800 text-center lg:text-left">
      <div className="container mx-auto xl:px-32">
        <div className="grid lg:grid-cols-2 gap-12 flex-nowrap">
          <div className="mt-12 lg:mt-0">
            <h1 className="text-5xl md:text-3xl xl:text-3xl font-regular tracking-tight mb-12">
              Article for you
            </h1>
          </div>
          <div className="mb-12 lg:mb-0 justify-self-end">
            <Link
              to="/article"
              className="inline-block px-7 py-3 mr-2 bg-black text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              href="#!"
              role="button"
            >
              See All
            </Link>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-12 flex items-center">
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </div>
  );
};

export const ProductCarousel = () => {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    const { data } = await axios.get(API_URL + "/product");
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="px-6 py-12 md:px-12 bg-gray-50 text-gray-800 text-center lg:text-left">
      <div className="container mx-auto xl:px-32">
        <div className="grid lg:grid-cols-2 gap-12 flex-nowrap">
          <div className="mt-12 lg:mt-0">
            <h1 className="text-5xl md:text-3xl xl:text-3xl font-regular tracking-tight mb-12">
              Discover Our Collection
            </h1>
          </div>
          <div className="mb-12 lg:mb-0 justify-self-end">
            <Link
              to="/product"
              className="inline-block px-7 py-3 mr-2 bg-black text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              href="#!"
              role="button"
            >
              See All
            </Link>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-12 flex items-center">
          {product.slice(0, 3).map((p) => (
            <ImageCard product={p} key={p._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

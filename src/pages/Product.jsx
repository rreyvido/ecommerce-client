import axios from "axios";
import { ProductCard, SingleProductCard } from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const ProductList = () => {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URL + "/product"
    );
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-6 py-12 md:px-12 bg-gray-50 text-gray-800 text-center lg:text-left">
        <div className="container mx-auto xl:px-32">
          <div className="grid lg:grid-cols-2 gap-12 flex-nowrap">
            <div className="mt-12 lg:mt-0">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                Product
                <br />
              </h1>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 gap-12 flex items-center">
            {product.map((p) => (
              <ProductCard product={p} key={p._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const Product = () => {
  const { currentUser } = useSelector((state) => state.user);

  const path = useLocation().pathname.split("/")[2];
  const [product, setProduct] = useState({});

  const getProduct = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URL + `/product/${path}`
    );
    setProduct(data);
  };
  getProduct();

  useEffect(() => {
    getProduct();
  }, [path]);
  return (
    <>
      <Navbar />
      <SingleProductCard product={product} />
      <Footer />
    </>
  );
};

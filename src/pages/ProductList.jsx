import axios from "axios";
import { ProductCard } from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000";

const ProductList = () => {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    const { data } = await axios.get(API_URL + "/product");
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

export default ProductList;

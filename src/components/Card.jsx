import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Card = () => {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
      <img
        src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        className="aspect-video w-full object-cover"
        alt=""
      />
      <div className="p-4">
        <p className="mb-1 text-sm text-primary-500">
          Andrea Felsted • <time>18 Nov 2022</time>
        </p>
        <h3 className="text-xl font-medium text-gray-900">
          Migrating to Sailboat UI
        </h3>
        <p className="mt-1 text-gray-500">
          Sailboat UI helps streamline software projects, sprints, tasks, and
          bug tracking.
        </p>
        <div className="mt-4 flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-900">
            Design
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
            Product
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
            Develop
          </span>
        </div>
      </div>
    </div>
  );
};

export const ImageCard = ({ product }) => {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
      <Link to={`/product/${product._id}`}>
        <img
          className="aspect-video w-full object-cover"
          src={product.img}
          alt="product"
        />
      </Link>
    </div>
  );
};

export const ArticleCard = () => {
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
          <img
            className="rounded-t-lg"
            src="https://mdbootstrap.com/img/new/standard/nature/182.jpg"
            alt=""
          />
        </a>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">Card title</h5>
          <p className="text-gray-700 text-base mb-4">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <button
            type="button"
            className="inline-block px-7 py-3 mr-2 bg-black text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProductCard = ({ product }) => {
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <Link to={`/product/${product._id}`}>
          <img className="rounded-t-lg" src={product.img} alt="" />
        </Link>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            {product.name}
          </h5>
          <p className="text-gray-700 text-base mb-4">{product.description}</p>
          <Link to={`/product/${product._id}`}>
            <button
              type="button"
              className="inline-block px-7 py-3 mr-2 bg-black text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const SingleProductCard = ({ product }) => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(process.env.REACT_APP_API_URL + `/cart/`, {
        owner: currentUser.data._id,
        productId: id,
        quantity: quantity,
      });
      alert("added to cart");
    } catch (error) {
      console.log(error.response);
      console.log(currentUser.data._id);
    }
  };
  return (
    <section class="text-gray-700 body-font overflow-hidden bg-white">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={product.img}
          />
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">
              BODIMAJI
            </h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}
            </h1>
            <div class="flex mb-4">
              <span class="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span class="text-gray-600 ml-3 underline cursor-pointer">
                  4 Reviews
                </span>
              </span>
            </div>
            <p class="leading-relaxed">{product.description}</p>

            {product.countInStock > 0 ? (
              <p class="leading-relaxed text-gray-400 cursor-default">
                In Stock ({product.countInStock})
              </p>
            ) : (
              <p class="leading-relaxed text-gray-400 cursor-default">
                Out of Stock
              </p>
            )}
            <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div class="flex">
                <span class="mr-3">Color</span>
                <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button class="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
              </div>
              <div class="flex ml-6 items-center">
                <span class="mr-3">Quantity</span>
                <div class="relative">
                  <div class="flex flex-row h-10 w-32 rounded-lg relative bg-transparent mt-1">
                    <button class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                      <span
                        class="m-auto text-2xl font-thin"
                        onClick={() => handleQuantity("dec")}
                      >
                        −
                      </span>
                    </button>
                    <span class="justify-center focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none">
                      {quantity}
                    </span>
                    <button class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                      <span
                        class="m-auto text-2xl font-thin"
                        onClick={() => handleQuantity("inc")}
                      >
                        +
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex">
              <span class="title-font font-medium text-2xl text-gray-900">
                Rp{product.price}
              </span>

              {product.countInStock > 0 ? (
                <button
                  class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                  onClick={handleSubmit}
                >
                  Add to Cart
                </button>
              ) : (
                <button class="flex ml-auto text-white bg-gray-200 border-0 py-2 px-6 focus:outline-none rounded disabled:opacity-40 cursor-not-allowed">
                  Add to Cart
                </button>
              )}
              <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CheckoutCard = ({ cartItem }) => {
  const { currentUser } = useSelector((state) => state.user);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.delete(
        process.env.REACT_APP_API_URL + `/cart/`,
        {
          data: { _id: currentUser.data._id, productId: cartItem.productId },
        }
      );
      alert("product deleted from cart");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <div>
          <h2 className="text-xl font-bold">{cartItem.name}</h2>
          <p className="text-sm">{cartItem.quantity}</p>
          <span className="text-red-600">Price</span> Rp
          {cartItem.price}
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={handleDelete}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

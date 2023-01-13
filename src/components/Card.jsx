import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  addProduct,
  addQuantity,
  getQuantity,
  removeProduct,
} from "../redux/cartSlice";

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

export const SingleProductCard = ({
  product,
  wishlist,
  setWishlist,
  fetchWishlist,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const currentProducts = useSelector((state) => state.cart.products);

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);

  if (!wishlist) {
    setWishlist([]);
  }

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser) {
      const resp = await axios
        .post(process.env.REACT_APP_API_URL + `/cart/`, {
          owner: currentUser.data._id,
          productId: id,
          quantity: quantity,
        })
        .then((response) => {
          dispatch(addQuantity(quantity));
          alert("added to cart");
        });
    } else {
      navigate("/login");
    }
  };

  const onWishlist = wishlist.some((w) => w.productId === product._id);

  const addWishlist = async (e) => {
    e.preventDefault();
    if (currentUser) {
      try {
        const resp = await axios
          .post(process.env.REACT_APP_API_URL + `/wishlist/`, {
            owner: currentUser.data._id,
            productId: id,
            quantity: 1,
          })
          .then(() => {
            fetchWishlist();
          });
        alert("added to wishlist");
      } catch (error) {
        console.error(error.response.data);
      }
    } else {
      navigate("/login");
    }
  };

  const removeWishlist = async (e) => {
    e.preventDefault();
    if (currentUser) {
      try {
        const resp = await axios
          .delete(process.env.REACT_APP_API_URL + `/wishlist/`, {
            data: { _id: currentUser.data._id, productId: id },
          })
          .then(() => {
            fetchWishlist();
          });
        alert("removed from wishlist");
      } catch (error) {
        alert(error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white rounded-lg">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={product.img}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BODIMAJI
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3 underline cursor-pointer">
                  4 Reviews
                </span>
              </span>
            </div>
            <p className="leading-relaxed">{product.description}</p>

            {product.countInStock > 0 ? (
              <p className="leading-relaxed text-gray-400 cursor-default">
                In Stock ({product.countInStock})
              </p>
            ) : (
              <p className="leading-relaxed text-gray-400 cursor-default">
                Out of Stock
              </p>
            )}
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Quantity</span>
                <div className="relative">
                  <div className="flex flex-row h-10 w-20 rounded-lg relative bg-transparent mt-1">
                    <button className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                      <span
                        className="m-auto text-2xl font-thin"
                        onClick={() => handleQuantity("dec")}
                      >
                        −
                      </span>
                    </button>
                    <span className="justify-center focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none">
                      {quantity}
                    </span>
                    <button className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                      <span
                        className="m-auto text-2xl font-thin"
                        onClick={() => handleQuantity("inc")}
                      >
                        +
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                Rp{product.price}
              </span>

              {product.countInStock > 0 ? (
                <button
                  className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                  onClick={handleSubmit}
                >
                  Add to Cart
                </button>
              ) : (
                <button className="flex ml-auto text-white bg-gray-200 border-0 py-2 px-6 focus:outline-none rounded disabled:opacity-40 cursor-not-allowed">
                  Add to Cart
                </button>
              )}
              {onWishlist ? (
                <button
                  onClick={removeWishlist}
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                >
                  <svg
                    fill="red"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              ) : (
                <button
                  onClick={addWishlist}
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                >
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CheckoutCard = ({ cartItem, getCart }) => {
  const { currentUser } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios
        .delete(process.env.REACT_APP_API_URL + `/cart/`, {
          data: { _id: currentUser.data._id, productId: cartItem.productId },
        })
        .then((response) => {
          const products = response.data.products;
          const newQty = products
            .map((item) => item.quantity)
            .reduce((prev, next) => prev + next, 0);
          dispatch(getQuantity(newQty));
          getCart();
          alert("product deleted from cart");
        });
      // window.location.reload();
    } catch (error) {
      alert(error);
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

export const OrderCard = ({ orderItem }) => {
  const productsLength = orderItem.products.length;
  let dateFormat = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let orderDate = new Date(orderItem.createdAt);
  const orderItemDate = orderDate.toLocaleDateString("en-US", dateFormat);

  return (
    <div className="">
      <div className="w-full mx-auto z-10">
        <div className="flex flex-col">
          <div className="bg-white border border-white shadow-lg  rounded-3xl p-4 m-4">
            <div className="flex-none sm:flex">
              <div className=" relative h-32 w-32   sm:mb-0 mb-3">
                {/* <img
                  src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
                  alt="aji"
                  className=" w-32 h-32 object-cover rounded-2xl"
                /> */}
              </div>
              <div className="flex-auto sm:ml-5 justify-evenly">
                <div className="flex items-center justify-between sm:mt-2">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">
                        {orderItemDate}
                      </div>
                      <div className="flex-auto text-gray-500 my-1">
                        {productsLength - 1 > 0 ? (
                          <>
                            <span className="mr-3 ">
                              +{productsLength - 1} more item(s)
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="mr-3 ">{productsLength} item</span>
                          </>
                        )}
                        <span className="mr-3 border-r border-gray-200  max-h-0"></span>
                        <span>{orderItem.status} payment</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex-1 inline-flex  hidden items-center">
                    <img
                      className="w-5 h-5"
                      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDY0IDY0IiBoZWlnaHQ9IjY0cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA2NCA2NCIgd2lkdGg9IjY0cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0zMiw3LjE3NEMxOC4zMTEsNy4xNzQsNy4xNzQsMTguMzExLDcuMTc0LDMyYzAsMTMuNjg5LDExLjEzNywyNC44MjYsMjQuODI2LDI0LjgyNmMxMy42ODksMCwyNC44MjYtMTEuMTM3LDI0LjgyNi0yNC44MjYgIEM1Ni44MjYsMTguMzExLDQ1LjY4OSw3LjE3NCwzMiw3LjE3NHogTTM4LjE3NCwzMi44NzRoLTQuMDM5YzAsNi40NTMsMCwxNC4zOTgsMCwxNC4zOThoLTUuOTg1YzAsMCwwLTcuODY4LDAtMTQuMzk4aC0yLjg0NXYtNS4wODggIGgyLjg0NXYtMy4yOTFjMC0yLjM1NywxLjEyLTYuMDQsNi4wNC02LjA0bDQuNDMzLDAuMDE3djQuOTM5YzAsMC0yLjY5NSwwLTMuMjE5LDBjLTAuNTI0LDAtMS4yNjgsMC4yNjItMS4yNjgsMS4zODZ2Mi45OWg0LjU2ICBMMzguMTc0LDMyLjg3NHoiLz48L3N2Zz4="
                    />
                    <img
                      className="w-5 h-5"
                      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDU2LjY5MyA1Ni42OTMiIGhlaWdodD0iNTYuNjkzcHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1Ni42OTMgNTYuNjkzIiB3aWR0aD0iNTYuNjkzcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yOC4zNDgsNS4xNTdjLTEzLjYsMC0yNC42MjUsMTEuMDI3LTI0LjYyNSwyNC42MjVjMCwxMy42LDExLjAyNSwyNC42MjMsMjQuNjI1LDI0LjYyM2MxMy42LDAsMjQuNjIzLTExLjAyMywyNC42MjMtMjQuNjIzICBDNTIuOTcxLDE2LjE4NCw0MS45NDcsNS4xNTcsMjguMzQ4LDUuMTU3eiBNNDAuNzUyLDI0LjgxN2MwLjAxMywwLjI2NiwwLjAxOCwwLjUzMywwLjAxOCwwLjgwM2MwLDguMjAxLTYuMjQyLDE3LjY1Ni0xNy42NTYsMTcuNjU2ICBjLTMuNTA0LDAtNi43NjctMS4wMjctOS41MTMtMi43ODdjMC40ODYsMC4wNTcsMC45NzksMC4wODYsMS40OCwwLjA4NmMyLjkwOCwwLDUuNTg0LTAuOTkyLDcuNzA3LTIuNjU2ICBjLTIuNzE1LTAuMDUxLTUuMDA2LTEuODQ2LTUuNzk2LTQuMzExYzAuMzc4LDAuMDc0LDAuNzY3LDAuMTExLDEuMTY3LDAuMTExYzAuNTY2LDAsMS4xMTQtMC4wNzQsMS42MzUtMC4yMTcgIGMtMi44NC0wLjU3LTQuOTc5LTMuMDgtNC45NzktNi4wODRjMC0wLjAyNywwLTAuMDUzLDAuMDAxLTAuMDhjMC44MzYsMC40NjUsMS43OTMsMC43NDQsMi44MTEsMC43NzcgIGMtMS42NjYtMS4xMTUtMi43NjEtMy4wMTItMi43NjEtNS4xNjZjMC0xLjEzNywwLjMwNi0yLjIwNCwwLjg0LTMuMTJjMy4wNjEsMy43NTQsNy42MzQsNi4yMjUsMTIuNzkyLDYuNDgzICBjLTAuMTA2LTAuNDUzLTAuMTYxLTAuOTI4LTAuMTYxLTEuNDE0YzAtMy40MjYsMi43NzgtNi4yMDUsNi4yMDYtNi4yMDVjMS43ODUsMCwzLjM5NywwLjc1NCw0LjUyOSwxLjk1OSAgYzEuNDE0LTAuMjc3LDIuNzQyLTAuNzk1LDMuOTQxLTEuNTA2Yy0wLjQ2NSwxLjQ1LTEuNDQ4LDIuNjY2LTIuNzMsMy40MzNjMS4yNTctMC4xNSwyLjQ1My0wLjQ4NCwzLjU2NS0wLjk3NyAgQzQzLjAxOCwyMi44NDksNDEuOTY1LDIzLjk0Miw0MC43NTIsMjQuODE3eiIvPjwvc3ZnPg=="
                    />
                    <img
                      className="w-5 h-5"
                      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNjdweCIgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDY3IDY3OyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNjcgNjciIHdpZHRoPSI2N3B4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNNTAuODM3LDQ4LjEzN1YzNi40MjVjMC02LjI3NS0zLjM1LTkuMTk1LTcuODE2LTkuMTk1ICBjLTMuNjA0LDAtNS4yMTksMS45ODMtNi4xMTksMy4zNzRWMjcuNzFoLTYuNzljMC4wOSwxLjkxNywwLDIwLjQyNywwLDIwLjQyN2g2Ljc5VjM2LjcyOWMwLTAuNjA5LDAuMDQ0LTEuMjE5LDAuMjI0LTEuNjU1ICBjMC40OS0xLjIyLDEuNjA3LTIuNDgzLDMuNDgyLTIuNDgzYzIuNDU4LDAsMy40NCwxLjg3MywzLjQ0LDQuNjE4djEwLjkyOUg1MC44Mzd6IE0yMi45NTksMjQuOTIyYzIuMzY3LDAsMy44NDItMS41NywzLjg0Mi0zLjUzMSAgYy0wLjA0NC0yLjAwMy0xLjQ3NS0zLjUyOC0zLjc5Ny0zLjUyOHMtMy44NDEsMS41MjQtMy44NDEsMy41MjhjMCwxLjk2MSwxLjQ3NCwzLjUzMSwzLjc1MywzLjUzMUgyMi45NTl6IE0zNCw2NCAgQzE3LjQzMiw2NCw0LDUwLjU2OCw0LDM0QzQsMTcuNDMxLDE3LjQzMiw0LDM0LDRzMzAsMTMuNDMxLDMwLDMwQzY0LDUwLjU2OCw1MC41NjgsNjQsMzQsNjR6IE0yNi4zNTQsNDguMTM3VjI3LjcxaC02Ljc4OXYyMC40MjcgIEgyNi4zNTR6IiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojMDEwMTAxOyIvPjwvc3ZnPg=="
                    />
                  </div>
                </div>
                <div className="flex pt-2  text-sm text-gray-500">
                  <div className="flex-1 inline-flex items-center">
                    <div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">
                      Rp{orderItem.bill}
                    </div>
                  </div>
                  <button className="flex-no-shrink inline-block px-7 py-3 mr-2 bg-black text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
                    Order Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

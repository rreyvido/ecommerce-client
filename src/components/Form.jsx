import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailed } from "../redux/userSlice";
import { CheckoutCard } from "./Card";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const loginClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    const credentials = {
      username,
      password,
    };
    await axios
      .post(process.env.REACT_APP_API_URL + `/user/login`, credentials)
      .then((response) => {
        if (response.data.role === "admin") {
          dispatch(loginSuccess(response));
          navigate("/dashboard");
        } else if (response.data.role === "customer") {
          dispatch(loginSuccess(response));
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        dispatch(loginFailed());
      });
  };

  return (
    <section className="h-screen bg-stone-200">
      <div className="h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
              Login with your
              <br />
              <span className="text-red-900">Bodimaji Account</span>
              <br />
            </h1>
            <h1 className="text-5xl md:text-3xl xl:text-3xl font-regular tracking-tight mb-12">
              Welcome back
            </h1>
            <form>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="inline-block px-7 py-3 bg-red-900 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-red-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick={loginClick}
              >
                Sign in
              </button>

              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">OR</p>
              </div>

              <a
                className="px-7 py-3 bg-white text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                href="#!"
                role="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Continue with Google
              </a>

              <div className="py-3 flex items-center justify-between pb-6">
                <p className="mb-0 mr-2">Don't have an account?</p>
                <Link to="/register">
                  <button
                    type="button"
                    className="inline-block px-6 py-2 border-2 border-red-600 text-red-900 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Register
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const registerClick = async (e) => {
    e.preventDefault();
    const credentials = {
      name,
      username,
      email,
      password,
    };

    await axios
      .post(process.env.REACT_APP_API_URL + "/user/register", credentials)
      .then((response) => {
        if (response.data.role === "admin") {
          navigate("/dashboard");
        } else if (response.data.role === "customer") {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <section className="h-screen bg-stone-200">
      <div className="h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
              Create Your
              <br />
              <span className="text-red-900">Bodimaji Account</span>
              <br />
            </h1>
            <h1 className="text-5xl md:text-3xl xl:text-3xl font-regular tracking-tight mb-12">
              Be the part of Bodimaji
            </h1>
            <form>
              <div className="mb-6">
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                  placeholder="Confirm Password"
                />
              </div> */}

              <button
                type="submit"
                className="inline-block px-7 py-3 bg-red-900 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-red-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick={registerClick}
              >
                Register
              </button>

              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">OR</p>
              </div>

              <a
                className="px-7 py-3 bg-white text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                href="#!"
                role="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Continue with Google
              </a>

              <div className="py-3 flex items-center justify-between pb-6">
                <p className="mb-0 mr-2">Already have an account?</p>
                <Link to="/login">
                  <button
                    type="button"
                    className="inline-block px-6 py-2 border-2 border-red-600 text-red-900 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Login
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CheckoutForm = () => {
  const { currentUser } = useSelector((state) => state.user);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const zipRef = useRef(null);

  const [cart, setCart] = useState([]);
  const [bill, setBill] = useState([]);
  const [inputs, setInputs] = useState(0);

  const [isDisabled, setIsDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(true);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const getCart = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URL + `/cart/${currentUser.data._id}`
    );

    if (data) {
      setCart(data.products);
      setBill(data.bill);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const checkHandler = () => {
    setIsChecked(!isChecked);
    setIsDisabled(!isDisabled);
  };

  useEffect(() => {
    getCart();
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const mail = emailRef.current.value;
    const address = addressRef.current.value;
    const city = cityRef.current.value;
    const zip = zipRef.current.value;
    const credentials = { name, mail, address, city, zip };
    console.log(credentials);
    await axios
      .post(
        process.env.REACT_APP_API_URL +
          `/order/checkout/${currentUser.data._id}`,
        credentials
      )
      .then((response) => {
        alert(response.data.message);
        navigate("/success");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="bg-gray-50">
      <div className="container p-12 mx-auto ">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">
            <h2 className="mb-4 font-bold md:text-xl text-heading ">
              Shipping Address
            </h2>
            <div className="flex items-center">
              <input
                checked={isChecked}
                onChange={checkHandler}
                id="checked-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="checked-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Same as my current information
              </label>
            </div>
            <form className="justify-center w-full mx-auto">
              <div className="">
                <div className="mt-4">
                  <div className="w-full">
                    <label className="block mb-3 text-sm font-semibold text-gray-500">
                      Name
                    </label>
                    <input
                      defaultValue={currentUser.data.name}
                      onChange={handleChange}
                      disabled={isDisabled}
                      ref={nameRef}
                      name="name"
                      type="text"
                      placeholder="Name"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label className="block mb-3 text-sm font-semibold text-gray-500">
                      Email
                    </label>
                    <input
                      defaultValue={currentUser.data.email}
                      onChange={handleChange}
                      disabled={isDisabled}
                      ref={emailRef}
                      name="email"
                      type="text"
                      placeholder="Email"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm"
                    />
                  </div>
                  <div className="mt-4">
                    <div className="w-full">
                      <label
                        htmlFor="Address"
                        className="block mb-3 text-sm font-semibold text-gray-500"
                      >
                        Address
                      </label>
                      <textarea
                        defaultValue={currentUser.data.address}
                        onChange={handleChange}
                        disabled={isDisabled}
                        ref={addressRef}
                        className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                        name="address"
                        cols="20"
                        rows="4"
                        placeholder="Address"
                      ></textarea>
                    </div>
                  </div>
                  <div className="space-x-0 lg:flex lg:space-x-4">
                    <div className="w-full lg:w-1/2">
                      <label className="block mb-3 text-sm font-semibold text-gray-500">
                        City
                      </label>
                      <input
                        defaultValue={currentUser.data.city}
                        onChange={handleChange}
                        disabled={isDisabled}
                        ref={cityRef}
                        name="city"
                        type="text"
                        placeholder="City"
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div className="w-full lg:w-1/2 ">
                      <label className="block mb-3 text-sm font-semibold text-gray-500">
                        Post Code
                      </label>
                      <input
                        defaultValue={currentUser.data.zip}
                        onChange={handleChange}
                        disabled={isDisabled}
                        ref={zipRef}
                        name="zip"
                        type="text"
                        placeholder="Post Code"
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  {cart ? (
                    <>
                      <button
                        onClick={handleCheckout}
                        className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
                      >
                        Checkout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        disabled
                        onClick={handleCheckout}
                        className="w-full px-6 py-2 text-blue-200 bg-blue-600 opacity-40 cursor-not-allowed"
                      >
                        Checkout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="mt-8">
                {cart ? (
                  <>
                    {cart.map((c) => (
                      <CheckoutCard cartItem={c} key={c._id} />
                    ))}
                  </>
                ) : (
                  <> NO PRODUCT</>
                )}
              </div>
              <div className="flex p-4 mt-4">
                <h2 className="text-xl font-bold">Summary</h2>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Subtotal<span className="ml-2">Rp{bill}</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Delivery Fee<span className="ml-2">Rp0</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Total<span className="ml-2">Rp{bill}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileForm = () => {
  return <>nanti</>;
};

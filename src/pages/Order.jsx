import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OrderCard } from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Order = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [orderList, setOrderList] = useState([]);

  const getOrderList = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URL + `/order/${currentUser.data._id}`
    );

    if (data) {
      setOrderList(data);
      console.log(data);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-6 py-12 md:px-12 bg-gray-50 text-gray-800 text-center lg:text-left">
        <div className="container mx-auto xl:px-32">
          <div className="grid lg:grid-cols-2 gap-12 flex-nowrap">
            <div className="mt-12 lg:mt-0">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                My Order
                <br />
              </h1>
            </div>
          </div>
          {orderList ? (
            <>
              {orderList.map((o) => (
                <OrderCard orderItem={o} key={o._id} />
              ))}
            </>
          ) : (
            <> NO PRODUCT</>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;

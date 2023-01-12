import Footer from "../components/Footer";
import { CheckoutForm } from "../components/Form";

import Navbar from "../components/Navbar";

const Checkout = () => {
  return (
    <>
      <Navbar />

      <div className="px-6 py-20 md:px-12 bg-gray-50 text-gray-800 text-center lg:text-left">
        <div className="container mx-auto xl:px-32">
          <div className="flex-nowrap">
            <div className="mt-12 lg:mt-0">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                Checkout
                <br />
              </h1>
              <CheckoutForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

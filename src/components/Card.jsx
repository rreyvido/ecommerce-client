import { Link } from "react-router-dom";

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

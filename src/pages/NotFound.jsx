import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">
        404
      </h1>
      <div className="bg-red-900 ] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <span className="relative inline-block text-sm font-medium text-red-900 group active:text-red-500 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-red-900 group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <Link to="/">Go Home</Link>
          </span>
        </span>
      </button>
    </main>
  );
};

export default NotFound;

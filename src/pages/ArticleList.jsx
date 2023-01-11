import { ArticleCard } from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ArticleList = () => {
  return (
    <>
      <Navbar />
      <div className="px-6 py-12 md:px-12 bg-gray-50 text-gray-800 text-center lg:text-left">
        <div className="container mx-auto xl:px-32">
          <div className="grid lg:grid-cols-2 gap-12 flex-nowrap">
            <div className="mt-12 lg:mt-0">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                Article
                <br />
              </h1>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 gap-12 flex items-center">
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArticleList;

import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { allSubCategories } from "../networkCalls/categories";
import { filterBySubCategory } from "../networkCalls/products";
import { usePostApi } from "../context/PostProvider";
import "../css/category.css";
import BusinessDescription from "../components/BusinessDescription"
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";

function Products() {
  const { brand } = useParams();
  const { state, dispatch } = usePostApi();
  const { posts } = state;
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productloading, setProductloading] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [subcategoryId, setSubcategoryId] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const scrollToAllStories = () => {
    const element = document.getElementById("all-products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      allSubCategories(brand,"Product")
        .then((res) => {
          setCategoriesData(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error in fetch category", err);
        });
    };
    getData();
  }, [brand]);

  useEffect(() => {
    if (subcategoryId) {
      setProductloading(true);
      filterBySubCategory(subcategoryId).then((res) => {
        dispatch({
          type: "FETCH_POSTS",
          payload: res,
        });
        setProductloading(false);
      });
    }
  }, [subcategoryId, dispatch]);


  return (
    <>
       <section>
          <Carousel/>
        </section>

    <div className="min-h-screen category-container">

      <div className="md:w-1/4 p-4 bg-gray-100 border-r">
        {/* Show Categories Button (Only on Small Screens) */}
      <div className="md:hidden p-2 text-center">
      <button
          onClick={toggleMenu}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
         Categories
        </button>
     

      </div>
      {loading ? (
          <h2 className="text-center">Loading products...</h2>
        ) : (
          <>
      {categoriesData?.length > 0 ? (
        <>
        {isOpen && categoriesData?.map((category, index) => (
          <div key={index} className="bg-gray-200 rounded-md p-2 mb-2">
            <div
              className="cursor-pointer flex items-center justify-between"
              onClick={() =>
                setExpandedCategory(expandedCategory === index ? null : index)
              }
            >
              <span>{category.name}</span>
              <span>{expandedCategory === index ? "-" : "+"}</span>
            </div>
            {expandedCategory === index && (
              <ul className="pl-4 pt-2">
                {category.subcategories.length > 0 ? (
                  category.subcategories.map((subcategory, subIndex) => (
                    <li
                      className="bg-gray-300 cursor-pointer text-sm p-2 mt-2 border border-blue-500  "
                      key={subIndex}
                      onClick={() => {
                        setSubcategoryId(subcategory?.subcategoryId);
                        scrollToAllStories()
                      }}
                    >
                      {subcategory.subcategoryName}
                    </li>
                  ))
                ) : (
                  <li>No subcategories</li>
                )}
              </ul>
            )}
          </div>
        ))}
        </>) 
        :
        <h2 className="text-center"> No Products Availables</h2>}
        </>
        )}
      </div>
      <div className="md:flex-1 p-4 md:pl-8" id="all-products">
       
            {posts?.length > 0 ? (
           <ProductCard products={posts}/>
            ) : (
              <h2 className="text-center">
                {productloading && <h2 className="text-center"> Loading Products</h2>}
                <BusinessDescription/>
              </h2>
            )}
         
      </div>

    </div>
    </>
  );
}

export default Products;

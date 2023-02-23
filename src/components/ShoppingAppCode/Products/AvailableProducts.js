import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem/productItem";
import Pagination from "../Pagination";

import classes from "./AvailableProducts.module.css";
import useHttp from "../../../hooks/use-http";

const AvailableProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [filterPrice, setFilterPrice] = useState("26");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const { isLoading, error, sendRequest: fetchData } = useHttp();

  const filterChangeHandler = (event) => {
    setFilterPrice(event.target.value);
  };

  useEffect(() => {
    const transformedMealsData = (responseData) => {
      const loadedProducts = [];
      for (const key in responseData) {
        loadedProducts.push({
          id: responseData[key].id,
          name: responseData[key].title,
          description: responseData[key].description,
          price: responseData[key].price,
          currency: responseData[key].currencyFormat,
          isFreeShipping: responseData[key].isFreeShipping,
          availableSizes: responseData[key].availableSizes,
          style: responseData[key].style,
        });
      }
      setProducts(loadedProducts);
    };
    fetchData(
      {
        url: "https://demo5922353.mockable.io/products",
      },
      transformedMealsData
    );
  }, [fetchData]);

  const productfiltered = products.filter((product) => {
    if (filterPrice < 26) {
      return product.price < filterPrice;
    } else {
      return product;
    }
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = productfiltered.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const productsList = currentPosts.map((product) => {
    return (
      <ProductItem
        key={product.id}
        id={product.id}
        name={product.name}
        description={product.description}
        price={product.price}
        currency={product.currency}
        isFreeShipping={product.isFreeShipping}
        availableSizes={product.availableSizes}
        style={product.style}
      />
    );
  });
  return (
    <div className={classes.over}>
      <div>
        <h2 className={classes.hh}>{props.name}</h2>
        <label className={classes.label}>Filter : </label>
        <select onChange={filterChangeHandler} className={classes.select}>
          <option>--select--</option>
          <option value={10}>less than $10</option>
          <option value={15}>less than $15</option>
          <option value={20}>less than $20</option>
          <option value={25}>less than $25</option>
          <option value={26}>$25+</option>
        </select>
      </div>
      <section className={classes.products}>
        {isLoading && <p className={classes.productsLoading}>Loading...</p>}
        {error && <p className={classes.productsError}>{error}</p>}
        <section>{productsList}</section>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={productfiltered.length}
          paginate={paginate}
        />
      </section>
    </div>
  );
};

export default AvailableProducts;

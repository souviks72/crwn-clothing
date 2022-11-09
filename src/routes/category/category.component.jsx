import { useState, useEffect, useContext, Fragment } from "react";
import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../context/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

import "./category.styles.scss";

const Category = () => {
  const { category } = useParams(); //from ":category"
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);
  //when page first load, categoriesMap will be and empty object by default as it fetches data by async
  //and this will return {}

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  /*
  We could have just extracted products like this: const products = categoriesMap[category];
  However this is unwise, because every time the page refreshes, products will be refreshed
  and ProductCard component will have to be redrawn for each product. 
  If we set it as a state, it will be retained even if page refreshes(and state is not changed)
  */
  return (
    <Fragment>
      <h2 className="category-title">{category}</h2>
      <div className="category-container">
        {products && //when page first loads, products will be undefined
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;

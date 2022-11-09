import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import "./shop.styles.scss";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
      {/* 
        ":category" is the route param. It will match the pattern "shop/*" 
        Its value will be extracted by useParams in Category component
      */}
    </Routes>
  );
};

export default Shop;

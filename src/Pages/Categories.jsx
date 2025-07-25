import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Items/Item';

const Categories = (props) => {
  const { all_products } = useContext(ShopContext);

  // Get category from props
  const selectedCategory = props.category;

  // Filter products by category
  const filteredProducts = all_products.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <div className='shop-category'>
      <img src={props.banner} alt="" className="shop-category-banner" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {filteredProducts.length}</span> out of {all_products.length} products
        </p>
        <div className="shop-cateogry-sory">
          <img src={dropdown_icon} alt="Sort" />
        </div>
      </div>

      <div className="shop-category-products">
        {filteredProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;

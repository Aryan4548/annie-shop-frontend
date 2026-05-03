import React, { useContext, useMemo, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Items/Item';

const sortOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'priceLowHigh' },
  { label: 'Price: High to Low', value: 'priceHighLow' },
  { label: 'Alphabetical: A-Z', value: 'az' },
  { label: 'Alphabetical: Z-A', value: 'za' },
];

const Categories = (props) => {
  const { all_products } = useContext(ShopContext);
  const [sortBy, setSortBy] = useState('default');
  const selectedCategory = props.category;

  const filteredProducts = useMemo(() => {
    const matching = all_products.filter(
      (item) => String(item.category).toLowerCase() === String(selectedCategory).toLowerCase()
    );

    return [...matching].sort((a, b) => {
      switch (sortBy) {
        case 'priceLowHigh':
          return a.new_price - b.new_price;
        case 'priceHighLow':
          return b.new_price - a.new_price;
        case 'az':
          return a.name.localeCompare(b.name);
        case 'za':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [all_products, selectedCategory, sortBy]);

  return (
    <div className='shop-category'>
      <img src={props.banner} alt="" className="shop-category-banner" />

      <div className="shopcategory-indexSort">
        <div>
          <p>
            <span>Showing {filteredProducts.length}</span> out of {all_products.length} products
          </p>
          <h1>{selectedCategory}</h1>
        </div>

        <div className="shop-category-sort">
          <img src={dropdown_icon} alt="Sort" />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="shop-category-products">
        {filteredProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            images={item.images}
            category={item.category}
            new_price={item.new_price}
            old_price={item.old_price}
            popular={item.popular}
            preorder={item.preorder}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;

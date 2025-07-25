import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("annie_cart");
    return saved ? JSON.parse(saved) : {};
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4000/allproducts")
      .then(res => {
        setAllProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("annie_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addtocart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removefromcart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 1) - 1, 0)
    }));
  };

  const filtered_products = allProducts.filter(product =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProductById = (id) => {
    return allProducts.find(p => p.id === parseInt(id));
  };

  return (
    <ShopContext.Provider value={{
      all_products: allProducts,
      filtered_products,
      cartItems,
      addtocart,
      removefromcart,
      getProductById,
      setCartItems,
      searchQuery,
      setSearchQuery,
      loading
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

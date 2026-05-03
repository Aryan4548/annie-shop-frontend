import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL, { normalizeApiProducts } from "../config/api";

export const ShopContext = createContext(null);

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

const loadLocalProducts = async () => {
  const response = await fetch("/data/allproducts.json");
  const items = await response.json();
  return normalizeApiProducts(items || []);
};

const ShopContextProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("annie_cart");
    return saved ? JSON.parse(saved) : {};
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [storeSettings, setStoreSettings] = useState({
    preorderAdvancePercentage: 0,
  });

  useEffect(() => {
    Promise.all([
      axios.get(`${API_BASE_URL}/allproducts`),
      axios.get(`${API_BASE_URL}/settings`).catch(() => ({ data: {} })),
      axios.get(`${API_BASE_URL}/admin/settings`).catch(() => ({ data: {} })),
    ])
      .then(([productsRes, settingsRes, adminSettingsRes]) => {
        const preorderAdvancePercentage = Number(
          settingsRes.data?.preorderAdvancePercentage ??
          adminSettingsRes.data?.preorderAdvancePercentage ??
          0
        );

        setAllProducts(normalizeApiProducts(productsRes.data || []));
        setStoreSettings({
          preorderAdvancePercentage,
        });
        setLoading(false);
      })
      .catch(async (err) => {
        console.error("Failed to fetch products/settings:", err);

        try {
          const fallbackProducts = await loadLocalProducts();
          setAllProducts(fallbackProducts);
        } catch (fallbackError) {
          console.error("Failed to load fallback products:", fallbackError);
          setAllProducts([]);
        }

        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("annie_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addtocart = (itemId) => {
    const product = allProducts.find((entry) => Number(entry.id) === Number(itemId));
    const currentUser = getStoredUser();

    if (product?.premiumOnly && !currentUser?.isPremium) {
      window.alert("This product is available only for premium members.");
      return false;
    }

    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));

    return true;
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

  const canAccessProduct = (product) => {
    if (!product?.premiumOnly) {
      return true;
    }

    const currentUser = getStoredUser();
    return Boolean(currentUser?.isPremium);
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
      loading,
      storeSettings,
      canAccessProduct
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

import React from 'react';
import CategoryShowcase from '../Components/CategoryShowcase/CategoryShowcase'; // Adjust path if needed

const MainCategoriesPage = () => {
  return (
    <div>
      <h1 style={{textAlign: 'center', margin: '20px 0'}}>Shop by Category</h1>
      <CategoryShowcase />
    </div>
  );
};

export default MainCategoriesPage;

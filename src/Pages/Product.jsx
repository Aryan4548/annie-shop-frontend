import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Collection from '../Components/Collection/Collection';
import { scheduleScrollPageToTop } from '../utils/scroll';

const Product = () => {
  const { search } = useLocation();

  useLayoutEffect(() => {
    return scheduleScrollPageToTop();
  }, [search]);

  return (
    <div>
      <Collection key={search || 'all-products'} />
    </div>
  );
};

export default Product;

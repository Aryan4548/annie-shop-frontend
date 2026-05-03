import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scheduleScrollPageToTop } from '../../utils/scroll';

const ScrollToTop = () => {
  const { pathname, search, key } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const previousValue = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';

      return () => {
        window.history.scrollRestoration = previousValue;
      };
    }

    return undefined;
  }, []);

  useLayoutEffect(() => {
    return scheduleScrollPageToTop();
  }, [pathname, search, key]);

  return null;
};

export default ScrollToTop;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '@/store/themeSlice';

const ThemeProvider = ({ children }) => {
  const { currentTheme, themes } = useSelector(state => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    // Apply initial theme on mount
    dispatch(setTheme(currentTheme));
  }, [dispatch, currentTheme]);

  return (
    <div className={`theme-${currentTheme}`} data-theme={currentTheme}>
      {children}
    </div>
  );
};

export default ThemeProvider;
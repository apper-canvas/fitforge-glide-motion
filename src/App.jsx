import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from '@/store';
import ThemeProvider from '@/components/ThemeProvider';
import Layout from '@/Layout';
import { routeArray } from '@/config/routes';
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <div className="bg-background text-text-readable-primary min-h-screen">
            <Routes>
          <Route path="/" element={<Navigate to="/plan" replace />} />
          <Route path="/" element={<Layout />}>
            {routeArray.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
draggable
          pauseOnHover
          theme="light"
toastClassName="bg-card border border-surface-300"
          style={{ zIndex: 9999 }}
/>
      </div>
    </BrowserRouter>
  </ThemeProvider>
</Provider>
);
}

export default App;
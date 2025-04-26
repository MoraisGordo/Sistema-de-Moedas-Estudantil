import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Menu from './Global';
import Global from './Global';


function App() {
  // const ProtectedRoute = ({ children }: any) => {
  //   if (!isAuthenticated()) {
  //     return <Navigate to="/login" replace />;
  //   }

  //   return children;
  // };


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route
            path="/:page"
            element={
              <Global />
            }
          />
          <Route
            path="/"
            element={
              <Global />
            }
          />

        </Routes >
      </BrowserRouter >
    </>
  );
}

export default App;

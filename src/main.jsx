import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import Layout from './components/custom/Layout';
import { AuthProvider } from './contexts/AuthContext';
import SignInPage from './pages/SignInPage';  //  Import SignInPage
import Viewtrip from './view-trip/[tripId]';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,  //  Layout wraps all routes
    children: [
      {
        index: true,       //  Correct way to define the home route
        element: <App />,
      },
      {
        path: 'create-trip',  //  Clean path (no leading '/')
        element: <CreateTrip />,
      },
      {
        path:'/view-trip/:tripId',
        element:<Viewtrip/>
      },
      {
        path: 'sign-in',  //  Clean path (no leading '/')
        element: <SignInPage />,  //  Sign In Page route
      },
    ],
  },
]);

/*createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);*/
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom"; //  Use BrowserRouter
// import "./index.css";
// import App from "./App";
// import { AuthProvider } from "./contexts/AuthContext"; //  Import AuthProvider

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AuthProvider>
//       <BrowserRouter> {/*  Wrap App with Router */}
//         <App />
//       </BrowserRouter>
//     </AuthProvider>
//   </StrictMode>
// );




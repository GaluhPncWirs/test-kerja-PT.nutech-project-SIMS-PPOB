import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./loginPage/page";
import RegisterPage from "./registerPage/page";
import TopUpPage from "./topUpPage/page";
import TransactionPage from "./transactionPage/page";
import PaymentPage from "./paymentPage/page";
import AccountPage from "./accountPage/page";
import Home from "../components/home/content";
import ParentHomePage from "./homePage/page";

const rootApp = document.getElementById("root");

const route = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/Registrasi",
    element: <RegisterPage />,
  },
  {
    path: "/Homepage",
    element: <ParentHomePage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Pembayaran/:service",
        element: <PaymentPage />,
      },
    ],
  },
  {
    path: "/Topup",
    element: <TopUpPage />,
  },
  {
    path: "/Pembayaran",
    element: <PaymentPage />,
  },
  {
    path: "/Transaksi",
    element: <TransactionPage />,
  },
  {
    path: "/Akun",
    element: <AccountPage />,
  },
]);

createRoot(rootApp!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>
);

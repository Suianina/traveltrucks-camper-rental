// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/Header/Header";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Loader from "./components/Loader/Loader";
import NotFound from "./components/NotFound/NotFound";

const Home = lazy(() => import("./pages/Home/Home"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog"));
const CamperDetails = lazy(() => import("./pages/CamperDetails/CamperDetails"));

export default function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Suspense
        fallback={
          <div role="status" aria-live="polite" style={{ padding: 24 }}>
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CamperDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import NotFound from "./components/NotFound/NotFound";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const Home = lazy(() => import("./pages/Home/Home"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog"));
const CamperDetails = lazy(() => import("./pages/CamperDetails/CamperDetails"));

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
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

export default App;

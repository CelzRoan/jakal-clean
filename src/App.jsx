import { useEffect, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Splash from "./pages/Splash";
import CitySelect from "./pages/CitySelect";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ShopDetail from "./pages/ShopDetail";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import "./styles/tokens.css";
import "./styles/buttons.css";
import "./styles/frame.css";

function ScrollReset({ viewportRef }) {
  const location = useLocation();
  useEffect(() => {
    viewportRef.current?.scrollTo({ top: 0 });
  }, [location.pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const viewportRef = useRef(null);

  return (
    <div className="frame-backdrop">
      <div className="phone-shell">
        <div className="phone-screen">
          <div className="phone-viewport" ref={viewportRef}>
            <ScrollReset viewportRef={viewportRef} />
            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Splash />} />
                <Route path="/select-city" element={<CitySelect />} />
                <Route path="/home" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/shop/:id" element={<ShopDetail />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </div>
        </div>
        <span className="phone-hint">JaKal Clean — Local Food Discovery</span>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { useApp } from "../context/AppContext";
import "./Splash.css";

export default function Splash() {
  const navigate = useNavigate();
  const { hasOnboarded, setHasOnboarded } = useApp();

  function handleStart() {
    setHasOnboarded(true);
    navigate("/select-city");
  }

  return (
    <PageTransition>
      <div className="splash">
        <div className="splash__hero">
          <motion.div
            className="splash__image-wrap"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="splash__image-bg" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-7O2EaDTmgCYID-tKagfRnBqqHUrPN8CkpPQwKf0p_dHQTc3CNpZHFsR0A-alGIpQjv_xxWp898FpiivueVIVW7Qu3v_rHJBq3kEQr8NYX37CmTj_dS1e2jWAwp_7UbpP4HoS5TCBL_MSIsEJ4Pt7qpV3HVQc3xFJJh6TdvyY9mPhNMIm3zD2kWtx0dCEwErTQNQZwM9qYslRcgyueYt_4Q4ph4kNOVp_UmzKOMcJrCzbLJP9_OAB"
              alt="Traditional Indonesian dish"
              className="splash__image"
            />
          </motion.div>
        </div>

        <motion.div
          className="splash__content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          <h2 className="splash__title">Temukan Rasa Lokal</h2>
          <p className="splash__subtitle">
            Discover local coffee shops, warungs, and restaurants nearby.
          </p>
          <button className="btn btn--primary btn--block" onClick={handleStart}>
            {hasOnboarded ? "Continue" : "Get Started"}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </motion.div>
      </div>
    </PageTransition>
  );
}

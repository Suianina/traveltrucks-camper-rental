import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import s from "./ScrollToTop.module.css";

/**
 * Прогрес-бар скролу + автопрокрутка нагору при зміні маршруту.
 *
 * Props:
 * - underHeader: true — смуга ПІД хедером (не перекриває його)
 * - headerHeight: висота хедера у px (коли underHeader=true)
 */
export default function ScrollToTop({
  underHeader = false,
  headerHeight = 72,
}) {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);
  const raf = useRef(0);

  // автопрокрутка нагору з урахуванням prefers-reduced-motion
  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? "auto" : "smooth" });
  }, [pathname]);

  // оновлення прогресу скролу (throttle через rAF)
  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;
        const doc = scrollHeight - clientHeight;
        const pct = doc > 0 ? (scrollTop / doc) * 100 : 0;
        setProgress(pct);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // ініціалізація
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      className={`${s.progress} ${underHeader ? s.underHeader : ""}`}
      style={{
        "--progress-top": underHeader ? `${headerHeight}px` : "0px",
        width: `${progress}%`,
      }}
      aria-hidden="true"
    />
  );
}

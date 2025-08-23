import { useState, useMemo } from "react";
import ImageDetailsModal from "../ImageDetailsModal/ImageDetailsModal";
import s from "./CamperGallery.module.css";

export default function CamperGallery({ images = [], name = "Camper" }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  // Нормалізуємо: підтримка масиву рядків і масиву об’єктів {thumb, original, url}
  const normalized = useMemo(
    () =>
      (images || [])
        .map((it) =>
          typeof it === "string"
            ? it
            : it?.thumb || it?.original || it?.url || null
        )
        .filter(Boolean),
    [images]
  );

  if (!normalized.length) {
    return (
      <div className={s.empty} role="img" aria-label="No images available">
        No images
      </div>
    );
  }

  const show = (src) => {
    setCurrent(src);
    setOpen(true);
  };

  return (
    <>
      <ul className={s.grid} aria-label={`${name} gallery`}>
        {normalized.map((src, idx) => (
          <li className={s.item} key={idx}>
            <img
              className={s.img}
              src={src}
              alt={`${name} photo ${idx + 1}`}
              loading="lazy"
              decoding="async"
              onClick={() => show(src)}
              style={{ cursor: "zoom-in" }}
            />
          </li>
        ))}
      </ul>

      <ImageDetailsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        src={current}
        alt={`${name} enlarged`}
      />
    </>
  );
}

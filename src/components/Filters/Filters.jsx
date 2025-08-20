import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setForm,
  toggleEquipment,
  resetFilters,
} from "../../redux/filtersSlice";
import styles from "./Filters.module.css";

const bodyTypes = [
  { value: "panelTruck", label: "Panel Truck" },
  { value: "fullyIntegrated", label: "Fully Integrated" },
  { value: "alcove", label: "Alcove" },
];

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.filters);

  const [locationInput, setLocationInput] = useState(filters.location || "");

  useEffect(() => {
    setLocationInput(filters.location || "");
  }, [filters.location]);

  useEffect(() => {
    const id = setTimeout(
      () => dispatch(setLocation(locationInput.trim())),
      300
    );
    return () => clearTimeout(id);
  }, [locationInput, dispatch]);

  const onBodyTypeChange = useCallback(
    (e) => {
      const v = e.target.value || null;
      dispatch(setForm(v));
    },
    [dispatch]
  );

  const onToggle = useCallback(
    (key) => () => dispatch(toggleEquipment(key)),
    [dispatch]
  );

  return (
    <div className={styles.box}>
      <h3 className={styles.title}>Filters</h3>

      <label className={styles.block}>
        <span className={styles.label}>Location</span>
        <input
          className={styles.input}
          type="text"
          placeholder="City or region"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
      </label>

      <div className={styles.block} role="radiogroup" aria-label="Vehicle type">
        <span className={styles.label}>Vehicle type</span>
        <div className={styles.radioGroup}>
          {bodyTypes.map((t) => (
            <label key={t.value} className={styles.radioItem}>
              <input
                type="radio"
                name="bodyType"
                value={t.value}
                checked={filters.form === t.value}
                onChange={onBodyTypeChange}
              />
              <span>{t.label}</span>
            </label>
          ))}
          <label className={styles.radioItem}>
            <input
              type="radio"
              name="bodyType"
              value=""
              checked={!filters.form}
              onChange={onBodyTypeChange}
            />
            <span>Any</span>
          </label>
        </div>
      </div>

      <div className={styles.block} aria-label="Vehicle equipment">
        <span className={styles.label}>Vehicle equipment</span>
        <div className={styles.checks}>
          {Object.keys(filters.equipment).map((k) => (
            <label key={k} className={styles.checkItem}>
              <input
                type="checkbox"
                checked={!!filters.equipment[k]}
                onChange={onToggle(k)}
              />
              <span>{k}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.btn}
          onClick={() => dispatch(resetFilters())}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

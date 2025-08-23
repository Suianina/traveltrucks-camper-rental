import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setForm,
  toggleEquipment,
  resetFilters,
} from "../../redux/filtersSlice";
import Button from "../Button/Button";
import s from "./Filters.module.css";

const bodyTypes = [
  { value: "panelTruck", label: "Panel Truck" },
  { value: "fullyIntegrated", label: "Fully Integrated" },
  { value: "alcove", label: "Alcove" },
];

const EQUIPMENT_LABELS = {
  AC: "AC",
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  TV: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};

export default function Filters({ onSearch }) {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.filters);

  // локальний інпут для локації + дебаунс
  const [locationInput, setLocationInput] = useState(filters.location ?? "");
  useEffect(() => setLocationInput(filters.location ?? ""), [filters.location]);

  useEffect(() => {
    const id = setTimeout(() => {
      const v = locationInput.trim();
      // не диспатчимо зайвий раз, щоб уникнути цикл/миготіння
      if (v !== (filters.location ?? "")) dispatch(setLocation(v));
    }, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationInput, dispatch]); // не додаємо filters.location, щоб не зациклити

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

  const equipmentEntries = useMemo(() => {
    const keys = Object.keys(filters.equipment || {});
    const desiredOrder = [
      "AC",
      "kitchen",
      "bathroom",
      "TV",
      "radio",
      "refrigerator",
      "microwave",
      "gas",
      "water",
    ];
    const sorted = [
      ...desiredOrder.filter((k) => keys.includes(k)),
      ...keys.filter((k) => !desiredOrder.includes(k)),
    ];
    return sorted.map((k) => ({
      key: k,
      label: EQUIPMENT_LABELS[k] || k,
      checked: !!filters.equipment[k],
    }));
  }, [filters.equipment]);

  const handleSearch = useCallback(() => {
    if (typeof onSearch === "function") onSearch();
  }, [onSearch]);

  const handleReset = useCallback(() => {
    dispatch(resetFilters());
    // одразу перезавантажимо список, щоб відразу побачити повний каталог
    if (typeof onSearch === "function") onSearch();
  }, [dispatch, onSearch]);

  return (
    <section className={s.box} aria-labelledby="filters-title">
      <h3 id="filters-title" className={s.title}>
        Filters
      </h3>

      {/* Location */}
      <div className={s.block}>
        <label className={s.label} htmlFor="flt-location">
          Location
        </label>
        <input
          id="flt-location"
          className={s.input}
          type="text"
          placeholder="City or region"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          autoComplete="address-level2"
        />
      </div>

      {/* Vehicle type */}
      <fieldset className={s.block}>
        <legend className={s.label}>Vehicle type</legend>
        <div
          className={s.radioGroup}
          role="radiogroup"
          aria-label="Vehicle type"
        >
          {bodyTypes.map((t) => (
            <label key={t.value} className={s.radioItem}>
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
          <label className={s.radioItem}>
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
      </fieldset>

      {/* Vehicle equipment */}
      <fieldset className={s.block}>
        <legend className={s.label}>Vehicle equipment</legend>
        <div className={s.checks} aria-label="Vehicle equipment">
          {equipmentEntries.map(({ key, label, checked }) => (
            <label key={key} className={s.checkItem}>
              <input
                type="checkbox"
                checked={checked}
                onChange={onToggle(key)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Actions */}
      <div className={s.actions}>
        <Button variant="outline" size="md" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="primary" size="md" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </section>
  );
}

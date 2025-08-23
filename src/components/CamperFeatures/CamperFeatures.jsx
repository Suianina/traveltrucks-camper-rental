// src/components/CamperFeatures/CamperFeatures.jsx
import cn from "classnames";
import s from "./CamperFeatures.module.css";
import Icon from "../Icon/Icon";

function withUnit(val, unit) {
  if (val == null || val === "") return null;
  const str = String(val).trim();
  if (/[a-zA-Z]/.test(str)) return str;
  return `${str} ${unit}`;
}

export default function CamperFeatures({ camper, className }) {
  if (!camper) return null;

  const details = [
    ["Form", camper.form || null],
    ["Length", withUnit(camper.length, "m")],
    ["Width", withUnit(camper.width, "m")],
    ["Height", withUnit(camper.height, "m")],
    ["Tank", withUnit(camper.tank, "l")],
    [
      "Consumption",
      camper.consumption ? `${camper.consumption} l/100km` : null,
    ],
  ].filter(([, v]) => v);

  return (
    <section className={cn(s.panel, className)} aria-label="Camper features">
      <h3 className={s.title}>Features</h3>
      <div className={s.chips}>
        {camper.transmission && (
          <span className={s.chip}>
            <Icon name="icon-diagram" size={16} />
            {camper.transmission}
          </span>
        )}
        {camper.engine && (
          <span className={s.chip}>
            <Icon name="icon-Petrol" size={16} />
            {camper.engine}
          </span>
        )}
        {camper.AC && (
          <span className={s.chip}>
            <Icon name="icon-wind" size={16} />
            AC
          </span>
        )}
        {camper.kitchen && (
          <span className={s.chip}>
            <Icon name="icon-cup-hot" size={16} />
            Kitchen
          </span>
        )}
        {camper.bathroom && (
          <span className={s.chip}>
            <Icon name="icon-ph_shower" size={16} />
            Bathroom
          </span>
        )}
        {camper.TV && (
          <span className={s.chip}>
            <Icon name="icon-tv" size={16} />
            TV
          </span>
        )}
        {camper.radio && (
          <span className={s.chip}>
            <Icon name="icon-Radio" size={16} />
            Radio
          </span>
        )}
        {camper.refrigerator && (
          <span className={s.chip}>
            <Icon name="icon-solar_fridge-outline" size={16} />
            Refrigerator
          </span>
        )}
        {camper.microwave && (
          <span className={s.chip}>
            <Icon name="icon-lucide_microwave" size={16} />
            Microwave
          </span>
        )}
        {camper.gas && (
          <span className={s.chip}>
            <Icon name="icon-hugeicons_gas-stove" size={16} />
            Gas
          </span>
        )}
        {camper.water && (
          <span className={s.chip}>
            <Icon name="icon-ion_water-outline" size={16} />
            Water
          </span>
        )}
      </div>

      <h3 className={s.subTitle}>Vehicle details</h3>
      <ul className={s.details}>
        {details.map(([k, v]) => (
          <li key={k} className={s.detailRow}>
            <span className={s.dKey}>{k}</span>
            <span className={s.dVal}>{v}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

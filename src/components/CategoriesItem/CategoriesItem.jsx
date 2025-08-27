import CategoriesList from "../CategoriesList/CategoriesList";
import css from "./CategoriesItem.module.css";

const CategoriesItem = ({ camper }) => {
  return (
    <ul className={css.container}>
      <li>
        <CategoriesList icon="icon-diagram" text={camper.transmission} />
      </li>
      {camper.engine && (
        <li>
          <CategoriesList icon="icon-Patrol" text={camper.engine} />
        </li>
      )}
      {camper.kitchen && (
        <li>
          <CategoriesList icon="icon-kitchen" text="Kitchen" />
        </li>
      )}
      {camper.AC && (
        <li>
          <CategoriesList icon="icon-AC" text="AC" />
        </li>
      )}
      {camper.radio && (
        <li>
          <CategoriesList icon="icon-radios" text="Radio" />
        </li>
      )}
      {camper.TV && (
        <li>
          <CategoriesList icon="icon-tv" text="TV" />
        </li>
      )}
      {camper.refrigerator && (
        <li>
          <CategoriesList icon="icon_fridge" text="Refrigerator" />
        </li>
      )}
      {camper.microwave && (
        <li>
          <CategoriesList icon="icon_microwave" text="Microwave" />
        </li>
      )}
      {camper.bathroom && (
        <li>
          <CategoriesList icon="icon_shower" text="Bathroom" />
        </li>
      )}
      {camper.water && (
        <li>
          <CategoriesList icon="icon_water" text="Water" />
        </li>
      )}
      {camper.gas && (
        <li>
          <CategoriesList icon="icon_gas" text="Gas" />
        </li>
      )}
    </ul>
  );
};
export default CategoriesItem;

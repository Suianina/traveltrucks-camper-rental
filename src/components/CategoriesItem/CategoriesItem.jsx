import CategoriesList from "../CategoriesList/CategoriesList";
import css from "./CategoriesItem.module.css";

const CategoriesItem = ({ camper }) => {
  return (
    <div className={css.container}>
      <CategoriesList icon="icon-diagram" text={camper.transmission} />
      {camper.engine && (
        <CategoriesList icon="icon-Patrol" text={camper.engine} />
      )}
      {camper.kitchen && <CategoriesList icon="icon-kitchen" text="Kitchen" />}
      {camper.AC && <CategoriesList icon="icon-AC" text="AC" />}
      {camper.radio && <CategoriesList icon="icon-radios" text="Radio" />}
      {camper.TV && <CategoriesList icon="icon-tv" text="TV" />}
      {camper.refrigerator && (
        <CategoriesList icon="icon_fridge" text="Refrigerator" />
      )}
      {camper.microwave && (
        <CategoriesList icon="icon_microwave" text="Microwave" />
      )}
      {camper.bathroom && <CategoriesList icon="icon_shower" text="Bathroom" />}
      {camper.water && <CategoriesList icon="icon_water" text="Water" />}
      {camper.gas && <CategoriesList icon="icon_gas" text="Gas" />}
    </div>
  );
};
export default CategoriesItem;

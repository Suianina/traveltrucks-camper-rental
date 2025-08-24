import css from "./CampersList.module.css";
import { useSelector } from "react-redux";
import CamperCard from "../CamperCard/CamperCard";

const CampersList = () => {
  const campers = useSelector((state) => state.campers.items);
  const isLoading = useSelector((state) => state.campers.isLoading);
  const error = useSelector((state) => state.campers.error);

  if (isLoading && campers.length === 0) return <p>Loading campers...</p>;
  if (error) return <p>Error loading campers: {error}</p>;

  return (
    <>
      {campers.map((camper) => (
        <li key={camper.id} className={css.itemCard}>
          <CamperCard camper={camper} />
        </li>
      ))}
    </>
  );
};

export default CampersList;

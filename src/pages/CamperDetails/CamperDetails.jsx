import { useParams } from "react-router-dom";

const CamperDetails = () => {
  const { id } = useParams();
  return (
    <main style={{ maxWidth: 1200, margin: "24px auto", padding: "0 24px" }}>
      <h2>Details #{id}</h2>
    </main>
  );
};
export default CamperDetails;

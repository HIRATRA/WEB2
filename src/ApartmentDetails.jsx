import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ApartmentDetails = () => {
  const { id } = useParams();
  const [appartement, setAppartement] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAppartement = async () => {
      try {
        const response = await fetch(`http://localhost:4000/apartments/${id}`);
        const data = await response.json();
        setAppartement(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAppartement();
  }, [id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>{appartement.id}</h1>
      <h2>{appartement.description}</h2>
      <p>Prix : {appartement.price} MAD</p>
      <img src={appartement.picture} alt="Appartement" />
    </div>
  );
};

export default ApartmentDetails;

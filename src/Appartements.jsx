import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Appartements = () => {
  const [appartements, setAppartements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchAppartements = async () => {
      try {
        const response = await fetch("http://localhost:4000/apartments");
        const data = await response.json();
        setAppartements(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppartements();
  }, []);

  const handleFiltrage = (appartements) => {
    let filteredAppartements = appartements;

    if (prixMin !== "") {
      filteredAppartements = filteredAppartements.filter(
        (appartement) => appartement.price >= parseInt(prixMin)
      );
    }

    if (prixMax !== "") {
      filteredAppartements = filteredAppartements.filter(
        (appartement) => appartement.price <= parseInt(prixMax)
      );
    }

    if (description !== "") {
      filteredAppartements = filteredAppartements.filter((appartement) =>
        appartement.description
          .toLowerCase()
          .includes(description.toLowerCase())
      );
    }

    return filteredAppartements;
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Appartements disponibles</h1>
      <form>
        <label>
          Prix minimum :
          <input
            type="number"
            value={prixMin}
            onChange={(e) => setPrixMin(e.target.value)}
          />
        </label>
        <label>
          Prix maximum :
          <input
            type="number"
            value={prixMax}
            onChange={(e) => setPrixMax(e.target.value)}
          />
        </label>
        <label>
          Description :
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </form>
      <ul>
        {handleFiltrage(appartements).map((appartement) => (
          <li key={appartement.id}>
            <h2>{appartement.description}</h2>
            <p>Prix : {appartement.price} MAD</p>
            <img src={appartement.picture} alt="Appartement" />
            <p>
              <Link to={`/appartement/${appartement.id}`}>
                Voir les détails
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appartements;

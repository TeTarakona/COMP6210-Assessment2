import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "./firebase.js";

const ReadEntities = () => {
  const [entities, setEntities] = useState([]);

  const ourCollection = collection(db, "entities");

  const fetchEntities = async () => {
    try {
      const querySnapshot = await getDocs(ourCollection);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntities(data);
    } catch (error) {
      console.error("Error fetching entities: ", error);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, [fetchEntities]);

  return (
    <>
      <h1>Restaurants</h1>
      <div className="entities">
        {entities.map((entity) => {
          return (
            <article className="entity" key={entity.id}>
              <h2>{entity.id}</h2>
              <p>{entity.class}</p>
              <p>{entity.containment}</p>
              <p>{entity.description}</p>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default ReadEntities;

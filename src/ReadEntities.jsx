import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import UpdateEntity from "./UpdateEntity.jsx";

import { db } from "./firebase.js";

const ReadEntities = () => {
  const [entities, setEntities] = useState([]);

  const ourCollection = collection(db, "entities");

  const [editingId, setEditingId] = useState(null)

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

  const handleRefresh = () => {
    setEditingId(null);
    fetchEntities();
  }

  const redact = async (id) => {
    const entityRef = doc(db, "entities", id);
    try {
      await deleteDoc(entityRef);
      handleRefresh();
    } catch (error) {
      console.error("Error redacting entity: ", error)
    }
  }

  return (
    <>
      <h1>Registered entities</h1>
      <div className="entities">
        {entities.map((entity) => {
          return (
            <article className="entity" key={entity.id}>
              <h2>{entity.id}</h2>
              <p>{entity.class}</p>
              <p>{entity.containment}</p>
              <p>{entity.description}</p>
              <button onClick={() => setEditingId(id)} className="btn btn-info">Update entity</button>
              <button onClick={() => redact(id)} className="btn btn-danger">Redact entity</button>
              {
                editingId == id && (
                  <UpdateEntity
                  initialID={id}
                  initialClass={entityClass}
                  initialContainment={containment}
                  initialDescription={description}
                  onUpdated={handleRefresh} />
                )
              }
            </article>
          );
        })}
      </div>
    </>
  );
};

export default ReadEntities;

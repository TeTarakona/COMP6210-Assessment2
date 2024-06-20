import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "./firebase.js";

const UpdateEntity = (id, initialId, initialClass, initialContainment, initialDescription, onUpdated) => {
    
    const [id, setId] = useState (initialId);
    const [entityClass, setEntityClass] = useState (initialClass); //Class is a keyword, so this field has been renamed to Entity Class but will be referring to the class field in the firebase database
    const [containment, setContainment] = useState (initialContainment);
    const [description, setDescription] = useState (initialDescription);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const entityRef = doc(db, "entities", id)

        try {
            await updateDoc(entityRef, {id: id, class: entityClass, containment: containment, description: description})
            onUpdated()
        } catch (error) {
            console.error("Error updating entity: ", error)
        }
    }

    return (
    <>
        <form onSubmit={handleUpdate}>
        <label htmlFor="id">Entity ID</label>
        <input type="text" value={id} onchange={(e) => setId(e.target.value)} placeholder="" id="id" required />
        <label htmlFor="class">Entity Class</label>
        <input type="text" value={entityClass} onchange={(e) => setEntityClass(e.target.value)} id="class" required />
        <label htmlFor="containment">Containment Procedure</label>
        <textarea type="text" value={containment} onchange={(e) => setContainment(e.target.value)} id="containment" required />
        <label htmlFor="description">Entity Description</label>
        <textarea type="text" value={description} onchange={(e) => setDescription(e.target.value)} id="description" required />
        <button type="submit" >Update entitiy</button>
    </form>
    </>
)
}

export default UpdateEntity;
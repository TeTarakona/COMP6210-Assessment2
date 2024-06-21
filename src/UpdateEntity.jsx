import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "./firebase.js";

const UpdateEntity = (id, initialEntityId, initialClass, initialContainment, initialDescription, onUpdated) => {
    
    const [entityId, setEntityId] = useState (initialEntityId);
    const [entityClass, setEntityClass] = useState (initialClass); //Class is a keyword, so this field has been renamed to Entity Class but will be referring to the class field in the firebase database
    const [containment, setContainment] = useState (initialContainment);
    const [description, setDescription] = useState (initialDescription);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const entityRef = doc(db, "entities", id)

        try {
            await updateDoc(entityRef, {entityId: entityId, class: entityClass, containment: containment, description: description})
            onUpdated()
        } catch (error) {
            console.error("Error updating entity: ", error)
        }
    }

    return (
    <>
        <form onSubmit={handleUpdate}>
        <label htmlFor="id">Entity ID</label>
        <input type="text" value={entityId} onChange={(e) => setEntityId(e.target.value)} placeholder="" id="id" required />
        <label htmlFor="class">Entity Class</label>
        <input type="text" value={entityClass} onChange={(e) => setEntityClass(e.target.value)} id="class" required />
        <label htmlFor="containment">Containment Procedure</label>
        <textarea type="text" value={containment} onChange={(e) => setContainment(e.target.value)} id="containment" required />
        <label htmlFor="description">Entity Description</label>
        <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} id="description" required />
        <button type="submit" >Update entitiy</button>
    </form>
    </>
)
}

export default UpdateEntity;
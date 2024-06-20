import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import {db} from "./firebase"

const CreateEntity = () => {
const [id, setId] = useState ("");
const [entityClass, setEntityClass] = useState (""); //Class is a keyword, so this field has been renamed to Entity Class but will be referring to the class field in the firebase database
const [containment, setContainment] = useState ("");
const [description, setDescription] = useState ("");

const ourCollection = collection(db, "entities");

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await addDoc(ourCollection, {id: id, class: entityClass, containment: containment, description: description})
        setId("");
        setEntityClass("");
        setContainment("");
        setDescription("");
    } catch(error) {
        console.error("Error adding entity: ", error)
    }
}

return (
    <>
    <form onSubmit={handleSubmit}>
        <label htmlFor="id">Entity ID</label>
        <input type="text" value={id} onchange={(e) => setId(e.target.value)} placeholder="" id="id" required />
        <label htmlFor="class">Entity Class</label>
        <input type="text" value={entityClass} onchange={(e) => setEntityClass(e.target.value)} id="class" required />
        <label htmlFor="containment"></label>
        <textarea type="text" value={containment} onchange={(e) => setContainment(e.target.value)} id="containment" required />
        <textarea type="text" value={description} onchange={(e) => setDescription(e.target.value)} id="description" required />
        <button type="submit" >Create entitiy</button>
    </form>
    </>
)

}

export default CreateEntity
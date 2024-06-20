import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import {db} from "./firebase"

const CreateEntity = () => {
const [id, setId] = useState ("");
const [entityClass, setEntityClass] = useState (""); //Class is a keyword, so this field has been renamed to Entity Class but will be referring to the class field in the firebase database
const [containment, seContainment] = useState ("");
const [description, setdescription] = useState ("");

const ourCollection = collection(db, "entities");

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await addDoc(outCollection, {id: id, class: entityClass, containment: containment, description: description})
    } catch(error) {
        console.error("Error adding entity: ", error)
    }
}
}

export default CreateEntity
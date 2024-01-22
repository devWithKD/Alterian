import { useDispatch } from "react-redux";
// import { Collection } from "../interface";
// import { createCollection } from "../state/collections/collectionsSlice";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { createCollection } from "../state/nodes/nodeSlice";

export default function (): [string, () => void] {
  const [id, setID] = useState("");
  const dispatch = useDispatch();
  const createNewCollection: () => void = () => {
    const newId = uuidv4();
    setID(newId);

    dispatch(createCollection({ id: newId }));
  };
  return [id, createNewCollection];
}

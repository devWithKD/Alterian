import { useDispatch } from "react-redux";
import { Collection } from "../interface";
import { createCollection } from "../state/collections/collectionsSlice";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function (): [string, () => void] {
  const [id, setID] = useState("");
  const dispatch = useDispatch();
  const createNewCollection: () => void = () => {
    const newId = uuidv4()
    setID(newId);
    const collection: Collection = {
      id: newId,
      label: "New Collection",
      // noteIDs: new Array<string>(),
      parentID: "",
    };
    dispatch(createCollection(collection));
  };
  return [id, createNewCollection];
}

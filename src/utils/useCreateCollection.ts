import { useDispatch } from "react-redux";
import { Collection } from "../interface";
import { createCollection } from "../state/collections/collectionsSlice";
import { v4 as uuidv4 } from "uuid";

export default function (): [string, () => void] {
  const dispatch = useDispatch();
  let id: string = "";
  const createNewCollection: () => void = () => {
    id = uuidv4();
    const collection: Collection = {
      id,
      label: "New Collection",
      noteIDs: new Array<string>(),
    };
    dispatch(createCollection(collection));
  };
  return [id, createNewCollection];
}

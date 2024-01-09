import { Node, Note } from "../interface";

export const createCollectionView = (
  collections: Array<Node>,
  notes: Array<Note | Node>,
  elementID: string,
  sortType: string
) => {
  const childCollections = collections.filter(
    (col) => col.parentID == elementID
  );
  const childNotes = notes.filter((note) => note.parentID == elementID);
  const childeren = childCollections.concat(childNotes);
  const newArray = sortList(childeren, sortType);
  return newArray;
};

export const sortList = (list: Array<Node | Note>, sortBy: string) => {
  const newList = list.sort((a: Node, b: Node) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    switch (sortBy) {
      case "a-z":
        if (aTitle[0] > bTitle[0]) return 1;
        if (aTitle[0] < bTitle[0]) return -1;
        if (aTitle[0] == bTitle[0]) {
          let i = 0;
          while (i < aTitle.length || i < bTitle.length) {
            if (aTitle[i] == bTitle[i]) i++;
            else if (aTitle[i] > bTitle[i]) return 1;
            else if (aTitle[i] < bTitle[i]) return -1;
          }
          return 0;
        }
        return 0;
      case "z-a":
        if (aTitle[0] < bTitle[0]) return 1;
        if (aTitle[0] > bTitle[0]) return -1;
        if (aTitle[0] == bTitle[0]) {
          let i = 0;
          while (i < aTitle.length || i < bTitle.length) {
            if (aTitle[i] == bTitle[i]) i++;
            else if (aTitle[i] < bTitle[i]) return 1;
            else if (aTitle[i] > bTitle[i]) return -1;
          }
          return 0;
        }
        return 0;
      case "modified newest first":
        if (a.updatedTime > b.updatedTime) return -1;
        if (a.updatedTime < b.updatedTime) return 1;
        return 0;
      case "modified oldest first":
        if (a.updatedTime < b.updatedTime) return -1;
        if (a.updatedTime > b.updatedTime) return 1;
        return 0;
      case "created newest first":
        if (a.createdTime > b.createdTime) return -1;
        if (a.createdTime < b.createdTime) return 1;
        return 0;
      case "created oldest first":
        if (a.createdTime < b.createdTime) return -1;
        if (a.createdTime > b.createdTime) return 1;
        return 0;
      default:
        return 0;
    }
  });
  return newList;
};

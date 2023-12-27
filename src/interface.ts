export interface Note {
  id: string;
  title: string;
  body: string;
  tagIDs: Array<Tag>;
  parentID: string;
}

export interface Tag {
  id: string;
  label: string;
}

export interface Collection {
  id: string;
  noteIDs: Array<string>;
  label: string;
}

export interface NotesState extends Array<Note> {}

export interface TagsState extends Array<Tag> {}

export interface CollectionsState extends Array<Collection> {}

export interface SelectedNote {
  id: string;
}

export interface Tab extends SelectedNote {
  label: string;
}

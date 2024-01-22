import { AxiosError, AxiosResponse } from "axios";

export interface Node {
  id: string;
  title: string;
  createdTime: EpochTimeStamp;
  updatedTime: EpochTimeStamp;
  type: string | null;
  parentID: string | null;
}

export interface Note extends Node {
  body: string;
  tagIDs: Array<string>;
}

export interface Tag {
  id: string;
  label: string;
}

export interface SideBarState {
  focusedID: string | null;
  sortType: string;
  expandedView: string;
}

export interface NodeState extends Array<Node | Note> {}

export interface NotesState extends Array<Note> {}

export interface TagsState extends Array<Tag> {}

export interface SelectedNote {
  id: string;
}

export type UserState = {
  data: {
    email: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    provider: string | null | undefined;
    id: string | null | undefined;
  } | null;
};

export interface ResponseError {
  error: {
    status: number;
    message: string;
  };
}

export type AxiosSuccessCB = (res: AxiosResponse) => void;
export type AxiosFailuerCB = (res: AxiosError) => void;

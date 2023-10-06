import { PathObj } from "react-arborist/dist/types/utils";

export interface ITreeObj extends PathObj {
  name: string;
  type: "directory" | "file";
}

export interface ITreeObjFile extends ITreeObj {
  type: "file";
}

export interface ITreeObjDir extends ITreeObj {
  type: "directory";
  isOpen?: boolean;
  tree: TreeObj[];
}

export type TreeObj = ITreeObjFile | ITreeObjDir;

export interface IExtraActions {
  delete: (id: string) => void;
  addFile: (parentId: string) => void;
  addFolder: (parentId: string) => void;
}
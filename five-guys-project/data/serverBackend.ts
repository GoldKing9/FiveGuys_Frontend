import { useQuery } from "@tanstack/react-query";
import { ITreeObjDir } from "./types";

const fakeServerData: ITreeObjDir = {
  path: "A",
  name: "Root",
  type: "directory",
  tree: [
    {
      path: "B",
      name: "Node 1",
      type: "directory",
      tree: [
        {
          path: "D",
          name: "Node 3",
          type: "file",
        }
      ]
    },
    { 
      path: "C",
      name: "Node 2",
      type: "file",
    }
  ]
};

const placeholderData: ITreeObjDir = {
  name: "Loading...",
  type: "directory",
  tree: [],
  path: "",
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function fakeFetch() {
  return sleep(2250).then(() => fakeServerData);
}

export default function useServerBackend() {
  const query = useQuery<ITreeObjDir, Error>(["filestore"], fakeFetch, {
    placeholderData
  });
  return query;
}

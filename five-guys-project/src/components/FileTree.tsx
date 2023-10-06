import { Tree } from "react-arborist"
import { data } from "../../data/files";
import React from "react";



export default function FileTree() {

  return (
    <Tree 
      initialData={data}
    />
  )
}
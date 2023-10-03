import { Tree } from "react-arborist"
import { data } from "../../data/files";



export default function FileTree() {

  return (
    <Tree 
      initialData={data}
    />
  )
}
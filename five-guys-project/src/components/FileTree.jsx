import { Tree } from "react-arborist"
import { data } from "../../data/files";
import React, { useState, useRef, useEffect } from "react";
import Node from "./Node";
import "../utils/styles.css";
import axios from "axios";
import { TbFolderPlus } from "react-icons/tb";
import { AiOutlineFileAdd } from "react-icons/ai";



export default function FileTree() {

  const treeRef = useRef(null);
  const [term, setTerm] = useState("");

  useEffect(() => {
    axios.get("http://www.burgerclub.shop/api/repo/{nickname}/{projectName}")
  },[])

  const onRename = ({ id, name }) => {
    
    const node = treeRef.current.get(id);
    if (node) {
      node.data.name = name;
    }
  };

  const onDelete = ({ id }) => {
    const node = treeRef.current.get(id);
    if (node) {
      node.remove();
    }
  };
  const onCreate = () => {};

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        width={290}
      />
      <div>
        <button onClick={() => treeRef.current.createInternal(treeRef.current.root.id)} title="New Folder...">
          <TbFolderPlus />
        </button>
        <button onClick={() => treeRef.current.createInternal(treeRef.current.root.id)} title="New File...">
          <AiOutlineFileAdd />
        </button>
      </div>
      <Tree 
        data={data}
        idAccessor="path"
        childrenAccessor="tree"
        ref={treeRef}
        rowHeight={32}
        onRename={onRename}
        onDelete={onDelete}
        onCreate={onCreate}
        searchTerm={term}
        searchMatch={(node, term) =>
          node.data.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        }
        width={296}
      >
        {Node}
      </Tree>
    </>
  )
}
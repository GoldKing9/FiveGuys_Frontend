import { useCallback, useEffect, useMemo, useState } from "react";
import TreeModel from "tree-model-improved";
import { ITreeObjDir, TreeObj, ITreeObjFile, IExtraActions } from "../../data/types";

interface IBackend {
  data: ITreeObjDir;
  onMove: (
    srcPaths: string[],
    dstParentPath: string | null,
    dstIndex: number
  ) => void;
  onToggle: (path: string, isOpen: boolean) => void;
  onEdit: (path: string, name: string) => void;
  extraActions: IExtraActions;
}

function findByPath(
  node: TreeModel.Node<TreeObj>,
  path: string
): TreeModel.Node<TreeObj> | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return node.first((n: any) => n.model.path === path);
}

function getNodePath(node: TreeModel.Node<TreeObj>) {
  return node.model.path;
}

function getNodePathStr(node: TreeModel.Node<TreeObj>) {
  return node.getPath().map(getNodePath).join("/");
}

/**
 * function that sorts the tree recursively first by the folder name then by file name
 * @param node
 */
function sortNodeTree(node: TreeObj): TreeObj {
  if (node.type === "file") {
    return node;
  }
  // directory
  const tree = node.tree
    .slice()
    .sort(
      (a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name)
    )
    .map(sortNodeTree);
  return {
    ...node,
    tree
  };
}

const confirmAsync = (q: string) =>
  new Promise<void>((resolve, reject) => {
    const result = window.confirm(q);
    if (result) {
      return resolve();
    }
    return reject(new Error("Not confirmed"));
  });

function useTreeBackend<T extends ITreeObjDir = ITreeObjDir>(
  initialData: T,
  onChange?: (v: T) => void
): IBackend {
  const [data, setData] = useState<T>(initialData!);
  useEffect(() => {
    setData(initialData!);
  }, [initialData]);

  const root = useMemo(() => new TreeModel().parse(data), [data]);
  const find = useCallback((path) => findByPath(root, path), [root]);
  const update = () => {
    const newTree = { ...(sortNodeTree(root.model) as T) };
    setData(newTree);
    onChange?.(newTree);
  };

  const onMove = (
    srcPaths: string[],
    dstParentPath: string | null,
    dstIndex: number
  ) => {
    const dstParent = dstParentPath ? find(dstParentPath) : root;
    if (!dstParent) return;
    const dstParentPathId = getNodePathStr(dstParent);
    for (const srcPath of srcPaths) {
      const src = find(srcPath);
      if (!src) continue;
      const srcNodePathId = getNodePathStr(src);
      // Prevent folder to be set on a child folder of its.
      // Destination can not be child of the source.
      if (dstParentPathId.startsWith(srcNodePathId)) continue;
      const newItem = new TreeModel().parse(src.model);
      dstParent.addChildAtIndex(newItem, dstIndex);
      src.drop();
    }
    update();
  };

  const onToggle = (path: string, isOpen: boolean) => {
    const node = find(path);
    if (node) {
      node.model.isOpen = isOpen;
      update();
    }
  };

  const onEdit = (path: string, name: string) => {
    const node = find(path);
    if (node) {
      node.model.name = name;
      update();
    }
  };

  const onDelete = (path: string) => {
    const node = find(path);
    if (node) {
      confirmAsync(`Are you sure you want to delete ${node.model.name}?`)
        .then(() => {
          node.drop();
          update();
        })
        .catch(console.info);
      const confirmed = window.confirm(
        `Are you sure you want to delete ${node.model.name}?`
      );
      if (confirmed) {
        node.drop();
        update();
      }
    }
  };

  const onAddFile = (parentPath: string) => {
    const parentNode = find(parentPath);
    if (parentNode) {
      const filename = window.prompt(`Type your new file name:`);
      if (filename) {
        const newFile = {
          path: parentNode.path.append(`/${filename}}`),
          name: filename,
          type: "file"
        } as ITreeObjFile;
        const newItem = new TreeModel().parse(newFile);
        parentNode.addChild(newItem);
      }
    }
    update();
  };

  const onAddFolder = (parentPath: string) => {
    const parentNode = find(parentPath);
    if (parentNode) {
      const foldername = window.prompt(`Type your new folder name:`);
      if (foldername) {
        const newFile = {
          path: parentNode.path.append(`/${foldername}}`),
          name: foldername,
          type: "directory",
          tree: []
        } as unknown as ITreeObjDir;
        const newItem = new TreeModel().parse(newFile);
        parentNode.addChildAtIndex(newItem, 0);
      }
    }
    update();
  };

  const extraActions = {
    delete: onDelete,
    addFile: onAddFile,
    addFolder: onAddFolder
  };

  return {
    data: root.model,
    onMove,
    onToggle,
    onEdit,
    extraActions
  };
}

export default useTreeBackend;

export const data = [
  { path: "1", name: "Unread", type: "file" },
  { path: "2", name: "Threads", type: "file" },
  {
    path: "3",
    name: "Chat Rooms",
    type: "folder",
    tree: [
      { path: "c1", name: "General", type: "file" },
      { path: "c2", name: "Random", type: "file" },
      { path: "c3", name: "Open Source Projects", type: "file" },
    ],
  },
  {
    path: "4",
    name: "Direct Messages",
    type: "folder",
    tree: [ 
      { path: "d1", name: "Alice", type: "file" },
      { path: "d2", name: "Bob", type: "file" },
      { path: "d3", name: "Charlie", type: "file" },
    ],
  },
];

function Node(data) {
  return {
    data: data,
    left: null,
    right: null,
  };
}

function Tree(array) {
  array.sort((a, b) => a - b);
  array = [...new Set(array)];

  const length = array.length;
  const start = 0;
  const end = length - 1;

  return {
    root: buildTree(array, start, end),
  };
}

function buildTree(array, start, end) {
  if (start > end) return null;

  const mid = start + Math.floor((end - start) / 2);

  const root = Node(array[mid]);
  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
}

// function buildTree(array) {
//   const length = array.length;
//   if (length === 0) {
//     return null;
//   }

//   const mid = Math.floor((length - 1) / 2);

//   const root = Node(array[mid]);
//   root.left = buildTree(array, start, mid - 1);
//   root.right = buildTree(array, mid + 1, end);
// }

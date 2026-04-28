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

    includes(value) {
      let current = this.root;

      while (current !== null) {
        if (value === current.data) {
          return true;
        }

        if (value < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }

      return false;
    },

    deleteItem(value) {
      this.root = deleteNode(this.root, value);
    },
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

function getSuccessor(curr) {
  curr = curr.right;
  while (curr !== null && curr.left !== null) curr = curr.left;
  return curr;
}

function deleteNode(node, value) {
  if (node === null) {
    return node;
  }

  if (node.data > value) {
    node.left = deleteNode(node.left, value);
  } else if (node.data < value) {
    node.right = deleteNode(node.right, value);
  } else {
    // 0 or 1 child
    if (node.left === null) {
      return node.right;
    }
    if (node.right === null) {
      return node.left;
    }

    const successor = getSuccessor(node);
    node.data = successor.data;
    node.right = deleteNode(node.right, successor.data);
  }
  return node;
}
